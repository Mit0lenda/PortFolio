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
      en: "Elevator parts catalog with fast contact for nationwide maintenance teams.",
      pt: "Peças para elevadores com catálogo e contato rápido em todo o Brasil.",
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
      en: "Elevator maintenance and modernization with 15+ years of experience.",
      pt: "Manutenção e modernização de elevadores com 15+ anos de experiência.",
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
      en: "Personalized fitness coaching with training, diet, and daily WhatsApp support.",
      pt: "Consultoria fitness com treino, dieta e suporte diário no WhatsApp.",
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
      en: "Custom digital solutions: systems, apps, AI integrations, and dashboards.",
      pt: "Soluções digitais sob medida: sistemas, apps, IA e dashboards.",
    },
  },
];
