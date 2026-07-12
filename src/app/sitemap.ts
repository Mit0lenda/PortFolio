import type { MetadataRoute } from 'next'
import { copyPt } from '../content/copy.pt'

const BASE_URL = 'https://mitolenda.dev'

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
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
