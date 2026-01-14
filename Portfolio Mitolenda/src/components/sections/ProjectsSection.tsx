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
              <header className="project-card-header">
                <h3>{getLocalizedText(project.title, language)}</h3>
                <p className="project-summary">{getLocalizedText(project.summary, language)}</p>
              </header>
              <dl className="project-meta">
                <div>
                  <dt>{copy.labels.context}</dt>
                  <dd>{getLocalizedText(project.context, language)}</dd>
                </div>
                <div>
                  <dt>{copy.labels.role}</dt>
                  <dd>{getLocalizedText(project.role, language)}</dd>
                </div>
                <div>
                  <dt>{copy.labels.stack}</dt>
                  <dd className="stack-tags">
                    {project.stack.map((item) => (
                      <Tag key={item} text={item} />
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>{copy.labels.decision}</dt>
                  <dd>{getLocalizedText(project.decision, language)}</dd>
                </div>
                <div>
                  <dt>{copy.labels.outcome}</dt>
                  <dd>{getLocalizedText(project.outcome, language)}</dd>
                </div>
              </dl>
              <div className="project-actions">
                <ButtonLink to={routes.project(project.slug)} variant="ghost">
                  {copy.projects.ctaLabel}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
