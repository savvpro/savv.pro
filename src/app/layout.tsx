import type { Metadata } from "next";
import "./globals.css";
import { CustomScrollbar } from "@/components/site/CustomScrollbar";
import { SITE_URL } from "@/lib/seo";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Savv Pro",
  url: SITE_URL,
  description:
    "Chicago-based sovereign AI enterprise designing, deploying, and governing AI systems for high-trust businesses.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: "Savv Pro",
    url: SITE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Savv Pro",
  url: SITE_URL,
  logo: `${SITE_URL}/transparent-bg-black.png`,
  description:
    "Sovereign AI enterprise providing advisory, deployment, products, and sector-specific operating systems.",
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Savv Pro primary pages",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", url: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About", url: `${SITE_URL}/about` },
    { "@type": "ListItem", position: 3, name: "Sovereign AI", url: `${SITE_URL}/sovereign-ai` },
    { "@type": "ListItem", position: 4, name: "Products", url: `${SITE_URL}/products` },
    { "@type": "ListItem", position: 5, name: "Services", url: `${SITE_URL}/services` },
    { "@type": "ListItem", position: 6, name: "Solutions", url: `${SITE_URL}/solutions` },
    { "@type": "ListItem", position: 7, name: "Case Studies", url: `${SITE_URL}/case-studies` },
    { "@type": "ListItem", position: 8, name: "Contact", url: `${SITE_URL}/contact` },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/transparent-bg-white.png", type: "image/png" }],
    apple: "/transparent-bg-white.png",
    shortcut: "/transparent-bg-white.png",
  },
  title: {
    default: "Savv Pro | Sovereign AI Enterprise",
    template: "%s | Savv Pro",
  },
  description:
    "Chicago-based sovereign AI enterprise. We design, deploy, and govern AI systems for high-trust businesses.",
  applicationName: "Savv Pro",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "sovereign ai",
    "enterprise ai",
    "ai advisory",
    "workflow automation",
    "ai governance",
    "savv pro",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Savv Pro",
    url: SITE_URL,
    title: "Savv Pro | Sovereign AI Enterprise",
    description:
      "Designing, deploying, and governing AI systems for high-trust businesses across sectors.",
    images: [
      {
        url: "/generated/home/about-main.jpg",
        width: 1200,
        height: 800,
        alt: "Savv Pro sovereign AI systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savv Pro | Sovereign AI Enterprise",
    description:
      "Designing, deploying, and governing AI systems for high-trust businesses across sectors.",
    images: ["/generated/home/about-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }} />
        <CustomScrollbar />
        {children}
      </body>
    </html>
  );
}
