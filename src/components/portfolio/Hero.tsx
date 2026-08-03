"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  Download,
  LineChart,
  Mail,
  Sparkles,
  Star,
  User,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { ChatInput } from "@/components/chat/ChatInput";
import { SuggestionChip } from "@/components/chat/SuggestionChip";

import { HeroStats } from "./HeroStats";
import { ClassicPortfolioLink } from "./ClassicPortfolioLink";

const primarySuggestions = [
  {
    label: "Tell me about yourself",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Show me your projects",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  },
  {
    label: "Explain your experience",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    label: "Why should I hire you?",
    icon: <Star className="h-4 w-4" />,
  },
  {
    label: "What are your top skills?",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    label: "How can I contact you?",
    icon: <Mail className="h-4 w-4" />,
  },
];

type HeroProps = {
  onSendMessage: (message: string) => void;
  disclaimer?: string;
};

export function Hero({ onSendMessage, disclaimer }: HeroProps) {
  const [prompt, setPrompt] = React.useState("");

  function handleSubmit() {
    if (!prompt.trim()) return;

    onSendMessage(prompt);
    setPrompt("");
  }

  function handleSuggestion(message: string) {
    onSendMessage(message);
  }

  return (
    <section className="relative flex min-h-full flex-col items-center overflow-y-auto px-4 pb-10 pt-8 text-center sm:px-6 sm:pb-12 sm:pt-10">
      <div className="hero-backdrop" aria-hidden />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <Badge
          variant="secondary"
          className="mb-6 gap-2 rounded-full border-[var(--border)] bg-[var(--surface)]/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span className="text-xs font-medium tracking-wide">AI Powered</span>
        </Badge>

        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] via-violet-400 to-sky-400 bg-clip-text text-transparent">
            Ayush
          </span>{" "}
          👋
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          I built this AI to answer anything about my career, projects,
          experience, and skills.
        </p>

        <ClassicPortfolioLink className="mt-4" />

        <div className="mt-10 w-full max-w-3xl">
          <ChatInput
            value={prompt}
            placeholder="Ask me anything..."
            className="chat-input-premium shadow-[var(--shadow-glow)]"
            onChange={(event) => setPrompt(event.target.value)}
            onSubmit={handleSubmit}
          />

          {disclaimer && (
            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
              {disclaimer}
            </p>
          )}
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <p className="mb-4 text-sm font-medium text-[var(--text-muted)]">
            Try asking
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {primarySuggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion.label}
                icon={suggestion.icon}
                className="h-auto min-h-12 w-full justify-start px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => handleSuggestion(suggestion.label)}
              >
                {suggestion.label}
              </SuggestionChip>
            ))}
          </div>

          <SuggestionChip
            icon={<Download className="h-4 w-4" />}
            className="mt-3 h-auto min-h-12 w-full justify-center px-4 py-3.5 shadow-sm sm:max-w-md sm:mx-auto"
            onClick={() => handleSuggestion("Download my resume")}
          >
            Download my resume
          </SuggestionChip>
        </div>

        <div className="mt-14 w-full border-t border-[var(--border)]/60 pt-8">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
