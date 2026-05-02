export type Author = {
  id: string;
  name: string;
  initials: string;
  bg: string;
  role: string;
  bio: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const authors: Author[] = [
  {
    id: "maya-krishnan",
    name: "Maya Krishnan",
    initials: "MK",
    bg: grad("accent", "info"),
    role: "VP Engineering",
    bio: "Maya leads the platform team. She writes about compliance automation, policy-as-code, and the human side of incident response."
  },
  {
    id: "alex-lin",
    name: "Alex Lin",
    initials: "AL",
    bg: grad("primary", "accent"),
    role: "Founder & CEO",
    bio: "Alex is the founder of Lumora Cloud. Previously security lead at two SOC-2 audited startups, both of which he wishes he'd had Lumora for."
  },
  {
    id: "riya-shah",
    name: "Riya Shah",
    initials: "RS",
    bg: grad("success", "info"),
    role: "Head of Customer Engineering",
    bio: "Riya works directly with our highest-volume customers. Half writing technical guides, half on Zoom helping teams ship to production."
  },
  {
    id: "jin-hong",
    name: "Jin Hong",
    initials: "JH",
    bg: grad("info", "primary"),
    role: "Staff Engineer",
    bio: "Jin built the Lumora detection engine. She writes about distributed systems, latency budgets, and PostgreSQL."
  }
];

export const getAuthor = (id: string) => authors.find((a) => a.id === id);
