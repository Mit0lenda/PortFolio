'use client'

import React, { useState } from "react";
import { useCopy } from "../../lib/useCopy";

export const FAQSection: React.FC = () => {
  const t = useCopy();
  const [open, setOpen] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2>
            {t.faq.h2a} <span className="impact">{t.faq.h2b}</span>
          </h2>
        </div>

        <div className="faq-list">
          {t.faq.list.map((f, i) => (
            <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="sign">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
};
