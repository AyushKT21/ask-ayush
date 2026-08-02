import type { PortfolioContext } from "@/types/context";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ChatMessageInput = {
  role: ChatRole;
  content: string;
};

export type ChatCompletionResult = {
  message: string;
  context: PortfolioContext;
};
