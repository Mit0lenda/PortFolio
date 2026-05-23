import { NextRequest, NextResponse } from 'next/server'
import { validateContactPayload } from '../../../lib/contact/validateContactPayload'
import { saveLead }               from '../../../lib/contact/saveLead'
import { notifyLead }             from '../../../lib/contact/notifyLead'
import type { ContactPayload }    from '../../../lib/contact/validateContactPayload'

// ─── Rate limiting (in-memory, por IP + email) ───────────────────────────────
const RATE_WINDOW_MS = 15 * 60 * 1000 // 15 minutos
const MAX_REQUESTS   = 5

const ratemap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string): boolean {
  const now   = Date.now()
  const entry = ratemap.get(key)

  if (!entry || now > entry.resetAt) {
    ratemap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count++
  return false
}

// Limpa entradas expiradas a cada 30 min
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of ratemap.entries()) {
    if (now > entry.resetAt) ratemap.delete(key)
  }
}, 30 * 60 * 1000)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

function hashIp(ip: string): string {
  let h = 0
  for (let i = 0; i < ip.length; i++) {
    h = Math.imul(31, h) + ip.charCodeAt(i) | 0
  }
  return Math.abs(h).toString(36)
}

// ─── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Normaliza payload (aceita formato novo e legado {name,email,message})
    const payload: ContactPayload = {
      source:          body.source         ?? 'contact_section',
      customer_name:   body.customer_name  ?? body.name    ?? '',
      customer_email:  body.customer_email ?? body.email   ?? '',
      message:         body.message        ?? '',
      created_at:      body.created_at     ?? new Date().toISOString(),
      page_url:        body.page_url       ?? req.headers.get('referer') ?? '',
      user_agent:      body.user_agent     ?? req.headers.get('user-agent') ?? '',
      company_website: body.company_website,
    }

    // ── Validação ──────────────────────────────────────────────────────────
    const validation = validateContactPayload(payload)
    if (!validation.ok) {
      // Honeypot: retorna sucesso falso para não dar feedback ao bot
      if (validation.code === 'BOT_DETECTED') {
        return NextResponse.json(
          { success: true, status: 'received', message: 'Mensagem recebida com sucesso.' },
          { status: 201 },
        )
      }
      return NextResponse.json(
        { success: false, code: validation.code, message: validation.message },
        { status: 400 },
      )
    }

    // ── Rate limiting ──────────────────────────────────────────────────────
    const ip     = getIp(req)
    const ipHash = hashIp(ip)

    if (isRateLimited(ip) || isRateLimited(payload.customer_email.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          code:    'RATE_LIMITED',
          message: 'Muitas mensagens enviadas. Aguarde alguns minutos antes de tentar novamente.',
        },
        { status: 429 },
      )
    }

    // ── Responde imediatamente; processamento em background ────────────────
    Promise.resolve().then(async () => {
      try {
        await saveLead(payload, ipHash)
        await notifyLead(payload)   // n8n cuida da classificação IA e auto-resposta
      } catch (err) {
        console.error('[contact] Background error (non-fatal):', err)
      }
    })

    return NextResponse.json(
      { success: true, status: 'received', message: 'Mensagem recebida! Entrarei em contato em breve.' },
      { status: 201 },
    )
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { success: false, code: 'INTERNAL_ERROR', message: 'Erro inesperado. Tente novamente.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
