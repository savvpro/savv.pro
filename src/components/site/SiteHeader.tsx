"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticLink } from "./MagneticLink";

const NAV = [
  { label: "Doctrines", href: "/doctrines" },
  { label: "Partners", href: "/partners" },
  { label: "Join", href: "/join" },
];

function openPalette() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("savv:open-palette"));
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setMac(/Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[rgba(242,235,222,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8 md:px-12">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-ink hover:text-wine transition-colors leading-none"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.65rem",
            fontWeight: 400,
            letterSpacing: "-0.015em",
            lineHeight: 1,
          }}
        >
          savv<span className="text-wine">.</span>pro
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <MagneticLink
              key={item.href}
              href={item.href}
              className="text-ink hover:text-wine transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              radius={120}
              strength={18}
            >
              {item.label}
            </MagneticLink>
          ))}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="cmdk-chip group inline-flex items-center gap-2 hover:text-wine transition-colors text-ink"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <kbd
              aria-hidden
              className="group-hover:border-[var(--wine)] group-hover:text-wine"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 22,
                height: 22,
                padding: "0 5px",
                border: "1px solid var(--rule)",
                borderBottomWidth: 2,
                borderRadius: 4,
                background: "var(--surface)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "inherit",
                lineHeight: 1,
                boxShadow: "0 1px 0 rgba(26,14,42,0.05)",
                transition: "border-color 160ms ease, color 160ms ease",
              }}
            >
              {mac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd
              aria-hidden
              className="group-hover:border-[var(--wine)] group-hover:text-wine"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 22,
                height: 22,
                padding: "0 5px",
                border: "1px solid var(--rule)",
                borderBottomWidth: 2,
                borderRadius: 4,
                background: "var(--surface)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "inherit",
                lineHeight: 1,
                boxShadow: "0 1px 0 rgba(26,14,42,0.05)",
                transition: "border-color 160ms ease, color 160ms ease",
              }}
            >
              K
            </kbd>
            <span className="text-muted ml-0.5" aria-hidden>search</span>
          </button>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-wine"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--rule)] bg-[var(--paper)]">
          <nav className="flex flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-ink hover:text-wine border-b border-[var(--rule-soft)] last:border-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="py-3 text-left text-wine"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              ▸ Search · {mac ? "⌘" : "Ctrl"}+K
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
