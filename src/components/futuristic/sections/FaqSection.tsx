export function FaqSection() {
  return (
    <section className="relative bg-white px-[120px] py-[64px] text-[#1f2327]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[40px] leading-[1.2] [font-family:Montserrat,sans-serif]">
            <span className="block">Ready to build</span>
            <span className="block">your AI operating layer?</span>
          </h2>
          <p className="mt-5 max-w-[540px] text-[16px] text-[#1f2327]/70 [font-family:Poppins,sans-serif]">
            Tell us your use case and we will map the right sovereign AI path for your operating environment.
          </p>
        </div>

        <a
          href="/contact"
          className="rounded-[20px] bg-[#1f2327] px-8 py-4 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-[#8b71fe] [font-family:Poppins,sans-serif]"
        >
          Request Consultation
        </a>
      </div>
    </section>
  );
}
