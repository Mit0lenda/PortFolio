'use client'

import React from "react";
import Image from "next/image";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";
import { Reveal, SplitHeading } from "../motion";

const SITES = [
  { n: "Daltro LLC",            url: "daltrollc.com",               img: "/assets/site-daltrollc.png",   context: "Estúdio de jogos (EUA) · site institucional" },
  { n: "MultiParts Elevadores", url: "multipartselevadores.com.br", img: "/assets/site-multiparts.png",  context: "Peças para elevadores · catálogo institucional" },
  { n: "Engipro Elevadores",    url: "engipro.com.br",              img: "/assets/site-engipro.png",     context: "Elevadores industriais · soluções + orçamento" },
  { n: "Wisebody",              url: "wisebody.com.br",             img: "/assets/site-wisebody.png",    context: "Estética corporal · site institucional" },
];

const SiteCard: React.FC<{ s: (typeof SITES)[number] }> = ({ s }) => {
  const tiltRef = useTilt<HTMLAnchorElement>();

  return (
    <Reveal.Item
      as="a"
      className="site-card tilt"
      ref={tiltRef}
      href={`https://${s.url}`}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none", borderBottom: 0 }}
    >
      <div className="site-shot" style={{ position: "relative" }}>
        <Image src={s.img} alt={s.n} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="site-body">
        <span className="n">{s.n}</span>
        <span className="ext">{s.url} ↗</span>
      </div>
      <span className="site-context">{s.context}</span>
    </Reveal.Item>
  );
};

export const SitesSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="sites">
      <div className="container">
        <SplitHeading
          className="section-head"
          eyebrow={t.sites.eyebrow}
          heading={<>{t.sites.h2a} <span className="impact">{t.sites.h2b}</span></>}
          desc={t.sites.desc}
          descClassName="desc"
        />

        <Reveal as="div" className="sites-grid" stagger staggerDelay={0.1}>
          {SITES.map((s) => (
            <SiteCard s={s} key={s.n} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};
