import type { NextRequest } from 'next/server'

// Rate limiter in-memory (mesmo padrão de src/app/api/contact/route.ts).
// Não é multi-instância-safe, mas o deploy atual (Easypanel, output:standalone)
// roda como processo único, e o único consumidor esperado é o workflow n8n.

export function getRequestIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

export function createRateLimiter(windowMs: number, maxRequests: number) {
  const store = new Map<string, { count: number; resetAt: number }>()

  const interval = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 30 * 60 * 1000)
  interval.unref?.()

  return function isRateLimited(key: string): boolean {
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs })
      return false
    }
    if (entry.count >= maxRequests) return true
    entry.count++
    return false
  }
}
