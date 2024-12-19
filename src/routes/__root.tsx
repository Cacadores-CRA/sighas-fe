import { lazy, Suspense } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Loading } from '@/components/Loading';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

const TailwindIndicator = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@/components/TailwindIndicator').then((res) => ({
        default: res.TailwindIndicator,
      }))
    );

interface MyRouterContext {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  beforeLoad: () => {
    const authData = localStorage.getItem('auth');
    const isValid = authData ? true : false;

    return {
      isAuthenticated: isValid,
    };
  },
});

function Root() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
        <TailwindIndicator />
      </Suspense>
    </>
  );
}
