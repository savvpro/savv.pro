# SavvPro Website Execution Plan
## savv.pro — Build, Content & Channel Guide

*Version 1.0 — May 2026 | Internal*

---

## Purpose

This document is the operational guide for building and maintaining SavvPro's public digital presence. It translates the strategic decisions in PART X of the Core Operating Document and the specifications in the Visual Identity Supplement into concrete, sequenced actions that a developer or contributor can execute without ambiguity.

The execution plan covers: GitHub Pages infrastructure setup, site architecture and page specifications, BaseEcho agent integration, Doctrine publishing workflow, GitHub organization setup, X (Twitter) content operation, and the stealth-to-public transition criteria.

Read PART X of the Core Operating Document and the Visual Identity Supplement before beginning any build work. This document assumes familiarity with both.

---

## Pre-Build Checklist

The following must exist before any build work begins. Nothing in Phase 1 should start without all of these in place.

**Domain**
- savv.pro must be registered and DNS must be under SavvPro's control. The registrar account should be owned by Omer or Usman — not a contractor or agency. The DNS must support CNAME and A record configuration for GitHub Pages.

**GitHub Organization**
- A GitHub organization named `savvpro` (or `savv-pro` if taken) must exist with at minimum two members: Fasih and Ahmed as technical owners, Omer as org owner. See Section 7 for full GitHub org setup.

**Logo Assets**
- The SavvPro logo must exist in production-ready SVG format with at minimum: wordmark on dark background, wordmark on light background, and favicon (32×32 and 16×16 ICO or SVG). These are referenced extensively in the Visual Identity Supplement (logo usage rules section). If these do not exist, commission or create them before any public-facing build work.

**BaseEcho Agent**
- The savv.pro agent is the primary interface. The site can go live with a minimal placeholder chatbox while the agent is being trained, but the placeholder must make it clear the agent is being configured — not that there is a "contact form." The agent spec is in Section 5. Begin building it in parallel with the site, not after.

**Visual Identity Token File**
- Copy the CSS custom properties block from the Visual Identity Supplement into a `tokens.css` file that all pages import. Every color, font, and spacing value must come from this file. No hardcoded values anywhere in the site.

---

## Section 1: Infrastructure — GitHub Pages Setup

### Repository Structure

Create the following repositories in the SavvPro GitHub organization:

**Primary site repository:** `savvpro.github.io` (or equivalent custom domain repo)
- This hosts the compiled savv.pro site
- Branch `main` = production (auto-deploys to savv.pro)
- Branch `staging` = pre-production review
- No feature branches merged to main without at minimum one review from Fasih or Ahmed

**Doctrine repositories** (one per doctrine — see Section 7)
- These are separate repos, public, housing the Markdown source of each doctrine
- They are also the intellectual signal layer for GitHub audiences

### GitHub Pages Configuration

