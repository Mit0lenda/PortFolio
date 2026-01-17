import React from "react";
import type { Variant } from "../../lib/types";
import { useCopy } from "../../lib/useCopy";
import { ButtonLink } from "../ui/ButtonLink";
import { HighlightText } from "../ui/HighlightText";
import { FaBoxOpen, FaChartLine, FaDownload, FaLock } from "react-icons/fa";
import profileImage from "../../assets/hero/Gemini_Generated_Image_lakcirlakcirlakc.png";

const variantToAccent: Record<Variant, "primary" | "secondary"> = {
  home: "primary",
  recruiter: "primary",
  client: "primary",
};

export const HeroSection: React.FC<{ variant: Variant }> = ({ variant }) => {
  const copy = useCopy();
  const hero = copy.hero[variant];
  const accent = variantToAccent[variant];
  const primaryDownload = hero.primaryCta.href.endsWith(".pdf");
  const highlightMatch = hero.title.match(/^(.*)\[([^\]]+)\](.*)$/);
  const hasHighlight = Boolean(highlightMatch);
  const kickerParts = variant === "home" ? hero.kicker.split("/").map((part) => part.trim()) : [];
  const iconMap = [FaLock, FaChartLine, FaBoxOpen];

  return (
    <section className={`section hero-section section--accent-${accent} relative overflow-hidden`}>
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow reveal hero-kicker">
            {kickerParts.length === 2 ? (
              <>
                <span className="hero-kicker-nick">{kickerParts[0]}</span>
                <span className="hero-kicker-sep">/</span>
                <span className="hero-kicker-name">{kickerParts[1]}</span>
              </>
            ) : (
              hero.kicker
            )}
          </p>
          <h1 className="hero-title reveal reveal-delay-1">
            {variant === "client" && hasHighlight && highlightMatch ? (
              <>
                <span className="hero-title-line">{highlightMatch[1].trim()}</span>
                <span className="hero-title-line">
                  <span className="text-accent">{highlightMatch[2]}</span>
                  {highlightMatch[3]}
                </span>
              </>
            ) : (
              <HighlightText text={hero.title} />
            )}
          </h1>
          <p className="hero-subtitle reveal reveal-delay-2">{hero.subtitle}</p>
          <div className="hero-actions reveal reveal-delay-3">
            <ButtonLink
              href={hero.primaryCta.href}
              variant={hero.primaryCta.variant}
              download={primaryDownload}
              className="relative [--btn-shadow:0_0_45px_rgba(255,212,0,0.35)] hover:[--btn-shadow:0_0_70px_rgba(255,59,59,0.45)]"
            >
              {primaryDownload ? (
                <>
                  <FaDownload aria-hidden="true" />
                  {hero.primaryCta.label}
                </>
              ) : (
                hero.primaryCta.label
              )}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant={hero.secondaryCta.variant}>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden="true"
              className="hero-orb"
            />
            <div className="hero-portrait-frame reveal reveal-delay-2">
              <img
                src={profileImage}
                alt={hero.imageAlt}
                className="hero-portrait"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
          <aside className="hero-panel reveal reveal-delay-2 w-full max-w-sm" aria-label={copy.heroPanel.title}>
            <p className="panel-title">{copy.heroPanel.title}</p>
            <ul className="panel-list">
              {copy.heroPanel.items.map((item, index) => (
                <li key={item.title} className="panel-item">
                  <p className="panel-item-title">
                    <span className="panel-icon" aria-hidden="true">
                      {(() => {
                        const Icon = iconMap[index];
                        return Icon ? <Icon /> : null;
                      })()}
                    </span>
                    {item.title}
                  </p>
                  <p className="panel-item-body">{item.description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
