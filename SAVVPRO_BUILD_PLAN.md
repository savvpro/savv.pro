# SavvPro — Website Rebuild Plan

**The open kitchen: a redacted render of the world model.**
Version 1.0 · build plan for Claude Code · work one phase at a time.

---

## 0. How to use this document

This is a phased spec. Each phase is **independently shippable** and ends with an
**acceptance gate** — a checklist Claude Code (and you) can verify before starting
the next phase. Do not start phase *N+1* until phase *N*'s gate is green. Treat the
acceptance criteria the way the world model treats its stage gates in the thesis:
the next stage doesn't begin until this one is locked.

Hand Claude Code **one phase at a time**, plus sections 1–6 as standing context (the
concept, constraints, IA, data contract, design system, and guardrails apply to every
phase). When a phase says "files touched," that's the expected blast radius — if a
change wants to sprawl beyond it, stop and reconsider.

---

## 1. The concept, locked

**One sentence:** the website does not *describe* the world model — it **is** a public,
redacted render of one, passed through SavvPro's own boundary filter, and the redaction
is the product demo.

This is the open-kitchen metaphor made literal. The visitor stands on the customer side
of the glass:

| Open kitchen | On the site | Source in the model |
|---|---|---|
| The chef's torso & hands (visible) | The **structure, discipline, and motion** — six books, the ≤2-hop index, confidence bands, falsifiers, the lifecycle loop | Books I–VI; the discipline rules; the lifecycle state machine |
| The dish (covered) | The **contents** — real capabilities, client identities, commercials, financials | Tier-2 / Tier-3 of the boundary filter; `needs_data` sockets |
| The glass itself | The **boundary filter** rendering signal-but-not-substance | §6 Relationships — the Meridian three-tier redaction layer |

**The signature element** (spend your boldness here, keep everything else quiet): the
**boundary-filter glass** — the redaction system that renders a node's shape, score, and
provenance while honestly withholding its contents, and explains *why* on inspection.
Nothing else on the page competes with it.

### Three non-negotiables

These are guardrails, not preferences. Each prevents a specific failure.

1. **Ship only the redacted artifact.** The browser must never receive the real data and
   hide it with CSS. The redaction happens at *authoring time*, in the repo. `data/world-model.public.json`
   contains only what is safe to publish; the blanks are blank *in the file*. View-source
   reveals the shape and nothing more. This is both the security model and the concept: the
   site is an *instance of the boundary filter's output*.
2. **Form must not exceed meaning (the FMD gate).** Every visual device must encode
   something true. No decorative animation, no graph for the sake of a graph, no coined
   label that a plain word would carry. If a flourish doesn't make the model more legible,
   cut it. (A plan about the FMD gate that violates the FMD gate would be embarrassing.)
3. **Never fake live data.** Motion that implies a live production feed (signals arriving,
   tickets flowing) must be explicitly labelled as a **schematic of the mechanism**, not
   dressed as a live feed. Evidence over assertion applies to the website too.

---

## 2. Constraints & invariants

Carry these into every phase.

- **No build step. Vanilla JS. No framework.** Same as today — plain `.html`, `.css`, `.js`,
  any static host. Components are render-functions that return DOM, using the existing
  `el()` / `$` / `$$` helpers in `app.js`. Do not introduce React, a bundler, or npm.
- **Tokens first.** No magic numbers. New colours/sizes/timings go in `css/tokens.css` and
  are referenced as `var()`. This rule already exists in the repo — honour it.
- **≤2-hop retrieval is a UI law, not a slogan.** Any node is reachable from the index in
  two clicks or fewer: index → artifact (1 hop) → record by ID (2 hops). The UI shows the
  hop count. If something needs a third hop, the IA is wrong.
- **Two registers.** Mono (IBM Plex Mono) = operational register (function-denoting, machine-
  legible). Serif/sans = public register (the human voice). The split is meaningful, not stylistic.
- **Accessibility floor, every phase:** responsive to mobile, visible keyboard focus,
  `prefers-reduced-motion` respected, semantic landmarks, ARIA on interactive nodes, all
  redaction state available to screen readers (not colour-only).
