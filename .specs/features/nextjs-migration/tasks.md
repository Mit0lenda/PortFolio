# Next.js Migration — Tasks

> Sequential migration: React 19 + Vite → Next.js 14 App Router.
> App Router lives at `app/` (root). Existing `src/components/` preserved untouched.

## Dependencies
```
MIG-01 → MIG-02 → MIG-03 → [MIG-04, MIG-05, MIG-06, MIG-07] → MIG-08 → MIG-09 → MIG-10
```

---

## MIG-01 — Project Bootstrap

**What:** Replace Vite with Next.js 14. Install deps, create next.config.ts, update tsconfig.

**Where:**
- `package.json` — replace scripts, add next, remove vite deps
- `next.config.ts` — CREATE (security headers, image domains, reactStrictMode)
- `tsconfig.json` — replace with Next.js App Router tsconfig
- `postcss.config.cjs` → `postcss.config.js` — update for Next.js
- `tailwind.config.cjs` → `tailwind.config.ts` — update content paths

**Done when:**
- `npm install` succeeds
- `npm run build` exits 0 (even with empty app/)
- `next.config.ts` exports security headers for all routes

**Gate:** `npx next --version` → 14.x

---

## MIG-02 — CSS Migration

**What:** Merge `src/styles/tokens.css` + `src/styles/globals.css` → `app/globals.css`. Replace `@import` Google Fonts with `next/font/google`.

**Where:**
- `app/globals.css` — CREATE (merge of tokens + globals, no @import)
- `src/lib/fonts.ts` — CREATE (next/font Inter + Space Mono config)
- `src/styles/tokens.css` + `src/styles/globals.css` — keep (still used by Vite until cutover)

**Done when:**
- `app/globals.css` contains all `--bg-primary`, `--orange-impact`, `--font-display` vars
- No `@import url(fonts.googleapis.com)` in `app/globals.css`
- `fonts.ts` exports `interFont` and `spaceMonoFont`

**Gate:** grep `@import` `app/globals.css` → zero results

---

## MIG-03 — Root Layout

**What:** Create `app/layout.tsx` — HTML root, next/font classes, Navbar, Footer, global CSS.

**Where:**
- `app/layout.tsx` — CREATE
- `app/globals.css` — already created in MIG-02

**Done when:**
- `<html lang="pt-BR">` in layout
- Inter + Space Mono loaded via next/font with CSS var binding
- Navbar and Footer imported from `src/components/layout/`
- `import './globals.css'` present

**Gate:** `npm run build` → layout compiles with no TS errors

---

## MIG-04 — Home Page ISR

**What:** Create `app/page.tsx` that renders the home page with ISR revalidate 3600.

**Where:**
- `app/page.tsx` — CREATE (wraps HomePage component)

**Context:** `src/pages/Home.tsx` is the source. `useCopy()` hook uses `useLanguage()` context — in Next.js we default to pt-BR (server component, no context). For now, hardcode `copyPt` directly (i18n is out of scope per spec).

**Done when:**
- `export const revalidate = 3600` present
- Page renders all 10 sections (HeroSection through ContactSection)
- No `'use client'` at page level (Server Component)

**Gate:** `npm run build` → `app/page.tsx` appears in build output

---

## MIG-05 — Remove routes + 404

