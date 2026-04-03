/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { assets } from "@/components/futuristic/assets";
import { SiteFooter, SiteHeader } from "@/components/site";

type HeroStat = {
  label: string;
  value: string;
};

type PageTemplateProps = {
  active: string;
  pillLabel: string;
  pillCaption: string;
  title: string;
  description: string;
  stats?: HeroStat[];
  children: ReactNode;
};

export function PageTemplate({
  active,
  pillLabel,
  pillCaption,
  title,
  description,
  stats,
  children,
}: PageTemplateProps) {
  return (
    <main id="top" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1512px] overflow-hidden bg-white text-[#1f2327]">
        <section className="relative overflow-hidden bg-white px-[106px] pb-16 pt-[42px]">
          <img
            src={assets.heroBlur}
            alt=""
            className="pointer-events-none absolute right-[-90px] top-[-110px] -z-10 size-[540px] opacity-70"
          />

          <SiteHeader active={active} />

          <div className="inline-flex items-center rounded-[51px] bg-[#fafafa] px-3 py-2">
            <span className="rounded-[51px] bg-white px-5 py-1 text-[16px] text-[#8b71fe]">{pillLabel}</span>
            <span className="ml-3 text-[16px]">{pillCaption}</span>
          </div>

          <h1 className="mt-7 max-w-[1020px] text-[74px] uppercase leading-[0.95]">{title}</h1>
          <p className="mt-7 max-w-[1080px] text-[20px] leading-[1.65] text-[#5a5a5a]">{description}</p>

          {stats && stats.length > 0 ? (
            <div className="mt-12 flex max-w-[900px] items-center justify-between gap-8">
              {stats.map((item, index) => (
                <div key={item.label} className="flex items-center gap-8">
                  <div>
                    <p className="text-[40px] leading-none">
                      {item.value}
                      <span className="text-[#8b71fe]">+</span>
                    </p>
                    <p className="mt-1 text-[16px] text-[#5a5a5a]">{item.label}</p>
                  </div>
                  {index < stats.length - 1 ? <div className="h-[29px] w-px bg-[#9b9b9b]" /> : null}
                </div>
              ))}
            </div>
          ) : null}

        </section>

        <section id="page-next-section">{children}</section>

        <SiteFooter />
      </div>
    </main>
  );
}
