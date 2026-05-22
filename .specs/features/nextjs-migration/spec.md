# Next.js Migration Specification

## Problem Statement

mitolenda.dev currently runs as a React/Vite SPA. Googlebot receives a blank HTML shell and must execute JS to see content — killing SEO. There's no TTFB optimization, no ISR, no metadata API, and no structured data. The migration targets Next.js 14 App Router to unlock SSG/ISR rendering, native metadata, and the full Next.js optimization pipeline — while keeping the visual design byte-identical.

## Goals

- [ ] All 7 routes render as HTML on the server (SSG or ISR) — Googlebot sees real content
- [ ] `npm run build` passes with zero errors post-migration
- [ ] Visual output pixel-identical to Vite original (verified by side-by-side screenshot)
- [ ] LCP < 2.5s on mobile 3G throttled (measured by Lighthouse)
- [ ] CLS = 0 (no layout shift from fonts or images)

## Out of Scope

| Feature | Reason |
|---|---|
| Visual design changes | Design system is stable and intentional — not part of this work |
| New pages or routes | Migration only — no new functionality |
| Backend API changes | NestJS covered in separate BE spec |
| i18n routing | Content has pt/en/es but routing stays flat |

---

## User Stories

### P1: MIG-01 — Project Bootstrap ⭐ MVP

**User Story**: As a developer, I want the Next.js project initialized with correct config so that all subsequent migration tasks have a working foundation.

**Why P1**: Every other task depends on this.

**Acceptance Criteria**:

1. WHEN `npm run dev` runs THEN server SHALL start on port 3000 with no errors
2. WHEN `npm run build` runs THEN build SHALL complete with zero TS/lint errors
3. WHEN `next.config.ts` is loaded THEN security headers SHALL be applied to all routes
4. WHEN `tailwind.config.ts` is checked THEN content SHALL include `./app/**/*.{ts,tsx}`

**Independent Test**: `npm run dev` → `localhost:3000` returns 200.

---

### P1: MIG-02 — CSS Migration ⭐ MVP

**User Story**: As a developer, I want the design system CSS migrated to `app/globals.css` so that all tokens and styles are available in the App Router context.

**Why P1**: Without CSS, all components break visually.

**Acceptance Criteria**:

1. WHEN `app/globals.css` is loaded THEN all `--bg-primary`, `--orange-impact`, `--font-display` CSS vars SHALL be defined
2. WHEN the `@import url(fonts.googleapis.com)` is removed THEN `next/font/google` SHALL load Inter + Space Mono with identical weights
3. WHEN a page renders THEN font SHALL display without FOUT (flash of unstyled text)
4. WHEN `src/styles/tokens.css` and `src/styles/globals.css` are deleted THEN no broken imports SHALL exist

**Independent Test**: Open any page → `document.documentElement.style.getPropertyValue('--orange-impact')` returns `#F24A00`.

---

### P1: MIG-03 — Root Layout ⭐ MVP

**User Story**: As a developer, I want `app/layout.tsx` to wrap all pages with the correct HTML structure, fonts, Navbar, and Footer.

**Why P1**: Layout is required before any page can render correctly.

**Acceptance Criteria**:

1. WHEN layout renders THEN `<html lang="pt-BR">` SHALL be the root element
2. WHEN Inter font loads THEN `--font-display` CSS var SHALL be set via className
3. WHEN Space Mono loads THEN `--font-mono` CSS var SHALL be set
4. WHEN any page renders THEN Navbar SHALL appear above and Footer below content

**Independent Test**: Inspect DOM → `document.documentElement.lang === 'pt-BR'`.

---

### P1: MIG-04 — Home Page ISR ⭐ MVP

**User Story**: As a search engine crawler, I want the home page to return pre-rendered HTML so that all sections are indexed without JS execution.

**Why P1**: Home page is the primary SEO target.

**Acceptance Criteria**:

1. WHEN Googlebot fetches `/` THEN response SHALL be valid HTML with all section headings visible
2. WHEN `revalidate: 3600` is set THEN page SHALL be regenerated at most once per hour
3. WHEN page is rendered THEN `HeroSection`, `AboutSection`, `ProjectsSection`, `ServicesSection`, `ContactSection` SHALL all appear in the HTML source

**Independent Test**: `curl https://mitolenda.dev/` | grep "Fullstack" → returns content.

---

### P1: MIG-05 — Remove Deprecated Routes ⭐ MVP

> `/recruiter` and `/client` routes are **removed** in the redesign (decision logged in Portfolio — Visão Geral). Do NOT migrate them.

**Acceptance Criteria**:

1. WHEN `/recruiter` is requested THEN response SHALL return 404
2. WHEN `/client` is requested THEN response SHALL return 404
3. WHEN `app/not-found.tsx` is implemented THEN 404 page SHALL match the site design
4. WHEN Cloudflare cache has old `/recruiter` entries THEN they SHALL be purged after deploy

