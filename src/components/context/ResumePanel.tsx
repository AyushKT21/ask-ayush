"use client";

import * as React from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PROFILE, RESUME } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

import { PanelHeading } from "./PanelHeading";

export function ResumePanel() {
  const [showPreview, setShowPreview] = React.useState(false);

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

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-full sm:w-auto",
              )}
              onClick={() => setShowPreview((value) => !value)}
            >
              {showPreview ? "Hide preview" : "Preview PDF"}
            </button>

            <Link
              href={RESUME.downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-full sm:w-auto",
              )}
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </Link>

            <Link
              href={RESUME.downloadHref}
              download={RESUME.fileName}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "w-full sm:w-auto",
              )}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Link>
          </div>

          {showPreview && (
            <div
              className={cn(
                "overflow-hidden rounded-lg border border-[var(--border)]",
                "bg-[var(--surface-secondary)]",
              )}
            >
              <iframe
                title="Resume preview"
                src={RESUME.downloadHref}
                className="h-[min(70vh,520px)] w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
