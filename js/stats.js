/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — stats.js
   ─────────────────────────────────────────────────────────────────────────
   Renders /data/stats.public.json into two places:

     1. #stats-body   — Frame 1: NUMBERS ONLY. Grouped metric cells with a
                        date chip and compliance dot rows. No charts here.
     2. #panel-graph  — the stage's right panel: the fixed month-by-month
                        effort graph (tokens + hours per month, modeled,
                        marked "est"). It never changes on index clicks —
                        it is company state, not selection state.

   Everything renders from the JSON; removing a field removes it from the
   page. Modeled values always carry an "est" chip — estimates are shown
   as estimates.
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
  const svgEl = (tag, attrs) => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  };

  const fmt = (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 10000) return (n / 1000).toFixed(0) + "K";
    return n.toLocaleString("en-US");
  };
  const monthLabel = (ym) => {
    const [y, m] = ym.split("-");
    const names = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return names[Number(m) - 1] + " ’" + y.slice(2);
  };

  async function loadStats() {
    try {
      const res = await fetch("./data/stats.public.json", { cache: "no-store" });
      if (!res.ok) throw new Error("stats " + res.status);
      return await res.json();
    } catch (err) {
      console.warn("[savv] stats load failed:", err);
      return null;
    }
  }

  /* ══ Frame 1 — numbers only ══════════════════════════════════════════ */

  const CELL_LABELS = {
    humans: "humans",
    engineers: "engineers",
    design_research: "design / research",
    agents: "agents",
    products: "products",
    clients: "clients",
    commits: "commits",
    lines_of_code: "lines of code",
    skills: "skills",
    capabilities: "capabilities",
    services: "services",
    human_hours: "human hours",
    tokens_consumed: "tokens consumed",
  };

  // Grouped like the reference's metric strips: team · output · ledger · effort
  const GROUPS = [
    ["humans", "engineers", "design_research", "agents"],
    ["products", "clients", "commits", "lines_of_code"],
    ["skills", "capabilities", "services"],
    ["human_hours", "tokens_consumed"],
  ];

  function Cell(c) {
    const isEst = c.capture === "modeled";
    const cell = el("div", { class: "stats-cell" + (isEst ? " stats-cell--est" : "") },
      el("span", { class: "stats-cell__label" }, CELL_LABELS[c.label] || c.label),
      el("span", { class: "stats-cell__value" }, (isEst ? "~" : "") + fmt(c.value))
    );
    if (isEst) cell.appendChild(el("span", { class: "stats-chip stats-chip--est", title: "modeled estimate, not a measurement" }, "est"));
    return cell;
  }

  function ComplianceRow(label, aligned, total) {
    const dots = el("span", { class: "stats-dots", "aria-label": aligned + " of " + total + " services " + label + "-aligned" });
    for (let i = 0; i < total; i++) {
      dots.appendChild(el("i", { class: "stats-dot" + (i < aligned ? " stats-dot--on" : "") }));
    }
    return el("div", { class: "stats-comp__row" },
      el("span", { class: "stats-comp__label" }, label),
      dots,
      el("span", { class: "stats-comp__count" }, aligned + "/" + total)
    );
  }

  function renderStats(s) {
    const body = $("#stats-body");
    if (!body) return;
    body.innerHTML = "";

    body.appendChild(el("div", { class: "stats-head" },
      el("span", { class: "stats-datechip" }, monthLabel(s.as_of)),
      el("span", { class: "stats-window" },
        s.window ? s.window.months + " months · " + monthLabel(s.window.start) + " – " + monthLabel(s.window.end) : ""
      )
    ));

    const byLabel = {};
    (s.counts || []).forEach((c) => { byLabel[c.label] = c; });
    const groupsWrap = el("div", { class: "stats-groups" });
    GROUPS.forEach((labels) => {
      const group = el("div", { class: "stats-group" });
      labels.forEach((l) => { if (byLabel[l]) group.appendChild(Cell(byLabel[l])); });
      if (group.children.length) groupsWrap.appendChild(group);
    });
    body.appendChild(groupsWrap);

    if (s.compliance && s.compliance.services_total) {
      const comp = el("div", { class: "stats-comp" });
      comp.appendChild(ComplianceRow("FINRA", s.compliance.services_finra_aligned, s.compliance.services_total));
      comp.appendChild(ComplianceRow("HIPAA", s.compliance.services_hipaa_aligned, s.compliance.services_total));
      body.appendChild(comp);
    }

    body.appendChild(el("p", { class: "stats-foot" },
      "counts from git and ledger evidence · “est” values are modeled and marked · identities, products, and commercials do not render — by design"
    ));
  }

  function renderStatsFallback() {
    const body = $("#stats-body");
    if (!body) return;
    body.innerHTML = "";
    body.appendChild(el("p", { class: "gf-fallback" },
      "Stats didn’t load from /data/stats.public.json. The shape: 14 months of real counts — no identities, no commercials."
    ));
  }

  /* ══ Right panel — the month cycler (ai-2027 animated dashboard) ═════
     Steps through every month of the window; the date chip, the highlight
     marker, and the commits / tokens / hours readout update together every
     2.5s. Click any month on the timeline to hold it (pauses the cycle);
     the ▮▮/▶ control resumes. Reduced-motion: no auto-cycle, holds the
     latest month. Backgrounded tab: timer cleared, no wasted CPU.        */

  function buildMonths(s) {
    const commits = s.commits_monthly || [];
    const eff = (s.effort_monthly && s.effort_monthly.series) || [];
    const effBy = {};
    eff.forEach((e) => { effBy[e.month] = e; });
    return commits.map((c) => ({
      month: c.month,
      commits: c.commits,
      tokens: effBy[c.month] ? effBy[c.month].tokens : null,
      hours: effBy[c.month] ? effBy[c.month].hours : null,
    }));
  }

  function renderPanelGraph(s) {
    const slot = $("#panel-graph");
    if (!slot) return;
    slot.innerHTML = "";

    const months = buildMonths(s);
    const n = months.length;
    if (n < 2) { slot.appendChild(el("p", { class: "gf-fallback" }, "monthly series unavailable")); return; }

    const modeled = (s.effort_monthly && s.effort_monthly.capture) === "modeled";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // — chart geometry (commits as the backdrop curve) —
    const W = 280, H = 108, PAD = 6, PAD_T = 10, PAD_B = 6;
    const cmax = Math.max(...months.map((m) => m.commits));
    const x = (i) => PAD + (i / (n - 1)) * (W - PAD * 2);
    const y = (v) => PAD_T + (1 - v / cmax) * (H - PAD_T - PAD_B);
    const line = months.map((m, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(m.commits).toFixed(1)).join(" ");
    const area = line + ` L ${x(n - 1).toFixed(1)} ${H - PAD_B} L ${x(0).toFixed(1)} ${H - PAD_B} Z`;

    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "pg__svg", role: "img",
      "aria-label": "Monthly activity from " + monthLabel(months[0].month) + " to " + monthLabel(months[n - 1].month) });
    svg.appendChild(svgEl("path", { d: area, class: "pg__area" }));
    svg.appendChild(svgEl("path", { d: line, class: "pg__line" }));
    // marker = a vertical guide that GLIDES horizontally between months
    const marker = svgEl("g", { class: "pg__marker" });
    marker.appendChild(svgEl("line", { class: "pg__guide", x1: 0, x2: 0, y1: PAD_T - 2, y2: H - PAD_B }));
    svg.appendChild(marker);
    const dots = months.map((m, i) => {
      const c = svgEl("circle", { cx: x(i), cy: y(m.commits), r: 2.4, class: "pg__pt" });
      svg.appendChild(c);
      // wide invisible hit target so the whole column is clickable
      const hit = svgEl("rect", { x: x(i) - (W / n) / 2, y: 0, width: W / n, height: H, class: "pg__hit" });
      hit.addEventListener("click", () => select(i, true));
      svg.appendChild(hit);
      return c;
    });

    // — header + readout DOM (values mutated on each step) —
    const chip = el("span", { class: "stats-datechip" }, "");
    const live = el("span", { class: "pg__live", "aria-hidden": "true" });
    const chipWrap = el("span", { class: "pg__chipwrap" }, chip, live);
    const playBtn = el("button", { class: "pg__play", type: "button", "aria-label": "Pause the month cycle" }, "❚❚ pause");
    const progFill = el("i", { class: "pg__prog-fill" });
    const prog = el("div", { class: "pg__prog", "aria-hidden": "true" }, progFill);
    const vCommits = el("span", { class: "pg__rv" }, "");
    const vTokens = el("span", { class: "pg__rv" }, "");
    const vHours = el("span", { class: "pg__rv" }, "");

    const readRow = (label, valSpan, est) => el("div", { class: "pg__row" },
      el("span", { class: "pg__rk" }, label),
      valSpan,
      est ? el("span", { class: "stats-chip stats-chip--est" }, "est") : null
    );

    const wrap = el("div", { class: "pg" },
      el("div", { class: "pg__head" }, chipWrap, playBtn),
      el("div", { class: "pg__title" }, "activity / month"),
      svg,
      prog,
      el("div", { class: "pg__read" },
        readRow("commits", vCommits, false),
        readRow("tokens", vTokens, modeled),
        readRow("hours", vHours, modeled)
      ),
      el("p", { class: "pg__note" }, "auto-cycling · click a month to hold · tokens & hours modeled")
    );

    // — state machine —
    const STEP_MS = 2500;
    let cur = reduce ? n - 1 : 0;
    let timer = null;
    let playing = !reduce;

    // progress bar: fills 0→100% over one interval, reaching full exactly as
    // the month advances — the clearest "it's running" signal.
    function runProgress() {
      if (reduce) return;
      progFill.style.transition = "none";
      progFill.style.width = "0%";
      void progFill.offsetWidth; // force reflow so the reset takes before the fill
      progFill.style.transition = "width " + STEP_MS + "ms linear";
      progFill.style.width = "100%";
    }
    function freezeProgress() {
      progFill.style.transition = "none";
      progFill.style.width = getComputedStyle(progFill).width;
    }

    function paint(i) {
      const m = months[i];
      chip.textContent = monthLabel(m.month);
      marker.style.transform = "translateX(" + x(i).toFixed(1) + "px)"; // glides via CSS
      dots.forEach((d, di) => d.classList.toggle("is-active", di === i));
      vCommits.textContent = fmt(m.commits);
      vTokens.textContent = m.tokens == null ? "—" : "~" + fmt(m.tokens);
      vHours.textContent = m.hours == null ? "—" : "~" + fmt(m.hours);
    }
    function step() { cur = (cur + 1) % n; paint(cur); runProgress(); }
    function start() { if (!timer && playing) { timer = setInterval(step, STEP_MS); runProgress(); } }
    function stop() { clearInterval(timer); timer = null; freezeProgress(); }
    function setPlaying(on) {
      playing = on;
      playBtn.textContent = on ? "❚❚ pause" : "▶ play";
      playBtn.classList.toggle("is-paused", !on);
      playBtn.setAttribute("aria-label", on ? "Pause the month cycle" : "Resume the month cycle");
      wrap.classList.toggle("is-playing", on);
      if (on) start(); else stop();
    }
    function select(i, manual) {
      cur = i;
      paint(i);
      if (manual) setPlaying(false); // holding a month pauses the cycle
    }

    playBtn.addEventListener("click", () => {
      if (playing) {
        setPlaying(false);
      } else {
        setPlaying(true);
        step(); // advance immediately so pressing play gives instant feedback
      }
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });

    // Append BEFORE start() so the first progress-bar reflow happens on an
    // attached element (a detached reflow is a no-op and pins the bar full).
    slot.appendChild(wrap);
    wrap.classList.toggle("is-playing", playing);
    paint(cur);
    start();
  }

  /* ══ boot ════════════════════════════════════════════════════════════ */

  async function init() {
    const stats = await loadStats();
    if (stats) {
      renderStats(stats);
      renderPanelGraph(stats);
    } else {
      renderStatsFallback();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
