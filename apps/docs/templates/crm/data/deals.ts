export type DealStage =
  | "prospecting"
  | "qualifying"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost";

export type Deal = {
  id: string;
  name: string;
  value: number;
  stage: DealStage;
  contactId: string;
  companyId: string;
  ownerInitials: string;
  ownerName: string;
  ownerBg: string;
  expectedClose: string;
  expectedCloseRelative: string;
  probability: number;
  ageDays: number;
  source: "Outbound" | "Inbound" | "Referral" | "Marketing" | "Partner";
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const deals: Deal[] = [
  // Prospecting
  {
    id: "d-001",
    name: "Atlas Q3 expansion (200 → 400 seats)",
    value: 240000,
    stage: "prospecting",
    contactId: "maya-krishnan",
    companyId: "atlas",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    expectedClose: "2026-08-30",
    expectedCloseRelative: "in 4 months",
    probability: 25,
    ageDays: 8,
    source: "Outbound"
  },
  {
    id: "d-002",
    name: "Borealis Media — annual upgrade",
    value: 96000,
    stage: "prospecting",
    contactId: "jin-hong",
    companyId: "borealis",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    expectedClose: "2026-07-15",
    expectedCloseRelative: "in 11 weeks",
    probability: 20,
    ageDays: 14,
    source: "Marketing"
  },
  {
    id: "d-003",
    name: "Summit RE pilot",
    value: 12000,
    stage: "prospecting",
    contactId: "noah-kim",
    companyId: "polaris",
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    expectedClose: "2026-06-10",
    expectedCloseRelative: "in 6 weeks",
    probability: 15,
    ageDays: 22,
    source: "Inbound"
  },
  // Qualifying
  {
    id: "d-004",
    name: "Northstar Health — HIPAA add-on",
    value: 124000,
    stage: "qualifying",
    contactId: "alex-lin",
    companyId: "northstar",
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    expectedClose: "2026-06-30",
    expectedCloseRelative: "in 2 months",
    probability: 45,
    ageDays: 18,
    source: "Referral"
  },
  {
    id: "d-005",
    name: "Polaris Consumer — analytics",
    value: 64000,
    stage: "qualifying",
    contactId: "tara-singh",
    companyId: "polaris",
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    expectedClose: "2026-06-22",
    expectedCloseRelative: "in 8 weeks",
    probability: 50,
    ageDays: 21,
    source: "Outbound"
  },
  {
    id: "d-006",
    name: "Delta Fintech — SOC 2 add-on",
    value: 184000,
    stage: "qualifying",
    contactId: "aria-bennett",
    companyId: "delta",
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    expectedClose: "2026-07-22",
    expectedCloseRelative: "in 12 weeks",
    probability: 55,
    ageDays: 26,
    source: "Outbound"
  },
  // Proposal
  {
    id: "d-007",
    name: "Ironclad Defense — FedRAMP rollout",
    value: 480000,
    stage: "proposal",
    contactId: "logan-reyes",
    companyId: "ironclad",
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    expectedClose: "2026-05-30",
    expectedCloseRelative: "in 4 weeks",
    probability: 70,
    ageDays: 38,
    source: "Partner"
  },
  {
    id: "d-008",
    name: "Zenith Cloud — usage tier upgrade",
    value: 84000,
    stage: "proposal",
    contactId: "mateo-cruz",
    companyId: "zenith",
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    expectedClose: "2026-05-18",
    expectedCloseRelative: "in 3 weeks",
    probability: 65,
    ageDays: 33,
    source: "Inbound"
  },
  {
    id: "d-009",
    name: "Atlas Finance — 3-year renewal",
    value: 720000,
    stage: "proposal",
    contactId: "maya-krishnan",
    companyId: "atlas",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    expectedClose: "2026-05-22",
    expectedCloseRelative: "in 3 weeks",
    probability: 75,
    ageDays: 42,
    source: "Outbound"
  },
  // Negotiation
  {
    id: "d-010",
    name: "Helios Logistics — EU expansion",
    value: 84000,
    stage: "negotiation",
    contactId: "sam-park",
    companyId: "helios",
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    expectedClose: "2026-05-08",
    expectedCloseRelative: "in 2 weeks",
    probability: 80,
    ageDays: 49,
    source: "Referral"
  },
  {
    id: "d-011",
    name: "Vector Labs — paid conversion",
    value: 24000,
    stage: "negotiation",
    contactId: "riya-shah",
    companyId: "vector",
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    expectedClose: "2026-05-04",
    expectedCloseRelative: "next week",
    probability: 85,
    ageDays: 56,
    source: "Inbound"
  },
  // Closed won
  {
    id: "d-012",
    name: "Borealis Media — Q1 contract",
    value: 46000,
    stage: "closed-won",
    contactId: "jin-hong",
    companyId: "borealis",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    expectedClose: "2026-04-12",
    expectedCloseRelative: "2 weeks ago",
    probability: 100,
    ageDays: 84,
    source: "Marketing"
  },
  {
    id: "d-013",
    name: "Atlas Finance — Q2 add-on",
    value: 64000,
    stage: "closed-won",
    contactId: "daniel-cole",
    companyId: "atlas",
    ownerInitials: "MK",
    ownerName: "Maya Krishnan",
    ownerBg: grad("accent", "info"),
    expectedClose: "2026-04-22",
    expectedCloseRelative: "1 week ago",
    probability: 100,
    ageDays: 31,
    source: "Outbound"
  },
  // Closed lost
  {
    id: "d-014",
    name: "Lumen Bio — research tier",
    value: 38000,
    stage: "closed-lost",
    contactId: "priya-vardhan",
    companyId: "lumen",
    ownerInitials: "AB",
    ownerName: "Aria Bennett",
    ownerBg: grad("danger", "primary"),
    expectedClose: "2026-04-15",
    expectedCloseRelative: "2 weeks ago",
    probability: 0,
    ageDays: 92,
    source: "Outbound"
  }
];

export const stageMeta: Record<DealStage, { label: string; tone: string; color: string }> = {
  prospecting: { label: "Prospecting", tone: "soft", color: "info" },
  qualifying: { label: "Qualifying", tone: "info", color: "info" },
  proposal: { label: "Proposal", tone: "warning", color: "warning" },
  negotiation: { label: "Negotiation", tone: "accent", color: "accent" },
  "closed-won": { label: "Closed · won", tone: "success", color: "success" },
  "closed-lost": { label: "Closed · lost", tone: "danger", color: "danger" }
};

export const pipelineStages: DealStage[] = [
  "prospecting",
  "qualifying",
  "proposal",
  "negotiation",
  "closed-won"
];

export function dealsByStage(stage: DealStage) {
  return deals.filter((d) => d.stage === stage);
}

export function stageValue(stage: DealStage) {
  return dealsByStage(stage).reduce((sum, d) => sum + d.value, 0);
}

export function dealsByContact(contactId: string) {
  return deals.filter((d) => d.contactId === contactId);
}

export function formatValue(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export function formatValueFull(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}
