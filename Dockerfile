# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage Next.js standalone build
# Produces a minimal image (~200 MB) using Next.js output: 'standalone'
#
# Easypanel: apontar porta 3000
# Tunnel:    cloudflared ingress → http://<service-name>:3000
# ─────────────────────────────────────────────────────────────────────────────

# Stage 1 — Full install + build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────────────────────────────────────
# Vars NEXT_PUBLIC_* precisam existir durante `next build` — Next.js as
# congela no HTML/JS estático nesse momento, não em runtime. Sem declarar os
# ARG aqui, qualquer --build-arg que a plataforma (Easypanel) passe é
# silenciosamente ignorado pelo Docker.
# ─────────────────────────────────────────────────────────────────────────────
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_CF_ANALYTICS_TOKEN
ARG NEXT_PUBLIC_FB_PIXEL_ID
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_CF_ANALYTICS_TOKEN=$NEXT_PUBLIC_CF_ANALYTICS_TOKEN
ENV NEXT_PUBLIC_FB_PIXEL_ID=$NEXT_PUBLIC_FB_PIXEL_ID
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# SUPABASE_SERVICE_ROLE_KEY não é NEXT_PUBLIC_ (nunca vai para o bundle do
# client), mas ainda precisa existir em build-time: src/lib/supabase/admin.ts
# lança erro no module load se ausente, e o Next.js carrega os route handlers
# (inclusive /api/blog/posts) durante `next build` para analisá-los.
ARG SUPABASE_SERVICE_ROLE_KEY
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY

RUN npm run build

# Stage 2 — Minimal production image
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
