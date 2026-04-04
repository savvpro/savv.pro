export function WhyChooseSection() {
  return (
    <section className="relative bg-white px-4 sm:px-8 md:px-[120px] pt-[56px] md:pt-[64px] pb-[56px] md:pb-[80px] text-[#1f2327]">
      <div className="inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">Why Choose us</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] capitalize [font-family:Montserrat,sans-serif] md:w-[498px]">Control-first AI for enterprise outcomes</h2>
        <a
          href="/contact"
          className="self-start rounded-[20px] border border-[#1f2327] px-5 py-3 text-[15px] md:text-[16px] transition-colors duration-200 hover:bg-[#1f2327] hover:text-white [font-family:Poppins,sans-serif]"
        >
          Get Started
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h3 className="mb-4 text-[18px] md:text-[20px] font-semibold [font-family:Poppins,sans-serif]">Built for accountable deployment</h3>
          <p className="text-[15px] md:text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            We design systems where quality, risk, and performance are managed together.
          </p>
        </div>
        <div className="space-y-5">
          {["Sovereign AI Architecture", "Integration-Led Delivery", "Human-In-The-Loop Governance"].map((item, i) => (
            <div key={item} className="flex items-center justify-between border-b border-[#d9d9d9] pb-3">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[16px] md:text-[20px] [font-family:Poppins,sans-serif]">0{i + 1}</span>
                <span className="text-[15px] md:text-[20px] [font-family:Poppins,sans-serif]">{item}</span>
              </div>
              <span className="inline-grid size-8 place-items-center rounded-full border border-[#d9d9d9] shrink-0">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
