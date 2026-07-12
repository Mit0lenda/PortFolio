import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPostDate } from '../../lib/blog/format'
import type { PublicPostSummary } from '../../lib/blog/types'

export const BlogCard: React.FC<{ post: PublicPostSummary }> = ({ post }) => (
  <Link className="blog-card" href={`/blog/${post.slug}`} aria-label={`Ler artigo ${post.title}`}>
    <div className="blog-card-cover">
      <Image
        src={post.cover_image_url || '/og/og-default.png'}
        alt={post.cover_image_alt || post.title}
        fill
        sizes="(max-width: 900px) 100vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="blog-card-body">
      <div className="blog-card-meta">
        <span>{post.category}</span>
        <span>{formatPostDate(post.published_at)}</span>
      </div>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-excerpt">{post.excerpt}</p>
      <div className="blog-card-footer">
        <span>{post.readingTime} min de leitura</span>
        <span>Ler artigo →</span>
      </div>
    </div>
  </Link>
)
