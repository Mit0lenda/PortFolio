import React from "react";
import type { SectionId, Variant } from "../lib/types";
import { useCopy } from "../lib/useCopy";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SitesSection } from "../components/sections/SitesSection";
import { TechStackSection } from "../components/sections/TechStackSection";
import { ThinkingSection } from "../components/sections/ThinkingSection";
import { ContactSection } from "../components/sections/ContactSection";

const renderSection = (section: SectionId, variant: Variant) => {
  switch (section) {
    case "hero":
      return <HeroSection variant={variant} />;
    case "about":
      return <AboutSection />;
    case "projects":
      return <ProjectsSection variant={variant} />;
    case "sites":
      return <SitesSection variant={variant} />;
    case "stack":
      return <TechStackSection />;
    case "thinking":
      return <ThinkingSection />;
    case "contact":
      return <ContactSection />;
    default:
      return null;
  }
};

export const SectionsRenderer: React.FC<{ variant: Variant }> = ({ variant }) => {
  const copy = useCopy();
  const order = copy.sectionOrder[variant];

  return <>{order.map((section) => (
    <React.Fragment key={section}>{renderSection(section, variant)}</React.Fragment>
  ))}</>;
};
