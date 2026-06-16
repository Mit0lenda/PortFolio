export type Language = "pt" | "en" | "es";

export type ServiceItem = {
  t: string;
  d: string;
  price: string;
  prazo: string;
};

export type ProjectItem = {
  name: string;
  tag: string;
  trophy: string;
  desc: string;
};

export type VentureItem = {
  n: string;
  tag: string;
  url: string;
  desc: string;
  tags: string[];
};

export type ContactCard = {
  k: string;
  v: string;
  tech?: number;
  sub: string;
  hint: string;
  href: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type CertificateItem = {
  provider: string;
  title: string;
  issuer: string;
  date: string;
  duration: string;
  id: string;
};

export type Copy = {
  nav: {
    servicos: string;
    projetos: string;
    sites: string;
    stack: string;
    sobre: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    h1c: string;
    lead: string;
    cta1: string;
    cta2: string;
    meta1: string;
    meta2: string;
    meta3: string;
    badge1: string;
    badge2: string;
  };
  services: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    desc: string;
    kInvest: string;
    kPrazo: string;
    list: ServiceItem[];
  };
  projects: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc: string;
    labelProj: string;
    list: ProjectItem[];
  };
  sites: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc: string;
  };
  ventures: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc: string;
    labelRole: string;
    cta: string;
    list: VentureItem[];
  };
  stack: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc1: string;
    desc2: string;
  };
  about: {
    eyebrow: string;
    sub: string;
    h3a: string;
    h3b: string;
    bio1a: string;
    bio1b: string;
    bio1c: string;
    bio1d: string;
    bio1e: string;
    bio2: string;
    a1h1: string;
    a1h2: string;
    a1d: string;
    a2h1: string;
    a2h2: string;
    a2d: string;
    a3h1: string;
    a3h2: string;
    a3d: string;
  };
  certificates: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc: string;
    list: CertificateItem[];
  };
  faq: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    list: FaqItem[];
  };
  finalCta: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    h2c: string;
    lead: string;
    cta1: string;
    cta2: string;
    ig: string;
  };
  contact: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    desc: string;
    cards: ContactCard[];
  };
  footer: {
    inicio: string;
    servicos: string;
    projetos: string;
    sobre: string;
    faq: string;
    contato: string;
  };
};
