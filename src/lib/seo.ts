import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://savvpro.ai";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;

  try {
    return new URL(configured).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = getSiteUrl();

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({ title, description, path, keywords }: PageSeoInput): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Savv Pro",
      title,
      description,
      url: canonical,
      images: [
        {
          url: "/generated/home/about-main.jpg",
          width: 1200,
          height: 800,
          alt: "Savv Pro enterprise AI systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/generated/home/about-main.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

