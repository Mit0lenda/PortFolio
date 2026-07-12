import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthorized } from '../../../../lib/blog/auth'
import { createPostSchema } from '../../../../lib/blog/schema'
import { ensureUniqueSlug, slugify } from '../../../../lib/blog/slug'
import { createRateLimiter, getRequestIp } from '../../../../lib/blog/rateLimit'
import { supabaseAdmin } from '../../../../lib/supabase/admin'

const MAX_BODY_BYTES = 256 * 1024
// Consumidor esperado é só o workflow n8n — janela generosa mas ainda finita,
// como defesa em profundidade caso o secret vaze.
const isRateLimited = createRateLimiter(15 * 60 * 1000, 30)

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mitolenda.dev'
}

function tooLarge() {
  return NextResponse.json(
    { success: false, code: 'PAYLOAD_TOO_LARGE', message: 'Payload excede o limite permitido (256 KB).' },
    { status: 413 },
  )
}

// ─── POST /api/blog/posts ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
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

    const parsed = createPostSchema.safeParse(json)
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
    const slugBase = input.slug ?? slugify(input.title)

    let slug: string
    try {
      slug = await ensureUniqueSlug(slugBase, supabaseAdmin)
    } catch (err) {
      console.error('[blog/posts POST] slug error:', err)
      return NextResponse.json(
        { success: false, code: 'SLUG_ERROR', message: 'Não foi possível gerar um slug único a partir do título.' },
        { status: 400 },
      )
    }

    const { data, error } = await supabaseAdmin
      .schema('portfolio')
      .from('posts')
      .insert({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        cover_image_url: input.cover_image_url ?? null,
        cover_image_alt: input.cover_image_alt ?? null,
        category: input.category,
        tags: input.tags,
        status: input.status,
        featured: input.featured,
        linkedin_content: input.linkedin_content ?? null,
        publish_on_linkedin: input.publish_on_linkedin,
        published_at: input.published_at ?? null,
        scheduled_at: input.scheduled_at ?? null,
      })
      .select('id, slug, status')
      .single()

    if (error || !data) {
      console.error('[blog/posts POST] insert error:', error?.message)
      if (error?.code === '23505') {
        return NextResponse.json(
          { success: false, code: 'SLUG_CONFLICT', message: 'Slug já existe.' },
          { status: 409 },
        )
      }
      return NextResponse.json(
        { success: false, code: 'INTERNAL_ERROR', message: 'Erro ao criar o post.' },
        { status: 500 },
      )
    }

    revalidatePath('/blog')
    if (data.status === 'published') {
      revalidatePath(`/blog/${data.slug}`)
      revalidatePath('/')
    }

    return NextResponse.json(
      { success: true, id: data.id, slug: data.slug, url: `${siteUrl()}/blog/${data.slug}` },
      { status: 201 },
    )
  } catch (err) {
    console.error('[blog/posts POST] Unexpected error:', err)
    return NextResponse.json(
      { success: false, code: 'INTERNAL_ERROR', message: 'Erro inesperado. Tente novamente.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
