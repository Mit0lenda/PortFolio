'use client'

import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { VenturesSection } from "../components/sections/VenturesSection";
import { SitesSection } from "../components/sections/SitesSection";
import { TechStackSection } from "../components/sections/TechStackSection";
import { AboutSection } from "../components/sections/AboutSection";
import { CertificatesSection } from "../components/sections/CertificatesSection";
import { FAQSection } from "../components/sections/FAQSection";
import { FinalCTASection } from "../components/sections/FinalCTASection";
import { ContactSection } from "../components/sections/ContactSection";
import { StackStrip } from "../components/ui/StackStrip";

export const HomePage: React.FC = () => (
  <main className="page">
    <HeroSection />
    <StackStrip />
    <ServicesSection />
    <ProjectsSection />
    <VenturesSection />
    <SitesSection />
    <TechStackSection />
    <AboutSection />
    <CertificatesSection />
    <FAQSection />
    <FinalCTASection />
    <ContactSection />
  </main>
);
