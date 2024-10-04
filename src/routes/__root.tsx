import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// import { Loading } from '@/components/Loading';
// import {
//   AuthErrorBoundary,
//   GeneralErrorBoundary,
// } from '@/components/error-boundary';

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
  return (
    <>
      {/* <GeneralErrorBoundary>
        <AuthErrorBoundary> */}
      <Suspense
      // fallback={<Loading />}
      >
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
      {/* </AuthErrorBoundary>
      </GeneralErrorBoundary> */}
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
