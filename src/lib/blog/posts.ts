import { supabasePublic } from '../supabase/client'
import { estimateReadingTime } from './readingTime'
import type { PublicPostDetail, PublicPostSummary } from './types'

const SELECT_COLUMNS =
  'id, title, slug, excerpt, content, cover_image_url, cover_image_alt, category, tags, published_at, updated_at, featured'

type RawPostRow = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  cover_image_alt: string | null
  category: string
  tags: string[]
  published_at: string
  updated_at: string
  featured: boolean
}

function toSummary(row: RawPostRow): PublicPostSummary {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    cover_image_url: row.cover_image_url,
    cover_image_alt: row.cover_image_alt,
    category: row.category,
    tags: row.tags,
    published_at: row.published_at,
    featured: row.featured,
    readingTime: estimateReadingTime(row.content),
  }
}

/** Posts publicados (RLS já restringe a status='published' + published_at no passado). */
export async function getPublishedPosts(
  options: { limit?: number; category?: string } = {},
): Promise<PublicPostSummary[]> {
  let query = supabasePublic
    .schema('portfolio')
    .from('posts')
    .select(SELECT_COLUMNS)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (options.category) query = query.eq('category', options.category)
  if (options.limit) query = query.limit(options.limit)

  const { data, error } = await query
  if (error) {
    console.error('[blog/posts] getPublishedPosts error:', error.message)
    throw new Error('Não foi possível carregar os posts.')
  }

  return (data as RawPostRow[] | null ?? []).map(toSummary)
}

/** Os N posts mais recentes — usado na seção de blog da home. */
export function getLatestPosts(limit = 3): Promise<PublicPostSummary[]> {
  return getPublishedPosts({ limit })
}

export async function getPostBySlug(slug: string): Promise<PublicPostDetail | null> {
  const { data, error } = await supabasePublic
    .schema('portfolio')
    .from('posts')
    .select(SELECT_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error('[blog/posts] getPostBySlug error:', error.message)
    throw new Error('Não foi possível carregar o post.')
  }
  if (!data) return null

  const row = data as RawPostRow
  return {
    ...toSummary(row),
    content: row.content,
    updated_at: row.updated_at,
  }
}

/**
 * Posts relacionados: prioriza a mesma categoria, completa com os mais
 * recentes (de qualquer categoria) sem duplicar, até atingir `limit`.
 */
export async function getRelatedPosts(
  post: Pick<PublicPostSummary, 'slug' | 'category'>,
  limit = 3,
): Promise<PublicPostSummary[]> {
  const sameCategory = await getPublishedPosts({ category: post.category, limit: limit + 1 })
  const related = sameCategory.filter((p) => p.slug !== post.slug).slice(0, limit)

  if (related.length >= limit) return related

  const seen = new Set([post.slug, ...related.map((p) => p.slug)])
  const fallback = await getPublishedPosts({ limit: limit + seen.size })
  for (const p of fallback) {
    if (related.length >= limit) break
    if (seen.has(p.slug)) continue
    related.push(p)
    seen.add(p.slug)
  }
  return related
}
