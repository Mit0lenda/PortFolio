import React from 'react'
import { BlogCard } from './BlogCard'
import type { PublicPostSummary } from '../../lib/blog/types'

export const BlogList: React.FC<{ posts: PublicPostSummary[] }> = ({ posts }) => (
  <div className="blog-grid">
    {posts.map((post) => (
      <BlogCard post={post} key={post.id} />
    ))}
  </div>
)
