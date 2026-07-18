import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { copyPt } from '../../../content/copy.pt'
import { breadcrumbSchema } from '../../../lib/jsonld'
import { PROJECT_ASSETS, FALLBACK_ASSETS } from '../../../content/projectAssets'
import { ProjectGallery } from '../../../components/media/ProjectGallery'
import { FlowDiagram } from '../../../components/media/FlowDiagram'
import { MediaFrame } from '../../../components/media/MediaFrame'

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
  const ogImage = `/og/og-${slug}.png`

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
          url: ogImage,
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
      images: [ogImage],
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
  const media = PROJECT_ASSETS[slug] || FALLBACK_ASSETS

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
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 24 }}>
          {project.trophy && <div className="feat-trophy">{project.trophy}</div>}
          {project.role && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gray-support)',
              }}
            >
              // {project.role}
            </span>
          )}
        </div>

        {/* Prova visual logo de cara — o case se entende antes do texto */}
        {media.cover && (
          <div style={{ marginTop: 40 }}>
            <MediaFrame
              src={media.cover.src}
              alt={media.cover.alt}
              caption={media.cover.caption}
              aspectRatio={media.cover.aspectRatio ?? 'wide'}
              contain={media.cover.type === 'photo'}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="case-cover"
            />
          </div>
        )}

        {media.flow && media.flow.length > 0 && <FlowDiagram steps={media.flow} labelPrefix={project.name} />}

        <div style={{ maxWidth: 720, marginTop: 48 }}>
          <h2 style={{ fontSize: 18, letterSpacing: '0.05em' }}>O problema</h2>
          <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, marginTop: 12 }}>
            {project.problem ?? project.desc}
          </p>
        </div>

        {project.solution && (
          <div style={{ maxWidth: 720, marginTop: 40 }}>
            <h2 style={{ fontSize: 18, letterSpacing: '0.05em' }}>A solução</h2>
            <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, marginTop: 12 }}>
              {project.solution}
            </p>
          </div>
        )}

        {media.gallery && media.gallery.length > 0 && <ProjectGallery images={media.gallery} />}

        {project.tech && project.tech.length > 0 && (
          <div style={{ maxWidth: 720, marginTop: 40 }}>
            <h2 style={{ fontSize: 18, letterSpacing: '0.05em' }}>Tecnologias</h2>
            <ul className="venture-tags" style={{ marginTop: 12, padding: 0, listStyle: 'none' }}>
              {project.tech.map((tech) => (
                <li className="chip" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.results && project.results.length > 0 && (
          <div className="case-results">
            <span className="case-results-label">Resultado</span>
            <div className="case-results-grid">
              {project.results.map((r) => (
                <div className="case-results-item" key={r.label}>
                  <span className="k">{r.label}</span>
                  <span className="v">{r.value}</span>
                  {r.context && <span className="c">{r.context}</span>}
                </div>
              ))}
            </div>
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