1. In the organization repo settings, enable GitHub Pages from the `main` branch, root directory
2. Set the custom domain to `savv.pro` in the Pages settings
3. Enable HTTPS enforcement (GitHub Pages provides free TLS via Let's Encrypt)
4. In your DNS registrar, add:
   - A records pointing to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME record: `www` → `savvpro.github.io`
5. Add a `CNAME` file to the root of the repo containing only: `savv.pro`
6. Verify the domain in GitHub org settings to prevent domain takeover

### Build Approach

The site is static HTML/CSS with no JavaScript framework dependency. This is intentional: developer-credible, fast-loading, machine-readable, and maintainable without a build pipeline.

Each page is a single `.html` file with shared CSS imported via `<link rel="stylesheet">`. The agent interface on the homepage uses a lightweight script to connect to the BaseEcho API. No React, no Next.js, no CMS. The content is the code — consistent with version-controlled, auditable principles.

Directory structure:
```
/
├── index.html               (homepage — agent interface)
├── tokens.css               (design tokens — Visual Identity Supplement)
├── style.css                (shared styles)
├── doctrines/
│   ├── index.html           (doctrine index page)
│   ├── 01-end-of-hierarchy.html
│   ├── 02-capabilities-over-features.html
│   ├── 03-world-model-imperative.html
│   └── 04-partner-doctrine.html
├── partners/
│   └── index.html
├── join/
│   └── index.html
├── CNAME
└── README.md
```

---

## Section 2: Site Architecture

### Navigation

The site has exactly three navigation destinations during the stealth phase:

| Label | URL | Purpose |
|---|---|---|
| DOCTRINES | /doctrines/ | Published operating principles |
| PARTNERS | /partners/ | Partnership model and criteria |
| JOIN US | /join/ | Contributor pathway |

No other navigation items. No blog. No case studies. No pricing. No about page beyond what the homepage agent covers. Every expansion to navigation is a decision that requires updating this document.

The SavvPro wordmark in the header links to the homepage. The navigation sits in a minimal top bar. On mobile, the nav collapses to a clean menu — no hamburger icon with unlabeled lines; use text or a clearly labeled toggle.

### Page Index

| Page | Route | Status |
|---|---|---|
| Homepage | / | Build Phase 1 |
| Doctrine Index | /doctrines/ | Build Phase 1 |
| The End of the Hierarchy | /doctrines/01-end-of-hierarchy | Build Phase 1 |
| Capabilities Over Features | /doctrines/02-capabilities-over-features | Build Phase 1 |
| The World Model Imperative | /doctrines/03-world-model-imperative | Build Phase 1 |
| The Partner Doctrine | /doctrines/04-partner-doctrine | Build Phase 1 |
| Partners | /partners/ | Build Phase 1 |
| Join Us | /join/ | Build Phase 1 |

---

## Section 3: Page Specifications

### Homepage (/)

**Purpose:** First contact. The agent handles the conversation. The page provides minimal framing. Nothing here is decorative.

**Hero block:**
- SavvPro wordmark (large, top-left or centered depending on viewport)
- One-line descriptor: *Intelligence backbone for the agentic era.*
- No further prose. The agent handles explanation.

**Agent interface block:**
- A clean, full-width chat interface below the hero
- Opening prompt from the agent (not a static placeholder): `SavvPro builds AI-native capabilities for organizations operating in the agentic era. Ask me what we build, how we work, or how to partner with us.`
- The agent responds in real time via BaseEcho API
- Keyboard accessible. Mobile-responsive. No loading spinner that runs for more than 2 seconds before first response.
- Agent response styling must match the site typography (JetBrains Mono for system labels, Inter for prose responses)

**Below the agent:**
- Three minimal link tiles: DOCTRINES · PARTNERS · JOIN US
- No other content on the homepage.

**Structured data (machine readability):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SavvPro",
  "url": "https://savv.pro",
  "description": "AI-native technology organization building capabilities for the agentic era",
  "sameAs": [
    "https://github.com/savvpro",
    "https://x.com/savvpro"
  ]
}
</script>
```

**Meta tags:**
```html
<title>SavvPro — Intelligence Backbone for the Agentic Era</title>
<meta name="description" content="SavvPro builds AI-native capabilities, platforms, and services for organizations navigating the agentic era.">
<meta property="og:title" content="SavvPro">
<meta property="og:description" content="Intelligence backbone for the agentic era.">
<meta property="og:url" content="https://savv.pro">
```

---

### Doctrine Index (/doctrines/)

**Purpose:** Entry point for the published Doctrine library. Presents all four doctrines as a structured collection, not a blog roll.

**Content:**
- Section header: `Published Doctrines`
- One-paragraph framing (verbatim): *SavvPro publishes formal operating principle documents — not blog posts, not thought leadership content. Each Doctrine is a precise, complete argument about how intelligence-driven organizations operate. They are derived from the Core Truth and approved for public expression.*
- Four doctrine cards in a grid (2×2 on desktop, stacked on mobile), each showing: doctrine number, title, one-sentence thesis, link to full doctrine page

**No sidebar. No tag filters. No "latest" ordering.** Doctrines are not content. They are documents. Present them as such.

---

### Doctrine Pages (/doctrines/0X-name)

**Purpose:** Full text of each published Doctrine. Designed to be read by humans and parsed by AI agents.

**Page structure for all four doctrine pages:**

```
[Doctrine number + title — large display heading]
[Version and date — mono, small]
[One-sentence thesis — pull quote style, border-left accent]

[Full doctrine text — divided into named sections with H2 headings]

[Closing line — the final argument, set apart visually]

[Footer: "SAVVPRO DOCTRINE [N] · Published [MONTH YEAR] · savv.pro"]
```

**Semantic HTML requirements:**
- Use `<article>` as the wrapper
- Section headings as `<h2>` (not `<h3>` or `<strong>`)
- No `<div>` where semantic elements exist
- Each section wrapped in `<section>` with a meaningful `id` attribute for anchor linking
- `<blockquote>` for the thesis pull quote

**Structured data:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Doctrine title]",
  "author": {"@type": "Organization", "name": "SavvPro"},
  "publisher": {"@type": "Organization", "name": "SavvPro", "url": "https://savv.pro"},
  "datePublished": "[ISO date]",
  "url": "https://savv.pro/doctrines/[slug]"
}
</script>
```

