import { createFileRoute } from '@tanstack/react-router';

import { ClassePage } from '@/pages/Classe/Classe';

export const Route = createFileRoute('/_dashboard/classes/$id')({
  component: ClassePage,
});
