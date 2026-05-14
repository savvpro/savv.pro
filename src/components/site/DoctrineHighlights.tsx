"use client";

import { useEffect, useState } from "react";

/**
 * Linkable highlights for doctrine paragraphs.
 *
 * Behaviour:
 * - Shift-click any element with [data-highlight-id] inside the doctrine
 *   body → URL hash updates to #h=<id>, paragraph gets a wine highlight,
 *   the URL is copied to the clipboard, and a brief toast confirms.
 * - On page load, if the hash matches #h=<id>, the corresponding paragraph
 *   gets the wine highlight and scrolls into view.
 *
 * Highlights are anchor-only — no backend, no shared state.
 */
export function DoctrineHighlights() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    function applyFromHash() {
      const hash = window.location.hash;
      const m = hash.match(/[#&]h=([^&]+)/);
      document.querySelectorAll(".savv-hl").forEach((e) => e.classList.remove("savv-hl"));
      if (!m) return;
      const id = decodeURIComponent(m[1]);
      const el = document.querySelector<HTMLElement>(`[data-highlight-id="${CSS.escape(id)}"]`);
      if (!el) return;
      el.classList.add("savv-hl");
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    }

    function onClick(e: MouseEvent) {
      if (!e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      const para = t?.closest<HTMLElement>("[data-highlight-id]");
      if (!para) return;
      e.preventDefault();
      const id = para.getAttribute("data-highlight-id");
      if (!id) return;
      document.querySelectorAll(".savv-hl").forEach((el) => el.classList.remove("savv-hl"));
      para.classList.add("savv-hl");

      const url = new URL(window.location.href);
      url.hash = `h=${encodeURIComponent(id)}`;
      window.history.replaceState({}, "", url.toString());

      try {
        navigator.clipboard?.writeText(url.toString());
        setToast(`▸ link copied · ${id}`);
      } catch {
        setToast(`▸ highlighted · ${id}`);
      }
      window.setTimeout(() => setToast(null), 2400);
    }

    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", applyFromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Discovery hint — bottom-left, mirror of reading-mode hint */}
      <div
        aria-hidden
        className="fixed bottom-5 left-5 z-[55] pointer-events-none select-none hidden md:block"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          opacity: 0.5,
        }}
      >
        ▸ shift-click · highlight & share
      </div>

      {toast && (
        <div
          role="status"
          className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[90] pointer-events-none"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--surface)",
            background: "var(--ink)",
            padding: "10px 16px",
            boxShadow: "0 12px 32px -12px rgba(26,14,42,0.45)",
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}
