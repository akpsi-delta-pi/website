/**
 * Chapter settings. Most yearly updates happen here or in src/content.ts.
 * Leave a value as "" to hide whatever uses it on the site.
 */

export const site = {
  chapterName: "Delta Pi",
  university: "Creighton University",
  /** Shown in the footer and used for "Get in touch" buttons. */
  contactEmail: "",
  /** Used by the "Contact recruitment" button on the Rush page. */
  recruitmentEmail: "",
  instagramUrl: "https://www.instagram.com/akpsicu",
  linkedinUrl: "",
  /** The banner at the top of the Rush page, e.g. "Spring 2027". */
  rushTerm: "Spring 2027",
};

/**
 * Where the member roster comes from.
 * - "members.csv" reads public/members.csv from this project.
 * - For the Google Sheet, paste its "Publish to web" CSV link instead
 *   (it starts with https://docs.google.com/spreadsheets/).
 */
export const MEMBERS_CSV_URL = "members.csv";

/** The Role value that puts someone in the President card and signs the welcome letter. */
export const PRESIDENT_ROLE = "President";

/**
 * Executive board titles, in the order they appear on the Brothers page.
 * Roles in the sheet are matched without caring about capital letters.
 * A role that isn't listed here still shows on the board, after these.
 */
export const EXEC_ROLES = [
  "Executive Vice President",
  "Vice President of Membership",
  "Vice President of Finance",
  "Vice President of Communications",
  "Vice President of Alumni and External Relations",
  "Vice President of Rituals and Recruitment",
];

/**
 * Active members move to the Alumni page automatically once their class graduates:
 * on the 1st of this month (1 = January … 12 = December) in their ClassYear.
 * With 6, the Class of 2027 shows as alumni from June 1, 2027.
 * To keep someone active longer, or move them early, change their ClassYear or Status in the roster.
 */
export const GRADUATION_MONTH = 6;
