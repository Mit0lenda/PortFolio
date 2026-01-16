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
      pt: "Ferramenta log¡stica com IA para reconhecimento de itens e controle de invent rio em emergˆncias.",
    },
    context: {
      en: "Built during the Rio Grande do Sul catastrophe to map shortages and speed mobilization.",
      pt: "Criado durante a cat strofe no RS para mapear faltas e acelerar a mobiliza‡Æo.",
    },
    role: {
      en: "Delivered camera recognition and inventory mapping modules.",
      pt: "Entreguei funcionalidades de reconhecimento por cƒmera e mapeamento de invent rio.",
    },
    stack: ["AI", "Computer Vision", "Inventory", "Logistics"],
    decision: {
      en: "Adopted camera-based recognition to reduce human error and accelerate identification.",
      pt: "Adotei reconhecimento por cƒmera para reduzir erro humano e acelerar identifica‡Æo.",
    },
    outcome: {
      en: "Won 3rd place in the iTwin Brasil competition and delivered actionable logistics data.",
      pt: "3§ lugar na competi‡Æo iTwin Brasil e dados acion veis para decisäes em momento log¡stico cr¡tico.",
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
      pt: "Plataforma de log¡stica para obras que combina mapas, feeds de cƒmera e IA.",
    },
    context: {
      en: "Startup incubated at CEI/UFRGS to orchestrate construction site logistics.",
      pt: "Startup incubada no CEI/UFRGS para orquestrar a log¡stica de obras.",
    },
    role: {
      en: "Fullstack ownership, UI/UX validation,  gile delivery, and pitching.",
      pt: "Fullstack, valida‡Æo de UI/UX, entrega  gil e pitching.",
    },
    stack: ["React", "Node.js", "MySQL", "Azure", "AI"],
    decision: {
      en: "Fused map visualization with camera feeds and recognition models.",
      pt: "Combinei visualiza‡Æo por mapa com feeds de cƒmera e modelos de reconhecimento.",
    },
    outcome: {
      en: "Project in progress since 2024 with ongoing iteration.",
      pt: "Projeto em andamento desde 2024, com itera‡äes cont¡nuas.",
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
      pt: "Plataforma interna de antecipa‡Æo de FGTS com autentica‡Æo segura e integra‡äes banc rias.",
    },
    context: {
      en: "Flow demanded tight authentication and banking integration to cut support delays.",
      pt: "Fluxo exigia controle rigoroso de acesso e integra‡Æo banc ria para reduzir atrasos.",
    },
    role: {
      en: "Led frontend and backend delivery, owning the secure auth and banking API integration.",
      pt: "Liderei front e back com foco em autentica‡Æo segura e integra‡Æo com API banc ria.",
    },
    stack: ["React", "Node.js", "MySQL", "JWT", "OAuth2"],
    decision: {
      en: "Chosen JWT and OAuth2 to lock down access and call the banking API safely.",
      pt: "Optei por JWT e OAuth2 para blindar o acesso e conversar com o banco com seguran‡a.",
    },
    outcome: {
      en: "Cut service time ~70% and onboarded 100+ clients in the first two months.",
      pt: "Cortou cerca de 70% do tempo de atendimento e atendeu 100+ clientes nos dois primeiros meses.",
    },
    impact: 70,
  },
];
