import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2.5",
    "whitespace-nowrap rounded-[calc(var(--radius-md)-2px)]",
    "font-semibold",
    "transition-colors transition-shadow transition-transform duration-200",
    "select-none",
    "outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "active:scale-[0.97]",
    "active:shadow-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--ring)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--background)]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--primary)]",
          "text-[var(--primary-foreground)]",

          "hover:bg-[var(--primary-hover)]",
          "hover:shadow-md",
        ],

        secondary: [
          "border",
          "border-[var(--border)]",
          "bg-[var(--surface-secondary)]",
          "text-[var(--text-primary)]",

          "hover:bg-[var(--surface-hover)]",
          "hover:shadow-sm",
        ],

        outline: [
          "border",
          "border-[var(--border)]",
          "bg-transparent",
          "text-[var(--text-primary)]",

          "hover:bg-[var(--surface-secondary)]",
          "hover:shadow-sm",
        ],

        ghost: [
          "bg-transparent",
          "text-[var(--text-primary)]",

          "hover:bg-[var(--surface-secondary)]",
        ],

        destructive: [
          "bg-[var(--destructive)]",
          "text-white",

          "hover:opacity-90",
          "hover:shadow-md",
        ],

        link: [
          "h-auto",
          "bg-transparent",
          "p-0",
          "text-[var(--primary)]",
          "underline-offset-4",

          "hover:underline",
        ],
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md: "h-11 px-5 text-sm",

        lg: "h-12 px-6 text-base",

        icon: "h-11 w-11 p-0",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        aria-busy={loading}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className,
        )}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        ) : (
          leftIcon
        )}

        {children}

        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };