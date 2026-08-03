import type { ChatCompletionResult, ChatMessageInput } from "@/types/chat";
import type { ChatStreamEvent } from "@/types/chatStream";

type StreamChatOptions = {
  signal?: AbortSignal;
};

export async function streamChatMessage(
  messages: ChatMessageInput[],
  onEvent: (event: ChatStreamEvent) => void,
  options?: StreamChatOptions,
): Promise<ChatCompletionResult> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
    signal: options?.signal,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(payload?.error ?? "Chat request failed");
  }

  if (!response.body) {
    throw new Error("Empty response stream");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalResult: ChatCompletionResult | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;

        const event = JSON.parse(line) as ChatStreamEvent;
        onEvent(event);

        if (event.type === "finish") {
          finalResult = {
            message: event.message,
            context: event.context,
          };
        }

        if (event.type === "error") {
          throw new Error(event.error);
        }
      }
    }
  } catch (error) {
    if (options?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    throw error;
  }

  if (!finalResult) {
    throw new Error("Stream ended without a final response");
  }

  return finalResult;
}
