"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { lead: string; emp: string; tail: string }[] = [
  { lead: "We build", emp: "capabilities", tail: ", not features." },
  { lead: "We operate", emp: "without a management layer", tail: "." },
  { lead: "We sell", emp: "through partners", tail: ", not through volume." },
];

const STAGE_THRESHOLDS = [0.12, 0.32, 0.55, 0.78];
// stages map: progress < t[0] → step 0 (intro)
//             t[0]..t[1]    → step 1 (line 1 visible)
//             t[1]..t[2]    → step 2 (line 2 visible)
//             t[2]..t[3]    → step 3 (line 3 visible)
//             >= t[3]       → step 4 (paragraph visible)

/**
 * The home page's defining moment.
 *
 * A 260vh section whose inner content sticks to the viewport for ~2.6 scroll
 * windows while three manifesto lines progressively reveal. On mobile and
 * reduced-motion users, falls back to a simple stacked block with all
 * lines visible immediately.
 */
export function PinnedManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWide = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduced && isWide);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    function update() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0));
      setProgress(p);
    }
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
  }, [enabled]);

  const stepsVisible = enabled
    ? STAGE_THRESHOLDS.filter((t) => progress >= t).length
    : 4;
  const linesVisible = Math.min(stepsVisible, LINES.length);
  const closingVisible = stepsVisible >= 4;

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--paper-warm)] border-y border-[var(--rule)] relative z-[1]"
      style={enabled ? { height: "260vh" } : undefined}
    >
      <div
        className={`mx-auto max-w-[1280px] w-full px-5 sm:px-8 md:px-12 ${
          enabled ? "h-screen sticky top-0 flex items-center" : "py-16 sm:py-24"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
          <div className="lg:col-span-3">
            <span className="tag-mono">▸ 02 · What we are</span>
            {enabled && (
              <>
                <p
                  className="text-muted mt-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  keep scrolling ↓
                </p>
                <div className="flex items-center gap-1.5 mt-5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 2,
                        background: linesVisible > i ? "var(--wine)" : "rgba(26,14,42,0.18)",
                        transition: "background 280ms cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                  ))}
                  <span
                    className="text-muted ml-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {linesVisible}/3
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-9">
            <div
              className="h-display"
              style={{ fontSize: "clamp(1.7rem, 3.6vw, 3rem)", letterSpacing: "-0.025em", lineHeight: 1.18 }}
            >
              {LINES.map((line, i) => {
                const visible = linesVisible > i;
                return (
                  <div
                    key={i}
                    style={{
                      opacity: visible ? 1 : 0.08,
                      transform: visible ? "translateY(0)" : "translateY(14px)",
                      transition: "opacity 520ms cubic-bezier(.2,.7,.2,1), transform 520ms cubic-bezier(.2,.7,.2,1)",
                      marginBottom: "0.12em",
                    }}
                  >
                    {line.lead}{" "}
                    <span
                      className="italic-serif text-wine"
                      style={{ fontWeight: 400 }}
                    >
                      {line.emp}
                    </span>
                    {line.tail}
                  </div>
                );
              })}
            </div>

            <p
              className="mt-8 text-ink-soft max-w-[64ch]"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                opacity: closingVisible ? 1 : 0,
                transform: closingVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 520ms ease, transform 520ms ease",
              }}
            >
              Three architectural decisions that determine everything else. The hierarchy was a
              workaround for a problem that no longer exists. Features do not compound;
              capabilities do. Reach is bought through partners that hold trust we cannot
              manufacture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
