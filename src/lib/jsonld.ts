export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function blogPostingSchema(post: {
  title: string
  excerpt: string
  url: string
  coverImageUrl?: string | null
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  authorName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
    author: { '@type': 'Person', name: post.authorName },
  }
}
