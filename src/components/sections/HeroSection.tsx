'use client'

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useCopy } from "../../lib/useCopy";
import { trackCtaClick } from "../../lib/analytics/trackEvent";

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "100%", clipPath: "inset(0 0 100% 0)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, delay: 0.1 * i, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export const HeroSection: React.FC = () => {
  const t = useCopy();
  const featured = t.projects.list.find((p) => p.id === "haven-link");
  const shouldReduceMotion = useReducedMotion();

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
        {[
          { text: t.hero.h1a, className: "hero-line hero-line--top" },
          { text: t.hero.h1b, className: "hero-line hero-line--mid" },
          { text: t.hero.h1c, className: "hero-line hero-line--bottom impact" },
        ].map((line, i) => (
          <motion.span
            key={line.className}
            className={line.className}
            custom={i}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={lineVariants}
          >
            {line.text}
          </motion.span>
        ))}
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
