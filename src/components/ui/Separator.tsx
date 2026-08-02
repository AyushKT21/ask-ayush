import * as React from "react";

import { cn } from "@/utils/cn";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <hr
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full border-0 bg-[var(--border)]"
          : "h-full w-px border-0 bg-[var(--border)]",
        className,
      )}
      {...props}
    />
  );
}

Separator.displayName = "Separator";

export { Separator };