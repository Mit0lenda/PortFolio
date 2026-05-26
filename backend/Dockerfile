# ─────────────────────────────────────────────────────────────────────────────
# Multi-stage NestJS build
# Port: 4000
# Easypanel: apontar porta 4000
# ─────────────────────────────────────────────────────────────────────────────

# Stage 1 — Install production deps only (cached layer)
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --legacy-peer-deps

# Stage 2 — Full install + compile TypeScript
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 3 — Minimal production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nestjs

# Copy only what the compiled server needs
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/dist         ./dist
COPY --from=builder /app/package.json ./package.json

USER nestjs

EXPOSE 4000

# NestJS compiled entry point
CMD ["node", "dist/main"]
