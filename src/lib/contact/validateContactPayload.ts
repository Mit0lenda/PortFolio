export interface ContactPayload {
  source: 'floating_contact' | 'contact_section'
  customer_name: string
  customer_email: string
  message: string
  created_at: string
  page_url: string
  user_agent: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  company_website?: string // honeypot
}

export interface ValidationResult {
  ok: boolean
  code?: string
  message?: string
}

const SPAM_PATTERNS = [
  /https?:\/\//gi, // links (allow max 1)
  /\b(casino|crypto|bitcoin|empréstimo|loan|forex|invest|porn|sex|viagra|pill)\b/i,
  /\b(SEO service|backlink|rank your|guest post|buy follow|click here)\b/i,
]

export function validateContactPayload(payload: ContactPayload): ValidationResult {
  const { customer_name, customer_email, message, company_website } = payload

  // Honeypot — bots preenchem, humanos não veem o campo
  if (company_website && company_website.trim().length > 0) {
    return { ok: false, code: 'BOT_DETECTED', message: 'Mensagem recebida com sucesso.' }
  }

  // Nome
  const name = customer_name?.trim() ?? ''
  if (name.length < 2) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Nome precisa ter ao menos 2 caracteres.' }
  }
  if (name.length > 100) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Nome muito longo.' }
  }

  // Email
  const email = customer_email?.trim() ?? ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'E-mail inválido.' }
  }
  if (email.length > 254) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'E-mail muito longo.' }
  }

  // Mensagem
  const msg = message?.trim() ?? ''
  if (msg.length < 20) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Mensagem muito curta (mínimo 20 caracteres).' }
  }
  if (msg.length > 2000) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Mensagem muito longa (máximo 2000 caracteres).' }
  }

  // Bloqueio mensagens genéricas/teste
  const genericPatterns = /^(oi|hi|hello|teste|test|asdf|qwerty|123|aaa|kkk|ok|hey)\s*[.!?]*$/i
  if (genericPatterns.test(msg)) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Descreva melhor seu projeto ou necessidade.' }
  }

  // Links excessivos (mais de 1)
  const linkCount = (msg.match(/https?:\/\//gi) ?? []).length
  if (linkCount > 1) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Mensagem com links excessivos não permitida.' }
  }

  // Padrões de spam
  for (const pattern of SPAM_PATTERNS.slice(1)) {
    if (pattern.test(msg)) {
      return { ok: false, code: 'SPAM_DETECTED', message: 'Mensagem recebida com sucesso.' }
    }
  }

  return { ok: true }
}
