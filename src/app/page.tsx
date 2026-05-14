import Link from "next/link";
import { AgentTerminal } from "@/components/site/AgentTerminal";
import { ImageSlot } from "@/components/site/ImageSlot";
import { PinnedManifesto } from "@/components/site/PinnedManifesto";
import { MacBookFrame } from "@/components/site/MacBookFrame";

const PORTALS = [
  {
    n: "01",
    eyebrow: "Read · 4 docs",
    title: "Doctrines",
    serif: "the principles",
    body:
      "Formal operating documents — not blog posts. Each is a precise, complete argument about how intelligence-driven organizations operate.",
    href: "/doctrines",
    cta: "Enter Doctrines",
  },
  {
    n: "02",
    eyebrow: "Partner · two-way",
    title: "Partners",
    serif: "the surface",
    body:
      "We are the intelligence backbone. The partner carries the relationship. Structural, two-directional, designed to compound.",
    href: "/partners",
    cta: "Enter Partners",
  },
  {
    n: "03",
    eyebrow: "Apply · self-select",
    title: "Join",
    serif: "the edge",
    body:
      "Remote-first. Resource-agnostic. Agent-first. No hierarchy. Read the page. If it still sounds right, start the conversation.",
    href: "/join",
    cta: "Enter Join",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 fade-up">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
          <span className="tag-pill">▸ Stealth · May 2026</span>
          <span className="tag-mono-muted">v0.1 — building publicly</span>
        </div>

        <h1
          className="h-display"
          style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)", maxWidth: "16ch" }}
        >
          An intelligence{" "}
          <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
            backbone
          </span>{" "}
          for the{" "}
          <span className="swoosh italic-serif" style={{ fontWeight: 400, fontStyle: "italic" }}>
            agentic era
          </span>
          <span className="text-wine">.</span>
        </h1>

        <div className="mt-7 sm:mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <p
            className="lg:col-span-7 text-ink-soft"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.18rem)", lineHeight: 1.65, maxWidth: "60ch" }}
          >
            SavvPro builds AI-native capabilities, platforms, and services for organizations
            navigating the transition into agentic operating models.{" "}
            <span className="italic-serif text-ink">
              The agent below is the fastest path in.
            </span>
          </p>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
            <a href="#agent" className="pill pill-wine">
              Talk to the agent
              <span className="arrow">↓</span>
            </a>
            <Link href="/doctrines" className="pill">
              Read the doctrines
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── HERO IMAGE — 16:9 capped to viewport ───── */}
      <section className="px-5 sm:px-8 md:px-12 pb-10 sm:pb-14 fade-up fade-up-1">
        <div
          className="mx-auto"
          style={{ maxWidth: "min(100%, calc(60vh * 16 / 9))" }}
        >
          <ImageSlot
            id="hero"
            ratio="16/9"
            caption="A backbone, lit from within."
            prompt="A translucent glowing organic skeletal structure suspended in mid-air inside a darkened studio — neither human nor machine — a delicate spine of carved bone-coloured glass with warm amber light pulsing softly from inside its core; floating handwritten technical schematics on parchment fragments around it."
          />
        </div>
      </section>

      {/* ───── STAT STRIP ───── */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-20 sm:pb-28 fade-up fade-up-2">
        <div className="border-t border-b border-[var(--rule)] py-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-2">
            <Stat label="Doctrines published" value="04" />
            <Stat label="Capabilities online" value="06" />
            <Stat label="Anchor partners" value="02" />
            <Stat label="Hierarchy layers" value="00" highlight />
            <Stat label="Region" value="GLOBAL" />
          </div>
        </div>
      </section>

      {/* ───── AGENT ───── */}
      <section
        id="agent"
        className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-20 sm:pb-28 fade-up"
        style={{ scrollMarginTop: "108px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 order-1 lg:order-1 lg:sticky lg:top-24">
            <span className="tag-mono">▸ 01 · Primary interface</span>
            <h2
              className="h-display mt-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Don&apos;t fill a form.<br />
              <span className="italic-serif" style={{ fontWeight: 400 }}>
                ask the agent.
              </span>
            </h2>
            <p className="mt-5 text-ink-soft" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              The agent is the front door. It is operated on the same BaseEcho capability we
              build for clients — so you experience the product before you partner with us.
            </p>
            <p
              className="mt-4 italic-serif text-ink"
              style={{ fontSize: "1.15rem", lineHeight: 1.45 }}
            >
              No tickets. No forms. No pipeline.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm">
              <Mini label="latency" value="< 2s" />
              <Mini label="hours" value="24/7" />
              <Mini label="scope" value="open" />
              <Mini label="memory" value="session" />
            </div>
          </div>

          <div className="lg:col-span-8 order-2 lg:order-2">
            <MacBookFrame>
              <AgentTerminal />
            </MacBookFrame>
            <p
              className="mt-4 text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              ▸ encrypted · base_echo://agent · transcripts route to partner intake
            </p>
          </div>
        </div>
      </section>

      {/* ───── MANIFESTO STRIP (pinned-scroll reveal) ───── */}
      <PinnedManifesto />

      {/* ───── PORTALS — typographic only ───── */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-20 sm:py-28 fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12 sm:mb-16">
          <div>
            <span className="tag-mono">▸ 03 · Three ways in</span>
            <h2
              className="h-display mt-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Or read{" "}
              <span className="italic-serif" style={{ fontWeight: 400 }}>
                instead.
              </span>
            </h2>
          </div>
          <p
            className="text-muted max-w-sm"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.04em", lineHeight: 1.55 }}
          >
            The same content lives in three rooms. Pick the entry that fits the conversation you
            want to start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          {PORTALS.map((p, i) => (
            <Link
              key={p.n}
              href={p.href}
              className="group block bg-[var(--paper)] hover:bg-[var(--surface)] transition-colors p-8 md:p-10 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="numplate-big">{p.n}</span>
                <span className="tag-mono-muted">{p.eyebrow}</span>
              </div>
              <h3
                className="h-display group-hover:text-wine transition-colors"
                style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.5rem)" }}
              >
                {p.title}
              </h3>
              <p
                className="italic-serif text-wine mt-2"
                style={{ fontSize: "1.15rem", lineHeight: 1.4 }}
              >
                {p.serif}
              </p>
              <p
                className="mt-5 text-ink-soft"
                style={{ fontSize: "0.98rem", lineHeight: 1.65 }}
              >
                {p.body}
              </p>
              <div
                className="mt-8 pt-5 border-t border-[var(--rule-soft)] flex items-center justify-between"
              >
                <span
                  className="text-wine group-hover:text-ink transition-colors inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {p.cta} →
                </span>
                <span className="tag-mono-muted">▸ /{p.title.toLowerCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── HONESTY — keeps 5:4 image ───── */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-20 sm:pb-28 fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ImageSlot
              id="honesty"
              ratio="5/4"
              caption="What we will not say."
              prompt="A vintage cast-iron typewriter on a worn oak desk, a single sheet rolled in halfway, the paper carrying the typed word NO repeated in a vertical column, slightly off-register, ink saturated."
            />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="tag-mono">▸ 04 · The contract</span>
            <h2
              className="h-display mt-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Things we{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                won&apos;t
              </span>{" "}
              tell you.
            </h2>
            <ul className="mt-6 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {[
                ["Client names or financials", "Not public. Ever."],
                ["Roadmap promises", "We build what real delivery demands. Not what hypothetical planning predicts."],
                ["Conference appearances", "We are not on a stage. We are on a build."],
                ["Hype about \"AI-powered\"", "Every shop says that. We measure capability maturity, not adjectives."],
              ].map(([k, v]) => (
                <li key={k} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6">
                  <p
                    className="sm:col-span-4 text-wine"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    ▸ {k}
                  </p>
                  <p
                    className="sm:col-span-8 italic-serif text-ink"
                    style={{ fontSize: "1.15rem", lineHeight: 1.4 }}
                  >
                    {v}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── CLOSING ───── */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-24 fade-up">
        <div className="border-t border-[var(--rule)] pt-12 text-center">
          <p
            className="italic-serif text-ink"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            The hierarchy will end.<br />
            The question is whether{" "}
            <span className="text-wine">you end it</span>,<br />
            or whether a competitor does.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#agent" className="pill pill-wine">
              Start the conversation
              <span className="arrow">↑</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className={highlight ? "text-wine" : "text-ink"}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
          letterSpacing: "0.04em",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
      <span
        className="text-muted"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--rule)] bg-[var(--surface)] px-3 py-2.5">
      <p
        className="text-muted"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <p
        className="text-ink mt-1"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        {value}
      </p>
    </div>
  );
}
