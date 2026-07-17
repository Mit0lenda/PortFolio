import React from 'react'
import Link from 'next/link'
import { BlogCard } from '../blog/BlogCard'
import { Reveal, SplitHeading } from '../motion'
import type { PublicPostSummary } from '../../lib/blog/types'

export const BlogSection: React.FC<{ posts: PublicPostSummary[] }> = ({ posts }) => {
  if (posts.length === 0) return null

  return (
    <section id="conteudos">
      <div className="container">
        <SplitHeading
          className="section-head"
          eyebrow="// Conteúdos"
          heading={<>Ideias, projetos e <span className="impact">bastidores.</span></>}
          desc="Conteúdos sobre desenvolvimento, automação, inteligência artificial e construção de produtos."
          descClassName="desc"
        />

        <Reveal as="div" className="blog-grid" stagger staggerDelay={0.1}>
          {posts.map((post) => (
            <Reveal.Item as="div" key={post.id}>
              <BlogCard post={post} />
            </Reveal.Item>
          ))}
        </Reveal>

        <div className="blog-cta-row">
          <Link href="/blog" className="btn btn-ghost">
            Ver todos os conteúdos →
          </Link>
        </div>
      </div>
    </section>
  )
}
