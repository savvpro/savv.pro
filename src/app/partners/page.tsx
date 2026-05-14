import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/site/ImageSlot";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "A SavvPro partner carries the client relationship in a defined market and is backed by the full intelligence infrastructure. Structural, not transactional.",
  alternates: { canonical: "/partners" },
};

const BRINGS = [
  {
    n: "01",
    title: "The Capabilities layer",
    serif: "production-grade processes",
    body: "Formally defined, measured, continuously improving Capabilities across AI automation, voice agents, chatbots, knowledge base configuration, content generation, and the infrastructure that connects them.",
  },
  {
    n: "02",
    title: "The platform infrastructure",
    serif: "BaseEcho · BaseWave · Pulse · Nexus",
    body: "BaseEcho, BaseWave, Business Pulse, and Nexus available as delivery infrastructure. Not procured separately — part of what the partnership provides.",
  },
  {
    n: "03",
    title: "The World Model",
    serif: "shared, growing, structural",
    body: "Vertical and market knowledge contributed by partners enriches the shared intelligence. The ecosystem returns richer Capabilities and more accurate delivery data.",
  },
  {
    n: "04",
    title: "The operating model itself",
    serif: "skills · capabilities · services",
    body: "Skills-to-Capabilities-to-Services, quality standards, decision-making frameworks. Partners who adopt these become more capable organizations in their own right.",
  },
];

const CRITERIA = [
  {
    n: "01",
    title: "Market clarity",
    body: "A defined market — geography, vertical, or client segment. Generalists dilute the concentration of vertical signal that drives Capability maturity.",
  },
  {
    n: "02",
    title: "Delivery integrity",
    body: "Commit to the Definition of Done, accurate delivery data, honest reporting of client signal. The World Model depends on the discipline of every actor who feeds it.",
  },
  {
    n: "03",
    title: "Operating-model alignment",
    body: "Think in Capabilities, not features. Value accuracy. Approach client relationships with honest communication.",
  },
  {
    n: "04",
    title: "Genuine reciprocity",
    body: "Two-directional in practice, not just in principle. Take Capability access; contribute delivery signal, market intelligence, and honest feedback.",
  },
];

const ECOSYSTEM = [
  {
    n: "01",
    name: "MoInc",
    region: "United States · Anchor",
    body: "Anchor go-to-market partner. Carries diversified vertical client engagements and deploys SavvPro's AI-native Capability layer. The primary US market surface during the current stealth phase.",
    image: {
      id: "ecosystem-moinc",
      prompt:
        "View from a corner office in a vintage Chicago skyscraper at dusk, the skyline below in warm amber and deep plum, painterly cinematic editorial, soul.imagine.art mood.",
    },
  },
  {
    n: "02",
    name: "Zovox",
    region: "zovox.ai · Tech partner",
    body: "Active technology and infrastructure partner. Joint Capability development and AI-native infrastructure deployments. As much a technical collaboration as a go-to-market partnership.",
    image: {
      id: "ecosystem-zovox",
      prompt:
        "Pristine industrial server room with one cabinet open and glowing amber from within, casting warm beams across the dark space, painterly editorial still life, soul.imagine.art mood.",
    },
  },
];

