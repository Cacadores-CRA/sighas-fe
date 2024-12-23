import { createFileRoute } from '@tanstack/react-router';

import { ClassesPage } from '@/pages/Classes/Classes';

export const Route = createFileRoute('/_dashboard/classes')({
  component: ClassesPage,
});
