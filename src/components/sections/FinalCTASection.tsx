'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { trackCtaClick } from "../../lib/analytics/trackEvent";



export const FinalCTASection: React.FC = () => {
  const t = useCopy();

  return (
    <section className="final-cta">
      <span className="br-bl" />
      <span className="br-br" />
      <div className="container" style={{ textAlign: "center", position: "relative" }}>
        <span className="eyebrow">{t.finalCta.eyebrow}</span>
        <h2 style={{ marginTop: 18 }}>
          {t.finalCta.h2a} <span className="impact">{t.finalCta.h2b}</span>
          <br />
          {t.finalCta.h2c}
        </h2>
        <p className="lead">{t.finalCta.lead}</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <button
            className="btn btn-cta"
            onClick={() => {
              trackCtaClick("instagram", "final_cta");
              window.open(t.contact.cards[1].href, "_blank");
            }}
          >
            {t.finalCta.cta1}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              trackCtaClick("whatsapp", "final_cta");
              window.open(t.contact.cards[0].href, "_blank");
            }}
          >
            {t.finalCta.cta2}
          </button>
        </div>
        <div className="ig" style={{ marginTop: 24 }}>
          → <span className="h" style={{ color: "var(--blue-tech)" }}>@dev_mitolenda</span> · {t.finalCta.ig}
        </div>
      </div>
    </section>
  );
};
