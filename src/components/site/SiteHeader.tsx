/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  active: string;
  mobileTheme?: "hero" | "surface";
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

export function SiteHeader({ active, mobileTheme = "surface" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMoreActive =
    active === "More" ||
    active === "Resource Augmentation" ||
    active === "Case Studies";
  const mobileButtonStyle =
    mobileTheme === "hero"
      ? {
          color: "#ffffff",
          background: mobileOpen ? "rgba(139,113,254,0.25)" : "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "none",
          backdropFilter: "none",
        }
      : {
          color: mobileOpen ? "#ffffff" : "#1f2327",
          background: mobileOpen ? "rgba(31,35,39,0.92)" : "rgba(255,255,255,0.86)",
          border: mobileOpen ? "1px solid rgba(31,35,39,0.92)" : "1px solid rgba(31,35,39,0.12)",
          boxShadow: mobileOpen ? "0 12px 30px rgba(31,35,39,0.22)" : "0 8px 24px rgba(31,35,39,0.08)",
          backdropFilter: "blur(12px)",
        };

  return (
    <header className="relative z-[60] mb-6 md:mb-14 w-full" style={{ maxWidth: "1300px", marginLeft: "auto", marginRight: "auto" }}>
      {/* ── Desktop bar ── */}
      <div className="hidden items-center justify-between md:flex">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="/transparent-bg-black.webp"
            alt="Savv Pro logo"
            className="h-[38px] w-auto"
          />
        </Link>

        {/* Nav links */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-[20px] border border-[#e2e4e7] bg-white px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
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
            src="/transparent-bg-black.webp"
            alt="Savv Pro logo"
            className="h-[32px] w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-[12px] outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#8b71fe]/60"
          style={mobileButtonStyle}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <nav
          aria-label="Mobile primary"
          className="absolute inset-x-0 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[24px] border border-white/10 md:hidden"
          style={{ background: "#0d1117", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,113,254,0.15)" }}
        >
          {/* Header accent bar */}
          <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #8b71fe, #a78bfa, #8b71fe)" }} />

          <ul className="p-3 pt-3">
            {[...navItems, ...moreItems].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    item.label === active
                      ? "flex items-center gap-3 rounded-[14px] px-4 py-3 text-[14px] font-semibold text-white transition-all duration-150"
                      : "flex items-center gap-3 rounded-[14px] px-4 py-3 text-[14px] font-medium text-white/60 transition-all duration-150 hover:bg-white/5 hover:text-white"
                  }
                  style={item.label === active ? { background: "rgba(139,113,254,0.18)", color: "#c4b5fd" } : {}}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: item.label === active ? "#8b71fe" : "rgba(255,255,255,0.2)" }}
                  />
                  {item.label}
                  {item.label === active && (
                    <span className="ml-auto text-[10px] font-medium tracking-wider uppercase" style={{ color: "#8b71fe" }}>
                      Active
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-3 pb-3 pt-1">
            <div className="mb-3 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-[16px] py-4 text-[14px] font-semibold text-white transition-all duration-200 [font-family:Poppins,sans-serif]"
              style={{ background: "linear-gradient(135deg, #8b71fe, #6d55e8)", boxShadow: "0 4px 20px rgba(139,113,254,0.4)" }}
            >
              Book a Strategy Call
              <svg viewBox="0 0 16 16" className="size-4" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
