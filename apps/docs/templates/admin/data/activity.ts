export type ActivityEvent = {
  id: string;
  who: string;
  whoInitials: string;
  whoBg: string;
  action: string;
  target?: string;
  time: string;
  category: "billing" | "security" | "members" | "admin" | "system";
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const recentActivity: ActivityEvent[] = [
  {
    id: "evt-001",
    who: "Maya Krishnan",
    whoInitials: "MK",
    whoBg: grad("accent", "info"),
    action: "rotated the SAML certificate for",
    target: "Atlas Finance",
    time: "2 min ago",
    category: "security"
  },
  {
    id: "evt-002",
    who: "Alex Lin",
    whoInitials: "AL",
    whoBg: grad("primary", "accent"),
    action: "invited 3 admins to",
    target: "Northstar Health",
    time: "14 min ago",
    category: "members"
  },
  {
    id: "evt-003",
    who: "Riya Shah",
    whoInitials: "RS",
    whoBg: grad("success", "info"),
    action: "promoted Vector Labs to",
    target: "Growth plan",
    time: "1 hr ago",
    category: "billing"
  },
  {
    id: "evt-004",
    who: "Sam Park",
    whoInitials: "SP",
    whoBg: grad("warning", "danger"),
    action: "exported the quarterly compliance report.",
    time: "3 hrs ago",
    category: "admin"
  },
  {
    id: "evt-005",
    who: "System",
    whoInitials: "SY",
    whoBg: grad("info", "primary"),
    action: "auto-archived 12 inactive accounts.",
    time: "5 hrs ago",
    category: "system"
  },
  {
    id: "evt-006",
    who: "Logan Reyes",
    whoInitials: "LR",
    whoBg: grad("primary", "accent"),
    action: "approved billing escalation for",
    target: "Ironclad Defense",
    time: "yesterday",
    category: "billing"
  }
];
