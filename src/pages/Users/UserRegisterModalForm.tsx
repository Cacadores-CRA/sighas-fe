import { useState } from 'react';
import { customInstance } from '@/api/axiosInstance';
import { UserFormData, userSchema } from '@/schema/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AxiosErrorData } from '@/types/ErrorTypes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';

export function UserRegisterModalForm() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      cpf: '',
      name: '',
      surname: '',
      username: '',
      birthdate: '',
      email: '',
      password: '',
      roles: [],
    },
  });

  const addUser = useMutation({
    mutationFn: (newUser: UserFormData) => {
      return customInstance({
        url: `/users`,
        method: 'POST',
        // params,
        data: newUser,
      });
    },
    onSuccess: () => {
      // ✅ refetch the users list
      toast.success('Usuário registrado com sucesso!.');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (error: AxiosError<AxiosErrorData>) => {
      console.log('error:');
      console.log(error);

      error.response?.data.errors?.map((error) => {
        toast.error(error.defaultMessage);
      });
    },
  });

  const onSubmit = (data: UserFormData) => {
    // Format birthdate from DD/MM/YYYY to YYYY-MM-DD
    const [day, month, year] = data.birthdate.split('/');
    const formattedData = {
      ...data,
      birthdate: `${year}-${month}-${day}`,
    };

    addUser.mutate(formattedData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusCircle size={20} /> Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex gap-4 w-full'>
              <div className='flex flex-col w-full gap-4'>
                <FormField
                  control={form.control}
                  name='cpf'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          mask='999.999.999-99'
                          placeholder='000.000.000-00'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-4'>
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
                    name='surname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='birthdate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col mt-[10px]'>
                      <FormLabel>Data de nascimento</FormLabel>
                      <FormControl>
                        <Input
                          mask='99/99/9999'
                          placeholder='DD/MM/AAAA'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col w-full gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de usuário</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='roles'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>Cargo</FormLabel>
                    <FormDescription>
                      Selecione o cargo do usuário
                    </FormDescription>
                  </div>
                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='roles'
                      render={({ field }) => {
                        return (
                          <div className='flex flex-col gap-2'>
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('ADMIN')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange(['ADMIN'])
                                      : field.onChange([]);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                Admin
                              </FormLabel>
                            </FormItem>
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes('USER')}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange(['USER'])
                                      : field.onChange([]);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                User
                              </FormLabel>
                            </FormItem>
                          </div>
                        );
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end space-x-4 pt-4'>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton disableIfInvalid>Register</SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
