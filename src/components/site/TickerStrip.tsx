"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  "▸ savvpro · stealth phase v0.1",
  "04 doctrines published",
  "06 capabilities online",
  "02 anchor partners · MoInc · Zovox",
  "agent uptime 99.97%",
  "hierarchy layers 00",
  "delivery health: nominal",
  "last revised 2026·05·14",
  "built without a management layer",
];

export function TickerStrip() {
  const [tick, setTick] = useState(0);

  // Subtle pulse — every 4s flicker the lead diamond
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="border-b border-[var(--rule)] bg-[var(--paper-warm)] relative overflow-hidden"
      role="status"
      aria-label="Site status"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 h-7 flex items-center gap-4 overflow-hidden">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: "var(--wine)",
            opacity: tick % 2 === 0 ? 1 : 0.35,
            transition: "opacity 600ms ease",
          }}
        />
        <div className="ticker-track flex gap-8 whitespace-nowrap">
          {[...ITEMS, ...ITEMS].map((it, i) => (
            <span
              key={i}
              className="text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {it}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 60s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
