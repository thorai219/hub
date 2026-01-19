import * as React from 'react';
import { FormField } from './FormField';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[] | string[];
  error?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  containerClassName?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, required, hint, placeholder, containerClassName, className, ...props }, ref) => {
    // Normalize options to always be {value, label} format
    const normalizedOptions = options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    return (
      <FormField label={label} error={error} required={required} hint={hint} className={containerClassName}>
        <select
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }
);

SelectField.displayName = 'SelectField';
