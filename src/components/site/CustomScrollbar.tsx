"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_HIDE_MS = 900;
const VIEWPORT_PAD_PX = 48; /* matches top-6 bottom-6 */
/** Keep thumb in the layout gutter (see root layout pr-*), not over content */
const SCROLLBAR_EDGE_INSET_PX = 6;

type Metrics = {
  showTrack: boolean;
  thumbH: number;
  thumbTop: number;
};

export function CustomScrollbar() {
  const [metrics, setMetrics] = useState<Metrics>({
    showTrack: false,
    thumbH: 0,
    thumbTop: 0,
  });
  const [visible, setVisible] = useState(false);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => {
      setVisible(false);
      idleRef.current = null;
    }, IDLE_HIDE_MS);
  }, []);

  const bumpVisible = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  const update = useCallback(() => {
    if (typeof window === "undefined") return;

    const root = document.scrollingElement ?? document.documentElement;
    const scrollHeight = root.scrollHeight;
    const clientHeight = root.clientHeight;
    const scrollTop = root.scrollTop;
    const scrollable = scrollHeight - clientHeight;

    if (scrollable <= 1) {
      setMetrics({ showTrack: false, thumbH: 0, thumbTop: 0 });
      return;
    }

    const trackH = Math.max(1, window.innerHeight - VIEWPORT_PAD_PX);
    const ratio = clientHeight / scrollHeight;
    const thumbH = Math.max(36, Math.round(ratio * trackH));
    const maxTop = Math.max(0, trackH - thumbH);
    const thumbTop = Math.round((scrollTop / scrollable) * maxTop);

    setMetrics({
      showTrack: true,
      thumbH,
      thumbTop: Math.min(thumbTop, maxTop),
    });
  }, []);

  useEffect(() => {
    update();

    const onScroll = () => {
      update();
      bumpVisible();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [update, bumpVisible]);

  if (!metrics.showTrack) return null;

  return (
    <div
      className={`pointer-events-none fixed top-6 bottom-6 z-[120] w-[5px] transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        right: `max(${SCROLLBAR_EDGE_INSET_PX}px, env(safe-area-inset-right, 0px))`,
      }}
      aria-hidden
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1f2327]/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
        <div
          className="absolute left-0 right-0 rounded-full bg-gradient-to-b from-[#6b4dff] via-[#5227ff] to-[#8b71fe] shadow-[0_2px_12px_rgba(82,39,255,0.45)] ring-1 ring-white/25 transition-[top,height] duration-100 ease-out"
          style={{
            height: metrics.thumbH,
            top: metrics.thumbTop,
          }}
        />
      </div>
    </div>
  );
}
