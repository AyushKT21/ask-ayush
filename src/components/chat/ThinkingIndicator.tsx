"use client";

import * as React from "react";

import { cn } from "@/utils/cn";

const STEPS = [
  "Thinking…",
  "Searching portfolio…",
  "Preparing response…",
];

export function ThinkingIndicator({ className }: { className?: string }) {
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((index) => (index + 1) % STEPS.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-thinking-dot"
            style={{ animationDelay: `${dot * 0.15}s` }}
          />
        ))}
      </span>
      <span className="text-sm text-[var(--text-secondary)] transition-opacity duration-300">
        {STEPS[stepIndex]}
      </span>
    </div>
  );
}
