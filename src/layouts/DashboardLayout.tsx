import { Outlet } from '@tanstack/react-router';

export const DashboardLayout = () => {
  return (
    <div className='flex h-screen w-screen bg-[#D7DDE5] p-4 shadow-md'>
        <Outlet />aaaa
    </div>
  );
};
