import * as React from 'react';
import InputMask from 'react-input-mask';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const inputStyles = cn(
      'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    );

    if (mask) {
      return (
        <InputMask mask={mask} type={type} className={inputStyles} {...props}>
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <input ref={ref} {...inputProps} />
          )}
        </InputMask>
      );
    }

    return <input type={type} className={inputStyles} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';

export { Input };
