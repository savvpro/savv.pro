import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const sectors = [
  {
    id: "01",
    title: "Healthcare & Pharmacy",
    subtitle: "AI systems built for high-trust clinical and operational environments.",
    challenges: [
      "Fragmented patient intake and communication",
      "Staff time consumed by repetitive coordination",
      "Knowledge access across policy-sensitive content",
      "Document and record workflow inefficiency",
    ],
  },
  {
    id: "02",
    title: "Wealth & Advisory",
    subtitle: "AI for client engagement, internal leverage, and digital authority.",
    challenges: [
      "Delayed lead response and follow-through",
      "Advisor bandwidth consumed by routine tasks",
      "Content and publishing operations without scale",
      "Inconsistent client communication quality",
    ],
  },
  {
    id: "03",
    title: "Education & Training",
    subtitle: "AI for enrollment, communication, and learning operations at scale.",
    challenges: [
      "Enrollment inquiry volume exceeding team capacity",
      "Student communication inconsistency",
      "Content operations without sustainable scale",
      "Fragmented internal knowledge access",
    ],
  },
  {
    id: "04",
    title: "Professional Services",
    subtitle: "Operational leverage for specialist and advisory firms.",
    challenges: [
      "Fee-earner time spent on non-billable coordination",
      "Document and workflow tracking inefficiency",
      "Client follow-up falling through the cracks",
      "Research operations lacking structure",
    ],
  },
  {
    id: "05",
    title: "Service Operations",
    subtitle: "Front-office AI for service-heavy, high-volume businesses.",
    challenges: [
      "High inbound communication volume",
      "Booking and scheduling coordination friction",
      "Support triage without intelligent routing",
      "Operational visibility gaps across workflows",
    ],
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Industry AI Solutions",
  description:
    "Sector-aware AI solutions for healthcare, advisory, education, professional services, and service operations.",
  path: "/solutions",
  keywords: ["industry ai solutions", "healthcare ai", "advisory ai", "education ai", "service operations ai"],
});

export default function SolutionsPage() {
  return (
    <PageTemplate
      active="Solutions"
      pillLabel="Solutions"
      pillCaption="Sector-aware delivery"
      title="Solutions Built By Sector"
      description="Savv Pro does not believe generic AI value is enough. The strongest systems reflect the vocabulary, workflows, constraints, and commercial realities of the sectors they serve."
    >
      {/* ── Sectors dark section ── */}
      <section className="relative mx-3 md:mx-6 overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#070b14] px-4 sm:px-8 md:px-[120px] py-12 md:py-20 text-white">
        <div
          className="pointer-events-none absolute left-[-100px] top-[-100px] h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          Five Sectors
        </p>
        <h2 className="mb-10 md:mb-14 text-[30px] sm:text-[42px] md:text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Sector-aware systems for real operating contexts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {sectors.map((sector) => (
            <article
              key={sector.id}
              className="group flex flex-col rounded-[24px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-[#8b71fe]/30 hover:bg-white/8"
            >
              {/* Header */}
              <div className="mb-5 flex items-start justify-between">
                <p className="text-[13px] text-[#8b71fe] [font-family:Poppins,sans-serif]">{sector.id}</p>
                <span className="rounded-[51px] border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white/40 [font-family:Poppins,sans-serif]">
                  Sector
                </span>
              </div>
              <h3 className="mb-2 text-[28px] leading-[1.1] [font-family:Montserrat,sans-serif]">{sector.title}</h3>
              <p className="mb-6 text-[14px] leading-[1.6] text-white/55 [font-family:Poppins,sans-serif]">{sector.subtitle}</p>
              <div className="h-px bg-white/10 mb-5" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/30 [font-family:Poppins,sans-serif]">Key Challenges</p>
              <ul className="mt-auto space-y-2">
                {sector.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="flex items-start gap-3 text-[13px] text-white/65 [font-family:Poppins,sans-serif]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b71fe]" />
                    {challenge}
                  </li>
                ))}
              </ul>
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
            Your Context Matters
          </p>
          <h2 className="mb-4 text-[26px] sm:text-[34px] md:text-[44px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
            Looking for a sector-specific AI solution?
          </h2>
          <p className="mb-8 md:mb-10 text-[15px] md:text-[17px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">
            Tell us your context. We&apos;ll scope the right system for your operating environment.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[14px] md:text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Discuss Your Use Case
            </a>
            <a
              href="/products"
              className="rounded-[20px] border border-white/30 px-7 py-3.5 text-[14px] md:text-[15px] text-white/80 transition-all duration-200 hover:border-white/60 hover:text-white [font-family:Poppins,sans-serif]"
            >
              View Products
            </a>
          </div>
        </article>
      </section>
    </PageTemplate>
  );
}


