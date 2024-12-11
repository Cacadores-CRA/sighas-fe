import { TeachersPage } from '@/pages/Teachers/Teachers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/teachers')({
  component: TeachersPage,
});
