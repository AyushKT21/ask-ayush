"use client";

import ReactMarkdown from "react-markdown";

import { cn } from "@/utils/cn";

type MessageMarkdownProps = {
  content: string;
  className?: string;
};

export function MessageMarkdown({ content, className }: MessageMarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-p:my-1 prose-p:leading-relaxed",
        "prose-ul:my-2 prose-li:my-0",
        "prose-strong:text-[var(--text-primary)]",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--primary)] underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
