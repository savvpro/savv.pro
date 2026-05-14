"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Line =
  | { id: string; kind: "sys"; text: string }
  | { id: string; kind: "agent"; text: string }
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "ok"; text: string }
  | { id: string; kind: "warn"; text: string };

const BOOT_LINES: Array<{ kind: Line["kind"]; text: string; delay: number }> = [
  { kind: "sys", text: "savv-os v0.1 // terminal interface", delay: 0 },
  { kind: "sys", text: "establishing secure channel to agent.savv.pro …", delay: 240 },
  { kind: "ok", text: "[ok] handshake complete · tls 1.3 · base_echo://", delay: 520 },
  { kind: "sys", text: "loading capabilities registry …", delay: 760 },
  { kind: "ok", text: "[ok] 4 doctrines · 6 capabilities · 2 partners online", delay: 1040 },
];

const INTAKE_INTRO =
  "before we chat, a short handshake · 3 questions · 'skip' allowed on phone";

const AGENT_WELCOME =
  "SavvPro builds AI-native capabilities for organizations operating in the agentic era. Ask me what we build, how we work, or how to partner with us.";

const POSTBOOT_TIP =
  "tip: type 'help' for shell commands · 'reset' to redo intake · press F to expand";

const PLACEHOLDER_REPLY =
  "Agent online but the live brain is being configured. Try one of: 'what is savv pro', 'how does the partner model work', 'who do you hire'. Or just describe your context — I'll route to the team.";

const API_URL = process.env.NEXT_PUBLIC_BASEECHO_API_URL;
const CHATBOT_ID = process.env.NEXT_PUBLIC_BASEECHO_CHATBOT_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_BASEECHO_API_TOKEN;
const BASEECHO_READY = !!(API_URL && CHATBOT_ID && API_TOKEN);

