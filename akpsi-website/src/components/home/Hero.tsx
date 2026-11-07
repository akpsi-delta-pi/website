import { Link } from "react-router";
import { ArrowDown } from "lucide-react";
import campusPhoto from "../../assets/campus.jpg";
import { site } from "../../config";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden">
      <img src={campusPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy/75" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl">
          ALPHA KAPPA PSI
        </h1>
        <p className="mb-8 font-serif text-2xl font-semibold tracking-wider text-gold md:text-3xl lg:text-4xl">
          {site.chapterName.toUpperCase()}
        </p>
        <p className="mx-auto mb-12 max-w-2xl text-lg font-light tracking-wide text-white/90 md:text-xl">
          The oldest and largest co-ed professional business fraternity
        </p>
        <Link
          to="/rush"
          className="inline-block bg-gold px-12 py-4 font-semibold tracking-[0.1em] text-white transition hover:scale-105 hover:bg-gold-dark"
        >
          RUSH NOW
        </Link>
      </div>

      <ArrowDown
        className="absolute bottom-8 left-1/2 h-6 w-6 -translate-x-1/2 animate-bounce text-white/50"
        aria-hidden="true"
      />
    </section>
  );
}
