'use client'

import React from 'react'
import { BlogCard } from './BlogCard'
import { Reveal, SplitHeading } from '../motion'
import type { PublicPostSummary } from '../../lib/blog/types'

/**
 * Split out as its own client component because the parent page (`/blog/[slug]`)
 * is a Server Component — accessing `Reveal.Item` there directly would cross
 * the RSC client-reference boundary and resolve to `undefined` (Next only
 * preserves the module's own named exports across that boundary, not
 * properties attached to them afterward).
 */
export const RelatedPosts: React.FC<{ posts: PublicPostSummary[] }> = ({ posts }) => {
  if (posts.length === 0) return null

  return (
    <div style={{ marginTop: 80 }}>
      <SplitHeading
        className="section-head"
        eyebrow="// Relacionados"
        heading="Continue lendo"
        headingClassName="clamp-heading"
      />
      <Reveal as="div" className="blog-grid" stagger staggerDelay={0.1}>
        {posts.map((post) => (
          <Reveal.Item as="div" key={post.id}>
            <BlogCard post={post} />
          </Reveal.Item>
        ))}
      </Reveal>
    </div>
  )
}
