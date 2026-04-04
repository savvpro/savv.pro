const services = [
  {
    id: "01",
    title: "Sovereign AI Advisory",
    desc: "Use-case prioritization, model strategy, governance design, and architecture decisions before deployment begins.",
  },
  {
    id: "02",
    title: "Enterprise AI Buildouts",
    desc: "Custom agents, retrieval systems, orchestration layers, and human-in-the-loop controls built around real business needs.",
  },
  {
    id: "03",
    title: "Knowledge System Design",
    desc: "Controlled knowledge bases, retrieval architecture, source approvals, and governed information flow for trustworthy performance.",
  },
  {
    id: "04",
    title: "Workflow Automation",
    desc: "Automation across operations, customer handling, follow-up, and task execution with human review logic built in.",
  },
  {
    id: "05",
    title: "Managed AI Operations",
    desc: "Monitoring, prompt and policy refinement, deployment updates, and operational tuning after launch.",
  },
  {
    id: "06",
    title: "Integration-Led Delivery",
    desc: "Connecting AI into data sources, workflow platforms, communication layers, and operational tools where needed.",
  },
];

export function ServiceSection() {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-[120px] py-[60px] md:py-[80px] text-[#1f2327]">

      {/* ── Header ── */}
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
        <div>
          <div className="mb-6 md:mb-8 inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
            <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">Core Services</span>
            <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
          </div>
          <h2 className="text-[36px] sm:text-[44px] md:text-[56px] leading-[1.05] [font-family:Montserrat,sans-serif]">
            Services Built For<br />Controlled Enterprise<br />AI Deployment
          </h2>
        </div>
        <div className="md:shrink-0 md:max-w-[340px]">
          <p className="mb-6 md:mb-8 text-[15px] md:text-[16px] leading-[1.8] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            From concept to controlled production. Every engagement is scoped around your sector, risk profile, and workflow maturity.
          </p>
          <a
            href="/services"
            className="inline-block rounded-[20px] bg-[#1f2327] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#8b71fe] [font-family:Poppins,sans-serif]"
          >
            View All Services
          </a>
        </div>
      </div>

      {/* ── Service rows ── */}
      <div className="border-t border-[#e8e8e8]">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="group border-b border-[#e8e8e8] py-5 md:py-7 transition-all duration-300 hover:bg-[#fafafa] hover:px-3 md:hover:px-5 hover:rounded-[16px] hover:border-transparent"
          >
            {/* Mobile layout */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-[#c0c0c0] transition-colors duration-300 group-hover:text-[#8b71fe] [font-family:Poppins,sans-serif]">
                    {svc.id}
                  </span>
                  <h3 className="text-[18px] leading-[1.2] [font-family:Montserrat,sans-serif] transition-colors duration-300 group-hover:text-[#8b71fe]">
                    {svc.title}
                  </h3>
                </div>
                <span className="inline-grid size-8 shrink-0 place-items-center rounded-full border border-[#d9d9d9] text-[#9b9b9b] transition-all duration-300 group-hover:border-[#8b71fe] group-hover:bg-[#8b71fe] group-hover:text-white">
                  ↗
                </span>
              </div>
              <p className="text-[13px] leading-[1.7] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
                {svc.desc}
              </p>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-[72px_1fr_360px_auto] md:items-center md:gap-6">
              <span className="text-[13px] font-medium text-[#c0c0c0] transition-colors duration-300 group-hover:text-[#8b71fe] [font-family:Poppins,sans-serif]">
                {svc.id}
              </span>
              <h3 className="text-[26px] leading-[1.1] [font-family:Montserrat,sans-serif] transition-colors duration-300 group-hover:text-[#8b71fe]">
                {svc.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
                {svc.desc}
              </p>
              <div className="flex justify-end">
                <span className="inline-grid size-9 shrink-0 place-items-center rounded-full border border-[#d9d9d9] text-[#9b9b9b] transition-all duration-300 group-hover:border-[#8b71fe] group-hover:bg-[#8b71fe] group-hover:text-white">
                  ↗
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
