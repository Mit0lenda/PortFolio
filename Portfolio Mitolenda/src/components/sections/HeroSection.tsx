import React from "react";
import type { Variant } from "../../lib/types";
import { useCopy } from "../../lib/useCopy";
import { ButtonLink } from "../ui/ButtonLink";
import { HighlightText } from "../ui/HighlightText";

const variantToAccent: Record<Variant, "primary" | "secondary"> = {
  home: "primary",
  recruiter: "primary",
  client: "primary",
};

export const HeroSection: React.FC<{ variant: Variant }> = ({ variant }) => {
  const copy = useCopy();
  const hero = copy.hero[variant];
  const accent = variantToAccent[variant];
  const primaryDownload = hero.primaryCta.href.endsWith(".pdf");

  return (
    <section className={`section hero-section section--accent-${accent} relative overflow-hidden`}>
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow reveal">{hero.kicker}</p>
          <h1 className="hero-title reveal reveal-delay-1">
            <HighlightText text={hero.title} />
          </h1>
          <p className="hero-subtitle reveal reveal-delay-2">{hero.subtitle}</p>
          <div className="hero-actions reveal reveal-delay-3">
            <ButtonLink
              href={hero.primaryCta.href}
              variant={hero.primaryCta.variant}
              download={primaryDownload}
              className="relative [--btn-shadow:0_0_45px_rgba(255,212,0,0.35)] hover:[--btn-shadow:0_0_70px_rgba(255,59,59,0.45)]"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant={hero.secondaryCta.variant}>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="hero-orb"
            />
            <svg
              aria-hidden="true"
              focusable="false"
              className="hero-mark relative h-32 w-32"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="2" opacity="0.6" />
              <circle cx="100" cy="100" r="36" stroke="currentColor" strokeWidth="2" opacity="0.4" />
              <path d="M60 100H140" stroke="currentColor" strokeWidth="2" opacity="0.7" />
              <path d="M100 60V140" stroke="currentColor" strokeWidth="2" opacity="0.7" />
              <path d="M72 72L128 128" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              <path d="M128 72L72 128" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
          <aside className="hero-panel reveal reveal-delay-2 w-full max-w-sm" aria-label={copy.heroPanel.title}>
            <p className="panel-title">{copy.heroPanel.title}</p>
            <ul className="panel-list">
              {copy.heroPanel.items.map((item) => (
                <li key={item.title} className="panel-item">
                  <p className="panel-item-title">{item.title}</p>
                  <p className="panel-item-body">{item.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
