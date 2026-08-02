import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "rounded-full",
    "border",
    "px-2.5",
    "py-0.5",
    "text-xs",
    "font-medium",
    "transition-colors",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent",
          "bg-[var(--primary)]",
          "text-[var(--primary-foreground)]",
        ],

        secondary: [
          "border-[var(--border)]",
          "bg-[var(--surface-secondary)]",
          "text-[var(--text-primary)]",
        ],

        outline: [
          "border-[var(--border)]",
          "bg-transparent",
          "text-[var(--text-primary)]",
        ],

        success: [
          "border-transparent",
          "bg-green-500/10",
          "text-green-600",
          "dark:text-green-400",
        ],

        destructive: [
          "border-transparent",
          "bg-[var(--destructive)]",
          "text-white",
        ],
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };