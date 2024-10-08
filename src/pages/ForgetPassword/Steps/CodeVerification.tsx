import { Button } from '@/components/ui/button';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ShieldCheck } from 'lucide-react';

export const StepCodeVerification = ({
  onNextStep,
}: {
  onNextStep: () => void;
}) => {
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
