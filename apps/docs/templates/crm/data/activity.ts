export type ActivityType = "call" | "email" | "meeting" | "note" | "stage" | "create";

export type CrmActivity = {
  id: string;
  type: ActivityType;
  authorInitials: string;
  authorName: string;
  authorBg: string;
  contactId?: string;
  dealId?: string;
  summary: string;
  detail?: string;
  timestamp: string;
  relativeTime: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const crmActivity: CrmActivity[] = [
  {
    id: "a-001",
    type: "stage",
    authorInitials: "AB",
    authorName: "Aria Bennett",
    authorBg: grad("danger", "primary"),
    dealId: "d-009",
    contactId: "maya-krishnan",
    summary: "moved Atlas Finance — 3-year renewal to Proposal",
    timestamp: "2026-04-29T08:42:00Z",
    relativeTime: "30 min ago"
  },
  {
    id: "a-002",
    type: "meeting",
    authorInitials: "RS",
    authorName: "Riya Shah",
    authorBg: grad("success", "info"),
    contactId: "alex-lin",
    summary: "completed a 45-min discovery with Alex Lin",
    detail:
      "Walked through HIPAA add-on requirements. Strong interest. Following up Thursday with proposal.",
    timestamp: "2026-04-29T07:14:00Z",
    relativeTime: "2 hr ago"
  },
  {
    id: "a-003",
    type: "email",
    authorInitials: "MC",
    authorName: "Mateo Cruz",
    authorBg: grad("accent", "primary"),
    contactId: "tara-singh",
    summary: "sent the Polaris Consumer ROI deck",
    timestamp: "2026-04-29T06:48:00Z",
    relativeTime: "3 hr ago"
  },
  {
    id: "a-004",
    type: "stage",
    authorInitials: "DC",
    authorName: "Daniel Cole",
    authorBg: grad("danger", "warning"),
    dealId: "d-007",
    contactId: "logan-reyes",
    summary: "advanced Ironclad Defense to Proposal",
    timestamp: "2026-04-28T19:22:00Z",
    relativeTime: "yesterday"
  },
  {
    id: "a-005",
    type: "note",
    authorInitials: "AB",
    authorName: "Aria Bennett",
    authorBg: grad("danger", "primary"),
    contactId: "maya-krishnan",
    summary: "left a note on Maya Krishnan",
    detail:
      "Confirmed legal redlines on the renewal agreement. Procurement signoff expected May 15.",
    timestamp: "2026-04-28T16:08:00Z",
    relativeTime: "yesterday"
  },
  {
    id: "a-006",
    type: "call",
    authorInitials: "JH",
    authorName: "Jin Hong",
    authorBg: grad("info", "primary"),
    contactId: "noah-kim",
    summary: "logged a 12-min call with Noah Kim",
    timestamp: "2026-04-28T14:30:00Z",
    relativeTime: "yesterday"
  },
  {
    id: "a-007",
    type: "stage",
    authorInitials: "AB",
    authorName: "Aria Bennett",
    authorBg: grad("danger", "primary"),
    dealId: "d-012",
    contactId: "jin-hong",
    summary: "closed Borealis Media — Q1 contract as won",
    timestamp: "2026-04-15T10:00:00Z",
    relativeTime: "2 weeks ago"
  },
  {
    id: "a-008",
    type: "create",
    authorInitials: "MK",
    authorName: "Maya Krishnan",
    authorBg: grad("accent", "info"),
    dealId: "d-013",
    contactId: "daniel-cole",
    summary: "created Atlas Finance — Q2 add-on",
    timestamp: "2026-03-29T11:00:00Z",
    relativeTime: "4 weeks ago"
  },
  {
    id: "a-009",
    type: "stage",
    authorInitials: "AB",
    authorName: "Aria Bennett",
    authorBg: grad("danger", "primary"),
    dealId: "d-014",
    contactId: "priya-vardhan",
    summary: "marked Lumen Bio — research tier as lost",
    detail: "Lost on price. Re-engage Q3 when budget cycle reopens.",
    timestamp: "2026-04-15T16:00:00Z",
    relativeTime: "2 weeks ago"
  },
  {
    id: "a-010",
    type: "email",
    authorInitials: "RS",
    authorName: "Riya Shah",
    authorBg: grad("success", "info"),
    contactId: "mateo-cruz",
    summary: "replied to Mateo Cruz on integration timeline",
    timestamp: "2026-04-29T05:11:00Z",
    relativeTime: "5 hr ago"
  }
];

export const activityIcon: Record<ActivityType, string> = {
  call: "📞",
  email: "✉",
  meeting: "🗓",
  note: "✎",
  stage: "→",
  create: "+"
};
