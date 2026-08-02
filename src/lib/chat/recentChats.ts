import type { ChatMessage } from "@/types/chat";
import type { PortfolioContext } from "@/types/context";

const STORAGE_KEY = "ayush-ai-recent-chats";
const MAX_RECENT = 12;

export type RecentChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  context?: PortfolioContext;
  updatedAt: number;
};

function readSessions(): RecentChatSession[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as RecentChatSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSessions(sessions: RecentChatSession[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function listRecentChats(): RecentChatSession[] {
  return readSessions()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_RECENT);
}

export function getRecentChat(id: string): RecentChatSession | null {
  return readSessions().find((session) => session.id === id) ?? null;
}

export function upsertRecentChat(session: RecentChatSession) {
  const sessions = readSessions().filter((item) => item.id !== session.id);
  sessions.push(session);
  writeSessions(
    sessions.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_RECENT),
  );
}

export function deleteRecentChat(id: string) {
  writeSessions(readSessions().filter((session) => session.id !== id));
}

export function createChatTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((message) => message.role === "user");
  if (!firstUser) return "New chat";

  const trimmed = firstUser.content.trim();
  if (trimmed.length <= 42) return trimmed;

  return `${trimmed.slice(0, 42)}…`;
}
