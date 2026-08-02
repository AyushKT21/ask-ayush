import { tool } from "ai";
import { z } from "zod";

import {
  CONTACT_LINKS,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  RESUME,
  SKILL_CATEGORIES,
} from "@/constants/portfolio";
import { PORTFOLIO_CONTEXTS } from "@/types/context";

const contextSchema = z.enum([
  "empty",
  "about",
  "projects",
  "skills",
  "experience",
  "resume",
  "contact",
]);

export const portfolioTools = {
  getAbout: tool({
    description: "Get Ayush's profile summary, title, location, and highlights.",
    inputSchema: z.object({}),
    execute: async () => ({
      profile: PROFILE,
    }),
  }),

  getProjects: tool({
    description: "Get Ayush's portfolio projects with descriptions and tech tags.",
    inputSchema: z.object({}),
    execute: async () => ({
      projects: PROJECTS,
    }),
  }),

  getSkills: tool({
    description: "Get Ayush's skills grouped by category.",
    inputSchema: z.object({}),
    execute: async () => ({
      categories: SKILL_CATEGORIES,
    }),
  }),

  getExperience: tool({
    description: "Get Ayush's work experience timeline.",
    inputSchema: z.object({}),
    execute: async () => ({
      experience: EXPERIENCE,
    }),
  }),

  getResume: tool({
    description: "Get resume headline and download metadata.",
    inputSchema: z.object({}),
    execute: async () => ({
      resume: RESUME,
      fullName: PROFILE.fullName,
    }),
  }),

  getContact: tool({
    description: "Get social and contact links.",
    inputSchema: z.object({}),
    execute: async () => ({
      links: CONTACT_LINKS,
    }),
  }),

  setContextPanel: tool({
    description:
      "Update the right-side portfolio panel in the UI. Call when the user should see projects, skills, etc.",
    inputSchema: z.object({
      context: contextSchema.describe(
        `One of: ${PORTFOLIO_CONTEXTS.join(", ")}`,
      ),
    }),
    execute: async ({ context }) => ({
      context,
    }),
  }),
};
