import type { ContactPayload } from './validateContactPayload'

/**
 * Dispara o webhook n8n com os dados brutos do lead.
 * A classificação por IA acontece no próprio n8n.
 * Fire-and-forget — falhas não afetam o usuário.
 */
export async function notifyLead(payload: ContactPayload): Promise<void> {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[notifyLead] N8N_CONTACT_WEBHOOK_URL not set')
    return
  }

  const body = {
    name:         payload.customer_name,
    email:        payload.customer_email,
    message:      payload.message,
    source:       payload.source,
    page_url:     payload.page_url,
    created_at:   payload.created_at,
    utm_source:   payload.utm_source,
    utm_medium:   payload.utm_medium,
    utm_campaign: payload.utm_campaign,
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
