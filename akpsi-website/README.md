# Alpha Kappa Psi – Delta Pi Chapter Website

The website for the Delta Pi chapter of Alpha Kappa Psi at Creighton University.
Built with React, TypeScript and Tailwind CSS, and hosted for free on GitHub Pages.

## Updating the site (no coding needed)

| To change… | Edit |
| --- | --- |
| Brothers, officers and alumni | `public/members.csv` (or the Google Sheet, once connected) |
| Member photos | Add files to `public/photos/` |
| Exec board titles and their order | `EXEC_ROLES` in `src/config.ts` |
| Contact emails, Instagram, rush term | `site` in `src/config.ts` |
| Rush events and RSVP links | `rushEvents` in `src/content.ts` |
| Resources and their links | `resources` in `src/content.ts` |

Every change pushed to the `main` branch is published automatically within a few minutes.

### The member roster

Each row in `members.csv` is one person. The columns are:

| Column | What to enter |
| --- | --- |
| `Name` | Full name |
| `Status` | `Active` or `Alumni`. Changing this moves the person between the Brothers and Alumni pages. |
| `Role` | Exec title, matching one in `src/config.ts` (e.g. `President`). Leave blank for everyone else. |
| `ClassYear` | Graduation year, e.g. `2027` |
| `Major`, `Minor` | Optional |
| `Company`, `Position`, `Industry` | Alumni only, all optional |
| `Photo` | `/photos/first-last.jpg`, or a Google Drive share link |
| `LinkedIn` | Full profile link. Anything that isn't a linkedin.com link is ignored. |

Empty optional cells are simply hidden on the site.

### Photos

- Name files `first-last.jpg`: lowercase, hyphens instead of spaces, no special characters.
- Keep each under about 500 KB. On a Mac: Preview → Tools → Adjust Size → width 800 pixels.
- The `Photo` cell must match the file name exactly, including `.jpg`, `.jpeg` or `.png`.
- Anyone without a photo gets their initials instead.

### Switching to the Google Sheet

1. Import `public/members.csv` into a new Google Sheet (File → Import).
2. File → Share → Publish to web → choose the tab → **Comma-separated values (.csv)** → Publish.
3. Paste that link into `MEMBERS_CSV_URL` in `src/config.ts`.

Edits to a published sheet can take about 5 minutes to appear. For photos, upload them to a Drive
folder shared as "Anyone with the link can view" and paste each photo's share link into the `Photo` column.

## Running it on your computer

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install     # first time only
npm run dev     # then open http://localhost:5173
```

`npm run build` checks the code for errors and builds the production site into `dist/`.

## Project layout

```
public/
  members.csv          the roster
  photos/              member photos
src/
  config.ts            chapter settings and exec titles
  content.ts           rush events and resources
  members/             loads, checks and sorts the roster
  components/          navigation, footer, cards and the home page sections
  pages/               one file per page
.github/workflows/     automatic deploy to GitHub Pages
```

## Hosting

The site deploys with GitHub Actions. In the repository, go to **Settings → Pages** and set
**Source** to **GitHub Actions**. To use a custom domain, add it under the same Pages settings.
