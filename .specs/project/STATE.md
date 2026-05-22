# mitolenda.dev — State

> Persistent memory: decisions, blockers, lessons, deferred ideas.

## Decisions

| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-05-22 | D-01 | Migrate to Next.js **15** App Router (not Pages Router) | React 19 already installed — Next.js 15 required for compat; App Router has metadata API, ISR |
| 2026-05-22 | D-02 | Design system preserved byte-for-byte | Intentional aesthetic — editing it would break the editorial look |
| 2026-05-22 | D-03 | Cloudflare Free plan only | No budget for paid features; Free covers all critical security needs |
| 2026-05-22 | D-04 | Cloudflare Tunnel instead of exposing VPS port | Hides origin IP; works transparently with Easypanel |
| 2026-05-22 | D-05 | next/font replaces @import Google Fonts | Only CSS change allowed — eliminates render-blocking import, zero visual change |
| 2026-05-22 | D-06 | Qdrant binds to 127.0.0.1 only | Vector DB must never be publicly accessible |
| 2026-05-22 | D-07 | ISR home page revalidate: 3600 | Balances freshness with SEO caching at Cloudflare edge |

## Blockers

_None currently._

## Lessons

- `tokens.css` had a blocking `@import` — was the #1 LCP bottleneck; replaced with next/font.
- Cloudflare Tunnel ingress must use Docker service name (`projetos_portfolio:80`), not `localhost` — cloudflared runs in a container, `localhost` doesn't reach Traefik host.
- Easypanel "Adicionar Regra de Túnel" UI returns 400 — use Cloudflare API directly to set ingress config.
- All section components needed `'use client'` because they use `useCopy()` → React context. This is correct for Next.js (Client Components still get SSR HTML for initial load — SEO is preserved).
- Vite artifacts moved to `src/_vite/` and `src/_pages/` to avoid Next.js App Router conflicts.
- Next.js 15: `params` in dynamic routes is a `Promise` — use `await params`.

## Todos

- [ ] Deploy Next.js to Easypanel (point Cloudflare Tunnel to port 3000 instead of 80)
- [ ] Run Lighthouse after deploy to verify LCP < 2.5s, CLS < 0.1
- [ ] Convert `public/og/og-default.svg` → PNG 1200×630 (for SEO-01/OG image)
- [ ] Verify Qdrant Docker binding (127.0.0.1 or 0.0.0.0?)
- [x] Confirm routes — migrated: /, /projects/[slug], /politica-de-privacidade, /termos, /_not-found

## Deferred Ideas

- **OG image dynamic generation** (`app/og/route.tsx` with `ImageResponse`) — deferred, static PNG is sufficient for v1
- **i18n routing** (`/en`, `/es` subdirectories) — content translations exist but routing not implemented
- **Cloudflare Workers for A/B testing** — future, after baseline is established
- **Sentry Session Replay** — useful for UX debugging but expensive; evaluate after deploy

## Preferences

_Model guidance tip shown: No (not shown yet)_
