import { createFileRoute } from '@tanstack/react-router';

import { UsersPage } from '@/pages/Users/Users';

export const Route = createFileRoute('/_dashboard/users')({
  component: UsersPage,
});
