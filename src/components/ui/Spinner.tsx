import * as React from "react";

import { cn } from "@/utils/cn";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

function Spinner({
  className,
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <div
      aria-label="Loading"
      role="status"
      className={cn(
        "animate-spin rounded-full border-current border-r-transparent",
        spinnerSizes[size],
        className,
      )}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };