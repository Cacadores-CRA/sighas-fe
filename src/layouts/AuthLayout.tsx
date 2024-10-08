import { Outlet } from '@tanstack/react-router';

export const AuthLayout = () => {
  return (
    <div className='flex h-screen w-screen bg-[#D7DDE5] p-4 shadow-md'>
      <div className='flex-1 w-full max-w-96 mx-auto my-auto bg-white rounded-xl shadow-md max-h-[500px] overflow-hidden p-8'>
        <Outlet />
      </div>
    </div>
  );
};
