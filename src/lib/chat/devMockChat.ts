import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  RESUME,
  SKILL_CATEGORIES,
} from "@/constants/portfolio";
import {
  inferPortfolioContextFromMessages,
  inferPortfolioContextFromText,
  isCasualGreeting,
} from "@/lib/chat/inferPortfolioContext";
import type { PortfolioContext } from "@/types/context";
import type { ChatCompletionResult, ChatMessageInput } from "@/types/chat";

function buildDevMessage(
  context: PortfolioContext,
  userText = "",
): string {
  const normalized = userText.toLowerCase();

  if (
    /why should.*hire|why hire|hire you|should i hire|should we hire/.test(
      normalized,
    )
  ) {
    return `You should hire me because ${PROFILE.highlights.join("; ")}. ${PROFILE.summary}`;
  }

  if (isCasualGreeting(userText)) {
    return `Hey! I'm Ayush AI — ask me about my projects, skills, experience, resume, or how to reach me.`;
  }

  switch (context) {
    case "projects":
      return `I've built projects like ${PROJECTS.map((p) => p.title).join(", ")}. ${PROJECTS[0].description} Open the Projects panel for cards and links.`;

    case "skills":
      const byArea = SKILL_CATEGORIES.map(
        (category) => `${category.label}: ${category.skills.join(", ")}`,
      ).join(". ");
      return `Here's where I'm strongest — ${byArea}. I especially lean on React, Next.js, and TypeScript for polished product UI. Check the Skills panel for the full breakdown.`;

    case "experience":
      const current = EXPERIENCE.find((e) => e.current) ?? EXPERIENCE[0];
      return `${current.role} at ${current.company} (${current.period}). ${current.description}`;

    case "resume":
      return `${RESUME.headline} You can download my resume from the Resume panel (updated ${RESUME.lastUpdated}).`;

    case "contact":
      return "I'm open to internships, full-time roles, and collaborations. Use the Contact panel for GitHub, LinkedIn, email, and Twitter.";

    case "empty":
      return PROFILE.summary;

    case "about":
    default:
      return `${PROFILE.summary} I'm ${PROFILE.title} based in ${PROFILE.location}.`;
  }
}

export function runDevMockChat(
  messages: ChatMessageInput[],
): ChatCompletionResult {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = lastUser?.content ?? "";

  const asChatMessages = messages.map((message, index) => ({
    id: String(index),
    role: message.role,
    content: message.content,
  }));

  const context = inferPortfolioContextFromMessages(asChatMessages);

  return {
    message: buildDevMessage(context, text),
    context,
  };
}

export { inferPortfolioContextFromText };
