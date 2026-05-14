"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Next.js Link wrapped with the browser's View Transitions API.
 * When the target page renders, any element with a matching
 * `view-transition-name` will morph from old position to new.
 * Falls back to a plain navigation when the API is unavailable
 * (Firefox below 129, reduced-motion users).
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();

  function handle(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Honour modifier-click → new tab/window
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    )
      return;

    const supports =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supports) return;

    e.preventDefault();
    const target = typeof href === "string" ? href : href.pathname ?? "/";
    (document as Document & {
      startViewTransition: (cb: () => void) => unknown;
    }).startViewTransition(() => {
      router.push(target);
    });
  }

  return <Link href={href} onClick={handle} {...rest} />;
}
