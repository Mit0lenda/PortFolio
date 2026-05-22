'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";

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
        <div className="section-head">
          <span className="eyebrow">{t.stack.eyebrow}</span>
          <h2>
            {t.stack.h2a} <span className="impact">{t.stack.h2b}</span>
          </h2>
          <p className="desc">{t.stack.desc1}</p>
          <p className="desc" style={{ marginTop: 8 }}>
            {t.stack.desc2}
          </p>
        </div>

        <div className="stack-cloud">
          {STACK.map(([name, cls]) => (
            <span className={`badge ${cls}`} key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
