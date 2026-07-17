'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";
import { MediaFrame } from "../media/MediaFrame";
import { Reveal } from "../motion";
import profileImage from "../../assets/hero/nicollas-profile-2026.jpeg";

export const AboutSection: React.FC = () => {
  const t = useCopy();
  const a = t.about;
  const photoRef = useTilt<HTMLDivElement>({ tilt: false });

  return (
    <section id="sobre">
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">{a.eyebrow}</span>
        </Reveal>

        <Reveal as="div" className="about" stagger staggerDelay={0.15}>
          <Reveal.Item as="div" className="about-photo-frame spotlight" ref={photoRef}>
            <MediaFrame
              src={profileImage}
              alt="Nicollas Freitas"
              aspectRatio="portrait"
              treatment="editorial"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              caption={a.sub}
            />
          </Reveal.Item>

          <Reveal.Item as="div" className="body">
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
          </Reveal.Item>
        </Reveal>
      </div>
    </section>
  );
};
