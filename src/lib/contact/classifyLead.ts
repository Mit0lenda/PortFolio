export interface LeadClassification {
  is_human: boolean
  is_spam: boolean
  lead_quality: 'high' | 'medium' | 'low' | 'invalid'
  intent: 'site' | 'sistema' | 'automacao' | 'orcamento' | 'duvida' | 'suporte' | 'parceria' | 'outro'
  urgency: 'high' | 'medium' | 'low'
  summary: string
  recommended_action: 'responder' | 'ignorar' | 'pedir_mais_contexto'
}

const FALLBACK: LeadClassification = {
  is_human: true,
  is_spam: false,
  lead_quality: 'medium',
  intent: 'outro',
  urgency: 'low',
  summary: 'Classificação indisponível — revisar manualmente.',
  recommended_action: 'pedir_mais_contexto',
}

const SYSTEM_PROMPT = `Você é um classificador de leads para a DEV_MITOLENDA.

Sua função é analisar mensagens enviadas pelo formulário de contato e retornar apenas um JSON válido, sem markdown, sem texto extra e sem explicações.

A DEV_MITOLENDA trabalha com desenvolvimento de sites, sistemas web, automações, integrações, APIs, IA aplicada a negócios, landing pages e presença digital para pequenas e médias empresas.

Classifique a mensagem com foco em:
- detectar se parece escrita por uma pessoa real
- detectar spam, bot, teste vazio ou mensagem sem intenção clara
- identificar intenção comercial
- resumir o pedido
- recomendar ação

Regras negativas:
- Não aceite mensagens genéricas como lead bom.
- Não trate "oi", "teste", "asdf", "quero saber", "me chama", "123", "aaa" ou variações como lead qualificado.
- Não aceite mensagens com excesso de links.
- Não aceite mensagens promocionais oferecendo serviços aleatórios.
- Não aceite mensagens com conteúdo automático, scraping, casino, investimento suspeito, cripto, empréstimo, conteúdo adulto, SEO spam ou venda em massa.
- Não classifique como high sem contexto mínimo sobre projeto, necessidade, negócio, prazo ou objetivo.

Critérios de lead_quality:
- high: mensagem clara, com contexto de projeto, empresa, objetivo ou necessidade real.
- medium: mensagem parece real, mas precisa de mais contexto.
- low: mensagem humana, mas vaga.
- invalid: spam, bot, teste, mensagem vazia, ofensiva, automática ou sem intenção útil.

Retorne obrigatoriamente apenas o JSON, sem markdown:
{"is_human":boolean,"is_spam":boolean,"lead_quality":"high"|"medium"|"low"|"invalid","intent":"site"|"sistema"|"automacao"|"orcamento"|"duvida"|"suporte"|"parceria"|"outro","urgency":"high"|"medium"|"low","summary":"string","recommended_action":"responder"|"ignorar"|"pedir_mais_contexto"}`

export async function classifyLead(
  name: string,
  email: string,
  message: string,
): Promise<LeadClassification> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn('[classifyLead] OPENAI_API_KEY not set — using fallback')
    return FALLBACK
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 300,
        temperature: 0,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      console.error('[classifyLead] OpenAI error:', res.status)
      return FALLBACK
    }

    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content ?? ''

    // Strip markdown fences if present
    const clean = raw.replace(/```json\n?|\n?```/g, '').trim()
    const parsed = JSON.parse(clean) as LeadClassification

    // Validate required keys
    if (typeof parsed.is_human !== 'boolean' || !parsed.lead_quality) {
      return FALLBACK
    }

    return parsed
  } catch (err) {
    console.error('[classifyLead] Exception:', err)
    return FALLBACK
  }
}
