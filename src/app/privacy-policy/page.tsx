import type { Metadata } from "next";
import { LegalMarketingFooter } from "@/components/site/LegalMarketingFooter";
import { SiteFooter, SiteHeader } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How SAVV.PRO collects, uses, and protects your personal data when you visit our website and use our services.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "savv pro", "data protection"],
});

const sections = [
  {
    title: "1. Introduction",
    body: [
      "Welcome to SAVV.PRO. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
    ],
  },
  {
    title: "2. Data We Collect",
    intro: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
    bullets: [
      "Identity Data: includes name, username or similar identifier",
      "Contact Data: includes email address and telephone numbers",
      "Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform",
      "Usage Data: includes information about how you use our website and services",
    ],
  },
  {
    title: "3. How We Use Your Data",
    intro: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
    bullets: [
      "To provide and maintain our services",
      "To notify you about changes to our services",
      "To provide customer support",
      "To gather analysis or valuable information so that we can improve our services",
      "To detect, prevent and address technical issues",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
    ],
  },
  {
    title: "5. Your Legal Rights",
    intro: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:",
    bullets: [
      "Request access to your personal data",
      "Request correction of your personal data",
      "Request erasure of your personal data",
      "Object to processing of your personal data",
      "Request restriction of processing your personal data",
      "Request transfer of your personal data",
      "Right to withdraw consent",
    ],
  },
  {
    title: "6. Contact Us",
    body: [
      "If you have any questions about this privacy policy or our privacy practices, please contact us at: info@savv.pro",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last updated date at the top of this Privacy Policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="top" className="min-h-screen bg-white text-[#1f2327]">
      <div className="mx-auto w-full max-w-[1512px] px-6 pb-16 pt-[42px] md:px-[106px]">
        <SiteHeader active="Privacy Policy" />

        <header className="mt-10 max-w-3xl">
          <h1 className="text-[42px] font-semibold leading-tight [font-family:Montserrat,sans-serif] md:text-[52px]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[15px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Last updated: December 29, 2025</p>
        </header>

        <article className="mt-12 max-w-3xl [font-family:Poppins,sans-serif]">
          {sections.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="text-[22px] font-semibold text-[#1f2327] [font-family:Montserrat,sans-serif]">{section.title}</h2>
              {"intro" in section && section.intro ? (
                <p className="mt-4 text-[15px] leading-[1.8] text-[#5a5a5a]">{section.intro}</p>
              ) : null}
              {"body" in section && section.body
                ? section.body.map((p, i) => (
                    <p key={`${section.title}-p-${i}`} className="mt-4 text-[15px] leading-[1.8] text-[#5a5a5a]">
                      {p}
                    </p>
                  ))
                : null}
              {"bullets" in section && section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-[1.8] text-[#5a5a5a]">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <div className="max-w-3xl">
          <LegalMarketingFooter />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
