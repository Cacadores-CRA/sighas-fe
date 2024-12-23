import { useState } from 'react';
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
  subjectId: z.string().min(1, 'Selecione uma disciplina'),
  academicPeriod: z.string().min(1, 'Selecione um período'),
});

type CreateClassFormData = z.infer<typeof formSchema>;
export function AddClassesModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateClassFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      subjectId: '',
      academicPeriod: '',
    },
  });
  const onSubmit = async (data: CreateClassFormData) => {
    try {
      // TODO: Implement class creation
      console.log(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
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
                      <SelectItem value='1'>
                        Programação Orientada a Objetos
                      </SelectItem>
                      <SelectItem value='2'>Cálculo Quântico II</SelectItem>
                      <SelectItem value='3'>
                        Introdução à Metodologia de Pesquisa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='academicPeriod'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Acadêmico</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione um período' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='2024.1'>2024.1</SelectItem>
                      <SelectItem value='2024.2'>2024.2</SelectItem>
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
