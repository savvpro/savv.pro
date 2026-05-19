/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — app.js
   ─────────────────────────────────────────────────────────────────────────
   No framework. No build step. Read this top-to-bottom — each section is
   a single concern. The site does the following five things:

     1. Loads /data/org-state.json and renders it (ticker + data line)
     2. Drives the agent terminal — boot, intake handshake, easter eggs,
        live BaseEcho REST integration when env vars are configured
     3. Adds ⌘K command palette for power users
     4. Applies a time-of-day palette shift
     5. Adds a tab-blur title taunt + console developer signal

   Nothing in this file imports a module. Everything is inline so View
   Source is fully readable.
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  /* ─── Config ─────────────────────────────────────────────────────────
     BaseEcho credentials. These are intentionally embedded — BaseEcho
     tokens are domain-validated server-side, so it is safe to ship the
     token to the browser. To activate the real agent, replace the empty
     strings below or inject at deploy time via a build step.
     ────────────────────────────────────────────────────────────────── */
  const CFG = {
    apiUrl: window.SAVVPRO_API_URL || "",
    chatbotId: window.SAVVPRO_CHATBOT_ID || "",
    apiToken: window.SAVVPRO_API_TOKEN || "",
  };
  const HAS_AGENT = !!(CFG.apiUrl && CFG.chatbotId && CFG.apiToken);

  /* ─── Tiny helpers ───────────────────────────────────────────────── */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (tag, attrs, ...children) => {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.startsWith("on")) node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      }
    }
    for (const c of children) {
      if (c == null) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  };

  /* ─────────────────────────────────────────────────────────────────────
     1 · org-state data → data line
     ───────────────────────────────────────────────────────────────────── */
  async function loadOrgState() {
    try {
      const res = await fetch("./data/org-state.json", { cache: "no-store" });
      if (!res.ok) throw new Error("org-state " + res.status);
      return await res.json();
    } catch (err) {
      console.warn("[savv] org-state load failed:", err);
      return null;
    }
  }

  function renderDataLine(state) {
    const dataLine = $("[data-stats]");
    if (!dataLine) return;
    const row = (key, value, wine) =>
      `<div class="kv"><span class="kv__key">${key}</span><span class="kv__dots"></span><span class="kv__value${
        wine ? " kv__value--wine" : ""
      }">${value}</span></div>`;
    dataLine.innerHTML = [
      row("doctrines_published", String(state.doctrines_published).padStart(2, "0")),
      row("capabilities_online", String(state.capabilities_online).padStart(2, "0")),
      row("hierarchy_layers", String(state.hierarchy_layers).padStart(2, "0"), true),
      row("agent_uptime_30d", state.agent.uptime_30d + "%"),
      row("delivery_health", state.delivery_health),
      row("last_revised", state.last_revised),
    ].join("");
  }

  /* ─────────────────────────────────────────────────────────────────────
     2 · Agent terminal
     ───────────────────────────────────────────────────────────────────── */

  const TERM_STATE = {
    phase: "boot", // 'boot' | 'intake' | 'ready'
    intakeStep: "name", // 'name' | 'email' | 'phone'
    intake: {}, // { name, email, phone }
    sessionId: null,
    pending: false,
    fullscreen: false,
  };

  const BOOT_LINES = [
    { kind: "sys", text: "savv-os v0.1 // terminal interface", delay: 0 },
    { kind: "sys", text: "establishing secure channel to agent.savv.pro …", delay: 220 },
    { kind: "ok", text: "[ok] handshake complete · tls 1.3 · base_echo://", delay: 500 },
    { kind: "sys", text: "loading capabilities registry …", delay: 740 },
    { kind: "ok", text: "[ok] 4 doctrines · 6 capabilities online", delay: 1020 },
  ];

  const INTAKE_PROMPTS = {
    name: "▸ [1/3] what should I call you?",
    email: "▸ [2/3] work email?",
    phone: "▸ [3/3] phone or LinkedIn? (or type 'skip')",
  };

  const AGENT_WELCOME =
    "SavvPro builds AI-native capabilities for organizations operating in the agentic era. Ask me what we build, how we work, or how to partner with us.";

  const POSTBOOT_TIP =
    "tip: type 'help' for shell commands · 'reset' to redo intake · F for fullscreen";

  const PLACEHOLDER_REPLY =
    "Agent online but the live brain is being configured. Try one of: 'what is savv pro', 'how does the partner model work', 'who do you hire'. Or describe your context — I'll route to the team.";

  const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Easter eggs / shell commands
  const EGGS = [
    [/^\s*whoami\s*$/i, () => [{ kind: "sys", text: "uid=1 (visitor) gid=42 (curious) groups=42(curious),99(welcome)" }]],
    [/^\s*ls(\s|$)/i, () => [{ kind: "sys", text: "library/  agent  README.md  CHANGELOG.md" }]],
    [/^\s*cat\s+(doctrines|library)\s*$/i, () => [
      { kind: "ok", text: "01 · The End of the Hierarchy" },
      { kind: "ok", text: "02 · Capabilities Over Features" },
      { kind: "ok", text: "03 · The World Model Imperative" },
      { kind: "ok", text: "04 · The Partner Doctrine" },
      { kind: "sys", text: "→ see the DOCTRINES link in the nav for full text" },
    ]],
    [/^\s*cat\s+readme(\.md)?\s*$/i, () => [
      { kind: "agent", text: "SavvPro builds AI-native capabilities for organizations operating in the agentic era. We are the intelligence backbone. We operate without a management layer." },
    ]],
    [/^\s*help\s*$/i, () => [
      { kind: "sys", text: "available commands:" },
      { kind: "ok", text: "  whoami           identify yourself" },
      { kind: "ok", text: "  ls               list rooms" },
      { kind: "ok", text: "  cat doctrines    print published doctrines" },
      { kind: "ok", text: "  cat readme       elevator pitch" },
      { kind: "ok", text: "  sudo join        elevate to contributor" },
      { kind: "ok", text: "  :wq              save and quit (kidding)" },
      { kind: "ok", text: "  clear            clear terminal" },
      { kind: "ok", text: "  reset            redo intake" },
      { kind: "ok", text: "  fullscreen / fs  expand terminal · ESC to exit" },
      { kind: "ok", text: "  exit / quit / q  leave fullscreen" },
    ]],
    [/^\s*sudo\s+(join|partner|apply)\s*$/i, () => [
      { kind: "warn", text: "permission requires self-selection. read /join first, then come back." },
    ]],
    [/^\s*sudo\s+/i, () => [{ kind: "warn", text: "nice try. there is no root. there is only the model." }]],
    [/^\s*:wq\s*$/i, () => [{ kind: "sys", text: "session saved. you can leave whenever — the doctrines persist." }]],
    [/^\s*(date|time)\s*$/i, () => [{ kind: "ok", text: "stealth phase · may 2026 · agent uptime 99.97%" }]],
  ];

  const ECHO_RX = /^\s*echo\s+(.+)$/i;

  function addLine(line) {
    const body = $("#term-body");
    if (!body) return;
    body.appendChild(renderLine(line));
    body.scrollTop = body.scrollHeight;
  }

  function renderLine(line) {
    const promptLine = "savv@agent:~$";
    if (line.kind === "user") {
      const div = el("p", { class: "term__line term__line--user" });
      const span1 = el("span", { class: "prompt" }, promptLine);
      div.appendChild(span1);
      div.appendChild(document.createTextNode(" " + line.text));
      return div;
    }
    if (line.kind === "agent") {
      const wrap = el("div", { class: "term__line term__line--agent" });
      wrap.appendChild(el("span", { class: "label" }, "▸ agent"));
      const p = el("span", { class: "text" }, line.text);
      const caret = el("span", { class: "caret" });
      p.appendChild(caret);
      wrap.appendChild(p);
      return wrap;
    }
    return el("p", { class: "term__line term__line--" + line.kind }, line.text);
  }

  function termFocus() {
    const input = $("#term-input");
    if (input && !input.disabled) input.focus();
  }

  /* Intake — loaded from / saved to localStorage */
  function loadIntake() {
    try {
      const raw = localStorage.getItem("savv-intake");
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data && data.name ? data : null;
    } catch { return null; }
  }
  function saveIntake(intake) {
    try { localStorage.setItem("savv-intake", JSON.stringify(intake)); } catch {}
  }
  function clearIntake() {
    try { localStorage.removeItem("savv-intake"); } catch {}
  }

  async function bootTerminal() {
    const term = $(".term");
    if (!term) return;

    // Boot sequence
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        addLine({ kind: line.kind, text: line.text });
        if (i === BOOT_LINES.length - 1) {
          setTimeout(continueAfterBoot, 280);
        }
      }, line.delay);
    });
  }

  function continueAfterBoot() {
    const saved = loadIntake();
    if (saved && saved.name) {
      TERM_STATE.intake = saved;
      addLine({ kind: "ok", text: "[ok] welcome back, " + saved.name });
      addLine({ kind: "agent", text: AGENT_WELCOME });
      addLine({ kind: "sys", text: POSTBOOT_TIP });
      TERM_STATE.phase = "ready";
      // Pre-create a session for returning users (if agent configured)
      if (HAS_AGENT) baseEchoCreateSession(saved).then((sid) => { if (sid) TERM_STATE.sessionId = sid; });
    } else {
      addLine({ kind: "sys", text: "before we chat, a short handshake · 3 questions · 'skip' allowed on phone" });
      addLine({ kind: "agent", text: INTAKE_PROMPTS.name });
      TERM_STATE.phase = "intake";
      TERM_STATE.intakeStep = "name";
    }
    setTermDisabled(false);
    setPlaceholder();
    termFocus();
  }

  function setTermDisabled(disabled) {
    const input = $("#term-input");
    const send = $("#term-send");
    if (input) input.disabled = disabled;
    if (send) send.disabled = disabled;
  }

  function setPlaceholder() {
    const input = $("#term-input");
    if (!input) return;
    if (TERM_STATE.phase === "intake") {
      input.placeholder =
        TERM_STATE.intakeStep === "name" ? "type your name"
        : TERM_STATE.intakeStep === "email" ? "you@company.com"
        : "phone, or type 'skip'";
    } else if (TERM_STATE.pending) {
      input.placeholder = "agent is typing …";
    } else {
      input.placeholder = "_";
    }
  }

  function setFullscreen(on) {
    const term = $(".term");
    if (!term) return;
    if (on === undefined) on = !TERM_STATE.fullscreen;
    TERM_STATE.fullscreen = !!on;
    document.body.style.overflow = on ? "hidden" : "";
    term.classList.toggle("term--fs", on);
    termFocus();
  }

  /* BaseEcho REST */
  async function baseEchoCreateSession(user) {
    if (!HAS_AGENT) return null;
    try {
      const res = await fetch(CFG.apiUrl + "/api/widget/chat/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + CFG.apiToken },
        body: JSON.stringify({
          chatbot_id: CFG.chatbotId,
          user_name: (user && user.name) || "savv.pro visitor",
          user_email: user && user.email,
          user_phone: user && user.phone,
        }),
      });
      if (!res.ok) throw new Error("create-session " + res.status);
      const data = await res.json();
      return data.session_id;
    } catch (err) {
      console.warn("[baseecho] create-session failed:", err);
      return null;
    }
  }
  async function baseEchoSaveContact(name, email, phone) {
    if (!HAS_AGENT) return false;
    try {
      const res = await fetch(CFG.apiUrl + "/api/widget/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + CFG.apiToken },
        body: JSON.stringify({
          widget_type: "chatbot",
          chatbot_id: CFG.chatbotId,
          name, email, phone,
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
  async function baseEchoSendMessage(sessionId, message) {
    if (!HAS_AGENT) return null;
    try {
      const tz = Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = -new Date().getTimezoneOffset();
      const res = await fetch(CFG.apiUrl + "/api/widget/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + CFG.apiToken },
        body: JSON.stringify({
          chatbot_id: CFG.chatbotId,
          message,
          session_id: sessionId,
          user_name: TERM_STATE.intake.name || "savv.pro visitor",
          timezone_name: tz,
          utc_offset_minutes: offset,
        }),
      });
      if (!res.ok) throw new Error("message " + res.status);
      const data = await res.json();
      return data.message;
    } catch (err) {
      console.warn("[baseecho] message failed:", err);
      return null;
    }
  }

  /* Send handler */
  function sendMessage(text) {
    const v = (text || "").trim();
    if (!v || TERM_STATE.pending || TERM_STATE.phase === "boot") return;

    addLine({ kind: "user", text: v });
    const input = $("#term-input");
    if (input) input.value = "";

    // Universal: fullscreen toggle
    if (/^\s*(fullscreen|fs|expand)\s*$/i.test(v)) {
      addLine({ kind: "ok", text: "entering fullscreen … press ESC to exit" });
      setFullscreen(true);
      return;
    }
    if (/^\s*(exit|quit|q)\s*$/i.test(v) && TERM_STATE.fullscreen) {
      addLine({ kind: "sys", text: "exiting fullscreen …" });
      setFullscreen(false);
      return;
    }
    if (/^\s*clear\s*$/i.test(v)) {
      const body = $("#term-body");
      if (body) body.innerHTML = "";
      return;
    }

    // Intake phase
    if (TERM_STATE.phase === "intake") {
      if (/^\s*cancel\s*$/i.test(v)) {
        addLine({ kind: "warn", text: "[warn] intake cancelled · session opens as Guest" });
        addLine({ kind: "agent", text: AGENT_WELCOME });
        addLine({ kind: "sys", text: POSTBOOT_TIP });
        TERM_STATE.intake = { name: "Guest" };
        TERM_STATE.phase = "ready";
        setPlaceholder();
        return;
      }
      const step = TERM_STATE.intakeStep;
      if (step === "name") {
        if (v.length < 2) {
          addLine({ kind: "warn", text: "[err] name must be at least 2 characters · try again" });
          return;
        }
        TERM_STATE.intake.name = v;
        addLine({ kind: "ok", text: "[ok] hi " + v });
        addLine({ kind: "agent", text: INTAKE_PROMPTS.email });
        TERM_STATE.intakeStep = "email";
        setPlaceholder();
        return;
      }
      if (step === "email") {
        if (!EMAIL_RX.test(v)) {
          addLine({ kind: "warn", text: "[err] doesn't look like an email · try again" });
          return;
        }
        TERM_STATE.intake.email = v;
        addLine({ kind: "ok", text: "[ok] saved" });
        addLine({ kind: "agent", text: INTAKE_PROMPTS.phone });
        TERM_STATE.intakeStep = "phone";
        setPlaceholder();
        return;
      }
      if (step === "phone") {
        const skipped = /^\s*skip\s*$/i.test(v);
        if (!skipped) TERM_STATE.intake.phone = v;
        saveIntake(TERM_STATE.intake);
        addLine({ kind: "sys", text: "registering session …" });
        TERM_STATE.pending = true;
        setPlaceholder();
        (async () => {
          if (HAS_AGENT && TERM_STATE.intake.name && TERM_STATE.intake.email && TERM_STATE.intake.phone) {
            await baseEchoSaveContact(TERM_STATE.intake.name, TERM_STATE.intake.email, TERM_STATE.intake.phone);
          }
          if (HAS_AGENT) {
            const sid = await baseEchoCreateSession(TERM_STATE.intake);
            if (sid) TERM_STATE.sessionId = sid;
          }
          addLine({
            kind: "ok",
            text: "[ok] intake complete · session opened" +
              (TERM_STATE.sessionId ? " · " + TERM_STATE.sessionId.slice(-8) : ""),
          });
          addLine({ kind: "agent", text: AGENT_WELCOME });
          addLine({ kind: "sys", text: POSTBOOT_TIP });
          TERM_STATE.phase = "ready";
          TERM_STATE.pending = false;
          setPlaceholder();
        })();
        return;
      }
    }

    // Reset
    if (/^\s*reset\s*$/i.test(v) && TERM_STATE.phase === "ready") {
      clearIntake();
      TERM_STATE.intake = {};
      TERM_STATE.sessionId = null;
      addLine({ kind: "warn", text: "[warn] profile cleared · restarting intake" });
      addLine({ kind: "sys", text: "before we chat, a short handshake · 3 questions · 'skip' allowed on phone" });
      addLine({ kind: "agent", text: INTAKE_PROMPTS.name });
      TERM_STATE.intakeStep = "name";
      TERM_STATE.phase = "intake";
      setPlaceholder();
      return;
    }

    // Echo
    const m = v.match(ECHO_RX);
    if (m) {
      addLine({ kind: "ok", text: m[1] });
      return;
    }

    // Easter eggs
    for (const [rx, fn] of EGGS) {
      if (rx.test(v)) {
        fn().forEach(addLine);
        return;
      }
    }

    // Real chat
    TERM_STATE.pending = true;
    setPlaceholder();
    (async () => {
      if (!HAS_AGENT) {
        await new Promise((r) => setTimeout(r, 700));
        addLine({ kind: "agent", text: PLACEHOLDER_REPLY });
      } else {
        if (!TERM_STATE.sessionId) {
          const sid = await baseEchoCreateSession(TERM_STATE.intake);
          if (!sid) {
            addLine({ kind: "warn", text: "[err] could not establish session · falling back to local reply" });
            addLine({ kind: "agent", text: PLACEHOLDER_REPLY });
            TERM_STATE.pending = false;
            setPlaceholder();
            return;
          }
          TERM_STATE.sessionId = sid;
        }
        const reply = await baseEchoSendMessage(TERM_STATE.sessionId, v);
        if (reply) {
          addLine({ kind: "agent", text: reply });
        } else {
          addLine({ kind: "warn", text: "[err] agent unreachable · using local reply" });
          addLine({ kind: "agent", text: PLACEHOLDER_REPLY });
        }
      }
      TERM_STATE.pending = false;
      setPlaceholder();
      termFocus();
    })();
  }

  function wireTerminal() {
    const form = $("#term-form");
    const input = $("#term-input");
    const fsBtn = $("#term-fs");
    const closeBtn = $("#term-close");
    if (!form || !input) return;

    setTermDisabled(true);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage(input.value);
      requestAnimationFrame(() => input.focus());
    });

    $$(".term__quick-btn").forEach((btn) => {
      btn.addEventListener("click", () => sendMessage(btn.dataset.prompt || btn.textContent));
    });

    if (fsBtn) fsBtn.addEventListener("click", () => setFullscreen());
    if (closeBtn) closeBtn.addEventListener("click", () => TERM_STATE.fullscreen && setFullscreen(false));

    document.addEventListener("keydown", (e) => {
      const t = e.target;
      const inField = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (TERM_STATE.fullscreen && e.key === "Escape") {
        e.preventDefault();
        setFullscreen(false);
        return;
      }
      if (!TERM_STATE.fullscreen && !inField && (e.key === "f" || e.key === "F")) {
        const term = $(".term");
        const rect = term && term.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          setFullscreen(true);
        }
      }
    });

    bootTerminal();
  }

  /* ─────────────────────────────────────────────────────────────────────
     3 · Command palette
     ───────────────────────────────────────────────────────────────────── */
  const CMDS = [
    { id: "go-home", label: "Go to Home", hint: "/", href: "./index.html", group: "Navigate" },
    { id: "go-join", label: "Go to Join", hint: "/join", href: "./join.html", group: "Navigate" },
    { id: "go-doctrines", label: "Doctrines · library", hint: "github · library", href: "https://github.com/savvpro/savv.pro/tree/main/library", group: "External", ext: true },
    { id: "go-repo", label: "Open repo on GitHub", hint: "github.com/savvpro/savv.pro", href: "https://github.com/savvpro/savv.pro", group: "External", ext: true },
    { id: "act-agent", label: "Talk to the agent", hint: "#agent", href: "./index.html#agent", group: "Actions" },
    { id: "act-copy", label: "Copy current URL", hint: "clipboard", group: "Actions", action: () => navigator.clipboard && navigator.clipboard.writeText(window.location.href) },
    { id: "act-top", label: "Scroll to top", hint: "home key", group: "Actions", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  ];

  let cmdkOpen = false;
  let cmdkIdx = 0;
  let cmdkQuery = "";

  function fuzzy(q, t) {
    if (!q) return 1;
    const Q = q.toLowerCase();
    const T = t.toLowerCase();
    if (T.includes(Q)) return 10 - (T.indexOf(Q) / Math.max(1, T.length));
    let qi = 0;
    for (const c of T) if (c === Q[qi]) qi++;
    return qi === Q.length ? 1 : 0;
  }

  function cmdkResults() {
    return CMDS
      .map((c) => ({ c, s: fuzzy(cmdkQuery, c.label + " " + (c.hint || "")) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c);
  }

  function cmdkRender() {
    const list = $(".cmdk__list");
    if (!list) return;
    list.innerHTML = "";
    const results = cmdkResults();
    if (results.length === 0) {
      list.appendChild(el("p", { class: "cmdk__group" }, `no record found for "${cmdkQuery}"`));
      return;
    }
    const grouped = {};
    results.forEach((r) => { (grouped[r.group] = grouped[r.group] || []).push(r); });
    Object.entries(grouped).forEach(([group, cmds]) => {
      list.appendChild(el("p", { class: "cmdk__group" }, "▸ " + group));
      cmds.forEach((cmd) => {
        const ri = results.indexOf(cmd);
        const isActive = ri === cmdkIdx;
        const item = el(
          "div",
          {
            class: "cmdk__item" + (isActive ? " is-active" : ""),
            onclick: () => cmdkRun(cmd),
            onmouseenter: () => { cmdkIdx = ri; cmdkRender(); },
          },
          el("span", null, cmd.label),
          el("span", { class: "cmdk__item-hint" }, cmd.hint || "")
        );
        list.appendChild(item);
      });
    });
  }

  function cmdkRun(cmd) {
    cmdkClose();
    if (cmd.action) cmd.action();
    if (cmd.href) {
      if (cmd.ext) window.open(cmd.href, "_blank", "noopener");
      else window.location.href = cmd.href;
    }
  }

  function cmdkOpenFn() {
    if (cmdkOpen) return;
    cmdkOpen = true;
    cmdkQuery = "";
    cmdkIdx = 0;
    const backdrop = el("div", { class: "cmdk-backdrop", onclick: (e) => { if (e.target === backdrop) cmdkClose(); } });
    const root = el("div", { class: "cmdk", role: "dialog", "aria-modal": "true" });
    const inputWrap = el(
      "div",
      { class: "cmdk__input-wrap" },
      el("span", { class: "icon" }, "▸"),
      el("input", {
        class: "cmdk__input",
        type: "text",
        placeholder: "Search pages, doctrines, actions",
        autocomplete: "off",
        spellcheck: "false",
        oninput: (e) => { cmdkQuery = e.target.value; cmdkIdx = 0; cmdkRender(); },
      }),
      el("span", { class: "cmdk__esc" }, "esc")
    );
    const list = el("div", { class: "cmdk__list" });
    const foot = el(
      "div",
      { class: "cmdk__foot" },
      el("span", null, "⌘K · open · ↵ run · ↑↓ navigate"),
      el("span", null, "savv·pro")
    );
    root.appendChild(inputWrap);
    root.appendChild(list);
    root.appendChild(foot);
    backdrop.appendChild(root);
    document.body.appendChild(backdrop);
    cmdkRender();
    setTimeout(() => $(".cmdk__input").focus(), 10);
  }

  function cmdkClose() {
    cmdkOpen = false;
    const bd = $(".cmdk-backdrop");
    if (bd) bd.remove();
  }

  function wireCmdK() {
    document.addEventListener("keydown", (e) => {
      const inField = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cmdkOpen ? cmdkClose() : cmdkOpenFn();
        return;
      }
      if (!cmdkOpen) {
        if (e.key === "?" && !inField) {
          e.preventDefault();
          cmdkOpenFn();
        }
        return;
      }
      if (e.key === "Escape") { e.preventDefault(); cmdkClose(); }
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        cmdkIdx = Math.min(cmdkResults().length - 1, cmdkIdx + 1);
        cmdkRender();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        cmdkIdx = Math.max(0, cmdkIdx - 1);
        cmdkRender();
      } else if (e.key === "Enter") {
        const cmd = cmdkResults()[cmdkIdx];
        if (cmd) { e.preventDefault(); cmdkRun(cmd); }
      }
    });

    const btn = $(".nav__cmdk");
    if (btn) btn.addEventListener("click", cmdkOpenFn);
  }

  /* ─────────────────────────────────────────────────────────────────────
     4 · Time-of-day palette shift
     ───────────────────────────────────────────────────────────────────── */
  function applyTimeOfDay() {
    const h = new Date().getHours();
    const mode = h < 6 ? "night" : h < 18 ? "day" : h < 22 ? "dusk" : "night";
    document.documentElement.setAttribute("data-time", mode);
  }

  /* ─────────────────────────────────────────────────────────────────────
     5 · Tab-blur title taunt
     ───────────────────────────────────────────────────────────────────── */
  const TAUNTS = [
    "▸ still building.",
    "▸ savv-os is still up.",
    "▸ the model continues.",
    "▸ come back when ready.",
    "▸ the doctrine persists.",
  ];
  function wireTitleTaunt() {
    let original = document.title;
    let i = 0;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        const current = document.title;
        if (!TAUNTS.some((t) => current.startsWith(t))) original = current;
        document.title = TAUNTS[i % TAUNTS.length];
        i++;
      } else {
        document.title = original;
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────
     6 · Console developer signal
     ───────────────────────────────────────────────────────────────────── */
  function wireConsoleGreeting() {
    const lines = [
      "%c▸ SAVVPRO · intelligence backbone",
      "─────────────────────────────────────",
      "You're in the right place.",
      "",
      "We're reading this too.",
      "",
      "Architecture:",
      "  framework:     plain HTML (no build pipeline)",
      "  data source:   /data/org-state.json",
      "  agent:         base_echo:// (BaseEcho)",
      "  machine ctx:   /llms.txt",
      "  source repo:   github.com/savvpro/savv.pro",
      "",
      "Library (the published documents):",
      "  github.com/savvpro/savv.pro/tree/main/library",
      "",
      "If you're looking at source to decide whether to apply:",
      "→ savv.pro/join.html",
      "",
      "─────────────────────────────────────",
      "built without a management layer · v0.1",
    ];
    // First line gets the style; the rest are appended into one call so they share the format
    console.log(
      lines.join("\n"),
      "font-family:monospace;font-weight:600;color:#9e1450;font-size:1.05rem;"
    );
  }

  /* ─────────────────────────────────────────────────────────────────────
     7 · Mobile menu
     ───────────────────────────────────────────────────────────────────── */
  function wireMobileMenu() {
    const btn = $(".menu-btn");
    const nav = $(".nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      btn.textContent = isOpen ? "Close" : "Menu";
    });
    nav.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") {
        nav.classList.remove("is-open");
        btn.textContent = "Menu";
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────
     Boot
     ───────────────────────────────────────────────────────────────────── */
  async function boot() {
    applyTimeOfDay();
    setInterval(applyTimeOfDay, 30 * 60 * 1000); // every 30 minutes

    wireConsoleGreeting();
    wireTitleTaunt();
    wireMobileMenu();
    wireCmdK();

    const state = await loadOrgState();
    if (state) {
      renderDataLine(state);
    }

    wireTerminal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
