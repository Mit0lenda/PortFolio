// Subset seguro exposto a Server/Client Components — nunca inclui campos
// operacionais (linkedin_*, scheduled_at, status) que não fazem sentido para
// leitura pública.
export type PublicPostSummary = {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  cover_image_alt: string | null
  category: string
  tags: string[]
  published_at: string
  featured: boolean
  readingTime: number
}

export type PublicPostDetail = PublicPostSummary & {
  content: string
  updated_at: string
}
