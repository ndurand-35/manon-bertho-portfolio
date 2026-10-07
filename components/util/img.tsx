import React from "react";
import manifest from "../../lib/image-manifest.json";

type ManifestEntry = {
  bytes: number;
  width: number;
  height: number;
  srcset: [number, string][];
};

const images = manifest as unknown as Record<string, ManifestEntry>;

// Une fois déployé, Tina Cloud renvoie les médias en
// https://assets.tina.io/<clientId>/<chemin> au lieu de /uploads/<chemin>.
const TINA_ASSETS = /^https:\/\/assets\.tina\.io\/[^/]+\//;

const lookup = (src?: string | null): ManifestEntry | undefined => {
  if (!src) return undefined;
  const local = src.replace(TINA_ASSETS, "/uploads/");
  try {
    return images[decodeURI(local)] ?? images[local];
  } catch {
    return images[local];
  }
};

/** URL de la plus grande version optimisée (fond CSS, Open Graph…), ou l'original. */
export const optimizedUrl = (src?: string | null): string | undefined => {
  const entry = lookup(src);
  return entry ? entry.srcset[entry.srcset.length - 1][1] : src ?? undefined;
};

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string | null;
  /** false : l'image ne s'ouvre pas dans la visionneuse (<Lightbox>). */
  zoom?: boolean;
};

/**
 * Remplace <img> : sert la version WebP générée par `npm run optimize-images`
 * quand elle existe, sinon l'original. `sizes` indique la largeur affichée.
 * Au clic, la visionneuse affiche l'original (data-zoom-src).
 */
export const Img = ({ src, sizes = "100vw", alt, zoom = true, ...rest }: ImgProps) => {
  const entry = lookup(src);
  // Les SVG sont des pictos ou logos : pas d'agrandissement.
  const zoomSrc = zoom && src && !/\.svg($|\?)/i.test(src) ? src : undefined;
  if (!entry) {
    return <img src={src ?? undefined} alt={alt ?? ""} data-zoom-src={zoomSrc} {...rest} />;
  }
  const largest = entry.srcset[entry.srcset.length - 1][1];
  return (
    <img
      src={largest}
      srcSet={entry.srcset.map(([w, url]) => `${url} ${w}w`).join(", ")}
      sizes={sizes}
      decoding="async"
      alt={alt ?? ""}
      data-zoom-src={zoomSrc}
      {...rest}
    />
  );
};
