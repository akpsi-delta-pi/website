import { useEffect, useState } from "react";
import Papa from "papaparse";
import { MEMBERS_CSV_URL } from "../config";
import { buildRoster, normalizeHeader, rowsToMembers, type Roster } from "./members";

type State =
  | { status: "loading" }
  | { status: "ready"; roster: Roster }
  | { status: "error" };

function resolveCsvUrl(url: string): string {
  if (/^https:\/\//i.test(url)) return url;
  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, "")}`;
}

async function loadRoster(): Promise<Roster> {
  const response = await fetch(resolveCsvUrl(MEMBERS_CSV_URL), { cache: "no-cache" });
  if (!response.ok) throw new Error(`Roster request failed with status ${response.status}`);

  const text = await response.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: normalizeHeader,
  });

  const members = rowsToMembers(parsed.data);
  if (members.length === 0) throw new Error("Roster has no rows with a Name and a valid Status");
  return buildRoster(members);
}

// One request per visit, shared by every page that shows members.
let rosterPromise: Promise<Roster> | null = null;

function getRoster(): Promise<Roster> {
  rosterPromise ??= loadRoster().catch((error: unknown) => {
    rosterPromise = null; // let the next page view try again
    throw error;
  });
  return rosterPromise;
}

export function useRoster(): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getRoster()
      .then((roster) => !cancelled && setState({ status: "ready", roster }))
      .catch((error: unknown) => {
        console.error("[roster] Could not load members:", error);
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
