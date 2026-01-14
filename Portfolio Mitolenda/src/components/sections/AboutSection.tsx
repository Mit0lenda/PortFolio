import React from "react";
import { useCopy } from "../../lib/useCopy";
import { SectionHeader } from "../ui/SectionHeader";

export const AboutSection: React.FC = () => {
  const copy = useCopy();

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeader title={copy.about.title} />
        <div className="split">
          <p className="body-lg">{copy.about.body}</p>
          <ul className="bullet-list">
            {copy.about.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
