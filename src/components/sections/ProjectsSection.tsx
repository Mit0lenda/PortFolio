import React from "react";
import type { Variant } from "../../lib/types";
import { useCopy } from "../../lib/useCopy";
import { projects } from "../../content/projects";
import { getLocalizedText } from "../../lib/localize";
import { useLanguage } from "../../app/LanguageProvider";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";
import { Tag } from "../ui/Tag";
import { routes } from "../../lib/routes";

export const ProjectsSection: React.FC<{ variant: Variant }> = ({ variant }) => {
  const copy = useCopy();
  const { language } = useLanguage();
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="section section--accent-primary section--projects" id="projects">
      <div className="container">
        <SectionHeader
          title={copy.projects.title}
          intro={copy.projects.intro[variant]}
          className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`card project-card reveal-on-scroll ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="project-card-layout">
                <figure
                  className={[
                    "project-card-media",
                    project.mediaNoFade ? "project-card-media--no-fade" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={[
                      "project-carousel",
                      project.mediaNoFade ? "project-carousel--static" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--carousel-duration": `${(project.images?.length ?? 1) * 4}s` } as React.CSSProperties}
                  >
                    {(project.images?.length ? project.images : [project.image]).map((image, imageIndex) => (
                      <img
                        key={`${project.slug}-${imageIndex}`}
                        src={image.src}
                        alt={getLocalizedText(image.alt, language)}
                        loading="lazy"
                        decoding="async"
                        style={{ animationDelay: `${imageIndex * 4}s` }}
                      />
                    ))}
                  </div>
                </figure>
                <div className="project-card-content">
                  <header className="project-card-header">
                    {project.slug === "project-haven-link" ? (
                      <span className="project-badge" aria-label="3rd place iTwin Brasil">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          viewBox="0 0 24 24"
                          className="project-badge-icon"
                        >
                          <path
                            d="M7 4h10v3a4 4 0 0 1-10 0V4zm-2 1H3a3 3 0 0 0 3 3V6a1 1 0 0 1-1-1zm16 0h-2a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-10 8h2v3h3v2H8v-2h3v-3z"
                            fill="currentColor"
                          />
                        </svg>
                        3&ordm; lugar iTwin Brasil
                      </span>
                    ) : null}
                    <h3>{getLocalizedText(project.title, language)}</h3>
                    <p className="project-summary">{getLocalizedText(project.summary, language)}</p>
                  </header>
                  <dl className="project-card-meta-grid">
                    {[
                      {
                        label: copy.labels.context,
                        value: getLocalizedText(project.context, language),
                      },
                      {
                        label: copy.labels.role,
                        value: getLocalizedText(project.role, language),
                      },
                      {
                        label: copy.labels.decision,
                        value: getLocalizedText(project.decision, language),
                      },
                      {
                        label: copy.labels.outcome,
                        value: getLocalizedText(project.outcome, language),
                      },
                    ].map((item) => (
                      <div key={`${project.slug}-${item.label}`} className="project-card-meta-item">
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                    <div className="project-card-meta-item project-card-meta-item--stack">
                      <dt>{copy.labels.stack}</dt>
                      <dd className="stack-tags">
                        {project.stack.map((item) => (
                          <Tag key={item} text={item} />
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <div className="project-actions">
                    <ButtonLink to={routes.project(project.slug)} variant="secondary">
                      {copy.projects.ctaLabel}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
