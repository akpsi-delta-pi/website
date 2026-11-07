import { Linkedin } from "lucide-react";

type Props = {
  url: string;
  name: string;
  /** Visible text next to the icon. Without it, only the icon shows. */
  label?: string;
  className?: string;
};

/** Link to a LinkedIn profile. Renders nothing when the URL is empty. */
export function LinkedInLink({ url, name, label, className = "" }: Props) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? undefined : `${name} on LinkedIn`}
      className={`inline-flex items-center gap-2 transition-colors hover:text-gold ${className}`}
    >
      <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
}
