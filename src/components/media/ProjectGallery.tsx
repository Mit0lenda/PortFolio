import React from "react";
import { MediaFrame } from "./MediaFrame";
import type { ProjectMedia } from "../../lib/types";

/**
 * Grid de telas/fotos reais do projeto. Cada imagem já vem com sua
 * própria `aspectRatio`/`type` do content — composição intencional por
 * imagem, não um grid uniforme repetido.
 */
export const ProjectGallery: React.FC<{ images: ProjectMedia[] }> = ({ images }) => {
  if (images.length === 0) return null;

  return (
    <div className="case-gallery">
      {images.map((img) => (
        <MediaFrame
          key={img.src}
          src={img.src}
          alt={img.alt}
          caption={img.caption}
          aspectRatio={img.aspectRatio ?? "landscape"}
          contain={img.type === "photo"}
        />
      ))}
    </div>
  );
};
