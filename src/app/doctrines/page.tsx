import type { Metadata } from "next";
import { DOCTRINES } from "@/lib/doctrines";
import { ImageSlot } from "@/components/site/ImageSlot";
import { TransitionLink } from "@/components/site/TransitionLink";

export const metadata: Metadata = {
  title: "Doctrines",
  description:
    "Published operating principles. Formal documents derived from how SavvPro is built and why.",
  alternates: { canonical: "/doctrines" },
};

export default function DoctrinesIndexPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12">
      {/* Header */}
      <header className="pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 fade-up">
        <span className="tag-pill">▸ Published doctrines · 04</span>
        <h1
          className="h-display mt-6"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)" }}
        >
          The operating principles.<br />
          <span className="italic-serif text-wine" style={{ fontWeight: 400 }}>
            Published, not pitched.
          </span>
        </h1>
        <p
          className="mt-7 text-ink-soft max-w-[68ch]"
          style={{ fontSize: "1.06rem", lineHeight: 1.7 }}
        >
          SavvPro publishes formal operating principle documents — not blog posts, not thought
          leadership. Each Doctrine is a precise, complete argument about how intelligence-driven
          organizations operate.{" "}
          <span className="italic-serif text-ink">They are derived from the Core Truth.</span>
        </p>
      </header>

      {/* Stacked widescreen cards */}
      <section className="pb-24 sm:pb-32">
        <div className="border-t border-[var(--rule)]">
          {DOCTRINES.map((d, i) => (
            <TransitionLink
              key={d.slug}
              href={`/doctrines/${d.slug}`}
              className="group block border-b border-[var(--rule)] py-12 sm:py-16 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Title row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-8">
                <div className="lg:col-span-2 flex items-baseline gap-3">
                  <span
                    className="numplate-big"
                    style={{ viewTransitionName: `doctrine-${d.number}-num` }}
                  >
                    {d.number}
                  </span>
                </div>
                <div className="lg:col-span-7">
                  <span className="tag-mono">▸ Doctrine</span>
                  <h2
                    className="h-display group-hover:text-wine transition-colors mt-3"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                      letterSpacing: "-0.03em",
                      viewTransitionName: `doctrine-${d.number}-title`,
                    }}
                  >
                    {d.title.split(" ").map((w, k, arr) =>
                      k === arr.length - 1 ? (
                        <span key={k} className="italic-serif" style={{ fontWeight: 400 }}>
                          {" "}{w}
                        </span>
                      ) : (
                        <span key={k}>{k === 0 ? "" : " "}{w}</span>
                      )
                    )}
                  </h2>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <span
                    className="inline-flex items-center gap-2 text-wine group-hover:gap-3 transition-all"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Read Doctrine {d.number} →
                  </span>
                </div>
              </div>

              {/* 16:9 image — capped to viewport */}
              <div
                className="mx-auto"
                style={{
                  maxWidth: "min(100%, calc(58vh * 16 / 9))",
                  viewTransitionName: `doctrine-${d.number}-hero`,
                }}
              >
                <ImageSlot
                  id={`doctrine-${d.number}`}
                  ratio="16/9"
                  caption={d.tagline}
                  prompt={d.imagePrompt}
                />
              </div>

              {/* Thesis + tagline below */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-2"></div>
                <div className="lg:col-span-7">
                  <p
                    className="text-ink-soft max-w-[60ch]"
                    style={{ fontSize: "1.02rem", lineHeight: 1.7 }}
                  >
                    {d.thesis}
                  </p>
                </div>
                <div className="lg:col-span-3 border-l-2 lg:pl-5" style={{ borderColor: "var(--wine)" }}>
                  <p
                    className="italic-serif text-wine"
                    style={{ fontSize: "1.15rem", lineHeight: 1.4 }}
                  >
                    {d.tagline}
                  </p>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}
