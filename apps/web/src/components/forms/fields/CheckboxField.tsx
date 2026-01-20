import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxFieldProps {
  label: string | React.ReactNode;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
}

export const CheckboxField = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxFieldProps
>(
  (
    { label, error, hint, disabled, className, checked, defaultChecked, onCheckedChange, name },
    ref,
  ) => {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex items-center space-x-2">
          <Checkbox
            ref={ref}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            name={name}
            className={cn(error && "border-destructive")}
          />
          <Label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "cursor-not-allowed opacity-70",
            )}
          >
            {label}
          </Label>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!error && hint && (
          <p className="text-sm text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);

CheckboxField.displayName = "CheckboxField";
