import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { copyPt } from '../../../content/copy.pt'
import { breadcrumbSchema } from '../../../lib/jsonld'

export const revalidate = 7200

const BASE_URL = 'https://mitolenda.dev'

export function generateStaticParams() {
  return copyPt.projects.list.map((p) => ({
    slug: p.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = copyPt.projects.list.find((p) => p.id === slug)

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
  const project = copyPt.projects.list.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  const url = `${BASE_URL}/projects/${slug}`
  const whatsappHref = copyPt.contact.cards.find((c) => c.k === 'WhatsApp')?.href

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Projetos', url: `${BASE_URL}/#projetos` },
    { name: project.name, url },
  ])

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

        <div style={{ maxWidth: 720, marginTop: 48 }}>
          <h2 style={{ fontSize: 22 }}>O problema</h2>
          <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, marginTop: 12 }}>
            {project.problem ?? project.desc}
          </p>
        </div>

        {project.solution && (
          <div style={{ maxWidth: 720, marginTop: 40 }}>
            <h2 style={{ fontSize: 22 }}>A solução</h2>
            <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, marginTop: 12 }}>
              {project.solution}
            </p>
          </div>
        )}

        {project.tech && project.tech.length > 0 && (
          <div style={{ maxWidth: 720, marginTop: 40 }}>
            <h2 style={{ fontSize: 22 }}>Tecnologias</h2>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, padding: 0, listStyle: 'none' }}>
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--gray-line)',
                    borderRadius: 4,
                    padding: '6px 10px',
                  }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-cta">
              Quero um projeto assim →
            </a>
          )}
          <a href="/#projetos" className="btn btn-ghost">
            ← Ver todos os projetos
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
  )
}
