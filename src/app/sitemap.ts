import type { MetadataRoute } from 'next'
import { copyPt } from '../content/copy.pt'

const BASE_URL = 'https://mitolenda.dev'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const projectUrls: MetadataRoute.Sitemap = copyPt.projects.list.map((p) => ({
    url: `${BASE_URL}/projects/${toSlug(p.name)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectUrls,
    {
      url: `${BASE_URL}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
