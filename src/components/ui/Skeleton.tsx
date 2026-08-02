import * as React from "react";

import { cn } from "@/utils/cn";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-[var(--surface-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };