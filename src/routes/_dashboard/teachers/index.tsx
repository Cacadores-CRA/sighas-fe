import { createFileRoute } from '@tanstack/react-router';

import { TeachersPage } from '@/pages/Teachers/Teachers';

export const Route = createFileRoute('/_dashboard/teachers/')({
  component: TeachersPage,
});
