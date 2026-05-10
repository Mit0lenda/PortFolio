import React from "react";
import { useCopy } from "../../lib/useCopy";



export const HeroSection: React.FC = () => {
  const t = useCopy();

  return (
    <div className="container hero" id="home">
      <div className="hero-floating-badge">
        <span className="medal">🥉</span>
        <span>
          <span className="ev">{t.hero.badge1}</span>
          <br />
          {t.hero.badge2}
        </span>
      </div>

      <span className="eyebrow">{t.hero.eyebrow}</span>

      <h1 className="hero-title">
        <span className="hero-line hero-line--top">{t.hero.h1a}</span>
        <span className="hero-line hero-line--mid">{t.hero.h1b}</span>
        <span className="hero-line hero-line--bottom impact">{t.hero.h1c}</span>
      </h1>

      <p className="lead">{t.hero.lead}</p>

      <div className="hero-actions">
        <button className="btn btn-cta" onClick={() => window.open(t.contact.cards[1].href, "_blank")}>
          {t.hero.cta1}
        </button>
        <button className="btn btn-ghost" onClick={() => window.open(t.contact.cards[0].href, "_blank")}>
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
