import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const pillars = [
  {
    id: "01",
    title: "Client Delivery",
    copy: "We architect bespoke AI ecosystems around business constraints, decision control, and measurable operating outcomes.",
  },
  {
    id: "02",
    title: "Internal IP",
    copy: "We build reusable orchestration modules and product assets that compress build time and improve quality consistency.",
  },
  {
    id: "03",
    title: "Governance",
    copy: "We design approval loops, traceability, and risk controls directly into the operating layer instead of bolting them on later.",
  },
];

const footprint = [
  ["Chicago, IL", "Commercial Base"],
  ["Global", "Delivery Reach"],
  ["Hybrid", "Infrastructure"],
  ["Multi-region", "Time Zones"],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "About Savv Pro",
  description:
    "Learn how Savv Pro designs sovereign, governed AI systems with accountable delivery, global execution, and enterprise-grade operating discipline.",
  path: "/about",
  keywords: ["about savv pro", "enterprise ai company", "ai governance", "sovereign ai architecture"],
});

export default function AboutPage() {
  return (
    <PageTemplate
      active="About"
      pillLabel="About us"
      pillCaption="Savv Pro"
      title="Built. Governed. Scaled."
      description="Savv Pro is a modern AI enterprise built for real operating environments where performance, trust, and control all matter at once."
      stats={[
        { value: "25+", label: "Enterprise Clients" },
        { value: "80+", label: "Automations Built" },
        { value: "100%", label: "Client Retention" },
      ]}
    >
      {/* ── Dark pillars section ── */}
      <section className="relative mx-3 md:mx-6 overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#070b14] px-4 sm:px-8 md:px-[120px] py-12 md:py-20 text-white">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-20"
          style={{ background: "radial-gradient(circle at 80% 20%, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          Our Foundation
        </p>
        <h2 className="text-[32px] sm:text-[42px] md:text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Enterprise AI with accountable delivery
        </h2>
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group rounded-[20px] border border-white/10 bg-white/5 p-6 md:p-8 transition-all duration-300 hover:border-[#8b71fe]/40 hover:bg-white/10"
            >
              <p className="mb-4 text-[13px] text-[#8b71fe] [font-family:Poppins,sans-serif]">{pillar.id}</p>
              <h3 className="mb-4 text-[22px] md:text-[28px] leading-[1.1] [font-family:Montserrat,sans-serif]">{pillar.title}</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Story & Footprint ── */}
      <section className="bg-white px-4 sm:px-8 md:px-[120px] py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <article className="rounded-[24px] border border-[#d9d9d9] p-6 md:p-10 transition-shadow duration-300 hover:shadow-[0_4px_32px_rgba(31,35,39,0.08)]">
            <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
              Who We Are
            </p>
            <h2 className="text-[30px] md:text-[42px] leading-[1.05] [font-family:Montserrat,sans-serif]">Company Story</h2>
            <div className="my-5 md:my-6 h-px bg-[#d9d9d9]" />
            <p className="text-[15px] md:text-[17px] leading-[1.8] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
              Built at the intersection of technical depth and operational accountability. Savv Pro exists because most AI deployments fail not from a lack of technology — but from a lack of operating discipline.
            </p>
            <p className="mt-4 text-[15px] md:text-[17px] leading-[1.8] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
              We bring structure, governance, and production-grade thinking to every engagement.
            </p>
          </article>

          <article className="rounded-[24px] border border-[#d9d9d9] p-6 md:p-10 transition-shadow duration-300 hover:shadow-[0_4px_32px_rgba(31,35,39,0.08)]">
            <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
              Where We Operate
            </p>
            <h2 className="text-[30px] md:text-[42px] leading-[1.05] [font-family:Montserrat,sans-serif]">Operating Footprint</h2>
            <div className="my-5 md:my-6 h-px bg-[#d9d9d9]" />
            <div className="grid grid-cols-2 gap-4">
              {footprint.map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-[16px] bg-[#fafafa] p-4 md:p-5 transition-colors duration-200 hover:bg-[#f0edff]"
                >
                  <p className="text-[20px] md:text-[26px] leading-none [font-family:Montserrat,sans-serif]">{value}</p>
                  <p className="mt-2 text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white px-4 sm:px-8 md:px-[120px] pb-16 md:pb-24">
        <article className="relative overflow-hidden rounded-[24px] bg-[#1f2327] px-6 sm:px-10 md:px-12 py-10 md:py-14 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] opacity-15"
            style={{ background: "radial-gradient(circle at 90% 10%, #f97316 0%, transparent 60%)" }}
          />
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            Start the Conversation
          </p>
          <h2 className="mb-4 text-[28px] sm:text-[36px] md:text-[48px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
            Talk to the team behind Savv Pro.
          </h2>
          <p className="mb-8 md:mb-10 text-[15px] md:text-[17px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">
            If your business needs a serious AI operating layer and not another experiment, start the conversation here.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[14px] md:text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Get in Touch
            </a>
            <a
              href="/services"
              className="rounded-[20px] border border-white/30 px-7 py-3.5 text-[14px] md:text-[15px] text-white/80 transition-all duration-200 hover:border-white/60 hover:text-white [font-family:Poppins,sans-serif]"
            >
              Explore Services
            </a>
          </div>
        </article>
      </section>
    </PageTemplate>
  );
}


