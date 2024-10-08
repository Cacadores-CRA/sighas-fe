import { Button } from '@/components/ui/button';
import {
  Form,
  FormMessage,
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UserSearch } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { formForgetPasswordNewCredentialsSchema } from '@/schema/ForgetPassword';
import { useForm } from 'react-hook-form';

export const StepNewPassword = ({ onNextStep }: { onNextStep: () => void }) => {
  const form = useForm<z.infer<typeof formForgetPasswordNewCredentialsSchema>>({
    resolver: zodResolver(formForgetPasswordNewCredentialsSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (
    data: z.infer<typeof formForgetPasswordNewCredentialsSchema>
  ) => {
    console.log(data);
    onNextStep();
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-2 items-center'>
        <div className='size-auto rounded-md bg-primary p-3 '>
          <UserSearch className='size-10 text-white' />
        </div>
        <h2 className='text-2xl font-medium text-zinc-800 '>
          Esqueceu sua senha?
        </h2>
        <p className='text-sm text-zinc-600'>
          Digite seu email para receber um código de verificação.
        </p>
      </div>

      <Form {...form}>
        <form
          className='items flex flex-col w-full gap-1'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <Label>Senha</Label>
                <FormControl>
                  <Input
                    placeholder='Digite sua nova senha'
                    type='password'
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <Label>Confirmar senha</Label>
                <FormControl>
                  <Input
                    placeholder='Digite sua nova senha'
                    type='password'
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size='lg'
            className=' mt-4'
            type='submit'
            disabled={Object.keys(form.formState.errors).length > 0}
          >
            Confirmar
          </Button>
        </form>
      </Form>
    </div>
  );
};
