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
import { formForgetPasswordSchema } from '@/schema/ForgetPassword';
import { useForm } from 'react-hook-form';

export const StepUserSearch = ({ onNextStep }: { onNextStep: () => void }) => {
  const form = useForm<z.infer<typeof formForgetPasswordSchema>>({
    resolver: zodResolver(formForgetPasswordSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formForgetPasswordSchema>) => {
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <Label>Usuário</Label>
                <FormControl>
                  <Input
                    placeholder='Digita seu usuário'
                    type='text'
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
            Continuar
          </Button>
          <div className='flex w-full items-center justify-center'></div>
        </form>
      </Form>
    </div>
  );
};
