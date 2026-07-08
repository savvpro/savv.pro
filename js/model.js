/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — model.js
   ─────────────────────────────────────────────────────────────────────────
   Renders /data/world-model.public.json as the stage's left index rail.

   The rail does exactly one thing: clicking a book or node sends a prompt
   to the terminal (document event "savv:query" → app.js submits it as if
   typed) and BaseEcho answers on its own. The right panel is NOT touched —
   it belongs to stats.js and never changes with selection.

   Also hands the loaded model to app.js ("savv:model-ready") so the
   terminal's offline fallback can answer from it without a second fetch.
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, attrs, ...children) => {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") node.className = attrs[k];
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
  let ACTIVE = null; // last-clicked rail item — visual state only

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

  function ask(text, activeId) {
    ACTIVE = activeId;
    renderRail();
    document.dispatchEvent(new CustomEvent("savv:query", { detail: { text } }));
  }

  function railButton(cls, activeId, prompt, ...children) {
    return el(
      "div",
      {
        class: cls + (ACTIVE === activeId ? " is-active" : ""),
        tabindex: "0",
        role: "button",
        "aria-label": "Ask the agent about this",
        onclick: () => ask(prompt, activeId),
        onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ask(prompt, activeId); } },
      },
      ...children
    );
  }

  function renderRail() {
    const rail = $("#stage-index");
    if (!rail || !MODEL) return;
    rail.innerHTML = "";

    rail.appendChild(el("p", { class: "rail__head" }, "The Index"));

    MODEL.books.forEach((book) => {
      rail.appendChild(railButton(
        "rail__item", book.id,
        "Tell me about " + book.name + " (" + book.id + ")",
        el("span", { class: "rail__num" }, book.numeral),
        el("span", { class: "rail__name" }, book.name,
          el("small", null, book.node_ids.length + " nodes"))
      ));
      const isOpen = ACTIVE === book.id || (ACTIVE && book.node_ids.includes(ACTIVE));
      if (isOpen) {
        book.node_ids.forEach((nid) => {
          const n = MODEL.nodesById[nid];
          if (!n) return;
          rail.appendChild(railButton(
            "rail__node", nid,
            "Tell me about " + n.label + " (" + nid + ")",
            el("span", { class: "rail__nid" }, nid),
            el("span", null, n.label)
          ));
        });
      }
    });

    rail.appendChild(el("div", { class: "rail__rule" }));
    rail.appendChild(railButton(
      "rail__item", "PASS",
      "How does SavvPro deliver work? Walk me through the lifecycle.",
      el("span", { class: "rail__num" }, "◦"),
      el("span", { class: "rail__name" }, "The Pass",
        el("small", null, "lifecycle · schematic"))
    ));
  }

  function renderRailFallback() {
    const rail = $("#stage-index");
    if (!rail) return;
    rail.innerHTML = "";
    rail.appendChild(el("p", { class: "gf-fallback" },
      "Index didn’t load. The six books: I Constitution, II Capability Ledger, III Resource Ledger, IV Live State, V Relationships, VI Foresight."));
  }

  async function init() {
    const model = await loadModel();
    if (!model) {
      renderRailFallback();
      return;
    }
    MODEL = model;
    renderRail();
    document.dispatchEvent(new CustomEvent("savv:model-ready", { detail: { model: MODEL } }));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
