import type { Copy } from "../lib/types";
import { routes } from "../lib/routes";
import { site } from "../lib/site";

export const copyPt: Copy = {
  locale: "pt",
  brand: {
    name: "MITOLENDA",
    developerName: "Nicollas de Oliveira",
    positioning: "Desenvolvedor fullstack focado em segurança, dados e entrega real.",
  },
  nav: {
    home: "Home",
    recruiter: "Recrutador",
    client: "Cliente",
    languageLabel: "Idioma",
    audienceLabel: "Perfil de público",
    skipToContent: "Ir para o conteúdo",
  },
  hero: {
    home: {
      kicker: "MITOLENDA / Nicollas de Oliveira",
      title: "Sistemas reais. [Segurança] e entrega.",
      subtitle:
        "Fullstack focado em confiabilidade, automação e UX, com experiência em dados e sistemas reais.",
      imageAlt: "Retrato de Nicollas de Oliveira",
      primaryCta: {
        label: "Perfil Recrutador",
        href: routes.recruiter,
        variant: "primary",
      },
      secondaryCta: {
        label: "Perfil Cliente",
        href: routes.client,
        variant: "secondary",
      },
    },
    recruiter: {
      kicker: "Fullstack developer - Flux Tecnologia",
      title: "Experiência com [sistemas] e dados sensíveis.",
      subtitle:
        "Atuo no CRM da Flux com React, TypeScript e SQL/Supabase, participando de decisões de arquitetura, segurança e performance. Passei por perícia digital na Polícia Federal.",
      imageAlt: "Retrato profissional de Nicollas de Oliveira",
      primaryCta: {
        label: "Baixar currículo",
        href: "/resume/Nicollas-Resume.pdf",
        variant: "primary",
      },
      secondaryCta: {
        label: "Ver projetos",
        href: "#projects",
        variant: "secondary",
      },
    },
    client: {
      kicker: "Entrega orientada a produto",
      title: "Produtos que operam com [segurança] e clareza.",
      subtitle:
        "Foco em automação, performance e experiência do usuário, com integrações seguras e operação simples.",
      imageAlt: "Foto de perfil de Nicollas de Oliveira",
      primaryCta: {
        label: "Pedir proposta",
        href: "#contact",
        variant: "primary",
      },
      secondaryCta: {
        label: "Ver casos reais",
        href: "#projects",
        variant: "secondary",
      },
    },
  },
  heroPanel: {
    title: "Pontos diretos",
    items: [
      {
        title: "Segurança aplicada",
        description: "Dados e acessos tratados desde a arquitetura.",
      },
      {
        title: "Mentalidade analítica",
        description: "Base em perícia digital e tratamento de dados.",
      },
      {
        title: "Entrega com produto",
        description: "Colaboração direta com produto e design.",
      },
    ],
  },
  about: {
    title: "[Sobre]",
    body:
      "Sou Nicollas de Oliveira (MITOLENDA), desenvolvedor fullstack na Flux Tecnologia. Atuo com React, TypeScript e SQL/Supabase, focado em automação, segurança e UX. Passei por perícia digital na Polícia Federal.",
    moreLabel: "Ler mais",
    bullets: [
      "B.Sc. em Ciência da Computação na Unisinos (formatura prevista 2027).",
      "Ex-monitor de Arquitetura de Computadores II (Assembly x8086).",
      "Inglês fluente, português nativo, espanhol básico.",
    ],
  },
  projects: {
    title: "[Projetos]",
    intro: {
      home: "Casos reais que unem restrições, segurança e impacto mensurável.",
      recruiter: "Perfis voltados para decisão técnica, confiabilidade e operação segura.",
      client: "Histórias sobre entrega, integrações seguras e impacto concreto.",
    },
    ctaLabel: "Ver caso",
  },
  sites: {
    title: "[Sites]",
    intro: {
      home: "Sites entregues para clientes que confiaram no meu serviço.",
      recruiter: "Sites entregues como freelancer para clientes que confiaram no meu serviço.",
      client: "Sites reais publicados para clientes que confiaram no meu serviço.",
    },
    ctaLabel: "Visitar site",
  },
  stack: {
    title: "Stack [Tecnológico]",
    groups: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
      },
      {
        label: "Backend e APIs",
        items: ["Node.js", "REST", "JWT", "OAuth2"],
      },
      {
        label: "Dados",
        items: ["MySQL", "SQL", "Supabase"],
      },
      {
        label: "Linguagens",
        items: ["Java", "C", "Python", "VHDL", "Assembly x8086"],
      },
      {
        label: "Cloud e ferramentas",
        items: ["Azure (básico)", "Git", "GitHub"],
      },
      {
        label: "Domínios",
        items: ["Perícia digital", "Segurança da informação", "Redes"],
      },
    ],
  },
  thinking: {
    title: "Como Eu [Penso]",
    items: [
      {
        title: "Segurança desde o início",
        body:
          "Dados sensíveis e controle de acesso entram na arquitetura, não no fim.",
      },
      {
        title: "Operação simples",
        body:
          "Sistemas que o time entende, monitora e consegue evoluir.",
      },
      {
        title: "Decisão baseada em dados",
        body:
          "Experiência em análise e tratamento de dados com foco em clareza.",
      },
      {
        title: "Entrega no mundo real",
        body:
          "Foco em impacto mensurável e feedback rápido.",
      },
    ],
  },
  contact: {
    title: "[Contato]",
    body: "Contato direto para oportunidades e projetos.",
    ctaLabel: "Iniciar conversa",
    items: [
      { label: "LinkedIn", value: "linkedin.com/in/mitolenda", href: site.linkedin },
      { label: "GitHub", value: "github.com/mitolenda", href: site.github },
      { label: "Email", value: site.email, href: `mailto:${site.email}` },
    ],
  },
  footer: {
    note: "MITOLENDA. Direto ao ponto.",
  },
  labels: {
    context: "Contexto",
    role: "Papel",
    stack: "Stack",
    decision: "Decisão-chave",
    outcome: "Resultado",
    impact: "Impacto do projeto",
  },
  projectDetail: {
    backLabel: "Voltar aos projetos",
    viewLiveLabel: "Ver online",
  },
  seo: {
    siteName: "MITOLENDA",
    defaultTitle: "MITOLENDA - Nicollas de Oliveira, Desenvolvedor Fullstack",
    defaultDescription:
      "Desenvolvedor fullstack focado em segurança, dados e entrega real.",
    home: {
      title: "MITOLENDA - Sistemas reais com segurança e entrega",
      description:
        "Nicollas (MITOLENDA) entrega sistemas confiáveis, seguros e com foco em resultados.",
    },
    recruiter: {
      title: "Visão Recrutador - MITOLENDA",
      description:
        "Perfil para recrutamento com experiência em CRM, perícia digital e decisão técnica.",
    },
    client: {
      title: "Visão Cliente - MITOLENDA",
      description:
        "Visão para clientes com foco em entrega, integrações seguras e impacto no negócio.",
    },
    project: {
      titlePrefix: "Estudo de Caso",
      descriptionPrefix: "Estudo de caso com foco em restrições reais e resultados:",
    },
    notFound: {
      title: "Página não encontrada - MITOLENDA",
      description: "A página solicitada não existe.",
    },
  },
  sectionOrder: {
    home: ["hero", "about", "projects", "sites", "stack", "thinking", "contact"],
    recruiter: ["hero", "about", "stack", "thinking", "projects", "sites", "contact"],
    client: ["hero", "projects", "sites", "about", "thinking", "stack", "contact"],
  },
};
