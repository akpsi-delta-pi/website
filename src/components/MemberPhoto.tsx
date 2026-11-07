import { useState } from "react";
import { initials } from "../members/members";

type Props = {
  name: string;
  photoUrl: string;
  /** Tailwind classes for the box size/shape, e.g. "aspect-[3/4]" or "h-28 w-28 rounded-full". */
  className: string;
  initialsClassName?: string;
};

/** A member's photo, or their initials on navy when there's no photo or it fails to load. */
export function MemberPhoto({ name, photoUrl, className, initialsClassName = "text-3xl" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!photoUrl || failed) {
    return (
      <div className={`flex items-center justify-center bg-navy ${className}`} role="img" aria-label={name}>
        <span className={`select-none font-bold text-gold ${initialsClassName}`} aria-hidden="true">
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-gray-100 ${className}`}>
      <img
        src={photoUrl}
        alt={name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
