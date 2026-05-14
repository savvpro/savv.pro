"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Distance in px at which the element starts reacting to the cursor. */
  radius?: number;
  /** Maximum px the element can drift away from rest position. */
  strength?: number;
};

/**
 * A link that becomes "cursor-shy": as the pointer approaches, the element
 * drifts AWAY from it, with smooth easing. Hit area follows the visible
 * position so the link is still clickable — just a little playful. On
 * touch devices and reduced-motion users, behaves like a normal Link.
 */
export function MagneticLink({
  href,
  children,
  className,
  style,
  onClick,
  radius = 110,
  strength = 18,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const d = Math.hypot(dx, dy);
      if (d < radius) {
        const t = 1 - d / radius;
        // ease for nicer curve
        const eased = t * t;
        const nx = dx / (d || 1);
        const ny = dy / (d || 1);
        targetRef.current.x = nx * eased * strength;
        targetRef.current.y = ny * eased * strength;
      } else {
        targetRef.current.x = 0;
        targetRef.current.y = 0;
      }
    }

    function tick() {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * 0.22;
      cur.y += (tgt.y - cur.y) * 0.22;
      if (el) el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
      if (el) el.style.transform = "";
    };
  }, [enabled, radius, strength]);

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      style={{ display: "inline-block", willChange: "transform", ...style }}
    >
      {children}
    </Link>
  );
}
