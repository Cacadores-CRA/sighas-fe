import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

import { CircleCheckBig } from 'lucide-react';

import { StepUserSearch } from './Steps/UserSearch';
import { Link, useNavigate } from '@tanstack/react-router';
import { StepCodeVerification } from './Steps/CodeVerification';
import { StepNewPassword } from './Steps/NewPassword';

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
