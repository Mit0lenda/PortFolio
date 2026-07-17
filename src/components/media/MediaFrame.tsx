import React from "react";
import Image, { type StaticImageData } from "next/image";
import type { ProjectAspectRatio } from "../../lib/types";

const ASPECT_CSS: Record<ProjectAspectRatio, string> = {
  landscape: "4/3",
  portrait: "3/4",
  square: "1/1",
  wide: "16/9",
};

type MediaFrameProps = {
  src: string | StaticImageData;
  alt: string;
  caption?: string;
  aspectRatio?: ProjectAspectRatio;
  /** "editorial" = alto contraste P&B, para fotos humanas. "color" = como está, para telas de produto. */
  treatment?: "color" | "editorial";
  /** true = object-fit: contain (fotos de objeto, ex. troféu, que não podem cortar). */
  contain?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Moldura de imagem consistente do design system: borda reta (sem radius),
 * aspect-ratio fixo (evita CLS) e legenda técnica opcional no rodapé, no
 * mesmo estilo mono/uppercase dos eyebrows do resto do site.
 */
export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  caption,
  aspectRatio = "landscape",
  treatment = "color",
  contain = false,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
  className = "",
}) => {
  return (
    <figure className={`media-frame ${className}`}>
      <div className="media-frame-shot" style={{ aspectRatio: ASPECT_CSS[aspectRatio], position: "relative" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={treatment === "editorial" ? "media-frame-editorial" : ""}
          style={{ objectFit: contain ? "contain" : "cover" }}
        />
      </div>
      {caption && <figcaption className="media-frame-caption">{caption}</figcaption>}
    </figure>
  );
};
