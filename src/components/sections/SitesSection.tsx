'use client'

import React from "react";
import Image from "next/image";
import { useCopy } from "../../lib/useCopy";

const SITES = [
  { n: "Daltro LLC",            url: "daltrollc.com",               img: "/assets/site-daltrollc.png" },
  { n: "MultiParts Elevadores", url: "multipartselevadores.com.br", img: "/assets/site-multiparts.png" },
  { n: "Engipro Elevadores",    url: "engipro.com.br",              img: "/assets/site-engipro.png" },
  { n: "Wisebody",              url: "wisebody.com.br",             img: "/assets/site-wisebody.png" },
];

export const SitesSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="sites">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.sites.eyebrow}</span>
          <h2>
            {t.sites.h2a} <span className="impact">{t.sites.h2b}</span>
          </h2>
          <p className="desc">{t.sites.desc}</p>
        </div>

        <div className="sites-grid">
          {SITES.map((s) => (
            <a
              className="site-card"
              key={s.n}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
