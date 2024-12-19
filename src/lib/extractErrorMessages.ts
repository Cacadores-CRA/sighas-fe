import { type AxiosError } from 'axios';

// This is called a guard function in typescript
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export type UnauthorizedError = AxiosError;

export const isUnauthorizedError = (
  error: unknown
): error is UnauthorizedError => {
  if (isAxiosError(error)) {
    return (
      (error.response?.status === 401 &&
        error.response?.statusText === 'Unauthorized') ??
      false
    );
  }
  return false;
};

// Define a more flexible error type that can handle various error structures
export type FlexibleError = {
  message?: string;
  errors?: Array<
    | {
        code?: string;
        detail?: string;
        attr?: string | null;
      }
    | string
  >; // Allow errors to be either an object with details or just strings
};

export function extractErrorMessages(error: AxiosError<FlexibleError>) {
  if (!error.response?.data) return ['No data inside error response'];

  const data = error.response.data;
  const messages: string[] = [];

  // Handle errors array if it exists
  if (data.errors && Array.isArray(data.errors)) {
    data.errors.forEach((err) => {
      if (typeof err === 'string') {
        // Directly push string errors
        messages.push(err);
      } else if (
        typeof err === 'object' &&
        err !== null &&
        err.attr === 'detail'
      ) {
        messages.push(`${err.code}: ${err.detail}`);
      } else {
        // Handle object errors with detail and attribute
        const attribute = err.attr ? `${err.attr}: ` : '';
        const detail = err.detail || 'Unknown error detail';
        messages.push(`${attribute}${detail}`);
      }
    });
  } else if (data.message) {
    // Handle a single message
    messages.push(data.message);
  } else {
    // Fallback for unexpected error structures
    messages.push('An unexpected error occurred');
  }

  return messages;
}
