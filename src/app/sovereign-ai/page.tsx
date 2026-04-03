import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const layers = [
  {
    id: "01",
    title: "Model Sovereignty",
    text: "Choose the right model stack for the job, not a permanent black-box dependency. Open, closed, fine-tuned, or hybrid — the architecture serves the use case.",
  },
  {
    id: "02",
    title: "Deployment Sovereignty",
    text: "Public cloud, controlled cloud, hybrid, or structured enterprise environment based on need, risk profile, and data residency requirements.",
  },
  {
    id: "03",
    title: "Data Sovereignty",
    text: "Ground systems in approved knowledge boundaries, access policies, and governed information flow. No uncontrolled data ingestion or retrieval.",
  },
  {
    id: "04",
    title: "Workflow Sovereignty",
    text: "AI must adapt to the business process, not force the business into brittle automation patterns built around a vendor's preferred architecture.",
  },
  {
    id: "05",
    title: "Human Sovereignty",
    text: "Critical actions stay visible, reviewable, and accountable. Human oversight is not an afterthought — it is built into the system's operating structure.",
  },
];

const compatibility = [
  ["Open-source models", "Supported"],
  ["Proprietary frontier models", "Supported"],
  ["Self-hosted deployment", "Supported"],
  ["Private cloud deployment", "Supported"],
  ["Hybrid architecture", "Supported"],
  ["Vendor lock-in", "Avoided"],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Sovereign AI Framework",
  description:
    "Understand Savv Pro's five-layer sovereign AI framework for model choice, deployment control, data governance, workflow fit, and human oversight.",
  path: "/sovereign-ai",
  keywords: ["sovereign ai", "ai governance framework", "model sovereignty", "enterprise ai control"],
});

export default function SovereignAiPage() {
  return (
    <PageTemplate
      active="Sovereign AI"
      pillLabel="Sovereign AI"
      pillCaption="Control-first architecture"
      title="Sovereignty Means Control"
      description="For Savv Pro, sovereign AI means an organization retains meaningful control over how intelligence is deployed, governed, integrated, and operated across its business."
    >
      {/* ── Five layers dark section ── */}
      <section className="relative mx-6 overflow-hidden rounded-[32px] bg-[#070b14] px-[120px] py-20 text-white">
        <div
          className="pointer-events-none absolute right-[-80px] top-[-80px] h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle at 80% 20%, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          The Framework
        </p>
        <h2 className="mb-3 text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Five Layers of Sovereignty
        </h2>
        <p className="mb-14 text-[17px] text-white/60 [font-family:Poppins,sans-serif]">
          What sovereignty means at Savv Pro, operationally defined.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {layers.map((layer, i) => (
            <article
              key={layer.id}
              className={`group rounded-[20px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-[#8b71fe]/40 hover:bg-white/10 ${i === 3 ? "col-start-1" : ""}`}
            >
              <p className="mb-4 text-[30px] font-bold text-[#8b71fe]/30 [font-family:Montserrat,sans-serif]">{layer.id}</p>
              <h3 className="mb-4 text-[26px] leading-[1.1] [font-family:Montserrat,sans-serif]">{layer.title}</h3>
              <p className="text-[14px] leading-[1.75] text-white/65 [font-family:Poppins,sans-serif]">{layer.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Compatibility white section ── */}
      <section className="bg-white px-[120px] py-20">
        <div className="rounded-[24px] border border-[#d9d9d9] p-12 transition-shadow duration-300 hover:shadow-[0_4px_32px_rgba(31,35,39,0.08)]">
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            Open Stack
          </p>
          <h2 className="mb-6 text-[44px] leading-[1.05] [font-family:Montserrat,sans-serif]">Open Stack Compatibility</h2>
          <div className="h-px bg-[#d9d9d9] mb-8" />
          <p className="mb-10 max-w-[900px] text-[17px] leading-[1.8] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Open source matters because sovereignty requires optionality. Frontier closed models still matter, but they should sit inside a broader strategy of control and choice — not as the only option.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {compatibility.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-[14px] bg-[#fafafa] px-6 py-4 transition-colors duration-200 hover:bg-[#f0edff]"
              >
                <p className="text-[15px] text-[#1f2327] [font-family:Poppins,sans-serif]">{label}</p>
                <span
                  className={`rounded-[51px] px-3 py-1 text-[13px] font-medium [font-family:Poppins,sans-serif] ${
                    value === "Avoided"
                      ? "bg-[#fff0eb] text-[#f97316]"
                      : "bg-[#f0edff] text-[#8b71fe]"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
          >
            Start a Sovereign AI Consultation
          </a>
        </div>
      </section>
    </PageTemplate>
  );
}


