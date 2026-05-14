import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TickerStrip } from "@/components/site/TickerStrip";
import { CommandPalette } from "@/components/site/CommandPalette";
import { PointerFx } from "@/components/site/PointerFx";
import { SITE_URL } from "@/lib/seo";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SavvPro",
  url: SITE_URL,
  description:
    "AI-native technology organization. Intelligence backbone for the agentic era.",
  sameAs: ["https://github.com/savvpro", "https://x.com/savvpro"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.ico" },
  title: {
    default: "SavvPro — Intelligence backbone for the agentic era",
    template: "%s · SavvPro",
  },
  description:
    "SavvPro builds AI-native capabilities, platforms, and services for organizations navigating the agentic era.",
  applicationName: "SavvPro",
  alternates: { canonical: "/" },
  keywords: [
    "savvpro",
    "agentic era",
    "ai-native",
    "intelligence infrastructure",
    "capabilities registry",
    "world model",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SavvPro",
    url: SITE_URL,
    title: "SavvPro",
    description: "Intelligence backbone for the agentic era.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SavvPro",
    description: "Intelligence backbone for the agentic era.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <TickerStrip />
        <SiteHeader />
        <main className="flex-1 relative z-[1]">{children}</main>
        <SiteFooter />
        <CommandPalette />
        <PointerFx />
      </body>
    </html>
  );
}
