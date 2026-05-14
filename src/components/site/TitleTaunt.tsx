"use client";

import { useEffect } from "react";

const TAUNTS = [
  "▸ still building.",
  "▸ savv-os is still up.",
  "▸ the model continues.",
  "▸ come back when ready.",
  "▸ the doctrine persists.",
];

/**
 * When the tab loses focus, swap the document title to a SavvPro-voiced
 * taunt. When focus returns, restore. Rotates through several variants
 * so returning users see different ones.
 */
export function TitleTaunt() {
  useEffect(() => {
    let original = document.title;
    let i = 0;

    function onVisibility() {
      if (document.hidden) {
        // Re-capture the original in case the route changed
        const current = document.title;
        if (!TAUNTS.some((t) => current.startsWith(t))) {
          original = current;
        }
        document.title = TAUNTS[i % TAUNTS.length];
        i += 1;
      } else {
        document.title = original;
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (document.hidden) document.title = original;
    };
  }, []);

  return null;
}
