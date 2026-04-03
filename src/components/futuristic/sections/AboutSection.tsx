/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { assets } from "../assets";

export function AboutSection() {
  return (
    <section className="relative bg-white px-[120px] pt-[74px] pb-[80px] text-[#1f2327]">
      <div className="mb-10 inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
        <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe] [font-family:Poppins,sans-serif]">About us</span>
        <span className="ml-3 text-[16px] [font-family:Poppins,sans-serif]">Savv Pro</span>
      </div>

      <h2 className="w-[569px] text-[48px] [font-family:Montserrat,sans-serif]">Built. Governed. Scaled.</h2>

      <div className="mt-10 grid grid-cols-[411px_1fr_196px_196px] gap-8">
        <img
          src="/generated/home/about-main.png"
          alt="Savv Pro enterprise AI operating model visual"
          className="h-[389px] w-full rounded-[20px] object-cover"
        />
        <div>
          <h3 className="mb-4 w-[323px] text-[32px] [font-family:Montserrat,sans-serif]">Enterprise AI With Accountable Delivery</h3>
          <p className="mb-5 w-[399px] text-[16px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Savv Pro exists because most AI deployments fail from weak operating discipline. We design sovereign, governed systems that perform in real business environments — not lab conditions.
          </p>
          <Link
            href="/about"
            className="flex items-center gap-4 text-[#8b71fe] [font-family:Poppins,sans-serif] hover:opacity-80 transition-opacity"
          >
            <span className="text-[20px] font-semibold">Explore more</span>
            <img src={assets.aboutArrow} alt="" className="size-[14px]" />
          </Link>
        </div>
        <div className="self-end">
          <img
            src="/generated/home/about-technology.png"
            alt="AI technology systems visual"
            className="mb-3 h-[200px] w-full rounded-[20px] object-cover"
          />
          <Link href="/services" className="flex items-center justify-between text-[16px] text-[#8b71fe] hover:opacity-80 transition-opacity [font-family:Poppins,sans-serif]">
            Services <span className="ml-2">→</span>
          </Link>
        </div>
        <div className="self-end">
          <img
            src="/generated/home/about-artificial.png"
            alt="AI governance and orchestration visual"
            className="mb-3 h-[200px] w-full rounded-[20px] object-cover"
          />
          <Link href="/sovereign-ai" className="flex items-center justify-between text-[16px] text-[#8b71fe] hover:opacity-80 transition-opacity [font-family:Poppins,sans-serif]">
            Sovereign AI <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      <div className="mt-12 flex max-w-[734px] items-center justify-between">
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
