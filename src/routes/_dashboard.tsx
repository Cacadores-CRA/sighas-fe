import { createFileRoute, redirect } from '@tanstack/react-router';

import { DashboardLayout } from '@/layouts/DashboardLayout';

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});
