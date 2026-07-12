import { describe, expect, it } from 'vitest'
import { createPostSchema, updatePostSchema } from './schema'

const validBase = {
  title: 'Um título válido',
  excerpt: 'Um resumo com tamanho suficiente.',
  content: 'Conteúdo em markdown com pelo menos vinte caracteres.',
  category: 'Automação',
}

describe('createPostSchema', () => {
  it('aceita payload mínimo válido com status default draft', () => {
    const result = createPostSchema.safeParse(validBase)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe('draft')
      expect(result.data.tags).toEqual([])
    }
  })

  it('rejeita title curto demais', () => {
    const result = createPostSchema.safeParse({ ...validBase, title: 'ab' })
    expect(result.success).toBe(false)
  })

  it('rejeita status=published sem published_at', () => {
    const result = createPostSchema.safeParse({ ...validBase, status: 'published' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('published_at'))).toBe(true)
    }
  })

  it('aceita status=published com published_at', () => {
    const result = createPostSchema.safeParse({
      ...validBase,
      status: 'published',
      published_at: '2026-07-12T18:00:00-03:00',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita status=scheduled sem scheduled_at', () => {
    const result = createPostSchema.safeParse({ ...validBase, status: 'scheduled' })
    expect(result.success).toBe(false)
  })

  it('rejeita slug em formato inválido', () => {
    const result = createPostSchema.safeParse({ ...validBase, slug: 'Slug Inválido!' })
    expect(result.success).toBe(false)
  })

  it('rejeita status desconhecido', () => {
    const result = createPostSchema.safeParse({ ...validBase, status: 'live' })
    expect(result.success).toBe(false)
  })

  it('rejeita mais de 10 tags', () => {
    const result = createPostSchema.safeParse({
      ...validBase,
      tags: Array.from({ length: 11 }, (_, i) => `tag${i}`),
    })
    expect(result.success).toBe(false)
  })
})

describe('updatePostSchema', () => {
  it('aceita payload parcial (só um campo)', () => {
    const result = updatePostSchema.safeParse({ featured: true })
    expect(result.success).toBe(true)
  })

  it('não aplica defaults em campos omitidos (undefined, não [])', () => {
    const result = updatePostSchema.safeParse({ featured: true })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.tags).toBeUndefined()
      expect(result.data.status).toBeUndefined()
    }
  })

  it('aceita objeto vazio', () => {
    const result = updatePostSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('ainda valida formato de campos presentes', () => {
    const result = updatePostSchema.safeParse({ title: 'ab' })
    expect(result.success).toBe(false)
  })
})
