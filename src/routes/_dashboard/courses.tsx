import { createFileRoute } from '@tanstack/react-router';

import { CoursesPage } from '@/pages/Courses/Courses';

export const Route = createFileRoute('/_dashboard/courses')({
  component: CoursesPage,
});
