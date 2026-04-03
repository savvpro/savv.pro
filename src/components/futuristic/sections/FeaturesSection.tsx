/* eslint-disable @next/next/no-img-element */

const cards = [
  {
    title: "Sovereign AI Architecture",
    desc: "Model, data, and workflow control designed from day one — no bolted-on governance, no vendor lock-in.",
    image: "/generated/home/feature-sovereign-arch.png",
    offset: "mt-[60px]",
  },
  {
    title: "Governed Automation",
    desc: "Human review loops, policy boundaries, and accountable execution built into the operating layer.",
    image: "/generated/home/feature-governed-automation.png",
    offset: "mt-[180px]",
  },
  {
    title: "Sector-Aware Delivery",
    desc: "Solutions aligned to healthcare, wealth & advisory, education, and service operations — reflecting real sector constraints.",
    image: "/generated/home/feature-sector-delivery.png",
    offset: "mt-[120px]",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative bg-white px-[120px] pt-[72px] pb-[80px] text-[#1f2327]">
      <div className="inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">Features</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <div className="mt-6 flex items-start justify-between">
        <h2 className="w-[533px] text-[48px] [font-family:Montserrat,sans-serif]">Designed for Real Operating Environments</h2>
        <p className="w-[267px] pt-10 text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          We build AI systems that prioritize performance, trust, and enterprise control together.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-8 pb-[60px]">
        {cards.map((card) => (
          <article key={card.title} className={`relative ${card.offset}`}>
            <img
              src={card.image}
              alt={card.title}
              className="h-[240px] w-full rounded-[20px] object-cover"
            />
            <h3 className="mt-7 w-[274px] text-[32px] leading-[1.1] [font-family:Rethink_Sans,sans-serif]">{card.title}</h3>
            <p className="mt-5 w-[292px] text-[15px] leading-[1.7] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
