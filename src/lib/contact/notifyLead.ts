import type { ContactPayload } from './validateContactPayload'
import type { LeadClassification } from './classifyLead'

const QUALITY_EMOJI: Record<string, string> = {
  high:    '🔥',
  medium:  '⚡',
  low:     '🧊',
  invalid: '🚫',
}

const URGENCY_LABEL: Record<string, string> = {
  high:   'URGENTE',
  medium: 'Normal',
  low:    'Sem pressa',
}

/**
 * Dispara o webhook n8n com dados do lead + classificação da IA.
 * Chamada fire-and-forget — falhas não afetam o usuário.
 */
export async function notifyLead(
  payload: ContactPayload,
  classification: LeadClassification,
): Promise<void> {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[notifyLead] N8N_CONTACT_WEBHOOK_URL not set')
    return
  }

  const qualityEmoji = QUALITY_EMOJI[classification.lead_quality] ?? '📋'
  const urgencyLabel = URGENCY_LABEL[classification.urgency] ?? 'Normal'

  const body = {
    // Dados do lead
    name:       payload.customer_name,
    email:      payload.customer_email,
    message:    payload.message,
    source:     payload.source,
    page_url:   payload.page_url,
    created_at: payload.created_at,

    // Classificação IA
    lead_quality:       classification.lead_quality,
    lead_quality_emoji: qualityEmoji,
    intent:             classification.intent,
    urgency:            classification.urgency,
    urgency_label:      urgencyLabel,
    summary:            classification.summary,
    recommended_action: classification.recommended_action,

    // Email subject helper
    subject: `${qualityEmoji} [${classification.lead_quality.toUpperCase()}] Novo lead: ${payload.customer_name} — mitolenda.dev`,
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    })
  } catch (err) {
    console.warn('[notifyLead] Webhook failed (non-fatal):', err)
  }
}
