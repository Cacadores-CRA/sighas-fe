import { createFileRoute } from '@tanstack/react-router';

import { HomePage } from '@/pages/Dashboard';

export const Route = createFileRoute('/_dashboard/home')({
  component: HomePage,
});
