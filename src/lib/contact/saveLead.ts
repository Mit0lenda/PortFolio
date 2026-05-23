import { createClient } from '@supabase/supabase-js'
import type { ContactPayload } from './validateContactPayload'
import type { LeadClassification } from './classifyLead'

export async function saveLead(
  payload: ContactPayload,
  classification: LeadClassification,
  ipHash: string,
): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn('[saveLead] Supabase env vars not set')
    return false
  }

  try {
    const supabase = createClient(url, key)
    const { error } = await supabase.from('portfolio_leads').insert({
      name:        payload.customer_name.trim().slice(0, 100),
      email:       payload.customer_email.trim().toLowerCase().slice(0, 254),
      message:     payload.message.trim().slice(0, 2000),
      source:      payload.source,
      lang:        'pt',
      ip_hash:     ipHash,
      // Store classification as JSON in the message field won't work,
      // so we add it to utm_campaign temporarily for visibility
      utm_campaign: `quality:${classification.lead_quality}|intent:${classification.intent}`,
    })
    if (error) console.error('[saveLead] Supabase error:', error.message)
    return !error
  } catch (err) {
    console.error('[saveLead] Exception:', err)
    return false
  }
}