- **Machine-readable layer stays in sync.** `llms.txt`, `agent-context.json`, and the
  structured-data blocks must describe the new model, not the old site. Treat them as a first-
  class surface (they already are in your stack), updated in the phase that changes the model.

### Aesthetic correction (read once, then internalise)

Your current `tokens.css` self-describes as "Brutalist Terminal × Swiss": cream paper, mono
display, hairline rules, zero radius, numbered sections. That is close to two of the looks AI
design tooling produces by default. The redesign **keeps your discipline** (right angles, ruled
structure, mono as structure, no gradients) but earns distinctiveness from the *subject*, not
from leaning harder on brutalism. The thing that makes this page unmistakably SavvPro is the
**glass** — redacted cells that explain their own redaction — not the typeface. Spend nothing on
decoration; spend everything on making the boundary filter legible and a little uncanny.

Two specific adjustments:
- **Numbering encodes truth or it goes.** The six books carry canonical numerals (I–VI) because
  they're a fixed taxonomy — that's legitimate. But drop decorative `00 / 01 / 02` section
  counters where the order carries no information.
- **The hero is the model, not a sentence.** The first thing above the fold is a live (client-
  side-rendered, statically-sourced) slice of the redacted model with at least one visibly
  redacted cell. The tagline is secondary.

---

## 3. Information architecture

The whole site reorganises around the **six books** from the thesis. Your existing sections
don't get thrown away — they get re-slotted into the books they always belonged to.

| Book | Question family | Absorbs from current site | Render state |
|---|---|---|---|
| **I · Constitution** | Who are we; how do we decide? | Hero identity, the "three architectural decisions" (Position), the four doctrines (Read/library) | Mostly public — this is the register that *is* shippable |
| **II · Capability Ledger** | What can we do, how well? *(the IP)* | (new) — counts + redacted capability nodes | Shape visible, contents redacted |
| **III · Resource Ledger** | Who/what holds the ability? | The Join page, reframed as a surfaced gap + hiring brief | Roles visible, identities hashed |
| **IV · Live State** | What's true now — broken, in flight, costing what? | `org-state.json` stats, reframed | Counts visible, specifics `needs_data` |
| **V · Relationships** | Whom do we serve, through whom? | (new) — the partner boundary itself | Signal visible, identity/commercials redacted |
| **VI · Foresight** | Where are we exposed; what's next? | (new) — one redacted risk, the trajectory | Posture visible, specifics redacted |

### The new sitemap

```
/ (index)
  ├─ Hero: redacted-model render (the glass, live above the fold)
  ├─ The Index: six books, each a ≤2-hop entry point
  ├─ Book detail (in-page expand or /book/<id>) → nodes
  │     └─ Node record (in-page panel) → id · confidence band · falsifier · provenance · [redacted contents]
  ├─ The Pass: lifecycle loop (schematic, labelled)
  ├─ The Agent: query window onto the redacted model
  └─ Footer: signal links, machine-readable endpoints, legal
/join          → Book III: the gap made explicit (kept, reframed)
/privacy /terms → unchanged
/data/world-model.public.json → the artifact the whole site renders (new, public endpoint)
/data/org-state.json → kept, now a subset of the model
/llms.txt /agent-context.json → updated to describe the model
```

**≤2-hop proof:** index → book (hop 1) → node record (hop 2). The agent can also jump straight
to any node record by ID (still ≤2 hops conceptually). If you ever need three, the model's
index is wrong, not the UI.

---

## 4. The data contract — `data/world-model.public.json`

This is the linchpin. Everything renders from it. Author it by hand (or export your real model
through the boundary filter); **it contains only publishable, already-redacted content.**

### 4.1 Top-level shape

```json
{
  "$comment": "PUBLIC REDACTED RENDER. Authored through the boundary filter. Contains no Tier-2 (identity) or Tier-3 (commercial) substance. Blanks are intentional.",
  "version": "0.2",
  "phase": "stealth",
  "last_revised": "2026-06-29",
  "registers": { "public": "rhetoric allowed", "operational": "function-denoting" },
  "books": [ /* six book objects */ ],
  "nodes": [ /* flat list, referenced by id — keeps retrieval ≤2 hops */ ],
  "lifecycle": [ /* ordered stage objects for The Pass */ ],
  "counts": { "skills": 25, "capabilities": 12, "services": 6, "doctrines": 4 }
}
```

