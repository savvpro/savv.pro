/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sovereign-ai", label: "Sovereign AI" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
];

const moreItems: NavItem[] = [
  { href: "/resource-augmentation", label: "Resource Augmentation" },
  { href: "/case-studies", label: "Case Studies" },
];

export function SiteHeader({ active }: { active: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMoreActive =
    active === "More" ||
    active === "Resource Augmentation" ||
    active === "Case Studies";

  return (
    <header className="relative z-20 mb-14">
      {/* ── Desktop bar ── */}
      <div className="hidden items-center justify-between md:flex">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="/transparent-bg-black.png"
            alt="Savv Pro logo"
            className="h-[38px] w-auto"
          />
        </Link>

        {/* Nav links */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-[20px] border border-[#1f2327]/10 bg-white/70 px-3 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-md"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.label === active
                  ? "rounded-[12px] bg-[#1f2327] px-4 py-1.5 text-[13px] font-medium text-white transition-colors"
                  : "rounded-[12px] px-4 py-1.5 text-[13px] text-[#1f2327]/70 transition-colors hover:bg-[#1f2327]/6 hover:text-[#1f2327]"
              }
            >
              {item.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={
                isMoreActive
                  ? "inline-flex cursor-pointer items-center gap-1 rounded-[12px] bg-[#1f2327] px-4 py-1.5 text-[13px] font-medium text-white transition-colors"
                  : "inline-flex cursor-pointer items-center gap-1 rounded-[12px] px-4 py-1.5 text-[13px] text-[#1f2327]/70 transition-colors hover:bg-[#1f2327]/6 hover:text-[#1f2327]"
              }
              aria-haspopup="menu"
              aria-expanded="false"
            >
              More
              <svg
                className="size-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="invisible absolute right-0 top-[calc(100%+8px)] z-40 w-[220px] translate-y-2 rounded-[16px] border border-[#1f2327]/10 bg-[#0f1923] p-2 opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <ul role="menu" aria-label="More pages" className="space-y-0.5">
                {moreItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      role="menuitem"
                      className={
                        active === item.label
                          ? "flex items-center gap-2 rounded-[10px] bg-white/10 px-3 py-2 text-[13px] font-medium text-white"
                          : "flex items-center gap-2 rounded-[10px] px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                      }
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-[#8b71fe]/60" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* CTA */}
        <div className="shrink-0">
          <Link href="/contact" className="rounded-[24px] bg-[#1f2327] px-6 py-2.5 text-[13px] font-medium text-white shadow-[0_2px_12px_rgba(31,35,39,0.25)] transition-all duration-150 hover:bg-[#f97316] hover:shadow-[0_4px_20px_rgba(249,115,22,0.4)] [font-family:Poppins,sans-serif]">
            Book a Strategy Call
          </Link>
        </div>
      </div>

      {/* ── Mobile bar ── */}
      <div className="flex items-center justify-between md:hidden">
        <Link href="/">
          <img
            src="/transparent-bg-black.png"
            alt="Savv Pro logo"
            className="h-[32px] w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-[12px] border border-[#1f2327]/12 bg-white/70 text-[#1f2327]"
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <nav
          aria-label="Mobile primary"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-[20px] border border-[#1f2327]/10 bg-white/95 p-4 shadow-2xl backdrop-blur-md md:hidden"
        >
          <ul className="space-y-1">
            {[...navItems, ...moreItems].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    item.label === active
                      ? "block rounded-[12px] bg-[#1f2327] px-4 py-2.5 text-[14px] font-medium text-white"
                      : "block rounded-[12px] px-4 py-2.5 text-[14px] text-[#1f2327]/80 hover:bg-[#1f2327]/6"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-[#1f2327]/8 pt-4">
            <Link href="/contact" className="block w-full rounded-[14px] bg-[#1f2327] py-3 text-center text-[14px] font-medium text-white [font-family:Poppins,sans-serif]">
              Book a Strategy Call
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
