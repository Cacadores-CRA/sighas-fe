import { createFileRoute } from '@tanstack/react-router';

import { TeacherPage } from '@/pages/Teacher';

export const Route = createFileRoute('/_dashboard/teachers/$id')({
  component: TeacherPage,
});
