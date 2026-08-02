import * as React from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export interface SuggestionChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

function SuggestionChip({
  className,
  icon,
  children,
  ...props
}: SuggestionChipProps) {
  return (
    <Button
      variant="secondary"
      className={cn(
        [
          "justify-start",
          "gap-3",
          "rounded-[var(--radius-lg)]",
          "border-[var(--border)]",
          "bg-[var(--surface)]",
          "px-4",
          "py-3",
          "text-left",
          "font-medium",
          "hover:bg-[var(--surface-hover)]",
        ],
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 text-[var(--primary)]">
          {icon}
        </span>
      )}

      <span className="truncate">
        {children}
      </span>
    </Button>
  );
}

SuggestionChip.displayName = "SuggestionChip";

export { SuggestionChip };