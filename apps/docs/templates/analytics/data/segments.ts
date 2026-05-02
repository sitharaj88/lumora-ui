export type SegmentClause = {
  kind: "property" | "behavior" | "frequency";
  /** Display text. e.g. "Plan = Growth" or "Performed Signup in last 30 days" */
  label: string;
  /** Type-aware filter chips for the visual builder. */
  field: string;
  operator: string;
  value: string;
};

export type Segment = {
  id: string;
  name: string;
  description: string;
  audienceSize: number;
  /** Day-over-day delta in users matching this segment. */
  delta: number;
  /** When the segment was last edited. */
  updatedRelative: string;
  ownerInitials: string;
  ownerName: string;
  ownerBg: string;
  shared: boolean;
  clauses: SegmentClause[];
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const segments: Segment[] = [
  {
    id: "power-users",
    name: "Power users",
    description: "Active users who triggered ≥10 events in the last 7 days.",
    audienceSize: 4248,
    delta: 8.4,
    updatedRelative: "2 hours ago",
    ownerInitials: "MK",
    ownerName: "Maya Krishnan",
    ownerBg: grad("accent", "info"),
    shared: true,
    clauses: [
      { kind: "behavior", field: "event_count(any)", operator: ">=", value: "10", label: "Performed any event ≥ 10 times" },
      { kind: "frequency", field: "window", operator: "in", value: "last 7 days", label: "In the last 7 days" },
      { kind: "property", field: "plan", operator: "=", value: "Growth | Enterprise", label: "Plan is Growth or Enterprise" }
    ]
  },
  {
    id: "trial-day-7",
    name: "Trial · day 7+ no upgrade",
    description: "Trial users still active on day 7 who haven't upgraded — prime for outreach.",
    audienceSize: 642,
    delta: 12.4,
    updatedRelative: "yesterday",
    ownerInitials: "RS",
    ownerName: "Riya Shah",
    ownerBg: grad("success", "info"),
    shared: true,
    clauses: [
      { kind: "property", field: "plan", operator: "=", value: "Trial", label: "Plan = Trial" },
      { kind: "property", field: "trial_age_days", operator: ">=", value: "7", label: "Trial age ≥ 7 days" },
      { kind: "behavior", field: "event_count(checkout.completed)", operator: "=", value: "0", label: "Has not completed checkout" }
    ]
  },
  {
    id: "lapsed-power",
    name: "Lapsed power users",
    description: "Used to be power users — haven't logged in for 30+ days.",
    audienceSize: 218,
    delta: -4.2,
    updatedRelative: "3 days ago",
    ownerInitials: "AL",
    ownerName: "Alex Lin",
    ownerBg: grad("primary", "accent"),
    shared: false,
    clauses: [
      { kind: "behavior", field: "last_seen", operator: "<", value: "30 days ago", label: "Last seen > 30 days ago" },
      { kind: "behavior", field: "previous_event_count", operator: ">=", value: "100", label: "Previously performed ≥ 100 events" }
    ]
  },
  {
    id: "us-enterprise",
    name: "US Enterprise",
    description: "Enterprise plan customers in the United States.",
    audienceSize: 142,
    delta: 2.1,
    updatedRelative: "1 week ago",
    ownerInitials: "DC",
    ownerName: "Daniel Cole",
    ownerBg: grad("danger", "warning"),
    shared: true,
    clauses: [
      { kind: "property", field: "plan", operator: "=", value: "Enterprise", label: "Plan = Enterprise" },
      { kind: "property", field: "country", operator: "=", value: "US", label: "Country = United States" }
    ]
  },
  {
    id: "weekend-only",
    name: "Weekend-only users",
    description: "Users who only show activity on Saturday and Sunday.",
    audienceSize: 1842,
    delta: 0.4,
    updatedRelative: "2 weeks ago",
    ownerInitials: "JH",
    ownerName: "Jin Hong",
    ownerBg: grad("info", "primary"),
    shared: false,
    clauses: [
      { kind: "behavior", field: "event_day", operator: "in", value: "Saturday, Sunday", label: "All events on Sat/Sun" },
      { kind: "frequency", field: "window", operator: "in", value: "last 60 days", label: "In the last 60 days" }
    ]
  },
  {
    id: "high-cart-abandoners",
    name: "High-value cart abandoners",
    description: "Added $200+ to cart but didn't complete checkout in last 14 days.",
    audienceSize: 384,
    delta: 16.2,
    updatedRelative: "5 hours ago",
    ownerInitials: "MC",
    ownerName: "Mateo Cruz",
    ownerBg: grad("accent", "primary"),
    shared: true,
    clauses: [
      { kind: "behavior", field: "event(cart.add).property(value)", operator: ">=", value: "$200", label: "Added cart with value ≥ $200" },
      { kind: "behavior", field: "event_count(checkout.completed)", operator: "=", value: "0", label: "Did not complete checkout" },
      { kind: "frequency", field: "window", operator: "in", value: "last 14 days", label: "In the last 14 days" }
    ]
  }
];

export function segmentById(id: string) {
  return segments.find((s) => s.id === id);
}

export const clauseKindTone: Record<SegmentClause["kind"], "primary" | "info" | "warning"> = {
  property: "primary",
  behavior: "info",
  frequency: "warning"
};
