'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";

export const CertificatesSection: React.FC = () => {
  const t = useCopy();
  const c = t.certificates;

  return (
    <section id="certificados">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>
            {c.h2a} <span className="impact">{c.h2b}</span>
          </h2>
          <p className="desc">{c.desc}</p>
        </div>

        <div className="cert-grid">
          {c.list.map((cert, i) => (
            <div key={i} className="cert-card">
              <span className="cert-num">// {cert.provider}</span>

              <span className="cert-cred">✓ {c.kBadge}</span>

              <h3 className="cert-name">
                {cert.title}<span className="impact">.</span>
              </h3>

              <p className="cert-desc">{cert.issuer}</p>

              <div className="cert-info">
                <div className="cert-row">
                  <span className="k">{c.kDate}</span>
                  <span className="v">{cert.date}</span>
                </div>
                <div className="cert-row">
                  <span className="k">{c.kDuration}</span>
                  <span className="v">{cert.duration}</span>
                </div>
                <div className="cert-row">
                  <span className="k">{c.kId}</span>
                  <span className="v cert-id-val">{cert.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
