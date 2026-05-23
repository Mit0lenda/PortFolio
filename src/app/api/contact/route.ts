import { NextRequest, NextResponse } from 'next/server'
import { validateContactPayload } from '../../../lib/contact/validateContactPayload'
import { classifyLead }           from '../../../lib/contact/classifyLead'
import { saveLead }               from '../../../lib/contact/saveLead'
import { notifyLead }             from '../../../lib/contact/notifyLead'
import type { ContactPayload }    from '../../../lib/contact/validateContactPayload'

// ─── Rate limiting (in-memory, per IP + email) ──────────────────────────────
// Allows up to MAX_REQUESTS per WINDOW_MS per key (IP or email)
const RATE_WINDOW_MS  = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS    = 5

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

// Prevent memory leak — clean up stale entries every 30 min
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of ratemap.entries()) {
    if (now > entry.resetAt) ratemap.delete(key)
  }
}, 30 * 60 * 1000)

// ─── IP helper ───────────────────────────────────────────────────────────────
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

// ─── Delay helper ────────────────────────────────────────────────────────────
function randomDelayMs(minMin: number, maxMin: number): number {
  return (minMin + Math.random() * (maxMin - minMin)) * 60 * 1000
}

// ─── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Build typed payload (accept both legacy {name,email,message} and new format)
    const payload: ContactPayload = {
      source:           body.source         ?? 'contact_section',
      customer_name:    body.customer_name  ?? body.name    ?? '',
      customer_email:   body.customer_email ?? body.email   ?? '',
      message:          body.message        ?? '',
      created_at:       body.created_at     ?? new Date().toISOString(),
      page_url:         body.page_url       ?? req.headers.get('referer') ?? '',
      user_agent:       body.user_agent     ?? req.headers.get('user-agent') ?? '',
      company_website:  body.company_website,
    }

    // ── Validation ─────────────────────────────────────────────────────────
    const validation = validateContactPayload(payload)
    if (!validation.ok) {
      // Honeypot failures look like success to avoid bot feedback loops
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

    // ── Respond immediately (background processing begins below) ──────────
    const responsePayload = {
      success: true,
      status:  'received',
      message: 'Mensagem recebida! Entrarei em contato em breve.',
    }

    // ── Background: classify → save → notify (with 3-5 min delay) ─────────
    // Fire-and-forget — errors never reach the user
    Promise.resolve().then(async () => {
      try {
        const classification = await classifyLead(
          payload.customer_name,
          payload.customer_email,
          payload.message,
        )

        await saveLead(payload, classification, ipHash)

        // Only notify for non-spam leads
        if (!classification.is_spam && classification.lead_quality !== 'invalid') {
          const delay = randomDelayMs(3, 5)
          await new Promise((resolve) => setTimeout(resolve, delay))
          await notifyLead(payload, classification)
        }
      } catch (err) {
        console.error('[contact] Background processing error (non-fatal):', err)
      }
    })

    return NextResponse.json(responsePayload, { status: 201 })
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
