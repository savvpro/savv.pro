# Visual Identity Supplement

**SavvPro — Internal Design Standard**
*Version 1.0 — May 2026*

---

## Purpose

This document formalizes SavvPro's visual identity — translating the directional principles established in PART X of the Core Operating Document into specific, implementable decisions: exact color values, typeface selections, typography scale, spacing system, logo usage rules, and component principles.

Every visual decision documented here is derived from SavvPro's operating philosophy. This is not aesthetic preference. The visual language is a direct expression of what the organization is: an intelligence system operating at the intersection of human judgment and machine precision. The design must be legible to both.

This document is the authority for all visual execution — savv.pro, published Doctrine pages, partner materials, and any public-facing surface bearing the SavvPro identity.

---

## Design Direction: Terminal Intelligence

The SavvPro aesthetic is **Terminal Intelligence** — the visual language of a system that thinks. It draws from the precision of developer tooling, the clarity of data interfaces, and the deliberate restraint of organizations that let their work speak rather than their packaging.

It is not dark mode for aesthetic trend. It is dark because depth and intelligence read as dark — because the interface should feel like looking into something, not onto something. It is precise because imprecision in any element signals imprecision in the thinking underneath.

Three principles govern every visual decision:

**Function before decoration.** No visual element exists without a purpose. If removing an element does not make something harder to understand, the element does not belong. Whitespace is structural, not decorative.

**Data is visible.** The organization measures everything, and the visual language reflects this. Numbers, metrics, and structured information are visually prominent — treated as content, not as supporting detail.

**The duality is intentional.** The coexistence of monospace and sans-serif typefaces, of machine-precise elements and human-readable prose, reflects the human-agent operating model. The design should feel like it was made by humans who think in systems.

---

## Color System

### Primary Palette

The color system is built on a dark primary field with a single, precisely used signal color. The field provides depth. The signal provides direction.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Base | Void | `#080B10` | Page background, deepest surfaces |
| Surface | Deep Navy | `#0F1520` | Cards, panels, elevated containers |
| Overlay | Slate | `#1A2535` | Modals, dropdowns, secondary surfaces |
| Border | Wire | `#243044` | Dividers, borders, structural lines |
| Signal | Cyan | `#00C8F0` | Primary accent — links, active states, highlights |
| Signal Dim | Cyan Muted | `#0097B8` | Hover states, secondary signal |

### Content Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary Text | Ice | `#F0F4F8` | Body copy, headings, primary content |
| Secondary Text | Ash | `#8899AA` | Captions, metadata, supporting text |
| Tertiary Text | Smoke | `#4A5568` | Disabled states, placeholders |
| Inverse | Void | `#080B10` | Text on light/accent backgrounds |

### Semantic Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Positive | Green | `#10C98A` | Success states, positive metrics, upward trends |
| Warning | Amber | `#F5A623` | Caution states, degraded performance |
| Critical | Red | `#E84040` | Errors, failures, critical alerts |
| Neutral | Steel | `#5A7080` | Inactive states, neutral tags |

### Usage Rules

The Cyan signal color (`#00C8F0`) is used sparingly and intentionally. It marks what matters — the active element, the key metric, the primary action. It is never used decoratively. Every instance of Cyan on a page should be justifiable: this is the thing you need to notice.

No gradients are used decoratively. The only permitted gradient is a subtle depth gradient on large background surfaces — from `#080B10` at the top to `#0A0E15` at the bottom — creating a sense of depth without pattern.

No color outside this palette is introduced without a documented reason and a version update to this document. Brand consistency is maintained by constraint, not by style guides that nobody enforces.

### Light Context Usage

SavvPro's primary surfaces are dark. Where a light context is required — printed materials, certain partner documents, email — the palette inverts:

| Role | Hex | Usage |
|---|---|---|
| Background | `#F8FAFB` | Page/document background |
| Surface | `#FFFFFF` | Cards, containers |
| Border | `#E2E8F0` | Dividers, borders |
| Primary Text | `#0F1520` | Body copy (Deep Navy — the same as dark mode surface) |
| Secondary Text | `#4A5568` | Supporting text |
| Signal | `#0097B8` | Accent (Cyan Muted — slightly deeper for light contrast) |

---

## Typography System

### Typeface Selections

SavvPro uses three typefaces, each with a specific role. All three are available under open licenses and require no commercial font licensing.

**Space Grotesk** — Display and headings
*Source: Google Fonts | License: SIL Open Font License*

Space Grotesk is a geometric sans-serif with subtle quirks that prevent it from reading as corporate or generic. It has the structural precision of a technical instrument while remaining distinctly human. It is used for all headings, display text, and named labels. It communicates: deliberate, modern, systems-oriented.

