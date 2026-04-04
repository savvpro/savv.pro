import type { Metadata } from "next";
import { LegalMarketingFooter } from "@/components/site/LegalMarketingFooter";
import { SiteFooter, SiteHeader } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing access to and use of SAVV.PRO, including use license, user obligations, and contact information.",
  path: "/terms-of-service",
  keywords: ["terms of service", "savv pro", "legal"],
});

const sections = [
  {
    title: "1. Agreement to Terms",
    body: [
      "By accessing or using SAVV.PRO, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    ],
  },
  {
    title: "2. Use License",
    intro:
      "Permission is granted to temporarily access the materials (information or software) on SAVV.PRO for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
    bullets: [
      "Modify or copy the materials",
      "Use the materials for any commercial purpose or for any public display",
      "Attempt to decompile or reverse engineer any software contained on SAVV.PRO",
      "Remove any copyright or other proprietary notations from the materials",
      "Transfer the materials to another person or mirror the materials on any other server",
    ],
  },
  {
    title: "3. Service Description",
    intro: "SAVV.PRO provides mobile AI infrastructure solutions. We reserve the right to:",
    bullets: [
      "Modify or withdraw any part of our services without notice",
      "Refuse service to anyone for any reason at any time",
      "Discontinue or modify any aspect of our platform",
      "Restrict access to some or all of our services",
    ],
  },
  {
    title: "4. User Obligations",
    intro: "As a user of our services, you agree to:",
    bullets: [
      "Provide accurate and complete information when creating an account",
      "Maintain the security of your account credentials",
      "Notify us immediately of any unauthorized use of your account",
      "Not use our services for any illegal or unauthorized purpose",
      "Comply with all applicable laws and regulations",
    ],
  },
  {
    title: "5. Intellectual Property",
    body: [
      "The content, features, and functionality of SAVV.PRO, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of SAVV.PRO and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    body: [
      "In no event shall SAVV.PRO or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if SAVV.PRO or a SAVV.PRO authorized representative has been notified orally or in writing of the possibility of such damage.",
    ],
  },
  {
    title: "7. Termination",
    body: [
      "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use our services will immediately cease.",
    ],
  },
  {
    title: "8. Governing Law",
    body: [
      "These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    ],
  },
  {
    title: "9. Changes to Terms",
    body: [
      "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
    ],
  },
  {
    title: "10. Contact Us",
    body: ["If you have any questions about these Terms, please contact us at: info@savv.pro"],
  },
];

export default function TermsOfServicePage() {
  return (
    <main id="top" className="min-h-screen bg-white text-[#1f2327]">
      <div className="scrollbar-gutter mx-auto w-full max-w-[1512px] pb-16 pl-6 pt-[42px] md:pl-[106px] md:pr-[106px]">
        <SiteHeader active="Terms of Service" />

        <header className="mt-10 max-w-3xl">
          <h1 className="text-[42px] font-semibold leading-tight [font-family:Montserrat,sans-serif] md:text-[52px]">
            Terms of Service
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

      <div className="bg-white scrollbar-gutter">
        <SiteFooter />
      </div>
    </main>
  );
}
