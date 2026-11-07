import { Briefcase, Network, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { benefits } from "../../content";

const icons: Record<string, LucideIcon> = {
  Community: Users,
  Leadership: Briefcase,
  Network: Network,
  Development: TrendingUp,
};

export function Benefits() {
  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold text-navy md:text-6xl">Benefits</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            What you gain as a brother of Alpha Kappa Psi
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = icons[benefit.title] ?? Users;
            return (
              <li
                key={benefit.title}
                className="overflow-hidden rounded bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {benefit.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${benefit.image.replace(/^\/+/, "")}`}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-navy" aria-hidden="true">
                    <Icon className="h-14 w-14 text-gold" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-navy">{benefit.title}</h3>
                  <p className="leading-relaxed text-gray-600">{benefit.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}