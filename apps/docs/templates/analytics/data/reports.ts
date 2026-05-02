export type Report = {
  id: string;
  name: string;
  description: string;
  category: "Growth" | "Product" | "Revenue" | "Engineering";
  /** How many widgets are in the report. */
  widgetCount: number;
  /** Human-readable schedule. */
  schedule: string | null;
  /** Number of recipients. */
  recipients: number;
  ownerInitials: string;
  ownerName: string;
  ownerBg: string;
  updatedRelative: string;
  shared: boolean;
  /** Mock visual fingerprint shown on the report card (gradient). */
  cover: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

const radial = (a: string, b: string) =>
  `radial-gradient(80% 80% at 30% 20%, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const reports: Report[] = [
  {
    id: "weekly-growth",
    name: "Weekly growth digest",
    description: "Signups, conversions, MRR, and the week's notable changes.",
    category: "Growth",
    widgetCount: 12,
    schedule: "Mondays · 8am PT",
    recipients: 18,
    ownerInitials: "AL",
    ownerName: "Alex Lin",
    ownerBg: grad("primary", "accent"),
    updatedRelative: "yesterday",
    shared: true,
    cover: radial("primary", "accent")
  },
  {
    id: "exec-monthly",
    name: "Executive monthly review",
    description: "Top-line metrics, plan mix, regional split, and forward-looking forecast.",
    category: "Revenue",
    widgetCount: 8,
    schedule: "First of month · 9am PT",
    recipients: 6,
    ownerInitials: "MK",
    ownerName: "Maya Krishnan",
    ownerBg: grad("accent", "info"),
    updatedRelative: "5 days ago",
    shared: true,
    cover: radial("accent", "info")
  },
  {
    id: "product-engagement",
    name: "Product engagement",
    description: "Top events, feature adoption, retention, and stickiness ratios.",
    category: "Product",
    widgetCount: 16,
    schedule: "Daily · 7am PT",
    recipients: 14,
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    updatedRelative: "30 min ago",
    shared: true,
    cover: radial("success", "info")
  },
  {
    id: "checkout-funnel",
    name: "Checkout funnel deep-dive",
    description: "Six-step funnel with drop-off, segment compare, and time-between-steps.",
    category: "Revenue",
    widgetCount: 10,
    schedule: null,
    recipients: 0,
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    updatedRelative: "2 days ago",
    shared: false,
    cover: radial("warning", "danger")
  },
  {
    id: "infra-health",
    name: "Infra health",
    description: "Latency p50/p95/p99, error budgets, deploy frequency, and on-call paging.",
    category: "Engineering",
    widgetCount: 14,
    schedule: "Daily · 6am PT",
    recipients: 8,
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    updatedRelative: "1 hr ago",
    shared: true,
    cover: radial("info", "primary")
  },
  {
    id: "trial-cohorts",
    name: "Trial cohort retention",
    description: "Weekly cohort heatmap with N1/N7/N30 callouts and source attribution.",
    category: "Growth",
    widgetCount: 6,
    schedule: "Mondays · 9am PT",
    recipients: 12,
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    updatedRelative: "yesterday",
    shared: true,
    cover: radial("danger", "primary")
  }
];
