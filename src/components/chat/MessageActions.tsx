"use client";

import * as React from "react";
import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/utils/cn";

type MessageActionsProps = {
  content: string;
  onRegenerate?: () => void;
  className?: string;
};

export function MessageActions({
  content,
  onRegenerate,
  className,
}: MessageActionsProps) {
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 pt-2 opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Copy message"
        className="action-chip"
        onClick={handleCopy}
      >
        <Copy className="h-3.5 w-3.5" />
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>

      {onRegenerate && (
        <button
          type="button"
          aria-label="Regenerate response"
          className="action-chip"
          onClick={onRegenerate}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Regenerate</span>
        </button>
      )}

      <button
        type="button"
        aria-label="Good response"
        className={cn("action-chip", feedback === "up" && "action-chip-active")}
        onClick={() => setFeedback("up")}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        aria-label="Bad response"
        className={cn(
          "action-chip",
          feedback === "down" && "action-chip-active",
        )}
        onClick={() => setFeedback("down")}
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
