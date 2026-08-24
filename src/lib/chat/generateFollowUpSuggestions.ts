import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { getFallbackFollowUpSuggestions } from "@/lib/chat/followUpSuggestions";
import type { PortfolioContext } from "@/types/context";
import type { ChatMessageInput } from "@/types/chat";

const followUpSchema = z.object({
  suggestions: z
    .array(z.string().min(4).max(72))
    .min(2)
    .max(3)
    .describe("Short follow-up questions the user might ask next"),
});

export async function generateFollowUpSuggestions(options: {
  messages: ChatMessageInput[];
  assistantMessage: string;
  context: PortfolioContext;
  hasApiKey: boolean;
}): Promise<string[]> {
  const { messages, assistantMessage, context, hasApiKey } = options;

  if (!hasApiKey || !assistantMessage.trim()) {
    return getFallbackFollowUpSuggestions(context);
  }

  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? "";

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: followUpSchema,
      prompt: [
        "Generate follow-up questions for Ayush's AI portfolio chat.",
        "",
        `User asked: ${lastUserMessage}`,
        `Assistant replied: ${assistantMessage.slice(0, 900)}`,
        `Right panel context: ${context}`,
        "",
        "Rules:",
        "- Return exactly 3 questions",
        "- Each under 10 words, natural, specific to the conversation",
        "- Only about Ayush: career, projects, skills, jobs, resume, contact",
        "- Do not repeat the user's last question",
        "- Write as the user would type them (e.g. Which project uses Next.js?)",
      ].join("\n"),
    });

    const cleaned = object.suggestions
      .map((item) => item.trim())
      .filter(Boolean);

    if (cleaned.length >= 2) {
      return cleaned.slice(0, 3);
    }
  } catch {
    /* fall through to defaults */
  }

  return getFallbackFollowUpSuggestions(context);
}
