import type { Metadata } from "next";

export const siteConfig = {
  name: "Md. Akibul Hasan Arman",
  shortName: "Arman",
  positioning:
    "Software Engineer building full-stack products, backend systems, and applied ML.",
  description:
    "The software engineering portfolio of Md. Akibul Hasan Arman, featuring full-stack systems, backend engineering, applied machine learning, computer vision, and data work.",
  githubUrl: "https://github.com/abarman079",
  linkedinUrl:
    "https://www.linkedin.com/in/md-akibul-hasan-arman-81857b339/",
  email: "abarmanoffice@gmail.com",
  emailHref: "mailto:abarmanoffice@gmail.com",
  location: "Aftabnagar, Dhaka",
  resumePageUrl: "/resume",
  resumePdfUrl: "/resume/md-akibul-hasan-arman-cv.pdf",
} as const;

export const rootMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.shortName} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "technology",
};

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return { title, description };
}
