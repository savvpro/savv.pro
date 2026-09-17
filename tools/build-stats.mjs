#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────
   build-stats — the boundary filter for company stats
   ─────────────────────────────────────────────────────────────────────────
   Reads the PRIVATE stats dataset (lives outside this repo; path passed via
   --src) and emits data/stats.public.json: only stealth-safe aggregates.

   Filter rules (same tiers as wm-compile):
     Tier-3, never crosses : any USD value (revenue, cost, rate, per-X dollar),
                             the illustrative benchmark multiplier
     Tier-2, never crosses : human names, agent names, product/repo names
                             (exception list: BaseEcho — already public),
                             per-person attribution of any kind
     Tier-1, ships         : counts, monthly cumulative progression, monthly
                             commit totals (summed across repos AND people),
                             compliance framework alignment counts, sectors

   Provenance is carried per metric: "measured" (git/ledger evidence) vs
   "modeled" (estimated — hours from commits×4h, tokens from LOC×rate). The
   site renders modeled values with an estimate chip at reduced weight; that
   distinction comes from the source's own _meta disclosure, not invented here.

   Leak gate: the deny-list is DERIVED AT RUNTIME from the private source
   itself (every human/agent/repo name found there, minus the exception list)
   and never written to disk. Both scans from wm-compile run over the output
   bytes; any hit = non-zero exit = nothing written.
   ───────────────────────────────────────────────────────────────────────── */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// First leak check: pattern sweep for currency-adjacent digits and emails.
