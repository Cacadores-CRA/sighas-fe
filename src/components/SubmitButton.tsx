import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useFormState } from 'react-hook-form';

import { Button, type ButtonProps } from '@/components/ui/button';

type SubmitButtonProps = {
  disableIfInvalid?: boolean;
  disableIfUntouched?: boolean;
  isSubmitting?: boolean; // Hey, i'm dealing with the submit status manually because i can't use hook form submit handler right now (due to validations)
} & ButtonProps;

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    children,
    disableIfInvalid,
    disableIfUntouched,
    disabled,
    isSubmitting: isSubmittingProp,
    ...rest
  } = props;

  const { isDirty, isValid, isSubmitting } = useFormState();

  const isDisabled =
    (disableIfUntouched && !isDirty) ||
    (disableIfInvalid && !isValid) ||
    disabled;

  useEffect(() => {}, [isSubmitting]);

  return (
    <Button
      {...rest}
      type='submit'
      disabled={isDisabled || isSubmittingProp || isSubmitting}
    >
      {(isSubmitting || isSubmittingProp) && (
        <Loader2 className='mr-2 size-4 animate-spin' />
      )}
      {children}
    </Button>
  );
};