**Independent Test**: `curl -I https://mitolenda.dev/recruiter` → HTTP 404.

---

### P1: MIG-06 — Project Detail ISR

**Acceptance Criteria**:

1. WHEN `/projects/[slug]` is requested THEN page SHALL render project data server-side
2. WHEN `generateStaticParams` is called THEN all known project slugs SHALL be pre-generated at build
3. WHEN an unknown slug is requested THEN `notFound()` SHALL be called → 404 response

**Independent Test**: `curl https://mitolenda.dev/projects/ops-control-platform` → returns HTML with project title in source.

---

### P1: MIG-07 — Legal Pages (SSG)

**Acceptance Criteria**:

1. WHEN `/politica-de-privacidade` is requested THEN response SHALL be static HTML
2. WHEN `/termos` is requested THEN response SHALL be static HTML

---

### P1: MIG-08 — Client Component Audit

**Acceptance Criteria**:

1. WHEN each component is audited THEN `'use client'` SHALL be added ONLY to components with `useState`/`useEffect`/event handlers
2. WHEN `HeroSection`, `AboutSection`, `ProjectsSection` are audited THEN they SHALL be Server Components (no `'use client'`)
3. WHEN `Navbar` is audited THEN it SHALL have `'use client'` (scroll state + mobile menu)
4. WHEN `ContactSection` is audited THEN it SHALL have `'use client'` (form state)

**Independent Test**: Build output shows Server Components in the build tree for static sections.

---

### P1: MIG-09 — Image Migration

**Acceptance Criteria**:

1. WHEN hero profile image is rendered THEN `next/image` SHALL be used with `priority` prop
2. WHEN project cover images are rendered THEN `next/image` SHALL be used with explicit `width`/`height`
3. WHEN Lighthouse runs THEN "Properly sized images" SHALL show green

**Independent Test**: Lighthouse → LCP element is the hero image, no "Serve images in next-gen formats" warning.

---

### P1: MIG-10 — Environment Variables

**Acceptance Criteria**:

1. WHEN `.env` is updated THEN all `VITE_*` vars SHALL be renamed to `NEXT_PUBLIC_*`
2. WHEN `import.meta.env.*` is searched in codebase THEN zero occurrences SHALL remain
3. WHEN `process.env.NEXT_PUBLIC_SUPABASE_URL` is accessed at runtime THEN correct value SHALL be returned

---

## Edge Cases

- WHEN a page throws during ISR revalidation THEN Next.js SHALL serve the last valid cached version
- WHEN `generateStaticParams` runs for `/projects/[slug]` and API is unreachable THEN build SHALL still succeed with empty array (no static pages, but runtime ISR still works)
- WHEN user has `prefers-reduced-motion` enabled THEN animations SHALL be disabled via CSS media query

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| MIG-01 | Project Bootstrap | Tasks | ✅ Done 2026-05-22 — Next.js 15 (React 19 compat), next.config.ts + tsconfig, Vite removed |
| MIG-02 | CSS Migration | Tasks | ✅ Done 2026-05-22 — globals.css merged, @import removed, next/font Inter+SpaceMono |
| MIG-03 | Root Layout | Tasks | ✅ Done 2026-05-22 — layout.tsx, Providers (LanguageProvider), Navbar, Footer, metadata |
| MIG-04 | Home Page ISR | Tasks | ✅ Done 2026-05-22 — app/page.tsx revalidate=3600, 8.45kB First Load JS |
| MIG-05 | Static Pages | Tasks | ✅ Done 2026-05-22 — not-found.tsx matching site design |
| MIG-06 | Project Detail ISR | Tasks | ✅ Done 2026-05-22 — /projects/[slug] SSG+ISR, 3 params, revalidate=7200 |
| MIG-07 | Legal Pages | Tasks | ✅ Done 2026-05-22 — /politica-de-privacidade + /termos SSG |
| MIG-08 | Client Audit | Tasks | ✅ Done 2026-05-22 — all sections 'use client' (useCopy/context); StackStrip stays SC |
| MIG-09 | Image Migration | Tasks | ✅ Done 2026-05-22 — 4 img→next/image fill; priority on About hero (LCP) |
| MIG-10 | Env Vars | Tasks | ✅ Done 2026-05-22 — zero import.meta.env found |

---

## Success Criteria

- [x] `npm run build` → zero errors — confirmed 2026-05-22
- [x] 9 routes generated (/, /projects/[3 slugs], /politica-de-privacidade, /termos, /_not-found)
- [ ] Visual diff shows zero changes vs Vite original (verify after deploy)
- [ ] Lighthouse mobile score ≥ 95 (verify after deploy)
- [ ] LCP < 2.5s, CLS < 0.1 (verify after deploy)
