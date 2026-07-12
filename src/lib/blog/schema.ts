import { z } from 'zod'

export const postStatusEnum = z.enum(['draft', 'scheduled', 'published', 'archived'])
export type PostStatus = z.infer<typeof postStatusEnum>

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

// Campos SEM default — usados como estão tanto no create quanto no update.
// Importante: nenhum default aqui, para que updatePostSchema (PATCH parcial)
// nunca "invente" um valor para um campo que o caller simplesmente não enviou
// (ex.: PATCH só com `featured` não pode zerar `tags` existentes).
const sharedPostFields = {
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().min(3).max(220).regex(slugPattern).optional(),
  excerpt: z.string().trim().min(10).max(300),
  content: z.string().min(20).max(200_000),
  cover_image_url: z.string().url().max(2000).optional(),
  cover_image_alt: z.string().trim().max(200).optional(),
  category: z.string().trim().min(2).max(60),
  tags: z.array(z.string().trim().min(1).max(40)).max(10),
  status: postStatusEnum,
  featured: z.boolean(),
  linkedin_content: z.string().max(5000).optional(),
  publish_on_linkedin: z.boolean(),
  published_at: z.string().datetime({ offset: true }).optional(),
  scheduled_at: z.string().datetime({ offset: true }).optional(),
}

function checkStatusDateCoherence(
  data: { status?: PostStatus; published_at?: string; scheduled_at?: string },
  ctx: z.RefinementCtx,
) {
  if (data.status === 'published' && !data.published_at) {
    ctx.addIssue({
      code: 'custom',
      path: ['published_at'],
      message: 'published_at é obrigatório quando status = published',
    })
  }
  if (data.status === 'scheduled' && !data.scheduled_at) {
    ctx.addIssue({
      code: 'custom',
      path: ['scheduled_at'],
      message: 'scheduled_at é obrigatório quando status = scheduled',
    })
  }
}

// POST /api/blog/posts — campos obrigatórios exigidos, com defaults sensatos
// para os opcionais (tags, status, featured, publish_on_linkedin).
export const createPostSchema = z
  .object(sharedPostFields)
  .partial({
    slug: true,
    cover_image_url: true,
    cover_image_alt: true,
    tags: true,
    status: true,
    featured: true,
    linkedin_content: true,
    publish_on_linkedin: true,
    published_at: true,
    scheduled_at: true,
  })
  .transform((data) => ({
    ...data,
    tags: data.tags ?? [],
    status: data.status ?? ('draft' as const),
    featured: data.featured ?? false,
    publish_on_linkedin: data.publish_on_linkedin ?? false,
  }))
  .superRefine(checkStatusDateCoherence)

export type CreatePostInput = z.infer<typeof createPostSchema>

// PATCH /api/blog/posts/[id] — tudo opcional, SEM defaults. Um campo ausente
// no payload significa "não alterar", nunca "resetar para o valor padrão".
// A coerência status/data é revalidada no handler, combinando o payload com a
// linha atual do banco (ex.: PATCH só com `featured` não deve exigir published_at).
export const updatePostSchema = z.object(sharedPostFields).partial()

export type UpdatePostInput = z.infer<typeof updatePostSchema>
