"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  ALL_COMMAND_ITEMS,
  type NavigationItem,
} from "@/constants/navigation";
import { cn } from "@/utils/cn";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

function matchesQuery(item: NavigationItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [item.label, ...(item.keywords ?? [])]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const filteredItems = React.useMemo(
    () => ALL_COMMAND_ITEMS.filter((item) => matchesQuery(item, query)),
    [query],
  );

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    inputRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = React.useCallback(
    (item: NavigationItem) => {
      onClose();

      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }

      router.push(item.href);
    },
    [onClose, router],
  );

  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) =>
          filteredItems.length === 0
            ? 0
            : (index + 1) % filteredItems.length,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) =>
          filteredItems.length === 0
            ? 0
            : (index - 1 + filteredItems.length) % filteredItems.length,
        );
        return;
      }

      if (event.key === "Enter" && filteredItems[activeIndex]) {
        event.preventDefault();
        handleSelect(filteredItems[activeIndex]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filteredItems, activeIndex, onClose, handleSelect]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[calc(var(--z-modal)+10)] flex items-start justify-center p-4 pt-[12vh] sm:p-6">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-2xl",
          "border border-[var(--border)] bg-[var(--surface)] shadow-2xl",
        )}
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, actions, links…"
            className={cn(
              "w-full bg-transparent text-sm text-[var(--text-primary)] outline-none",
              "placeholder:text-[var(--text-muted)]",
            )}
          />
          <kbd className="hidden rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)] sm:inline">
            esc
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">
              No matches found.
            </li>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm",
                      "transition-colors duration-150",
                      isActive
                        ? "bg-[var(--primary)]/12 text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--accent)]",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                    <span className="flex-1">{item.label}</span>
                    {item.external && (
                      <span className="text-xs text-[var(--text-muted)]">
                        External
                      </span>
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="border-t border-[var(--border)] px-4 py-2 text-[11px] text-[var(--text-muted)]">
          ↑↓ navigate · Enter open · Esc close
        </div>
      </div>
    </div>
  );
}
