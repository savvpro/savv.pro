/* eslint-disable @next/next/no-img-element */
import { SiteHeader } from "@/components/site";
import Grainient from "../Grainient";

export function HeroSection() {
  return (
    <section className="relative isolate h-[1064px] w-full max-w-none overflow-hidden bg-gradient-to-br from-[#FF9FFC] via-[#6b4ce6] to-[#B19EEF] px-[106px] pt-[42px] text-[#1f2327]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Grainient
          color1="#FF9FFC"
          color2="#5227FF"
          color3="#B19EEF"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="relative z-10 h-full">
        <SiteHeader active="Home" />

        {/* Staggered headline — AI Automation value proposition */}
        <div className="absolute left-[46%] top-[166px] text-[96px] font-semibold uppercase leading-none text-[#1f2327] [font-family:Montserrat,sans-serif]">
          Automate.
        </div>
        <div className="absolute left-[54%] top-[283px] text-[96px] font-semibold uppercase leading-none text-[#1f2327] [font-family:Montserrat,sans-serif]">
          Smarter.
        </div>
        <div className="absolute left-[30%] top-[400px] text-[96px] font-semibold uppercase leading-none text-[#1f2327] [font-family:Montserrat,sans-serif]">
          Scale.
        </div>

        <div className="absolute left-[30%] top-[535px]">
          <a
            href="/solutions"
            className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 no-underline hover:no-underline hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border border-neutral-700 text-center uppercase tracking-widest px-6 py-0 flex items-center justify-center text-gray-50 text-sm font-bold rounded-lg overflow-hidden block before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur"
          >
            <span className="relative z-20">Explore Solutions</span>
          </a>
        </div>

        {/* Team avatars + tagline */}
        <div className="absolute left-[120px] top-[720px] flex items-center">
          <img
            src="/generated/home/hero-team-1.jpg"
            alt="Savv Pro AI delivery team"
            className="-mr-5 size-[76px] rounded-[20px] border-2 border-white object-cover"
          />
          <img
            src="/generated/home/hero-team-2.jpg"
            alt="Savv Pro AI strategy team"
            className="-mr-5 size-[76px] rounded-[20px] border-2 border-white object-cover"
          />
          <img
            src="/generated/home/hero-team-3.jpg"
            alt="Savv Pro AI operations team"
            className="size-[76px] rounded-[20px] border-2 border-white object-cover"
          />
        </div>
        <p className="absolute left-[316px] top-[720px] w-[212px] [font-family:Poppins,sans-serif] text-[16px] font-medium leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
          Built for teams that need accountable AI delivery, not another demo.
        </p>

        {/* Stats — positioned between "Deploy." and "Govern." on the left */}
        <div className="absolute left-[120px] top-[300px] flex items-center gap-[30px]">
          <div>
            <p className="[font-family:Montserrat,sans-serif] text-[36px]">25<span className="text-[#8b71fe]">+</span></p>
            <p className="[font-family:Poppins,sans-serif] text-[16px] text-[#3d3b39]">Enterprise Clients</p>
          </div>
          <div className="h-[29px] w-px bg-[#9b9b9b]" />
          <div>
            <p className="[font-family:Montserrat,sans-serif] text-[36px]">80<span className="text-[#8b71fe]">+</span></p>
            <p className="[font-family:Poppins,sans-serif] text-[16px] text-[#3d3b39]">Automations Built</p>
          </div>
        </div>

        <a
          href="#site-footer"
          aria-label="Scroll to bottom"
          className="absolute right-[79px] top-[702px] flex size-[85px] cursor-pointer items-center justify-center rounded-full border-2 border-white/85 bg-white/15 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-200 hover:translate-y-1 hover:bg-white/25"
        >
          <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 14l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
