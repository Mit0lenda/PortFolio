import type { Copy } from "../lib/types";

export const copyPt: Copy = {
  nav: {
    servicos: "Serviços", projetos: "Projetos", sites: "Sites",
    stack: "Stack", sobre: "Sobre", faq: "FAQ", cta: 'Manda "projeto" →',
  },
  hero: {
    eyebrow: "// Full-Stack Developer · Porto Alegre · Atende Brasil e exterior",
    h1a: "TRANSFORMAMOS", h1b: "CÓDIGO EM", h1c: "RESULTADO REAL.",
    lead: "Sites, sistemas e automações para empresas que querem crescer sem contratar mais gente.",
    cta1: 'Manda "projeto" no direct →', cta2: "Chamar no WhatsApp",
    meta1: "DISPONÍVEL · MAIO 2026", meta2: "// PORTO ALEGRE — RS", meta3: "NICOLLAS FREITAS",
    badge1: "3º LUGAR NACIONAL", badge2: "iTwin4Good BR",
  },
  services: {
    eyebrow: "// 02 — serviços",
    h2a: "Sete frentes.", h2b: "Zero", h2c: "enrolação.",
    desc: "Preço e prazo na mesa antes da reunião. Sem orçamento misterioso.",
    kInvest: "Investimento", kPrazo: "Prazo",
    list: [
      { t: "Site Profissional",   d: "Institucional completo, performático, otimizado para SEO e conversão.",                 price: "R$ 2.500–8.000",   prazo: "7–21 dias" },
      { t: "Landing Page",        d: "Página única focada em conversão. Copy, design e código sob medida.",                   price: "R$ 1.500–5.000",   prazo: "3–10 dias" },
      { t: "Automação n8n",       d: "Tira gente de planilha. Conecta CRM, e-mail, planilhas e APIs num só fluxo.",           price: "R$ 2.000–12.000",  prazo: "5–20 dias" },
      { t: "Chatbot / IA",        d: "Atendimento 24/7 com modelo de linguagem treinado no seu negócio.",                     price: "R$ 2.500–15.000",  prazo: "7–25 dias" },
      { t: "Sistema Web Custom",  d: "CRM, ERP leve, dashboards, área de cliente. Auth + banco + API + UI.",                  price: "R$ 8.000–30.000+", prazo: "20–90 dias" },
      { t: "Integração de APIs",  d: "Conecta seus sistemas: ERP ↔ e-commerce, CRM ↔ marketing, banco ↔ relatório.",         price: "R$ 2.000–10.000",  prazo: "5–20 dias" },
      { t: "Consultoria Digital", d: "Sessão técnica para destravar projeto, escolher stack ou auditar código.",              price: "R$ 500–3.000",     prazo: "2–7 dias" },
    ],
  },
  projects: {
    eyebrow: "// 03 — projetos destacados",
    h2a: "Código que", h2b: "vence.",
    desc: "Três projetos. Um prêmio nacional. Uma startup incubada. Um sistema em produção.",
    labelProj: "PROJETO",
    list: [
      { name: "Haven Link", tag: "IA · Logística emergencial", trophy: "🥉 3º LUGAR NACIONAL · iTwin4Good BR", desc: "Plataforma de IA para logística emergencial — coordena resgate em desastres, conectando voluntários, ONGs e órgãos públicos via mapa em tempo real. Premiada nacionalmente." },
      { name: "Nexus",      tag: "Startup · CEI-UFRGS",        trophy: "🚀 INCUBADA · CEI-UFRGS",            desc: "Plataforma de monitoramento de obras com IA aplicada. Mapa por construção, controle de estoque por ponto e detecção visual no canteiro. Hoje incubada no Centro de Empreendedorismo da UFRGS." },
      { name: "Atlas",      tag: "Sistema financeiro FGTS",    trophy: "// EM PRODUÇÃO · FREELANCE",         desc: "Sistema financeiro FGTS completo para uma equipe comercial. CRM de propostas, agenda, consultas em massa, exportação de relatórios." },
    ],
  },
  sites: {
    eyebrow: "// 04 — sites entregues",
    h2a: "No ar.", h2b: "Vendendo.",
    desc: "Clientes em setores diferentes. Denominador comum: site rápido, copy honesta, conversão medida.",
  },
  ventures: {
    eyebrow: "// 05 — minhas empresas",
    h2a: "Não só desenvolvo.", h2b: "Construo.",
    desc: "Duas empresas que co-fundei. Onde sou CEO ao lado dos meus sócios.",
    labelRole: "CEO & CO-FUNDADOR",
    cta: "visitar site →",
    list: [
      { n: "Codaryn", tag: "Soluções digitais", url: "codaryn.com.br", desc: "Empresa de soluções digitais para o seu negócio. Aplicamos tecnologias que simplificam desafios e potencializam resultados — equipe completa de programadores, suporte e administração.", tags: ["Equipe completa", "Suporte", "Tecnologia aplicada"] },
      { n: "Nexium",  tag: "Monitoramento de obras com IA", url: "nexusbrtech.com", desc: "Plataforma de monitoramento de obras com IA aplicada. Mapa por construção, controle de estoque por ponto e detecção visual no canteiro. Incubada no CEI-UFRGS.", tags: ["IA aplicada", "Incubada CEI-UFRGS", "Mapa em tempo real"] },
    ],
  },
  stack: {
    eyebrow: "// 06 — tech stack",
    h2a: "Ferramenta", h2b: "não é fé.",
    desc1: "Escolho a stack pelo problema do cliente, não pelo gosto do dev.",
    desc2: "Mas, em geral, é por aqui:",
  },
  about: {
    eyebrow: "// 07 — sobre",
    sub: "NICOLLAS FREITAS · POA",
    h3a: "Engenheiro que", h3b: "programa.",
    bio1a: "Estudante de Ciência da Computação na ", bio1b: "Unisinos + UERGS", bio1c: ", dev fullstack, ex-estagiário da ", bio1d: "Polícia Federal em perícia digital", bio1e: ".",
    bio2: "Hoje atendo PMEs e negócios locais do Brasil inteiro como dev solo. Foco em entregar coisa que entra em produção e gera dinheiro — não vitrine de portfólio.",
    a1h1: "3º", a1h2: "nacional", a1d: "iTwin4Good BR",
    a2h1: "Startup", a2h2: "incubada", a2d: "CEI-UFRGS",
    a3h1: "Perícia", a3h2: "digital", a3d: "Polícia Federal",
  },
  faq: {
    eyebrow: "// 08 — perguntas frequentes",
    h2a: "Antes de", h2b: "marcar call.",
    list: [
      { q: "Qual o prazo médio para um site?",                   a: "Landing page: 3–10 dias. Site institucional: 7–21 dias. Sistema custom: a partir de 20 dias. Te mando cronograma com marcos antes de começar." },
      { q: "Você faz manutenção após a entrega?",                a: "Sim. Cobro mensal por SLA (correções, pequenas evoluções, monitoramento) ou por hora avulsa. Você escolhe." },
      { q: "Preciso ter domínio e hospedagem?",                  a: "Não precisa ter — eu cuido da configuração. Se já tiver, ótimo, migramos. Se não tiver, te ajudo a comprar com nota fiscal e tudo." },
      { q: "Atende fora do RS?",                                 a: "Sim. Trabalho com clientes do Brasil inteiro 100% remoto. Reuniões por Meet/Zoom e entregas semanais." },
      { q: "Como funciona o pagamento?",                         a: "50% no início + 50% na entrega para projetos curtos. Em projetos longos, divido em marcos. PIX, boleto ou cartão (com taxa)." },
      { q: "O que é automação n8n?",                             a: "n8n é uma ferramenta que conecta seus sistemas (CRM, e-mail, planilha, WhatsApp, ERP) num fluxo único. Ex.: cliente preenche formulário → entra no CRM → dispara e-mail → cria proposta. Tira gente de tarefa repetitiva." },
      { q: "Diferença entre landing page e site institucional?", a: "Landing page é uma página focada em UMA conversão (lead, venda, agendamento). Site institucional tem várias páginas (home, sobre, serviços, blog, contato) e existe para presença de marca + SEO." },
    ],
  },
  finalCta: {
    eyebrow: "// começar agora",
    h2a: "Pronto para", h2b: "transformar", h2c: "seu negócio?",
    lead: "Me conta o seu problema. Em 5 minutos te digo o melhor caminho.",
    cta1: 'Manda "projeto" no direct →', cta2: "Chamar no WhatsApp",
    ig: 'DM com a palavra "PROJETO"',
  },
  contact: {
    eyebrow: "// 09 — contato",
    h2a: "Bora", h2b: "conversar.",
    desc: "Escolhe o canal que você usa mais. Em geral respondo em até 24h, dias úteis.",
    cards: [
      { k: "WhatsApp",  v: "Abrir conversa",          sub: "Resposta < 24h",      hint: "abrir conversa →",  href: "https://wa.me/555193484339?text=Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar." },
      { k: "Instagram", v: "@dev_mitolenda",           sub: "DM com 'projeto'",    hint: "abrir perfil →",    href: "https://instagram.com/dev_mitolenda" },
      { k: "E-mail",    v: "devmitolenda@gmail.com",   tech: 1, sub: "Briefing detalhado", hint: "compor email →",    href: "mailto:devmitolenda@gmail.com" },
      { k: "LinkedIn",  v: "in/nicollasde",            tech: 1, sub: "Perfil profissional", hint: "abrir linkedin →", href: "https://linkedin.com/in/nicollasde" },
    ],
  },
  footer: {
    inicio: "início", servicos: "serviços", projetos: "projetos",
    sobre: "sobre", faq: "faq", contato: "contato",
  },
};
