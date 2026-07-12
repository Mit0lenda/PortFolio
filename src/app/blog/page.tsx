import type { Metadata } from 'next'
import { BlogList } from '../../components/blog/BlogList'
import { getPublishedPosts } from '../../lib/blog/posts'
import { breadcrumbSchema } from '../../lib/jsonld'

export const revalidate = 3600

const BASE_URL = 'https://mitolenda.dev'
const TITLE = 'Conteúdos — Dev Mitolenda'
const DESCRIPTION =
  'Ideias, projetos e bastidores sobre desenvolvimento, automação, inteligência artificial e construção de produtos.'

export const metadata: Metadata = {
  title: 'Conteúdos',
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/blog`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/og-default.png'],
  },
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = []
  let loadError = false

  try {
    posts = await getPublishedPosts()
  } catch (err) {
    console.error('[blog] BlogPage fetch error:', err)
    loadError = true
  }

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Conteúdos', url: `${BASE_URL}/blog` },
  ])

  return (
    <main className="page">
      <div className="container" style={{ padding: '96px 0' }}>
        <span className="eyebrow">// Conteúdos</span>
        <h1
          className="feat-name"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', margin: '24px 0 16px', maxWidth: 900 }}
        >
          Ideias, projetos e <span className="impact">bastidores.</span>
        </h1>
        <p style={{ color: 'var(--paper-dim)', fontSize: 18, maxWidth: 640, marginBottom: 48 }}>
          {DESCRIPTION}
        </p>

        {loadError ? (
          <div className="blog-error" role="alert">
            Não foi possível carregar os conteúdos agora. Tente novamente em instantes.
          </div>
        ) : posts.length === 0 ? (
          <div className="blog-empty">Ainda não há conteúdos publicados. Volte em breve.</div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
  )
}
