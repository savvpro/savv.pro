import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCTRINES, getDoctrine } from "@/lib/doctrines";
import { ImageSlot } from "@/components/site/ImageSlot";
import { ReadingProgress } from "@/components/site/ReadingProgress";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return DOCTRINES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDoctrine(slug);
  if (!d) return {};
  return {
    title: d.title,
    description: d.thesis,
    alternates: { canonical: `/doctrines/${d.slug}` },
  };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function DoctrinePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doctrine = getDoctrine(slug);
  if (!doctrine) notFound();

  const idx = DOCTRINES.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? DOCTRINES[idx - 1] : null;
  const next = idx < DOCTRINES.length - 1 ? DOCTRINES[idx + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doctrine.title,
    author: { "@type": "Organization", name: "SavvPro" },
    publisher: { "@type": "Organization", name: "SavvPro", url: "https://savv.pro" },
    datePublished: "2026-05-01",
    url: `https://savv.pro/doctrines/${doctrine.slug}`,
  };

  return (
    <article>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Title block */}
      <header className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pt-12 sm:pt-16 md:pt-24 pb-10 sm:pb-14 fade-up">
        <div className="flex items-center gap-4 flex-wrap mb-8">
          <Link
            href="/doctrines"
            className="text-muted hover:text-wine transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            ← All doctrines
          </Link>
          <span className="text-muted">·</span>
          <span className="tag-mono">Doctrine {doctrine.number}</span>
          <span
            className="text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            v{doctrine.version} · {doctrine.date}
          </span>
        </div>

        <span className="numplate-big">{doctrine.number}</span>
        <h1
          className="h-display mt-3"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", letterSpacing: "-0.035em", maxWidth: "18ch" }}
        >
          {doctrine.title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="italic-serif text-wine" style={{ fontWeight: 400 }}>
                {" "}{w}.
              </span>
            ) : (
              <span key={i}>{i === 0 ? "" : " "}{w}</span>
            )
          )}
        </h1>
        <p
          className="italic-serif text-ink-soft mt-7 max-w-[60ch]"
          style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)", lineHeight: 1.35 }}
        >
          {doctrine.tagline}
        </p>
      </header>

      {/* 16:9 hero capped to viewport */}
      <section className="px-5 sm:px-8 md:px-12 pb-14 sm:pb-20 fade-up fade-up-1">
        <div
          className="mx-auto"
          style={{ maxWidth: "min(100%, calc(60vh * 16 / 9))" }}
        >
          <ImageSlot
            id={`doctrine-${doctrine.number}`}
            ratio="16/9"
            caption={doctrine.tagline}
            prompt={doctrine.imagePrompt}
          />
        </div>
      </section>

      {/* Thesis */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-16 sm:pb-20 fade-up fade-up-2">
        <div className="border-y border-[var(--rule)] py-10 sm:py-14">
          <span className="tag-mono">▸ Thesis</span>
          <blockquote
            className="italic-serif text-ink mt-5 max-w-[60ch]"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              lineHeight: 1.3,
              borderLeft: "3px solid var(--wine)",
              paddingLeft: "1.5rem",
            }}
          >
            {doctrine.thesis}
          </blockquote>
        </div>
      </section>

      {/* Body sections */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-20">
        {doctrine.sections.map((section, sIdx) => (
          <section
            key={sIdx}
            className="py-10 sm:py-14 border-b border-[var(--rule-soft)] fade-up"
            style={{ animationDelay: `${sIdx * 50}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-3 lg:sticky lg:top-24">
                <span className="numplate">{String(sIdx + 1).padStart(2, "0")} · Section</span>
                <h2
                  className="h-display mt-3"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", letterSpacing: "-0.02em" }}
                >
                  {section.heading}
                </h2>
              </div>
              <div className="lg:col-span-9 prose-ink relative">
                {section.margin && (
                  <aside
                    aria-label="Margin note"
                    className="lg:absolute lg:-right-2 lg:translate-x-full lg:top-1 lg:max-w-[200px] mb-6 lg:mb-0 border-l-2 pl-4 lg:pl-3"
                    style={{ borderColor: "var(--wine)" }}
                  >
                    <span
                      className="text-wine"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      ▸ Marginalia
                    </span>
                    <p
                      className="italic-serif text-ink mt-2"
                      style={{ fontSize: "0.95rem", lineHeight: 1.45 }}
                    >
                      {section.margin}
                    </p>
                  </aside>
                )}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{renderInline(p)}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-14 sm:py-20 fade-up">
          <div className="border-t-2 border-wine pt-10 max-w-[60ch] mx-auto text-center">
            <span className="tag-mono">▸ Closing</span>
            <p
              className="italic-serif text-ink mt-5"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.3 }}
            >
              {doctrine.closing}
            </p>
            <p
              className="mt-8 text-muted"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              SavvPro Doctrine {doctrine.number} · Published {doctrine.date} · savv.pro
            </p>
          </div>
        </section>
      </div>

      {/* Prev / Next */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-12 pb-24 fade-up">
        <div className="border-t border-[var(--rule)] pt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)]">
          {prev ? (
            <Link
              href={`/doctrines/${prev.slug}`}
              className="bg-[var(--paper)] hover:bg-[var(--surface)] transition-colors p-6 md:p-8 group"
            >
              <span className="tag-mono-muted">← Previous · {prev.number}</span>
              <h3
                className="h-display mt-3 group-hover:text-wine transition-colors"
                style={{ fontSize: "1.4rem" }}
              >
                {prev.title}
              </h3>
            </Link>
          ) : (
            <div className="bg-[var(--paper)] p-6 md:p-8 opacity-50">
              <span className="tag-mono-muted">▸ First doctrine</span>
            </div>
          )}
          {next ? (
            <Link
              href={`/doctrines/${next.slug}`}
              className="bg-[var(--paper)] hover:bg-[var(--surface)] transition-colors p-6 md:p-8 group text-right"
            >
              <span className="tag-mono-muted">Next · {next.number} →</span>
              <h3
                className="h-display mt-3 group-hover:text-wine transition-colors"
                style={{ fontSize: "1.4rem" }}
              >
                {next.title}
              </h3>
            </Link>
          ) : (
            <div className="bg-[var(--paper)] p-6 md:p-8 opacity-50 text-right">
              <span className="tag-mono-muted">Last doctrine →</span>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
