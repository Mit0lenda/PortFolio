import { timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

/**
 * Valida o header `Authorization: Bearer <secret>` contra BLOG_WEBHOOK_SECRET.
 * Usa timingSafeEqual para evitar vazar informação por diferença de tempo de
 * resposta. Fail-closed: sem env configurada, nunca autoriza.
 */
export function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.BLOG_WEBHOOK_SECRET
  if (!secret) return false

  const header = req.headers.get('authorization') ?? ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) return false

  const tokenBuf = Buffer.from(token)
  const secretBuf = Buffer.from(secret)

  // timingSafeEqual exige buffers do mesmo tamanho. O tamanho do secret não é
  // informação sensível relevante (não é derivável a ponto de ajudar um
  // atacante a adivinhar o valor), então retornar cedo aqui não introduz um
  // oráculo de timing útil.
  if (tokenBuf.length !== secretBuf.length) return false

  return timingSafeEqual(tokenBuf, secretBuf)
}
