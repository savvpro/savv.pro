import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "System View",
  description: "A demonstration view of how SavvPro operates on an explicit World Model.",
  alternates: { canonical: "/system" },
  robots: { index: false, follow: false },
};

type Trend = "up" | "flat" | "down";

const CAPABILITIES: { name: string; tag: string; maturity: number; trend: Trend; owner: string }[] = [
  { name: "Voice Agent Development & Deployment", tag: "VAD-01", maturity: 0.65, trend: "up", owner: "BaseEcho" },
  { name: "Chatbot Development & Deployment", tag: "CBD-01", maturity: 0.58, trend: "up", owner: "BaseEcho" },
  { name: "Knowledge Base Configuration", tag: "KBC-01", maturity: 0.41, trend: "up", owner: "BaseEcho" },
  { name: "Workflow Automation", tag: "WFA-01", maturity: 0.52, trend: "flat", owner: "Nexus" },
  { name: "Content Generation", tag: "CGN-01", maturity: 0.38, trend: "up", owner: "BaseWave" },
  { name: "Digital Marketing Automation", tag: "DMA-01", maturity: 0.34, trend: "up", owner: "BaseWave" },
];

const WORLD_MODEL_LAYERS: { name: string; tag: string; completeness: number; lastUpdate: string }[] = [
  { name: "Skills & People", tag: "SP", completeness: 0.72, lastUpdate: "2026·05·14 16:42" },
  { name: "Capabilities Registry", tag: "CR", completeness: 0.55, lastUpdate: "2026·05·14 11:08" },
  { name: "Client & Relationship", tag: "CL", completeness: 0.31, lastUpdate: "2026·05·13 21:30" },
  { name: "Financial & Performance", tag: "FP", completeness: 0.40, lastUpdate: "2026·05·13 09:14" },
];

const ECOSYSTEM: { name: string; region: string; role: string; engagement: number; status: string }[] = [
  { name: "MoInc", region: "United States", role: "Anchor · Go-to-market", engagement: 0.78, status: "active" },
  { name: "Zovox", region: "zovox.ai", role: "Technology · Infrastructure", engagement: 0.64, status: "active" },
];

const RECENT: [string, string, string][] = [
  ["2026·05·14 16:42", "doctrine", "doctrine-02 §3 refined · margin note added"],
  ["2026·05·14 11:08", "capability", "voice-agent v0.4 → v0.5 · quality history updated"],
  ["2026·05·13 21:30", "partner", "partner inquiry routed · intake assigned"],
  ["2026·05·13 09:14", "world-model", "snapshot · 53,412 events ingested"],
  ["2026·05·12 18:22", "doctrine", "doctrine-04 published to /doctrines/partner-doctrine"],
  ["2026·05·12 14:55", "capability", "knowledge-base-config · cost profile updated"],
  ["2026·05·11 22:17", "session", "intake completed · 1 new contact linked"],
  ["2026·05·11 16:08", "partner", "zovox · voice agent infra spec ratified"],
  ["2026·05·10 13:40", "agent", "agent.savv.pro · system prompt v1.0 deployed"],
  ["2026·05·09 09:02", "doctrine", "doctrine-03 closing line revised"],
];

function trendGlyph(t: Trend) {
  if (t === "up") return "▲";
  if (t === "down") return "▼";
  return "≡";
}
function trendColour(t: Trend) {
  if (t === "up") return "var(--moss)";
  if (t === "down") return "var(--wine)";
  return "var(--muted)";
}

