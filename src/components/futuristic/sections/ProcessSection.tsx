export function ProcessSection() {
  const steps = [
    ["01", "Assess", "Understand your workflows, sector constraints, and governance boundaries before any architecture decisions are made."],
    ["02", "Architect", "Design sovereign model strategy, integration map, and accountability controls with clarity before implementation."],
    ["03", "Deploy", "Implement systems in production with testing, observability, and operator readiness built in from the start."],
    ["04", "Govern", "Instrument observability, access controls, and review structures so the system is auditable and manageable."],
    ["05", "Refine", "Iterate based on real usage data, performance signals, and operational feedback loops after launch."],
  ];

  return (
    <section className="relative bg-white px-[114px] pt-[64px] pb-[80px] text-[#1f2327]">
      <div className="inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">Process</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <div className="mt-6 mb-12 flex items-end justify-between">
        <h2 className="max-w-[500px] text-[40px] [font-family:Montserrat,sans-serif]">Step-by-step AI integration for controlled growth</h2>
        <a
          href="/services"
          className="rounded-[20px] border border-[#1f2327]/25 px-6 py-3 text-[15px] text-[#1f2327] transition-colors duration-200 hover:bg-[#1f2327] hover:text-white [font-family:Poppins,sans-serif]"
        >
          Full Delivery Model
        </a>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {steps.map(([id, title, desc], i) => (
          <article
            key={id}
            className="group relative rounded-[20px] bg-[#fafafa] p-6 transition-all duration-300 hover:bg-[#f0edff] hover:shadow-[0_4px_24px_rgba(139,113,254,0.12)]"
          >
            {i < steps.length - 1 && (
              <div className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 bg-[#d9d9d9] xl:block" />
            )}
            <p className="mb-3 text-[22px] font-bold text-[#8b71fe] [font-family:Montserrat,sans-serif]">{id}</p>
            <h3 className="mb-3 text-[20px] leading-[1.1] [font-family:Montserrat,sans-serif]">{title}</h3>
            <p className="text-[13px] leading-[1.65] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
