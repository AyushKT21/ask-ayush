"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

import { cn } from "@/utils/cn";

type MessageMarkdownProps = {
  content: string;
  className?: string;
};

function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [copied, setCopied] = React.useState(false);
  const text = String(children).replace(/\n$/, "");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const isBlock = className?.includes("language-");

  if (!isBlock) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="group/code relative my-3">
      <button
        type="button"
        aria-label="Copy code"
        className={cn(
          "absolute right-2 top-2 flex h-8 w-8 items-center justify-center",
          "rounded-md border border-[var(--border)] bg-[var(--surface)]",
          "text-[var(--text-muted)] opacity-0 transition-opacity",
          "group-hover/code:opacity-100 hover:text-[var(--foreground)]",
        )}
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-4 text-xs">
        <code className={className} {...props}>{children}</code>
      </pre>
    </div>
  );
}

export function MessageMarkdown({ content, className }: MessageMarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-p:my-1.5 prose-p:leading-relaxed",
        "prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5",
        "prose-blockquote:border-[var(--primary)] prose-blockquote:text-[var(--text-secondary)]",
        "prose-table:text-sm prose-th:border prose-td:border",
        "prose-th:border-[var(--border)] prose-td:border-[var(--border)]",
        "prose-strong:text-[var(--text-primary)]",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-code:rounded prose-code:bg-[var(--surface-secondary)] prose-code:px-1 prose-code:py-0.5",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
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
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
