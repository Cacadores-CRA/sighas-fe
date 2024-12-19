import { formLoginSchema } from '@/schema/Login';
import { useAuth } from '@/services/auth/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/SubmitButton';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useAuth();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
    try {
      await mutateAsync(data);
      // Navigate to dashboard after successful login
      navigate({ to: '/home' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex flex-col flex-1 gap-4 items-center justify-center'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-6xl font-bold text-primary'>SIGHAS</h1>
        <h2 className='text-2xl font-medium text-zinc-800 '>Login</h2>
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <Label>Senha</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder='Digita sua senha'
                      type={showPassword ? 'text' : 'password'}
                      required
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            to='/forget-password'
            className='text-primary text-sm underline '
          >
            Esqueceu sua senha?
          </Link>

          <SubmitButton
            color='#172554'
            size='lg'
            className='text-white bg-primary hover:bg-primary/90 mt-4'
            type='submit'
            disabled={Object.keys(form.formState.errors).length > 0}
          >
            Login
          </SubmitButton>
          <div className='flex w-full items-center justify-center'></div>
        </form>
      </Form>
    </div>
  );
};
