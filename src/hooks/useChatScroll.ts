import * as React from "react";

export function useChatScroll(deps: React.DependencyList) {
  const endRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  React.useEffect(() => {
    scrollToBottom("smooth");
  }, [scrollToBottom, ...deps]);

  return { endRef, scrollToBottom };
}
