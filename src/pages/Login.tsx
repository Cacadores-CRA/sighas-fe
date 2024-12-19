import { formLoginSchema } from '@/schema/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import axios from 'axios';
// import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Add this interface for the response type
interface AuthResponse {
  token: string;
  expiresIn: string;
  user: {
    username: string;
    // add other user fields as needed
  };
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  

  const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
    try {
      const response = await axios.post<AuthResponse>(
        'http://localhost:8080/v1/auth',
        data
      );

      // Save auth data to localStorage
      const authData = {
        token: response.data.token,
        expiresIn: response.data.expiresIn,
        user: response.data.user,
      };

      localStorage.setItem('auth', JSON.stringify(authData));

      // Navigate to dashboard after successful login
      navigate({ to: '/home' });
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error here
    }
  };

  return (
    <div className='flex flex-col flex-1 gap-4 items-center justify-center'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-6xl font-bold text-primary'>SIGHAS</h1>
        <h2 className='text-4xl font-medium text-zinc-800 '>Login</h2>

        {/* <div className='flex  items-center gap-2'>
          <p className=' text-zinc-500 text-base'>Novo no SIGHAS?</p>
          <Link to='/register' className='text-primary underline text-base'>
            Registre-se gratuitamente
          </Link>
        </div> */}
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
                  {/* <Label>Senha</Label> */}
                  {/* TODO: Add password lock icon and a show/hide password button */}
                  <Input
                    placeholder='Digita sua senha'
                    type='password'
                    required
                    {...field}
                  />
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

          <Button
            color='#172554'
            size='lg'
            className='text-white bg-primary hover:bg-primary/90 mt-4'
            type='submit'
            disabled={Object.keys(form.formState.errors).length > 0}
          >
            Login
          </Button>
          <div className='flex w-full items-center justify-center'></div>
        </form>
      </Form>
    </div>
  );
};
