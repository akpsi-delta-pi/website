import { useEffect, useState, type ReactNode } from "react";
import Papa from "papaparse";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, Skeleton } from "../components/ui";
import { SPONSORS_CSV_URL } from "../config";

/**
 * Sponsors come from the CSV set in SPONSORS_CSV_URL (src/config.ts) (columns: Name, Tier, Order, Logo, Website).
 * Tier is Gold or Silver. Order sets the position within a tier: 1 shows first.
 */
type Tier = "Gold" | "Silver";
type Sponsor = { name: string; tier: Tier; order: number; logo: string; url: string };

const TIERS: Tier[] = ["Gold", "Silver"];
const SPONSORS_URL = /^https:\/\//i.test(SPONSORS_CSV_URL)
  ? SPONSORS_CSV_URL
  : `${import.meta.env.BASE_URL}${SPONSORS_CSV_URL.replace(/^\/+/, "")}`;

function parseTier(value: string): Tier | null {
  return TIERS.find((tier) => tier.toLowerCase() === value.trim().toLowerCase()) ?? null;
}

/** Only https links, so a typo or a bad value in the file never becomes a link. */
function safeUrl(value: string): string {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

/** Only logo files in public/sponsors/. */
function safeLogo(value: string): string {
  const path = value.trim().replace(/^\/+/, "");
  return /^sponsors\/[\w.-]+\.(png|jpe?g|svg|webp)$/i.test(path) ? `${import.meta.env.BASE_URL}${path}` : "";
}

async function loadSponsors(): Promise<Sponsor[]> {
  const response = await fetch(SPONSORS_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Sponsors request failed with status ${response.status}`);
  const { data } = Papa.parse<Record<string, string>>(await response.text(), {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.replace(/\s+/g, "").toLowerCase(),
  });

  const sponsors: Sponsor[] = [];
  for (const row of data) {
    const name = (row.name ?? "").trim();
    const tier = parseTier(row.tier ?? "");
    if (!name || !tier) continue;
    const order = Number.parseInt(row.order ?? "", 10);
    sponsors.push({
      name,
      tier,
      order: Number.isFinite(order) ? order : Number.POSITIVE_INFINITY,
      logo: safeLogo(row.logo ?? ""),
      url: safeUrl(row.website ?? ""),
    });
  }
  return sponsors.sort(
    (a, b) =>
      TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier) ||
      (a.order === b.order ? 0 : a.order < b.order ? -1 : 1) ||
      a.name.localeCompare(b.name),
  );
}

type State = { status: "loading" } | { status: "ready"; sponsors: Sponsor[] } | { status: "error" };

export function Sponsors() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadSponsors()
      .then((sponsors) => !cancelled && setState({ status: "ready", sponsors }))
      .catch((error: unknown) => {
        console.error("[sponsors] Could not load sponsors:", error);
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-28">
      <PageHeader
        title="Our Sponsors"
        intro="Thank you to the companies and organizations that support the Delta Pi chapter of Alpha Kappa Psi."
      />

      {state.status === "loading" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      )}

      {state.status === "error" && (
        <p role="status" className="rounded bg-cream px-6 py-10 text-center text-gray-600">
          Our sponsor list is temporarily unavailable. Please check back soon.
        </p>
      )}

      {state.status === "ready" && state.sponsors.length === 0 && (
        <p className="text-center text-gray-600">Sponsors coming soon.</p>
      )}

      {state.status === "ready" &&
        TIERS.map((tier) => {
          const inTier = state.sponsors.filter((s) => s.tier === tier);
          if (inTier.length === 0) return null;
          const gold = tier === "Gold";
          return (
            <TierSection key={tier} title={`${tier} Sponsors`} accent={gold ? "bg-gold" : "bg-gray-400"}>
              <ul className={`grid gap-6 sm:grid-cols-2 ${gold ? "" : "lg:grid-cols-4"}`}>
                {inTier.map((sponsor) => (
                  <li key={sponsor.name}>
                    <SponsorCard sponsor={sponsor} large={gold} />
                  </li>
                ))}
              </ul>
            </TierSection>
          );
        })}
    </main>
  );
}

function TierSection({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="mb-2 font-serif text-4xl font-bold text-navy">{title}</h2>
        <div className={`h-1 w-24 ${accent}`} />
      </div>
      {children}
    </section>
  );
}

function SponsorCard({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  const body = (
    <>
      <div className={`flex items-center justify-center bg-white p-6 ${large ? "h-48" : "h-36"}`}>
        {sponsor.logo ? (
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
        ) : (
          <h3 className="text-center font-serif text-2xl font-bold text-navy">{sponsor.name}</h3>
        )}
      </div>
      <div className="border-t border-gray-200 p-5">
        <p className={`text-xs font-semibold tracking-widest ${sponsor.tier === "Gold" ? "text-gold" : "text-gray-500"}`}>
          {sponsor.tier.toUpperCase()} SPONSOR
        </p>
        {sponsor.logo && <h3 className="mt-1 text-lg font-bold text-navy">{sponsor.name}</h3>}
        {sponsor.url && (
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:text-gold">
            Learn more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );
  const card = "group block h-full overflow-hidden rounded border border-gray-200 shadow-sm transition";

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className={`${card} hover:border-gold hover:shadow-md`}>
      {body}
    </a>
  ) : (
    <div className={card}>{body}</div>
  );
}