### 4.2 A book object

```json
{
  "id": "BOOK-II",
  "numeral": "II",
  "name": "Capability Ledger",
  "question": "What can we do, and how well?",
  "class": "semi-authored",
  "public_line": "Durable value is repeatable, measured capability — not output.",
  "node_ids": ["CAP-01", "CAP-02", "CAP-03"]
}
```

### 4.3 A node object — the unit the glass renders

Every node carries the same envelope so the renderer is uniform. **`contents` is where redaction
lives**, and its value is a *redaction token object*, never real substance.

```json
{
  "id": "CAP-01",
  "book": "BOOK-II",
  "type": "capability",                 // skill | capability | service | client | risk | role | trajectory
  "label": "Agentic architecture",      // public register — safe to show
  "operational": "C01 · agentic_architecture",  // the mono backing line (compile-down target)
  "maturity": { "value": 0.6, "of": 1 },        // 0..1, drives the bar; omit if needs_data
  "confidence": { "value": 0.55, "band": 0.25 },// band widens in low data; see 4.5
  "falsifier": "If repeated outputs don't raise a measured score, this is project work, not capability.",
  "provenance": "derived",              // authored | semi-authored | derived | semi-derived
  "contents": {                          // REDACTION TOKEN — not real data
    "status": "compartmentalised",       // see 4.4
    "tier": 2,
    "reason": "Capability internals are proprietary IP."
  },
  "links": ["RISK-001"]                  // related node ids (still ≤2 hops via record panel)
}
```

### 4.4 Redaction token vocabulary (the four states of the glass)

The renderer maps each to a distinct, **self-explaining** cell. Per the design skill: emptiness is
an invitation and a statement of *why*, never mood/mystery.

| `status` | Meaning | Visual | On inspect (hover/focus) |
|---|---|---|---|
| `compartmentalised` | Substance exists, withheld by tier | Filled bar/shape + token chip over the value | "compartmentalised · Tier-N · &lt;reason&gt;" |
| `hashed` | Identity, shown as stable opaque id | `CLIENT-7a3f` mono token | "identity · Tier-2 · hashed, stable per entity" |
| `boundary` | Never crosses the partner line | Structurally absent cell, ruled placeholder | "boundary · Tier-3 · commercials never render" |
| `needs_data` | Deliberately empty socket, awaiting real volume | Dotted outline, low-confidence band | "needs_data · awaiting real signal · widens the band, not lowered the score" |

Tiers (from the thesis): **Tier-1 signal** = visible (shape, score, motion). **Tier-2 identity** =
hashed. **Tier-3 commercials** = never rendered.

### 4.5 Confidence band rule (honest stealth)

Low data **widens the band before it lowers the score**. Sparseness reads as low confidence, not
low competence. Render the band as a visible range around the value; in stealth most bands are wide,
and that wide band is presented as *integrity*, not weakness. A node with `needs_data` shows a near-
full-width band.

### 4.6 Authoring rules (how to fill this without leaking)

A short checklist for whoever writes the JSON — this *is* the boundary filter, run by hand:

- A field ships only if it's Tier-1 signal (capability/relationship shape, scores, provenance,
  falsifiers, public-register lines).
- Any client or partner identity → `hashed`, never the real name.
- Any number with a currency, margin, rate, or headcount-as-cost → `boundary`, omitted entirely.
- If you don't have real signal yet, write `needs_data` — never invent a value to look further along.
  (The thesis calls invented precision the exact failure the model exists to prevent.)
- Every node must have a `falsifier` or a reason it can't — a claim with no falsifier is a defect.

---

## 5. Design system additions

### 5.1 Tokens to add (`css/tokens.css`)

