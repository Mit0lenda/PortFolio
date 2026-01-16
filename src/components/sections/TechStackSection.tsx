import React from "react";
import type { IconType } from "react-icons";
import { TbBrandAzure } from "react-icons/tb";
import {
  SiC,
  SiCss3,
  SiGithub,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSwagger,
  SiSupabase,
  SiTypescript,
  SiPython,
  SiKeycdn,
} from "react-icons/si";
import { useCopy } from "../../lib/useCopy";
import { useScrollReveal } from "../../lib/useScrollReveal";
import { SectionHeader } from "../ui/SectionHeader";
import { FaJava } from "react-icons/fa";

const techIconMap: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "Node.js": SiNodedotjs,
  REST: SiSwagger,
  JWT: SiJsonwebtokens,
  OAuth2: SiKeycdn,
  MySQL: SiMysql,
  SQL: SiPostgresql,
  Supabase: SiSupabase,
  Java: FaJava,
  C: SiC,
  Python: SiPython,
  "Azure (basico)": TbBrandAzure,
  Git: SiGit,
  GitHub: SiGithub,
};

export const TechStackSection: React.FC = () => {
  const copy = useCopy();
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className="section section--stack" id="stack">
      <div className="container">
        <SectionHeader
          title={copy.stack.title}
          className={`reveal-on-scroll ${isInView ? "is-visible" : ""}`}
        />
        <div className="stack-grid">
          {copy.stack.groups.map((group, index) => (
            <article
              key={group.label}
              className={`card stack-card reveal-on-scroll ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="stack-title">{group.label}</h3>
              <ul className="stack-list">
                {group.items.map((item) => {
                  const Icon = techIconMap[item];

                  return (
                    <li key={item} className="stack-item">
                      {Icon ? (
                        <span className="stack-item-icon">
                          <Icon aria-hidden="true" focusable="false" />
                        </span>
                      ) : null}
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
