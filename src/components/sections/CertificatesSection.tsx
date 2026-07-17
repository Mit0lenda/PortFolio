'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";
import { Reveal, SplitHeading } from "../motion";

type Cert = {
  provider: string;
  title: string;
  issuer: string;
  date: string;
  duration: string;
  id: string;
};

const CertCard: React.FC<{
  cert: Cert;
  kBadge: string;
  kDate: string;
  kDuration: string;
  kId: string;
}> = ({ cert, kBadge, kDate, kDuration, kId }) => {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <Reveal.Item as="div" className="cert-card tilt" ref={tiltRef}>
      <span className="cert-num">// {cert.provider}</span>

      <span className="cert-cred">✓ {kBadge}</span>

      <h3 className="cert-name">
        {cert.title}<span className="impact">.</span>
      </h3>

      <p className="cert-desc">{cert.issuer}</p>

      <div className="cert-info">
        <div className="cert-row">
          <span className="k">{kDate}</span>
          <span className="v">{cert.date}</span>
        </div>
        <div className="cert-row">
          <span className="k">{kDuration}</span>
          <span className="v">{cert.duration}</span>
        </div>
        <div className="cert-row">
          <span className="k">{kId}</span>
          <span className="v cert-id-val">{cert.id}</span>
        </div>
      </div>
    </Reveal.Item>
  );
};

export const CertificatesSection: React.FC = () => {
  const t = useCopy();
  const c = t.certificates;

  return (
    <section id="certificados">
      <div className="container">
        <SplitHeading
          className="section-head"
          eyebrow={c.eyebrow}
          heading={<>{c.h2a} <span className="impact">{c.h2b}</span></>}
          desc={c.desc}
          descClassName="desc"
        />

        <Reveal as="div" className="cert-grid" stagger staggerDelay={0.1}>
          {c.list.map((cert, i) => (
            <CertCard
              cert={cert}
              kBadge={c.kBadge}
              kDate={c.kDate}
              kDuration={c.kDuration}
              kId={c.kId}
              key={i}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
};
