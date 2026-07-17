import type { Copy } from "../lib/types";

export const copyPt: Copy = {
  nav: {
    servicos: "Serviços", projetos: "Projetos", sites: "Sites",
    stack: "Stack", sobre: "Sobre", faq: "FAQ", cta: 'Falar comigo →',
  },
  hero: {
    eyebrow: "// Full-Stack Developer · Porto Alegre · Atende Brasil e exterior",
    h1a: "TRANSFORMO", h1b: "CÓDIGO EM", h1c: "RESULTADO REAL.",
    lead: "Sites, sistemas e automações para empresas que querem crescer sem contratar mais gente.",
    cta1: 'Manda "projeto" no direct →', cta2: "Chamar no WhatsApp",
    meta1: "DISPONÍVEL · MAIO 2026", meta2: "// PORTO ALEGRE — RS", meta3: "NICOLLAS FREITAS",
    badge1: "3º LUGAR NACIONAL", badge2: "iTwin4Good BR",
  },
  services: {
    eyebrow: "// 04 — serviços",
    h2a: "Sete frentes.", h2b: "Zero", h2c: "enrolação.",
    desc: "Preço e prazo na mesa antes da reunião. Sem orçamento misterioso.",
    kInvest: "Investimento", kPrazo: "Prazo",
    list: [
      { t: "Site Profissional",   d: "Institucional completo, performático, otimizado para SEO e conversão.",                 price: "R$ 2.500–8.000",   prazo: "7–21 dias",  slug: "criacao-de-sites" },
      { t: "Landing Page",        d: "Página única focada em conversão. Copy, design e código sob medida.",                   price: "R$ 1.500–5.000",   prazo: "3–10 dias",  slug: "landing-pages" },
      { t: "Automação n8n",       d: "Tira gente de planilha. Conecta CRM, e-mail, planilhas e APIs num só fluxo.",           price: "R$ 2.000–12.000",  prazo: "5–20 dias",  slug: "automacao-n8n" },
      { t: "Chatbot / IA",        d: "Atendimento 24/7 com modelo de linguagem treinado no seu negócio.",                     price: "R$ 2.500–15.000",  prazo: "7–25 dias",  slug: "chatbot-ia" },
      { t: "Sistema Web Custom",  d: "CRM, ERP leve, dashboards, área de cliente. Auth + banco + API + UI.",                  price: "R$ 8.000–30.000+", prazo: "20–90 dias", slug: "sistemas-web" },
      { t: "Integração de APIs",  d: "Conecta seus sistemas: ERP ↔ e-commerce, CRM ↔ marketing, banco ↔ relatório.",         price: "R$ 2.000–10.000",  prazo: "5–20 dias" },
      { t: "Consultoria Digital", d: "Sessão técnica para destravar projeto, escolher stack ou auditar código.",              price: "R$ 500–3.000",     prazo: "2–7 dias" },
    ],
  },
  servicePages: [
    {
      slug: "criacao-de-sites",
      serviceIndex: 0,
      metaTitle: "Criação de Sites Profissionais em Porto Alegre | Dev Mitolenda",
      metaDescription:
        "Site institucional rápido, otimizado para SEO e conversão, com prazo de 7 a 21 dias. Atendimento em Porto Alegre e 100% remoto para todo o Brasil.",
      h1: "Criação de Sites Profissionais",
      intro:
        "Site institucional completo, pensado para carregar rápido, aparecer no Google e converter visita em contato — não só existir no ar.",
      body: [
        "Desenvolvo em Next.js e React, com foco em performance (Core Web Vitals) e SEO técnico desde a primeira linha de código: metadados corretos, sitemap, dados estruturados e páginas rápidas o suficiente para o Google e para o visitante não desistir no carregamento.",
        "O escopo típico inclui home, sobre, serviços, projetos/portfólio e contato — com formulário funcional ou integração com WhatsApp. Design responsivo, testado em mobile e desktop, com copy revisada para conversão, não só estética.",
        "Processo: briefing com escopo e prazo fechados antes de começar, entregas semanais para acompanhamento, e handoff com domínio e hospedagem configurados no seu nome.",
      ],
    },
    {
      slug: "landing-pages",
      serviceIndex: 1,
      metaTitle: "Criação de Landing Pages de Alta Conversão | Dev Mitolenda",
      metaDescription:
        "Landing page focada em uma única conversão — lead, venda ou agendamento. Copy, design e código sob medida, entrega em 3 a 10 dias.",
      h1: "Landing Pages",
      intro:
        "Uma página, um objetivo: fazer o visitante agendar, comprar ou deixar contato. Sem distração, sem menu levando embora.",
      body: [
        "Landing page é diferente de site institucional: existe para UMA conversão específica — campanha de tráfego pago, lançamento, captação de leads ou agendamento. Estrutura, copy e CTA são desenhados em torno desse único objetivo.",
        "Trabalho a copy junto com o design: headline, prova social (quando existir), quebra de objeções e chamada para ação repetida nos pontos certos da rolagem. Código leve, carregamento rápido — decisivo para não perder tráfego pago por página lenta.",
        "Ideal para campanhas de Google Ads, Meta Ads ou lançamento de produto/serviço específico, com prazo curto de entrega.",
      ],
    },
    {
      slug: "automacao-n8n",
      serviceIndex: 2,
      metaTitle: "Automação de Processos com n8n em Porto Alegre | Dev Mitolenda",
      metaDescription:
        "Automação de processos com n8n: conecta CRM, e-mail, planilhas, WhatsApp e APIs num fluxo único. Tira gente de tarefa repetitiva.",
      h1: "Automação com n8n",
      intro:
        "Tira gente de planilha e de tarefa repetitiva. Conecto seus sistemas — CRM, e-mail, WhatsApp, planilhas e APIs — num fluxo único e automático.",
      body: [
        "n8n é uma ferramenta de automação de workflows: quando algo acontece num sistema (um formulário preenchido, um lead novo, um pagamento aprovado), o fluxo dispara ações automáticas em outro — cria registro no CRM, envia e-mail, atualiza planilha, notifica no WhatsApp.",
        "Uso essa mesma ferramenta em produção nos meus próprios projetos (como o motor de prospecção do CRM Autônomo), então o desenho do fluxo já nasce pensando em execução real, tratamento de erro e custo de API controlado — não só um diagrama bonito.",
        "Mapeio o processo atual com você, desenho o fluxo, testo com dados reais e entrego documentado, para seu time entender o que está automatizado e por quê.",
      ],
    },
    {
      slug: "chatbot-ia",
      serviceIndex: 3,
      metaTitle: "Chatbot com IA para Atendimento 24/7 | Dev Mitolenda",
      metaDescription:
        "Chatbot com modelo de linguagem treinado no seu negócio, atendimento 24/7 e handoff para humano quando necessário. Entrega em 7 a 25 dias.",
      h1: "Chatbot / IA",
      intro:
        "Atendimento 24/7 com um modelo de linguagem treinado no contexto do seu negócio — não um chatbot de árvore de decisão engessada.",
      body: [
        "Construo agentes de IA que entendem linguagem natural, mantêm contexto da conversa e consultam sua base de produtos, serviços ou FAQ para responder com precisão — usando LangChain, memória vetorial (RAG) e a plataforma de mensagens que seu negócio já usa (WhatsApp, Instagram, site).",
        "Sempre com a opção de handoff: a qualquer momento um humano do seu time pode assumir a conversa direto no inbox, sem o cliente perceber troca de canal.",
        "Escopo definido junto com você: que perguntas o agente responde, que ações ele pode tomar (agendar, orçar, encaminhar) e onde ele para e chama um humano.",
      ],
    },
    {
      slug: "sistemas-web",
      serviceIndex: 4,
      metaTitle: "Desenvolvimento de Sistemas Web Sob Medida | Dev Mitolenda",
      metaDescription:
        "Sistemas web customizados: CRM, ERP leve, dashboards e área de cliente. Autenticação, banco de dados, API e interface sob medida para o seu processo.",
      h1: "Sistema Web Custom",
      intro:
        "CRM, ERP leve, dashboard interno ou área de cliente — construído em torno do seu processo, não do processo genérico de uma ferramenta pronta.",
      body: [
        "Quando uma planilha ou uma ferramenta de prateleira já não dá conta do processo do seu negócio, construo um sistema web sob medida: autenticação, banco de dados, API e interface desenhados especificamente para o seu fluxo de trabalho.",
        "Stack típica: Next.js/React no frontend, Node.js/NestJS no backend, PostgreSQL ou Supabase como banco. Projeto entregue em etapas (marcos), com cada módulo testável antes de avançar para o próximo.",
        "Já entreguei sistemas desse porte em produção — CRM de propostas com agenda e relatórios, motor de prospecção automatizado — e sei que o risco maior nesse tipo de projeto é escopo mal definido, por isso o levantamento de requisitos é feito antes de qualquer linha de código.",
      ],
    },
  ],
  projects: {
    eyebrow: "// 02 — projetos destacados",
    h2a: "Código que", h2b: "vence.",
    desc: "Prêmio nacional. Startup incubada. Sistema em produção. Automação rodando sozinha.",
    labelProj: "PROJETO",
    list: [
      {
        id: "promocode", name: "PromoCode", tag: "Agente de IA · Consultor de compras no WhatsApp", trophy: "// MVP EM PRODUÇÃO · N8N + IA + SUPABASE",
        desc: "Consultor de compras via WhatsApp: entende orçamento, uso e urgência em linguagem natural, decide com um agente de IA (LangChain + ferramentas), lembra o histórico da conversa e aprende com cada recomendação via memória vetorial (RAG). Arquitetura: n8n orquestrando o agente, Chatwoot como inbox (dá pra assumir a conversa a qualquer momento), Supabase com pgvector para memória e Node.js para busca e ranking de produtos. Integração com marketplaces em andamento.",
        problem: "Cliente precisava de um consultor de compras que entendesse orçamento, uso e urgência em linguagem natural, direto no WhatsApp — sem formulário nem filtro manual.",
        solution: "Agente de IA (LangChain + ferramentas) que decide a recomendação, lembra o histórico da conversa e aprende com cada interação via memória vetorial (RAG). n8n orquestra o fluxo, Chatwoot funciona como inbox — dá pra assumir a conversa a qualquer momento — e Node.js cuida da busca e ranking de produtos. Integração com marketplaces em andamento.",
        tech: ["n8n", "LangChain", "Chatwoot", "Supabase", "pgvector", "Node.js"],
        role: "Dev solo · full-stack + IA",
        results: [
          { label: "Status", value: "MVP em produção" },
          { label: "Integração", value: "Em andamento", context: "marketplaces" },
        ],
      },
      {
        id: "haven-link", name: "Haven Link", tag: "IA · Logística emergencial", trophy: "🥉 3º LUGAR NACIONAL · iTwin4Good BR",
        desc: "Plataforma de IA para logística emergencial — coordena resgate em desastres, conectando voluntários, ONGs e órgãos públicos via mapa em tempo real. Premiada nacionalmente.",
        problem: "Coordenar resgate em situações de desastre exige conectar voluntários, ONGs e órgãos públicos rapidamente, com visibilidade em tempo real de quem está onde e o que precisa.",
        solution: "Plataforma de IA com mapa em tempo real que conecta voluntários, ONGs e órgãos públicos num único ponto de coordenação. Premiada nacionalmente (3º lugar, iTwin4Good BR).",
        results: [{ label: "Colocação", value: "3º lugar nacional", context: "iTwin4Good BR" }],
      },
      {
        id: "nexus", name: "Nexus", tag: "Startup · CEI-UFRGS", trophy: "🚀 INCUBADA · CEI-UFRGS",
        desc: "Plataforma de monitoramento de obras com IA aplicada. Mapa por construção, controle de estoque por ponto e detecção visual no canteiro. Hoje incubada no Centro de Empreendedorismo da UFRGS.",
        problem: "Construtoras precisam monitorar múltiplas obras ao mesmo tempo — estoque por ponto e o que está acontecendo no canteiro — sem depender só de relatório manual.",
        solution: "Plataforma com mapa por construção, controle de estoque por ponto e detecção visual no canteiro usando IA aplicada. Hoje incubada no Centro de Empreendedorismo da UFRGS.",
        tech: ["IA aplicada", "Detecção visual"],
        role: "Fullstack + IA · equipe de 4 (CEI-UFRGS)",
        results: [{ label: "Estágio", value: "Incubada", context: "CEI-UFRGS" }],
      },
      {
        id: "atlas", name: "Atlas", tag: "Sistema financeiro FGTS", trophy: "// DESCONTINUADO · FREELANCE",
        desc: "Sistema financeiro FGTS completo para uma equipe comercial. CRM de propostas, agenda, consultas em massa, exportação de relatórios.",
        problem: "Equipe comercial de FGTS precisava de um sistema próprio para gerenciar propostas, agenda e consultas em massa, sem depender de planilha ou ferramenta genérica.",
        solution: "Sistema financeiro completo: CRM de propostas, agenda integrada, consultas em massa e exportação de relatórios.",
        role: "Dev solo · full-stack",
        results: [{ label: "Status", value: "Descontinuado", context: "usado em produção pela equipe comercial" }],
      },
      {
        id: "crm-autonomo", name: "CRM Autônomo", tag: "Automação · Captação de leads", trophy: "// EM PRODUÇÃO · SISTEMA PRÓPRIO",
        desc: "Motor de prospecção que varre o mapa por categoria e cidade, identifica negócios sem site e cria oportunidade + tarefa de follow-up direto no CRM — sem clique manual, custo de API zero.",
        problem: "Prospecção manual de leads — buscar negócios sem site por categoria e cidade — consome tempo do time comercial e não escala.",
        solution: "Motor de prospecção automatizado que varre o mapa por categoria e cidade, identifica negócios sem site e cria oportunidade + tarefa de follow-up direto no CRM, sem clique manual e com custo de API zero.",
        role: "Dev solo · automação + scraping",
        results: [
          { label: "Automação", value: "100%", context: "zero clique manual" },
          { label: "Custo de API", value: "Zero" },
        ],
      },
    ],
    moreEyebrow: "// mais projetos",
    moreH2a: "Automação sem tela,",
    moreH2b: "resultado pra provar.",
  },
  sites: {
    eyebrow: "// 03 — sites entregues",
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
    proofEyebrow: "// credenciais",
    sub: "NICOLLAS FREITAS · POA",
    h3a: "Engenheiro que", h3b: "programa.",
    bio1a: "Estudante de Ciência da Computação na ", bio1b: "Unisinos + UERGS", bio1c: ", dev fullstack e ex-estagiário da ", bio1d: "Polícia Federal na área de perícia digital", bio1e: ".",
    bio2: "Hoje atendo PMEs e negócios locais do Brasil inteiro como dev solo. Foco em entregar coisa que entra em produção e gera dinheiro — não vitrine de portfólio.",
    a1h1: "3º", a1h2: "nacional", a1d: "iTwin4Good BR",
    a2h1: "Startup", a2h2: "incubada", a2d: "CEI-UFRGS",
    a3h1: "Perícia", a3h2: "digital", a3d: "Estágio · Polícia Federal",
  },
  certificates: {
    eyebrow: "// 08 — certificados",
    h2a: "Aprendendo", h2b: "sempre.",
    desc: "Certificações técnicas de cursos e plataformas reconhecidas.",
    kBadge: "Certificado", kDate: "Concluído", kDuration: "Duração", kId: "ID",
    list: [
      {
        provider: "Google Cloud",
        title: "Google SecOps Foundation",
        issuer: "ARKI1 · Latin America Training Partner of the Year",
        date: "9 jun 2026",
        duration: "3h",
        id: "P-SF+V+2026-06-09_8694088B",
      },
    ],
  },
  faq: {
    eyebrow: "// 09 — perguntas frequentes",
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
    eyebrow: "// 10 — contato",
    h2a: "Bora", h2b: "conversar.",
    desc: "Escolhe o canal que você usa mais. Em geral respondo em até 24h, dias úteis.",
    cards: [
      { k: "WhatsApp",  v: "+55 51 3199-9319",          sub: "Resposta < 24h",      hint: "abrir conversa →",  href: "https://wa.me/555131999319?text=Ol%C3%A1%21%20Quero%20fazer%20um%20projeto%21" },
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