**Typography:**
- Doctrine title: Space Grotesk, display-xl, weight 700
- Thesis: Inter, body-lg, border-left cyan, padding-left 20px
- Body: Inter, body-md, line-height 1.75 (doctrine text needs breathing room)
- Section headings: Space Grotesk, display-sm, weight 600
- Meta (version, date): JetBrains Mono, mono-sm

**Content source:** The four doctrine `.md` files in your Business Pulse folder are the content source. Convert them to HTML following the structure above. The Markdown is the canonical source — update the `.md` file first, then update the HTML page from it.

---

### Partners (/partners/)

**Purpose:** A prospective partner arrives here to understand the partnership model. The page must answer: what is SavvPro, what does the partnership look like, what does SavvPro bring, what does a partner bring, and how do we begin.

**Content blocks:**

**Block 1 — What the partnership is:**
Two to three paragraphs derived from the Partner Doctrine. Not copied verbatim — summarized for this audience. Key point: SavvPro is the intelligence backbone, partners carry the client relationship. Both compound. This is structural, not transactional.

**Block 2 — Current partner ecosystem:**
Name MoInc (US anchor partner) and Zovox (technology partner). Brief description of each. Do not list specifics of commercial terms. This is a credibility signal, not a case study.

**Block 3 — Partner criteria:**
Honest and specific. What kind of organization SavvPro partners with and what kind it does not. Derived from the Partner Contract Doctrine. The criteria are public because partners who don't meet them should know before they start a conversation.

**Block 4 — How to begin:**
Direct to the homepage agent. "Start a conversation at savv.pro. The agent will understand your context, explain how the partnership model works, and identify whether the fit makes sense before either party invests significant time." No form. No email address. The agent is the gateway.

---

### Join Us (/join/)

**Purpose:** A prospective contributor arrives here to understand what working at SavvPro means. The page self-selects: those who read it and still want to apply are exactly who SavvPro wants.

**Content blocks:**

**Block 1 — How SavvPro is built:**
Brief description of the operating model — remote-first, resource-agnostic, agent-first, no hierarchy. Three roles (IC, DRI, Player-Coach). The truth, stated directly. This is the orientation that the first part of Day 1 onboarding covers — the prospect reads it before any process begins.

**Block 2 — What SavvPro looks for:**
Derive from the hiring system master document — the trait architecture summary. Tier 1 traits (non-negotiable): Truth Signal Quality, Integrity Under Pressure, Learning Velocity. This is the signal to the right candidates that SavvPro measures what matters, not credentials.

**Block 3 — Current openings:**
List open roles by name and priority tier only. No JD on this page. Link each role to either a separate page (if volume warrants) or to the agent. During early-stage hiring, route to the agent: "Tell the agent you're interested in [Role Name] and it will walk you through the context and pathway."

**Block 4 — Honest expectations:**
One paragraph. Remote-first means you are responsible for your own structure. Agentic-era means you use AI tools as a core part of your work, not as an experiment. Performance is measured in contribution and quality, not hours. If that sounds right, start the conversation.

**Block 5 — The pathway:**
Directly explain the pipeline sequence: conversation with agent → CV screening → assessment → interview stages → offer. No surprises. Candidates who understand the process and still proceed are self-selected for the right reasons.

---

## Section 4: Mobile and Accessibility Standards