async function baseEchoCreateSession(
  user?: { name?: string; email?: string; phone?: string }
): Promise<string | null> {
  if (!BASEECHO_READY) return null;
  try {
    const res = await fetch(`${API_URL}/api/widget/chat/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        chatbot_id: CHATBOT_ID,
        user_name: user?.name || "savv.pro visitor",
        user_email: user?.email,
        user_phone: user?.phone,
      }),
    });
    if (!res.ok) throw new Error(`create-session ${res.status}`);
    const data = (await res.json()) as { session_id: string };
    return data.session_id;
  } catch (err) {
    console.warn("[baseecho] create-session failed:", err);
    return null;
  }
}

async function baseEchoSaveContact(
  name: string,
  email: string,
  phone: string
): Promise<boolean> {
  if (!BASEECHO_READY) return false;
  try {
    const res = await fetch(`${API_URL}/api/widget/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        widget_type: "chatbot",
        chatbot_id: CHATBOT_ID,
        name,
        email,
        phone,
        source: "savv.pro terminal intake",
        timestamp: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn("[baseecho] contact save failed:", err);
    return false;
  }
}

async function baseEchoSendMessage(
  sessionId: string,
  message: string
): Promise<string | null> {
  if (!BASEECHO_READY) return null;
  try {
    const tz =
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : undefined;
    const offset = -new Date().getTimezoneOffset();
    const res = await fetch(`${API_URL}/api/widget/chat/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        chatbot_id: CHATBOT_ID,
        message,
        session_id: sessionId,
        user_name: "savv.pro visitor",
        timezone_name: tz,
        utc_offset_minutes: offset,
      }),
    });
    if (!res.ok) throw new Error(`message ${res.status}`);
    const data = (await res.json()) as { message: string };
    return data.message;
  } catch (err) {
    console.warn("[baseecho] message failed:", err);
    return null;
  }
}

type Easter = { match: RegExp; reply: Array<{ kind: "sys" | "ok" | "agent" | "warn"; text: string }> | "clear" };

const EASTER_EGGS: Easter[] = [
  {
    match: /^\s*whoami\s*$/i,
    reply: [{ kind: "sys", text: "uid=1 (visitor) gid=42 (curious) groups=42(curious),99(welcome)" }],
  },
  {
    match: /^\s*ls(\s|$)/i,
    reply: [{ kind: "sys", text: "doctrines/  partners/  join/  agent  README.md  CHANGELOG.md" }],
  },
  {
    match: /^\s*cat\s+(doctrines|doctrines\.md|doctrines\/?)\s*$/i,
    reply: [
      { kind: "ok", text: "01 · The End of the Hierarchy" },
      { kind: "ok", text: "02 · Capabilities Over Features" },
      { kind: "ok", text: "03 · The World Model Imperative" },
      { kind: "ok", text: "04 · The Partner Doctrine" },
      { kind: "sys", text: "→ open /doctrines to read them in full" },
    ],
  },
  {
    match: /^\s*cat\s+readme(\.md)?\s*$/i,
    reply: [{ kind: "agent", text: "SavvPro builds AI-native capabilities for organizations operating in the agentic era. We are the intelligence backbone; our partners are the surface. We operate without a management layer." }],
  },
  {
    match: /^\s*help\s*$/i,
    reply: [
      { kind: "sys", text: "available commands:" },
      { kind: "ok", text: "  whoami           identify yourself to the agent" },
      { kind: "ok", text: "  ls               list rooms in the building" },
      { kind: "ok", text: "  cat doctrines    print the four published doctrines" },
      { kind: "ok", text: "  cat readme       elevator pitch" },
      { kind: "ok", text: "  sudo join        elevate to contributor" },
      { kind: "ok", text: "  :wq              save and quit (just kidding)" },
      { kind: "ok", text: "  clear            clear the terminal" },
      { kind: "ok", text: "  reset            clear stored profile · redo intake" },
      { kind: "ok", text: "  fullscreen / fs  expand the terminal · ESC to exit" },
      { kind: "ok", text: "  anything else    routed to the agent" },
    ],
  },
  {
    match: /^\s*sudo\s+(join|partner|apply)\s*$/i,
    reply: [
      { kind: "warn", text: "permission requires self-selection. read /join first, then come back." },
      { kind: "sys", text: "see also: /partners for organizations" },
    ],
  },
  {
    match: /^\s*sudo\s+/i,
    reply: [{ kind: "warn", text: "nice try. there is no root. there is only the model." }],
  },
  {
    match: /^\s*:wq\s*$/i,
    reply: [{ kind: "sys", text: "session saved. you can leave whenever — the doctrines persist." }],
  },
  { match: /^\s*clear\s*$/i, reply: "clear" },
  {
    match: /^\s*(date|time)\s*$/i,
    reply: [{ kind: "ok", text: "stealth phase · may 2026 · agent uptime 99.97%" }],
  },
  { match: /^\s*echo\s+(.+)$/i, reply: [] },
];

const QUICK = [
  "What does SavvPro build?",
  "How does the partner model work?",
  "What do you look for in contributors?",
];

type Phase = "boot" | "intake" | "ready";
type IntakeField = "name" | "email" | "phone";
type Intake = { name?: string; email?: string; phone?: string };

const INTAKE_STORAGE_KEY = "savv-intake";
const INTAKE_PROMPTS: Record<IntakeField, string> = {
  name: "▸ [1/3] what should I call you?",
  email: "▸ [2/3] work email?",
  phone: "▸ [3/3] phone or LinkedIn? (or type 'skip')",
};
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loadIntake(): Intake | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(INTAKE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Intake;
    if (parsed && (parsed.name || parsed.email)) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveIntake(intake: Intake) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(intake));
  } catch {
    // ignore quota errors
  }
}

function clearIntake() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(INTAKE_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function AgentTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [phase, setPhase] = useState<Phase>("boot");
  const [intakeField, setIntakeField] = useState<IntakeField>("name");
  const intakeRef = useRef<Intake>({});
  const [fullscreen, setFullscreen] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const booting = phase === "boot";

  // Boot sequence — then transition to intake OR ready depending on stored profile
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((b, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, { id: `boot-${i}`, kind: b.kind, text: b.text }]);
        }, b.delay)
      );
    });

    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 280;
    timers.push(
      setTimeout(() => {
        const saved = loadIntake();
        if (saved && saved.name) {
          intakeRef.current = saved;
          setLines((p) => [
            ...p,
            { id: crypto.randomUUID(), kind: "ok", text: `[ok] welcome back, ${saved.name}` },
            { id: crypto.randomUUID(), kind: "agent", text: AGENT_WELCOME },
            { id: crypto.randomUUID(), kind: "sys", text: POSTBOOT_TIP },
          ]);
          setPhase("ready");
          // Eagerly create the session for returning users
          baseEchoCreateSession(saved).then((sid) => {
            if (sid) sessionIdRef.current = sid;
          });
        } else {
          setLines((p) => [
            ...p,
            { id: crypto.randomUUID(), kind: "sys", text: INTAKE_INTRO },
            { id: crypto.randomUUID(), kind: "agent", text: INTAKE_PROMPTS.name },
          ]);
          setPhase("intake");
          setIntakeField("name");
        }
      }, lastDelay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, pending]);

  // Lock body scroll when fullscreen + focus input on enter
  useEffect(() => {
    if (fullscreen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [fullscreen]);

  // ESC + F shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      const inField =
        tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      if (fullscreen && e.key === "Escape") {
        e.preventDefault();
        setFullscreen(false);
        return;
      }
      // 'f' to toggle when terminal is in view and not typing in some other field
      if (!fullscreen && !inField && (e.key === "f" || e.key === "F")) {
        const r = wrapRef.current?.getBoundingClientRect();
        if (r && r.top < window.innerHeight && r.bottom > 0) {
          e.preventDefault();
          setFullscreen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  function send(text: string) {
    const v = text.trim();
    if (!v || pending || booting) return;
    const userLine: Line = { id: crypto.randomUUID(), kind: "user", text: v };
    setLines((m) => [...m, userLine]);
    setInput("");

    // Fullscreen toggle via command — works in any phase
    if (/^\s*(fullscreen|fs|expand)\s*$/i.test(v)) {
      setLines((m) => [...m, { id: crypto.randomUUID(), kind: "ok", text: "entering fullscreen … press ESC to exit" }]);
      requestAnimationFrame(() => setFullscreen(true));
      return;
    }
    if (/^\s*(exit|quit|q)\s*$/i.test(v) && fullscreen) {
      setLines((m) => [...m, { id: crypto.randomUUID(), kind: "sys", text: "exiting fullscreen …" }]);
      setFullscreen(false);
      return;
    }

    // ── INTAKE PHASE ──────────────────────────────────────────────────────
    if (phase === "intake") {
      if (/^\s*cancel\s*$/i.test(v)) {
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "warn", text: "[warn] intake cancelled · session opens as Guest" },
          { id: crypto.randomUUID(), kind: "agent", text: AGENT_WELCOME },
          { id: crypto.randomUUID(), kind: "sys", text: POSTBOOT_TIP },
        ]);
        intakeRef.current = { name: "Guest" };
        setPhase("ready");
        return;
      }

      if (intakeField === "name") {
        if (v.length < 2) {
          setLines((m) => [
            ...m,
            { id: crypto.randomUUID(), kind: "warn", text: "[err] name must be at least 2 characters · try again" },
          ]);
          return;
        }
        intakeRef.current.name = v;
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "ok", text: `[ok] hi ${v}` },
          { id: crypto.randomUUID(), kind: "agent", text: INTAKE_PROMPTS.email },
        ]);
        setIntakeField("email");
        return;
      }

      if (intakeField === "email") {
        if (!EMAIL_RX.test(v)) {
          setLines((m) => [
            ...m,
            { id: crypto.randomUUID(), kind: "warn", text: "[err] doesn't look like an email · try again" },
          ]);
          return;
        }
        intakeRef.current.email = v;
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "ok", text: "[ok] saved" },
          { id: crypto.randomUUID(), kind: "agent", text: INTAKE_PROMPTS.phone },
        ]);
        setIntakeField("phone");
        return;
      }

      if (intakeField === "phone") {
        const skipped = /^\s*skip\s*$/i.test(v);
        if (!skipped) intakeRef.current.phone = v;

        // Finalise: persist locally, then save contact + open session
        const profile = intakeRef.current;
        saveIntake(profile);

        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "sys", text: "registering session …" },
        ]);

        setPending(true);
        (async () => {
          if (BASEECHO_READY && profile.name && profile.email && profile.phone) {
            await baseEchoSaveContact(profile.name, profile.email, profile.phone);
          }
          if (BASEECHO_READY) {
            const sid = await baseEchoCreateSession(profile);
            if (sid) sessionIdRef.current = sid;
          }
          setLines((m) => [
            ...m,
            { id: crypto.randomUUID(), kind: "ok", text: `[ok] intake complete · session opened${sessionIdRef.current ? " · " + sessionIdRef.current.slice(-8) : ""}` },
            { id: crypto.randomUUID(), kind: "agent", text: AGENT_WELCOME },
            { id: crypto.randomUUID(), kind: "sys", text: POSTBOOT_TIP },
          ]);
          setPhase("ready");
          setPending(false);
        })();
        return;
      }
    }

    // ── RESET command (works in ready phase) ──
    if (/^\s*reset\s*$/i.test(v) && phase === "ready") {
      clearIntake();
      intakeRef.current = {};
      sessionIdRef.current = null;
      setLines((m) => [
        ...m,
        { id: crypto.randomUUID(), kind: "warn", text: "[warn] profile cleared · restarting intake" },
        { id: crypto.randomUUID(), kind: "sys", text: INTAKE_INTRO },
        { id: crypto.randomUUID(), kind: "agent", text: INTAKE_PROMPTS.name },
      ]);
      setIntakeField("name");
      setPhase("intake");
      return;
    }

    // Easter-egg / shell commands handled locally without a "thinking" delay
    const echo = v.match(/^\s*echo\s+(.+)$/i);
    if (echo) {
      setLines((m) => [...m, { id: crypto.randomUUID(), kind: "ok", text: echo[1] }]);
      return;
    }
    const egg = EASTER_EGGS.find((e) => e.match.test(v));
    if (egg) {
      if (egg.reply === "clear") {
        setLines([]);
        return;
      }
      const replies = egg.reply;
      setLines((m) => [
        ...m,
        ...replies.map((r) => ({ id: crypto.randomUUID(), kind: r.kind, text: r.text } as Line)),
      ]);
      return;
    }

    setPending(true);

    (async () => {
      if (!BASEECHO_READY) {
        // Fallback when env vars aren't configured
        await new Promise((r) => setTimeout(r, 700));
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "agent", text: PLACEHOLDER_REPLY },
        ]);
        setPending(false);
        return;
      }

      // Lazily create a BaseEcho session on first message (intake-completed)
      if (!sessionIdRef.current) {
        const sid = await baseEchoCreateSession(intakeRef.current);
        if (!sid) {
          setLines((m) => [
            ...m,
            { id: crypto.randomUUID(), kind: "warn", text: "[err] could not establish session · falling back to local reply" },
            { id: crypto.randomUUID(), kind: "agent", text: PLACEHOLDER_REPLY },
          ]);
          setPending(false);
          return;
        }
        sessionIdRef.current = sid;
      }

      const reply = await baseEchoSendMessage(sessionIdRef.current, v);
      if (reply) {
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "agent", text: reply },
        ]);
      } else {
        setLines((m) => [
          ...m,
          { id: crypto.randomUUID(), kind: "warn", text: "[err] agent unreachable · using local reply" },
          { id: crypto.randomUUID(), kind: "agent", text: PLACEHOLDER_REPLY },
        ]);
      }
      setPending(false);
    })();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
    // Keep focus on the input so the user can keep typing
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const promptLine = useMemo(() => "savv@agent:~$", []);

  // The terminal body — extracted so we can render it identically in both
  // inline and fullscreen modes. Sizes scale up when fullscreen.
  const body = (
    <div
      ref={wrapRef}
      className={`term w-full ${fullscreen ? "term-fs" : ""}`}
      style={
        fullscreen
          ? {
              position: "fixed",
              inset: 0,
              zIndex: 90,
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
            }
          : undefined
      }
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[rgba(63,255,106,0.18)] px-4 py-2.5 relative z-[2]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Close fullscreen"
            onClick={() => fullscreen && setFullscreen(false)}
            className="inline-block w-2.5 h-2.5 rounded-full focus:outline-none"
            style={{ background: "#ff5050", cursor: fullscreen ? "pointer" : "default" }}
            title={fullscreen ? "Close fullscreen (Esc)" : ""}
          />
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "#ffb400" }} />
          <button
            type="button"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => setFullscreen((v) => !v)}
            className="inline-block w-2.5 h-2.5 rounded-full focus:outline-none cursor-pointer hover:scale-125 transition-transform"
            style={{ background: "#3fff6a" }}
            title={fullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
          />
          <span className="term-text term-dim ml-3 text-[0.7rem] tracking-[0.18em] uppercase">
            agent · savv.pro {fullscreen ? "· fullscreen" : "· /bin/sh"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="term-text term-dim text-[0.65rem] tracking-[0.18em] uppercase hidden sm:inline">
            {booting ? "booting" : "online"} · enc
          </span>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={fullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
            className="term-text term-amber hover:text-[var(--term-green)] transition-colors inline-flex items-center gap-1.5 border border-[rgba(255,180,0,0.35)] hover:border-[var(--term-amber)] px-2 py-1 rounded-sm cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {fullscreen ? (
              <>
                <FsCollapseIcon />
                <span>collapse · esc</span>
              </>
            ) : (
              <>
                <FsExpandIcon />
                <span>fullscreen · f</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className={`px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto relative z-[2] custom-term-scroll ${
          fullscreen ? "flex-1" : "min-h-[340px] max-h-[480px]"
        }`}
        style={{
          fontSize: fullscreen ? "1rem" : "0.92rem",
          lineHeight: 1.65,
        }}
      >
        {lines.map((l) => (
          <TermLine key={l.id} line={l} prompt={promptLine} />
        ))}
        {pending && (
          <div className="flex items-center gap-3 mt-2">
            <span className="term-text term-amber text-[0.85rem]">▸</span>
            <span className="term-text term-dim text-[0.78rem] tracking-[0.14em] uppercase">
              processing
            </span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--term-green)" }} />
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--term-green)", animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--term-green)", animationDelay: "0.4s" }} />
            </span>
          </div>
        )}
      </div>

      {/* Quick prompts — only after intake completes, before any user message */}
      {!booting && phase === "ready" && lines.filter((l) => l.kind === "user").length === 0 && (
        <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2 relative z-[2]">
          {QUICK.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="term-text term-dim hover:term-amber transition-colors text-[0.72rem] tracking-[0.04em] border border-[rgba(63,255,106,0.25)] px-2.5 py-1 rounded hover:border-[var(--term-amber)] cursor-pointer"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              &gt; {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 sm:gap-3 border-t border-[rgba(63,255,106,0.18)] px-4 py-3 relative z-[2]"
      >
        <span className="term-text term-amber text-[0.85rem] shrink-0">{promptLine}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            booting
              ? "booting …"
              : phase === "intake"
              ? intakeField === "name"
                ? "type your name"
                : intakeField === "email"
                ? "you@company.com"
                : "phone, or type 'skip'"
              : pending
              ? "agent is typing …"
              : "_"
          }
          disabled={booting}
          className="flex-1 bg-transparent outline-none term-text disabled:opacity-40 placeholder:text-[var(--term-green-dim)]"
          style={{
            fontFamily: "var(--font-mono)",
            caretColor: "var(--term-green)",
            fontSize: fullscreen ? "1rem" : "0.92rem",
          }}
          autoComplete="off"
          spellCheck={false}
          aria-label="Ask the agent"
        />
        <button
          type="submit"
          disabled={pending || booting || !input.trim()}
          className="term-text term-amber hover:text-[var(--term-green)] disabled:opacity-30 transition-colors text-[0.72rem] tracking-[0.18em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          send ↵
        </button>
      </form>

      {fullscreen && (
        <div
          className="border-t border-[rgba(63,255,106,0.18)] px-4 py-2 flex items-center justify-between"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--term-green-dim)",
          }}
        >
          <span>▸ fullscreen session · esc to exit · type &apos;exit&apos; to leave</span>
          <span>savv-os · v0.1</span>
        </div>
      )}

      <style>{`
        .custom-term-scroll::-webkit-scrollbar { width: 5px; }
        .custom-term-scroll::-webkit-scrollbar-track { background: rgba(63, 255, 106, 0.05); }
        .custom-term-scroll::-webkit-scrollbar-thumb { background: var(--term-green-dim); border-radius: 0; }
        @keyframes term-fs-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .term-fs { animation: term-fs-in 220ms cubic-bezier(.2,.7,.2,1); }
      `}</style>
    </div>
  );

  // When fullscreen, also render a dim backdrop behind the panel.
  if (fullscreen) {
    return (
      <>
        {/* Placeholder keeps page layout from jumping while fullscreen */}
        <div className="term w-full min-h-[340px] opacity-30 pointer-events-none" aria-hidden>
          <div className="px-4 py-2.5 border-b border-[rgba(63,255,106,0.18)]">
            <span className="term-text term-dim text-[0.7rem] tracking-[0.18em] uppercase">
              agent · savv.pro · session in fullscreen
            </span>
          </div>
        </div>
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 11, 8, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 85,
          }}
          onClick={() => setFullscreen(false)}
        />
        {body}
      </>
    );
  }

  return body;
}

function FsExpandIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
    </svg>
  );
}

function FsCollapseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" />
    </svg>
  );
}

function TermLine({ line, prompt }: { line: Line; prompt: string }) {
  if (line.kind === "sys") {
    return (
      <p className="term-text term-dim mb-1.5">
        <span className="term-amber">~</span> {line.text}
      </p>
    );
  }
  if (line.kind === "ok") {
    return (
      <p className="term-text mb-2" style={{ color: "var(--term-green)" }}>
        {line.text}
      </p>
    );
  }
  if (line.kind === "warn") {
    return <p className="term-text term-red mb-2">{line.text}</p>;
  }
  if (line.kind === "user") {
    return (
      <p className="term-text mb-2.5 break-words">
        <span className="term-amber">{prompt}</span>{" "}
        <span style={{ color: "var(--term-green)" }}>{line.text}</span>
      </p>
    );
  }
  // agent
  return (
    <div className="mb-3 break-words">
      <p className="term-text term-amber text-[0.7rem] tracking-[0.18em] uppercase mb-1">
        ▸ agent
      </p>
      <p className="term-text" style={{ color: "var(--term-green)" }}>
        {line.text}
        <span className="caret" />
      </p>
    </div>
  );
}
