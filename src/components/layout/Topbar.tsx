"use client";

import { Bell, Menu } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/utils/cn";

type TopbarProps = {
  onMenuClick?: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-3 sm:h-16",
        "border-b border-[var(--border)]",
        "bg-[var(--background)]/80 backdrop-blur-md",
        "px-4 sm:px-6",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 space-y-0.5">
          <h1 className="truncate text-base font-semibold text-[var(--foreground)]">
            AI Portfolio
          </h1>
          <p className="truncate text-xs text-[var(--muted-foreground)] sm:text-sm">
            Ask anything about Ayush.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notifications"
          className="hidden h-10 w-10 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)] sm:flex"
        >
          <Bell className="h-4 w-4" />
        </button>
        <Avatar fallback="AK" className="h-8 w-8 sm:h-9 sm:w-9" />
      </div>
    </header>
  );
}
