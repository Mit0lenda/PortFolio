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
              <div className="cert-header">
                <span className="cert-provider-badge">{cert.provider}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>

              <p className="cert-issuer">{cert.issuer}</p>

              <div className="cert-meta">
                <span>{cert.date}</span>
                <span className="cert-dot">·</span>
                <span>{cert.duration}</span>
              </div>

              <div className="cert-id-row">
                <span className="cert-id-label">ID</span>
                <span className="cert-id-value">{cert.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
