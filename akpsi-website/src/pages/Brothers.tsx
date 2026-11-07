import { LinkedInLink } from "../components/LinkedInLink";
import { MemberPhoto } from "../components/MemberPhoto";
import { PageHeader, RosterUnavailable, SectionHeading, Skeleton } from "../components/ui";
import type { Member } from "../members/members";
import { useRoster } from "../members/useMembers";

export function Brothers() {
  const state = useRoster();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-28">
      <PageHeader
        title="Our Brotherhood"
        intro="Meet the leaders and active members who make our chapter what it is."
      />

      {state.status === "error" ? (
        <RosterUnavailable />
      ) : (
        <>
          <section className="mb-20" aria-labelledby="exec-heading">
            <SectionHeading>
              <span id="exec-heading">Executive Board</span>
            </SectionHeading>

            <div className="mb-12 grid items-start gap-10 md:grid-cols-2">
              <PresidentialWelcome
                presidentName={state.status === "ready" ? state.roster.president?.name : undefined}
                loading={state.status === "loading"}
              />
              {state.status === "loading" ? (
                <Skeleton className="aspect-[3/4] w-full" />
              ) : (
                state.roster.president && <PresidentCard member={state.roster.president} />
              )}
            </div>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {state.status === "loading"
                ? Array.from({ length: 4 }, (_, i) => (
                    <li key={i}>
                      <Skeleton className="aspect-[3/4] w-full" />
                    </li>
                  ))
                : state.roster.execBoard.map((member) => (
                    <li key={member.id}>
                      <OfficerCard member={member} />
                    </li>
                  ))}
            </ul>
          </section>

          <section aria-labelledby="actives-heading">
            <SectionHeading>
              <span id="actives-heading">Active Brothers</span>
            </SectionHeading>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
              {state.status === "loading"
                ? Array.from({ length: 10 }, (_, i) => (
                    <li key={i}>
                      <Skeleton className="aspect-square w-full" />
                    </li>
                  ))
                : state.roster.actives.map((member) => (
                    <li key={member.id}>
                      <BrotherCard member={member} />
                    </li>
                  ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

function PresidentialWelcome({ presidentName, loading }: { presidentName?: string; loading: boolean }) {
  return (
    <div>
      <h3 className="mb-6 font-serif text-3xl font-bold text-navy">Presidential Welcome</h3>
      <div className="space-y-4 leading-relaxed text-gray-700">
        <p className="text-lg">Dear Prospective Members,</p>
        <p>
          On behalf of our chapter, I am honored to welcome you to Alpha Kappa Psi. As a professional
          business fraternity, we are committed to developing principled business leaders.
        </p>
        <p>
          Our brotherhood offers opportunities for professional development, networking with industry
          leaders and building lifelong relationships. Through our programs, you will gain the skills
          and connections to excel in your career.
        </p>
        <p>
          I invite you to explore what makes our chapter special and discover how Alpha Kappa Psi can
          shape your professional journey.
        </p>
        <p className="text-lg">
          Fraternally,
          <br />
          {loading ? (
            <Skeleton className="mt-1 inline-block h-5 w-32 align-middle" />
          ) : (
            <span className="font-serif font-semibold">{presidentName ?? "Chapter President"}</span>
          )}
        </p>
      </div>
    </div>
  );
}

function PresidentCard({ member }: { member: Member }) {
  return (
    <article className="overflow-hidden rounded border-2 border-gold shadow-lg">
      <MemberPhoto name={member.name} photoUrl={member.photoUrl} className="aspect-[3/4]" initialsClassName="text-6xl" />
      <div className="bg-navy p-8 text-white">
        <h3 className="mb-2 text-2xl font-bold">{member.name}</h3>
        <p className="mb-4 text-lg font-semibold text-gold">{member.role}</p>
        <LinkedInLink url={member.linkedinUrl} name={member.name} label="Connect on LinkedIn" />
      </div>
    </article>
  );
}

function OfficerCard({ member }: { member: Member }) {
  return (
    <article className="h-full overflow-hidden rounded border border-gray-200 shadow-sm transition-shadow hover:shadow-lg">
      <MemberPhoto name={member.name} photoUrl={member.photoUrl} className="aspect-[3/4]" initialsClassName="text-5xl" />
      <div className="p-5">
        <h3 className="mb-1 text-lg font-bold text-navy">{member.name}</h3>
        <p className="mb-3 text-sm font-semibold text-gold">{member.role}</p>
        <LinkedInLink url={member.linkedinUrl} name={member.name} label="LinkedIn" className="text-navy" />
      </div>
    </article>
  );
}

function BrotherCard({ member }: { member: Member }) {
  return (
    <article className="h-full overflow-hidden rounded border border-gray-200 text-center shadow-sm transition hover:border-gold hover:shadow-md">
      <MemberPhoto name={member.name} photoUrl={member.photoUrl} className="aspect-square" />
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-navy">{member.name}</h3>
        {member.classYear && <p className="mb-2 text-sm text-gray-600">Class of {member.classYear}</p>}
        {member.major && <p className="text-xs font-medium text-gray-700">{member.major}</p>}
        {member.minor && <p className="text-xs text-gray-500">Minor: {member.minor}</p>}
        <LinkedInLink url={member.linkedinUrl} name={member.name} className="mt-3 text-navy" />
      </div>
    </article>
  );
}
