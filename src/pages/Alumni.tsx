import { ProfileCard } from "../components/ProfileCard";
import { MemberPhoto } from "../components/MemberPhoto";
import { PageHeader, RosterUnavailable, Skeleton } from "../components/ui";
import { site } from "../config";
import type { Member } from "../members/members";
import { useRoster } from "../members/useMembers";

const contactUrl = site.contactEmail ? `mailto:${site.contactEmail}` : site.instagramUrl;

export function Alumni() {
  const state = useRoster();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-28">
      <PageHeader
        title="Our Alumni"
        intro="Our alumni carry what they learned in Alpha Kappa Psi into companies and industries across the country."
      />

      {state.status === "error" ? (
        <RosterUnavailable />
      ) : state.status === "ready" && state.roster.alumni.length === 0 ? (
        <p className="text-center text-gray-600">Alumni profiles are coming soon.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {state.status === "loading"
            ? Array.from({ length: 4 }, (_, i) => (
                <li key={i}>
                  <Skeleton className="h-40 w-full" />
                </li>
              ))
            : state.roster.alumni.map((member) => (
                <li key={member.id}>
                  <AlumniCard member={member} />
                </li>
              ))}
        </ul>
      )}

      {contactUrl && (
        <section className="mt-16 rounded bg-cream p-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-navy">Stay Connected</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
            Alumni, we'd love to hear from you about mentorship, recruiting and chapter events.
          </p>
          <a
            href={contactUrl}
            target={site.contactEmail ? undefined : "_blank"}
            rel={site.contactEmail ? undefined : "noopener noreferrer"}
            className="inline-block rounded bg-navy px-10 py-3 font-semibold tracking-wide text-white transition hover:bg-gold"
          >
            GET IN TOUCH
          </a>
        </section>
      )}
    </main>
  );
}

function AlumniCard({ member }: { member: Member }) {
  return (
    <ProfileCard
      name={member.name}
      linkedinUrl={member.linkedinUrl}
      className="h-full overflow-hidden rounded border border-gray-200 shadow-sm transition hover:border-gold hover:shadow-md"
    >
      <div className="flex items-start gap-5 p-6 pr-12">
        <MemberPhoto
          name={member.name}
          photoUrl={member.photoUrl}
          className="h-24 w-24 shrink-0 rounded-full sm:h-28 sm:w-28"
          initialsClassName="text-xl"
        />
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-xl font-bold text-navy">{member.name}</h3>
          {member.position && <p className="mb-1 font-semibold text-gray-700">{member.position}</p>}
          {member.company && <p className="mb-3 font-medium text-gray-600">{member.company}</p>}
          {member.major && (
            <p className="text-sm text-gray-700">
              <span className="text-gray-500">Major:</span> {member.major}
            </p>
          )}
          {member.minor && (
            <p className="text-sm text-gray-700">
              <span className="text-gray-500">Minor:</span> {member.minor}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            {member.industry && <span className="rounded bg-navy px-3 py-1 text-white">{member.industry}</span>}
            {member.classYear && (
              <span className="rounded border border-gray-300 bg-cream px-3 py-1 text-gray-600">
                Class of {member.classYear}
              </span>
            )}
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}