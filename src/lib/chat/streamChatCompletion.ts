import { openai } from "@ai-sdk/openai";
import { stepCountIs, streamText } from "ai";

import { runDevMockChat } from "@/lib/chat/devMockChat";
import { portfolioTools } from "@/lib/chat/portfolioTools";
import { getChatSystemPrompt } from "@/lib/chat/systemPrompt";
import type { PortfolioContext } from "@/types/context";
import type { ChatMessageInput } from "@/types/chat";
import type { ChatStreamEvent } from "@/types/chatStream";

function encodeEvent(event: ChatStreamEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function streamMockCompletion(
  messages: ChatMessageInput[],
  controller: ReadableStreamDefaultController<Uint8Array>,
) {
  const result = runDevMockChat(messages);
  const words = result.message.split(/(\s+)/);
  let message = "";

  for (const chunk of words) {
    message += chunk;
    controller.enqueue(
      encodeEvent({
        type: "delta",
        message,
        context: result.context,
      }),
    );
    await sleep(18);
  }

  controller.enqueue(
    encodeEvent({
      type: "finish",
      message: result.message,
      context: result.context,
    }),
  );
}

async function streamOpenAiCompletion(
  messages: ChatMessageInput[],
  controller: ReadableStreamDefaultController<Uint8Array>,
) {
  let message = "";
  let lastContext: PortfolioContext | undefined;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: getChatSystemPrompt(),
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    tools: portfolioTools,
    stopWhen: stepCountIs(5),
  });

  for await (const part of result.stream) {
    if (part.type === "text-delta") {
      message += part.text;
      controller.enqueue(
        encodeEvent({
          type: "delta",
          message,
          context: lastContext,
        }),
      );
    }

    if (part.type === "tool-result" && part.toolName === "setContextPanel") {
      const output = part.output as { context?: PortfolioContext };
      if (output?.context) {
        lastContext = output.context;
        controller.enqueue(
          encodeEvent({
            type: "delta",
            message,
            context: lastContext,
          }),
        );
      }
    }
  }

  let finalMessage = (await result.text).trim() || message.trim();

  if (!finalMessage) {
    const mock = runDevMockChat(messages);
    finalMessage = mock.message;
    lastContext = mock.context;
  }

  if (!lastContext) {
    lastContext = runDevMockChat(messages).context;
  }

  controller.enqueue(
    encodeEvent({
      type: "finish",
      message: finalMessage,
      context: lastContext,
    }),
  );
}

export function createChatCompletionStream(messages: ChatMessageInput[]) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!apiKey) {
          await streamMockCompletion(messages, controller);
        } else {
          await streamOpenAiCompletion(messages, controller);
        }

        controller.close();
      } catch (error) {
        try {
          await streamMockCompletion(messages, controller);
          controller.close();
        } catch {
          controller.enqueue(
            encodeEvent({
              type: "error",
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to generate response",
            }),
          );
          controller.close();
        }
      }
    },
  });
}
