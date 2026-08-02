import type { ChatMessage } from "@/types/chat";
import type { PortfolioContext } from "@/types/context";

const GREETING_PATTERN = /^(hi+|hey+|hello+|yo+|hii+|sup)\b[!.\s]*$/i;

export function isCasualGreeting(text: string): boolean {
  return GREETING_PATTERN.test(text.trim());
}

/**
 * Maps user text to the portfolio panel context (dev mock + session restore).
 * Order matters: specific intents before broad patterns.
 */
export function inferPortfolioContextFromText(text: string): PortfolioContext {
  const normalized = text.toLowerCase().trim();

  if (
    /why should.*hire|why hire|hire you|should i hire|should we hire/.test(
      normalized,
    )
  ) {
    return "about";
  }

  if (
    /who are you|who is ayush|about you|tell me about|yourself|introduce/.test(
      normalized,
    )
  ) {
    return "about";
  }

  if (/resume|cv|download/.test(normalized)) {
    return "resume";
  }

  if (
    /contact|email|reach|linkedin|github|twitter|message me/.test(normalized)
  ) {
    return "contact";
  }

  if (
    /skill|tech stack|stack|technology|typescript|react|expertise|expert|speciali|strength|ability|abilities|what do you know|good at/.test(
      normalized,
    )
  ) {
    return "skills";
  }

  if (/experience|job|work history|career|intern|developer/.test(normalized)) {
    return "experience";
  }

  if (
    /project|portfolio|built|devvault|e-?commerce|show me your app/.test(
      normalized,
    )
  ) {
    return "projects";
  }

  return "empty";
}

export function inferPortfolioContextFromMessages(
  messages: ChatMessage[],
): PortfolioContext {
  const userMessages = messages.filter((message) => message.role === "user");

  for (let index = userMessages.length - 1; index >= 0; index -= 1) {
    const text = userMessages[index].content;
    const context = inferPortfolioContextFromText(text);

    if (context !== "empty") {
      return context;
    }

    if (!isCasualGreeting(text)) {
      return "empty";
    }
  }

  return "empty";
}
