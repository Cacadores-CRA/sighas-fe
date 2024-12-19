import { createFileRoute } from '@tanstack/react-router';

import { StudentPage } from '@/pages/Student';

export const Route = createFileRoute('/_dashboard/students/$id')({
  component: StudentPage,
});
