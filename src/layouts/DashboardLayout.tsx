import { Navigate, Outlet } from '@tanstack/react-router';

import { useAuthenticated } from '@/hooks/useAuthenticated';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export const DashboardLayout = () => {
  const { isValid, data } = useAuthenticated();

  if (!isValid) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className='bg-background flex-1 flex flex-col  py-12 px-20'>
          <div className='flex flex-col gap-10'>
            <h1 className='text-2xl font-medium'>{`Olá, ${data?.userName} 👋`}</h1>
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};