Every page must:
- Render correctly on viewport widths from 320px to 1600px
- Use `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Have all interactive elements (links, agent input, nav) reachable via keyboard
- Have all images include descriptive `alt` attributes
- Pass Lighthouse accessibility score of 90+ before deployment
- Load in under 2 seconds on a standard mobile connection (no heavy images, no blocking JS)

Typography minimum sizes on mobile:
- Body text: 15px (never smaller)
- Navigation labels: 14px
- Mono labels: 12px (never smaller)

---

## Section 5: BaseEcho Agent Integration

### What the Agent Is

The savv.pro agent is not a FAQ bot. It is an operational expression of the BaseEcho Capability — held to the same quality standard as any client-facing agent SavvPro builds. A partner or contributor who interacts with it is experiencing the product firsthand.

The agent is the primary interface to savv.pro. Everything else on the site (doctrine pages, partners page, join page) is backup for those who want to read, not converse.

### Agent Knowledge Base

The agent must be trained on the following documents before going live. These are the authorized knowledge inputs — the agent does not improvise or speculate beyond them:

| Document | Input to agent |
|---|---|
| PART X of Core Operating Document | Primary identity, channel strategy, partner pathway, contributor pathway |
| All four published Doctrines | Intellectual position, operating principles |
| Partner Contract Doctrine | Partnership model, criteria, mutual obligations |
| Hiring System Master Document | What SavvPro looks for, the pipeline (summary level) |
| Role Definitions (current open roles) | What roles are open and what they require |
| Visual Identity Supplement (purpose section only) | Why the identity is what it is |

The agent does NOT have access to: financial data, client names or details, team member personal information, internal Skill Profile data, or anything marked Core Truth that isn't in PART X's "Publishable" list.

### Agent Response Scope

**The agent answers:**
- What SavvPro builds and how it operates
- What the partnership model looks like
- What SavvPro looks for in partners and contributors
- What the Doctrines are and what they argue
- How to begin a partnership or contributor conversation
- What the current hiring pipeline looks like at a high level
- What BaseEcho and the other products are at a description level

**The agent declines with honesty:**
- Client names, project details, financials — "That's not public information."
- Team member contact details — "Conversations start through this interface."
- Anything outside its knowledge scope — "I don't have that information. [Redirect to most relevant known answer]."

The agent never says "I don't know" without a redirect. It acknowledges a limit and points to what it does know.

### Handoff Mechanism

When a prospective partner or contributor is ready to move forward, the agent collects:
- Name
- Organization (for partners) or role interest (for contributors)
- A brief context statement

And generates a summary that routes to whoever is managing partner intake (currently Omer/Sabrina) or hiring intake (currently Usman/Sabrina). The agent does not make commitments. It facilitates a warm handoff with context.

### Quality Standard

The agent is reviewed monthly by Usman or Sabrina against the following:
- Does it correctly describe what SavvPro does?
- Does it represent the partnership model accurately?
- Does it handle out-of-scope questions gracefully?
- Does it successfully facilitate handoffs?

Any agent failure on a partner or contributor inquiry is treated as a BaseEcho Capability quality issue — not a website support ticket.

---

## Section 6: Doctrine Publishing Workflow

### Source of Truth

The Markdown files in the Business Pulse folder are the canonical source for all Doctrine content. The HTML pages on savv.pro are the published rendering of that source. They must stay in sync. Update the Markdown first, then update the HTML from it. Never edit the HTML directly without updating the Markdown.

### Publishing a New Doctrine

1. Write and finalize the Doctrine as a `.md` file in the Business Pulse folder. It is not ready to publish until it has been reviewed by Omer.
2. Create the HTML page following the doctrine page spec in Section 3.
3. Add the doctrine to the Doctrine Index page (`/doctrines/index.html`).
4. Create a corresponding public GitHub repository under the SavvPro org (see Section 7).
5. Commit both the site update and the repo creation in the same timeframe — the GitHub version and the site version should go live together.
6. Update the `datePublished` structured data field with the actual publication date.
7. Post a doctrine fragment on X the same day (see Section 8).

### Updating an Existing Doctrine

Doctrines are versioned documents, not blog posts. When a doctrine is updated:
1. Increment the version number in both the Markdown file and the HTML page.
2. Add a brief changelog note at the bottom of the document: `v1.1 — [Month Year] — [What changed and why]`
3. Commit the change to both the site repo and the doctrine GitHub repo.
4. Do not post an X update unless the change is substantive. A typo fix is not a publishing event.

---

## Section 7: GitHub Organization Setup

### Organization Structure

The SavvPro GitHub organization (`github.com/savvpro` or `github.com/savv-pro`) serves two functions: it hosts the savv.pro site repository, and it is the intellectual signal layer where Doctrines are published as public repositories.

**Organization settings:**
- Organization name: `savvpro`
- Organization display name: `SavvPro`
- Bio: *AI-native technology organization. Intelligence backbone for the agentic era. savv.pro*
- Website: `https://savv.pro`
- Make the organization and its public repos visible with a pinned selection of the four doctrine repos

**Member roles:**
- Omer: Owner
- Fasih: Member + maintainer of site repo
- Ahmed: Member + maintainer of site repo
- Others: Member (read access to public repos, no write access to site repo without approval)