```css
:root {
  /* Glass / redaction */
  --glass-fill:    rgba(15,17,38,0.06);   /* compartmentalised cell wash */
  --glass-rule:    rgba(15,17,38,0.28);   /* boundary placeholder rule */
  --glass-chip:    var(--ink);            /* redaction chip text */
  --glass-chip-bg: rgba(15,17,38,0.08);
  --hash:          var(--blue);           /* hashed-id tokens use the signal colour */
  --needs:         var(--muted);          /* needs_data dotted outline */

  /* Confidence band */
  --band-track:    rgba(15,17,38,0.10);
  --band-fill:     var(--blue);
  --band-range:    rgba(29,62,221,0.18);  /* the widening range */

  /* Register cue */
  --reg-op:        var(--font-mono);      /* operational register */
  --reg-pub:       var(--font-sans);      /* public register */

  /* Motion (additions) */
  --t-glass:       180ms;                 /* token reveal on hover/focus */
  --t-compile:     320ms;                 /* compile-down resolve */
}
```

### 5.2 Component inventory

Build each as a render-function returning DOM (mirror the existing `el()` pattern). Put their CSS
in a **new `css/model.css`**, linked after `style.css`, so phase diffs stay isolated.

| Component | Renders | Phase |
|---|---|---|
| `Index` | The six books as a ruled, ≤2-hop entry list with hop indicator | 1 |
| `RedactionToken` | The four-state self-explaining cell (4.4) | 2 |
| `NodeRow` | A node line: label · maturity bar · band · redaction token | 1→3 |
| `ConfidenceBand` | Value + widening range (4.5) | 3 |
| `NodeRecord` | The hop-2 panel: id, operational line, falsifier, provenance, links | 3 |
| `CompileLine` | Public-register sentence that resolves to its operational backing | 4 |
| `RegisterToggle` | Switch a region between public ⇄ operational | 4 |
| `ThePass` | The lifecycle loop, labelled schematic, find≠verify≠fix shown | 5 |
| `AgentPanel` | The reframed terminal (query window onto the model) | 6 |

---

## 6. Cross-cutting principles

- **Motion discipline.** One orchestrated moment beats scattered effects. The page-load reveal of
  the model and the compile-down are the two motions that matter. Everything else is static. All
  motion gated behind `prefers-reduced-motion`.
- **Copy voice.** Operational register is plain and function-denoting; public register may carry
  rhetoric but must pay for it. Errors and empty states give direction, not apology or mood. A
  redacted cell tells you *why it's redacted*, in the model's voice.
- **Don't decorate the structure.** Rules, labels, and numerals must encode something true (a book
  numeral is real; a section counter usually isn't).
- **Keep the agent honest.** It answers in operational register, in ≤2 hops, and *refuses on
  principle, visibly* rather than improvising. A precise refusal is more impressive than a guess.

---

## 7. The phases

Each phase: **Goal · Why · Files · Tasks · Acceptance gate.**

---

### Phase 0 — Foundations (no visible change)

**Goal.** Lock the data contract and design primitives so every later phase has solid ground.

**Why.** De-risks the whole build. The contract (§4) is the linchpin; settle it before any pixel
depends on it.

**Files.** `data/world-model.public.json` (new), `css/tokens.css` (add §5.1), `css/model.css`
(new, empty scaffold), link `model.css` in `index.html` after `style.css`.

**Tasks.**
1. Author `world-model.public.json` per §4: six books, the four doctrines as Book-I nodes, 4–6
   seed nodes for Book II, one `RISK-001` node for Book VI, one hashed client + one `boundary`
   commercial cell for Book V, the lifecycle array, and `counts`. Use real falsifiers from the
   thesis where they exist.
2. Fold the current `org-state.json` fields into the model as Book IV nodes (keep `org-state.json`
   as a published subset endpoint for back-compat).
3. Add the §5.1 tokens. Add `model.css` and link it.
4. Write a 6-line authoring header comment in the JSON restating §4.6 so future edits stay safe.

**Acceptance gate.**
- [ ] `world-model.public.json` validates as JSON and contains zero Tier-2/Tier-3 substance (manual
      boundary-filter read against §4.6).
