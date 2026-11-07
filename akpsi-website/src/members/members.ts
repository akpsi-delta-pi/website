import { EXEC_ROLES, PRESIDENT_ROLE } from "../config";

export type MemberStatus = "active" | "alumni";

export type Member = {
  id: string;
  name: string;
  status: MemberStatus;
  role: string;
  classYear: string;
  major: string;
  minor: string;
  company: string;
  position: string;
  industry: string;
  /** A safe, ready-to-use image URL, or "" when there is no usable photo. */
  photoUrl: string;
  /** A verified linkedin.com URL, or "" when missing or not a LinkedIn link. */
  linkedinUrl: string;
};

/** Values of a CSV row keyed by header. Headers are matched without case or spaces. */
type Row = Record<string, string | undefined>;

function field(row: Row, name: string): string {
  return (row[name.toLowerCase()] ?? "").trim();
}

export function normalizeHeader(header: string): string {
  return header.replace(/\s+/g, "").toLowerCase();
}

function parseStatus(value: string): MemberStatus | null {
  const status = value.trim().toLowerCase();
  if (status === "active") return "active";
  if (status === "alumni" || status === "alum" || status === "alumnus") return "alumni";
  return null;
}

/**
 * Only allow real LinkedIn profile links. Anyone who can edit the sheet could
 * otherwise type a "javascript:" or phishing link into the LinkedIn column.
 */
export function safeLinkedInUrl(value: string): string {
  const raw = value.trim();
  if (!raw) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const host = url.hostname.toLowerCase();
    const isLinkedIn = host === "linkedin.com" || host.endsWith(".linkedin.com");
    if (!isLinkedIn) return "";
    url.protocol = "https:";
    return url.toString();
  } catch {
    return "";
  }
}

const DRIVE_ID = /^[\w-]{10,}$/;

function driveFileId(url: URL): string | null {
  const fromPath = url.pathname.match(/\/d\/([\w-]+)/)?.[1];
  const id = fromPath ?? url.searchParams.get("id");
  return id && DRIVE_ID.test(id) ? id : null;
}

/**
 * Turn the sheet's Photo value into an image URL. Accepted:
 * - a file in public/photos, written as "/photos/first-last.jpg"
 * - a Google Drive share link (converted to Drive's thumbnail image URL)
 * Anything else is ignored, and the card shows the person's initials.
 */
export function safePhotoUrl(value: string): string {
  const raw = value.trim();
  if (!raw) return "";

  const local = raw.replace(/^\/+/, "");
  if (/^photos\/[\w.-]+\.(jpe?g|png|webp|avif)$/i.test(local)) {
    return `${import.meta.env.BASE_URL}${local}`;
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol === "https:" && (host === "drive.google.com" || host === "docs.google.com")) {
      const id = driveFileId(url);
      if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }
  } catch {
    // Not a URL: fall through.
  }
  return "";
}

/** Convert parsed CSV rows into members, skipping rows without a name or a valid status. */
export function rowsToMembers(rows: Row[]): Member[] {
  const members: Member[] = [];
  rows.forEach((row, index) => {
    const name = field(row, "Name");
    const status = parseStatus(field(row, "Status"));
    if (!name || !status) return;
    members.push({
      id: `${index}-${name}`,
      name,
      status,
      role: field(row, "Role"),
      classYear: field(row, "ClassYear"),
      major: field(row, "Major"),
      minor: field(row, "Minor"),
      company: field(row, "Company"),
      position: field(row, "Position"),
      industry: field(row, "Industry"),
      photoUrl: safePhotoUrl(field(row, "Photo")),
      linkedinUrl: safeLinkedInUrl(field(row, "LinkedIn")),
    });
  });
  return members;
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** Sort key for class years; blank or invalid years go last. */
function yearValue(classYear: string): number {
  const year = Number.parseInt(classYear, 10);
  return Number.isFinite(year) ? year : Number.POSITIVE_INFINITY;
}

const sameRole = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

function execRank(role: string): number {
  const index = EXEC_ROLES.findIndex((r) => sameRole(r, role));
  return index === -1 ? EXEC_ROLES.length : index;
}

export type Roster = {
  president: Member | undefined;
  execBoard: Member[];
  actives: Member[];
  alumni: Member[];
};

export function buildRoster(members: Member[]): Roster {
  const actives = members.filter((m) => m.status === "active");
  const president = actives.find((m) => sameRole(m.role, PRESIDENT_ROLE));

  const execBoard = actives
    .filter((m) => m !== president && m.role !== "")
    .sort((a, b) => execRank(a.role) - execRank(b.role) || a.role.localeCompare(b.role));

  const byYearThenName = (a: Member, b: Member) =>
    yearValue(a.classYear) - yearValue(b.classYear) || a.name.localeCompare(b.name);

  const alumni = members
    .filter((m) => m.status === "alumni")
    .sort((a, b) => {
      // Newest class first, blank years last.
      const ya = yearValue(a.classYear);
      const yb = yearValue(b.classYear);
      if (ya !== yb) {
        if (!Number.isFinite(ya)) return 1;
        if (!Number.isFinite(yb)) return -1;
        return yb - ya;
      }
      return a.name.localeCompare(b.name);
    });

  return { president, execBoard, actives: [...actives].sort(byYearThenName), alumni };
}