**Inter** — Body and prose
*Source: Google Fonts | License: SIL Open Font License*

Inter was designed specifically for screen legibility at small sizes. It is neutral in the best sense — it does not draw attention to itself, it serves the content. It is used for all body copy, descriptions, and running prose. Where Space Grotesk signals, Inter delivers.

**JetBrains Mono** — System and data elements
*Source: JetBrains / Google Fonts | License: SIL Open Font License*

JetBrains Mono is a monospace typeface designed by a developer tools company for developer tools. It has exceptional legibility at small sizes and a precision that no proportional typeface can match for data, code, and system elements. It is used for all identifiers, metric values, timestamps, tags, status indicators, code blocks, and structural labels. It is the machine voice in the duality.

### Typography Scale

The scale uses a base of 16px with a 1.25 ratio (Major Third). All values are expressed in rem for accessibility.

| Token | Size | Line Height | Weight | Typeface | Usage |
|---|---|---|---|---|---|
| `display-xl` | 3.052rem (48.8px) | 1.1 | 700 | Space Grotesk | Hero headings, cover titles |
| `display-lg` | 2.441rem (39px) | 1.15 | 700 | Space Grotesk | Section headings, page titles |
| `display-md` | 1.953rem (31.2px) | 1.2 | 600 | Space Grotesk | Sub-headings, card titles |
| `display-sm` | 1.563rem (25px) | 1.25 | 600 | Space Grotesk | Component headings |
| `body-lg` | 1.125rem (18px) | 1.7 | 400 | Inter | Lead paragraphs, introductory copy |
| `body-md` | 1rem (16px) | 1.65 | 400 | Inter | Standard body copy |
| `body-sm` | 0.875rem (14px) | 1.6 | 400 | Inter | Captions, footnotes, secondary copy |
| `label-lg` | 0.875rem (14px) | 1.4 | 500 | Space Grotesk | Navigation, button labels |
| `label-sm` | 0.75rem (12px) | 1.4 | 500 | Space Grotesk | Tags, badges, small labels |
| `mono-lg` | 1rem (16px) | 1.6 | 400 | JetBrains Mono | Code blocks, prominent data |
| `mono-md` | 0.875rem (14px) | 1.5 | 400 | JetBrains Mono | Metric values, timestamps, identifiers |
| `mono-sm` | 0.75rem (12px) | 1.4 | 400 | JetBrains Mono | Tags, status indicators, small data |

### Letter Spacing

Space Grotesk headings at `display-xl` and `display-lg`: `-0.02em` (slightly tighter than default — reads as precise, confident).
Space Grotesk labels and tags: `+0.05em` (slightly wider — improves legibility at small sizes, adds weight to labels).
Inter body: `0` (default — designed for neutral rendering).
JetBrains Mono: `0` (monospace spacing is inherent to the typeface).

### Heading Hierarchy in Doctrine Pages

Doctrine documents follow a specific typographic hierarchy:

