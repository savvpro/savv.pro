"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor accent — a small wine-ink crosshair that follows the pointer
 * and expands with a mono ENTER label when hovering interactive elements.
 * Hidden on touch devices.
 */
export function PointerFx() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [touch, setTouch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setTouch(true);
      return;
    }

    let raf = 0;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], .pill, .portal, .cursor-pointer, input, textarea"
      );
      const next = interactive?.getAttribute("data-cursor") ?? (interactive ? "enter" : "");
      if (next !== label) setLabel(next);
    };

    const tick = () => {
      tx += (x - tx) * 0.22;
      ty += (y - ty) * 0.22;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      if (labelRef.current) labelRef.current.style.transform = `translate3d(${tx + 14}px, ${ty + 14}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [label]);

  if (touch) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-fx-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "multiply",
        }}
      >
        <span
          style={{
            display: "block",
            width: 12,
            height: 12,
            border: `1.5px solid var(--wine)`,
            borderRadius: 9999,
            background: "transparent",
            opacity: label ? 1 : 0.7,
            transform: label ? "scale(1.6)" : "scale(1)",
            transition: "transform 180ms ease, opacity 180ms ease",
          }}
        />
      </div>
      <div
        ref={labelRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: label ? 1 : 0,
          transition: "opacity 220ms ease",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--wine)",
          background: "rgba(255, 248, 238, 0.85)",
          border: "1px solid rgba(158, 20, 80, 0.3)",
          padding: "3px 7px",
          whiteSpace: "nowrap",
        }}
      >
        ▸ {label}
      </div>
    </>
  );
}
