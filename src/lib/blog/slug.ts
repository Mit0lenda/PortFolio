import type { SupabaseClient } from '@supabase/supabase-js'

// Remove acentos/diacríticos e normaliza para kebab-case ASCII.
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200)
}

/**
 * Garante que o slug é único em portfolio.posts, sufixando -2, -3... quando
 * já existir. `excludeId` evita que um post colida consigo mesmo num PATCH.
 */
export async function ensureUniqueSlug(
  base: string,
  admin: SupabaseClient,
  excludeId?: string,
): Promise<string> {
  const normalizedBase = slugify(base)
  if (!normalizedBase) {
    throw new Error('Não foi possível gerar um slug válido a partir do título fornecido.')
  }

  let query = admin
    .schema('portfolio')
    .from('posts')
    .select('slug')
    .ilike('slug', `${normalizedBase}%`)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data, error } = await query
  if (error) {
    throw new Error(`Falha ao verificar unicidade do slug: ${error.message}`)
  }

  const existing = new Set((data ?? []).map((row) => row.slug as string))
  if (!existing.has(normalizedBase)) return normalizedBase

  let suffix = 2
  while (existing.has(`${normalizedBase}-${suffix}`)) {
    suffix++
  }
  return `${normalizedBase}-${suffix}`
}
