# Cloudflare Hardening Specification

## Problem Statement

mitolenda.dev's Cloudflare is likely running with default settings — possibly Flexible SSL (plaintext to origin), no aggressive caching, and no WAF rules. This means: (1) every bot, scanner, and bad actor hits the VPS directly, burning CPU; (2) static assets aren't cached at the edge, forcing round-trips to the VPS; (3) the VPS IP may be exposed via DNS, making DDoS trivial.

## Goals

- [ ] 100% of bot/scanner traffic blocked at Cloudflare edge (never reaches VPS)
- [ ] Static assets (`_next/static/*`) served from Cloudflare cache — `CF-Cache-Status: HIT`
- [ ] VPS IP hidden from public DNS (no A/AAAA records pointing to real IP)
- [ ] SSL/TLS validated as Full (Strict) mode

## Out of Scope

| Feature | Reason |
|---|---|
| Cloudflare paid features | Budget constraint — Free plan only |
| Cloudflare Workers | Not needed for this scale |
| DDoS mitigation beyond Bot Fight Mode | Covered by Free tier defaults |

---

## User Stories

### P1: CF-01 — SSL/TLS Full Strict ⭐ MVP

**User Story**: As the site owner, I want all traffic encrypted end-to-end so that there's no MITM between Cloudflare and the VPS.

**Why P1**: Flexible SSL sends plaintext HTTP to origin — a critical security hole.

**Acceptance Criteria**:

1. WHEN Cloudflare SSL/TLS mode is checked THEN it SHALL be set to "Full (strict)"
2. WHEN Cloudflare Origin Certificate is installed on Easypanel THEN origin SHALL respond with a valid cert
3. WHEN `curl -I https://mitolenda.dev` runs THEN response SHALL include `strict-transport-security` header
4. WHEN HTTP request hits mitolenda.dev THEN Cloudflare SHALL redirect to HTTPS (Always Use HTTPS: ON)

**Independent Test**: `curl http://mitolenda.dev -I` → `301` or `308` redirect to `https://`.

---

### P1: CF-02 — Cache Rules ⭐ MVP

**User Story**: As a visitor, I want static assets served from Cloudflare's edge so that pages load fast from any geography.

**Why P1**: Without caching, every asset hits the VPS — wasted bandwidth and latency.

**Acceptance Criteria**:

1. WHEN `/_next/static/*` is requested THEN `CF-Cache-Status` SHALL be `HIT` after first load
2. WHEN `/_next/image/*` is requested THEN `CF-Cache-Status` SHALL be `HIT` after first load
3. WHEN `/api/*` is requested THEN `CF-Cache-Status` SHALL be `BYPASS`
4. WHEN an ISR page is requested THEN Cloudflare SHALL respect `Cache-Control: s-maxage=X, stale-while-revalidate=Y` from Next.js

**Independent Test**: `curl -I https://mitolenda.dev/_next/static/chunks/main.js | grep CF-Cache-Status` → `HIT`.

---

### P1: CF-03 — WAF + Bot Fight Mode ⭐ MVP

**User Story**: As the VPS owner, I want known malicious bots and scanners blocked at the edge so that my VPS CPU is not wasted on bad traffic.

**Why P1**: Without this, every scanner (sqlmap, nikto, Semrush bot in aggressive mode) hits the origin.

**Acceptance Criteria**:

1. WHEN Bot Fight Mode is enabled THEN Cloudflare SHALL block known bot signatures before reaching VPS
2. WHEN a request matches `cf.client.bot` THEN it SHALL be blocked with 403
3. WHEN `/api/*` receives > 60 requests/min from single IP THEN it SHALL be challenged or blocked
4. WHEN `Security Level: Medium` is set THEN requests with threat score > 14 SHALL be challenged

**Independent Test**: Check Cloudflare Firewall Events dashboard after 24h → should show blocked bot requests.

---

### P1: CF-04 — Cloudflare Tunnel ⭐ MVP

**User Story**: As the VPS owner, I want the server IP hidden from public DNS so that the VPS can't be directly targeted by DDoS or port scanners.

**Why P1**: If the IP is exposed, all Cloudflare protection can be bypassed by hitting the IP directly.

**Acceptance Criteria**:

1. WHEN `cloudflared tunnel list` runs on the VPS THEN a tunnel named `mitolenda` SHALL exist and be active
2. WHEN `dig mitolenda.dev` runs THEN the response SHALL show Cloudflare IP ranges, NOT the VPS IP
3. WHEN the Cloudflare DNS has no A/AAAA record pointing to the real VPS IP THEN direct IP access SHALL not reach the site
4. WHEN `sudo systemctl status cloudflared` runs THEN status SHALL be `active (running)`
5. WHEN `https://mitolenda.dev` is accessed via browser THEN site SHALL load normally through the tunnel

**Independent Test**: `dig A mitolenda.dev` → IP is in Cloudflare range (104.16.x.x, 172.64.x.x, etc.), not the VPS IP.

---

### P2: CF-05 — Security Headers

**Acceptance Criteria**:

1. WHEN any page is loaded THEN response SHALL include `X-Content-Type-Options: nosniff`
2. WHEN any page is loaded THEN response SHALL include `X-Frame-Options: SAMEORIGIN`
3. WHEN any page is loaded THEN response SHALL include `Referrer-Policy: strict-origin-when-cross-origin`

**Independent Test**: `curl -I https://mitolenda.dev | grep -E "x-content|x-frame|referrer"` → all three headers present.

---

## Edge Cases

- WHEN `cloudflared` daemon crashes THEN site SHALL be unreachable (single point of failure — document restart policy)
- WHEN Cloudflare Origin Certificate expires (15 years) THEN renew before expiry date
- WHEN ISR revalidation request comes from Next.js server THEN it SHALL bypass Cloudflare cache (Next.js uses `Cache-Control: no-store` for revalidation calls)

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| CF-01 | SSL Full Strict | Tasks | Pending |
| CF-02 | Cache Rules | Tasks | Pending |
| CF-03 | WAF + Bot Fight | Tasks | Pending |
| CF-04 | Cloudflare Tunnel | Tasks | Pending |
| CF-05 | Security Headers | Tasks | Pending |

---

## Success Criteria

- [ ] `curl -I https://mitolenda.dev` shows `strict-transport-security`
- [ ] `CF-Cache-Status: HIT` for `/_next/static/*` assets
- [ ] `dig A mitolenda.dev` returns Cloudflare IP, not VPS IP
- [ ] Cloudflare Firewall Events shows blocked bot requests after 24h
- [ ] Zero direct-to-origin access possible (verified by checking with VPS firewall logs)