- [ ] Every node has an `id`, a `book`, a `contents` redaction token, and a `falsifier` (or a stated
      reason it can't).
- [ ] `model.css` loads; `tokens.css` has the new vars; site renders unchanged otherwise.

---

### Phase 1 — The Index (the spine)

**Goal.** Replace the body of the home page with the six-books index that reads the model, with
≤2-hop navigation and a visible hop indicator. Static render first — no glass effects yet.

**Why.** This is the new skeleton and the ≤2-hop law made physical. Everything hangs off it.

**Files.** `index.html` (restructure `<main>`), new `js/model.js` (load + render), `css/model.css`,
`js/app.js` (call model init from `boot()`).

**Tasks.**
1. `js/model.js`: `loadModel()` fetches `world-model.public.json` (graceful fallback like the
   existing `loadOrgState`), then `renderIndex()` builds the six books as ruled rows: numeral ·
   name · question · node count. Each book expands (in-page) to its `NodeRow`s.
2. Show a **hop indicator** (e.g. `hop 0 · index` → `hop 1 · book` → `hop 2 · record`) so the
   retrieval contract is legible.
3. Re-slot existing content: doctrines → Book I nodes; the three "architectural decisions" → Book I
   public lines; stats → Book IV. Remove the now-absorbed standalone sections.
4. Keep the hero present but make its content a placeholder slot for the Phase-2 glass render.

**Acceptance gate.**
- [ ] All six books render from the JSON; counts match `counts`.
- [ ] Any node reachable in ≤2 clicks from the index; hop indicator reflects depth.
- [ ] Keyboard: books are focusable, expandable via Enter/Space, focus visible.
- [ ] Mobile layout holds; no horizontal scroll.
- [ ] If the JSON fails to load, a readable fallback renders (no blank page).

---

### Phase 2 — The boundary filter / glass (the signature)

**Goal.** Implement `RedactionToken` — the four-state, self-explaining cell — and render the hero as
a live redacted slice with at least one visibly redacted cell above the fold.

**Why.** This is the one memorable thing. It carries the whole concept. Get it right; keep
everything around it quiet.

**Files.** `js/model.js` (add `RedactionToken`, wire into `NodeRow`), `css/model.css`, `index.html`
(hero slot).

**Tasks.**
1. Build `RedactionToken(contents)` → the correct visual per §4.4, with an accessible inspect
   affordance (hover **and** focus; tooltip content also in `aria-label`/visually-hidden text).
2. Wire it into `NodeRow` so every node shows shape + score + its redaction state.
3. Hero: render 2–3 real nodes from the model, at least one `compartmentalised` and one `boundary`,
   with a single public-register line: the site is this firm's own model, shown through its boundary
   filter — structure public, contents compartmentalised by design.
4. Micro-interaction only: token chip resolves its reason on hover/focus over `--t-glass`. No other
   motion.

**Acceptance gate.**
- [ ] All four redaction states render distinctly and are distinguishable without colour (shape/text too).
- [ ] Reason text is reachable by keyboard and announced to screen readers.
- [ ] Hero shows ≥1 compartmentalised and ≥1 boundary cell above the fold on desktop and mobile.
- [ ] View-source confirms **no** real substance is present in the DOM or JSON for redacted cells.
- [ ] `prefers-reduced-motion`: token reason still reachable, just without the transition.

---

### Phase 3 — Node record & ≤2-hop traversal

**Goal.** Clicking a node opens its record (hop 2): id, operational line, confidence band, falsifier,
provenance, and links to related nodes. Build `ConfidenceBand` and `NodeRecord`.

**Why.** This is where rigor becomes inspectable — the chef's hands, up close. The band and falsifier
are the most on-brand, most disarming details you have.

**Files.** `js/model.js` (`ConfidenceBand`, `NodeRecord`, link handling), `css/model.css`.

**Tasks.**
1. `ConfidenceBand`: value marker + widening range per §4.5. `needs_data` → near-full-width band.
2. `NodeRecord` panel (in-page, not a new URL): id, mono operational line, band, falsifier text,
   provenance label, redaction token for contents, and `links` rendered as ≤2-hop jumps to other records.
3. Ensure traversal never exceeds 2 hops from the index; a link from one record to another replaces
   the panel rather than deepening it.

**Acceptance gate.**
- [ ] Every node opens a record with all fields; missing fields degrade gracefully (no `undefined`).
- [ ] Confidence bands visibly widen for low-confidence / `needs_data` nodes.
- [ ] Falsifier is shown for every node that has one; absence is explicit, not silent.
- [ ] Related-node links resolve in one move and keep the hop count honest.
- [ ] Panel is keyboard-operable and focus-trapped while open; Esc closes; focus returns to trigger.

---

### Phase 4 — Two registers & compile-down (the wow, earned)

**Goal.** The signature interaction: a public-register sentence resolves into its operational backing.
Add `CompileLine` and `RegisterToggle`.

**Why.** It makes your epistemics physical — watching rhetoric "compile" to evidence. Built on real
data from Phases 1–3, so it's substance, not theatre.

**Files.** `js/model.js` (`CompileLine`, `RegisterToggle`), `css/model.css`.

**Tasks.**
1. `CompileLine(node)`: renders `label` (public, serif/sans) and, on scroll-into-view **or** hover/
   focus, resolves to `operational` (mono) over `--t-compile`. Reduced-motion: show both stacked, no
   animation.
2. `RegisterToggle`: a control that flips a region between public and operational for the whole index
   at once, for readers who want one mode.
3. Apply `CompileLine` to the hero line and Book-I doctrine nodes first; don't over-apply — a few
   well-placed compiles beat the whole page twitching.

**Acceptance gate.**
- [ ] Compile resolves smoothly and is fully readable in both end states.
- [ ] Register toggle flips all applicable regions and persists within the session (in-memory only).
- [ ] Reduced-motion path shows both registers without movement.
- [ ] No layout shift / reflow jank during compile (reserve space).

---

### Phase 5 — The Pass (lifecycle, schematic)

**Goal.** Render the lifecycle loop — Engage ▶ Offer ▶ Originate ▶ Deliver ▶ Run&Grow ▶ Compound —
as an ambient schematic with anonymised tickets, the find≠verify≠fix invariant visible, **explicitly
labelled as a schematic of the mechanism, not a live feed.**

**Why.** Shows the hands moving without faking production data. The label is what keeps it honest
(non-negotiable #3).

**Files.** `js/model.js` (`ThePass`, reads `lifecycle`), `css/model.css`.

**Tasks.**
1. `ThePass`: the six stages as a rail; tickets are `ENG-•••` placeholders that advance on a slow
   ambient loop. Caption, always visible: this is the shape of the loop; the live feed is
   compartmentalised.
2. Visibly enforce the integrity invariant: the actor who finds a defect ≠ verifies ≠ fixes —
   render the three roles as distinct on each ticket.
3. Gate motion behind reduced-motion; static fallback shows the loop shape without animation.

**Acceptance gate.**
- [ ] The schematic label is present and unmissable; nothing implies a live production feed.
- [ ] Stages and the find≠verify≠fix split read correctly.
- [ ] Reduced-motion: static, legible loop.
- [ ] No runaway timers / CPU when the tab is backgrounded (pause on `visibilitychange`).

---

### Phase 6 — The agent, reframed

**Goal.** Convert the terminal from a lead-capture chatbot into a **query window onto the redacted
model**: answers in operational register, ≤2 hops, cites node IDs, refuses on principle. Soften the
gated intake.

**Why.** A bot that interrogates the visitor and improvises is the old default. A window that returns
a real (redacted) node and *declines precisely* is on-brand and rarer.

**Files.** `js/app.js` (terminal section: copy, intake flow, fallback, and — if BaseEcho stays — the
system framing sent server-side), `index.html` (agent section copy), optionally `agent-context.json`.

**Tasks.**
1. Reframe copy: the agent queries the model; ask it what SavvPro can do and it returns a capability
   node (label, maturity bar, band, falsifier, `contents: compartmentalised`), not a paragraph.
2. Make intake **optional and after-the-fact** — don't gate the model behind name/email/phone. Offer
   contact capture only once the visitor signals intent.
3. Rewrite the offline/placeholder fallback so even with no live brain it answers from
   `world-model.public.json` (a thin client-side lookup that returns the matching node record).
4. On out-of-bounds questions (commercials, client identity), refuse in the operational register with
   the tier and reason — a visible, principled `[boundary]`.
5. Keep the on-brand shell easter eggs that still fit; cut any that now read as costume.

**Acceptance gate.**
- [ ] Asking "what can SavvPro do?" returns a node record, not prose.
- [ ] A commercial/identity question yields a precise, principled refusal (tier + reason).
- [ ] The model is fully usable **without** completing intake.
- [ ] With BaseEcho unconfigured, the local fallback still answers from the JSON.
- [ ] No regression in ⌘K, mobile menu, or other `app.js` concerns.

---

### Phase 7 — Cohesion, machine layer, launch

**Goal.** Final pass: machine-readable layer in sync, FMD sweep, accessibility/performance/SEO,
launch checklist.

**Why.** The model's discipline includes its own audit gates. This is the website's gate.

**Files.** `llms.txt`, `agent-context.json`, structured-data blocks in `index.html`, `sitemap.xml`,
`css/*`, `js/*` (cleanup), `og.svg`/`og.png` if the hero changed.

**Tasks.**
1. Update `llms.txt` and `agent-context.json` to describe the six-book model and the public render
   endpoint; add `world-model.public.json` to the signal links and sitemap.
2. **FMD sweep:** walk every component and cut one accessory (Chanel rule). Remove any animation,
   label, or device that doesn't make the model more legible. Note what you cut and why.
3. A11y audit: landmarks, focus order, contrast, reduced-motion across all phases, screen-reader pass
   on redaction tokens and the record panel.
4. Performance: no layout shift, lazy-init the Pass, pause ambient motion when hidden, check first
   paint on mobile.
5. Security: confirm the BaseEcho token's domain allowlist is set to `savv.pro` only and rate-limited
   (carried over from the earlier review).
6. Refresh OG image if the hero is now the glass.

**Acceptance gate.**
- [ ] `llms.txt` / `agent-context.json` / structured data describe the *current* model.
- [ ] One documented "cut an accessory" pass completed.
- [ ] Keyboard-only walkthrough of the whole site succeeds; reduced-motion honoured everywhere.
- [ ] No console errors; graceful fallback if the JSON 404s.
- [ ] Token allowlist confirmed.

---

## 8. Guardrails & non-goals (pin to every phase)

- **Don't** ship real data and hide it with CSS. Redact at authoring time, in the JSON.
- **Don't** fake a live feed. Schematics are labelled as such.
- **Don't** add a framework, bundler, or build step.
- **Don't** let a visual device exist without encoding something true (FMD gate).
- **Don't** gate the model behind a contact form.
- **Don't** build a flashy floating force-graph because it looks "AI"; the typographic, ruled index
  *is* the graph, and it matches your discipline. A literal node-graph view is optional and only if it
  earns its place — default to not.
- **Don't** spend boldness anywhere but the glass.

---

## 9. Appendix

### 9.1 Redaction token glossary (for copy + screen readers)

- **compartmentalised** — substance exists, withheld by tier. *"Internals are proprietary IP."*
- **hashed** — identity shown as a stable opaque id (`CLIENT-7a3f`). *"Stable per entity, not the real name."*
- **boundary** — never crosses the partner line. *"Commercials never render."*
- **needs_data** — deliberately empty, awaiting real signal. *"Sparseness widens the band, it doesn't lower the score."*

### 9.2 Voice cheat-sheet

- Operational register (mono): `C01 · agentic_architecture · maturity ▓▓▓░ · conf 0.6 ±0.25 · DRI [hashed]`
- Public register (serif/sans): "Durable value is repeatable, measured capability — not output."
- Refusal: "boundary · Tier-3 · commercials never cross the partner line."

### 9.3 Suggested commit/PR cadence

One PR per phase, titled `phaseN: <name>`, with the acceptance gate pasted into the description as a
checklist. Merge only when every box is checked — the same gate discipline the model uses on itself.

---

*Plan v1.0 · build on the existing vanilla-JS repo · reuse `tokens.css` · one phase at a time.*
