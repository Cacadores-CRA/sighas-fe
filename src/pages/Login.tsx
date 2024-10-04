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
import { formLoginSchema } from '@/schema/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formLoginSchema>) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col flex-1 gap-8 items-center justify-center'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-6xl font-bold text-[#172554]'>SIGHAS</h1>
        <h2 className='text-5xl font-medium text-zinc-800 '>Login</h2>

        <div className='flex  items-center gap-2'>
          <p className=' text-zinc-500 text-base'>Novo no SIGHAS?</p>
          <Link to='/register' className='text-[#172554] underline text-base'>
            Registre-se gratuitamente
          </Link>
        </div>
      </div>

      <Form {...form}>
        <form
          className='items flex flex-col gap-4 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  {/* <Label>Email</Label> */}
                  <Input
                    placeholder='Digita seu email'
                    type='email'
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            color='#172554'
            size='lg'
            className='text-white bg-[#172554] hover:bg-[#172554]/90'
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
