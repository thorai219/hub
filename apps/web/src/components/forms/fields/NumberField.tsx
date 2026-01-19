import * as React from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NumberFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  prefix?: string;
  suffix?: string;
  containerClassName?: string;
}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, error, required, hint, prefix, suffix, containerClassName, className, ...props }, ref) => {
    return (
      <FormField label={label} error={error} required={required} hint={hint} className={containerClassName}>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {prefix}
            </span>
          )}
          <Input
            ref={ref}
            type="number"
            step="0.01"
            className={cn(
              prefix && 'pl-8',
              suffix && 'pr-12',
              error && 'border-destructive',
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </FormField>
    );
  }
);

NumberField.displayName = 'NumberField';
