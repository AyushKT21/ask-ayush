import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  RESUME,
  SKILL_CATEGORIES,
} from "@/constants/portfolio";

export function getPortfolioBrief(): string {
  const projects = PROJECTS.map(
    (project) =>
      `- ${project.title}: ${project.description} (${project.tags.join(", ")})`,
  ).join("\n");

  const experience = EXPERIENCE.map(
    (entry) =>
      `- ${entry.role} at ${entry.company} (${entry.period}): ${entry.description}`,
  ).join("\n");

  const skills = SKILL_CATEGORIES.map(
    (category) => `${category.label}: ${category.skills.join(", ")}`,
  ).join("\n");

  return [
    `Name: ${PROFILE.fullName}`,
    `Title: ${PROFILE.title}`,
    `Location: ${PROFILE.location}`,
    `Summary: ${PROFILE.summary}`,
    `Bio: ${PROFILE.bio.join(" ")}`,
    `Classic portfolio: ${PROFILE.classicPortfolioHref}`,
    `Highlights: ${PROFILE.highlights.join("; ")}`,
    `Projects:\n${projects}`,
    `Experience:\n${experience}`,
    `Skills:\n${skills}`,
    `Resume: ${RESUME.headline} (updated ${RESUME.lastUpdated})`,
  ].join("\n\n");
}
