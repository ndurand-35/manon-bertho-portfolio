import React from "react";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";

type Slide = { full: string; preview: string; alt: string };

// Les images rendues par <Img> portent data-zoom-src (l'original). Un seul écouteur
// sur le document ouvre la visionneuse : pas besoin de modifier chaque bloc.
// Une image dans un lien ou un bouton garde son comportement, sauf si ce dernier
// est marqué data-zoom-trigger (galerie accessible au clavier).
const MIN_WIDTH = 48;

const isZoomable = (img: HTMLImageElement) =>
  img.clientWidth >= MIN_WIDTH &&
  (!!img.closest("[data-zoom-trigger]") || !img.closest("a, button"));

const toSlide = (img: HTMLImageElement): Slide => ({
  full: img.dataset.zoomSrc!,
  preview: img.currentSrc || img.src,
  alt: img.alt,
});

export const Lightbox = () => {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [index, setIndex] = React.useState<number | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const touchX = React.useRef<number | null>(null);

  const isOpen = index !== null;
  const count = slides.length;
  const slide = isOpen ? slides[index] : null;

  const close = React.useCallback(() => setIndex(null), []);
  const go = React.useCallback(
    (step: number) =>
      setIndex((i) => (i === null ? i : (i + step + count) % count)),
    [count]
  );

  // Ouverture au clic sur une image.
  React.useEffect(() => {
    // Dans l'éditeur Tina (iframe), le clic sert à sélectionner le champ.
    if (window.self !== window.top) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const target = e.target as Element;
      const trigger = target.closest("[data-zoom-trigger]");
      const img = (
        trigger
          ? trigger.querySelector("img[data-zoom-src]")
          : target.closest("img[data-zoom-src]")
      ) as HTMLImageElement | null;
      if (!img || !isZoomable(img)) return;
      e.preventDefault();

      const all = Array.from(
        document.querySelectorAll<HTMLImageElement>("img[data-zoom-src]")
      ).filter(isZoomable);
      returnFocus.current = (trigger as HTMLElement) ?? null;
      setSlides(all.map(toSlide));
      setIndex(Math.max(0, all.indexOf(img)));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Clavier, scroll bloqué et focus pendant l'ouverture.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus();
    };
  }, [isOpen, close, go]);

  React.useEffect(() => setLoaded(false), [slide?.full]);

  if (!slide) return null;

  const navButton =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-dropdown-in motion-reduce:animate-none"
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (count > 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Aperçu optimisé affiché immédiatement, l'original le recouvre une fois chargé. */}
      <div
        className="relative flex h-full w-full items-center justify-center p-4 md:p-12"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <img
          key={`preview-${slide.full}`}
          src={slide.preview}
          alt=""
          aria-hidden
          className="max-h-full max-w-full object-contain"
        />
        <img
          key={slide.full}
          src={slide.full}
          alt={slide.alt}
          onLoad={() => setLoaded(true)}
          className={`absolute max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] object-contain transition-opacity duration-300 md:max-h-[calc(100%-6rem)] md:max-w-[calc(100%-6rem)] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {!loaded && (
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 h-6 w-6 -translate-x-1/2 animate-spin rounded-full border-2 border-white/30 border-t-white"
          aria-label="Chargement de la photo en haute qualité"
        />
      )}

      {count > 1 && (
        <>
          <p className="absolute top-5 left-5 text-sm text-white/80" aria-live="polite">
            {index + 1} / {count}
          </p>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={() => go(-1)}
            className={`${navButton} left-2 md:left-4`}
          >
            <HiChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={() => go(1)}
            className={`${navButton} right-2 md:right-4`}
          >
            <HiChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <button
        ref={closeRef}
        type="button"
        aria-label="Fermer"
        onClick={close}
        className="absolute top-3 right-3 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <HiX className="h-6 w-6" />
      </button>
    </div>
  );
};
