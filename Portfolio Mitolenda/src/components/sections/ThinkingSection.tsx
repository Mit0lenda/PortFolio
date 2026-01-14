import React from "react";
import { useCopy } from "../../lib/useCopy";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";

export const ThinkingSection: React.FC = () => {
  const copy = useCopy();
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="section section--accent-secondary" id="thinking">
      <div className="container">
        <SectionHeader
          title={copy.thinking.title}
          className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
        />
        <div className="thinking-grid">
          {copy.thinking.items.map((item, index) => (
            <article
              key={item.title}
              className={`card thinking-card reveal-on-scroll ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