### Doctrine Repositories

Create one repository per published Doctrine. Naming convention: `doctrine-[slug]`

| Repository | Description |
|---|---|
| `doctrine-end-of-hierarchy` | SavvPro Doctrine 01 — The End of the Hierarchy |
| `doctrine-capabilities-over-features` | SavvPro Doctrine 02 — Capabilities Over Features |
| `doctrine-world-model-imperative` | SavvPro Doctrine 03 — The World Model Imperative |
| `doctrine-partner-doctrine` | SavvPro Doctrine 04 — The Partner Doctrine |

**Each doctrine repo contains:**
- `README.md` — the doctrine in full (identical content to the `.md` file in Business Pulse folder)
- `LICENSE` — Creative Commons Attribution 4.0 (CC BY 4.0) — SavvPro retains attribution, others may share
- No other files. Clean, minimal, purposeful.

**README.md structure for each doctrine repo:**
```markdown
# [Doctrine Title]
**SavvPro Doctrine [N] · Version [X.X] · [Month Year]**

> [One-sentence thesis]

[Full doctrine text]

---
*Published by SavvPro · savv.pro · [Date]*
```

**Pin all four doctrine repos** to the organization's profile page. These are the first thing a technical visitor sees when they find the org on GitHub.

---

## Section 8: X (Twitter) Content Guide

### Account Setup

- Handle: `@savvpro` (or `@savv_pro` if taken — check availability)
- Display name: `SavvPro`
- Bio: *Intelligence backbone for the agentic era. Building AI-native capabilities. savv.pro*
- Profile link: `savv.pro`
- No profile photo beyond the logo. No header image unless it clearly expresses the visual identity.

### Content Mode: Doctrine Fragments

Everything posted from the SavvPro account is a doctrine fragment — a direct, precise statement that derives from the operating principles. Not marketing language. Not announcements. Not engagement bait.

**The voice rules:**
- State what is true. Not "we believe" or "we think." If SavvPro operates by a principle, the principle is stated as a fact about how intelligent organizations work — not as a company opinion.
- No hedging. No qualifiers unless the qualification is substantively important.
- Short and precise over long and thorough. A doctrine fragment is a single sharp idea, not a thread of opinions.
- Never promotional. A post that sounds like an advertisement is a failure of the content mode.
- Never reactive to news, competitors, or current events unless there is something genuinely precise to add. Silence is better than noise.

**Content types (in order of frequency):**

*Doctrine fragments (most frequent):* A single principle extracted and stated directly. Example structure: "Organizations maintain hierarchy because information routing was expensive. AI has made it free. The organizational structure that made sense in 1980 is now overhead." Source: the published Doctrines, the Core Operating Document, and the operating experience of building SavvPro.

*Operational observations (occasional):* Something specific and honest observed while building. Not case studies, not client mentions. Something about the process of building an intelligence-driven organization that is precise enough to be useful to someone else building something similar.

*Doctrine publication announcements (rare):* When a new Doctrine publishes. One post, linking to the doctrine page. The post states the thesis directly — it does not say "excited to share" or "check out our new piece."

**What is never posted:**
- Job listings (those go to university channels and the agent handles them on the site)
- Partner announcements (those are direct and private)
- Engagement questions ("What do you think?", "Drop a comment")
- Reposts of other organizations' content without substantive addition
- Anything that sounds like a startup announcement ("We are thrilled to...")
- Anything about internal team events, milestones, or culture

### Posting Cadence

Deliberate, not frequent. There is no minimum. A week with no post is better than a weak post. The signal is quality. When there is something precise to say, say it. When there is not, wait.

During the stealth phase: one to three posts per week is a reasonable upper bound. Do not force the cadence.

---

## Section 9: Visual Implementation Reference

All visual decisions for savv.pro are governed by `visual_identity_supplement.md`. This section provides the specific implementation checklist for the site build.

**Before writing any CSS:**
- Copy the CSS custom properties block from the Visual Identity Supplement into `tokens.css`. Every color, font, and spacing value comes from this file. No exceptions.

**Typography:**
- Import from Google Fonts: Space Grotesk (weights 400, 500, 600, 700), Inter (weights 400, 500), JetBrains Mono (weights 400, 500)
- Apply the typography scale from the Visual Identity Supplement exactly
- Space Grotesk → all headings, display text, navigation labels
- Inter → all body prose, descriptions, agent responses
- JetBrains Mono → version numbers, meta labels, doctrine numbers, any data or identifier

