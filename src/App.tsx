import { Suspense } from 'react';
// import { Loading } from './components/Loading';
import { router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

const AuthenticatedApp = () => {
  return <RouterProvider router={router} />;
};

// Create a client
const queryClient = new QueryClient();

export const InnerApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<span>Loading...</span>}>
        <AuthenticatedApp />
      </Suspense>
    </QueryClientProvider>
  );
};
