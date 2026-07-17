'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { trackCtaClick } from "../../lib/analytics/trackEvent";
import { useTilt } from "../../lib/useTilt";
import { Reveal, SplitHeading } from "../motion";

type Service = {
  t: string;
  d: string;
  price: string;
  prazo: string;
  slug?: string;
};

const ServiceCard: React.FC<{
  s: Service;
  i: number;
  kInvest: string;
  kPrazo: string;
  whatsappHref: string;
}> = ({ s, i, kInvest, kPrazo, whatsappHref }) => {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <Reveal.Item
      as="div"
      className="svc tilt"
      ref={tiltRef}
      onClick={() => {
        trackCtaClick("whatsapp", `services_card_${s.slug ?? i}`);
        window.open(whatsappHref, "_blank");
      }}
    >
      <span className="svc-num">// {String(i + 1).padStart(2, "0")}</span>
      <h3 className="svc-name">{s.t}</h3>
      <p className="svc-desc">{s.d}</p>
      <div className="svc-meta">
        <div className="row">
          <span className="k">{kInvest}</span>
          <span className="v cta">{s.price}</span>
        </div>
        <div className="row">
          <span className="k">{kPrazo}</span>
          <span className="v">{s.prazo}</span>
        </div>
      </div>
      {s.slug && (
        <a
          href={`/servicos/${s.slug}`}
          className="svc-more"
          onClick={(e) => e.stopPropagation()}
        >
          saiba mais →
        </a>
      )}
    </Reveal.Item>
  );
};

export const ServicesSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="servicos">
      <div className="container">
        <SplitHeading
          className="section-head"
          eyebrow={t.services.eyebrow}
          heading={
            <>
              {t.services.h2a}
              <br />
              {t.services.h2b} <span className="impact">{t.services.h2c}</span>
            </>
          }
          desc={t.services.desc}
          descClassName="desc"
        />

        <Reveal as="div" className="services3" stagger staggerDelay={0.1}>
          {t.services.list.map((s, i) => (
            <ServiceCard
              s={s}
              i={i}
              kInvest={t.services.kInvest}
              kPrazo={t.services.kPrazo}
              whatsappHref={t.contact.cards[0].href}
              key={i}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
};
