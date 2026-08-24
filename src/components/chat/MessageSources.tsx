import { cn } from "@/utils/cn";

type MessageSourcesProps = {
  sources: string[];
  className?: string;
};

export function MessageSources({ sources, className }: MessageSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <p
      className={cn(
        "mt-3 border-t border-[var(--border)] pt-2.5",
        "text-xs text-[var(--text-muted)]",
        className,
      )}
    >
      <span className="font-medium text-[var(--text-secondary)]">Sources:</span>{" "}
      {sources.join(", ")}
    </p>
  );
}