**Color application:**
- Page background: `--color-void` (#080B10) — the site uses the dark identity, not the light theme of internal documents
- Surface (cards, panels): `--color-surface` (#0F1520)
- Primary text: `--color-ice` (#F0F4F8)
- Secondary text: `--color-ash` (#8899AA)
- Accent (links, active states, agent UI highlights): `--color-cyan` (#00C8F0)
- Used sparingly — every instance of cyan must be justifiable

Note: The internal one-pagers use a light theme per team preference. The public-facing savv.pro uses the dark Terminal Intelligence palette — this is the brand expression. The distinction is intentional and is not a contradiction.

**Logo:**
- Use the wordmark SVG only. Never rasterize it.
- Minimum clear space: the height of the capital S on each side
- In the site header: wordmark only, no icon
- Favicon: use the S mark or a simple lettermark

**Responsiveness checkpoints:**
- 320px — minimum supported width
- 640px — single column, full-width agent interface
- 768px — two-column doctrine grid
- 1024px — full navigation visible, standard layout
- 1280px+ — maximum content width capped at 1200px, centered

---

## Section 10: Stealth-to-Public Transition

### Trigger Conditions

The transition out of stealth is not a calendar event. It is triggered by a specific operational condition defined in the Core Operating Document:

**All three of the following must be true:**
1. Business Pulse is live with its core modules operational — the World Model, Capabilities Registry, and Operations Center are functioning and populated with real organizational data
2. The Company World Model has sufficient depth to be demonstrated, not just described — a prospective partner or client can interact with a live demonstration of the intelligence model
3. Core Capabilities have reached maturity scores that guarantee delivery consistency — not experimental, not in development, but proven and repeatable

When all three conditions are met, Omer makes the call. The transition is a decision, not an automatic process.

### What Changes at Transition

**On savv.pro:**
- The homepage agent is updated to represent the full SavvPro capability suite, not just the stealth-phase positioning
- Case studies (SavvPro's own operation as the primary case study) are added as a new section
- The Join Us page expands to reflect the full hiring scope
- Navigation may expand to include additional sections

**On X:**
- Content mode expands from doctrine fragments to include demonstration content — specific, honest examples of what the intelligence-driven operating model produces
- Posting frequency increases proportionally (still quality-driven, not calendar-driven)

**On GitHub:**
- Additional repositories may be added — open-source tools, example implementations derived from internal capability work

**What does not change at transition:**
- The voice and content mode — doctrine fragments remain the primary signal
- The channel hierarchy — savv.pro remains primary, X and GitHub remain signal layers
- The prohibition on promotional language — the transition is a demonstration, not a campaign
- LinkedIn's status — it is not a brand channel before or after transition

### Transition Announcement

There is no launch announcement. The transition out of stealth is expressed through the substance of what appears on the site and the channels, not through a press release or a post that says "We're live." Organizations that announce their launches are announcing that they have not been demonstrating their capabilities all along. SavvPro exits stealth by simply being more visible, more complete, and more demonstrable — not by declaring it.

---

## Section 11: Maintenance and Quality Standards

### Ownership

| Surface | Owner | Backup |
|---|---|---|
| savv.pro site (technical) | Fasih | Ahmed |
| Agent knowledge base | Usman | Sabrina |
| Doctrine content | Omer | Usman |
| X account | Omer | Usman |
| GitHub org | Fasih | Omer |

### Review Cadence

**Monthly:**
- Agent quality review (Usman/Sabrina) — test the agent against 10 representative queries, document failures, update knowledge base if needed
- X content review — is the tone consistent? Is it generating the right kind of attention (if any)?

**Quarterly:**
- Site performance review — Lighthouse scores, load times, mobile rendering
- Doctrine relevance review — does any published doctrine need a version update?
- Stealth transition assessment — are the three trigger conditions closer to being met?

**On every doctrine publication:**
- Verify the structured data is correct
- Verify the GitHub repo is created and pinned
- Verify the X post went out the same day

### Version Control Rules

- Every change to a doctrine page triggers a version number increment in both the Markdown file and the HTML page
- Every substantive change to the agent knowledge base is logged with a date and brief description of what changed
- The site repo `README.md` includes a changelog of significant site updates

---

*SavvPro Website Execution Plan · Version 1.0 — May 2026 · Internal*
