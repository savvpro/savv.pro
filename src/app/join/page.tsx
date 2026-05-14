import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/site/ImageSlot";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Remote-first. Resource-agnostic. Agent-first. No hierarchy. SavvPro looks for Truth Signal Quality, Integrity Under Pressure, Learning Velocity.",
  alternates: { canonical: "/join" },
};

const HOW = [
  {
    n: "01",
    title: "Remote-first",
    body: "Distributed by default. Performance is measured in contribution and quality, not hours or office presence.",
  },
  {
    n: "02",
    title: "Resource-agnostic",
    body: "The work is composed from Capabilities, not from who is on which team. Any contributor — human or AI agent — with the required skills executes.",
  },
  {
    n: "03",
    title: "Agent-first",
    body: "AI tools are core to the work, not an experiment. You use them daily, you build with them, you operate alongside them.",
  },
  {
    n: "04",
    title: "No hierarchy",
    body: "Three roles only: Individual Contributor, Directly Responsible Individual, Player-Coach. Accountability without administrative layers.",
  },
];

const TRAITS = [
  {
    n: "01",
    title: "Truth Signal Quality",
    serif: "report what is true.",
    body: "You report what is actually happening, not what is comfortable. Your delivery data is accurate. Your status is honest. The World Model depends on this.",
    counter: "Not a fit if your default move is to round the estimate or omit the uncomfortable signal.",
  },
  {
    n: "02",
    title: "Integrity Under Pressure",
    serif: "the discipline holds.",
    body: "When the work is hard, the commitments hold. When something goes wrong, you flag it early. The discipline does not wobble when no one is watching.",
    counter: "Not a fit if pressure changes what you say is true.",
  },
  {
    n: "03",
    title: "Learning Velocity",
    serif: "compound the signal.",
    body: "You convert real-world signal into improved capability faster than the room average. You read the doctrine and update your operating model the same week.",
    counter: "Not a fit if you need a six-month ramp to feel competent.",
  },
];

const PATHWAY = [
  { n: "01", label: "Conversation with the agent" },
  { n: "02", label: "CV screening" },
  { n: "03", label: "Assessment" },
  { n: "04", label: "Interview stages" },
  { n: "05", label: "Offer" },
];

export default function JoinPage() {
  return (
    <div>
      {/* Header */}
      <header className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-12 fade-up">
        <span className="tag-pill">▸ Contributor pathway · Self-select</span>
        <h1
          className="h-display mt-6"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)", maxWidth: "20ch" }}
        >
          Read this.<br />
          If it still sounds right,<br />
          <span className="swoosh italic-serif" style={{ fontWeight: 400 }}>
            start the conversation
          </span>
          <span className="text-wine">.</span>
        </h1>
        <p
          className="mt-7 text-ink-soft max-w-[64ch]"
          style={{ fontSize: "1.06rem", lineHeight: 1.7 }}
        >
          This page self-selects. The people who read it and still want to apply are exactly
          the people we want. We are not measuring credentials. We are measuring{" "}
          <span className="italic-serif text-ink">the signal you give off</span>{" "}
          and the discipline you bring.
        </p>
      </header>

      {/* 16:9 hero capped to viewport */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 sm:pb-24 fade-up fade-up-1">
        <div
          className="mx-auto"
          style={{ maxWidth: "min(100%, calc(60vh * 16 / 9))" }}
        >
          <ImageSlot
            id="join-hero"
            ratio="16/9"
            caption="The signal, lit."
            prompt="A long slab of white marble across a workshop bench, a mason's chisel beside one perfect fresh rectangular cut, warm amber light from above, stone dust drifting, deep plum shadows."
          />
        </div>
      </section>

      {/* How SavvPro is built */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-20 fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 border-t border-[var(--rule)] pt-10">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            How SavvPro{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              is built.
            </span>
          </h2>
          <span className="tag-mono-muted">the truth, stated directly</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          {HOW.map((h) => (
            <div key={h.n} className="bg-[var(--paper)] p-7 md:p-10">
              <span className="numplate">{h.n}</span>
              <h3
                className="h-display mt-4"
                style={{ fontSize: "1.55rem", letterSpacing: "-0.02em" }}
              >
                {h.title}
              </h3>
              <p
                className="mt-4 text-ink-soft"
                style={{ fontSize: "0.99rem", lineHeight: 1.7 }}
              >
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Traits — typographic alternating with wine "Not a fit if" block */}
      <section className="bg-[var(--paper-warm)] border-y border-[var(--rule)]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12 fade-up">
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              What we{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                look for.
              </span>
            </h2>
            <span className="tag-mono-muted">Tier 1 · Non-negotiable</span>
          </div>

          <div className="border-t border-[var(--rule)]">
            {TRAITS.map((t) => (
              <div
                key={t.n}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 sm:py-14 border-b border-[var(--rule)] fade-up"
              >
                <div className="lg:col-span-2">
                  <span className="numplate-big">{t.n}</span>
                </div>
                <div className="lg:col-span-6">
                  <h3
                    className="h-display"
                    style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)", letterSpacing: "-0.025em" }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="italic-serif text-wine mt-2"
                    style={{ fontSize: "1.15rem", lineHeight: 1.4 }}
                  >
                    {t.serif}
                  </p>
                  <p
                    className="mt-5 text-ink-soft"
                    style={{ fontSize: "1.02rem", lineHeight: 1.7 }}
                  >
                    {t.body}
                  </p>
                </div>
                <div
                  className="lg:col-span-4 border-l-2 pl-5"
                  style={{ borderColor: "var(--wine)" }}
                >
                  <span
                    className="text-wine"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    ▸ Not a fit if
                  </span>
                  <p
                    className="italic-serif text-ink mt-3"
                    style={{ fontSize: "1.2rem", lineHeight: 1.45 }}
                  >
                    {t.counter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-24 fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 border-t border-[var(--rule)] pt-10">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            The{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              pathway.
            </span>
          </h2>
          <span className="tag-mono-muted">no surprises</span>
        </div>
        <ol className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          {PATHWAY.map((p) => (
            <li key={p.n} className="bg-[var(--paper)] p-5 md:p-7">
              <span className="numplate">{p.n}</span>
              <p
                className="h-display mt-3"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.01em", lineHeight: 1.25 }}
              >
                {p.label}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Honest expectations CTA */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-24 sm:pb-32 fade-up">
        <div className="border border-[var(--rule)] bg-[var(--surface)] p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <span className="tag-mono">▸ Honest expectations</span>
            <h2
              className="h-display mt-4"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
            >
              Remote-first means{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                you
              </span>{" "}
              are responsible for your structure.
            </h2>
            <p
              className="mt-5 text-ink-soft max-w-[58ch]"
              style={{ fontSize: "1.02rem", lineHeight: 1.7 }}
            >
              Agentic-era means you use AI tools as a core part of your work, not as an
              experiment. Performance is measured in contribution and quality, not hours.{" "}
              <span className="italic-serif text-ink">If that sounds right, start the conversation.</span>
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/#agent" className="pill pill-wine">
              Talk to the agent
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
