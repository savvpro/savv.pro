import { ImageResponse } from "next/og";
import { getDoctrine, DOCTRINES } from "@/lib/doctrines";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "SavvPro Doctrine";

export async function generateStaticParams() {
  return DOCTRINES.map((d) => ({ slug: d.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDoctrine(slug);
  if (!d) {
    return new ImageResponse(
      (<div style={{ width: "100%", height: "100%", background: "#F2EBDE", display: "flex" }} />),
      size
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#F2EBDE",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          color: "#1A0E2A",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B5A7A",
            fontFamily: "monospace",
          }}
        >
          <span>SAVVPRO · DOCTRINE {d.number}</span>
          <span>V{d.version} · {d.date.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div
            style={{
              fontSize: 144,
              fontWeight: 700,
              color: "#9E1450",
              fontFamily: "monospace",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              display: "flex",
            }}
          >
            {d.number}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontFamily: "sans-serif",
              marginTop: 12,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {d.title.split(" ").slice(0, -1).join(" ")}
            &nbsp;
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9E1450", fontFamily: "serif" }}>
              {d.title.split(" ").slice(-1)[0]}
            </span>
            <span style={{ color: "#9E1450" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#1A0E2A",
              fontStyle: "italic",
              fontFamily: "serif",
              maxWidth: 1000,
              display: "flex",
              borderLeft: "3px solid #9E1450",
              paddingLeft: 18,
              lineHeight: 1.3,
            }}
          >
            {d.tagline}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B5A7A",
            fontFamily: "monospace",
          }}
        >
          <span>SAVV.PRO/DOCTRINES/{d.slug.toUpperCase()}</span>
          <span>&gt; READ THE FULL DOCTRINE</span>
        </div>
      </div>
    ),
    size
  );
}
