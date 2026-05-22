# mitolenda.dev — Performance & Infrastructure Overhaul

**Vision:** Migrate mitolenda.dev from React/Vite SPA to Next.js 14 App Router while hardening the Cloudflare edge, securing the VPS stack, and achieving PageSpeed ≥ 95 on mobile — without touching the existing design system.

**For:** The site itself (public users, recruiters, clients) and the owner (Nicollas Freitas) who needs it indexed perfectly and protected from malicious traffic.

**Solves:**
- SPA with no SSR means Googlebot sees a blank shell — SEO is blocked
- No Cloudflare hardening means VPS CPU absorbs all bot/scraper traffic
- Missing structured data, OG images, and canonical URLs reduce search visibility
- No rate limiting or compression on the NestJS API exposes the origin

## Goals

- PageSpeed Insights ≥ 95 (mobile + desktop)
- LCP < 2.5s, INP < 200ms, CLS < 0.1 (Core Web Vitals "Good" across all three)
- Zero Google Search Console indexing errors within 72h of deploy
- VPS origin never receives bot traffic that Cloudflare can absorb
- Design system byte-identical after migration (no visual regressions)

## Tech Stack

**Core:**
- Framework: Next.js 14 (App Router) → migrating from React 18 + Vite
- Language: TypeScript
- Styling: Tailwind CSS + custom CSS tokens (preserved as-is)
- API: NestJS 10 (TypeScript)
- Database: Supabase (PostgreSQL + Auth)

**Key dependencies:**
- `next/font/google` — eliminates Google Fonts @import blocking
- `next/image` — automatic WebP + LCP priority
- `@nestjs/throttler` — rate limiting
- Cloudflare Tunnels (cloudflared) — hides VPS IP
- Qdrant — vector DB for RAG (stays internal Docker)

## Scope

**v1 includes:**
- Full Next.js App Router migration (all 7 routes)
- Cloudflare: SSL Full Strict + Cache Rules + WAF + Bot Fight Mode + Tunnels
- NestJS: compression, rate limiting, health endpoint, cache-manager
- SEO: metadata API, OG image (PNG), JSON-LD Person+WebSite, sitemap.ts, robots.ts
- Core Web Vitals: priority image, next/font, contain on glass elements
- Lighthouse CI in GitHub Actions

**Explicitly out of scope:**
- Any visual/design changes — tokens.css and globals.css are preserved
- Supabase self-hosting (stays on Supabase Cloud)
- Backend API new features
- Chatwoot / n8n workflow changes (architecture documented only)
- Paid Cloudflare features

## Constraints

- Timeline: Self-paced (personal project)
- Technical: Cloudflare Free plan only; VPS RAM limited (≤ 8GB)
- Resources: Solo developer
