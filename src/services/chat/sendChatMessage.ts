import type { ChatCompletionResult, ChatMessageInput } from "@/types/chat";

export async function sendChatMessage(
  messages: ChatMessageInput[],
): Promise<ChatCompletionResult> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(payload?.error ?? "Chat request failed");
  }

  return (await response.json()) as ChatCompletionResult;
}
