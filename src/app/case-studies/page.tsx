import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const studies = [
  {
    sector: "Education · Growth Operations",
    id: "01",
    title: "AI-Driven Content and SEO Operating System",
    challenge: "The client needed more content velocity, stronger SEO structure, and a system capable of supporting brand-aligned campaign execution at scale without adding proportional headcount.",
    approach: "Built a governed AI-driven content and SEO engine with structured publishing workflows, topic modeling, and brand policy enforcement baked into the system architecture.",
    outcomes: [
      "Increased content throughput significantly",
      "Improved SEO architecture and repeatability",
      "Stronger campaign alignment and consistency",
    ],
  },
  {
    sector: "Wealth · Advisory",
    id: "02",
    title: "Multi-Pillar AI Ecosystem for Advisory Operations",
    challenge: "Need for always-on lead engagement, internal knowledge support, and compliance-conscious digital authority workflows in a regulated advisory environment.",
    approach: "Designed a multi-pillar AI ecosystem across communication, internal assistance, and content operations with compliance-sensitive knowledge boundaries built into each layer.",
    outcomes: [
      "Better responsiveness at scale",
      "Stronger internal research leverage",
      "More consistent client-facing activity",
    ],
  },
  {
    sector: "Pharmacy · Operations",
    id: "03",
    title: "AI-Enabled Operating Framework for Pharmacy Workflows",
    challenge: "Fragmented operational flows and need for stronger coordination across inventory, documentation, and process layers in a workflow-heavy environment.",
    approach: "Mapped and designed an AI-enabled operating framework around business-critical workflows with structured automation, human review points, and centralized operational visibility.",
    outcomes: [
      "More centralized operational intelligence",
      "Stronger process continuity across teams",
      "Reduced coordination friction",
    ],
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "AI Case Studies",
  description:
    "Review applied AI operating models from Savv Pro across education, advisory, and pharmacy workflows.",
  path: "/case-studies",
  keywords: ["ai case studies", "enterprise ai outcomes", "ai transformation examples", "sector ai deployments"],
});

export default function CaseStudiesPage() {
  return (
    <PageTemplate
      active="Case Studies"
      pillLabel="Case Studies"
      pillCaption="Selected applications"
      title="Applied Operating Models"
      description="Savv Pro's work spans AI-powered growth systems, conversational platforms, workflow automation, and sector-specific operating environments."
    >
      {/* ── Case studies dark section ── */}
      <section className="relative mx-3 md:mx-6 overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#070b14] px-4 sm:px-8 md:px-[120px] py-12 md:py-20 text-white">
        <div
          className="pointer-events-none absolute right-[-80px] top-[-100px] h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle at 80% 20%, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          Selected Work
        </p>
        <h2 className="mb-10 md:mb-14 text-[30px] sm:text-[42px] md:text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Three Applied Models
        </h2>
        <div className="divide-y divide-white/10">
          {studies.map((study) => (
            <article key={study.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 py-10 md:py-14 first:pt-0">
              {/* Left — identity */}
              <div className="md:self-start">
                <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
                  {study.id}
                </p>
                <h2 className="mb-5 text-[22px] md:text-[28px] leading-[1.1] [font-family:Montserrat,sans-serif]">{study.title}</h2>
                <span className="inline-flex rounded-[51px] border border-[#8b71fe]/30 bg-[#8b71fe]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
                  {study.sector}
                </span>
              </div>

              {/* Right — C / A / O */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                <section>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/35 [font-family:Poppins,sans-serif]">Challenge</p>
                  <p className="text-[14px] leading-[1.75] text-white/65 [font-family:Poppins,sans-serif]">{study.challenge}</p>
                </section>
                <section>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/35 [font-family:Poppins,sans-serif]">Approach</p>
                  <p className="text-[14px] leading-[1.75] text-white/65 [font-family:Poppins,sans-serif]">{study.approach}</p>
                </section>
                <section>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/35 [font-family:Poppins,sans-serif]">Outcomes</p>
                  <ul className="space-y-2">
                    {study.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-[13px] text-white/65 [font-family:Poppins,sans-serif]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b71fe]" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white px-4 sm:px-8 md:px-[120px] py-12 md:py-20 pb-16 md:pb-24">
        <article className="relative overflow-hidden rounded-[24px] bg-[#1f2327] px-6 sm:px-10 md:px-12 py-10 md:py-14 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[350px] w-[350px] opacity-15"
            style={{ background: "radial-gradient(circle at 90% 10%, #f97316 0%, transparent 60%)" }}
          />
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            See More
          </p>
          <h2 className="mb-4 text-[26px] sm:text-[34px] md:text-[44px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
            Request relevant examples for your sector.
          </h2>
          <p className="mb-8 md:mb-10 text-[15px] md:text-[17px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">
            We can share more specific material aligned to your use case and operating context.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[14px] md:text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Request Relevant Examples
            </a>
            <a
              href="/solutions"
              className="rounded-[20px] border border-white/30 px-7 py-3.5 text-[14px] md:text-[15px] text-white/80 transition-all duration-200 hover:border-white/60 hover:text-white [font-family:Poppins,sans-serif]"
            >
              View Solutions
            </a>
          </div>
        </article>
      </section>
    </PageTemplate>
  );
}


