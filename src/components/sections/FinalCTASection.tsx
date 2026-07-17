'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { trackCtaClick } from "../../lib/analytics/trackEvent";
import { useTilt } from "../../lib/useTilt";
import { Reveal } from "../motion";

export const FinalCTASection: React.FC = () => {
  const t = useCopy();
  const ctaRef = useTilt<HTMLButtonElement>({ tilt: false });
  const ghostRef = useTilt<HTMLButtonElement>({ tilt: false });

  return (
    <section className="final-cta">
      <span className="br-bl" />
      <span className="br-br" />
      <Reveal
        as="div"
        className="container"
        style={{ textAlign: "center", position: "relative" }}
        stagger
        staggerDelay={0.1}
      >
        <Reveal.Item as="span" className="eyebrow">
          {t.finalCta.eyebrow}
        </Reveal.Item>
        <Reveal.Item as="div">
          <h2 style={{ marginTop: 18 }}>
            {t.finalCta.h2a} <span className="impact">{t.finalCta.h2b}</span>
            <br />
            {t.finalCta.h2c}
          </h2>
        </Reveal.Item>
        <Reveal.Item as="div">
          <p className="lead">{t.finalCta.lead}</p>
        </Reveal.Item>
        <Reveal.Item as="div" className="hero-actions" style={{ justifyContent: "center" }}>
          <button
            className="btn btn-cta spotlight"
            ref={ctaRef}
            onClick={() => {
              trackCtaClick("instagram", "final_cta");
              window.open(t.contact.cards[1].href, "_blank");
            }}
          >
            {t.finalCta.cta1}
          </button>
          <button
            className="btn btn-ghost spotlight"
            ref={ghostRef}
            onClick={() => {
              trackCtaClick("whatsapp", "final_cta");
              window.open(t.contact.cards[0].href, "_blank");
            }}
          >
            {t.finalCta.cta2}
          </button>
        </Reveal.Item>
        <Reveal.Item as="div" className="ig" style={{ marginTop: 24 }}>
          → <span className="h" style={{ color: "var(--blue-tech)" }}>@dev_mitolenda</span> · {t.finalCta.ig}
        </Reveal.Item>
      </Reveal>
    </section>
  );
};
