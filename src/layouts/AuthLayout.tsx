import { Outlet } from '@tanstack/react-router';

export const AuthLayout = () => {
  return (
    <div className='flex h-screen w-screen bg-[#D7DDE5] p-4'>
      <div className='flex-1 w-full max-w-xl mx-auto my-auto bg-white rounded-xl shadow-md h-3/5 overflow-hidden p-10'>
        <Outlet />
      </div>
    </div>
  );
};
