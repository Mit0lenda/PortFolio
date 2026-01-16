export type Language = "en" | "pt";
export type Variant = "home" | "recruiter" | "client";

export type SectionId = "hero" | "about" | "projects" | "sites" | "stack" | "thinking" | "contact";

export type LocalizedText = {
  en: string;
  pt: string;
};

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HeroPanelItem = {
  title: string;
  description: string;
};

export type HeroCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

export type Copy = {
  locale: Language;
  brand: {
    name: string;
    developerName: string;
    positioning: string;
  };
  nav: {
    home: string;
    recruiter: string;
    client: string;
    languageLabel: string;
    audienceLabel: string;
    skipToContent: string;
  };
  hero: Record<Variant, HeroCopy>;
  heroPanel: {
    title: string;
    items: HeroPanelItem[];
  };
  about: {
    title: string;
    summary: string;
    details: string;
    moreLabel: string;
    bullets: string[];
  };
  projects: {
    title: string;
    intro: Record<Variant, string>;
    ctaLabel: string;
  };
  sites: {
    title: string;
    intro: Record<Variant, string>;
    ctaLabel: string;
  };
  stack: {
    title: string;
    groups: {
      label: string;
      items: string[];
    }[];
  };
  thinking: {
    title: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  contact: {
    title: string;
    body: string;
    ctaLabel: string;
    items: {
      label: string;
      value: string;
      href: string;
    }[];
  };
  footer: {
    note: string;
  };
  labels: {
    context: string;
    role: string;
    stack: string;
    decision: string;
    outcome: string;
    impact: string;
  };
  projectDetail: {
    backLabel: string;
    viewLiveLabel: string;
  };
  seo: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    home: {
      title: string;
      description: string;
    };
    recruiter: {
      title: string;
      description: string;
    };
    client: {
      title: string;
      description: string;
    };
    project: {
      titlePrefix: string;
      descriptionPrefix: string;
    };
    notFound: {
      title: string;
      description: string;
    };
  };
  sectionOrder: Record<Variant, SectionId[]>;
};

export type Project = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  image: {
    src: string;
    alt: LocalizedText;
  };
  images?: {
    src: string;
    alt: LocalizedText;
  }[];
  context: LocalizedText;
  role: LocalizedText;
  stack: string[];
  decision: LocalizedText;
  outcome: LocalizedText;
  impact: number;
  links?: {
    live?: string;
    repo?: string;
  };
};

export type Site = {
  name: string;
  url: string;
  description: LocalizedText;
  image: {
    src: string;
    alt: LocalizedText;
  };
};
