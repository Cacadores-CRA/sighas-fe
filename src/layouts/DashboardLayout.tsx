import { Outlet } from '@tanstack/react-router';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export const DashboardLayout = () => {
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
