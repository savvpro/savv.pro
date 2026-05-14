"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Doctrines" | "Actions";
  href?: string;
  action?: () => void;
};

const PAGES: Cmd[] = [
  { id: "nav-home", label: "Go to Home", hint: "/", group: "Navigate", href: "/" },
  { id: "nav-doctrines", label: "Go to Doctrines", hint: "/doctrines", group: "Navigate", href: "/doctrines" },
  { id: "nav-partners", label: "Go to Partners", hint: "/partners", group: "Navigate", href: "/partners" },
  { id: "nav-join", label: "Go to Join", hint: "/join", group: "Navigate", href: "/join" },
  { id: "nav-system", label: "Open System View", hint: "/system · synthetic", group: "Navigate", href: "/system" },
  { id: "doc-01", label: "Doctrine 01 · The End of the Hierarchy", hint: "/doctrines/end-of-the-hierarchy", group: "Doctrines", href: "/doctrines/end-of-the-hierarchy" },
  { id: "doc-02", label: "Doctrine 02 · Capabilities Over Features", hint: "/doctrines/capabilities-over-features", group: "Doctrines", href: "/doctrines/capabilities-over-features" },
  { id: "doc-03", label: "Doctrine 03 · The World Model Imperative", hint: "/doctrines/world-model-imperative", group: "Doctrines", href: "/doctrines/world-model-imperative" },
  { id: "doc-04", label: "Doctrine 04 · The Partner Doctrine", hint: "/doctrines/partner-doctrine", group: "Doctrines", href: "/doctrines/partner-doctrine" },
];

function fuzzy(q: string, t: string): number {
  if (!q) return 1;
  const Q = q.toLowerCase();
  const T = t.toLowerCase();
  if (T.includes(Q)) return 10 - (T.indexOf(Q) / Math.max(1, T.length));
  let qi = 0;
  for (const c of T) if (c === Q[qi]) qi++;
  return qi === Q.length ? 1 : 0;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const ACTIONS: Cmd[] = useMemo(
    () => [
      {
        id: "act-agent",
        label: "Talk to the agent",
        hint: "/#agent",
        group: "Actions",
        action: () => {
          router.push("/");
          requestAnimationFrame(() =>
            document.getElementById("agent")?.scrollIntoView({ behavior: "smooth", block: "start" })
          );
        },
      },
      {
        id: "act-copy",
        label: "Copy current URL",
        hint: typeof window !== "undefined" ? window.location.href : "",
        group: "Actions",
        action: () => {
          navigator.clipboard?.writeText(window.location.href);
        },
      },
      {
        id: "act-top",
        label: "Scroll to top",
        hint: "home key",
        group: "Actions",
        action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ],
    [router]
  );

  const all = useMemo(() => [...PAGES, ...ACTIONS], [ACTIONS]);

  const results = useMemo(() => {
    const scored = all
      .map((c) => ({ c, s: fuzzy(q, `${c.label} ${c.hint ?? ""}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c);
    return scored;
  }, [q, all]);

  // External open trigger (header chip, footer link, etc.)
  useEffect(() => {
    const open = () => setOpen(true);
    window.addEventListener("savv:open-palette", open);
    return () => window.removeEventListener("savv:open-palette", open);
  }, []);

  // Global key handler
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      const inField =
        tgt &&
        (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || (tgt as HTMLElement).isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) {
        // `?` to open shortcut hint; `/` to focus search (only when not typing)
        if (e.key === "?" && !inField) {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const cmd = results[idx];
        if (!cmd) return;
        e.preventDefault();
        run(cmd);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, idx]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  function run(cmd: Cmd) {
    setOpen(false);
    if (cmd.href) router.push(cmd.href);
    cmd.action?.();
  }

  if (!open) return null;

  const grouped = results.reduce<Record<string, Cmd[]>>((acc, c) => {
    (acc[c.group] = acc[c.group] || []).push(c);
    return acc;
  }, {});

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-10"
      style={{ background: "rgba(26, 14, 42, 0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="w-full max-w-[640px] mt-10 sm:mt-20 border border-[var(--rule)]"
        style={{ background: "var(--surface)", boxShadow: "0 24px 64px -16px rgba(26,14,42,0.45)" }}
      >
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-[var(--rule)]">
          <span
            className="text-wine"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            ▸
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, doctrines, actions"
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-muted"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}
            autoComplete="off"
            spellCheck={false}
            aria-label="Search"
          />
          <span
            className="text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            esc
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p
              className="px-5 py-6 text-muted italic-serif"
              style={{ fontSize: "1.05rem" }}
            >
              No record found for &quot;{q}&quot;.
            </p>
          )}
          {Object.entries(grouped).map(([group, cmds]) => (
            <div key={group} className="py-1">
              <p
                className="px-5 pt-3 pb-1 text-muted"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                ▸ {group}
              </p>
              <ul>
                {cmds.map((c) => {
                  const ri = results.indexOf(c);
                  const active = ri === idx;
                  return (
                    <li
                      key={c.id}
                      onMouseEnter={() => setIdx(ri)}
                      onClick={() => run(c)}
                      className="px-5 py-2.5 flex items-center justify-between gap-4 cursor-pointer"
                      style={{
                        background: active ? "rgba(158, 20, 80, 0.07)" : "transparent",
                        borderLeft: `2px solid ${active ? "var(--wine)" : "transparent"}`,
                      }}
                    >
                      <span
                        className={active ? "text-wine" : "text-ink"}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {c.label}
                      </span>
                      <span
                        className="text-muted shrink-0"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {c.hint}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t border-[var(--rule)] px-5 py-2.5 flex items-center justify-between text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>⌘K · open · ↵ run · ↑↓ navigate</span>
          <Link href="/" className="hover:text-wine">
            savv·pro
          </Link>
        </div>
      </div>
    </div>
  );
}
