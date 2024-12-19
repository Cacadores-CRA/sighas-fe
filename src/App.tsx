import { Suspense } from 'react';
// import { Loading } from './components/Loading';
import { router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';


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
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position='top-right' />
    </QueryClientProvider>
  );
};
