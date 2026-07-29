import type { ProjectFlowStep, ProjectMedia } from "../lib/types";

/**
 * Mídia dos projetos — separada do copy porque imagem/diagrama não muda
 * por idioma. Mapeado por ID estável, consumido tanto pelo card da home
 * (`ProjectsSection`) quanto pela página de case (`/projects/[slug]`).
 *
 * Categoria visual por tipo de projeto (não é o mesmo enquadramento pra
 * todos):
 * - produto digital com UI própria → cover = interface real, gallery =
 *   detalhe ampliado + outra tela (Nexus, Atlas)
 * - projeto premiado → cover = evidência do prêmio, gallery = produto em
 *   uso/desenvolvimento (Haven Link)
 * - automação/backend sem UI → sem cover/gallery, usa `flow` com as
 *   etapas reais do sistema (PromoCode, CRM Autônomo)
 */
export type ProjectAssets = {
  stack: string[];
  cover?: ProjectMedia;
  gallery?: ProjectMedia[];
  flow?: ProjectFlowStep[];
};

export const PROJECT_ASSETS: Record<string, ProjectAssets> = {
  "promocode": {
    stack: ["n8n", "LangChain", "Supabase", "Chatwoot", "RAG"],
    flow: [
      { stage: "Entrada", label: "Cliente escreve no WhatsApp", sub: "linguagem natural" },
      { stage: "Processamento", label: "Agente de IA decide", sub: "LangChain + ferramentas" },
      { stage: "Memória", label: "Histórico da conversa", sub: "Supabase + pgvector (RAG)" },
      { stage: "Integração", label: "Chatwoot inbox", sub: "humano assume quando quiser" },
    ],
  },
  "haven-link": {
    stack: ["React", "Node.js", "IA", "iTwin", "Mapas"],
    cover: {
      src: "/assets/photo-trofeu.png",
      alt: "Troféu de 3º lugar nacional no iTwin4Good BR",
      caption: "// 01 — evidência do prêmio: 3º lugar nacional, iTwin4Good BR",
      type: "photo",
      aspectRatio: "portrait",
    },
    gallery: [
      {
        src: "/assets/work-ia-detect.png",
        alt: "Coordenação por IA em tempo real na plataforma Haven Link",
        caption: "// 02 — coordenação por IA em tempo real",
        type: "interface",
        aspectRatio: "portrait",
      },
      {
        src: "/assets/work-programacao.png",
        alt: "Desenvolvimento do backend do Haven Link",
        caption: "// 03 — backend Node.js + IA em desenvolvimento",
        type: "photo",
        aspectRatio: "square",
      },
    ],
  },
  "nexus": {
    stack: ["React", "Leaflet", "Python", "CV", "Bentley"],
    cover: {
      src: "/assets/work-nexus-mapa.png",
      alt: "Mapa em tempo real do canteiro de obras no Nexus",
      caption: "// 01 — interface real: mapa por construção",
      type: "interface",
      aspectRatio: "portrait",
    },
    gallery: [
      {
        src: "/assets/work-nexus-login.png",
        alt: "Tela de login do Nexus",
        caption: "// 02 — detalhe: autenticação",
        type: "interface",
        aspectRatio: "portrait",
      },
      {
        src: "/assets/work-nexus-map-dev.png",
        alt: "Ambiente de desenvolvimento do mapa do Nexus",
        caption: "// 03 — build do mapa em Leaflet",
        type: "interface",
        aspectRatio: "landscape",
      },
    ],
  },
  "atlas": {
    stack: ["React", "Node.js", "JWT", "MySQL", "Azure"],
    cover: {
      src: "/assets/work-atlas-dashboard.png",
      alt: "Dashboard de vendas e propostas do Atlas",
      caption: "// 01 — tela real: dashboard operacional",
      type: "interface",
      aspectRatio: "wide",
    },
    gallery: [
      {
        src: "/assets/work-consultas.png",
        alt: "Tela de consultas em massa do Atlas",
        caption: "// 02 — consultas em massa, uso diário da equipe comercial",
        type: "interface",
        aspectRatio: "portrait",
      },
      {
        src: "/assets/work-propostas.png",
        alt: "CRM de propostas do Atlas",
        caption: "// 03 — CRM de propostas",
        type: "interface",
        aspectRatio: "wide",
      },
    ],
  },
  "crm-autonomo": {
    stack: ["Node.js", "Scraping", "Automation", "CRM", "API"],
    flow: [
      { stage: "Entrada", label: "Varre o mapa", sub: "por categoria + cidade" },
      { stage: "Processamento", label: "Detecta negócio sem site", sub: "critério real de oportunidade" },
      { stage: "Integração", label: "Cria tarefa no CRM", sub: "oportunidade + follow-up" },
      { stage: "Saída", label: "Zero clique manual", sub: "custo de API zero" },
    ],
  },
  "reddy": {
    stack: ["n8n", "Twilio", "Chatwoot", "GPT-4o", "WhatsApp API"],
    flow: [
      { stage: "Entrada", label: "Cliente escreve no WhatsApp", sub: "número oficial via Twilio" },
      { stage: "Processamento", label: "Detecção automática de idioma", sub: "por DDI, fallback PT-BR" },
      { stage: "Diagnóstico", label: "Fluxo guiado", sub: "cadastro → conexão → dispositivo" },
      { stage: "Integração", label: "Chatwoot inbox", sub: "humano assume quando quiser" },
    ],
  },
  "cpm": {
    stack: ["React", "NestJS", "Prisma", "PostgreSQL", "GitHub Actions"],
    flow: [
      { stage: "Entrada", label: "Lead entra no funil", sub: "pipeline de vendas" },
      { stage: "Processamento", label: "Analytics do pipeline", sub: "visibilidade por etapa" },
      { stage: "Detecção", label: "Anti-Limbo", sub: "oportunidade parada sem follow-up" },
      { stage: "Saída", label: "Deploy controlado", sub: "staging → aprovação → produção" },
    ],
  },
  "dashboard-financeiro": {
    stack: ["SQL", "Modelagem DRE/PIER", "BI", "Figma"],
    flow: [
      { stage: "Entrada", label: "Lançamentos brutos do ERP", sub: "dados financeiros" },
      { stage: "Processamento", label: "Modelagem DRE/PIER", sub: "6 blocos de despesas mapeados" },
      { stage: "Validação", label: "Paridade 1:1", sub: "comparado a relatórios nativos" },
      { stage: "Saída", label: "Painel executivo de KPIs", sub: "Receita, CMV, EBITDA, Margem" },
    ],
  },
  "infra-comunicacao": {
    stack: ["Google Workspace", "Twilio", "WABA"],
    flow: [
      { stage: "Diagnóstico", label: "~50 contas de e-mail", sub: "infraestrutura legada" },
      { stage: "Migração", label: "Google Workspace", sub: "mixagem de planos, custo otimizado" },
      { stage: "Canal de suporte", label: "SMS → WhatsApp", sub: "via Twilio/WABA" },
      { stage: "Saída", label: "Infraestrutura consolidada", sub: "custo reduzido, canal ampliado" },
    ],
  },
};

export const FALLBACK_ASSETS: ProjectAssets = { stack: [] };
