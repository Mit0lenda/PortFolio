import { NextResponse } from 'next/server'
import { getPublishedPosts } from '../../lib/blog/posts'

export const revalidate = 3600

const BASE_URL = 'https://mitolenda.dev'
const SITE_TITLE = 'Dev Mitolenda — Conteúdos'
const SITE_DESCRIPTION =
  'Ideias, projetos e bastidores sobre desenvolvimento, automação, inteligência artificial e construção de produtos.'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await getPublishedPosts().catch((err) => {
    console.error('[rss.xml] getPublishedPosts failed:', err)
    return []
  })

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
