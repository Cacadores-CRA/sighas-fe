import { createFileRoute } from '@tanstack/react-router';

import { StudentsPage } from '@/pages/Students/Students';

export const Route = createFileRoute('/_dashboard/students/')({
  component: StudentsPage,
});
