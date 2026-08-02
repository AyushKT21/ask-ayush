import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { EXPERIENCE } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

import { PanelHeading } from "./PanelHeading";

export function ExperiencePanel() {
  return (
    <div className="space-y-4">
      <PanelHeading
        title="Experience"
        description="Roles where I grew as a React engineer and shipped real products."
      />

      <div className="relative space-y-6 pl-4">
        <div
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--border)]"
        />

        {EXPERIENCE.map((entry) => (
          <div key={entry.id} className="relative pl-6">
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2",
                entry.current
                  ? "border-[var(--primary)] bg-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--surface)]",
              )}
            />

            <Card>
              <CardContent className="space-y-2 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{entry.role}</p>
                  {entry.current && (
                    <Badge variant="secondary">Current</Badge>
                  )}
                </div>

                <p className="text-sm text-[var(--text-muted)]">
                  {entry.company} · {entry.period}
                </p>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
