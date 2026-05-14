"use client";

import { useEffect, useState } from "react";

/**
 * Press R on a doctrine detail page → site chrome dims to 8%, doctrine
 * body widens slightly. Press R or Esc to exit. A hint badge sits in the
 * bottom-right corner so the shortcut is discoverable.
 */
export function ManuscriptReadingMode() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const inField =
        t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (inField) return;
      if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOn((v) => !v);
      } else if (e.key === "Escape" && on) {
        e.preventDefault();
        setOn(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on]);

  useEffect(() => {
    if (on) document.documentElement.setAttribute("data-reading-mode", "");
    else document.documentElement.removeAttribute("data-reading-mode");
    return () => document.documentElement.removeAttribute("data-reading-mode");
  }, [on]);

  if (!on) {
    return (
      <div
        aria-hidden
        className="fixed bottom-5 right-5 z-[55] pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          opacity: 0.5,
        }}
      >
        ▸ R · reading mode
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOn(false)}
      aria-label="Exit reading mode"
      className="fixed bottom-5 right-5 z-[80] cursor-pointer"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--wine)",
        background: "var(--surface)",
        border: "1px solid var(--wine)",
        padding: "8px 14px",
        boxShadow: "0 8px 24px -8px rgba(26,14,42,0.25)",
      }}
    >
      ▸ reading mode · R or ESC to exit
    </button>
  );
}
