import type { Project } from "../lib/types";
import atlasCover from "../assets/projects/project-atlas/propostas.png";
import atlasConsultas from "../assets/projects/project-atlas/consultas.png";
import atlasFuncionalidades from "../assets/projects/project-atlas/funcionabilidades.png";
import havenCover from "../assets/projects/project-haven-link/trofeu.png";
import havenAi from "../assets/projects/project-haven-link/ia.png";
import haven3d from "../assets/projects/project-haven-link/3d.png";
import nexusCover from "../assets/projects/project-nexus/mapa.png";
import nexusLogin from "../assets/projects/project-nexus/login.png";
import nexusTime from "../assets/projects/project-nexus/time.png";

export const projects: Project[] = [
  {
    slug: "project-haven-link",
    title: {
      en: "Project Haven Link",
      pt: "Project Haven Link",
    },
    image: {
      src: havenCover,
      alt: {
        en: "Achievement screen for Project Haven Link.",
        pt: "Tela de conquista do Project Haven Link.",
      },
    },
    images: [
      {
        src: havenCover,
        alt: {
          en: "Achievement screen for Project Haven Link.",
          pt: "Tela de conquista do Project Haven Link.",
        },
      },
      {
        src: havenAi,
        alt: {
          en: "AI recognition view for Project Haven Link.",
          pt: "Tela de reconhecimento com IA do Project Haven Link.",
        },
      },
      {
        src: haven3d,
        alt: {
          en: "3D visualization view for Project Haven Link.",
          pt: "Visualização 3D do Project Haven Link.",
        },
      },
    ],
    summary: {
      en: "AI logistics tool for item recognition and inventory tracking during emergencies.",
      pt: "Ferramenta logística com IA para reconhecimento de itens e controle de inventário em emergências.",
    },
    context: {
      en: "Built during the Rio Grande do Sul catastrophe to map shortages and speed mobilization.",
      pt: "Criado durante a catástrofe no RS para mapear faltas e acelerar a mobilização.",
    },
    role: {
      en: "Delivered camera recognition and inventory mapping modules.",
      pt: "Entreguei funcionalidades de reconhecimento por câmera e mapeamento de inventário.",
    },
    stack: ["AI", "Computer Vision", "Inventory", "Logistics"],
    decision: {
      en: "Adopted camera-based recognition to reduce human error and accelerate identification.",
      pt: "Adotei reconhecimento por câmera para reduzir erro humano e acelerar identificação.",
    },
    outcome: {
      en: "Won 3rd place in the iTwin Brasil competition and delivered actionable logistics data.",
      pt: "3º lugar na competição iTwin Brasil e dados acionáveis para decisões em momento logístico crítico.",
    },
    impact: 0,
  },
  {
    slug: "project-nexus",
    title: {
      en: "Project Nexus",
      pt: "Project Nexus",
    },
    image: {
      src: nexusCover,
      alt: {
        en: "Map view for Project Nexus.",
        pt: "Tela de mapa do Project Nexus.",
      },
    },
    images: [
      {
        src: nexusCover,
        alt: {
          en: "Map view for Project Nexus.",
          pt: "Tela de mapa do Project Nexus.",
        },
      },
      {
        src: nexusLogin,
        alt: {
          en: "Login screen for Project Nexus.",
          pt: "Tela de login do Project Nexus.",
        },
      },
      {
        src: nexusTime,
        alt: {
          en: "Team overview for Project Nexus.",
          pt: "Tela de equipe do Project Nexus.",
        },
      },
    ],
    summary: {
      en: "Construction logistics platform combining maps, camera feeds, and AI.",
      pt: "Plataforma de logística para obras que combina mapas, feeds de câmera e IA.",
    },
    context: {
      en: "Startup incubated at CEI/UFRGS to orchestrate construction site logistics.",
      pt: "Startup incubada no CEI/UFRGS para orquestrar a logística de obras.",
    },
    role: {
      en: "Fullstack ownership, UI/UX validation, agile delivery, and pitching.",
      pt: "Fullstack, validação de UI/UX, entrega ágil e pitching.",
    },
    stack: ["React", "Node.js", "MySQL", "Azure", "AI"],
    decision: {
      en: "Fused map visualization with camera feeds and recognition models.",
      pt: "Combinei visualização por mapa com feeds de câmera e modelos de reconhecimento.",
    },
    outcome: {
      en: "Project in progress since 2024 with ongoing iteration.",
      pt: "Projeto em andamento desde 2024, com iterações contínuas.",
    },
    impact: 0,
  },
  {
    slug: "project-atlas",
    title: {
      en: "Project Atlas",
      pt: "Project Atlas",
    },
    image: {
      src: atlasCover,
      alt: {
        en: "Proposal flow screen for Project Atlas.",
        pt: "Tela de propostas do Project Atlas.",
      },
    },
    images: [
      {
        src: atlasCover,
        alt: {
          en: "Proposal flow screen for Project Atlas.",
          pt: "Tela de propostas do Project Atlas.",
        },
      },
      {
        src: atlasConsultas,
        alt: {
          en: "Consulta screen for Project Atlas.",
          pt: "Tela de consultas do Project Atlas.",
        },
      },
      {
        src: atlasFuncionalidades,
        alt: {
          en: "Features screen for Project Atlas.",
          pt: "Tela de funcionalidades do Project Atlas.",
        },
      },
    ],
    summary: {
      en: "Internal FGTS advance platform with secure auth and banking connectors.",
      pt: "Plataforma interna de antecipação de FGTS com autenticação segura e integrações bancárias.",
    },
    context: {
      en: "Flow demanded tight authentication and banking integration to cut support delays.",
      pt: "Fluxo exigia controle rigoroso de acesso e integração bancária para reduzir atrasos.",
    },
    role: {
      en: "Led frontend and backend delivery, owning the secure auth and banking API integration.",
      pt: "Liderei front e back com foco em autenticação segura e integração com API bancária.",
    },
    stack: ["React", "Node.js", "MySQL", "JWT", "OAuth2"],
    decision: {
      en: "Chosen JWT and OAuth2 to lock down access and call the banking API safely.",
      pt: "Optei por JWT e OAuth2 para blindar o acesso e conversar com o banco com segurança.",
    },
    outcome: {
      en: "Cut service time ~70% and onboarded 100+ clients in the first two months.",
      pt: "Cortou cerca de 70% do tempo de atendimento e atendeu 100+ clientes nos dois primeiros meses.",
    },
    impact: 70,
  },
];
