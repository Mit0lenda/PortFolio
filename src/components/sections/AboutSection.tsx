'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { MediaFrame } from "../media/MediaFrame";
import profileImage from "../../assets/hero/nicollas-profile-2026.jpeg";

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
          <MediaFrame
            src={profileImage}
            alt="Nicollas Freitas"
            aspectRatio="portrait"
            treatment="editorial"
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            caption={a.sub}
            className="about-photo-frame"
          />

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
          </div>
        </div>
      </div>
    </section>
  );
};
