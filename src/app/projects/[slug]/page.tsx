import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { copyPt } from '../../../content/copy.pt'

export const revalidate = 7200

const BASE_URL = 'https://mitolenda.dev'

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function generateStaticParams() {
  return copyPt.projects.list.map((p) => ({
    slug: toSlug(p.name),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = copyPt.projects.list.find((p) => toSlug(p.name) === slug)

  if (!project) return {}

  const url = `${BASE_URL}/projects/${slug}`
  const title = `${project.name} — Dev Mitolenda`
  const description = project.desc.substring(0, 160)

  return {
    title: project.name,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: '/og/og-default.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/og-default.png'],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = copyPt.projects.list.find((p) => toSlug(p.name) === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="page">
      <div className="container" style={{ padding: '96px 0' }}>
        <span className="eyebrow">{project.tag}</span>
        <h1 className="feat-name" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '24px 0 0' }}>
          {project.name}
        </h1>
        {project.trophy && (
          <div className="feat-trophy" style={{ marginTop: 24 }}>
            {project.trophy}
          </div>
        )}
        <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, maxWidth: 720, marginTop: 32 }}>
          {project.desc}
        </p>
        <div style={{ marginTop: 48 }}>
          <a href="/#projetos" className="btn btn-ghost">
            ← Ver todos os projetos
          </a>
        </div>
      </div>
    </main>
  )
}
