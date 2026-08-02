import { Download, FileText } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PROFILE, RESUME } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

import { PanelHeading } from "./PanelHeading";

export function ResumePanel() {
  return (
    <div className="space-y-4">
      <PanelHeading title="Resume" />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
              <FileText className="h-5 w-5 text-[var(--primary)]" />
            </div>

            <div>
              <p className="font-semibold">{PROFILE.fullName}</p>
              <p className="text-sm text-[var(--text-muted)]">
                Updated {RESUME.lastUpdated}
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {RESUME.headline}
          </p>

          <Link
            href={RESUME.downloadHref}
            download={RESUME.fileName}
            className={cn(buttonVariants({ variant: "primary" }), "w-full")}
          >
            <Download className="h-4 w-4" />
            Download resume
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
