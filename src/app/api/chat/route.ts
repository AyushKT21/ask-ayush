import { z } from "zod";

import { createChatCompletionStream } from "@/lib/chat/streamChatCompletion";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { messages } = bodySchema.parse(json);
    const stream = createChatCompletionStream(messages);

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid request", details: error.flatten() },
        { status: 400 },
      );
    }

    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
