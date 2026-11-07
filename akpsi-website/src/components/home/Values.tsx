import { BookOpen, Heart, Shield, Sparkles, Users } from "lucide-react";

const values = [
  { icon: Users, title: "Brotherhood", text: "Lifelong bonds forged through shared experiences and mutual respect." },
  { icon: BookOpen, title: "Knowledge", text: "Continuous learning and growth in business and leadership." },
  { icon: Shield, title: "Integrity", text: "A commitment to honesty, ethics and fairness in everything we do." },
  { icon: Heart, title: "Service", text: "Giving our time and talent back to the community." },
  { icon: Sparkles, title: "Unity", text: "Strength through collaboration and shared goals." },
];

export function Values() {
  return (
    <section className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold text-white md:text-6xl">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/80">
            The principles that guide our fraternity and shape our members
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="group text-center transition-transform duration-300 hover:scale-105">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold transition-colors group-hover:bg-white">
                <Icon className="h-10 w-10 text-white transition-colors group-hover:text-navy" aria-hidden="true" />
              </div>
              <h3 className="mb-4 font-serif text-xl font-semibold text-white">{title}</h3>
              <p className="font-light leading-relaxed text-white/70">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
