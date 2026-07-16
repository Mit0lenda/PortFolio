'use client'

import React from "react";
import Image from "next/image";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";

const IMGS = ["/assets/codaryn-hero.png", "/assets/site-nexium.png"];

type Venture = {
  n: string;
  tag: string;
  desc: string;
  url: string;
  tags: string[];
};

const VentureCard: React.FC<{ v: Venture; img: string; labelRole: string; cta: string }> = ({
  v,
  img,
  labelRole,
  cta,
}) => {
  const tiltRef = useTilt<HTMLElement>();

  return (
    <article className="venture tilt" ref={tiltRef}>
      <div className="venture-shot" style={{ position: "relative" }}>
        <Image src={img} alt={v.n} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="venture-body">
        <span className="venture-role">{labelRole}</span>
        <h3 className="venture-name">
          {v.n}
          <span className="impact">.</span>
        </h3>
        <span className="venture-tag">{v.tag}</span>
        <p className="venture-desc">{v.desc}</p>
        <div className="venture-tags">
          {v.tags.map((x) => (
            <span className="chip" key={x}>
              {x}
            </span>
          ))}
        </div>
        <a className="venture-cta" href={`https://${v.url}`} target="_blank" rel="noreferrer">
          {v.url} · {cta}
        </a>
      </div>
    </article>
  );
};

export const VenturesSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="ventures" className="ventures-sec">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.ventures.eyebrow}</span>
          <h2>
            {t.ventures.h2a} <span className="impact">{t.ventures.h2b}</span>
          </h2>
          <p className="desc">{t.ventures.desc}</p>
        </div>

        <div className="ventures-grid">
          {t.ventures.list.map((v, i) => (
            <VentureCard
              v={v}
              img={IMGS[i]}
              labelRole={t.ventures.labelRole}
              cta={t.ventures.cta}
              key={v.n}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
