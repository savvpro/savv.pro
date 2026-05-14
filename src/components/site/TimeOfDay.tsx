"use client";

import { useEffect } from "react";

/**
 * Subtly shifts the palette based on visitor's local hour.
 *
 * day   (06:00–18:00) — default cream / wine
 * dusk  (18:00–22:00) — slightly warmer cream, deeper wine
 * night (22:00–06:00) — cooler cream, saturated wine, gentle vignette
 *
 * Imperceptible on any single visit; visitors who return at different
 * times feel "this site is alive" without being able to articulate why.
 */
export function TimeOfDay() {
  useEffect(() => {
    function apply() {
      const h = new Date().getHours();
      const mode = h < 6 ? "night" : h < 18 ? "day" : h < 22 ? "dusk" : "night";
      document.documentElement.setAttribute("data-time-mode", mode);
    }
    apply();
    const id = window.setInterval(apply, 30 * 60 * 1000); // every 30 min
    return () => window.clearInterval(id);
  }, []);
  return null;
}
