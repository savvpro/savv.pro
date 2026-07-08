# SavvPro — Stats + Terminal Redesign Plan (v2, AI-2027-inspired)

**Two sections: a stealth-safe stats dashboard on top, and below it a three-pane
stage — index (left) · terminal (center, BaseEcho) · live graph panel (right).**

Supersedes v1 of this document (the Next.js + LangChain migration). That plan is
**shelved**: BaseEcho stays as the terminal's brain, so no backend is needed, so the
site stays static vanilla HTML/CSS/JS with no framework and no build step — the same
stack the whole current build already runs on. This redesign is a layout + data
change on the existing site, not a platform migration.

Design reference: https://ai-2027.com/ — specifically its fixed dashboard panel
(line graph over time, metric tiles, capability icons, progress dots, date chip)
and its left-hand timeline index. We borrow the *dashboard grammar*, not the
long-form essay format.

---

## 0. The two sections

```
┌──────────────────────────────────────────────────────────────┐
│ header: SAVV·PRO · nav · ⌘K                                   │
├──────────────────────────────────────────────────────────────┤
│ SECTION 1 — STATS (stealth-safe only)                         │
│                                                                │
│  ┌ month-over-month line chart ┐  ┌ metric tiles ─────────┐  │
│  │ capabilities_defined ───/    │  │ doctrines        04   │  │
│  │ doctrines_published ──/      │  │ capabilities     06   │  │
│  │ (real recorded months only)  │  │ phase        stealth  │  │
│  └──────────────────────────────┘  │ open sockets  needs_  │  │
│  maturity distribution bar · needs_data count · last_revised │
├──────────────┬────────────────────────────────┬──────────────┤
│ SECTION 2    │                                │              │
│ INDEX (left, │  TERMINAL (center)             │ GRAPH PANEL  │
│ sticky)      │                                │ (right,      │
│              │  click index item → structured │  sticky)     │
│ I Constit.   │  query sent to BaseEcho →      │              │
│ II Capability│  reply renders here            │ updates to   │
│ III Resources│                                │ show the     │
│ IV Live State│  typed queries work the same   │ selected     │
│ V Relations  │                                │ book/node:   │
│ VI Foresight │  savv@agent:~$ _               │ maturity ▓▓░ │
│ The Pass     │                                │ conf band ── │
│              │                                │ date chip    │
└──────────────┴────────────────────────────────┴──────────────┘
```

### Section 1 — Stats (the AI-2027 dashboard grammar, stealth-filtered)

Only numbers that reveal nothing identifying: counts, maturity distribution,
needs_data socket count, phase, last_revised. **Never**: names, clients, partners,
revenue, headcount-as-cost, defect specifics. Source of truth is
`data/world-model.public.json` plus a new `data/stats-history.json` — the stats
section renders only what those files contain, so the stealth filter is enforced
by the data layer, not by copy discipline.

Visual vocabulary borrowed from AI-2027's dashboard:
- **Line chart over months** (their capability-growth curve) → our counts over time.
  Hand-rolled inline SVG — no chart library, keeps the no-dependency rule.
- **Metric tiles** (their approval/revenue/valuation row) → our doctrines /
  capabilities / phase / open-sockets row. Same compact mono layout.
- **Progress dots** (their "currently exists / emerging / science fiction" scale) →
  our maturity distribution: how many capabilities sit at each maturity band.
- **Date chip** (their "May 2025" tag) → our `last_revised` stamp.

**Honesty rule (hard):** the line chart plots only genuinely recorded months.
No backfilled curve, no invented history. Two options for day one:
- (a) history starts now — chart shows one real point and the label
  "history begins <month>"; it grows monthly from here; or
- (b) the founder supplies real historical monthly counts, which get entered into
  `stats-history.json` marked `backfilled` and rendered at reduced visual weight.
**→ OPEN DECISION #1: (a) or (b), and if (b), the actual numbers.**

### Section 2 — Index · Terminal · Graph

- **Index (left, sticky):** the six books + The Pass, same data as today's index.
  Clicking an item no longer expands in place — it **drives the terminal**: a
  structured query ("show BOOK-II" / "show CAP-01") is submitted to the terminal
  exactly as if typed.
- **Terminal (center):** the existing BaseEcho-integrated terminal, relocated and
  made the primary surface. The already-built Lane-1 local fallback stays: with
  BaseEcho unconfigured/down, index clicks and typed queries still answer from the
  JSON (node records, principled refusals). BaseEcho adds language understanding
  on top; it never becomes a single point of failure.
