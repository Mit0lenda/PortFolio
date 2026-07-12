import React from 'react'
import Link from 'next/link'
import { BlogCard } from '../blog/BlogCard'
import type { PublicPostSummary } from '../../lib/blog/types'

export const BlogSection: React.FC<{ posts: PublicPostSummary[] }> = ({ posts }) => {
  if (posts.length === 0) return null

  return (
    <section id="conteudos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">// Conteúdos</span>
          <h2>
            Ideias, projetos e <span className="impact">bastidores.</span>
          </h2>
          <p className="desc">
            Conteúdos sobre desenvolvimento, automação, inteligência artificial e construção de
            produtos.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
        </div>

        <div className="blog-cta-row">
          <Link href="/blog" className="btn btn-ghost">
            Ver todos os conteúdos →
          </Link>
        </div>
      </div>
    </section>
  )
}
