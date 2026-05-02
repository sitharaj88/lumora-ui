export type ContactStatus = "lead" | "qualified" | "customer" | "champion" | "lapsed";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  bg: string;
  title: string;
  email: string;
  phone: string;
  companyId: string;
  ownerInitials: string;
  ownerName: string;
  ownerBg: string;
  status: ContactStatus;
  tags: string[];
  lastTouched: string;
  lastTouchedRelative: string;
  deals: number;
  totalValue: number;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const contacts: Contact[] = [
  {
    id: "maya-krishnan",
    firstName: "Maya",
    lastName: "Krishnan",
    initials: "MK",
    bg: grad("accent", "info"),
    title: "VP Engineering",
    email: "maya@atlas.example",
    phone: "+1 (415) 555-0142",
    companyId: "atlas",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    status: "champion",
    tags: ["enterprise", "decision-maker", "tech"],
    lastTouched: "2026-04-29T08:14:00Z",
    lastTouchedRelative: "2 hours ago",
    deals: 3,
    totalValue: 480000
  },
  {
    id: "alex-lin",
    firstName: "Alex",
    lastName: "Lin",
    initials: "AL",
    bg: grad("primary", "accent"),
    title: "CTO",
    email: "alex@northstar.example",
    phone: "+1 (206) 555-0188",
    companyId: "northstar",
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    status: "qualified",
    tags: ["enterprise", "champion", "hipaa"],
    lastTouched: "2026-04-28T18:42:00Z",
    lastTouchedRelative: "yesterday",
    deals: 2,
    totalValue: 240000
  },
  {
    id: "sam-park",
    firstName: "Sam",
    lastName: "Park",
    initials: "SP",
    bg: grad("warning", "danger"),
    title: "Director of Operations",
    email: "sam@helios.example",
    phone: "+49 30 555-2218",
    companyId: "helios",
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    status: "customer",
    tags: ["growth", "operations"],
    lastTouched: "2026-04-29T07:02:00Z",
    lastTouchedRelative: "3 hours ago",
    deals: 1,
    totalValue: 84000
  },
  {
    id: "riya-shah",
    firstName: "Riya",
    lastName: "Shah",
    initials: "RS",
    bg: grad("success", "info"),
    title: "Founder & CEO",
    email: "riya@vectorlabs.example",
    phone: "+1 (415) 555-0312",
    companyId: "vector",
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    status: "lead",
    tags: ["trial", "self-serve"],
    lastTouched: "2026-04-26T14:00:00Z",
    lastTouchedRelative: "3 days ago",
    deals: 1,
    totalValue: 24000
  },
  {
    id: "jin-hong",
    firstName: "Jin",
    lastName: "Hong",
    initials: "JH",
    bg: grad("info", "primary"),
    title: "Head of Product",
    email: "jin@borealis.example",
    phone: "+1 (212) 555-0944",
    companyId: "borealis",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    status: "customer",
    tags: ["media", "product"],
    lastTouched: "2026-04-27T16:30:00Z",
    lastTouchedRelative: "2 days ago",
    deals: 2,
    totalValue: 142000
  },
  {
    id: "logan-reyes",
    firstName: "Logan",
    lastName: "Reyes",
    initials: "LR",
    bg: grad("primary", "accent"),
    title: "VP Security",
    email: "logan@ironclad.example",
    phone: "+1 (703) 555-0114",
    companyId: "ironclad",
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    status: "champion",
    tags: ["enterprise", "fedramp", "vip"],
    lastTouched: "2026-04-29T06:48:00Z",
    lastTouchedRelative: "4 hours ago",
    deals: 4,
    totalValue: 920000
  },
  {
    id: "tara-singh",
    firstName: "Tara",
    lastName: "Singh",
    initials: "TS",
    bg: grad("success", "info"),
    title: "Head of Growth",
    email: "tara@polaris.example",
    phone: "+1 (646) 555-0233",
    companyId: "polaris",
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    status: "qualified",
    tags: ["consumer", "growth"],
    lastTouched: "2026-04-25T11:20:00Z",
    lastTouchedRelative: "4 days ago",
    deals: 1,
    totalValue: 64000
  },
  {
    id: "mateo-cruz",
    firstName: "Mateo",
    lastName: "Cruz",
    initials: "MC",
    bg: grad("accent", "primary"),
    title: "Platform Lead",
    email: "mateo@zenith.example",
    phone: "+65 6555-0188",
    companyId: "zenith",
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    status: "customer",
    tags: ["infra", "growth"],
    lastTouched: "2026-04-29T05:11:00Z",
    lastTouchedRelative: "5 hours ago",
    deals: 2,
    totalValue: 168000
  },
  {
    id: "priya-vardhan",
    firstName: "Priya",
    lastName: "Vardhan",
    initials: "PV",
    bg: grad("warning", "danger"),
    title: "Head of Research",
    email: "priya@lumen.example",
    phone: "+44 20 5555-0188",
    companyId: "lumen",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    status: "lapsed",
    tags: ["paused", "biotech"],
    lastTouched: "2026-03-12T09:45:00Z",
    lastTouchedRelative: "7 weeks ago",
    deals: 1,
    totalValue: 38000
  },
  {
    id: "aria-bennett",
    firstName: "Aria",
    lastName: "Bennett",
    initials: "AB",
    bg: grad("danger", "primary"),
    title: "Head of Risk",
    email: "aria@delta.example",
    phone: "+49 89 5555-0188",
    companyId: "delta",
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    status: "qualified",
    tags: ["enterprise", "soc2"],
    lastTouched: "2026-04-28T20:14:00Z",
    lastTouchedRelative: "yesterday",
    deals: 2,
    totalValue: 384000
  },
  {
    id: "daniel-cole",
    firstName: "Daniel",
    lastName: "Cole",
    initials: "DC",
    bg: grad("danger", "warning"),
    title: "Director of Engineering",
    email: "daniel@quartz.example",
    phone: "+1 (415) 555-0577",
    companyId: "atlas",
    ownerInitials: "MK",
    ownerName: "Maya Krishnan",
    ownerBg: grad("accent", "info"),
    status: "champion",
    tags: ["enterprise", "edu"],
    lastTouched: "2026-04-29T09:01:00Z",
    lastTouchedRelative: "30 min ago",
    deals: 2,
    totalValue: 220000
  },
  {
    id: "noah-kim",
    firstName: "Noah",
    lastName: "Kim",
    initials: "NK",
    bg: grad("info", "accent"),
    title: "Operations Manager",
    email: "noah@summitre.example",
    phone: "+1 (303) 555-0312",
    companyId: "polaris",
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    status: "lead",
    tags: ["starter", "real-estate"],
    lastTouched: "2026-04-22T08:00:00Z",
    lastTouchedRelative: "1 week ago",
    deals: 1,
    totalValue: 12000
  }
];

export const statusTone: Record<ContactStatus, "success" | "soft" | "warning" | "danger" | "info"> =
  {
    champion: "success",
    customer: "info",
    qualified: "warning",
    lead: "soft",
    lapsed: "danger"
  };

export const statusLabel: Record<ContactStatus, string> = {
  champion: "Champion",
  customer: "Customer",
  qualified: "Qualified",
  lead: "Lead",
  lapsed: "Lapsed"
};

export function getContact(id: string) {
  return contacts.find((c) => c.id === id);
}
