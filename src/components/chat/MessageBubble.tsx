import * as React from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { MessageMarkdown } from "@/components/markdown/MessageMarkdown";
import { MessageActions } from "@/components/chat/MessageActions";
import { MessageSources } from "@/components/chat/MessageSources";
import { StreamingCursor } from "@/components/chat/StreamingCursor";
import { ThinkingIndicator } from "@/components/chat/ThinkingIndicator";
import { cn } from "@/utils/cn";

export interface MessageBubbleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant";
  avatar?: React.ReactNode;
  markdown?: boolean;
  isStreaming?: boolean;
  isThinking?: boolean;
  onRegenerate?: () => void;
  sources?: string[];
  showActions?: boolean;
}

function MessageBubbleComponent({
  className,
  role,
  avatar,
  markdown = false,
  isStreaming = false,
  isThinking = false,
  onRegenerate,
  sources,
  showActions = false,
  children,
  ...props
}: MessageBubbleProps) {
  const isUser = role === "user";
  const textContent = typeof children === "string" ? children : "";

  const body = isThinking ? (
    <ThinkingIndicator />
  ) : markdown && textContent ? (
    <MessageMarkdown content={textContent} />
  ) : (
    children
  );

  return (
    <div
      className={cn("group relative flex w-full flex-col", className)}
      {...props}
    >
      <div
        className={cn(
          "flex w-full gap-3",
          isUser ? "justify-end" : "justify-start",
        )}
      >
        {!isUser && (avatar ?? <Avatar fallback="AI" />)}

        <Card
          className={cn(
            "max-w-[min(80%,42rem)] px-4 py-3 text-sm leading-relaxed",
            "transition-shadow duration-200",
            !isUser && "hover:shadow-md",
            isUser && "bg-[var(--primary)] text-[var(--primary-foreground)]",
            isUser && "prose-invert",
          )}
        >
          {body}
          {!isUser && !isThinking && sources && sources.length > 0 && (
            <MessageSources sources={sources} />
          )}
          {isStreaming && !isThinking && <StreamingCursor />}
        </Card>

        {isUser && (avatar ?? <Avatar fallback="AT" />)}
      </div>

      {!isUser && !isThinking && textContent && showActions && (
        <MessageActions
          content={textContent}
          onRegenerate={onRegenerate}
          className="absolute left-11 top-full mt-1"
        />
      )}
    </div>
  );
}

const MessageBubble = React.memo(MessageBubbleComponent);

MessageBubble.displayName = "MessageBubble";

export { MessageBubble };
