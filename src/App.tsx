import { RouterProvider } from '@tanstack/react-router';

import { Suspense } from 'react';
// import { Loading } from './components/Loading';
import { router } from '@/router';

const AuthenticatedApp = () => {
  return <RouterProvider router={router} />;
};

export const InnerApp = () => {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <AuthenticatedApp />
    </Suspense>
  );
};
