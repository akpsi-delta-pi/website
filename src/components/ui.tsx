import type { ReactNode } from "react";

/** Large centered title used at the top of each inner page. */
export function PageHeader({ title, intro, image }: { title: string; intro?: string; image?: string }) {
  return (
    <header className="mb-16 text-center">
      <h1 className="mb-4 font-serif text-5xl font-bold text-navy">{title}</h1>
      {intro && <p className="mx-auto max-w-3xl text-lg text-gray-600">{intro}</p>}
      {image && <img src={image} alt="" className="mt-10 h-56 w-full rounded object-cover shadow-lg md:h-80" />}
    </header>
  );
}

/** Section title with the short gold underline. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-2 font-serif text-4xl font-bold text-navy">{children}</h2>
      <div className="h-1 w-24 bg-gold" />
    </div>
  );
}

/** Shown in place of member cards when the roster can't be loaded. */
export function RosterUnavailable() {
  return (
    <p role="status" className="rounded bg-cream px-6 py-10 text-center text-gray-600">
      Member profiles are temporarily unavailable. Please check back soon.
    </p>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} aria-hidden="true" />;
}
