import { ExternalLink } from "lucide-react";

import { PROFILE } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

type ClassicPortfolioLinkProps = {
  className?: string;
};

export function ClassicPortfolioLink({ className }: ClassicPortfolioLinkProps) {
  return (
    <a
      href={PROFILE.classicPortfolioHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        "text-sm font-medium text-[var(--primary)]",
        "transition-colors hover:text-[var(--primary-hover)] hover:underline underline-offset-2",
        className,
      )}
    >
      Want to see my other portfolio?
      <span className="text-[var(--text-secondary)]">Edge Folio</span>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" />
    </a>
  );
}
