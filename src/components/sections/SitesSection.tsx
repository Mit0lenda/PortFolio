import React from "react";
import type { Variant } from "../../lib/types";
import { useCopy } from "../../lib/useCopy";
import { sites } from "../../content/sites";
import { getLocalizedText } from "../../lib/localize";
import { useLanguage } from "../../app/LanguageProvider";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";
import { ButtonLink } from "../ui/ButtonLink";

export const SitesSection: React.FC<{ variant: Variant }> = ({ variant }) => {
  const copy = useCopy();
  const { language } = useLanguage();
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="section section--accent-secondary section--sites" id="sites">
      <div className="container">
        <SectionHeader
          title={copy.sites.title}
          intro={copy.sites.intro[variant]}
          className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
        />
        <div className="sites-grid">
          {sites.map((site, index) => (
            <article
              key={site.url}
              className={`card site-card reveal-on-scroll ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <figure className="site-card-media">
                <img
                  src={site.image.src}
                  alt={getLocalizedText(site.image.alt, language)}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <header className="site-card-header">
                <h3>{site.name}</h3>
                <p className="site-summary">{getLocalizedText(site.description, language)}</p>
              </header>
              <div className="site-actions">
                <ButtonLink href={site.url} variant="primary" external className="site-cta">
                  {copy.sites.ctaLabel}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
