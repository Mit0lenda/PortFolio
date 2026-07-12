import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthorized } from '../../../../../lib/blog/auth'
import { updatePostSchema } from '../../../../../lib/blog/schema'
import { ensureUniqueSlug } from '../../../../../lib/blog/slug'
import { createRateLimiter, getRequestIp } from '../../../../../lib/blog/rateLimit'
import { supabaseAdmin } from '../../../../../lib/supabase/admin'

const MAX_BODY_BYTES = 256 * 1024
const isRateLimited = createRateLimiter(15 * 60 * 1000, 30)

function tooLarge() {
  return NextResponse.json(
    { success: false, code: 'PAYLOAD_TOO_LARGE', message: 'Payload excede o limite permitido (256 KB).' },
    { status: 413 },
  )
}

// ─── PATCH /api/blog/posts/[id] ───────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const declaredLength = Number(req.headers.get('content-length') ?? '0')
    if (declaredLength > MAX_BODY_BYTES) return tooLarge()

    if (!isAuthorized(req)) {
      return NextResponse.json(
        { success: false, code: 'UNAUTHORIZED', message: 'Credenciais ausentes ou inválidas.' },
        { status: 401 },
      )
    }

    if (isRateLimited(getRequestIp(req))) {
      return NextResponse.json(
        {
          success: false,
          code: 'RATE_LIMITED',
          message: 'Muitas requisições. Aguarde alguns minutos antes de tentar novamente.',
        },
        { status: 429 },
      )
    }

    const rawBody = await req.text()
    if (rawBody.length > MAX_BODY_BYTES) return tooLarge()

    let json: unknown
    try {
      json = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { success: false, code: 'INVALID_JSON', message: 'Corpo da requisição não é um JSON válido.' },
        { status: 400 },
      )
    }

    const parsed = updatePostSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          code: 'VALIDATION_ERROR',
          message: 'Payload inválido.',
          fields: parsed.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }

    const input = parsed.data
    if (Object.keys(input).length === 0) {
      return NextResponse.json(
        { success: false, code: 'EMPTY_PAYLOAD', message: 'Nenhum campo para atualizar foi enviado.' },
        { status: 400 },
      )
    }

    const { data: current, error: fetchError } = await supabaseAdmin
      .schema('portfolio')
      .from('posts')
      .select('id, slug, status, published_at, scheduled_at')
      .eq('id', id)
      .single()

    if (fetchError || !current) {
      return NextResponse.json(
        { success: false, code: 'NOT_FOUND', message: 'Post não encontrado.' },
        { status: 404 },
      )
    }

    // Coerência status/data combinando payload + estado atual — um PATCH que só
    // muda `featured`, por exemplo, não precisa reenviar published_at.
    const nextStatus = input.status ?? current.status
    const nextPublishedAt = input.published_at ?? current.published_at
    const nextScheduledAt = input.scheduled_at ?? current.scheduled_at

    if (nextStatus === 'published' && !nextPublishedAt) {
      return NextResponse.json(
        {
          success: false,
          code: 'VALIDATION_ERROR',
          message: 'published_at é obrigatório para status=published.',
        },
        { status: 400 },
      )
    }
    if (nextStatus === 'scheduled' && !nextScheduledAt) {
      return NextResponse.json(
        {
          success: false,
          code: 'VALIDATION_ERROR',
          message: 'scheduled_at é obrigatório para status=scheduled.',
        },
        { status: 400 },
      )
    }

    const updatePayload: Record<string, unknown> = { ...input }
    if (input.slug !== undefined) {
      try {
        updatePayload.slug = await ensureUniqueSlug(input.slug, supabaseAdmin, id)
      } catch (err) {
        console.error('[blog/posts/:id PATCH] slug error:', err)
        return NextResponse.json(
          { success: false, code: 'SLUG_ERROR', message: 'Não foi possível gerar um slug único.' },
          { status: 400 },
        )
      }
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .schema('portfolio')
      .from('posts')
      .update(updatePayload)
      .eq('id', id)
      .select('id, slug, status')
      .single()

    if (updateError || !updated) {
      console.error('[blog/posts/:id PATCH] update error:', updateError?.message)
      if (updateError?.code === '23505') {
        return NextResponse.json(
          { success: false, code: 'SLUG_CONFLICT', message: 'Slug já existe.' },
          { status: 409 },
        )
      }
      return NextResponse.json(
        { success: false, code: 'INTERNAL_ERROR', message: 'Erro ao atualizar o post.' },
        { status: 500 },
      )
    }

    revalidatePath('/blog')
    revalidatePath(`/blog/${current.slug}`)
    if (updated.slug !== current.slug) revalidatePath(`/blog/${updated.slug}`)
    revalidatePath('/')

    return NextResponse.json({ success: true, id: updated.id, slug: updated.slug }, { status: 200 })
  } catch (err) {
    console.error('[blog/posts/:id PATCH] Unexpected error:', err)
    return NextResponse.json(
      { success: false, code: 'INTERNAL_ERROR', message: 'Erro inesperado. Tente novamente.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
