export type AccountPlan = "Enterprise" | "Growth" | "Trial" | "Starter";
export type AccountStatus = "active" | "review" | "trial" | "paused";

export type Account = {
  id: string;
  name: string;
  initials: string;
  bgGradient: string;
  domain: string;
  plan: AccountPlan;
  status: AccountStatus;
  owner: string;
  ownerInitials: string;
  ownerBg: string;
  admins: number;
  seats: number;
  mrr: number;
  spendYtd: number;
  trend: "up" | "down" | "flat";
  trendValues: number[];
  since: string;
  region: string;
  tags: string[];
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const accounts: Account[] = [
  {
    id: "atlas-finance",
    name: "Atlas Finance",
    initials: "AF",
    bgGradient: grad("primary", "accent"),
    domain: "atlas.example",
    plan: "Enterprise",
    status: "active",
    owner: "Maya Krishnan",
    ownerInitials: "MK",
    ownerBg: grad("accent", "info"),
    admins: 5,
    seats: 142,
    mrr: 24960,
    spendYtd: 84200,
    trend: "up",
    trendValues: [42, 48, 52, 56, 62, 68, 72, 78, 84, 92, 102, 118],
    since: "Jan 8, 2024",
    region: "us-east-1",
    tags: ["enterprise", "annual", "vip"]
  },
  {
    id: "northstar-health",
    name: "Northstar Health",
    initials: "NH",
    bgGradient: grad("success", "info"),
    domain: "northstar.example",
    plan: "Enterprise",
    status: "review",
    owner: "Alex Lin",
    ownerInitials: "AL",
    ownerBg: grad("primary", "accent"),
    admins: 3,
    seats: 98,
    mrr: 18420,
    spendYtd: 52910,
    trend: "down",
    trendValues: [78, 76, 72, 68, 65, 62, 58, 55, 52, 48, 45, 42],
    since: "Mar 14, 2024",
    region: "us-west-2",
    tags: ["enterprise", "hipaa", "review"]
  },
  {
    id: "helios-logistics",
    name: "Helios Logistics",
    initials: "HL",
    bgGradient: grad("warning", "danger"),
    domain: "helios.example",
    plan: "Growth",
    status: "active",
    owner: "Sam Park",
    ownerInitials: "SP",
    ownerBg: grad("warning", "danger"),
    admins: 8,
    seats: 78,
    mrr: 12480,
    spendYtd: 48140,
    trend: "up",
    trendValues: [22, 28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78],
    since: "Apr 2, 2024",
    region: "eu-central-1",
    tags: ["growth", "annual"]
  },
  {
    id: "vector-labs",
    name: "Vector Labs",
    initials: "VL",
    bgGradient: grad("accent", "info"),
    domain: "vectorlabs.example",
    plan: "Trial",
    status: "trial",
    owner: "Riya Shah",
    ownerInitials: "RS",
    ownerBg: grad("success", "info"),
    admins: 2,
    seats: 12,
    mrr: 0,
    spendYtd: 0,
    trend: "up",
    trendValues: [1, 2, 3, 5, 8, 9, 11, 12, 12, 12, 12, 12],
    since: "Apr 18, 2026",
    region: "us-east-1",
    tags: ["trial", "self-serve"]
  },
  {
    id: "borealis-media",
    name: "Borealis Media",
    initials: "BM",
    bgGradient: grad("info", "primary"),
    domain: "borealis.example",
    plan: "Growth",
    status: "active",
    owner: "Jin Hong",
    ownerInitials: "JH",
    ownerBg: grad("info", "primary"),
    admins: 4,
    seats: 64,
    mrr: 9820,
    spendYtd: 31820,
    trend: "up",
    trendValues: [18, 22, 24, 28, 32, 36, 40, 44, 48, 54, 58, 64],
    since: "Jun 12, 2024",
    region: "us-east-1",
    tags: ["growth", "media"]
  },
  {
    id: "quartz-research",
    name: "Quartz Research",
    initials: "QR",
    bgGradient: grad("primary", "info"),
    domain: "quartz.example",
    plan: "Enterprise",
    status: "active",
    owner: "Daniel Cole",
    ownerInitials: "DC",
    ownerBg: grad("danger", "warning"),
    admins: 6,
    seats: 124,
    mrr: 22180,
    spendYtd: 78420,
    trend: "flat",
    trendValues: [110, 112, 114, 118, 120, 122, 121, 122, 124, 124, 124, 124],
    since: "Sep 1, 2023",
    region: "us-west-2",
    tags: ["enterprise", "edu"]
  },
  {
    id: "lumen-bio",
    name: "Lumen Bio",
    initials: "LB",
    bgGradient: grad("success", "primary"),
    domain: "lumen.example",
    plan: "Growth",
    status: "paused",
    owner: "Priya Vardhan",
    ownerInitials: "PV",
    ownerBg: grad("warning", "danger"),
    admins: 2,
    seats: 24,
    mrr: 0,
    spendYtd: 14820,
    trend: "down",
    trendValues: [42, 40, 38, 36, 32, 28, 24, 24, 24, 24, 24, 24],
    since: "Nov 14, 2024",
    region: "eu-west-1",
    tags: ["paused", "biotech"]
  },
  {
    id: "ironclad-defense",
    name: "Ironclad Defense",
    initials: "ID",
    bgGradient: grad("danger", "warning"),
    domain: "ironclad.example",
    plan: "Enterprise",
    status: "active",
    owner: "Logan Reyes",
    ownerInitials: "LR",
    ownerBg: grad("primary", "accent"),
    admins: 12,
    seats: 218,
    mrr: 38940,
    spendYtd: 124800,
    trend: "up",
    trendValues: [120, 132, 142, 154, 168, 178, 188, 196, 204, 210, 214, 218],
    since: "Feb 22, 2024",
    region: "us-east-1",
    tags: ["enterprise", "fedramp", "vip"]
  },
  {
    id: "polaris-consumer",
    name: "Polaris Consumer",
    initials: "PC",
    bgGradient: grad("accent", "warning"),
    domain: "polaris.example",
    plan: "Growth",
    status: "active",
    owner: "Tara Singh",
    ownerInitials: "TS",
    ownerBg: grad("success", "info"),
    admins: 3,
    seats: 42,
    mrr: 7840,
    spendYtd: 22480,
    trend: "up",
    trendValues: [12, 16, 18, 22, 26, 28, 32, 34, 36, 38, 40, 42],
    since: "Aug 8, 2024",
    region: "us-east-1",
    tags: ["growth", "consumer"]
  },
  {
    id: "summit-realestate",
    name: "Summit Real Estate",
    initials: "SR",
    bgGradient: grad("warning", "primary"),
    domain: "summitre.example",
    plan: "Starter",
    status: "active",
    owner: "Noah Kim",
    ownerInitials: "NK",
    ownerBg: grad("info", "accent"),
    admins: 1,
    seats: 8,
    mrr: 0,
    spendYtd: 0,
    trend: "flat",
    trendValues: [4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8],
    since: "Mar 30, 2026",
    region: "us-east-1",
    tags: ["starter", "real-estate"]
  },
  {
    id: "delta-fintech",
    name: "Delta Fintech",
    initials: "DF",
    bgGradient: grad("primary", "success"),
    domain: "delta.example",
    plan: "Enterprise",
    status: "review",
    owner: "Aria Bennett",
    ownerInitials: "AB",
    ownerBg: grad("danger", "primary"),
    admins: 4,
    seats: 88,
    mrr: 16240,
    spendYtd: 61420,
    trend: "down",
    trendValues: [108, 102, 98, 96, 92, 88, 84, 84, 86, 88, 88, 88],
    since: "May 18, 2024",
    region: "eu-central-1",
    tags: ["enterprise", "soc2", "review"]
  },
  {
    id: "zenith-cloud",
    name: "Zenith Cloud",
    initials: "ZC",
    bgGradient: grad("info", "accent"),
    domain: "zenith.example",
    plan: "Growth",
    status: "active",
    owner: "Mateo Cruz",
    ownerInitials: "MC",
    ownerBg: grad("accent", "primary"),
    admins: 5,
    seats: 56,
    mrr: 11240,
    spendYtd: 42880,
    trend: "up",
    trendValues: [22, 26, 30, 32, 36, 40, 44, 48, 50, 52, 54, 56],
    since: "Jul 24, 2024",
    region: "ap-southeast-1",
    tags: ["growth", "infra"]
  }
];

export const planTone: Record<AccountPlan, string> = {
  Enterprise: "primary",
  Growth: "accent",
  Trial: "soft",
  Starter: "soft"
};

export const statusTone: Record<AccountStatus, "success" | "warning" | "soft" | "danger"> = {
  active: "success",
  review: "warning",
  trial: "soft",
  paused: "danger"
};

export const statusLabel: Record<AccountStatus, string> = {
  active: "Active",
  review: "Review",
  trial: "Trial",
  paused: "Paused"
};

export const formatMoney = (n: number) =>
  n >= 1000
    ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
    : n === 0
    ? "—"
    : `$${n}`;

export const formatMoneyFull = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
