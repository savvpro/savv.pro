/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { assets } from "../assets";

export function AboutSection() {
  return (
    <section className="relative bg-white px-4 sm:px-8 md:px-[120px] pt-[60px] md:pt-[74px] pb-[60px] md:pb-[80px] text-[#1f2327]">
      <div className="mb-8 md:mb-10 inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">About us</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <h2 className="text-[36px] sm:text-[42px] md:text-[48px] [font-family:Montserrat,sans-serif]">Built. Governed. Scaled.</h2>

      <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[411px_1fr_196px_196px] gap-6 md:gap-8">
        <img
          src="/generated/home/about-main.webp"
          alt="Savv Pro enterprise AI operating model visual"
          className="h-[260px] sm:h-[320px] md:h-[389px] w-full rounded-[20px] object-cover sm:col-span-2 md:col-span-1"
        />
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="mb-4 text-[24px] sm:text-[28px] md:text-[32px] [font-family:Montserrat,sans-serif]">Enterprise AI With Accountable Delivery</h3>
          <p className="mb-5 text-[15px] md:text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Savv Pro exists because most AI deployments fail from weak operating discipline. We design sovereign, governed systems that perform in real business environments — not lab conditions.
          </p>
          <Link
            href="/about"
            className="flex items-center gap-4 text-[#8b71fe] [font-family:Poppins,sans-serif] hover:opacity-80 transition-opacity"
          >
            <span className="text-[18px] md:text-[20px] font-semibold">Explore more</span>
            <img src={assets.aboutArrow} alt="" className="size-[14px]" />
          </Link>
        </div>
        <div className="md:self-end">
          <img
            src="/generated/home/about-technology.webp"
            alt="AI technology systems visual"
            className="mb-3 h-[180px] md:h-[200px] w-full rounded-[20px] object-cover"
          />
          <Link href="/services" className="flex items-center justify-between text-[16px] text-[#8b71fe] hover:opacity-80 transition-opacity [font-family:Poppins,sans-serif]">
            Services <span className="ml-2">→</span>
          </Link>
        </div>
        <div className="md:self-end">
          <img
            src="/generated/home/about-artificial.webp"
            alt="AI governance and orchestration visual"
            className="mb-3 h-[180px] md:h-[200px] w-full rounded-[20px] object-cover"
          />
          <Link href="/sovereign-ai" className="flex items-center justify-between text-[16px] text-[#8b71fe] hover:opacity-80 transition-opacity [font-family:Poppins,sans-serif]">
            Sovereign AI <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-12 flex flex-wrap gap-8 md:gap-0 md:max-w-[734px] md:items-center md:justify-between">
        <div>
          <p className="text-[40px] [font-family:Montserrat,sans-serif]">25<span className="text-[#8b71fe]">+</span></p>
          <p className="text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Enterprise Clients</p>
        </div>
        <div className="h-[29px] w-px bg-[#9b9b9b]" />
        <div>
          <p className="text-[40px] [font-family:Montserrat,sans-serif]">80<span className="text-[#8b71fe]">+</span></p>
          <p className="text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Automations Built</p>
        </div>
        <div className="h-[29px] w-px bg-[#9b9b9b]" />
        <div>
          <p className="text-[40px] [font-family:Montserrat,sans-serif]">100<span className="text-[#8b71fe]">%</span></p>
          <p className="text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Client Retention</p>
        </div>
      </div>
    </section>
  );
}
