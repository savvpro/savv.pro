import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { DOCTRINES } from "@/lib/doctrines";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/doctrines`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/join`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const doctrineRoutes: MetadataRoute.Sitemap = DOCTRINES.map((d) => ({
    url: `${SITE_URL}/doctrines/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...doctrineRoutes];
}
