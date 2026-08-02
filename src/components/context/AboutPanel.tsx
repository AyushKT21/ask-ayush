import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { PROFILE } from "@/constants/portfolio";

import { PanelHeading } from "./PanelHeading";

export function AboutPanel() {
  return (
    <div className="space-y-6">
      <PanelHeading title="About me" />

      <Card className="shadow-sm">
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-3">
            <Avatar fallback="AY" className="h-12 w-12 text-sm" />

            <div>
              <p className="text-lg font-semibold">{PROFILE.fullName}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {PROFILE.title} · {PROFILE.tagline} · {PROFILE.location}
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {PROFILE.summary}
          </p>

          {PROFILE.bio.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {paragraph}
            </p>
          ))}

          <Link
            href={PROFILE.classicPortfolioHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View my classic portfolio (Edge Folio) →
          </Link>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <PanelHeading title="Highlights" />

        <ul className="space-y-2">
          {PROFILE.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-[var(--text-secondary)]"
            >
              <Badge variant="secondary" className="mt-0.5 shrink-0">
                ✦
              </Badge>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
