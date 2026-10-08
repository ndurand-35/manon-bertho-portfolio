import React from "react";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";

type Slide = { full: string; preview: string; thumb: string; alt: string };

// Les images rendues par <Img> portent data-zoom-src (l'original). Un seul écouteur
// sur le document ouvre la visionneuse : pas besoin de modifier chaque bloc.
// Une image dans un lien ou un bouton garde son comportement, sauf si ce dernier
// est marqué data-zoom-trigger (galerie accessible au clavier).
const MIN_WIDTH = 48;

const isZoomable = (img: HTMLImageElement) =>
  img.clientWidth >= MIN_WIDTH &&
  (!!img.closest("[data-zoom-trigger]") || !img.closest("a, button"));

// La plus petite version du srcset (le manifeste les trie par largeur croissante).
const smallestSrc = (img: HTMLImageElement) =>
  img.getAttribute("srcset")?.split(",")[0].trim().split(/\s+/)[0] || img.src;

const toSlide = (img: HTMLImageElement): Slide => ({
  full: img.dataset.zoomSrc!,
  preview: img.currentSrc || img.src,
  thumb: smallestSrc(img),
  alt: img.alt,
});

export const Lightbox = () => {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [index, setIndex] = React.useState<number | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const touchX = React.useRef<number | null>(null);
  const activeThumb = React.useRef<HTMLButtonElement>(null);

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

  // Garde la vignette courante visible dans le bandeau.
  React.useEffect(() => {
    activeThumb.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  if (!slide) return null;

  const navButton =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 animate-dropdown-in motion-reduce:animate-none"
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => {
        // Le bandeau de vignettes défile au doigt : pas de changement de photo.
        const inThumbs = (e.target as Element).closest("[data-thumbs]");
        touchX.current = inThumbs ? null : e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (count > 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Aperçu optimisé affiché immédiatement, l'original le recouvre une fois chargé. */}
      <div
        className="relative flex min-h-0 w-full flex-1 items-center justify-center p-4 md:p-12"
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

      {count > 1 && (
        <>
          <div data-thumbs className="w-full shrink-0 overflow-x-auto">
            <div className="mx-auto flex w-max gap-2 px-4 pt-1 pb-4">
              {slides.map((s, i) => (
                <button
                  key={`${i}-${s.full}`}
                  ref={i === index ? activeThumb : undefined}
                  type="button"
                  aria-label={`Photo ${i + 1}${s.alt ? ` : ${s.alt}` : ""}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:h-16 md:w-16 ${
                    i === index
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={s.thumb}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
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
