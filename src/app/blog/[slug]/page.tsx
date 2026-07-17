import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleBody } from '../../../components/blog/ArticleBody'
import { ShareButtons } from '../../../components/blog/ShareButtons'
import { RelatedPosts } from '../../../components/blog/RelatedPosts'
import { formatPostDate } from '../../../lib/blog/format'
import { getPostBySlug, getPublishedPosts, getRelatedPosts } from '../../../lib/blog/posts'
import { breadcrumbSchema, blogPostingSchema } from '../../../lib/jsonld'

export const revalidate = 3600

const BASE_URL = 'https://mitolenda.dev'

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts()
    return posts.map((post) => ({ slug: post.slug }))
  } catch (err) {
    console.error('[blog/slug] generateStaticParams error:', err)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return {}

  const url = `${BASE_URL}/blog/${slug}`
  const title = post.title
  const description = post.excerpt
  const coverImage = post.cover_image_url || '/og/og-default.png'

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      section: post.category,
      tags: post.tags,
      images: [{ url: coverImage, width: 1200, height: 630, alt: post.cover_image_alt || title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Distingue "post não existe" (404 real) de "não deu pra checar agora"
  // (falha de infra) — não faz sentido devolver 404 quando o Supabase está
  // fora do ar, então trata essa falha com uma mensagem amigável em vez de
  // deixar a exceção estourar para o error boundary genérico do Next.js.
  let post: Awaited<ReturnType<typeof getPostBySlug>>
  try {
    post = await getPostBySlug(slug)
  } catch (err) {
    console.error('[blog/slug] getPostBySlug error:', err)
    return (
      <main className="page">
        <div className="container" style={{ padding: '96px 0' }}>
          <span className="eyebrow">// Conteúdos</span>
          <div className="blog-error" role="alert" style={{ marginTop: 32 }}>
            Não foi possível carregar este artigo agora. Tente novamente em instantes.
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    notFound()
  }

  const url = `${BASE_URL}/blog/${slug}`
  const related = await getRelatedPosts(post, 3).catch((err) => {
    console.error('[blog/slug] getRelatedPosts error:', err)
    return []
  })

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Conteúdos', url: `${BASE_URL}/blog` },
    { name: post.title, url },
  ])

  const blogPosting = blogPostingSchema({
    title: post.title,
    excerpt: post.excerpt,
    url,
    coverImageUrl: post.cover_image_url,
    category: post.category,
    tags: post.tags,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    authorName: 'Dev Mitolenda',
  })

  return (
    <main className="page">
      <div className="container" style={{ padding: '96px 0', maxWidth: 820 }}>
        <span className="eyebrow">{post.category}</span>

        <h1
          className="feat-name"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '20px 0 16px' }}
        >
          {post.title}
        </h1>

        <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6 }}>{post.excerpt}</p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginTop: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--gray-support)',
          }}
        >
          <span>{formatPostDate(post.published_at)}</span>
          <span>·</span>
          <span>{post.readingTime} min de leitura</span>
        </div>

        {post.cover_image_url && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              marginTop: 40,
              border: '1px solid var(--gray-line)',
              overflow: 'hidden',
            }}
          >
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
              fill
              sizes="820px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        <ArticleBody markdown={post.content} />

        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40 }}>
            {post.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <ShareButtons url={url} title={post.title} />
        </div>

        <div style={{ marginTop: 48 }}>
          <Link href="/blog" className="btn btn-ghost">
            ← Ver todos os conteúdos
          </Link>
        </div>

        <RelatedPosts posts={related} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
    </main>
  )
}
