import { lazy, Suspense } from 'react';
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';


const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

const TailwindIndicator = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      import('@/components/TailwindIndicator').then((res) => ({
        default: res.TailwindIndicator,
      }))
    );

// Defining the type for the router context

const Root = () => {
  const { isValid } = useAuth();
  const navigate = useNavigate();

  if (isValid) {
    navigate({
      to: '/home',
    });

  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Suspense
        fallback={
          <div className='bg-gray-800 fixed bottom-1 left-20 z-50 flex size-6 animate-pulse items-center justify-start rounded-full p-3 font-mono text-sm text-white'>
            <div>TanStackRouter / tailwind Devtools</div>
          </div>
        }
      >
        <TanStackRouterDevtools />
        <TailwindIndicator />
      </Suspense>
    </>
  );
};

interface MyRouterContext {
  isAuthenticated: boolean | undefined;
}
// Creating the route with context
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
