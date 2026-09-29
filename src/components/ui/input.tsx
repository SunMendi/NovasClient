import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-border/80 bg-navy-950 px-4 py-2 text-sm text-ink placeholder:text-metal/60 focus-visible:outline-none focus-visible:border-amber-signal focus-visible:ring-2 focus-visible:ring-amber-signal/30 disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
