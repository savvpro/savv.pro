import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const services = [
  ["01", "Sovereign AI Advisory", "Use-case prioritization, governance requirements, model strategy, deployment architecture, and operating design before implementation begins."],
  ["02", "Enterprise AI Buildouts", "Custom design and deployment of AI agents, retrieval systems, orchestration, and human-in-the-loop layers around real business needs."],
  ["03", "Knowledge System Design", "Controlled knowledge bases, retrieval architecture, source approvals, and enterprise memory structures for trustworthy performance."],
  ["04", "Workflow Automation", "Automation across operations, customer handling, follow-up, internal coordination, and task execution with review logic."],
  ["05", "Managed AI Operations", "Monitoring, iteration, prompt and policy refinement, deployment updates, and operational tuning after launch."],
  ["06", "Integration-Led Delivery", "Connecting AI into data sources, workflow platforms, communication layers, and operational tools where needed."],
] as const;

const process = [
  ["01", "Assess", "Understand the operating environment, use cases, and constraints before any architecture decisions are made."],
  ["02", "Architect", "Design the system, governance model, and integration approach with clarity before a single line of code is written."],
  ["03", "Deploy", "Build and implement with quality, testing, and operator readiness as first-class requirements."],
  ["04", "Govern", "Instrument observability, access controls, and review structures so the system is auditable from day one."],
  ["05", "Refine", "Iterate based on real usage data, performance signals, and operational feedback loops."],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "AI Services",
  description:
    "Explore Savv Pro AI services including sovereign AI advisory, enterprise buildouts, workflow automation, knowledge systems, and managed AI operations.",
  path: "/services",
  keywords: ["ai services", "enterprise ai buildout", "workflow automation", "managed ai operations"],
});

export default function ServicesPage() {
  return (
    <PageTemplate
      active="Services"
      pillLabel="Services"
      pillCaption="From concept to production"
      title="Services Built For Execution"
      description="Services built to move AI from concept to controlled production with quality, governance, and operating accountability."
    >
      {/* ── Services grid dark section ── */}
      <section className="relative mx-3 md:mx-6 overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#070b14] px-4 sm:px-8 md:px-[120px] py-12 md:py-20 text-white">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle at 80% 20%, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          What We Do
        </p>
        <h2 className="mb-10 md:mb-14 text-[32px] sm:text-[42px] md:text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Six Service Disciplines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map(([id, title, text]) => (
            <article
              key={id}
              className="group rounded-[20px] border border-white/10 bg-white/5 p-6 md:p-8 transition-all duration-300 hover:border-[#8b71fe]/40 hover:bg-white/10"
            >
              <p className="mb-4 text-[13px] text-[#8b71fe] [font-family:Poppins,sans-serif]">{id}</p>
              <h3 className="mb-4 text-[20px] md:text-[26px] leading-[1.15] [font-family:Montserrat,sans-serif]">{title}</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-white/65 [font-family:Poppins,sans-serif]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Process white section ── */}
      <section className="bg-white px-4 sm:px-8 md:px-[120px] py-12 md:py-20">
        <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          Delivery Model
        </p>
        <h2 className="mb-2 text-[30px] md:text-[46px] leading-[1.05] [font-family:Montserrat,sans-serif]">How We Work</h2>
        <p className="mb-8 md:mb-12 text-[15px] md:text-[17px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          A structured, five-phase delivery process for every engagement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {process.map(([id, title, text], i) => (
            <article
              key={id}
              className="group relative rounded-[20px] bg-[#fafafa] p-6 transition-all duration-300 hover:bg-[#f0edff] hover:shadow-[0_4px_24px_rgba(139,113,254,0.12)]"
            >
              {i < process.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 bg-[#d9d9d9] xl:block" />
              )}
              <p className="mb-3 text-[22px] font-bold text-[#8b71fe] [font-family:Montserrat,sans-serif]">{id}</p>
              <h3 className="mb-3 text-[20px] md:text-[22px] leading-[1.1] [font-family:Montserrat,sans-serif]">{title}</h3>
              <p className="text-[13px] leading-[1.65] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white px-4 sm:px-8 md:px-[120px] pb-16 md:pb-24">
        <article className="relative overflow-hidden rounded-[24px] bg-[#1f2327] px-6 sm:px-10 md:px-12 py-10 md:py-14 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[350px] w-[350px] opacity-15"
            style={{ background: "radial-gradient(circle at 90% 10%, #f97316 0%, transparent 60%)" }}
          />
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            Let&apos;s Scope Your Engagement
          </p>
          <h2 className="mb-4 text-[26px] sm:text-[34px] md:text-[44px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
            Need a specific AI operating model?
          </h2>
          <p className="mb-8 md:mb-10 text-[15px] md:text-[17px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">
            We can scope the right service mix around your sector, risk profile, and workflow maturity.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[14px] md:text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Book a Services Consultation
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


