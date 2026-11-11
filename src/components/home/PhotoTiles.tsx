import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { photoTiles, tileImage } from "../../content";

/** Two large photo tiles linking to the Brothers and Alumni pages. */
export function PhotoTiles() {
  return (
    <section className="bg-white px-6 py-24">
      <ul className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        {photoTiles.map((tile) => {
          const image = tileImage(tile.to);
          return (
            <li key={tile.title}>
              <Link
                to={tile.to}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded shadow-lg sm:aspect-[16/10]"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  // No photo yet: a navy background so the tile still looks finished.
                  <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" aria-hidden="true" />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10 transition-opacity duration-500 group-hover:opacity-80"
                  aria-hidden="true"
                />
                <div className="relative p-8 text-white">
                  <h2 className="mb-2 font-serif text-4xl font-bold md:text-5xl">{tile.title}</h2>
                  <p className="mb-4 text-lg text-white/90">{tile.text}</p>
                  <span className="inline-flex items-center gap-2 font-semibold tracking-wide text-gold">
                    LEARN MORE
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
