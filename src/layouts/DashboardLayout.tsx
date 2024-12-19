import { Navigate, Outlet } from '@tanstack/react-router';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

export const DashboardLayout = () => {
  const { isValid } = useAuth();

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
