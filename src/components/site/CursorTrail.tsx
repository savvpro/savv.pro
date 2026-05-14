"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 14;
const MIN_MOVE_PX = 6;
const THROTTLE_MS = 24;
const FADE_MS = 700;
const MAX_OPACITY = 0.45;

/**
 * Wine-ink breadcrumb that follows the cursor and fades. Suggests a pen
 * drawing on paper. Disabled on touch + reduced-motion users.
 */
export function CursorTrail() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastT = 0;
    let lastX = -200;
    let lastY = -200;
    let idx = 0;

    function onMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastT < THROTTLE_MS) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) < MIN_MOVE_PX) return;
      lastT = now;
      lastX = e.clientX;
      lastY = e.clientY;

      const el = dotsRef.current[idx];
      idx = (idx + 1) % TRAIL_COUNT;
      if (!el) return;

      el.style.transition = "none";
      el.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      el.style.opacity = String(MAX_OPACITY);

      // Force reflow then fade
      void el.offsetHeight;
      el.style.transition = `opacity ${FADE_MS}ms linear`;
      el.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: "multiply",
      }}
    >
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "var(--wine)",
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
