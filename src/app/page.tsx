import type { Metadata } from "next";
import {
  AboutSection,
  FaqSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  ProcessSection,
  ProductSection,
  ServiceSection,
  WhyChooseSection,
} from "@/components/futuristic";
import { createPageMetadata } from "@/lib/seo";

const homeMeta = createPageMetadata({
  title: "Savv Pro Solutions",
  description:
    "Savv Pro builds sovereign, governed AI systems across advisory, products, workflow automation, and sector-specific delivery.",
  path: "/",
  keywords: ["sovereign ai enterprise", "ai systems", "ai workflow automation", "enterprise ai consulting"],
});

export const metadata: Metadata = {
  ...homeMeta,
  title: { absolute: "Savv Pro Solutions" },
};

export default function Home() {
  return (
    <main id="top" className="w-full">
      <HeroSection />
      <div className="mx-auto w-full max-w-[1512px] overflow-hidden bg-white">
        <section id="home-next-section">
          <ServiceSection />
        </section>
        <AboutSection />
        <FeaturesSection />
        <WhyChooseSection />
        <ProductSection />
        <ProcessSection />
        <FaqSection />
        <FooterSection />
      </div>
    </main>
  );
}
