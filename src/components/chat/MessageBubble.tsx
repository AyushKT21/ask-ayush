import * as React from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { MessageMarkdown } from "@/components/markdown/MessageMarkdown";
import { MessageActions } from "@/components/chat/MessageActions";
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
}

function MessageBubbleComponent({
  className,
  role,
  avatar,
  markdown = false,
  isStreaming = false,
  isThinking = false,
  onRegenerate,
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
      className={cn("group flex w-full flex-col gap-1", className)}
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
          {isStreaming && !isThinking && <StreamingCursor />}
        </Card>

        {isUser && (avatar ?? <Avatar fallback="AK" />)}
      </div>

      {!isUser && !isThinking && textContent && (
        <div className="pl-11">
          <MessageActions
            content={textContent}
            onRegenerate={onRegenerate}
          />
        </div>
      )}
    </div>
  );
}

const MessageBubble = React.memo(MessageBubbleComponent);

MessageBubble.displayName = "MessageBubble";

export { MessageBubble };
