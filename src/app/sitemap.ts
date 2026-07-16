import type { MetadataRoute } from 'next'
import { copyPt } from '../content/copy.pt'
import { getPublishedPosts } from '../lib/blog/posts'

const BASE_URL = 'https://mitolenda.dev'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectUrls: MetadataRoute.Sitemap = copyPt.projects.list.map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date('2026-06-01'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const servicePageUrls: MetadataRoute.Sitemap = (copyPt.servicePages ?? []).map((s) => ({
    url: `${BASE_URL}/servicos/${s.slug}`,
    lastModified: new Date('2026-07-11'),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Nunca deixa uma falha do Supabase quebrar o sitemap inteiro — degrada
  // para uma lista sem posts nesse caso.
  const posts = await getPublishedPosts().catch((err) => {
    console.error('[sitemap] getPublishedPosts failed:', err)
    return []
  })

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postUrls,
    ...projectUrls,
    ...servicePageUrls,
    {
      url: `${BASE_URL}/politica-de-privacidade`,
      lastModified: new Date('2026-05-05'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: new Date('2026-05-05'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
