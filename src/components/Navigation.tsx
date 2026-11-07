import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Brothers", to: "/members" },
  { label: "Rush", to: "/rush" },
  { label: "Resources", to: "/resources" },
  { label: "Alumni", to: "/alumni" },
];

const linkClass = (to: string) =>
  ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
      isActive && !to.includes("#") ? "text-gold" : "text-white"
    }`;

export function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu whenever the page changes.
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  const solid = scrolled || menuOpen || location.pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Main">
        <Link to="/" className="font-serif text-2xl tracking-wider text-white">
          ΑΚΨ<span className="sr-only"> – Alpha Kappa Psi home</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} end className={linkClass(link.to)}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="space-y-1 border-t border-white/10 px-6 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end
                className={(state) => `block py-2 ${linkClass(link.to)(state)}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
