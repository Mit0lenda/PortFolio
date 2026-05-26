# mitolenda.dev — Roadmap

## Milestones

| # | Milestone | Features | Status |
|---|---|---|---|
| M1 | Cloudflare Hardened | CF-01 → CF-05 | ✅ Done 2026-05-22 — CF-01..04 via API; CF-05 merged into M3 |
| M2 | Backend Secured | BE-01 → BE-05 | 🔴 Pending (NestJS repo — next session) |
| M3 | Next.js Live | MIG-01 → MIG-10 | ✅ **Done 2026-05-22** — build clean, 9 routes |
| M4 | SEO Complete | SEO-01 → SEO-06 | 🟡 SEO-01..05 ✅ done; SEO-02 OG PNG ✅; SEO-06 pending deploy |
| M5 | Continuous Optimization | OPT-01 → OPT-04 | ✅ Done 2026-05-22 — CI yml + analyzer + web-vitals + CF Analytics |

## Feature List

### Phase 1 — Cloudflare & Edge

| ID | Feature | Priority | Milestone |
|---|---|---|---|
| CF-01 | SSL/TLS Full (Strict) + Origin Certificate | P1 | M1 | ✅ Done 2026-05-22 |
| CF-02 | Cache Rules for static assets + ISR pages | P1 | M1 | ✅ Done 2026-05-22 |
| CF-03 | WAF + Bot Fight Mode + Rate Limiting Rule | P1 | M1 | ✅ Done 2026-05-22 |
| CF-04 | Cloudflare Tunnel (cloudflared daemon) | P1 | M1 | ✅ Done 2026-05-22 (Easypanel native) |
| CF-05 | Security Headers via next.config.ts headers() | P2 | M3 | 🔴 Deferred to M3 |

### Phase 2 — Backend & Data

| ID | Feature | Priority | Milestone |
|---|---|---|---|
| BE-01 | NestJS compression middleware (gzip/brotli) | P1 | M2 |
| BE-02 | @nestjs/throttler rate limiting | P1 | M2 |
| BE-03 | Health endpoint GET /api/health | P1 | M2 |
| BE-04 | cache-manager for hot queries (TTL 60s) | P2 | M2 |
| BE-05 | Supabase PgBouncer + index audit | P2 | M2 |

### Phase 3 — Next.js Migration

| ID | Feature | Priority | Milestone |
|---|---|---|---|
| MIG-01 | Project setup: next.config.ts + tsconfig + tailwind | P1 | M3 |
| MIG-02 | app/globals.css (tokens + globals merged, @import removed) | P1 | M3 |
| MIG-03 | app/layout.tsx (next/font, metadata base, Navbar+Footer) | P1 | M3 |
| MIG-04 | app/page.tsx Home (ISR revalidate: 3600) | P1 | M3 |
| MIG-05 | Remove /recruiter + /client routes → return 404 | P1 | M3 |
| MIG-06 | app/projects/[slug] (ISR revalidate: 7200) | P1 | M3 |
| MIG-07 | app/politica-de-privacidade + app/termos (SSG) | P1 | M3 |
| MIG-08 | 'use client' audit across all components | P1 | M3 |
| MIG-09 | next/image migration (priority on hero) | P1 | M3 |
| MIG-10 | Env vars rename VITE_* → NEXT_PUBLIC_* | P1 | M3 |

### Phase 4 — SEO & Structured Data

| ID | Feature | Priority | Milestone | Status |
|---|---|---|---|---|
| SEO-01 | metadata API in layout.tsx (title, description, OG, twitter) | P1 | M4 | ✅ Done 2026-05-22 — full OG + twitter + robots + keywords |
| SEO-02 | OG image PNG 1200×630 (convert from SVG) | P1 | M4 | ✅ Done 2026-05-22 — public/og/og-default.png committed to repo |
| SEO-03 | JSON-LD Person + WebSite schemas | P1 | M4 | ✅ Done 2026-05-22 — inline in layout.tsx body |
| SEO-04 | app/sitemap.ts (dynamic, with lastModified) | P1 | M4 | ✅ Done 2026-05-22 — 12 URLs, /sitemap.xml route |
| SEO-05 | app/robots.ts (replace static public/robots.txt) | P1 | M4 | ✅ Done 2026-05-22 — disallows /api/, /_next/ |
| SEO-06 | Google Search Console setup + DNS TXT verification | P2 | M4 | 🔴 Pending deploy |

### Phase 5 — Continuous Optimization

| ID | Feature | Priority | Milestone | Status |
|---|---|---|---|---|
| OPT-01 | Lighthouse CI GitHub Actions workflow | P2 | M5 | ✅ Done 2026-05-22 — .github/workflows/lighthouse.yml + .lighthouserc.json |
| OPT-02 | @next/bundle-analyzer budget enforcement | P2 | M5 | ✅ Done 2026-05-22 — ANALYZE=true npm run build |
| OPT-03 | web-vitals reporting in production | P2 | M5 | ✅ Done 2026-05-22 — src/app/web-vitals.ts, beacon to CF Analytics |
| OPT-04 | Cloudflare Web Analytics (free, cookieless) | P2 | M5 | ✅ Done 2026-05-22 — Script in layout.tsx, token-gated by env var |

## Dependencies

```
CF-01 → CF-04 (need valid cert before tunnel routes HTTPS)
CF-04 → MIG-01 (tunnel must point to Next.js port, not Vite port)
MIG-01 → MIG-02 → MIG-03 → MIG-04..MIG-10 (sequential setup)
MIG-03 → SEO-01 (layout.tsx hosts metadata)
SEO-02 → SEO-01 (OG image must exist before metadata references it)
MIG-04..10 → SEO-03, SEO-04, SEO-05 (pages must exist before sitemap/LD)
M3 complete → OPT-01, OPT-02, OPT-03 (CI/analytics on top of working Next.js)
```
