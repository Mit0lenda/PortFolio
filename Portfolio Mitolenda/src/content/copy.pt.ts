import type { Copy } from "../lib/types";
import { routes } from "../lib/routes";
import { site } from "../lib/site";

export const copyPt: Copy = {
  locale: "pt",
  brand: {
    name: "MITOLENDA",
    developerName: "Nicollas de Oliveira",
    positioning: "Desenvolvedor fullstack focado em seguranca, dados e entrega real.",
  },
  nav: {
    home: "Home",
    recruiter: "Recrutador",
    client: "Cliente",
    languageLabel: "Idioma",
    audienceLabel: "Perfil de publico",
    skipToContent: "Ir para o conteudo",
  },
  hero: {
    home: {
      kicker: "MITOLENDA / Nicollas de Oliveira",
      title: "Sistemas reais. [Seguranca] e entrega.",
      subtitle:
        "Fullstack focado em confiabilidade, automacao e UX, com experiencia em dados e sistemas reais.",
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
      title: "Experiencia com [sistemas] e dados sensiveis.",
      subtitle:
        "Atuo no CRM da Flux com React, TypeScript e SQL/Supabase, participando de decisoes de arquitetura, seguranca e performance. Passei por pericia digital na Policia Federal.",
      primaryCta: {
        label: "Baixar curriculo",
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
      title: "Produtos que operam com [seguranca] e clareza.",
      subtitle:
        "Foco em automacao, performance e experiencia do usuario, com integracoes seguras e operacao simples.",
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
        title: "Seguranca aplicada",
        description: "Dados e acessos tratados desde a arquitetura.",
      },
      {
        title: "Mentalidade analitica",
        description: "Base em pericia digital e tratamento de dados.",
      },
      {
        title: "Entrega com produto",
        description: "Colaboracao direta com produto e design.",
      },
    ],
  },
  about: {
    title: "[Sobre]",
    body:
      "Sou Nicollas de Oliveira (MITOLENDA), desenvolvedor fullstack. Atualmente trabalho na Flux Tecnologia construindo um CRM moderno com React, TypeScript e SQL/Supabase, focado em automacao, performance, seguranca e UX. Atuei como estagiario em pericia digital na Policia Federal, lidando com evidencias e dados sensiveis em ambiente critico. Meu foco e evoluir em IA, seguranca da informacao e sistemas escalaveis, e compartilho conteudo educacional no Instagram e LinkedIn pelo MITOLENDA.",
    bullets: [
      "B.Sc. em Ciencia da Computacao na Unisinos (formatura prevista 2027).",
      "Ex-monitor de Arquitetura de Computadores II (Assembly x8086).",
      "Ingles fluente, portugues nativo, espanhol basico.",
    ],
  },
  projects: {
    title: "[Projetos]",
    intro: {
      home: "Casos reais com restricoes, seguranca e impacto direto.",
      recruiter: "Casos com foco em decisao tecnica, confiabilidade e operacao.",
      client: "Casos com foco em entrega, impacto e integracao segura.",
    },
    ctaLabel: "Ver caso",
  },
  stack: {
    title: "Stack [Tecnologico]",
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
        items: ["Azure (basico)", "Git", "GitHub"],
      },
      {
        label: "Dominios",
        items: ["Pericia digital", "Seguranca da informacao", "Redes"],
      },
    ],
  },
  thinking: {
    title: "Como Eu [Penso]",
    items: [
      {
        title: "Seguranca desde o inicio",
        body:
          "Dados sensiveis e controle de acesso entram na arquitetura, nao no fim.",
      },
      {
        title: "Operacao simples",
        body:
          "Sistemas que o time entende, monitora e consegue evoluir.",
      },
      {
        title: "Decisao baseada em dados",
        body:
          "Experiencia em analise e tratamento de dados com foco em clareza.",
      },
      {
        title: "Entrega no mundo real",
        body:
          "Foco em impacto mensuravel e feedback rapido.",
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
    decision: "Decisao-chave",
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
      "Desenvolvedor fullstack focado em seguranca, dados e entrega real.",
    home: {
      title: "MITOLENDA - Sistemas reais com seguranca e entrega",
      description:
        "Nicollas (MITOLENDA) entrega sistemas confiaveis, seguros e com foco em resultados.",
    },
    recruiter: {
      title: "Visao Recrutador - MITOLENDA",
      description:
        "Perfil para recrutamento com experiencia em CRM, pericia digital e decisao tecnica.",
    },
    client: {
      title: "Visao Cliente - MITOLENDA",
      description:
        "Visao para clientes com foco em entrega, integracoes seguras e impacto no negocio.",
    },
    project: {
      titlePrefix: "Estudo de Caso",
      descriptionPrefix: "Estudo de caso com foco em restricoes reais e resultados:",
    },
    notFound: {
      title: "Pagina nao encontrada - MITOLENDA",
      description: "A pagina solicitada nao existe.",
    },
  },
  sectionOrder: {
    home: ["hero", "about", "projects", "stack", "thinking", "contact"],
    recruiter: ["hero", "about", "stack", "thinking", "projects", "contact"],
    client: ["hero", "projects", "about", "thinking", "stack", "contact"],
  },
};
