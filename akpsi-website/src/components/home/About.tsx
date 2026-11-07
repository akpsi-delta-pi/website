import { Link } from "react-router";
import campusPhoto from "../../assets/campus.jpg";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-8 font-serif text-5xl font-bold text-navy md:text-6xl">
            Building Leaders for Tomorrow
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Alpha Kappa Psi is a professional business fraternity dedicated to furthering the
              welfare of its members and fostering research in the fields of commerce, accounts and
              finance.
            </p>
            <p>
              Through professional development programs, networking and a commitment to academic
              excellence, we prepare our brothers for careers in business and beyond.
            </p>
            <p>
              Members gain access to internship opportunities, mentorship from alumni and leadership
              positions that build skills they use throughout their careers.
            </p>
          </div>
          <Link
            to="/members"
            className="mt-10 inline-block border-2 border-navy px-10 py-3 font-semibold tracking-wide text-navy transition hover:bg-navy hover:text-white"
          >
            MEET THE BROTHERS
          </Link>
        </div>

        <div className="relative">
          <img src={campusPhoto} alt="Creighton campus" loading="lazy" className="relative z-10 w-full shadow-2xl" />
          <div className="absolute -bottom-4 -right-4 h-full w-full border-4 border-gold" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
