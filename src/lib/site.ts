import type { Metadata } from "next";

const configuredSiteUrl = process.env.SITE_URL?.trim();

export const siteUrl = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : "https://www.example.com";

export const siteName = "Fakom International Services Ltd";

export const defaultDescription =
  "Electrical design, installation and power infrastructure services across southern Nigeria. Fakom International Services Ltd has operated since 2005.";

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const compactDescription = description.length > 160
    ? `${description.slice(0, 157).trimEnd()}...`
    : description;

  return {
    title,
    description: compactDescription,
    alternates: { canonical: pathname },
  };
}

export function compactTitle(title: string, maxLength = 24): string {
  if (title.length <= maxLength) return title;

  const shortened = title.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return shortened.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd();
}
