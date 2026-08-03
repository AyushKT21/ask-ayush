"use client";

import * as React from "react";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AppLayout } from "@/components/layout/AppLayout";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { FollowUpSuggestions } from "@/components/chat/FollowUpSuggestions";
import { MessageBubble } from "@/components/chat/MessageBubble";
import {
  ContextPanel,
  type ContextType,
} from "@/components/context/ContextPanel";
import { Hero } from "@/components/portfolio/Hero";
import { ClassicPortfolioLink } from "@/components/portfolio/ClassicPortfolioLink";
import { Spinner } from "@/components/ui/Spinner";
import { ThinkingIndicator } from "@/components/chat/ThinkingIndicator";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  createChatTitle,
  deleteRecentChat,
  getRecentChat,
  listRecentChats,
  upsertRecentChat,
  type RecentChatSession,
} from "@/lib/chat/recentChats";
import { inferPortfolioContextFromMessages } from "@/lib/chat/inferPortfolioContext";
import { getFollowUpSuggestions } from "@/lib/chat/followUpSuggestions";
import { streamChatMessage } from "@/services/chat/streamChatMessage";
import { useChatScroll } from "@/hooks/useChatScroll";
import { PORTFOLIO_CONTEXTS, type PortfolioContext } from "@/types/context";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/utils/cn";

