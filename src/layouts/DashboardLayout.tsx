import { Navigate, Outlet } from '@tanstack/react-router';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuthenticated } from '@/hooks/useAuthenticated';

export const DashboardLayout = () => {
  const { isValid } = useAuthenticated();

  if (!isValid) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className='bg-background flex-1 flex py-12 px-20'>
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};
