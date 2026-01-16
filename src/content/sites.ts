import type { Site } from "../lib/types";
import codarynCover from "../assets/sites/codaryn/image.png";
import wisebodyCover from "../assets/sites/wisebody/image.png";
import multipartselevadoresCover from "../assets/sites/multipartselevadores/image.png";
import engiproCover from "../assets/sites/engipro/image.png";

export const sites: Site[] = [
  {
    name: "MultiParts Elevadores",
    url: "https://www.multipartselevadores.com.br/",
    image: {
      src: multipartselevadoresCover,
      alt: {
        en: "Homepage preview for MultiParts Elevadores.",
        pt: "Preview da homepage da MultiParts Elevadores.",
      },
    },
    description: {
      en: "Elevator parts company serving maintenance teams nationwide with catalog access and fast contact.",
      pt: "Empresa de peças para elevadores que atende o Brasil todo com catálogo, contato rápido e integrações.",
    },
  },
  {
    name: "Engipro",
    url: "https://engipro.com.br/",
    image: {
      src: engiproCover,
      alt: {
        en: "Homepage preview for Engipro.",
        pt: "Preview da homepage da Engipro.",
      },
    },
    description: {
      en: "Elevator company with 15+ years in maintenance, modernization, and accessibility platforms.",
      pt: "Empresa de elevadores com 15+ anos em manutenção, modernização e plataformas de acessibilidade.",
    },
  },
  {
    name: "Wisebody",
    url: "https://wisebody.com.br/",
    image: {
      src: wisebodyCover,
      alt: {
        en: "Homepage preview for Wisebody.",
        pt: "Preview da homepage da Wisebody.",
      },
    },
    description: {
      en: "Personalized fitness coaching with training, nutrition plan, and daily WhatsApp support.",
      pt: "Consultoria fitness personalizada com treino, dieta e suporte diário via WhatsApp.",
    },
  },
  {
    name: "Codaryn",
    url: "https://codaryn.com/",
    image: {
      src: codarynCover,
      alt: {
        en: "Homepage preview for Codaryn.",
        pt: "Preview da homepage da Codaryn.",
      },
    },
    description: {
      en: "Custom digital solutions: web systems, CRMs, ERPs, apps, AI integrations, and dashboards.",
      pt: "Soluções digitais sob medida: sistemas web, CRMs, ERPs, apps, IA e dashboards.",
    },
  },
];