function parseContext(value: string | null): PortfolioContext {
  if (value && PORTFOLIO_CONTEXTS.includes(value as PortfolioContext)) {
    return value as PortfolioContext;
  }

  return "empty";
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

function toApiMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function HomePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const contextFromUrl = parseContext(searchParams.get("context"));
  const chatIdFromUrl = searchParams.get("chat");
  const isNewChat = searchParams.get("new") === "1";

  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [context, setContext] = React.useState<PortfolioContext>(contextFromUrl);
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [chatSource, setChatSource] = React.useState<"openai" | "mock" | null>(
    null,
  );
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
  const [recentChats, setRecentChats] = React.useState<RecentChatSession[]>([]);
  const [streamingAssistantId, setStreamingAssistantId] = React.useState<
    string | null
  >(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [pendingDeleteChatId, setPendingDeleteChatId] = React.useState<
    string | null
  >(null);
  const loadedChatIdRef = React.useRef<string | null>(null);
  const sendInFlightRef = React.useRef(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const refreshRecentChats = React.useCallback(() => {
    setRecentChats(listRecentChats());
  }, []);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        router.push("/?new=1");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  React.useEffect(() => {
    fetch("/api/chat/status")
      .then((response) => response.json())
      .then((data: { source?: "openai" | "mock" }) => {
        if (data.source === "openai" || data.source === "mock") {
          setChatSource(data.source);
        }
      })
      .catch(() => {
        setChatSource(null);
      });
  }, []);

  React.useEffect(() => {
    refreshRecentChats();
  }, [refreshRecentChats]);

  React.useEffect(() => {
    if (chatIdFromUrl) return;
    setContext(contextFromUrl);
  }, [contextFromUrl, chatIdFromUrl]);

  React.useEffect(() => {
    if (isNewChat) {
      loadedChatIdRef.current = null;
      setMessages([]);
      setActiveChatId(crypto.randomUUID());
      setDraft("");
      setError(null);
      setContext("empty");
      router.replace(pathname, { scroll: false });
      return;
    }

    if (!chatIdFromUrl) {
      return;
    }

    if (loadedChatIdRef.current === chatIdFromUrl) {
      return;
    }

    const session = getRecentChat(chatIdFromUrl);
    if (!session) return;

    loadedChatIdRef.current = chatIdFromUrl;
    setActiveChatId(session.id);
    setMessages(
      session.messages.filter(
        (message) =>
          message.role !== "assistant" || message.content.trim().length > 0,
      ),
    );
    setContext(
      session.context ??
        inferPortfolioContextFromMessages(session.messages),
    );
  }, [chatIdFromUrl, isNewChat, pathname, router]);

  const hasConversation = messages.length > 0;

  const { endRef } = useChatScroll([
    messages,
    streamingAssistantId,
    isGenerating,
  ]);

  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");

  const showFollowUps =
    !isGenerating &&
    lastAssistantMessage &&
    lastAssistantMessage.content.trim().length > 0;

  const followUpSuggestions = getFollowUpSuggestions(context);

  const syncContextInUrl = React.useCallback(
    (nextContext: PortfolioContext) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextContext === "empty") {
        params.delete("context");
      } else {
        params.set("context", nextContext);
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const persistSession = React.useCallback(
    (
      sessionMessages: ChatMessage[],
      sessionId: string,
      sessionContext: PortfolioContext,
    ) => {
      if (sessionMessages.length === 0) return;

      upsertRecentChat({
        id: sessionId,
        title: createChatTitle(sessionMessages),
        messages: sessionMessages.filter(
          (message) =>
            message.role !== "assistant" || message.content.trim().length > 0,
        ),
        context: sessionContext,
        updatedAt: Date.now(),
      });
      refreshRecentChats();
    },
    [refreshRecentChats],
  );

  function handleStopGeneration() {
    abortControllerRef.current?.abort();
  }

  const sendMessage = React.useCallback(
    async (text: string, options?: { replaceAssistantId?: string }) => {
      const trimmed = text.trim();
      if (!trimmed || sendInFlightRef.current) return;

      const sessionId = activeChatId ?? crypto.randomUUID();
      if (!activeChatId) {
        setActiveChatId(sessionId);
      }

      const userMessage = createMessage("user", trimmed);
      const assistantId = options?.replaceAssistantId ?? crypto.randomUUID();
      const assistantPlaceholder: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      let nextMessages: ChatMessage[];

      if (options?.replaceAssistantId) {
        const replaceIndex = messages.findIndex(
          (message) => message.id === options.replaceAssistantId,
        );
        if (replaceIndex < 0) return;

        nextMessages = [
          ...messages.slice(0, replaceIndex),
          assistantPlaceholder,
        ];
      } else {
        nextMessages = [...messages, userMessage, assistantPlaceholder];
      }

      setMessages(nextMessages);
      setDraft("");
      setError(null);
      setStreamingAssistantId(assistantId);
      setIsGenerating(true);
      sendInFlightRef.current = true;
      loadedChatIdRef.current = sessionId;

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const result = await streamChatMessage(
          toApiMessages(
            nextMessages.filter((message) => message.content.trim().length > 0),
          ),
          (event) => {
            if (event.type === "delta") {
              setMessages((previous) =>
                previous.map((message) =>
                  message.id === assistantId
                    ? {
                        ...message,
                        content: event.message
                          ? event.message
                          : message.content,
                      }
                    : message,
                ),
              );
            }

            if (event.type === "finish") {
              setMessages((previous) =>
                previous.map((message) =>
                  message.id === assistantId
                    ? { ...message, content: event.message }
                    : message,
                ),
              );
            }
          },
          { signal: abortControllerRef.current.signal },
        );

        if (!result.message.trim()) {
          throw new Error("Assistant returned an empty response. Try again.");
        }

        setMessages((previous) => {
          const finalized = previous.map((message) =>
            message.id === assistantId
              ? { ...message, content: result.message }
              : message,
          );
          persistSession(finalized, sessionId, result.context);
          return finalized;
        });

        setContext(result.context);
        syncContextInUrl(result.context);
        loadedChatIdRef.current = sessionId;
        router.replace(`/?chat=${sessionId}`, { scroll: false });
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          setMessages((previous) => {
            const current = previous.find((message) => message.id === assistantId);
            const content = current?.content.trim() ?? "";
            const finalized = content
              ? previous
              : previous.filter((message) => message.id !== assistantId);

            if (content) {
              persistSession(
                finalized,
                sessionId,
                inferPortfolioContextFromMessages(finalized),
              );
            }

            return finalized;
          });
          return;
        }

        setMessages((previous) =>
          previous.filter((message) => message.id !== assistantId),
        );
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong",
        );
      } finally {
        sendInFlightRef.current = false;
        setIsGenerating(false);
        setStreamingAssistantId(null);
        abortControllerRef.current = null;
      }
    },
    [
      activeChatId,
      messages,
      persistSession,
      router,
      syncContextInUrl,
    ],
  );

  function regenerateAssistantMessage(assistantId: string) {
    const index = messages.findIndex((message) => message.id === assistantId);
    if (index <= 0) return;

    const userMessage = messages
      .slice(0, index)
      .reverse()
      .find((message) => message.role === "user");

    if (!userMessage) return;

    sendMessage(userMessage.content, { replaceAssistantId: assistantId });
  }

  function handleChatSubmit() {
    sendMessage(draft);
  }

  function getDisclaimer() {
    const signature = "Made with care by Ayush Tiwari.";

    if (chatSource === "openai") {
      return `${signature} AI-assisted answers — please verify important details.`;
    }

    if (chatSource === "mock") {
      return `${signature} Demo mode (local templates). Add OPENAI_API_KEY for live AI.`;
    }

    return `${signature} AI can make mistakes — verify important information.`;
  }

  function handleDeleteChatRequest(chatId: string) {
    setPendingDeleteChatId(chatId);
  }

  function confirmDeleteChat() {
    if (!pendingDeleteChatId) return;

    const deletedId = pendingDeleteChatId;
    deleteRecentChat(deletedId);
    refreshRecentChats();
    setPendingDeleteChatId(null);

    if (activeChatId === deletedId || chatIdFromUrl === deletedId) {
      loadedChatIdRef.current = null;
      setActiveChatId(null);
      setMessages([]);
      setContext("empty");
      setDraft("");
      setError(null);
      router.replace(pathname, { scroll: false });
    }
  }

  const pendingDeleteTitle =
    pendingDeleteChatId
      ? recentChats.find((chat) => chat.id === pendingDeleteChatId)?.title
      : null;

  return (
    <>
      <ConfirmDialog
        open={pendingDeleteChatId !== null}
        title="Delete this chat?"
        description={
          pendingDeleteTitle
            ? `“${pendingDeleteTitle}” will be removed from recent chats. This cannot be undone.`
            : "This chat will be removed from recent chats. This cannot be undone."
        }
        confirmLabel="Yes, delete"
        onConfirm={confirmDeleteChat}
        onCancel={() => setPendingDeleteChatId(null)}
      />

      <AppLayout
        activeContext={context as ContextType}
        activeChatId={activeChatId}
        recentChats={recentChats.map((chat) => ({
          id: chat.id,
          title: chat.title,
        }))}
        onDeleteChatRequest={handleDeleteChatRequest}
        context={
        hasConversation ? (
          <div className="glass-panel relative h-full overflow-y-auto p-4 sm:p-6">
            {isGenerating && (
              <div
                className={cn(
                  "absolute inset-0 z-10 flex items-center justify-center",
                  "bg-[var(--surface)]/55 backdrop-blur-[2px]",
                )}
                aria-live="polite"
                aria-busy="true"
              >
                <ThinkingIndicator />
              </div>
            )}
            <ContextPanel context={context as ContextType} />
          </div>
        ) : undefined
      }
    >
      {!hasConversation ? (
        <Hero onSendMessage={sendMessage} disclaimer={getDisclaimer()} />
      ) : (
        <div className="flex h-full min-h-0 flex-col">
          <ChatWindow endRef={endRef} className="min-h-0 flex-1 px-4 py-4 sm:px-6 sm:py-6">
            {messages
              .filter(
                (message) =>
                  message.role !== "assistant" ||
                  message.content.trim().length > 0 ||
                  message.id === streamingAssistantId,
              )
              .map((message) => {
                const isThinking =
                  message.id === streamingAssistantId &&
                  message.content.trim().length === 0;
                const isStreaming =
                  isGenerating && message.id === streamingAssistantId;

                return (
                  <MessageBubble
                    key={message.id}
                    role={message.role}
                    isThinking={isThinking}
                    isStreaming={isStreaming && !isThinking}
                    markdown={
                      message.role === "assistant" && !isThinking
                    }
                    onRegenerate={
                      message.role === "assistant" && !isGenerating
                        ? () => regenerateAssistantMessage(message.id)
                        : undefined
                    }
                  >
                    {message.content}
                  </MessageBubble>
                );
              })}

            {showFollowUps && (
              <FollowUpSuggestions
                suggestions={followUpSuggestions}
                onSelect={(label) => sendMessage(label)}
              />
            )}
          </ChatWindow>

          <div className="shrink-0 border-t border-[var(--border)] p-4 sm:p-6">
            {error && (
              <p className="mb-3 text-center text-sm text-red-500">{error}</p>
            )}

            <ChatInput
              value={draft}
              placeholder="Ask me anything about my career, skills, or projects..."
              streaming={isGenerating}
              onStop={handleStopGeneration}
              onChange={(event) => setDraft(event.target.value)}
              onSubmit={handleChatSubmit}
            />

            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
              {getDisclaimer()}
            </p>

            <div className="mt-2 flex justify-center">
              <ClassicPortfolioLink className="text-xs" />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