function Bar({ value, color = "var(--wine)" }: { value: number; color?: string }) {
  const pct = Math.min(1, Math.max(0, value));
  return (
    <div style={{ position: "relative", height: 6, background: "rgba(26,14,42,0.07)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${pct * 100}%`,
          background: color,
          transition: "width 600ms cubic-bezier(.2,.7,.2,1)",
        }}
      />
    </div>
  );
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default function SystemPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12">
      {/* Header */}
      <header className="pt-12 sm:pt-16 md:pt-24 pb-10 fade-up">
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span className="tag-pill">▸ /system · synthetic snapshot</span>
          <span className="tag-mono-muted">noindex · public demonstration</span>
        </div>
        <h1
          className="h-display"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", maxWidth: "22ch" }}
        >
          The model,{" "}
          <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
            watching itself
          </span>
          .
        </h1>
        <p
          className="mt-7 text-ink-soft max-w-[60ch]"
          style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
        >
          A demonstration view of how SavvPro operates on an explicit World Model. The full system
          is internal; this snapshot is{" "}
          <span className="italic-serif text-ink">synthetic</span>
          {" "}and shapes the public surface of what we measure.
        </p>
        <p
          className="mt-4 text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          ▸ See also · <Link href="/doctrines/world-model-imperative" className="text-wine hover:underline">Doctrine 03 · The World Model Imperative</Link>
        </p>
      </header>

      {/* Headline metrics */}
      <section className="border-t border-[var(--rule)] py-8 fade-up fade-up-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          <Metric label="Capabilities tracked" value="06" hint="01 in formal review" />
          <Metric label="Avg maturity" value="0.48" hint="trend ↑" />
          <Metric label="Doctrines published" value="04" hint="01 drafting" />
          <Metric label="Partners active" value="02" hint="MoInc · Zovox" />
        </div>
      </section>

      {/* Capability Maturity */}
      <section className="pt-14 pb-12 fade-up fade-up-2">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
          >
            Capability{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              maturity
            </span>
            .
          </h2>
          <span className="tag-mono-muted">06 capabilities · last refresh 16:42</span>
        </div>

        <div className="border border-[var(--rule)]">
          {/* head row */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-[var(--rule)] bg-[var(--paper-warm)]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <div className="col-span-1">tag</div>
            <div className="col-span-5">capability</div>
            <div className="col-span-3">maturity</div>
            <div className="col-span-1">trend</div>
            <div className="col-span-2">platform</div>
          </div>
          {CAPABILITIES.map((c) => (
            <div
              key={c.tag}
              className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-center px-5 py-4 border-b border-[var(--rule-soft)] last:border-b-0 hover:bg-[var(--surface)]"
            >
              <div
                className="col-span-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "var(--wine)",
                }}
              >
                {c.tag}
              </div>
              <div className="col-span-2 md:col-span-5 text-ink" style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 500 }}>
                {c.name}
              </div>
              <div className="col-span-2 md:col-span-3 flex items-center gap-3">
                <div className="flex-1"><Bar value={c.maturity} /></div>
                <span
                  className="text-ink"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", minWidth: 38, textAlign: "right" }}
                >
                  {pct(c.maturity)}
                </span>
              </div>
              <div
                className="col-span-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: trendColour(c.trend),
                }}
              >
                {trendGlyph(c.trend)}
              </div>
              <div
                className="col-span-1 md:col-span-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                {c.owner}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* World Model + Partner Ecosystem */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 fade-up">
        {/* World Model Layers */}
        <div className="lg:col-span-7">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <h2
              className="h-display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              World model{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                layers
              </span>
              .
            </h2>
            <span className="tag-mono-muted">04 of 04</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
            {WORLD_MODEL_LAYERS.map((l) => (
              <div key={l.tag} className="bg-[var(--paper)] p-5">
                <div className="flex items-baseline justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--wine)",
                      fontWeight: 600,
                    }}
                  >
                    LAYER · {l.tag}
                  </span>
                  <span
                    className="text-ink"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    {pct(l.completeness)}
                  </span>
                </div>
                <h3 className="text-ink mt-2" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.05rem" }}>
                  {l.name}
                </h3>
                <div className="mt-3">
                  <Bar value={l.completeness} />
                </div>
                <p
                  className="text-muted mt-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  updated · {l.lastUpdate}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Engagement */}
        <div className="lg:col-span-5">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <h2
              className="h-display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Partner{" "}
              <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                engagement
              </span>
              .
            </h2>
            <span className="tag-mono-muted">02 anchor</span>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--paper)]">
            {ECOSYSTEM.map((e, i) => (
              <div
                key={e.name}
                className={`p-5 ${i < ECOSYSTEM.length - 1 ? "border-b border-[var(--rule-soft)]" : ""}`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-ink" style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.3rem" }}>
                    {e.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: e.status === "active" ? "var(--moss)" : "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    ● {e.status}
                  </span>
                </div>
                <p
                  className="text-muted mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {e.region} · {e.role}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1"><Bar value={e.engagement} /></div>
                  <span
                    className="text-ink"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600 }}
                  >
                    {pct(e.engagement)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section className="pb-14 fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <h2
            className="h-display"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Recent{" "}
            <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
              activity
            </span>
            .
          </h2>
          <span className="tag-mono-muted">10 events · auto-stream</span>
        </div>
        <div
          className="border border-[var(--rule)] bg-[var(--paper-warm)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {RECENT.map(([when, kind, text], i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-[var(--rule-soft)] last:border-b-0"
              style={{ fontSize: "0.78rem" }}
            >
              <div
                className="col-span-12 sm:col-span-3 text-muted"
                style={{ letterSpacing: "0.08em" }}
              >
                {when}
              </div>
              <div
                className="col-span-3 sm:col-span-2 text-wine"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                ▸ {kind}
              </div>
              <div className="col-span-9 sm:col-span-7 text-ink" style={{ alignSelf: "center" }}>
                {text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer disclaimer */}
      <section className="pb-24 fade-up">
        <div className="border-t border-[var(--rule)] pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <p
            className="italic-serif text-ink"
            style={{ fontSize: "1.25rem", lineHeight: 1.4, maxWidth: "48ch" }}
          >
            This view is synthetic. The real World Model is internal. The published Doctrines remain the canonical public position.
          </p>
          <div className="md:text-right">
            <Link href="/doctrines/world-model-imperative" className="pill pill-wine">
              Read Doctrine 03
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-[var(--paper)] p-5">
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
        className="text-ink mt-2"
        style={{ fontFamily: "var(--font-mono)", fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      {hint && (
        <p
          className="text-muted mt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
