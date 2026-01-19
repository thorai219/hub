import * as React from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  containerClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, hint, containerClassName, className, ...props }, ref) => {
    return (
      <FormField label={label} error={error} required={required} hint={hint} className={containerClassName}>
        <Input
          ref={ref}
          className={cn(
            error && 'border-destructive',
            className
          )}
          {...props}
        />
      </FormField>
    );
  }
);

InputField.displayName = 'InputField';
