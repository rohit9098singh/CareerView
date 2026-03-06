import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value: propValue, defaultValue, onChange, ...props }, ref) => {
    // File inputs must never be controlled (no value prop)
    // For other inputs, only pass value prop if it's explicitly provided and not undefined/null
    const inputProps = type === 'file' 
      ? { onChange } 
      : propValue !== undefined && propValue !== null
        ? { value: propValue, onChange }
        : { defaultValue: defaultValue ?? '', onChange };

    return (
      <input
        type={type}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/30 selection:text-primary dark:bg-input/20 border-input flex h-10 w-full min-w-0 rounded-md border bg-background px-3 py-2 text-base shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        ref={ref}
        data-slot="input"
        {...props}
        {...inputProps}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
