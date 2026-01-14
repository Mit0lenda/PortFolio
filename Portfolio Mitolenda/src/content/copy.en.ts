import type { Copy } from "../lib/types";
import { routes } from "../lib/routes";
import { site } from "../lib/site";

export const copyEn: Copy = {
  locale: "en",
  brand: {
    name: "MITOLENDA",
    developerName: "Nicollas de Oliveira",
    positioning: "Fullstack developer focused on security, data, and real delivery.",
  },
  nav: {
    home: "Home",
    recruiter: "Recruiter",
    client: "Client",
    languageLabel: "Language",
    audienceLabel: "Audience view",
    skipToContent: "Skip to content",
  },
  hero: {
    home: {
      kicker: "MITOLENDA / Nicollas de Oliveira",
      title: "Real systems. [Security] and delivery.",
      subtitle:
        "Fullstack developer focused on reliability, automation, and UX, with hands-on data work.",
      primaryCta: {
        label: "Recruiter profile",
        href: routes.recruiter,
        variant: "primary",
      },
      secondaryCta: {
        label: "Client profile",
        href: routes.client,
        variant: "secondary",
      },
    },
    recruiter: {
      kicker: "Fullstack developer - Flux Tecnologia",
      title: "Experience with [systems] and sensitive data.",
      subtitle:
        "I build a modern CRM with React, TypeScript, and SQL/Supabase, contributing to architecture, security, and performance decisions. Former digital forensics intern at the Federal Police.",
      primaryCta: {
        label: "Download resume",
        href: "/resume/Nicollas-Resume.pdf",
        variant: "primary",
      },
      secondaryCta: {
        label: "View projects",
        href: "#projects",
        variant: "secondary",
      },
    },
    client: {
      kicker: "Product-focused delivery",
      title: "Products that run with [security] and clarity.",
      subtitle:
        "Automation, performance, and UX with secure integrations and simple operations.",
      primaryCta: {
        label: "Request proposal",
        href: "#contact",
        variant: "primary",
      },
      secondaryCta: {
        label: "See real cases",
        href: "#projects",
        variant: "secondary",
      },
    },
  },
  heroPanel: {
    title: "Direct focus",
    items: [
      {
        title: "Applied security",
        description: "Sensitive data and access control from day one.",
      },
      {
        title: "Analytical mindset",
        description: "Digital forensics experience and data handling.",
      },
      {
        title: "Delivery with product",
        description: "Agile work with product and design.",
      },
    ],
  },
  about: {
    title: "[About]",
    body:
      "I am Nicollas de Oliveira (MITOLENDA), a fullstack developer. I currently build a modern CRM at Flux Tecnologia with React, TypeScript, and SQL/Supabase, focused on automation, performance, security, and UX. I previously worked in digital forensics at the Federal Police, handling evidence and sensitive data in critical environments. My focus is to grow in AI, information security, and scalable systems, and I share educational content on Instagram and LinkedIn through MITOLENDA.",
    bullets: [
      "B.Sc. in Computer Science at Unisinos (expected 2027).",
      "Former teaching assistant for Computer Architecture II (x8086 Assembly).",
      "English fluent, Portuguese native, Spanish basic.",
    ],
  },
  projects: {
    title: "[Projects]",
    intro: {
      home: "Real cases with constraints, security, and direct impact.",
      recruiter: "Cases focused on technical decisions, reliability, and operations.",
      client: "Cases focused on delivery, secure integrations, and impact.",
    },
    ctaLabel: "View case",
  },
  stack: {
    title: "Tech [Stack]",
    groups: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
      },
      {
        label: "Backend and APIs",
        items: ["Node.js", "REST", "JWT", "OAuth2"],
      },
      {
        label: "Data",
        items: ["MySQL", "SQL", "Supabase"],
      },
      {
        label: "Languages",
        items: ["Java", "C", "Python", "VHDL", "Assembly x8086"],
      },
      {
        label: "Cloud and tools",
        items: ["Azure (basic)", "Git", "GitHub"],
      },
      {
        label: "Domains",
        items: ["Digital forensics", "Information security", "Networks"],
      },
    ],
  },
  thinking: {
    title: "How I [Think]",
    items: [
      {
        title: "Security from day one",
        body:
          "Sensitive data and access control belong in the architecture.",
      },
      {
        title: "Simple operations",
        body:
          "Systems the team can run, monitor, and evolve.",
      },
      {
        title: "Data-backed decisions",
        body:
          "Analytical approach to data extraction and treatment.",
      },
      {
        title: "Real-world delivery",
        body:
          "Ship, measure, and improve with clear impact.",
      },
    ],
  },
  contact: {
    title: "[Contact]",
    body: "Direct contact for opportunities and projects.",
    ctaLabel: "Start conversation",
    items: [
      { label: "LinkedIn", value: "linkedin.com/in/mitolenda", href: site.linkedin },
      { label: "GitHub", value: "github.com/mitolenda", href: site.github },
      { label: "Email", value: site.email, href: `mailto:${site.email}` },
    ],
  },
  footer: {
    note: "MITOLENDA. Straight to the point.",
  },
  labels: {
    context: "Context",
    role: "Role",
    stack: "Stack",
    decision: "Key decision",
    outcome: "Outcome",
    impact: "Project impact",
  },
  projectDetail: {
    backLabel: "Back to projects",
    viewLiveLabel: "View live",
  },
  seo: {
    siteName: "MITOLENDA",
    defaultTitle: "MITOLENDA - Nicollas de Oliveira, Fullstack Developer",
    defaultDescription:
      "Fullstack developer focused on security, data, and real delivery.",
    home: {
      title: "MITOLENDA - Real systems with security and delivery",
      description:
        "Nicollas (MITOLENDA) delivers reliable, secure systems with real outcomes.",
    },
    recruiter: {
      title: "Recruiter View - MITOLENDA",
      description:
        "Recruiter-focused profile with CRM delivery, digital forensics, and technical decisions.",
    },
    client: {
      title: "Client View - MITOLENDA",
      description:
        "Client-focused view highlighting delivery, secure integrations, and impact.",
    },
    project: {
      titlePrefix: "Case Study",
      descriptionPrefix: "Project case study focused on real constraints and outcomes:",
    },
    notFound: {
      title: "Page not found - MITOLENDA",
      description: "The page you requested does not exist.",
    },
  },
  sectionOrder: {
    home: ["hero", "about", "projects", "stack", "thinking", "contact"],
    recruiter: ["hero", "about", "stack", "thinking", "projects", "contact"],
    client: ["hero", "projects", "about", "thinking", "stack", "contact"],
  },
};
