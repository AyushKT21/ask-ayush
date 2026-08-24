"use client";

import * as React from "react";

import {
  ContextPanel,
  type ContextType,
} from "@/components/context/ContextPanel";
import { cn } from "@/utils/cn";

type AnimatedContextPanelProps = {
  context: ContextType;
};

export function AnimatedContextPanel({ context }: AnimatedContextPanelProps) {
  const [displayedContext, setDisplayedContext] =
    React.useState<ContextType>(context);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (context === displayedContext) return;

    setIsTransitioning(true);

    const swapTimer = window.setTimeout(() => {
      setDisplayedContext(context);
      setIsTransitioning(false);
    }, 180);

    return () => window.clearTimeout(swapTimer);
  }, [context, displayedContext]);

  return (
    <div
      className={cn(
        "min-h-0 transition-all duration-300 ease-out",
        isTransitioning
          ? "pointer-events-none translate-y-2 opacity-0"
          : "translate-y-0 opacity-100 context-panel-animate",
      )}
    >
      <ContextPanel context={displayedContext} />
    </div>
  );
}
