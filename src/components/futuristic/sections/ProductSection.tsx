/* eslint-disable @next/next/no-img-element */

export function ProductSection() {
  const topCards = [
    {
      title: "Savv Pro Voice",
      description:
        "Conversational AI grounded in approved enterprise knowledge and connected to business actions.",
      image: "/generated/home/product-smart-chatbot.png",
    },
    {
      title: "Savv Pro Signal",
      description:
        "Growth intelligence that turns market signals into content planning and publishing execution.",
      image: "/generated/home/product-analytics-engine.png",
    },
  ];

  const bottomCards = [
    {
      title: "Savv Pro Flow",
      description: "Agentic workflow orchestration with visible control and execution accountability.",
      image: "/generated/home/product-savv-flow.png",
    },
    {
      title: "Custom AI Solutions",
      description: "Tailored deployment architecture for your specific sector and operating model.",
      image: "/generated/home/product-custom-solutions.png",
    },
    {
      title: "Automation Hub",
      description: "Structured automation for intake, routing, follow-up, and repeatable delivery workflows.",
      image: "/generated/home/product-automation-hub.png",
    },
  ];

  return (
    <section className="relative bg-white px-4 sm:px-8 md:px-[119px] pt-[56px] md:pt-[64px] pb-[60px] md:pb-[80px] text-[#1f2327]">
      <div className="mx-auto inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">Product</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <h2 className="mx-auto mt-6 md:mt-8 text-center text-[30px] sm:text-[38px] md:text-[48px] [font-family:Montserrat,sans-serif]">
        Productized where useful. Customized where necessary.
      </h2>

      <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topCards.map((item) => (
          <article key={item.title} className="rounded-[24px] bg-[#fafafa] pb-8">
            <img src={item.image} alt={item.title} className="h-[200px] sm:h-[240px] md:h-[265px] w-full rounded-[24px] object-cover" />
            <h3 className="mt-6 text-center text-[22px] sm:text-[26px] md:text-[32px] [font-family:Montserrat,sans-serif]">{item.title}</h3>
            <p className="mx-auto mt-3 md:mt-4 max-w-[90%] text-center text-[14px] md:text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bottomCards.map((item) => (
          <article key={item.title} className="rounded-[24px] bg-[#fafafa] pb-8">
            <img src={item.image} alt={item.title} className="h-[200px] sm:h-[240px] md:h-[265px] w-full rounded-[24px] object-cover" />
            <h3 className="mt-6 text-center text-[22px] sm:text-[26px] md:text-[32px] [font-family:Montserrat,sans-serif]">{item.title}</h3>
            <p className="mx-auto mt-3 md:mt-4 max-w-[90%] text-center text-[14px] md:text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
