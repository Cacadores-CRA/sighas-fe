'use client';

import { useState } from 'react';
import { studentStatusLabel, StudentStatusType } from '@/@types/students';
import { useListAffiliations } from '@/services/affilitiaons/useAffiliations';
import { StudentDataType } from '@/services/students/useGetStudents';
import { useUpdateStudent } from '@/services/students/useUpdateStudents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  enrollment: z.string().min(10, 'Matrícula deve ter pelo menos 10 caracteres'),
  status: z.enum(['CREATED', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'FINISHED']),
});

export default function EditStudentModal({
  student,
}: {
  student: StudentDataType;
}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useUpdateStudent();
  const { data: affiliations } = useListAffiliations();

  const affiliationStudent = affiliations?.find(
    (affiliation) => affiliation.userId === student.userId
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student.name,
      email: student.institutionalEmail,
      enrollment: student.enrollment,
      status: student.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const isChangedEnrollment = values.enrollment !== student.enrollment;

      const payload = {
        userId: student.userId,
        startingDate: student.createdAt || new Date().toISOString(),
        endingDate: new Date().toISOString(),
        status: values.status as StudentStatusType,
        enrollment: values.enrollment,
        institutionalEmail: values.email,
        name: values.name,
        affiliationId: affiliationStudent?.id || '',
      };

      await mutateAsync(payload);

      if (isChangedEnrollment) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname.replace(
            student.enrollment,
            values.enrollment
          )
        );
      }

      setOpen(false);
      toast.success('Professor atualizado com sucesso');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Editar Aluno</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='enrollment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione o status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(studentStatusLabel).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label as string}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
