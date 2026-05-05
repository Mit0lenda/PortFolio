import React from "react";
import { useCopy } from "../../lib/useCopy";

export const AboutSection: React.FC = () => {
  const t = useCopy();
  const a = t.about;

  return (
    <section id="sobre">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{a.eyebrow}</span>
        </div>

        <div className="about">
          <div className="photo">
            <img src="/assets/profile-nicollas.png" alt="Nicollas Freitas" />
          </div>

          <div className="body">
            <span className="eyebrow">{a.sub}</span>
            <h3>
              {a.h3a} <span className="impact">{a.h3b}</span>
            </h3>

            <p className="about-bio">
              {a.bio1a}
              <strong>{a.bio1b}</strong>
              {a.bio1c}
              <strong>{a.bio1d}</strong>
              {a.bio1e}
            </p>
            <p className="about-bio">{a.bio2}</p>

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
        </div>
      </div>
    </section>
  );
};
