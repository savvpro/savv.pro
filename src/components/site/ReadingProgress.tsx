"use client";

import { useEffect, useState } from "react";

/**
 * Wine-coloured progress bar fixed at the very top of the viewport, fills as
 * the reader scrolls through a long-form document. Mounted above the header.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const v = total > 0 ? window.scrollY / total : 0;
      setPct(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 70,
        pointerEvents: "none",
        background: "rgba(26, 14, 42, 0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct * 100}%`,
          background: "var(--wine)",
          transition: "width 80ms linear",
          boxShadow: "0 0 8px rgba(158, 20, 80, 0.5)",
        }}
      />
    </div>
  );
}
