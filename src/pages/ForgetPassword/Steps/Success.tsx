import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';

export const StepSuccess = () => {
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