- **Graph panel (right, sticky):** the AI-2027 "fixed dashboard" idea, scoped to
  the current selection. When the terminal answers about a node/book, this panel
  renders its graphics: maturity bar, confidence band (widening = honest
  uncertainty), redaction state chip, links. It is the *graphical echo* of
  whatever the terminal just said — one selection state drives both panes.
- **Mobile (<720px):** index collapses to a drawer; graph panel stacks beneath the
  terminal reply (or collapses to a summary strip); stats section becomes a
  single-column tile stack. No horizontal scroll.

### What this keeps from the shipped build (unchanged)

`data/world-model.public.json` schema · the four redaction states + `public` ·
confidence-band math · falsifiers · ≤2-hop law · Lane-1 local terminal logic
(`tryLocalIntent`) · BaseEcho wiring in `config.js`/`app.js` · tokens.css palette ·
reduced-motion/a11y discipline · never-fake-a-live-feed rule.

### What this removes/replaces

- The current scrolling section layout (hero → index → pass → agent → join) is
  replaced by the two-section structure above. Hero identity line moves into the
  header/stats area; Join returns to being a nav link + `/join.html`.
- The in-page book-expand behavior (index expanding rows inline) is replaced by
  index-drives-terminal.
- The v1 plan's Next.js/LangChain track — shelved entirely (kept in git history
  if ever revisited).

---

## 1. New data file — `data/stats-history.json`

```json
{
  "$comment": "Real recorded monthly snapshots only. Backfilled entries are marked and rendered at reduced weight. Never invent a month.",
  "series": [
    {
      "month": "2026-07",
      "capture": "live",
      "doctrines_published": 4,
      "capabilities_defined": 6,
      "needs_data_sockets": 5,
      "nodes_total": 22
    }
  ]
}
```

Appending a month is a manual (or later, compiler-driven) edit. The chart renders
`series` as-is. One entry = one dot, honestly labelled.

---

## 2. Phases

**Phase A — Data + stats section**
Create `stats-history.json` (per Open Decision #1). Build the stats section:
SVG line chart render-function, metric tiles, maturity-distribution dots, date
chip. All render-functions follow the existing `el()` pattern in `js/model.js`;
CSS in `css/model.css`; any new colors/sizes go into `tokens.css` first.
*Gate: stats section renders from JSON only; removing a field from the JSON removes
it from the page (no hardcoded numbers); nothing identifying anywhere; chart shows
only real months.*

**Phase B — Layout restructure**
Rebuild `<main>` into the two-section structure. Index becomes the sticky left
rail (reusing book data + styles), terminal moves to center stage, right graph
panel scaffolded (empty state: "select a book or ask the agent").
*Gate: desktop three-pane and mobile stacked layouts hold; keyboard traversal
index → terminal → panel works; no regression in ⌘K/mobile menu.*

**Phase C — Index drives terminal**
Wire index clicks to submit structured queries through the existing `sendMessage()`
path. Lane-1 answers render as today (record blocks); BaseEcho answers render as
today (prose), each with the node context. Selection state is set either way.
*Gate: clicking any book/node produces a terminal reply with BaseEcho configured
AND with it fully unconfigured (Lane-1); refusal behavior unchanged.*

**Phase D — Graph panel**
Build the right-panel render: maturity bar, confidence band, redaction chip,
links, date chip — driven by the same selection state. Reuses the existing
component functions (`MaturityBar`, `ConfidenceBand`, `RedactionToken`) rather
than new ones.
*Gate: panel always agrees with the terminal's last answer (one state, two
renders); empty/mismatch states are explicit, never stale.*

**Phase E — Cohesion + launch**
Machine layer sync (`llms.txt`, `agent-context.json`, sitemap ± `stats-history.json`),
OG image re-render if the first fold changed, FMD sweep (cut one accessory,
document it), a11y/perf pass, JSON-404 fallbacks for both new data files.
*Gate: keyboard-only walkthrough; no console errors; both JSONs 404 → readable
fallbacks; stats honesty spot-check (every rendered number traceable to a JSON
field).*

---

## 3. Open decisions

1. **Stats history day-one content** — start recording now (one honest dot) or
   founder-supplied real monthly history (entered as `backfilled`)? *(§0, blocking
   Phase A's chart, not the tiles.)*
2. **Which stats make the cut** — proposed: doctrines_published,
   capabilities_defined, needs_data_sockets, nodes_total, maturity distribution.
   Anything else wanted (e.g., skills count) must already exist in the public JSON
   or be added to it through the same stealth filter.
3. **What happens to The Pass** — keep as an index item that renders the lifecycle
   schematic in the terminal/panel (recommended, fits the new grammar), or keep it
   as a separate page section below.

---

*Plan v2 · static stack retained · BaseEcho retained · build starts on approval.*
