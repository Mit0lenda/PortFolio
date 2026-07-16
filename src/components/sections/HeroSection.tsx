'use client'

import React from "react";
import Link from "next/link";
import { useCopy } from "../../lib/useCopy";
import { trackCtaClick } from "../../lib/analytics/trackEvent";



export const HeroSection: React.FC = () => {
  const t = useCopy();
  const featured = t.projects.list.find((p) => p.id === "haven-link");

  return (
    <div className="container hero" id="home">
      <span className="hero-grid" aria-hidden="true" />
      <Link
        href="/projects/haven-link"
        className="hero-floating-badge"
        onClick={() => trackCtaClick("featured_case", "hero_badge")}
      >
        <span className="medal">N.03</span>
        <span className="hero-floating-badge-body">
          <span className="hero-floating-badge-kicker">Case em destaque</span>
          <span className="ev">{t.hero.badge1}</span>
          <br />
          {t.hero.badge2}
          {featured && <span className="hero-floating-badge-tag">{featured.tag}</span>}
        </span>
        <span className="hero-floating-badge-arrow" aria-hidden="true">→</span>
      </Link>

      <span className="eyebrow">{t.hero.eyebrow}</span>

      <h1 className="hero-title">
        <span className="hero-line hero-line--top">{t.hero.h1a}</span>
        <span className="hero-line hero-line--mid">{t.hero.h1b}</span>
        <span className="hero-line hero-line--bottom impact">{t.hero.h1c}</span>
      </h1>

      <p className="lead">{t.hero.lead}</p>

      <div className="hero-actions">
        <button
          className="btn btn-cta"
          onClick={() => {
            trackCtaClick("instagram", "hero");
            window.open(t.contact.cards[1].href, "_blank");
          }}
        >
          {t.hero.cta1}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            trackCtaClick("whatsapp", "hero");
            window.open(t.contact.cards[0].href, "_blank");
          }}
        >
          {t.hero.cta2}
        </button>
      </div>

      <div className="hero-meta">
        <span>
          <span className="dot">●</span>&nbsp;{t.hero.meta1}
        </span>
        <span>{t.hero.meta2}</span>
        <span>{t.hero.meta3}</span>
      </div>
    </div>
  );
};
