'use client';

import { useState } from 'react';
import { TeacherPayload } from '@/services/teachers/useCreateTeacher';
import { TeacherDataType } from '@/services/teachers/useListTearchers';
import { useUpdateTeacher } from '@/services/teachers/useUpdateTeacher';
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
  siape: z.string().min(5, 'SIAPE deve ter pelo menos 5 caracteres'),
  education: z.enum([
    'HIGH_SCHOOL',
    'TECHNICAL_CERTIFICATION',
    'ASSOCIATE',
    'BACHELOR_EDUCATION',
    'BACHELOR',
    'POSTGRADUATE',
    'MASTER',
    'DOCTORATE',
    'POST_DOCTORATE',
  ]),
  status: z.enum(['CREATED', 'ACTIVE', 'SUSPENDED', 'FINISHED']),
});

export default function EditTeacherModal({
  teacher,
}: {
  teacher: TeacherDataType;
}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useUpdateTeacher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teacher.name,
      email: teacher.institutionalEmail,
      siape: teacher.siape,
      education: teacher.education as z.infer<typeof formSchema>['education'],
      status: teacher.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload: TeacherPayload = {
        userId: teacher.userId,
        startingDate: teacher.createdAt || new Date().toISOString(),
        endingDate: new Date().toISOString(),
        status: 'CREATED',
        siape: values.siape,
        education: values.education,
        institutionalEmail: values.email,
      };

      await mutateAsync(payload);
      setOpen(false);
      toast.success('Professor atualizado com sucesso');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Editar Professor</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Editar Professor</DialogTitle>
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
              name='siape'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SIAPE</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='education'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de Educação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione o nível de educação' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='HIGH_SCHOOL'>Ensino Médio</SelectItem>
                      <SelectItem value='TECHNICAL_CERTIFICATION'>
                        Certificação Técnica
                      </SelectItem>
                      <SelectItem value='ASSOCIATE'>Associado</SelectItem>
                      <SelectItem value='BACHELOR_EDUCATION'>
                        Bacharelado em Educação
                      </SelectItem>
                      <SelectItem value='BACHELOR'>Bacharel</SelectItem>
                      <SelectItem value='POSTGRADUATE'>
                        Pós-Graduação
                      </SelectItem>
                      <SelectItem value='MASTER'>Mestrado</SelectItem>
                      <SelectItem value='DOCTORATE'>Doutorado</SelectItem>
                      <SelectItem value='POST_DOCTORATE'>
                        Pós-Doutorado
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value='ACTIVE'>Ativo</SelectItem>
                      <SelectItem value='CREATED'>Criado</SelectItem>
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
