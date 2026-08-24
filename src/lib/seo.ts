import "server-only";

import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

const socialImageSize = { width: 1200, height: 630 } as const;

export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) return undefined;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(configuredUrl);
  } catch {
    throw new Error("SITE_URL must be a valid absolute URL.");
  }

  const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  const isOriginOnly =
    parsedUrl.pathname === "/" &&
    !parsedUrl.search &&
    !parsedUrl.hash &&
    !parsedUrl.username &&
    !parsedUrl.password;

  if (!isHttp || !isOriginOnly) {
    throw new Error(
      "SITE_URL must be an http(s) origin without credentials, a path, query, or hash.",
    );
  }

  return new URL(parsedUrl.origin);
}

function absoluteUrl(path: string, siteUrl = getSiteUrl()) {
  return siteUrl ? new URL(path, siteUrl) : undefined;
}

function socialImage(path: string, alt: string, siteUrl = getSiteUrl()) {
  const url = absoluteUrl(path, siteUrl);

  return url
    ? [{ url, ...socialImageSize, alt, type: "image/png" }]
    : undefined;
}

const siteUrl = getSiteUrl();
const rootSocialImages = socialImage(
  "/social-card",
  `${siteConfig.name} — Software Engineer`,
  siteUrl,
);

export const rootMetadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.shortName} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "technology",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${siteConfig.shortName} Portfolio`,
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
    url: siteUrl,
    images: rootSocialImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software Engineer`,
    description: siteConfig.description,
    images: rootSocialImages,
  },
};

interface PageMetadataOptions {
  path: string;
  socialImagePath?: string;
  socialImageAlt?: string;
}

export function createPageMetadata(
  title: string,
  description: string,
  { path, socialImagePath = "/social-card", socialImageAlt }: PageMetadataOptions,
): Metadata {
  const configuredSiteUrl = getSiteUrl();
  const images = socialImage(
    socialImagePath,
    socialImageAlt ?? `${title} — ${siteConfig.name}`,
    configuredSiteUrl,
  );

  return {
    title,
    description,
    alternates: configuredSiteUrl ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: `${siteConfig.shortName} Portfolio`,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(path, configuredSiteUrl),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images,
    },
  };
}
