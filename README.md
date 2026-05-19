# savv.pro.

Plain HTML. No framework. No build pipeline. Two pages and a chatbot.

This repo is the public source of [savv.pro](https://savv.pro) — the
intelligence-backbone-for-the-agentic-era SavvPro is building. The site is
intentionally minimal: the agent is the front door, the doctrines are the
publication layer, the join page is the contributor pathway.

---

## What's in this repo

```
.
├── index.html             ← home (the agent IS the page)
├── join.html              ← contributor pathway
├── tokens.css             ← design tokens (palette, fonts, spacing)
├── style.css              ← all shared styles
├── app.js                 ← vanilla JS: chatbot, ⌘K palette, ticker, etc.
├── favicon.svg            ← animated favicon
├── llms.txt               ← machine-readable org context for AI agents
├── robots.txt             ← explicit AI crawler invitation
├── sitemap.xml
├── config.example.js      ← template for BaseEcho credentials
│
├── data/
│   └── org-state.json     ← single source of truth for ticker + stats
│
├── library/               ← the publication layer
│   ├── README.md          ← doctrine index (rendered by GitHub)
│   ├── end-of-the-hierarchy.md
│   ├── capabilities-over-features.md
│   ├── world-model-imperative.md
│   └── partner-doctrine.md
│
└── _archive-nextjs/       ← previous build (archived, not deployed)
```

---

## Run locally

There is no build step. Any static file server works.

```
# Python (any system)
python3 -m http.server 8000

# Node
npx serve .

# Or open index.html directly in a browser
```

Then visit `http://localhost:8000`.

---

## Wiring the BaseEcho agent

The chatbot reads three globals at boot from [`config.js`](./config.js):

```js
window.SAVVPRO_API_URL    = "https://...";
window.SAVVPRO_CHATBOT_ID = "...";
window.SAVVPRO_API_TOKEN  = "base_echo_...";
```

**This file is committed to the repo.** BaseEcho's API token is a
**publishable token** — security comes from the backend's domain-allowlist on
the token, not from keeping the token secret. This is the same security model
used by Stripe publishable keys (`pk_live_*`), Google Maps API keys, etc.

Before deploying: make sure your production domain (e.g. `savv.pro`) and any
dev origins (e.g. `localhost:5500`) are whitelisted on this API token in the
BaseEcho dashboard. That is where the actual security lives.

For local dev overrides you don't want to commit, create a `config.local.js`
(gitignored) — but typically `config.js` is sufficient for both local and prod.

The agent falls back to a polite placeholder reply when any value is empty, so
the site works without any credentials.

---

## Updating organisational state

The ticker, the home page data line, and the `/data/org-state.json` endpoint
all read from a single file: `data/org-state.json`. When a capability matures,
a doctrine ships, or any other tracked metric changes, edit that file and
commit. The change appears everywhere on the next deploy.

This is doctrine-consistent: see *The World Model Imperative* in
[`library/world-model-imperative.md`](./library/world-model-imperative.md).

---

## Library structure

Each doctrine is a self-contained markdown document at `library/<slug>.md`.

The site does not render them — the link from the nav goes directly to GitHub,
which renders the markdown. The intent is twofold: GitHub is itself a developer
signal layer, and the published documents live as plain text under version
control rather than as a CMS export.

Doctrines are versioned. Substantive revisions bump the version number and add
a changelog line at the bottom of the file. Typo fixes do not.

---

## Deploy

This is a static site. Any static host works:

- **GitHub Pages**: push to `main`, enable Pages from the root
- **Cloudflare Pages**: connect repo, build command empty, output `/`
- **Netlify**: drag-and-drop the folder, no build needed
- **Anywhere serving static files**: copy the folder

There is no Node runtime, no edge function, no serverless layer required.

---

## Brand vocabulary

The site uses these terms precisely. They are not interchangeable.

- **Capability** — a formally defined, repeatable, measured production process
- **Contributor** — a person who works at SavvPro (not "employee")
- **World Model** — the explicit organisational intelligence layer
- **Doctrine** — a published operating-principle document (not a blog post)
- **Agentic era** — the period in which AI agents are the primary operational tier

---

## License

Source code: MIT
Library documents (under `library/`): Creative Commons Attribution 4.0

---

*Built without a management layer · savv.pro*
