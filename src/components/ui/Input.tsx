import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputVariants = cva(
  [
    "flex w-full rounded-[calc(var(--radius-md)-2px)]",
    "border border-[var(--border)]",
    "bg-[var(--surface)]",
    "px-4 py-2.5",
    "text-sm text-[var(--text-primary)]",
    "placeholder:text-[var(--text-muted)]",
    "transition-colors transition-shadow duration-200",
    "outline-none",

    "focus-visible:ring-2",
    "focus-visible:ring-[var(--ring)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--background)]",

    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    "read-only:bg-[var(--surface-secondary)]",

    "file:border-0",
    "file:bg-transparent",
    "file:text-sm",
    "file:font-medium",
  ],
  {
    variants: {
      variant: {
        default: "",

        error: [
          "border-[var(--destructive)]",
          "focus-visible:ring-[var(--destructive)]",
        ],
      },

      size: {
        sm: "h-9",
        md: "h-11",
        lg: "h-12 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={variant === "error"}
        className={cn(
          inputVariants({
            variant,
            size,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };