import React from "react";
import { useCopy } from "../../lib/useCopy";

const go = (hash: string) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

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
          <button className="btn btn-cta" onClick={() => go("#contato")}>
            {t.finalCta.cta1}
          </button>
          <button className="btn btn-ghost" onClick={() => go("#contato")}>
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
