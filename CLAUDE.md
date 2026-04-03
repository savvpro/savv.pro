# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config, Next.js rules)
```

No test runner is configured.

## Stack

- **Next.js 16.2.2** with App Router — see AGENTS.md warning about breaking changes
- **React 19.2.4**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.*` file; theme is defined inline in `src/app/globals.css` using `@theme`
- **TypeScript** strict mode; path alias `@/*` → `src/*`

## Architecture

### Routing

All routes live under `src/app/` using the App Router. Each route is a `page.tsx` file. Current routes: `/`, `/about`, `/products`, `/services`, `/solutions`, `/resource-augmentation`, `/case-studies`, `/contact`, `/sovereign-ai`.

### Component Organization

```
src/components/
├── futuristic/         # Landing page sections (home page only)
│   ├── assets.ts       # Figma API image URLs used across sections
│   ├── index.ts        # Barrel export
│   └── sections/       # One file per section: Hero, Service, About, Features,
│                       #   WhyChoose, Product, Process, Faq, Footer
└── site/               # Shared layout primitives
    ├── SiteHeader.tsx   # Responsive nav with mobile menu ("use client")
    ├── SiteFooter.tsx
    ├── PageTemplate.tsx # Reusable hero layout for inner pages (pill badge, title, description, optional stats)
    ├── PageTransition.tsx
    └── index.ts
```

The home page (`src/app/page.tsx`) composes all `futuristic/sections/` in order. Inner pages use `PageTemplate` from `site/`.

### Styling Conventions

- Tailwind v4 utility classes throughout; no CSS modules
- Custom font: **Lexend** (loaded via Google Fonts in `globals.css`, exposed as `--font-site` CSS variable)
- Accent color: `#8b71fe` (purple); primary text: `#1f2327`
- Max content width: `max-w-[1512px]`
- Responsive breakpoint used: `md:`

### Assets

All images are Figma API URLs defined in `src/components/futuristic/assets.ts`. Add new image references there rather than placing files in `public/`.
