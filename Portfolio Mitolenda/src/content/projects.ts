import type { Project } from "../lib/types";

export const projects: Project[] = [
  {
    slug: "project-atlas",
    title: {
      en: "Project Atlas",
      pt: "Project Atlas",
    },
    summary: {
      en: "Internal system for FGTS advance payments with secure auth and banking integration.",
      pt: "Sistema interno de antecipacao de FGTS com autenticacao segura e integracao bancaria.",
    },
    context: {
      en: "The FGTS advance flow required secure authentication and banking integration while reducing service time.",
      pt: "O fluxo de antecipacao de FGTS exigia autenticacao segura e integracao bancaria, com foco em reduzir tempo de atendimento.",
    },
    role: {
      en: "Led frontend and backend delivery, owning secure auth and the banking API integration.",
      pt: "Liderei front e back, com autenticacao segura e integracao com API bancaria.",
    },
    stack: ["React", "Node.js", "MySQL", "JWT", "OAuth2"],
    decision: {
      en: "Used JWT and OAuth2 to enforce secure access and integrate with the banking API.",
      pt: "Usei JWT e OAuth2 para garantir autenticacao segura e integracao bancaria.",
    },
    outcome: {
      en: "Reduced service time by about 70% and served 100+ clients in the first two months.",
      pt: "Reduziu o tempo de atendimento em cerca de 70% e atendeu 100+ clientes nos dois primeiros meses.",
    },
    impact: 70,
  },
  {
    slug: "project-haven-link",
    title: {
      en: "Project Haven Link",
      pt: "Project Haven Link",
    },
    summary: {
      en: "AI logistics tool for item recognition and inventory tracking during an emergency.",
      pt: "Ferramenta de logistica com IA para reconhecimento de itens e controle de inventario em emergencia.",
    },
    context: {
      en: "Built during the Rio Grande do Sul catastrophe to map shortages and optimize distribution.",
      pt: "Criado durante a catastrofe do Rio Grande do Sul para mapear faltas e otimizar distribuicao.",
    },
    role: {
      en: "Developed the product features around camera recognition and inventory mapping.",
      pt: "Desenvolvimento das funcionalidades de reconhecimento por camera e mapeamento de inventario.",
    },
    stack: ["AI", "Computer Vision", "Inventory", "Logistics"],
    decision: {
      en: "Adopted camera-based recognition to reduce human error and speed up identification.",
      pt: "Adotei reconhecimento por camera para reduzir erro humano e acelerar identificacao.",
    },
    outcome: {
      en: "Supported decision-making in a critical logistics scenario.",
      pt: "Apoiou a tomada de decisao em um cenario logistico critico.",
    },
    impact: 0,
  },
  {
    slug: "project-nexus",
    title: {
      en: "Project Nexus",
      pt: "Project Nexus",
    },
    summary: {
      en: "AI-driven construction logistics platform with map views and camera feeds.",
      pt: "Plataforma de logistica para construcao civil com IA, mapa e feeds de camera.",
    },
    context: {
      en: "Startup incubated at CEI/UFRGS to coordinate construction site logistics.",
      pt: "Startup incubada no CEI/UFRGS para organizar a logistica de obras.",
    },
    role: {
      en: "Fullstack development, UI/UX validation, agile delivery, and pitching.",
      pt: "Desenvolvimento fullstack, validacao de UI/UX, desenvolvimento agil e pitching.",
    },
    stack: ["React", "Node.js", "MySQL", "Azure", "AI"],
    decision: {
      en: "Combined map-based site visualization with camera feeds and object recognition.",
      pt: "Combinei visualizacao por mapa com feeds de camera e reconhecimento de objetos.",
    },
    outcome: {
      en: "Project in progress since 2024 with ongoing iterations.",
      pt: "Projeto em andamento desde 2024, com iteracoes continuas.",
    },
    impact: 0,
  },
];
