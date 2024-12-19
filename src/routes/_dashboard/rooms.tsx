import { createFileRoute } from '@tanstack/react-router';

import { RoomsPage } from '@/pages/Rooms/Rooms';

export const Route = createFileRoute('/_dashboard/rooms')({
  component: RoomsPage,
});
