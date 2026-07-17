'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { Reveal, SplitHeading } from "../motion";

const STACK: [string, string][] = [
  ["React", "lg"],
  ["TypeScript", "lg"],
  ["Node.js", "lg"],
  ["Supabase", ""],
  ["n8n", "imp"],
  ["JavaScript", ""],
  ["Python", ""],
  ["PHP", ""],
  ["MySQL", ""],
  ["Azure", ""],
  ["JWT", ""],
  ["OAuth2", ""],
  ["GSAP", ""],
  ["Java", ""],
  ["C", ""],
  ["C++", ""],
  ["C#", ""],
];

export const TechStackSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="stack">
      <div className="container">
        <SplitHeading
          className="section-head"
          eyebrow={t.stack.eyebrow}
          heading={<>{t.stack.h2a} <span className="impact">{t.stack.h2b}</span></>}
          desc={
            <>
              <p className="desc">{t.stack.desc1}</p>
              <p className="desc" style={{ marginTop: 8 }}>
                {t.stack.desc2}
              </p>
            </>
          }
        />

        <Reveal as="div" className="stack-cloud" stagger staggerDelay={0.03}>
          {STACK.map(([name, cls]) => (
            <Reveal.Item as="span" className={`badge ${cls}`} key={name}>
              {name}
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
    </section>
  );
};
