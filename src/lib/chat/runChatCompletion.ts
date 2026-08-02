import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { runDevMockChat } from "@/lib/chat/devMockChat";
import { getChatSystemPrompt } from "@/lib/chat/systemPrompt";
import { PORTFOLIO_CONTEXTS } from "@/types/context";
import type { ChatCompletionResult, ChatMessageInput } from "@/types/chat";

const chatResponseSchema = z.object({
  message: z.string().describe("Assistant reply in plain text"),
  context: z.enum([
    "empty",
    "about",
    "projects",
    "skills",
    "experience",
    "resume",
    "contact",
  ]),
});

export async function runChatCompletion(
  messages: ChatMessageInput[],
): Promise<ChatCompletionResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return runDevMockChat(messages);
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: getChatSystemPrompt(),
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      schema: chatResponseSchema,
    });

    return {
      message: object.message,
      context: object.context,
    };
  } catch {
    return runDevMockChat(messages);
  }
}