// (Inlined — formerly imported from wm-compile.mjs, since removed.)
const LEAK_PATTERNS = [
  { name: "currency-digit", rx: /[$€£]\s?\d/ },
  { name: "email", rx: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
];
export function dumbLeakScan(text) {
  const hits = [];
  for (const { name, rx } of LEAK_PATTERNS) {
    const m = text.match(rx);
    if (m) hits.push({ check: "dumbLeakScan", pattern: name, sample: m[0] });
  }
  return hits;
}

const PUBLIC_NAME_EXCEPTIONS = ["BaseEcho"];

/* ───────────────────────────────────────────────────────────────────────────
   V2 LIFETIME FIGURES — hardcoded, whole-company scope.
   ───────────────────────────────────────────────────────────────────────────
   Source: the v2 dataset (synthetic-data-v2), refreshed 2026-09-17 by
   pull-git-stats-api.js straight from the GitHub API — 107 repos across
   NullSpaceAI, savvpro and hyonq — versus the 9 hand-listed repos the --src
   dataset still carries. These are pasted rather than read because v2 emits a
   different shape (no capabilities.json / kpis.json, real-git-stats keyed by
   `repos` not `stats`), so --src stays the v1 dataset for everything below
   that v2 doesn't measure: clients, capability + service ledger, compliance
   alignment, sector list, maturity tiers, and the cumulative progression.

   To refresh: re-run v2's pull-git-stats.js + generate.js, then copy from its
   data/company.json — totals.{commits,linesOfCode,tokens,humanHours,products,
   people,skillsEstimated} and the monthly commit series — into this block.
   ─────────────────────────────────────────────────────────────────────────── */
const V2 = {
  window: { start: "2024-09", end: "2026-09", months: 22 },
  commits: 4600,
  linesOfCode: 2548793,
  tokens: 4246289138,   // = linesOfCode × 1666 (modeled rate, same as v1 used)
  humanHours: 18400,    // = commits × 4h
  products: 25,
  // v2 counts committers, so it sees engineers only. The design + research pair
  // (founder/product design, research/systems) ship no commits and stay carried
  // from the v1 roster, which is why humans is the sum rather than v2's own 10.
  engineers: 10,
  designResearch: 2,
  humans: 12,
  agents: 5,
  skills: 3710,         // estimated from LOC across all 107 repos, not ledgered
  // Summed across every repo AND every author — the only aggregation level that
  // can't be reversed into per-person attribution.
  commitsMonthly: [
    { month: "2024-09", commits: 4 },
    { month: "2025-01", commits: 3 },
    { month: "2025-02", commits: 58 },
    { month: "2025-03", commits: 19 },
    { month: "2025-04", commits: 30 },
    { month: "2025-05", commits: 4 },
    { month: "2025-06", commits: 55 },
    { month: "2025-07", commits: 97 },
    { month: "2025-08", commits: 94 },
    { month: "2025-09", commits: 150 },
    { month: "2025-10", commits: 286 },
    { month: "2025-11", commits: 97 },
    { month: "2025-12", commits: 256 },
    { month: "2026-01", commits: 415 },
    { month: "2026-02", commits: 241 },
    { month: "2026-03", commits: 438 },
    { month: "2026-04", commits: 485 },
    { month: "2026-05", commits: 313 },
    { month: "2026-06", commits: 367 },
    // 2026-09 is partial — the pull ran on the 17th — but at 386 it already
    // reads as a normal month, so it is kept rather than dropped.
    { month: "2026-07", commits: 346 },
    { month: "2026-08", commits: 456 },
    { month: "2026-09", commits: 386 },
  ],
};

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function buildDenyList(src) {
  const workforce = readJson(path.join(src, "data", "workforce.json"));
  const kpis = readJson(path.join(src, "data", "kpis.json"));
  const names = new Set();
  for (const h of workforce.humans || []) if (h.name) names.add(h.name);
  for (const d of workforce.designResearch || []) if (d.name) names.add(d.name);
  for (const a of workforce.agents || []) {
    if (a.name) names.add(a.name);
    if (a.alias) names.add(a.alias);
  }
  for (const r of kpis.tokensByRepo || []) if (r.repo) names.add(r.repo);
  for (const ex of PUBLIC_NAME_EXCEPTIONS) names.delete(ex);
  // Drop generic single words that would false-positive ("Awab" is a name and
  // stays; "Unidentified contributors" is a label, not an identity — drop it).
  names.delete("Unidentified contributors");
  return [...names];
}

export function buildStats(src) {
  const company = readJson(path.join(src, "data", "company.json"));
  const capabilities = readJson(path.join(src, "data", "capabilities.json"));
  const workforce = readJson(path.join(src, "data", "workforce.json"));
  const gitStats = readJson(path.join(src, "real-git-stats.json"));

  const t = company.totals;
  const w = workforce.counts;

  // Monthly commit totals come from the V2 block above — --src still holds the
  // 9-repo v1 series, which would contradict the whole-company lifetime counts.
  const commits_monthly = V2.commitsMonthly.map((d) => ({ ...d }));

  // Monthly effort series, both MODELED per the source's own methodology:
  // hours = commits × 4h; tokens = lifetime total distributed proportional
  // to each month's commit share. Aggregated across all projects and people.
  const HOURS_PER_COMMIT = 4;
  const TOKENS_LIFETIME = V2.tokens;
  const commitsTotal = commits_monthly.reduce((a, d) => a + d.commits, 0);
  const effort_monthly = commits_monthly.map((d) => ({
    month: d.month,
    hours: d.commits * HOURS_PER_COMMIT,
    tokens: Math.round(TOKENS_LIFETIME * (d.commits / commitsTotal)),
  }));
  // Per-month rounding leaves the series a few tokens off the lifetime total.
  // Absorb the residual into the busiest month, so the monthly series and the
  // headline figure agree exactly rather than drifting apart on the page.
  if (effort_monthly.length) {
    const residual = TOKENS_LIFETIME - effort_monthly.reduce((a, d) => a + d.tokens, 0);
    if (residual) {
      const busiest = effort_monthly.reduce((a, b) => (b.tokens > a.tokens ? b : a));
      busiest.tokens += residual;
    }
  }

  return {
    $comment:
      "PUBLIC STEALTH-SAFE STATS. Generated by tools/build-stats.mjs from the private dataset — never hand-edited. No names, no products (except BaseEcho as the site's agent), no currency, no per-person attribution. 'modeled' values are estimates disclosed as such by the source (hours = commits × 4h; tokens = LOC × modeled rate).",
    generated_by: "build-stats",
    as_of: V2.window.end,
    window: { ...V2.window },
    sectors: company.sectors || [],
    compliance: {
      frameworks: (company.compliance && company.compliance.frameworks) || [],
      services_total: company.compliance ? company.compliance.servicesTotal : null,
      services_finra_aligned: company.compliance ? company.compliance.servicesFinraAligned : null,
      services_hipaa_aligned: company.compliance ? company.compliance.servicesHipaaAligned : null,
    },
    counts: [
      { id: "ST-HUMANS", label: "humans", value: V2.humans, capture: "measured" },
      { id: "ST-ENGINEERS", label: "engineers", value: V2.engineers, capture: "measured" },
      { id: "ST-DESIGN", label: "design_research", value: V2.designResearch, capture: "measured" },
      { id: "ST-AGENTS", label: "agents", value: V2.agents, capture: "measured" },
      { id: "ST-PRODUCTS", label: "products", value: V2.products, capture: "measured" },
      // Client/capability/service taxonomy is not derivable from git — still --src.
      { id: "ST-CLIENTS", label: "clients", value: t.clients, capture: "measured" },
      { id: "ST-COMMITS", label: "commits", value: V2.commits, capture: "measured" },
      { id: "ST-LOC", label: "lines_of_code", value: V2.linesOfCode, capture: "measured" },
      // v1 ledgered skills against 4-of-5 products; v2 estimates them from LOC
      // across all 86 repos, so the capture tier drops to modeled.
      { id: "ST-SKILLS", label: "skills", value: V2.skills, capture: "modeled" },
      { id: "ST-CAPS", label: "capabilities", value: t.capabilities, capture: "measured" },
      { id: "ST-SERVICES", label: "services", value: t.services, capture: "measured" },
      { id: "ST-HOURS", label: "human_hours", value: V2.humanHours, capture: "modeled" },
      { id: "ST-TOKENS", label: "tokens_consumed", value: V2.tokens, capture: "modeled" },
    ],
    maturity_tiers: capabilities.tiers || [],
    progression: (capabilities.progression || []).map((p) => ({
      month: p.month,
      skills: p.skillsCumulative,
      capabilities: p.capabilitiesCumulative,
      services: p.servicesCumulative,
    })),
    commits_monthly,
    effort_monthly: {
      capture: "modeled",
      note: "hours = commits × 4h; tokens = lifetime total distributed by monthly commit share — estimates, aggregated across all projects and people",
      series: effort_monthly,
    },
  };
}

// Independent second check (different code path from dumbLeakScan): literal
// substring sweep with the runtime-derived deny list.
export function scanForNames(text, denyList) {
  const hits = [];
  for (const entry of denyList) {
    if (text.includes(entry)) hits.push({ check: "scanForNames", sample: entry });
  }
  return hits;
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
}

if (isMain()) {
  const args = process.argv.slice(2);
  const opt = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
  const src = opt("--src");
  const out = opt("--out");
  if (!src || !out) {
    console.error("build-stats: --src <private-dataset-dir> --out <public-json> required");
    process.exit(1);
  }

  const stats = buildStats(src);
  const jsonText = JSON.stringify(stats, null, 2);
  const denyList = buildDenyList(src);
  const hits = [...dumbLeakScan(jsonText), ...scanForNames(jsonText, denyList)];

  console.log(
    JSON.stringify(
      {
        as_of: stats.as_of,
        counts_emitted: stats.counts.length,
        progression_months: stats.progression.length,
        commit_months: stats.commits_monthly.length,
        deny_list_entries: denyList.length,
        leak_scan: hits.length ? "FAIL" : "PASS",
        leak_hits: hits,
      },
      null,
      2
    )
  );

  if (hits.length) {
    console.error("build-stats: LEAK GATE FAILED — nothing written.");
    process.exit(1);
  }
  fs.writeFileSync(out, jsonText + "\n");
  console.log("build-stats: wrote " + out);
}
