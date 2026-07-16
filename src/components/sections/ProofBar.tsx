'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";

export const ProofBar: React.FC = () => {
  const t = useCopy();
  const a = t.about;

  return (
    <div className="container proof-bar">
      <span className="eyebrow">{a.proofEyebrow}</span>
      <div className="achv-grid">
        <div className="achv-cell">
          <span className="icon">🥉</span>
          <span className="h">
            <span className="impact">{a.a1h1}</span> {a.a1h2}
          </span>
          <span className="d">{a.a1d}</span>
        </div>
        <div className="achv-cell">
          <span className="icon">🚀</span>
          <span className="h">
            {a.a2h1}
            <br />
            {a.a2h2}
          </span>
          <span className="d">{a.a2d}</span>
        </div>
        <div className="achv-cell">
          <span className="icon">🔬</span>
          <span className="h">
            {a.a3h1}
            <br />
            {a.a3h2}
          </span>
          <span className="d">{a.a3d}</span>
        </div>
      </div>
    </div>
  );
};
