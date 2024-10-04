import { Link } from '@tanstack/react-router';

export const LoginPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>SIGHAS</h1>
      <h2 className='text-lg font-medium'>Login</h2>

      <div>
        <p>Novo no SIGHAS?</p>
        <Link to='/register'>Registre-se gratuitamente</Link>
      </div>
    </div>
  );
};
