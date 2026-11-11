import { Calendar, Clock, MapPin, Megaphone, Target, Users } from "lucide-react";
import { rushEvents } from "../content";
import { site } from "../config";
import { PhotoStrip } from "../components/PhotoStrip";

const reasons = [
  {
    icon: Users,
    title: "Professional Network",
    text: "Connect with brothers and alumni working in finance, consulting, accounting and more.",
  },
  { icon: Target, title: "Career Development", text: "Resume workshops, interview prep and real connections." },
  { icon: Megaphone, title: "Lifelong Brotherhood", text: "Build lasting relationships with driven, like-minded people." },
];

export function Rush() {
  return (
    <main className="bg-gradient-to-br from-navy via-navy-light to-navy pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 text-center">
          {site.rushTerm && (
            <p className="mb-6 inline-block rounded bg-gold px-6 py-2 text-sm font-semibold tracking-widest text-white">
              {site.rushTerm.toUpperCase()} RUSH
            </p>
          )}
          <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-6xl">Join Alpha Kappa Psi</h1>
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-white/90">
            Rush is your chance to meet our brothers, see what we're about and become part of the legacy.
          </p>
        </header>

        <section className="mb-16 rounded bg-white p-10 shadow-lg">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold text-navy">Why Rush ΑΚΨ?</h2>
          <ul className="grid gap-8 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy">
                  <Icon className="h-8 w-8 text-gold" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-navy">{title}</h3>
                <p className="leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <PhotoStrip />

        <section className="mb-16">
          <h2 className="mb-10 text-center font-serif text-4xl font-bold text-white">Rush Schedule</h2>
          <ul className="space-y-6">
            {rushEvents.map((event) => (
              <li
                key={event.title}
                className="flex flex-col gap-6 rounded border-2 border-transparent bg-white p-8 shadow-lg transition hover:border-gold md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-navy">{event.title}</h3>
                  <p className="mb-4 leading-relaxed text-gray-600">{event.description}</p>
                  <dl className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                    <EventDetail icon={Calendar} label="Date" value={event.date} />
                    <EventDetail icon={Clock} label="Time" value={event.time} />
                    <EventDetail icon={MapPin} label="Location" value={event.location} />
                  </dl>
                </div>
                {event.rsvpUrl && (
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap rounded bg-navy px-8 py-3 text-center font-semibold tracking-wide text-white transition hover:bg-gold"
                  >
                    RSVP
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded border border-white/20 bg-white/10 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 font-serif text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Have questions about rush or Alpha Kappa Psi? Reach out to our recruitment team.
          </p>
          <a
            href={site.recruitmentEmail ? `mailto:${site.recruitmentEmail}` : site.instagramUrl}
            target={site.recruitmentEmail ? undefined : "_blank"}
            rel={site.recruitmentEmail ? undefined : "noopener noreferrer"}
            className="inline-block rounded bg-gold px-12 py-4 font-semibold tracking-[0.1em] text-white transition hover:bg-white hover:text-navy"
          >
            {site.recruitmentEmail ? "Contact Recruitment" : "Message Us on Instagram"}
          </a>
        </section>
      </div>
    </main>
  );
}

function EventDetail({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <dt>
        <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
