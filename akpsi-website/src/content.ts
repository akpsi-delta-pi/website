/**
 * Editable page content: rush events and chapter resources.
 * Add a link to a resource or an RSVP form to an event and its button appears.
 */

export type RushEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  /** Optional link to an RSVP form (for example a Google Form). */
  rsvpUrl?: string;
};

export const rushEvents: RushEvent[] = [
  {
    title: "Information Night",
    date: "TBD",
    time: "TBD",
    location: "Harper Center Auditorium",
    description:
      "A casual meet-and-greet with current brothers. Learn about the chapter and ask anything.",
  },
  {
    title: "Shark Tank",
    date: "TBD",
    time: "TBD",
    location: "Harper Center classrooms",
    description: "Work with other PNMs to pitch a business idea to a panel of brothers.",
  },
  {
    title: "Company Visit",
    date: "TBD",
    time: "TBD",
    location: "TBD",
    description:
      "Tour a local company alongside active brothers, learn how it works, and start building connections.",
  },
];

export type Resource = {
  title: string;
  description: string;
  /** Link to the document, folder or page. Without one, the card shows "Coming soon". */
  url?: string;
};

export const resources: Resource[] = [
  {
    title: "Resume Templates",
    description: "Resume templates tailored for business, finance and consulting roles.",
  },
  {
    title: "Interview Prep Guide",
    description: "Practice for behavioral, case and technical interviews.",
  },
  {
    title: "Networking Events",
    description: "Upcoming networking events, career fairs and alumni mixers.",
  },
  {
    title: "Skills Workshops",
    description: "Materials from Excel, financial modeling and data analytics workshops.",
  },
  {
    title: "Industry Insights",
    description: "Guides to industries, trends and possible career paths.",
  },
  {
    title: "Case Study Library",
    description: "Business case studies for interview and case competition practice.",
  },
  {
    title: "Mentorship Program",
    description: "Get matched with an alumni mentor in the industry you're aiming for.",
  },
  {
    title: "Professional Certifications",
    description: "Prep resources for the CFA, CPA and other certifications.",
  },
  {
    title: "Salary Negotiation Guide",
    description: "How to evaluate and negotiate a job offer.",
  },
];
