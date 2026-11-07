import type { ReactNode } from "react";
import { Linkedin } from "lucide-react";

type Props = {
  name: string;
  /** Verified LinkedIn URL, or "" for a plain, non-clickable card. */
  linkedinUrl: string;
  className?: string;
  children: ReactNode;
};

/**
 * A member card. When the member has a LinkedIn profile, the whole card links to it
 * and shows a LinkedIn overlay on hover or keyboard focus. A small badge in the
 * corner shows it's clickable on phones, where there's no hover.
 */
export function ProfileCard({ name, linkedinUrl, className = "", children }: Props) {
  if (!linkedinUrl) {
    return <article className={`relative ${className}`}>{children}</article>;
  }

  return (
    <a
      href={linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} on LinkedIn`}
      className={`group relative block ${className}`}
    >
      {children}
      <span className="sr-only"> – view on LinkedIn (opens in a new tab)</span>

      <span
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded bg-white/90 text-navy shadow transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0"
        aria-hidden="true"
      >
        <Linkedin className="h-4 w-4" />
      </span>

      <span
        className="absolute inset-0 z-20 flex items-center justify-center bg-navy/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-lg">
          <Linkedin className="h-9 w-9 text-navy" />
        </span>
      </span>
    </a>
  );
}