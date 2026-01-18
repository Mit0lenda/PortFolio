import React from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/seo/Seo";
import { useCopy } from "../lib/useCopy";
import { projects } from "../content/projects";
import { getLocalizedText } from "../lib/localize";
import { useLanguage } from "../app/LanguageProvider";
import { routes } from "../lib/routes";
import { ButtonLink } from "../components/ui/ButtonLink";
import { NotFoundPage } from "./NotFound";
import { site } from "../lib/site";

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams();
  const copy = useCopy();
  const { language } = useLanguage();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  const heroImages = project.images?.length ? project.images : [project.image];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [project.slug]);

  const title = `${copy.seo.project.titlePrefix}: ${getLocalizedText(project.title, language)}`;
  const description = `${copy.seo.project.descriptionPrefix} ${getLocalizedText(project.summary, language)}`;
  const path = routes.project(project.slug);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: getLocalizedText(project.title, language),
    description: getLocalizedText(project.summary, language),
    url: new URL(path, site.url).toString(),
    creator: {
      "@type": "Person",
      name: site.developerName,
    },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <Seo title={title} description={description} path={path} type="article" jsonLd={projectJsonLd} />
      <section className="section section--accent-primary project-hero">
        <div className="container project-hero-content">
          <Link to={`${routes.home}#projects`} className="text-link">
            {copy.projectDetail.backLabel}
          </Link>
          <figure className="project-hero-media project-hero-media--boxed">
            <div className="project-hero-display">
              <img
                src={heroImages[currentIndex].src}
                alt={getLocalizedText(heroImages[currentIndex].alt, language)}
                loading="lazy"
                decoding="async"
              />
            </div>
            {heroImages.length > 1 ? (
              <>
                <button
                  type="button"
                  className="project-hero-nav project-hero-nav--prev"
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                  aria-label="Previous image"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  className="project-hero-nav project-hero-nav--next"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % heroImages.length)}
                  aria-label="Next image"
                >
                  &rsaquo;
                </button>
              </>
            ) : null}
            <div className="project-hero-indicator">
              {currentIndex + 1} / {heroImages.length}
            </div>
          </figure>
          <h1>{getLocalizedText(project.title, language)}</h1>
          <p className="body-lg">{getLocalizedText(project.summary, language)}</p>
          {project.links?.live ? (
            <ButtonLink href={project.links.live} variant="secondary" external>
              {copy.projectDetail.viewLiveLabel}
            </ButtonLink>
          ) : null}
        </div>
      </section>
      <section className="section project-detail">
        <div className="container project-detail-grid">
          <article className="card">
            <h2>{copy.labels.context}</h2>
            <p>{getLocalizedText(project.context, language)}</p>
          </article>
          <article className="card">
            <h2>{copy.labels.role}</h2>
            <p>{getLocalizedText(project.role, language)}</p>
          </article>
          <article className="card">
            <h2>{copy.labels.stack}</h2>
            <ul className="stack-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>{copy.labels.decision}</h2>
            <p>{getLocalizedText(project.decision, language)}</p>
          </article>
          <article className="card">
            <h2>{copy.labels.outcome}</h2>
            <p>{getLocalizedText(project.outcome, language)}</p>
          </article>
        </div>
      </section>
    </>
  );
};
