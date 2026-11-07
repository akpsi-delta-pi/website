import { Link } from "react-router";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <h1 className="mb-4 font-serif text-5xl font-bold text-navy">Page not found</h1>
      <p className="mb-8 text-lg text-gray-600">That page doesn't exist or has moved.</p>
      <Link to="/" className="rounded bg-navy px-8 py-3 font-semibold text-white transition hover:bg-gold">
        Back to home
      </Link>
    </main>
  );
}
