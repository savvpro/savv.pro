import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const roles = [
  ["AI Operators", "Specialists managing agent behavior, outputs, and escalation logic across live deployments."],
  ["Workflow Designers", "Professionals mapping and implementing structured automation paths around real business processes."],
  ["Implementation Engineers", "Technical builders deploying retrieval, orchestration, and integration layers at enterprise scale."],
  ["Prompt & Policy Specialists", "Experts managing knowledge boundaries, tone, and system behavior across operating environments."],
  ["Deployment Support", "Product-minded resources ensuring quality delivery, testing readiness, and rollout confidence."],
  ["System Refinement Resources", "Continuous improvement specialists for post-launch iteration, monitoring, and performance tuning."],
] as const;

const model = [
  ["01", "Capability Mapping", "We assess the skills, capacity, and specialist coverage required for the engagement scope."],
  ["02", "Use-Case Alignment", "We map resources to specific delivery objectives, outcomes, and operating constraints."],
  ["03", "Pod Design", "We structure the team, responsibilities, operating boundaries, and accountability model."],
  ["04", "Operating Cadence", "We establish reporting rhythm, escalation paths, and quality checkpoints throughout delivery."],
  ["05", "Handoff or Continuity", "We define transition plans or ongoing embedded delivery arrangements based on your needs."],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "AI Resource Augmentation",
  description:
    "Scale delivery with Savv Pro's AI resource augmentation model, from capability mapping and pod design to operating cadence and continuity.",
  path: "/resource-augmentation",
  keywords: ["ai resource augmentation", "ai implementation team", "ai pod design", "enterprise ai staffing"],
});

export default function ResourceAugmentationPage() {
  return (
    <PageTemplate
      active="Resource Augmentation"
      pillLabel="Resource Augmentation"
      pillCaption="Specialized enterprise capacity"
      title="Augmentation For Serious Execution"
      description="Savv Pro provides specialized AI talent capacity for organizations that need more than advice but are not looking to build an entire internal AI team from scratch."
    >
      {/* ── Roles dark section ── */}
      <section className="relative mx-6 overflow-hidden rounded-[32px] bg-[#070b14] px-[120px] py-20 text-white">
        <div
          className="pointer-events-none absolute left-[-100px] top-[-100px] h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle, #8b71fe 0%, transparent 60%)" }}
        />
        <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          Specialist Roles
        </p>
        <h2 className="mb-3 max-w-[800px] text-[56px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
          Augmentation, not labor arbitrage.
        </h2>
        <p className="mb-14 max-w-[680px] text-[17px] text-white/60 [font-family:Poppins,sans-serif]">
          Every resource we place is aligned to a specific operating function, not a generic job title.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {roles.map(([title, text]) => (
            <article
              key={title}
              className="group rounded-[20px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-[#8b71fe]/40 hover:bg-white/10"
            >
              <h3 className="mb-4 text-[24px] leading-[1.15] [font-family:Montserrat,sans-serif]">{title}</h3>
              <p className="text-[14px] leading-[1.75] text-white/65 [font-family:Poppins,sans-serif]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Delivery model white section ── */}
      <section className="bg-white px-[120px] py-20">
        <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
          How It Works
        </p>
        <h2 className="mb-2 text-[46px] leading-[1.05] [font-family:Montserrat,sans-serif]">Delivery Model</h2>
        <p className="mb-12 text-[17px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          A structured five-step model that moves from need to operating pod.
        </p>
        <div className="grid grid-cols-5 gap-4">
          {model.map(([id, title, text]) => (
            <article
              key={id}
              className="group rounded-[20px] bg-[#fafafa] p-6 transition-all duration-300 hover:bg-[#f0edff] hover:shadow-[0_4px_24px_rgba(139,113,254,0.12)]"
            >
              <p className="mb-3 text-[22px] font-bold text-[#8b71fe] [font-family:Montserrat,sans-serif]">{id}</p>
              <h3 className="mb-3 text-[20px] leading-[1.1] [font-family:Montserrat,sans-serif]">{title}</h3>
              <p className="text-[13px] leading-[1.65] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white px-[120px] pb-24">
        <article className="relative overflow-hidden rounded-[24px] bg-[#1f2327] px-12 py-14 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[350px] w-[350px] opacity-15"
            style={{ background: "radial-gradient(circle at 90% 10%, #f97316 0%, transparent 60%)" }}
          />
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
            Build Your Pod
          </p>
          <h2 className="mb-4 max-w-[680px] text-[44px] uppercase leading-[1.0] [font-family:Montserrat,sans-serif]">
            Scope an augmentation pod.
          </h2>
          <p className="mb-10 max-w-[620px] text-[17px] leading-[1.75] text-white/70 [font-family:Poppins,sans-serif]">
            Tell us what capability you need. We&apos;ll design a pod structure that fits your team and delivery requirements.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="rounded-[20px] bg-[#f97316] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(249,115,22,0.4)] transition-all duration-200 hover:brightness-110 [font-family:Poppins,sans-serif]"
            >
              Scope an Augmentation Pod
            </a>
            <a
              href="/services"
              className="rounded-[20px] border border-white/30 px-7 py-3.5 text-[15px] text-white/80 transition-all duration-200 hover:border-white/60 hover:text-white [font-family:Poppins,sans-serif]"
            >
              Learn About Services
            </a>
          </div>
        </article>
      </section>
    </PageTemplate>
  );
}


