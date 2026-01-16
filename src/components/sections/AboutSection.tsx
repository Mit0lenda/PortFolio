import React from "react";
import { FaChalkboardTeacher, FaGlobeAmericas, FaGraduationCap } from "react-icons/fa";
import { useCopy } from "../../lib/useCopy";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";

const bulletIcons = [FaGraduationCap, FaChalkboardTeacher, FaGlobeAmericas];

export const AboutSection: React.FC = () => {
  const copy = useCopy();
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="section section--accent-primary" id="about">
      <div className="container split">
        <div className="about-content">
          <SectionHeader
            title={copy.about.title}
            className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
          />
          <p className={`about-summary reveal-on-scroll ${isInView ? "is-visible" : ""}`}>
            {copy.about.summary}
          </p>
          <details className="about-more reveal-on-scroll">
            <summary className="text-link">{copy.about.moreLabel}</summary>
            <p className="about-details">{copy.about.details}</p>
          </details>
        </div>
        <ul className={`bullet-list reveal-on-scroll ${isInView ? "is-visible" : ""}`}>
          {copy.about.bullets.map((item, index) => {
            const Icon = bulletIcons[index];
            return (
              <li key={item}>
                <span className="bullet-icon" aria-hidden="true">
                  {Icon ? <Icon /> : null}
                </span>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
