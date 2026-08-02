import * as React from "react";

import { cn } from "@/utils/cn";

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="text-[var(--text-secondary)]">
          {icon}
        </div>
      )}

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };