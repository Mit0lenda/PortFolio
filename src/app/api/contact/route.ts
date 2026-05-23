import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const n8nWebhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL

function hashIp(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, email, message' },
        { status: 400 },
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Sanitize — trim and limit length
    const lead = {
      name:       String(name).trim().slice(0, 100),
      email:      String(email).trim().toLowerCase().slice(0, 254),
      message:    String(message).trim().slice(0, 2000),
      source:     'contact-form',
      lang:       'pt',
      ip_hash:    hashIp(
        req.headers.get('cf-connecting-ip') ??
        req.headers.get('x-forwarded-for') ??
        'unknown',
      ),
    }

    // 1. Save to Supabase (public.portfolio_leads — already exposed via REST API)
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { error: dbError } = await supabase
        .from('portfolio_leads')
        .insert(lead)

      if (dbError) {
        console.error('[contact] Supabase insert error:', dbError.message)
        // Don't block the response — lead will be retried via n8n webhook
      }
    } else {
      console.warn('[contact] Supabase env vars not set — skipping DB insert')
    }

    // 2. Fire n8n webhook (non-blocking — notification even if DB insert failed)
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lead.name, email: lead.email, message: lead.message }),
      }).catch((err) =>
        console.warn('[contact] n8n webhook fire failed (non-fatal):', err.message),
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 })
  }
}

// Reject all other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
