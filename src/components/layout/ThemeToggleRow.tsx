"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/utils/cn";

type ThemeToggleRowProps = {
  className?: string;
};

export function ThemeToggleRow({ className }: ThemeToggleRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-[var(--border)]",
        "bg-[var(--surface-secondary)]/60 px-3 py-2",
        className,
      )}
    >
      <span className="text-sm text-[var(--muted-foreground)]">Theme</span>
      <ThemeToggle />
    </div>
  );
}