- **Document title**: `display-xl`, Ice `#F0F4F8`, centered on cover, left-aligned in content
- **Major section headings (##)**: `display-md`, Ice `#F0F4F8`, preceded by a 1px Wire `#243044` rule
- **Sub-section headings (###)**: `display-sm`, Ice `#F0F4F8`, no rule
- **Body paragraphs**: `body-md`, Ash `#8899AA` — *not* Ice. Body text in secondary color creates contrast with headings and makes the structure of the argument more readable.
- **Emphasis within body**: Inter 500 weight, Ice `#F0F4F8` — brightening the text rather than italicizing it
- **Pull quotes and key statements**: `body-lg`, Space Grotesk, Cyan `#00C8F0`, left-border in Cyan at 2px

---

## Logo Usage

SavvPro's logo is the primary visual identifier and the most protected element of the identity system.

### Clear Space

The logo must always be surrounded by a minimum clear space equal to the height of the capital "S" in the wordmark on all four sides. No other graphic element, text, or border may intrude on this space.

### Permitted Versions

**Primary (reversed)** — Logo mark and wordmark in Ice `#F0F4F8` on Void `#080B10` or Deep Navy `#0F1520` backgrounds. This is the standard version used in all digital applications.

**Signal** — Logo mark and wordmark in Cyan `#00C8F0` on Void `#080B10`. Used for special applications — featured placements, the savv.pro agent header, and branded moments where the Cyan signal is warranted.

**Light** — Logo mark and wordmark in Deep Navy `#0F1520` on Ice `#F0F4F8` or white backgrounds. Used for printed materials and light-context documents only.

**Monochrome** — Logo mark and wordmark in a single color (full black or full white). For embossing, watermarks, and single-color reproduction contexts only.

### Prohibited Usage

The following are never permitted:
- Stretching or distorting the logo in any dimension
- Applying the logo over a busy background, photograph, or pattern that reduces legibility
- Placing the logo in any color not listed in the permitted versions above
- Adding drop shadows, outlines, glows, or any visual effect to the logo
- Combining the SavvPro logo with another organization's logo in a way that implies equivalence or merger
- Displaying the logo at a size smaller than 80px wide in digital contexts or 20mm wide in print
- Using the logo as part of a sentence or phrase where it substitutes for the written word "SavvPro"

### Co-branding with Partners

When SavvPro's logo appears alongside a partner's logo — in co-produced materials, joint proposals, or partner-attributed content — the two logos are separated by a clear divider (a 1px Wire rule or a minimum gap of the logo height). Neither logo is subordinated to the other in scale. The placement order is determined by the context: on SavvPro-primary materials, SavvPro leads; on partner-primary materials, the partner leads.

---

## Spacing System

The spacing system is based on an 8px base unit. All spacing values are multiples of this unit.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro — inline gaps, icon padding |
| `space-2` | 8px | XSmall — tight internal padding |
| `space-3` | 12px | Small — list item padding, compact components |
| `space-4` | 16px | Base — standard component padding |
| `space-5` | 24px | Medium — card padding, section gaps |
| `space-6` | 32px | Large — between components |
| `space-8` | 48px | XLarge — major section breaks |
| `space-10` | 64px | XXLarge — page-level sections |
| `space-12` | 80px | Hero — top-level layout divisions |

### Layout Grid

**Desktop (≥1280px):** 12-column grid, 80px margins, 24px gutters.
**Tablet (768–1279px):** 8-column grid, 40px margins, 20px gutters.
**Mobile (≤767px):** 4-column grid, 20px margins, 16px gutters.

Maximum content width: 1200px, centered. Long-form Doctrine content uses a narrower reading column: 720px maximum, centered within the content area. This line length optimizes readability for extended reading — approximately 65–75 characters per line at `body-md`.

---

## Component Principles

### Cards and Containers

Cards use Surface `#0F1520` as background with a 1px Border `#243044` stroke and a `border-radius` of 8px. No box shadows on dark backgrounds — depth is created by layering surface colors, not by shadow. On light backgrounds, a subtle shadow (`0 1px 3px rgba(0,0,0,0.08)`) is permitted.

Card padding: `space-5` (24px) on all sides for standard cards; `space-6` (32px) for featured or large cards.

### Interactive Elements

**Buttons — Primary:** Cyan `#00C8F0` background, Void `#080B10` text (Space Grotesk, `label-lg`), 6px border-radius, `space-4` vertical padding, `space-5` horizontal padding. Hover: Cyan Muted `#0097B8`.

**Buttons — Secondary:** Transparent background, Wire `#243044` border (1px), Ice `#F0F4F8` text. Hover: Surface `#0F1520` background.

**Buttons — Ghost:** Transparent background, no border, Ash `#8899AA` text. Hover: Ice `#F0F4F8` text. Used for low-emphasis actions.

No rounded-pill buttons. The 6px radius is a subtle softening — not a visual metaphor.

**Links:** Cyan `#00C8F0` in body text, no underline by default, underline on hover. In navigation and labels: Ice `#F0F4F8`, Cyan `#00C8F0` on hover or active.

**Inputs and form fields:** Surface `#0F1520` background, Wire `#243044` border, Ice `#F0F4F8` text, Ash `#8899AA` placeholder. Focus state: Cyan `#00C8F0` border (2px). JetBrains Mono for data inputs (numbers, IDs, codes); Inter for prose inputs (names, descriptions).

### Data Display

Metrics, KPIs, and numerical data are displayed in JetBrains Mono at `mono-lg` or `mono-md`. Positive values: Green `#10C98A`. Negative values: Red `#E84040`. Neutral values: Ice `#F0F4F8`. Trend indicators (up/down arrows) use the same semantic colors.

Tables use alternating row backgrounds: Void `#080B10` and Surface `#0F1520`. Column headers in Space Grotesk `label-sm`, uppercase, Ash `#8899AA`. Cell content in Inter `body-sm`, Ice `#F0F4F8` for primary values, Ash `#8899AA` for secondary.

### Doctrine Page Layout

Published Doctrine documents follow a defined page structure:

1. **Cover block:** Document title in `display-xl`, document type label in JetBrains Mono `mono-sm` Cyan above the title, version and date in JetBrains Mono `mono-sm` Ash below. Centered. Minimum height: 40vh. No imagery — typography only.
2. **Thesis block:** The opening thesis statement in Space Grotesk `body-lg` or `display-sm`, Ice, with a left-border in Cyan (2px). This is the sharpest version of the argument — it appears before the full exposition.
3. **Body sections:** Standard heading hierarchy as defined in the Typography section. Maximum reading column width (720px).
4. **Pull quotes:** Key statements selected from the body and displayed in Cyan `display-sm` with a 2px Cyan left border. Used sparingly — maximum two per document.
5. **Closing attribution:** JetBrains Mono `mono-sm`, Ash, centered. Always: *"SavvPro builds and operates AI-native platforms and delivers AI-powered services to organizations navigating the transition into the agentic era."* followed by a line break and `savv.pro`.

---

## Motion and Animation

Motion is minimal and purposeful. SavvPro interfaces do not animate to entertain — they animate to communicate state change.

**Permitted:**
- Fade transitions on page/view changes: 150ms ease-out
- Element entrance on scroll: subtle fade-up (opacity 0→1, translateY 12px→0), 200ms ease-out, staggered at 60ms intervals when multiple elements appear together
- Interactive state transitions (hover, focus, active): 80–120ms ease
- Loading states: a single-pixel Cyan line scanning horizontally, 1.2s loop

**Not permitted:**
- Parallax effects
- Decorative particle animations or ambient motion
- Bounce, spring, or elastic easing on any element
- Transitions exceeding 300ms on any interactive element

---

## Voice in Visual Context

The visual identity is not separate from the communication standard. Every piece of text that appears in a visual context — labels, headings, button copy, metadata, status messages — must follow the same principles as SavvPro's written communication.

**Headings are statements, not questions.** "The End of the Hierarchy" not "Is Your Org Chart Holding You Back?"

**Labels are precise, not clever.** "Capability Maturity Score" not "Health Pulse." "Partner Engagement Status" not "Relationship Vibes."

**Error messages are direct.** "Delivery data missing for this engagement. Log it before closing." Not "Oops! Something went wrong."

**System labels use JetBrains Mono.** They are machine voice — they should read as such. Status: `ACTIVE`. Version: `1.1`. Updated: `2026-05-02`.

The visual identity and the communication standard are a single system. A beautifully typeset page with imprecise copy is not a SavvPro page. A precisely written document in mismatched fonts is not either.

---

## Implementation Notes

### Web (savv.pro)

All typefaces are loaded from Google Fonts with `font-display: swap` to prevent invisible text during load. Subset loading is used to minimize font payload — Latin character set only.

CSS custom properties (variables) map directly to the tokens in this document:

```css
:root {
  /* Colors */
  --color-void:       #080B10;
  --color-surface:    #0F1520;
  --color-overlay:    #1A2535;
  --color-wire:       #243044;
  --color-cyan:       #00C8F0;
  --color-cyan-dim:   #0097B8;
  --color-ice:        #F0F4F8;
  --color-ash:        #8899AA;
  --color-smoke:      #4A5568;
  --color-green:      #10C98A;
  --color-amber:      #F5A623;
  --color-red:        #E84040;

  /* Typography */
  --font-display:     'Space Grotesk', system-ui, sans-serif;
  --font-body:        'Inter', system-ui, sans-serif;
  --font-mono:        'JetBrains Mono', 'Courier New', monospace;

  /* Spacing */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-8:  48px;
  --space-10: 64px;
  --space-12: 80px;
}
```

### GitHub-Hosted Doctrine Pages

Doctrine documents published on GitHub are Markdown source. When rendered on savv.pro, the Doctrine page layout template defined in this document is applied. The Markdown files themselves do not contain styling — only content. Styling is entirely in the template and CSS.

### Print and PDF

Print contexts use the light palette. Margins: 25mm top/bottom, 30mm left/right. Body copy at 11pt Inter. Headings proportionally scaled. Logo at minimum 30mm wide. No background colors in print — white background only.

---

## Version Control

This document is versioned. Updates require a documented rationale and a version entry in the table below. No visual element is changed without updating this document first. The document is the authority — implementation follows it, not the reverse.

| Version | Date | Change |
|---|---|---|
| 1.0 | May 2026 | Initial formalization of Terminal Intelligence visual identity |

---

*SavvPro Visual Identity Supplement — Internal design standard. Not for external distribution.*
*Maintained by the SavvPro founding team. Questions: savv.pro*
