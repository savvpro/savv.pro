"use client";

import { useEffect, useState } from "react";

/**
 * Per-route entrance: each navigation triggers a brief crossfade plus a
 * wine signal line that sweeps across the top — gives the site a sense
 * of being a versioned publication, not a SPA.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"sweep" | "live">("sweep");

  useEffect(() => {
    const id = setTimeout(() => setPhase("live"), 360);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="route-sweep"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 60,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, transparent, var(--wine) 50%, transparent)",
          transform: phase === "sweep" ? "translateX(0)" : "translateX(120%)",
          transition: "transform 420ms cubic-bezier(.2,.7,.2,1)",
          opacity: phase === "sweep" ? 1 : 0,
        }}
      />
      <div
        style={{
          opacity: phase === "sweep" ? 0 : 1,
          transform: phase === "sweep" ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 280ms ease, transform 360ms cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {children}
      </div>
    </>
  );
}
