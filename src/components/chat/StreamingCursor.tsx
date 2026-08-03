import { cn } from "@/utils/cn";

export function StreamingCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-0.5 inline-block h-[1em] w-[2px] align-middle",
        "bg-[var(--primary)] animate-stream-cursor",
        className,
      )}
      aria-hidden
    />
  );
}
