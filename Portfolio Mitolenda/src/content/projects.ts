import type { Project } from "../lib/types";

export const projects: Project[] = [
  {
    slug: "project-atlas",
    title: {
      en: "Project Atlas",
      pt: "Project Atlas",
    },
    summary: {
      en: "Internal FGTS advance platform with secure auth and banking connectors.",
      pt: "Plataforma interna de antecipacao de FGTS com autenticacao segura e integracoes bancarias.",
    },
    context: {
      en: "Flow demanded tight authentication and banking integration to cut support delays.",
      pt: "Fluxo exigia controle rigoroso de acesso e integracao bancaria para reduzir atrasos.",
    },
    role: {
      en: "Led frontend and backend delivery, owning the secure auth and banking API integration.",
      pt: "Liderei front e back com foco em autenticacao segura e integracao com API bancaria.",
    },
    stack: ["React", "Node.js", "MySQL", "JWT", "OAuth2"],
    decision: {
      en: "Chosen JWT and OAuth2 to lock down access and call the banking API safely.",
      pt: "Optei por JWT e OAuth2 para blindar o acesso e conversar com o banco com seguranca.",
    },
    outcome: {
      en: "Cut service time ~70% and onboarded 100+ clients in the first two months.",
      pt: "Cortou cerca de 70% do tempo de atendimento e atendeu 100+ clientes nos dois primeiros meses.",
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
      en: "AI logistics tool for item recognition and inventory tracking during emergencies.",
      pt: "Ferramenta logistica com IA para reconhecimento de itens e controle de inventario em emergencias.",
    },
    context: {
      en: "Built during the Rio Grande do Sul catastrophe to map shortages and speed mobilization.",
      pt: "Criado durante a catastrofe no RS para mapear faltas e acelerar a mobilizacao.",
    },
    role: {
      en: "Delivered camera recognition and inventory mapping modules.",
      pt: "Entreguei funcionalidades de reconhecimento por camera e mapeamento de inventario.",
    },
    stack: ["AI", "Computer Vision", "Inventory", "Logistics"],
    decision: {
      en: "Adopted camera-based recognition to reduce human error and accelerate identification.",
      pt: "Adotei reconhecimento por camera para reduzir erro humano e acelerar identificacao.",
    },
    outcome: {
      en: "Supplied actionable data for decisions during a critical logistics window.",
      pt: "Forneceu dados acionaveis para decisões em um momento logistico critico.",
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
      en: "Construction logistics platform combining maps, camera feeds, and AI.",
      pt: "Plataforma de logistica para obras que combina mapas, feeds de camera e IA.",
    },
    context: {
      en: "Startup incubated at CEI/UFRGS to orchestrate construction site logistics.",
      pt: "Startup incubada no CEI/UFRGS para orquestrar a logistica de obras.",
    },
    role: {
      en: "Fullstack ownership, UI/UX validation, agile delivery, and pitching.",
      pt: "Fullstack, validacao de UI/UX, entrega agil e pitching.",
    },
    stack: ["React", "Node.js", "MySQL", "Azure", "AI"],
    decision: {
      en: "Fused map visualization with camera feeds and recognition models.",
      pt: "Combinei visualizacao por mapa com feeds de camera e modelos de reconhecimento.",
    },
    outcome: {
      en: "Project in progress since 2024 with ongoing iteration.",
      pt: "Projeto em andamento desde 2024, com iteracoes continuas.",
    },
    impact: 0,
  },
];
