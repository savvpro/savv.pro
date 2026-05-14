import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--rule)] mt-24 sm:mt-32 relative z-[1]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start">
        <div>
          <Link
            href="/"
            className="text-ink hover:text-wine transition-colors block leading-none"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "-0.015em",
              lineHeight: 1,
            }}
          >
            savv<span className="text-wine">.</span>pro
          </Link>
          <p
            className="italic-serif text-ink mt-4"
            style={{ fontSize: "1.5rem", lineHeight: 1.15, maxWidth: "22ch" }}
          >
            Intelligence backbone for the agentic era.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <p className="tag-mono-muted col-span-2 mb-1">▸ Read</p>
          <Link href="/doctrines" className="text-ink hover:text-wine" style={linkStyle}>Doctrines</Link>
          <Link href="/partners" className="text-ink hover:text-wine" style={linkStyle}>Partners</Link>
          <Link href="/join" className="text-ink hover:text-wine" style={linkStyle}>Join</Link>
          <Link href="/" className="text-ink hover:text-wine" style={linkStyle}>Talk to agent</Link>
        </div>

        <div className="md:text-right">
          <p className="tag-mono-muted mb-3">▸ Signal</p>
          <p
            className="text-muted"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7 }}
          >
            github.com/savvpro<br />
            x.com/savvpro<br />
            savv.pro
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 py-5 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <p
            className="text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            SavvPro · {year} · stealth
          </p>
          <p
            className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.66rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            <span>▸ shortcuts</span>
            <span className="text-ink">⌘K</span>
            <span>search</span>
            <span className="text-muted">·</span>
            <span className="text-ink">?</span>
            <span>help</span>
            <span className="text-muted">·</span>
            <span className="text-ink">esc</span>
            <span>close</span>
          </p>
          <p
            className="text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Built without a management layer
          </p>
        </div>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  letterSpacing: "0.04em",
};
