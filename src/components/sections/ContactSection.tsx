'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { ContactForm } from "../contact/ContactForm";
import { trackCtaClick } from "../../lib/analytics/trackEvent";

export const ContactSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="contato">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2>
            {t.contact.h2a} <span className="impact">{t.contact.h2b}</span>
          </h2>
          <p className="desc">{t.contact.desc}</p>
        </div>

        <div className="contact-cards">
          {t.contact.cards.map((c) => (
            <a
              className="cc"
              key={c.k}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCtaClick(c.k.toLowerCase(), "contact_section")}
            >
              <span className="k">{c.k}</span>
              <span className={`v${c.tech ? " tech" : ""}`}>{c.v}</span>
              <span className="sub">{c.sub}</span>
              <span className="arrow">{c.hint}</span>
            </a>
          ))}
        </div>

        <ContactForm source="contact_section" />
      </div>
    </section>
  );
};
