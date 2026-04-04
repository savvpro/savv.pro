export function FaqSection() {
  return (
    <section className="relative bg-white px-4 sm:px-8 md:px-[120px] py-[48px] md:py-[64px] text-[#1f2327]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] [font-family:Montserrat,sans-serif]">
            <span className="block">Ready to build</span>
            <span className="block">your AI operating layer?</span>
          </h2>
          <p className="mt-4 md:mt-5 text-[15px] md:text-[16px] text-[#1f2327]/70 [font-family:Poppins,sans-serif]">
            Tell us your use case and we will map the right sovereign AI path for your operating environment.
          </p>
        </div>

        <a
          href="/contact"
          className="self-start sm:self-auto shrink-0 rounded-[20px] bg-[#1f2327] px-7 md:px-8 py-3.5 md:py-4 text-[14px] md:text-[15px] font-bold text-white transition-colors duration-200 hover:bg-[#8b71fe] [font-family:Poppins,sans-serif]"
        >
          Request Consultation
        </a>
      </div>
    </section>
  );
}
