import Link from "next/link";

const BOOT_LINES = [
  "▸ savvpro://terminal · query failed",
  "[err] no record found · path unknown",
  "[ok]  recovery options available",
];

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-5 sm:px-8 md:px-12 py-20"
      style={{ background: "#0a0e0a", color: "#3fff6a" }}
    >
      <div
        className="max-w-[720px] w-full"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <div
          className="border border-[rgba(63,255,106,0.25)]"
          style={{
            background: "#080b08",
            boxShadow: "0 0 0 1px rgba(63,255,106,0.18), inset 0 0 80px rgba(0,0,0,0.6)",
          }}
        >
          <div className="flex items-center gap-2 border-b border-[rgba(63,255,106,0.18)] px-4 py-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#ff5050" }} />
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#ffb400" }} />
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#3fff6a" }} />
            <span
              className="ml-3"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1f7a3f",
              }}
            >
              error · 404 · void
            </span>
          </div>

          <div className="px-5 sm:px-7 py-6 sm:py-7" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
            {BOOT_LINES.map((l, i) => (
              <p
                key={i}
                style={{ color: i === 1 ? "#ff5050" : i === 2 ? "#3fff6a" : "#1f7a3f", marginBottom: 6 }}
              >
                {l}
              </p>
            ))}

            <div className="mt-6 pt-5 border-t border-[rgba(63,255,106,0.18)]">
              <p style={{ color: "#ffb400", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
                ▸ doctrine fragment
              </p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                  lineHeight: 1.3,
                  color: "#e5fff0",
                }}
              >
                The page you requested has no record in our model.
                <br />
                Either it was never published, or it was retired without an alias.
              </p>
            </div>

            <div className="mt-7">
              <p style={{ color: "#1f7a3f", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                ▸ choose a known path
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline" style={{ color: "#3fff6a" }}>
                    cd ~/ &nbsp;→ home
                  </Link>
                </li>
                <li>
                  <Link href="/doctrines" className="hover:underline" style={{ color: "#3fff6a" }}>
                    cat /doctrines &nbsp;→ the published principles
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:underline" style={{ color: "#3fff6a" }}>
                    cd /partners &nbsp;→ ecosystem
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:underline" style={{ color: "#3fff6a" }}>
                    cd /join &nbsp;→ contributor pathway
                  </Link>
                </li>
              </ul>
            </div>

            <p
              className="mt-8 pt-5 border-t border-[rgba(63,255,106,0.18)]"
              style={{ color: "#1f7a3f", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              savv-os · session terminated · respawning at /
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
