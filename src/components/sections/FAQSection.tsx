'use client'

import React, { useState } from "react";
import { useCopy } from "../../lib/useCopy";
import { Reveal, SplitHeading } from "../motion";

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
        <SplitHeading
          className="section-head"
          eyebrow={t.faq.eyebrow}
          heading={<>{t.faq.h2a} <span className="impact">{t.faq.h2b}</span></>}
        />

        <Reveal as="div" className="faq-list" stagger staggerDelay={0.06}>
          {t.faq.list.map((f, i) => {
            const isOpen = open === i;
            const answerId = `faq-answer-${i}`;
            return (
              <Reveal.Item as="div" className={`faq-item${isOpen ? " open" : ""}`} key={i}>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="sign" aria-hidden="true">+</span>
                </button>
                <div id={answerId} className="faq-a" aria-hidden={!isOpen}>
                  {f.a}
                </div>
              </Reveal.Item>
            );
          })}
        </Reveal>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
};