export default function PartnersPage() {
  return (
    <div>
      {/* Header */}
      <header className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-12 fade-up">
        <span className="tag-pill">▸ Partner ecosystem · Two-directional</span>
        <h1
          className="h-display mt-6"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)", maxWidth: "20ch" }}
        >
          We are the backbone.<br />
          The partner is the{" "}
          <span className="swoosh italic-serif" style={{ fontWeight: 400 }}>
            surface
          </span>
          .
        </h1>
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <p
            className="lg:col-span-7 text-ink-soft"
            style={{ fontSize: "1.06rem", lineHeight: 1.7 }}
          >
            A SavvPro partner is not a reseller, not a referral relationship, not a
            subcontractor. It is an organization that carries the client relationship in a
            defined market and is backed by SavvPro&apos;s full intelligence infrastructure.
          </p>
          <p
            className="lg:col-span-5 italic-serif text-wine border-l-2 lg:pl-5 pl-5"
            style={{ borderColor: "var(--wine)", fontSize: "1.3rem", lineHeight: 1.4 }}
          >
            The relationship is structural. The roles do not overlap.
          </p>
        </div>
      </header>

      {/* 16:9 hero capped to viewport */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 sm:pb-24 fade-up fade-up-1">
        <div
          className="mx-auto"
          style={{ maxWidth: "min(100%, calc(60vh * 16 / 9))" }}
        >
          <ImageSlot
            id="partners-hero"
            ratio="16/9"
            caption="Backbone meets surface."
            prompt="Architect's drafting table stretching wide, lit by tall window, deep wooden T-square, half-unrolled blueprint in cream and wine ink, brass compass, one burning candle beside an extinguished one. Painterly cinematic still life."
          />
        </div>
      </section>

      {/* What SavvPro brings — typographic 2x2 grid */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-20 fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-14 border-t border-[var(--rule)] pt-10">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What SavvPro{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              brings.
            </span>
          </h2>
          <span className="tag-mono-muted">04 layers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          {BRINGS.map((b) => (
            <div key={b.n} className="bg-[var(--paper)] p-8 md:p-10 hover:bg-[var(--surface)] transition-colors">
              <div className="flex items-baseline justify-between mb-5">
                <span className="numplate-big">{b.n}</span>
                <span className="tag-mono-muted">▸ Layer</span>
              </div>
              <h3
                className="h-display"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2rem)", letterSpacing: "-0.02em" }}
              >
                {b.title}
              </h3>
              <p
                className="italic-serif text-wine mt-2"
                style={{ fontSize: "1.05rem", lineHeight: 1.4 }}
              >
                {b.serif}
              </p>
              <p
                className="mt-5 text-ink-soft"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Criteria */}
      <section className="bg-[var(--paper-warm)] border-y border-[var(--rule)]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-24 fade-up">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Partner{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                criteria.
              </span>
            </h2>
            <span className="tag-mono-muted">selection is structural</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {CRITERIA.map((c) => (
              <div key={c.n} className="bg-[var(--paper)] p-7 md:p-10">
                <span className="numplate">{c.n} · Required</span>
                <h3
                  className="h-display mt-4"
                  style={{ fontSize: "1.55rem", letterSpacing: "-0.02em" }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-4 text-ink-soft"
                  style={{ fontSize: "0.99rem", lineHeight: 1.7 }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem — 2 cards keep their 4:5 images */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-16 sm:py-24 fade-up">
        <div className="border-t border-[var(--rule)] pt-10 mb-10">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            The current{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              ecosystem.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {ECOSYSTEM.map((e) => (
            <div key={e.n}>
              <ImageSlot
                id={e.image.id}
                ratio="4/5"
                caption={e.name.toLowerCase()}
                prompt={e.image.prompt}
              />
              <div className="mt-5">
                <span className="numplate">{e.n} · Founding</span>
                <h3
                  className="h-display mt-3"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.6rem)" }}
                >
                  {e.name}
                </h3>
                <p className="tag-mono mt-1">{e.region}</p>
                <p
                  className="mt-4 text-ink-soft"
                  style={{ fontSize: "1rem", lineHeight: 1.7 }}
                >
                  {e.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-24 sm:pb-32 fade-up">
        <div className="border border-[var(--rule)] bg-[var(--surface)] p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <span className="tag-mono">▸ How to engage</span>
            <h2
              className="h-display mt-4"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
            >
              There is no form.<br />
              There is{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                no pipeline.
              </span>
            </h2>
            <p
              className="mt-5 text-ink-soft max-w-[58ch]"
              style={{ fontSize: "1.02rem", lineHeight: 1.7 }}
            >
              Start the conversation at savv.pro. The agent will understand your context, explain
              how the partnership model works, and identify whether the fit makes sense before
              either party invests significant time.
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
