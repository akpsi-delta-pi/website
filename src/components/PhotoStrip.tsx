import { galleryCredit, galleryPhotos } from "../content";

/**
 * A strip of photos that scrolls slowly across the screen and loops forever.
 * It pauses on hover, and for visitors who turned on "reduce motion" it becomes
 * a strip they can swipe or scroll through instead.
 */
export function PhotoStrip() {
  if (galleryPhotos.length === 0) return null;

  // About 6 seconds per photo, so the speed feels the same however many photos there are.
  const duration = `${Math.max(galleryPhotos.length * 6, 20)}s`;

  return (
    <section className="mb-16" aria-label="Chapter photos">
      <div className="overflow-hidden rounded motion-reduce:overflow-x-auto">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: duration }}
        >
          {[0, 1].map((copy) => (
            // The photos are listed twice so the loop has no gap; the second copy is hidden from screen readers.
            <ul
              key={copy}
              className={`flex shrink-0 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
              aria-hidden={copy === 1}
            >
              {galleryPhotos.map((photo) => (
                <li key={photo.src} className="shrink-0 pr-4">
                  <img
                    src={`${import.meta.env.BASE_URL}${photo.src.replace(/^\/+/, "")}`}
                    alt={copy === 1 ? "" : photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-auto rounded object-cover shadow-lg sm:h-72"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {galleryCredit && <p className="mt-3 text-right text-sm text-white/70">{galleryCredit}</p>}
    </section>
  );
}
