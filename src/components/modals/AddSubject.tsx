import { useState } from 'react';
import type { SubjectPayload } from '@/@types/subjects';
import { useCreateSubject } from '@/services/subjects/useCreateSubjetect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { SubmitButton } from '../SubmitButton';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';

const subjectFormSchema = z.object({
  title: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  shortTitle: z.string().min(2, 'O nome curto deve ter no mínimo 2 caracteres'),
  code: z.string().min(3, 'O código deve ter no mínimo 3 caracteres'),
});

export function AddSubjectModal() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createSubject } = useCreateSubject();
  const form = useForm<SubjectPayload>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      title: '',
      shortTitle: '',
      code: '',
    },
  });

  const handleSubmit = async (data: SubjectPayload) => {
    await createSubject(data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Nova Disciplina</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Nova Disciplina</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova disciplina
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Programação Orientada a Objetos'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='shortTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Curto</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='POO' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='CRO-AP-POO' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  form.reset();
                }}
              >
                Cancelar
              </Button>
              <SubmitButton>Salvar</SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
