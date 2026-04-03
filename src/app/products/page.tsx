import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const products = [
  {
    id: "Voice",
    name: "Savv Pro Voice",
    strap: "Conversational AI grounded in knowledge and connected to action.",
    body: "A conversational AI platform for voice and chat interactions grounded in approved enterprise knowledge and connected to meaningful business actions. Designed for real operational environments, not lab demos.",
    useCases: [
      "Receptionist and intake automation",
      "Lead qualification and routing",
      "Customer support and callbacks",
      "Appointment and meeting coordination",
      "Internal assistant experiences",
    ],
  },
  {
    id: "Signal",
    name: "Savv Pro Signal",
    strap: "Growth intelligence that turns market signals into real execution.",
    body: "A growth intelligence and campaign operating system that transforms real market signals into content planning, publishing workflows, and commercial opportunity discovery.",
    useCases: [
      "SEO content systems and publishing",
      "Social media workflow automation",
      "Research-to-campaign pipelines",
      "Market signal mapping and analysis",
      "Thought leadership operations",
    ],
  },
  {
    id: "Flow",
    name: "Savv Pro Flow",
    strap: "Agentic execution with visible control and accountability.",
    body: "An agentic workflow layer for structured execution, accountability, task orchestration, and business process automation with visible human control built into the operating design.",
    useCases: [
      "Task routing and prioritization",
      "Follow-up and escalation automation",
      "Approvals and execution tracking",
      "Operational escalation pathways",
      "AI-assisted operating cadence",
    ],
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "AI Products",
  description:
    "Discover Savv Pro Voice, Signal, and Flow: productized AI systems for conversational workflows, growth intelligence, and agentic operations.",
  path: "/products",
  keywords: ["ai products", "savv pro voice", "savv pro signal", "savv pro flow", "agentic workflows"],
});

export default function ProductsPage() {
  return (
    <PageTemplate
      active="Products"
      pillLabel="Product Ecosystem"
      pillCaption="Deployable enterprise value"
      title="Productized AI Systems"
      description="Savv Pro's product ecosystem translates repeated delivery patterns into hardened systems that help organizations move faster without sacrificing control."
    >
      {/* ── Products dark section ── */}
      <section className="relative mx-6 overflow-hidden rounded-[32px] bg-[#070b14] px-[120px] py-20 text-white">
        <div
          className="pointer-events-none absolute left-[-100px] top-[-100px] h-[500px] w-[500px] opacity-15"
          style={{ background: "radial-gradient(circle, #8b71fe 0%, transparent 65%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          The Ecosystem
        </p>
        <h2 className="mb-14 text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Voice, Signal, and Flow
        </h2>
        <div className="divide-y divide-white/10">
          {products.map((product, i) => (
            <article key={product.name} className="group grid grid-cols-[1fr_2fr] gap-16 py-14 transition-colors duration-300 first:pt-0">
              {/* Left — identity */}
              <div className="sticky top-8 self-start">
                <p className="mb-3 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-4 text-[38px] leading-[1.05] [font-family:Montserrat,sans-serif]">{product.name}</h3>
                <span className="inline-flex rounded-[51px] border border-[#8b71fe]/30 bg-[#8b71fe]/10 px-4 py-1.5 text-[12px] uppercase tracking-[0.1em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
                  {product.id}
                </span>
              </div>

              {/* Right — detail */}
              <div>
                <p className="mb-3 text-[20px] leading-[1.45] text-white/90 [font-family:Poppins,sans-serif]">{product.strap}</p>
                <p className="mb-8 text-[15px] leading-[1.8] text-white/55 [font-family:Poppins,sans-serif]">{product.body}</p>
                <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-white/35 [font-family:Poppins,sans-serif]">Use Cases</p>
                <div className="flex flex-wrap gap-2">
                  {product.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-[51px] border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/75 transition-colors duration-200 hover:border-[#8b71fe]/40 hover:text-white [font-family:Poppins,sans-serif]"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Philosophy section ── */}
      <section className="bg-white px-[120px] py-20">
        <div className="rounded-[24px] border border-[#d9d9d9] p-12 transition-shadow duration-300 hover:shadow-[0_4px_32px_rgba(31,35,39,0.08)]">
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            Our Approach
          </p>
          <h2 className="mb-6 text-[46px] leading-[1.05] [font-family:Montserrat,sans-serif]">Product Philosophy</h2>
          <div className="h-px bg-[#d9d9d9] mb-8" />
          <p className="max-w-[900px] text-[17px] leading-[1.8] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Productized where useful. Customized where necessary. We do not force every client into a rigid software template. Our products act as accelerators and operating layers that reduce delivery time, improve repeatability, and provide a stronger base for enterprise deployment.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Request a Walkthrough
            </a>
            <a
              href="/services"
              className="rounded-[20px] border border-[#1f2327]/20 px-7 py-3.5 text-[15px] text-[#1f2327] transition-all duration-200 hover:border-[#1f2327]/50 [font-family:Poppins,sans-serif]"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}