**What:** Remove `/recruiter` and `/client` routes (they don't exist in Vite either). Create `app/not-found.tsx`.

**Where:**
- `app/not-found.tsx` — CREATE (minimal 404 matching site design)

**Done when:**
- `app/not-found.tsx` exports a valid React component
- No `/recruiter` or `/client` routes exist anywhere in `app/`

**Gate:** `npm run build` → builds without errors

---

## MIG-06 — Projects ISR

**What:** Create `app/projects/[slug]/page.tsx`. Projects data comes from `src/content/copy.pt.ts`.

**Where:**
- `app/projects/[slug]/page.tsx` — CREATE

**Context:** `copyPt.projects.list` has 3 projects (Haven Link, Nexus, Atlas). Slugs: kebab-case of name. `generateStaticParams` pre-generates them. Dynamic segments not from API → no network risk at build time.

**Done when:**
- `generateStaticParams` returns slugs for all 3 projects
- `export const revalidate = 7200`
- Unknown slug → `notFound()`
- Page renders project name, description, tags

**Gate:** `npm run build` → 3 static project pages in `.next/server/`

---

## MIG-07 — Legal Pages SSG

**What:** Create `app/politica-de-privacidade/page.tsx` and `app/termos/page.tsx` from Vite originals.

**Where:**
- `app/politica-de-privacidade/page.tsx` — CREATE (from `src/pages/PrivacyPage.tsx`)
- `app/termos/page.tsx` — CREATE (from `src/pages/TermsPage.tsx`)

**Done when:**
- Both pages are Server Components (no `'use client'`)
- Both pages export no `revalidate` (static by default)

**Gate:** `npm run build` → both pages in build output

---

## MIG-08 — Client Component Audit

**What:** Add `'use client'` only to components that strictly require it.

**Where:** All files in `src/components/`

**Rules:**
- ADD `'use client'`: Navbar (scroll state + mobile menu), ContactSection (form state), any component with useState/useEffect/event handlers
- DO NOT ADD: HeroSection, AboutSection, ServicesSection, ProjectsSection, VenturesSection, SitesSection, TechStackSection, FAQSection, FinalCTASection, Footer, Layout
- LanguageProvider → not used in App Router (remove import from server components)

**Done when:**
- `grep -r "useState\|useEffect\|onClick\|onChange" src/components/` cross-referenced with `'use client'` presence
- `npm run build` → zero "useState in Server Component" errors

**Gate:** `npm run build` passes clean

---

## MIG-09 — next/image Migration

**What:** Replace `<img>` tags in components with `next/image` where images are known at build time.

**Where:** All `src/components/sections/` files

**Rules:**
- Hero profile image → `<Image priority>` (LCP element)
- Project covers → `<Image width height>` explicit dimensions
- SVG icons and CSS backgrounds → leave as-is
- Remote images (Supabase storage) → add domain to `next.config.ts` remotePatterns

**Done when:**
- Zero `<img src=` in `src/components/sections/`
- Hero image has `priority` prop
- `npm run build` → no "img element" warnings from Next.js

**Gate:** `npm run build` → zero next/image lint warnings

---

## MIG-10 — Environment Variables

**What:** Rename all `VITE_*` env vars to `NEXT_PUBLIC_*`. Replace `import.meta.env.*` with `process.env.*`.

**Where:**
- All `src/` files (grep for `import.meta.env`)
- `.env.example` or `.env.local` if they exist

**Done when:**
- `grep -r "import.meta.env" src/` → zero results
- `grep -r "VITE_" src/` → zero results

**Gate:** `npm run build` → no "import.meta.env" warnings

---

## Status Tracking

| ID | Task | Status | Notes |
|---|---|---|---|
| MIG-01 | Project Bootstrap | ⬜ Pending | |
| MIG-02 | CSS Migration | ⬜ Pending | depends MIG-01 |
| MIG-03 | Root Layout | ⬜ Pending | depends MIG-02 |
| MIG-04 | Home Page ISR | ⬜ Pending | depends MIG-03 |
| MIG-05 | Remove routes + 404 | ⬜ Pending | depends MIG-03 |
| MIG-06 | Projects ISR | ⬜ Pending | depends MIG-03 |
| MIG-07 | Legal Pages SSG | ⬜ Pending | depends MIG-03 |
| MIG-08 | Client Audit | ⬜ Pending | depends MIG-04..07 |
| MIG-09 | Image Migration | ⬜ Pending | depends MIG-08 |
| MIG-10 | Env Vars | ⬜ Pending | depends MIG-09 |
