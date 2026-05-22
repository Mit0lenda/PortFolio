# mitolenda.dev — State

> Persistent memory: decisions, blockers, lessons, deferred ideas.

## Decisions

| Date | ID | Decision | Rationale |
|---|---|---|---|
| 2026-05-22 | D-01 | Migrate to Next.js 14 App Router (not Pages Router) | App Router has native metadata API, Server Components, better ISR support |
| 2026-05-22 | D-02 | Design system preserved byte-for-byte | Intentional aesthetic — editing it would break the editorial look |
| 2026-05-22 | D-03 | Cloudflare Free plan only | No budget for paid features; Free covers all critical security needs |
| 2026-05-22 | D-04 | Cloudflare Tunnel instead of exposing VPS port | Hides origin IP; works transparently with Easypanel |
| 2026-05-22 | D-05 | next/font replaces @import Google Fonts | Only CSS change allowed — eliminates render-blocking import, zero visual change |
| 2026-05-22 | D-06 | Qdrant binds to 127.0.0.1 only | Vector DB must never be publicly accessible |
| 2026-05-22 | D-07 | ISR home page revalidate: 3600 | Balances freshness with SEO caching at Cloudflare edge |

## Blockers

_None currently._

## Lessons

- The current `sitemap.xml` in `public/` references routes (`/recruiter`, `/client`, `/projects/*`) that don't exist as Vite routes — these are likely aspirational. Confirm which routes actually exist before generating the Next.js sitemap.
- `tokens.css` has a blocking `@import` — this was the #1 LCP bottleneck before being identified.

## Todos

- [ ] Verify current Cloudflare SSL/TLS mode (may already be Full Strict)
- [ ] Verify Qdrant Docker binding (127.0.0.1 or 0.0.0.0?)
- [ ] Confirm complete list of existing routes in the Vite app before migration
- [ ] Convert `public/og/og-default.svg` → PNG 1200×630

## Deferred Ideas

- **OG image dynamic generation** (`app/og/route.tsx` with `ImageResponse`) — deferred, static PNG is sufficient for v1
- **i18n routing** (`/en`, `/es` subdirectories) — content translations exist but routing not implemented
- **Cloudflare Workers for A/B testing** — future, after baseline is established
- **Sentry Session Replay** — useful for UX debugging but expensive; evaluate after deploy

## Preferences

_Model guidance tip shown: No (not shown yet)_
