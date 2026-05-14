const DEFAULT_SITE_URL = "https://savv.pro";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;
  try {
    return new URL(configured).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = getSiteUrl();
