import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "../components/ui";
import { resources, type Resource } from "../content";

export function Resources() {
  return (
    <main className="min-h-screen bg-cream pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <PageHeader
          title="Chapter Resources"
          intro="Tools and materials for professional development and chapter operations."
        />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.title}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const body = (
    <>
      <h2 className="mb-3 flex items-center justify-center gap-2 text-xl font-bold text-navy">
        {resource.title}
        {resource.url && <ArrowUpRight className="h-5 w-5 text-gold" aria-hidden="true" />}
      </h2>
      <p className="leading-relaxed text-gray-600">{resource.description}</p>
      {!resource.url && (
        <p className="mt-4 inline-block rounded bg-cream px-3 py-1 text-sm font-medium text-navy">Coming soon</p>
      )}
    </>
  );

  const base = "block h-full rounded border border-transparent bg-white p-6 text-center shadow-sm";

  return resource.url ? (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} transition hover:-translate-y-1 hover:border-gold hover:shadow-md`}
    >
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}
