/**
 * Config for the pinned scrollytelling sequence. Only the 3 flagship
 * projects with a real cover + gallery (Haven Link, Nexus, Atlas) qualify —
 * PromoCode and CRM Autônomo only have a FlowDiagram (no photo/screen) and
 * stay in the plain "Mais projetos" grid below this sequence.
 *
 * `mediaOrder` reorders each project's 3 real images (from PROJECT_ASSETS)
 * into an editorial imagem-principal → detalhe-do-sistema → prova sequence —
 * it does NOT change PROJECT_ASSETS itself, so the project detail page keeps
 * its own cover/gallery order.
 */
import type { ProjectMedia } from "../../../lib/types";

export type ScrollProjectId = "haven-link" | "nexus" | "atlas";

/**
 * Atlas is discontinued and no real screenshots remain worth showing here
 * (client's call — cliente disse "não tenho fotos deles mais mas essas são
 * feias"). Uses a plain on-brand placeholder instead of the real (but ugly)
 * captures still referenced by PROJECT_ASSETS for the /projects/atlas detail
 * page — scoped override, doesn't touch the shared asset data.
 */
export const ATLAS_PLACEHOLDER_MEDIA: [ProjectMedia, ProjectMedia, ProjectMedia] = [
  { src: "/assets/placeholder-atlas.svg", alt: "Atlas (imagem principal) — sistema descontinuado, sem captura disponível", type: "diagram" },
  { src: "/assets/placeholder-atlas.svg", alt: "Atlas (detalhe do sistema) — sistema descontinuado, sem captura disponível", type: "diagram" },
  { src: "/assets/placeholder-atlas.svg", alt: "Atlas (prova) — sistema descontinuado, sem captura disponível", type: "diagram" },
];

export const SCROLL_PROJECT_IDS: ScrollProjectId[] = ["haven-link", "nexus", "atlas"];

export type MediaSlot = "cover" | "gallery0" | "gallery1";

export const SCROLL_PROJECT_CONFIG: Record<
  ScrollProjectId,
  {
    accent: "orange" | "blue";
    /** Which side the media column sits on — drives cut-transition direction. */
    side: "left" | "right";
    mediaOrder: [MediaSlot, MediaSlot, MediaSlot];
  }
> = {
  // troféu como imagem principal (pedido explícito do cliente após ver o
  // resultado) → operação/dev → sistema/coordenação como prova
  "haven-link": { accent: "orange", side: "left", mediaOrder: ["cover", "gallery1", "gallery0"] },
  // grade invertida: mídia à direita, texto à esquerda
  nexus: { accent: "blue", side: "right", mediaOrder: ["cover", "gallery0", "gallery1"] },
  // volta à composição inicial (mídia à esquerda, como Haven Link)
  atlas: { accent: "orange", side: "left", mediaOrder: ["cover", "gallery0", "gallery1"] },
};

/** Config única de duração — ajuste aqui após teste real (recomendado: 480–650). */
export const PIN_DURATION_VH = 550;

export const MEDIA_BEAT_LABEL = ["Imagem principal", "Detalhe do sistema", "Prova"] as const;
