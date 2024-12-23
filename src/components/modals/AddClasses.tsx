import { useState } from 'react';
import { GroupPayload } from '@/@types/groups';
import { useCreateClasses } from '@/services/classes/useCreateClasses';
import { useListSubjects } from '@/services/subjects/useListSubjtects';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  code: z.string().min(3, 'Código deve ter no mínimo 3 caracteres'),
  subjectId: z.string().uuid('ID da disciplina inválido'),
  year: z.number().min(2024, 'Ano deve ser maior ou igual a 2024'),
  semester: z.enum(['FIRST_SEMESTER', 'SECOND_SEMESTER'], {
    required_error: 'Selecione um semestre',
  }),
  status: z.enum(['OPEN', 'ACTIVE', 'CLOSED']).default('OPEN'),
});

type CreateClassFormData = z.infer<typeof formSchema>;

const getCurrentYear = () => new Date().getFullYear();

const generateYearOptions = (startYear = getCurrentYear()) => {
  const years = [];
  for (let i = 0; i < 2; i++) {
    const year = startYear + i;
    years.push({
      year,
      semesters: [
        { value: `${year}`, label: `${year}.1`, period: 'FIRST_SEMESTER' },
        { value: `${year}`, label: `${year}.2`, period: 'SECOND_SEMESTER' },
      ],
    });
  }
  return years;
};

interface AddClassesModalProps {
  isOpen?: boolean;
}

export function AddClassesModal({ isOpen }: AddClassesModalProps) {
  const { data: subjects } = useListSubjects();
  const { mutateAsync } = useCreateClasses();

  const [open, setOpen] = useState(isOpen || false);
  const form = useForm<CreateClassFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      subjectId: '',
      year: 2024,
      semester: 'FIRST_SEMESTER',
      status: 'OPEN',
    },
  });
  const onSubmit = async (data: GroupPayload) => {
    try {
      await mutateAsync(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const yearOptions = generateYearOptions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Nova Turma
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova turma.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da Turma</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex: CRO-AP-POO' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subjectId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disciplina</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione uma disciplina' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.isArray(subjects) && subjects.length > 0 ? (
                        subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.title}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value='placeholder' disabled>
                          Carregando disciplinas...
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano/Semestre</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const [year, period] = value.split('-');
                      form.setValue('year', parseInt(year));
                      form.setValue(
                        'semester',
                        period as 'FIRST_SEMESTER' | 'SECOND_SEMESTER'
                      );
                    }}
                    defaultValue={
                      field.value
                        ? `${field.value}-${form.getValues('semester')}`
                        : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione um período' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearOptions.map((yearOption) =>
                        yearOption.semesters.map((semester) => (
                          <SelectItem
                            key={`${yearOption.year}-${semester.period}`}
                            value={`${yearOption.year}-${semester.period}`}
                          >
                            {semester.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type='submit'>Criar Turma</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
