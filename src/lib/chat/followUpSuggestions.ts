import type { PortfolioContext } from "@/types/context";

const BY_CONTEXT: Record<PortfolioContext, string[]> = {
  empty: [
    "Tell me about yourself",
    "Show me your projects",
    "What are your top skills?",
  ],
  about: [
    "Why should I hire you?",
    "Show me your projects",
    "Explain your experience",
  ],
  projects: [
    "Which project uses React?",
    "Explain the tech stack",
    "Show me the architecture",
  ],
  skills: [
    "What backend do you know?",
    "Show me your projects",
    "Download my resume",
  ],
  experience: [
    "What did you build at Nvest?",
    "Show me your skills",
    "How can I contact you?",
  ],
  resume: [
    "Summarize your experience",
    "Show me your projects",
    "How can I contact you?",
  ],
  contact: [
    "Tell me about yourself",
    "Show me your GitHub work",
    "What are you looking for?",
  ],
};

export function getFollowUpSuggestions(
  context: PortfolioContext,
  limit = 3,
): string[] {
  return BY_CONTEXT[context].slice(0, limit);
}
