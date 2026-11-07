import { Link } from "react-router";
import { site } from "../config";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Brothers", to: "/members" },
  { label: "Rush", to: "/rush" },
  { label: "Alumni", to: "/alumni" },
];

const socials = [
  { label: "Instagram", url: site.instagramUrl },
  { label: "LinkedIn", url: site.linkedinUrl },
].filter((s) => s.url);

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <p className="mb-4 font-serif text-2xl font-semibold text-navy">ΑΚΨ</p>
          <p className="leading-relaxed text-gray-600">
            The {site.chapterName} chapter of Alpha Kappa Psi at {site.university}. Building
            principled business leaders since 1904.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-lg font-semibold text-navy">Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-gray-600 transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-lg font-semibold text-navy">Connect With Us</h2>
          {site.contactEmail && (
            <a href={`mailto:${site.contactEmail}`} className="text-gray-600 hover:text-gold">
              {site.contactEmail}
            </a>
          )}
          <ul className="mt-4 flex gap-4">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-7xl border-t border-gray-200 pt-8 text-center text-gray-500">
        © {new Date().getFullYear()} Alpha Kappa Psi – {site.chapterName} Chapter
      </p>
    </footer>
  );
}
