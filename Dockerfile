# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage Next.js standalone build
# Produces a minimal image (~200 MB) using Next.js output: 'standalone'
#
# Easypanel: apontar porta 3000
# Tunnel:    cloudflared ingress → http://<service-name>:3000
# ─────────────────────────────────────────────────────────────────────────────

# Stage 1 — Install production deps only (cached layer)
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 2 — Full install + build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3 — Minimal production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what the standalone server needs
COPY --from=builder /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 3000

# Next.js standalone entry point
CMD ["node", "server.js"]
