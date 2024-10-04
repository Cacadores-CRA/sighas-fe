import { createRouter } from '@tanstack/react-router';

// import { NotFoundPage } from '@/pages/NotFound';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    isAuthenticated: undefined!,
  },
  defaultNotFoundComponent: () => <div>404</div>,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    isRestrictedPage?: boolean;
  }
}
