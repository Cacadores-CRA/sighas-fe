import { useMemo, useState } from 'react';

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

import { CircleCheckBig, ShieldCheck, UserSearch } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { formForgetPasswordNewCredentialsSchema } from '@/schema/ForgetPassword';
import { useForm } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { StepUserSearch } from './Steps/UserSearch';
import { Link, useNavigate } from '@tanstack/react-router';

const StepCodeVerification = ({ onNextStep }: { onNextStep: () => void }) => {
  const onSubmit = () => {
    onNextStep();
  };

  return (
    <div className='flex w-full flex-col gap-4 items-center'>
      <div className='flex flex-col gap-2 items-center'>
        <div className='size-auto rounded-md bg-primary p-3 '>
          <ShieldCheck className='size-10 text-white' />
        </div>
        <h2 className='text-2xl font-medium text-zinc-800 '>
          Verificação de código
        </h2>
        {/* TODO: show the some caracteres of email from user in here later... */}
        <p className='text-sm text-zinc-600'>
          Digite o código que você recebeu no seu <strong>email</strong>.
        </p>
      </div>

      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button size='lg' className=' w-full mt-4' onClick={onSubmit}>
        Verificar
      </Button>
    </div>
  );
};

const StepNewPassword = ({ onNextStep }: { onNextStep: () => void }) => {
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
          <div className='flex w-full items-center justify-center'></div>
        </form>
      </Form>
    </div>
  );
};

const StepSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-2 items-center'>
        <div className='size-auto rounded-md bg-primary p-3 '>
          <CircleCheckBig className='size-10 text-white' />
        </div>
        <h2 className='text-2xl font-medium text-zinc-800 '>
          Senha alterada com sucesso!
        </h2>
        <p className='text-sm text-zinc-600'>
          Está tudo certo! Agora você pode <Link to='/login'>entrar</Link> com
          sua nova senha.
        </p>
      </div>

      <Button
        size='lg'
        className=' mt-4'
        onClick={() => navigate({ to: '/login' })}
      >
        Certo
      </Button>
    </div>
  );
};

const Steps = {
  1: StepUserSearch,
  2: StepCodeVerification,
  3: StepNewPassword,
  4: StepSuccess,
};

export const ForgetPasswordPage = () => {
  const [step, setStep] = useState<number>(1);

  const CurrentStep = useMemo(() => Steps[step as keyof typeof Steps], [step]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <CurrentStep onNextStep={handleNextStep} />
    </div>
  );
};
