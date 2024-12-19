import { useEffect, type ErrorInfo, type ReactNode } from 'react';
import { QueryErrorResetBoundary, useQueryClient } from '@tanstack/react-query';
import {
  useLocation,
  useMatchRoute,
  useNavigate,
} from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { isUnauthorizedError } from '@/lib/extractErrorMessages';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/Loading';

/**
 * This component handles unauthorized (401) errors by resetting the auth user query and redirecting to the login page.
 *
 */
export const AuthErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();

  const location = useLocation();

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      console.log('AuthFallback error: ', error);

      // Clear all queries
      queryClient.clear();

      // Invalidate auth queries without refetching
      queryClient.invalidateQueries({
        queryKey: ['/auth/check/'],
        refetchType: 'none',
      });

      const isLoginPage = matchRoute({ to: '/login' });

      // Navigate to login page only if not already on a login-related page
      if (!isLoginPage) {
        navigate({
          to: '/login',
          replace: true,
        });
      }

      // Reset the error boundary
      resetErrorBoundary();
    }
  }, [error, queryClient, navigate, resetErrorBoundary, location, matchRoute]);

  return <Loading />;
};

/**
 * This component displays a generic error message with a retry button.
 * @param error - The error that occurred.
 * @param resetErrorBoundary - Resets the error boundary, making the component try to render again. Also we are using with Tanstack Query, so it will also try to refetch the query too.
 */
// export const GeneralErrorFallback = ({
//   error,
//   resetErrorBoundary,
// }: FallbackProps) => {
//   return (
//     <Alert variant='destructive'>
//       <AlertCircle className='size-4' />
//       <AlertTitle>{error.name || 'Error'}</AlertTitle>
//       <AlertDescription>
//         {error.message || 'An error occurred'}
//       </AlertDescription>
//       <Button onClick={resetErrorBoundary} aria-label={'try again'}>
//         Try again
//       </Button>
//     </Alert>
//   );
// };
export const GeneralErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className='bg-gray-900 mx-auto mt-10 max-w-md rounded-lg p-6 text-white shadow-lg'>
      <div className='mb-4 flex items-center justify-center'>
        <AlertCircle className='mr-2 size-6 text-primary' />
        <h2 className='text-xl font-semibold'>{error.name || 'Error'}</h2>
      </div>
      <p className='text-gray-300 mb-6 text-center'>
        {error.message || 'An error occurred. Please try again.'}
      </p>
      <div className='flex justify-center'>
        <Button
          onClick={resetErrorBoundary}
          // className='w-full rounded bg-orange-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-orange-600'
          variant='default'
          aria-label='Try again'
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

/**
 * This boundary catches unauthorized errors and uses the AuthErrorFallback to redirect the user to the login page.
 */
export const AuthErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={AuthErrorFallback}
          onError={(error) => {
            if (!isUnauthorizedError(error)) {
              throw error; // Let the error propagate to the next boundary if it's not a 401
            }
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

type GeneralErrorBoundaryProps = {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, info: ErrorInfo) => void;
};

/**
 * This boundary catches all errors except unauthorized errors.
 * If it catches an unauthorized error, it will throw it for the AuthErrorBoundary to handle.
 * It allows for a custom FallbackComponent, defaulting to GeneralErrorFallback if not provided.
 *
 * @example
 * ```tsx
 * <GeneralErrorBoundary>
 *   <YourComponent />
 * </GeneralErrorBoundary>
 * ```
 *
 * @example
 * ```tsx
 * <GeneralErrorBoundary FallbackComponent={CustomErrorFallback}>
 *   <YourComponent />
 * </GeneralErrorBoundary>
 * ```
 */
export const GeneralErrorBoundary = ({
  children,
  FallbackComponent = GeneralErrorFallback,
  onError,
}: GeneralErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={FallbackComponent}
          onError={(error, info) => {
            if (isUnauthorizedError(error)) {
              throw error; // Rethrow 401 errors to be caught by AuthErrorBoundary
            } else if (onError) {
              onError(error, info);
            }
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

// Usage examples:

// 1. For components that only need general error handling:
// <GeneralErrorBoundary>
//   <YourComponent />
// </GeneralErrorBoundary>

// 2. For components that need general error handling with a custom fallback:
// <GeneralErrorBoundary FallbackComponent={CustomErrorFallback}>
//   <YourComponent />
// </GeneralErrorBoundary>

// 3. The AuthErrorBoundary is typically used at a higher level in the app
// and doesn't need to be explicitly used in most components
