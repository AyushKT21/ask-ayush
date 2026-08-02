import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type PanelHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function PanelHeading({
  title,
  description,
  className,
  children,
}: PanelHeadingProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      )}

      {children}
    </div>
  );
}
