/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — model.js
   ─────────────────────────────────────────────────────────────────────────
   Renders /data/world-model.public.json — the redacted render of SavvPro's
   own world model. This file owns everything under the six-book index:

     1. The Index — six books, ≤2-hop navigation, hop indicator   (Phase 1)
     2. The Glass — RedactionToken, the hero's redacted slice     (Phase 2)
     3. The node record panel — ConfidenceBand, ≤2-hop traversal  (Phase 3)
     4. Compile-down — CompileLine, RegisterToggle                (Phase 4)
     5. The Pass — the lifecycle schematic, explicitly labelled   (Phase 5)

   Self-contained: no dependency on app.js, no shared globals. Boots on its
   own DOMContentLoaded, same pattern as app.js, so either file can be
   edited without risking the other.
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

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

  let MODEL = null;
  let EXPANDED_BOOK = null;
  let OPEN_RECORD = null;
  let LAST_TRIGGER = null;
  let REGISTER_MODE = "public"; // 'public' | 'operational' — in-memory only, per §Phase 4

  /* ─────────────────────────────────────────────────────────────────────
     Load
     ───────────────────────────────────────────────────────────────────── */
  async function loadModel() {
    try {
      const res = await fetch("./data/world-model.public.json", { cache: "no-store" });
      if (!res.ok) throw new Error("world-model " + res.status);
      const data = await res.json();
      const nodesById = {};
      (data.nodes || []).forEach((n) => { nodesById[n.id] = n; });
      return Object.assign(data, { nodesById });
    } catch (err) {
      console.warn("[savv] world-model load failed:", err);
      return null;
    }
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 2 · The Glass — RedactionToken (the signature component)
     ───────────────────────────────────────────────────────────────────── */
  function RedactionToken(node) {
    const c = node.contents;
    if (!c || c.status === "public") return null;
    const cfg = {
      compartmentalised: { cls: "tok--comp", label: "compartmentalised" },
      hashed: { cls: "tok--hash", label: node.operational || "hashed" },
      boundary: { cls: "tok--bound", label: "[boundary]" },
      needs_data: { cls: "tok--needs", label: "needs_data" },
    }[c.status];
    if (!cfg) return null;
    const parts = [c.status];
    if (c.tier) parts.push("Tier-" + c.tier);
    if (c.reason) parts.push(c.reason);
    const reasonText = parts.join(" · ");
    return el(
      "span",
      { class: "tok " + cfg.cls, tabindex: "0", "aria-label": cfg.label + " — " + reasonText },
      cfg.label,
      el("span", { class: "reason", "aria-hidden": "true" }, reasonText)
    );
  }

  function PublicTag() {
    return el("span", { class: "pub-tag", "aria-label": "public — never compartmentalised" }, "public");
  }

  function MaturityBar(node) {
    const m = node.maturity;
    const bar = el("span", { class: "gf-bar" });
    if (!m || m.value == null) {
      bar.appendChild(el("i", { style: "width:0%;opacity:.2" }));
      bar.setAttribute("aria-label", "maturity not yet scored — needs_data");
      return bar;
    }
    const pct = Math.round((m.value / (m.of || 1)) * 100);
    bar.appendChild(el("i", { style: "width:" + pct + "%" }));
    bar.setAttribute("aria-label", "maturity " + m.value + " of " + (m.of || 1));
    return bar;
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 3 · ConfidenceBand + NodeRecord
     ───────────────────────────────────────────────────────────────────── */
  function ConfidenceBand(node) {
    const conf = node.confidence;
    const cb = el("div", { class: "gf-cb" });
    let label;
    if (!conf || conf.value == null) {
      cb.appendChild(el("div", { class: "range", style: "left:4%;width:92%" }));
      cb.appendChild(el("div", { class: "track" }));
      label = el("span", { class: "cb-label cb-label--needs" }, "band near-full · needs_data");
    } else {
      const v = conf.value, band = conf.band || 0;
      const lo = Math.max(0, v - band), hi = Math.min(1, v + band);
      cb.appendChild(el("div", { class: "range", style: "left:" + lo * 100 + "%;width:" + (hi - lo) * 100 + "%" }));
      cb.appendChild(el("div", { class: "track" }));
      cb.appendChild(el("div", { class: "mark", style: "left:" + v * 100 + "%" }));
      label = el("span", { class: "cb-label" }, v.toFixed(2) + " ± " + band.toFixed(2) + " · calibrating");
    }
    return el("div", { class: "gf-cb-wrap" }, cb, label);
  }

  function trapFocus(panel) {
    panel.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const items = $$("button, a[href], [tabindex]", panel).filter((n) => !n.hasAttribute("disabled"));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function closeRecord() {
    OPEN_RECORD = null;
    const bd = $(".gf-rec-backdrop");
    if (bd) bd.remove();
    setHopDepth(EXPANDED_BOOK ? 1 : 0);
    if (LAST_TRIGGER && LAST_TRIGGER.focus) LAST_TRIGGER.focus();
    LAST_TRIGGER = null;
  }

  function openRecord(id) {
    const node = MODEL && MODEL.nodesById[id];
    if (!node) return;
    LAST_TRIGGER = document.activeElement;
    OPEN_RECORD = id;
    renderNodeRecordPanel(node);
    setHopDepth(2);
  }

  function renderNodeRecordPanel(node) {
    const existing = $(".gf-rec-backdrop");
    if (existing) existing.remove();

    const backdrop = el("div", {
      class: "gf-rec-backdrop",
      onclick: (e) => { if (e.target === backdrop) closeRecord(); },
    });
    const panel = el("div", { class: "gf-rec", role: "dialog", "aria-modal": "true", "aria-labelledby": "rec-id" });

    const closeBtn = el("button", { class: "gf-rec-close", type: "button", "aria-label": "Close record", onclick: closeRecord }, "× close");
    panel.appendChild(closeBtn);
    panel.appendChild(el("div", { class: "id", id: "rec-id" }, node.id + " · " + node.book + " · " + node.type));
    panel.appendChild(el("div", { class: "op" }, node.operational || "—"));

    const dl = el("dl");
    dl.appendChild(el("dt", null, "confidence"));
    dl.appendChild(el("dd", null, ConfidenceBand(node)));
    dl.appendChild(el("dt", null, "falsifier"));
    dl.appendChild(el("dd", { class: "fals" }, node.falsifier && node.falsifier !== "—" ? node.falsifier : "— no falsifier recorded for this node"));
    dl.appendChild(el("dt", null, "provenance"));
    dl.appendChild(el("dd", null, node.provenance || "—"));
    dl.appendChild(el("dt", null, "contents"));
    dl.appendChild(el("dd", null, RedactionToken(node) || PublicTag()));
    if (node.links && node.links.length) {
      const linksDd = el("dd", { class: "links" });
      node.links.forEach((lid) => {
        const target = MODEL.nodesById[lid];
        if (!target) return;
        linksDd.appendChild(
          el("a", { href: "#", onclick: (e) => { e.preventDefault(); openRecord(lid); } }, target.label + " ↗")
        );
        linksDd.appendChild(document.createTextNode(" "));
      });
      dl.appendChild(el("dt", null, "links"));
      dl.appendChild(linksDd);
    }
    if (node.href) {
      dl.appendChild(el("dt", null, "read more"));
      dl.appendChild(el("dd", null, el("a", { href: node.href }, node.href.replace("./", "/") + " ↗")));
    }
    panel.appendChild(dl);

    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);
    trapFocus(panel);
    closeBtn.focus();
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 4 · Compile-down — CompileLine + RegisterToggle
     ───────────────────────────────────────────────────────────────────── */
  function CompileLine(pubText, opText) {
    const wrap = el("div", {
      class: "gf-compile",
      tabindex: "0",
      role: "button",
      "aria-pressed": "false",
      "aria-label": "Toggle operational register for this line",
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } },
      onclick: toggle,
    });
    const pub = el("div", { class: "pub" }, pubText);
    const op = el("div", { class: "op" }, opText);
    wrap.appendChild(pub);
    wrap.appendChild(op);
    function toggle() {
      const on = wrap.classList.toggle("is-op");
      wrap.setAttribute("aria-pressed", String(on));
    }
    if (REGISTER_MODE === "operational") wrap.classList.add("is-op");
    return wrap;
  }

  function applyRegisterMode() {
    $$(".gf-compile").forEach((w) => w.classList.toggle("is-op", REGISTER_MODE === "operational"));
  }

  function RegisterToggle() {
    const btn = el(
      "button",
      {
        class: "gf-toggle",
        type: "button",
        onclick: () => {
          REGISTER_MODE = REGISTER_MODE === "operational" ? "public" : "operational";
          applyRegisterMode();
          btn.textContent = REGISTER_MODE === "operational" ? "▸ show public ⇄" : "▸ show operational ⇄";
        },
      },
      "▸ show operational ⇄"
    );
    return btn;
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 2 · Hero — the redacted slice, above the fold
     ───────────────────────────────────────────────────────────────────── */
  function renderHero(model) {
    const slot = $("#hero-glass");
    if (!slot) return;
    slot.innerHTML = "";
    const wrap = el("div", { class: "gf-hero" });
    wrap.appendChild(
      CompileLine(
        "This is the firm's own model, shown through its boundary filter.",
        "MODEL · render=redacted · registers=public+operational · nodes=" + model.nodes.length
      )
    );
    const cells = el("div", { class: "cells" });
    ["CAP-01", "CLIENT-01", "ENGAGEMENT-01"].forEach((id) => {
      const n = model.nodesById[id];
      if (!n) return;
      const cv = el("div", { class: "cv" });
      if (n.maturity && n.maturity.value != null) cv.appendChild(MaturityBar(n));
      cv.appendChild(RedactionToken(n) || PublicTag());
      cells.appendChild(el("div", { class: "gf-cell" }, el("div", { class: "ck" }, n.label), cv));
    });
    wrap.appendChild(cells);
    wrap.appendChild(RegisterToggle());
    slot.appendChild(wrap);
  }

  function renderHeroFallback() {
    const slot = $("#hero-glass");
    if (!slot) return;
    slot.innerHTML = "";
    slot.appendChild(
      el(
        "p",
        { class: "gf-fallback" },
        "The model didn't load. Structure: six books — Constitution, Capability Ledger, Resource Ledger, Live State, Relationships, Foresight. Refresh to retry, or read the doctrines directly."
      )
    );
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 1 · The Index — six books, ≤2-hop navigation
     ───────────────────────────────────────────────────────────────────── */
  const HOP_LABELS = ["hop 0 · index", "hop 1 · book", "hop 2 · record"];
  function HopIndicator(depth) {
    const wrap = el("div", { class: "gf-hops" });
    HOP_LABELS.forEach((text, i) => {
      wrap.appendChild(el("span", { class: i === depth ? "on" : "" }, text));
      if (i < HOP_LABELS.length - 1) wrap.appendChild(el("b", null, "→"));
    });
    return wrap;
  }
  function setHopDepth(depth) {
    const wrap = $(".gf-hops");
    if (!wrap) return;
    $$("span", wrap).forEach((s, i) => s.classList.toggle("on", i === depth));
  }

  function NodeRow(node) {
    const row = el("div", {
      class: "gf-node",
      tabindex: "0",
      role: "button",
      "aria-haspopup": "dialog",
      "aria-label": "Open record for " + node.label,
      onclick: () => openRecord(node.id),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRecord(node.id); } },
    });
    row.appendChild(el("span", { class: "lbl" }, node.label, el("small", null, node.operational || "")));
    row.appendChild(MaturityBar(node));
    row.appendChild(RedactionToken(node) || PublicTag());
    return row;
  }

  function countLabel(book) {
    const nodes = book.node_ids.map((id) => MODEL.nodesById[id]).filter(Boolean);
    if (nodes.length && nodes.every((n) => n.contents && n.contents.status === "needs_data")) return "needs_data";
    return nodes.length + " node" + (nodes.length === 1 ? "" : "s");
  }

  function toggleBook(id) {
    EXPANDED_BOOK = EXPANDED_BOOK === id ? null : id;
    renderIndex();
  }

  function BookBlock(book) {
    const isOpen = EXPANDED_BOOK === book.id;
    const row = el(
      "div",
      {
        class: "gf-book" + (isOpen ? " is-open" : ""),
        tabindex: "0",
        role: "button",
        "aria-expanded": String(isOpen),
        "aria-label": "Book " + book.numeral + " · " + book.name,
        onclick: () => toggleBook(book.id),
        onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleBook(book.id); } },
      },
      el("span", { class: "num" }, book.numeral),
      el("span", null, el("span", { class: "nm" }, book.name), el("span", { class: "q" }, book.question)),
      el("span", { class: "ct" }, isOpen ? "expanded" : countLabel(book))
    );
    const block = el("div", { class: "gf-book-block" });
    block.appendChild(row);
    if (isOpen) {
      const list = el("div", { class: "gf-node-list" });
      if (book.id === "BOOK-I") {
        list.appendChild(CompileLine(book.public_line, "BOOK-I · doctrines=" + book.node_ids.length + " · class=" + book.class));
      } else {
        list.appendChild(el("p", { class: "gf-book-line" }, book.public_line));
      }
      book.node_ids.forEach((id) => {
        const n = MODEL.nodesById[id];
        if (n) list.appendChild(NodeRow(n));
      });
      block.appendChild(list);
    }
    return block;
  }

  function renderIndex() {
    const body = $("#model-index-body");
    if (!body) return;
    body.innerHTML = "";
    body.appendChild(HopIndicator(EXPANDED_BOOK ? 1 : 0));
    MODEL.books.forEach((book) => body.appendChild(BookBlock(book)));
    applyRegisterMode();
  }

  function renderIndexFallback() {
    const body = $("#model-index-body");
    if (!body) return;
    body.innerHTML = "";
    body.appendChild(
      el(
        "p",
        { class: "gf-fallback" },
        "The index didn't load from /data/world-model.public.json. The six books are: I Constitution, II Capability Ledger, III Resource Ledger, IV Live State, V Relationships, VI Foresight."
      )
    );
  }

  /* ─────────────────────────────────────────────────────────────────────
     Phase 5 · The Pass — lifecycle schematic, explicitly labelled
     ───────────────────────────────────────────────────────────────────── */
  function startPassAnimation(rail) {
    const stages = $$(".st", rail);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!stages.length) return;
    if (reduce) { stages[3].classList.add("lit"); return; }
    let idx = 3, timer = null;
    function step() { stages.forEach((s, i) => s.classList.toggle("lit", i === idx)); idx = (idx + 1) % stages.length; }
    function start() { if (!timer) { step(); timer = setInterval(step, 1400); } }
    function stop() { clearInterval(timer); timer = null; }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    start();
  }

  function renderPass(model) {
    const slot = $("#pass-body");
    if (!slot) return;
    slot.innerHTML = "";
    const rail = el("div", { class: "gf-pass" });
    model.lifecycle.forEach((stage, i) => {
      rail.appendChild(el("span", { class: "st" }, stage.name));
      if (i < model.lifecycle.length - 1) rail.appendChild(el("span", { class: "arr", "aria-hidden": "true" }, "▶"));
    });
    slot.appendChild(rail);
    slot.appendChild(
      el(
        "div",
        { class: "gf-ticket" },
        el("span", null, "ENG-•••"),
        el("span", { class: "role" }, "finds: ", el("b", null, "actor-a")),
        el("span", { class: "role" }, "verifies: ", el("b", null, "actor-b")),
        el("span", { class: "role" }, "fixes: ", el("b", null, "actor-c"))
      )
    );
    slot.appendChild(el("div", { class: "gf-schem" }, "schematic of the loop — the live feed is compartmentalised"));
    startPassAnimation(rail);
  }

  function renderPassFallback() {
    const slot = $("#pass-body");
    if (!slot) return;
    slot.innerHTML = "";
    slot.appendChild(el("p", { class: "gf-fallback" }, "The lifecycle schematic didn't load. The loop: Engage ▶ Offer ▶ Originate ▶ Deliver ▶ Run & Grow ▶ Compound."));
  }

  /* ─────────────────────────────────────────────────────────────────────
     Book III → /join reframe (surfaced gap, not a form gate)
     ───────────────────────────────────────────────────────────────────── */
  function renderJoinPathway(model) {
    const slot = $("#join-pathway");
    if (!slot) return;
    slot.innerHTML = "";
    const node = model.nodesById["PATHWAY-01"];
    if (!node) return;
    slot.appendChild(NodeRow(node));
  }

  /* ─────────────────────────────────────────────────────────────────────
     Global keys + boot
     ───────────────────────────────────────────────────────────────────── */
  function wireGlobalKeys() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && OPEN_RECORD) closeRecord();
    });
  }

  async function init() {
    wireGlobalKeys();
    const model = await loadModel();
    if (!model) {
      renderHeroFallback();
      renderIndexFallback();
      renderPassFallback();
      return;
    }
    MODEL = model;
    renderHero(MODEL);
    renderIndex();
    renderPass(MODEL);
    renderJoinPathway(MODEL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
