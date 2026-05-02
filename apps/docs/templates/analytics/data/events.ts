export type EventRow = {
  id: string;
  /** Snake-case event name. */
  name: string;
  /** ISO timestamp. */
  timestamp: string;
  relativeTime: string;
  user: string;
  userInitials: string;
  userBg: string;
  /** Where the event originated from. */
  source: "web" | "ios" | "android" | "api";
  country: string;
  /** Optional value (e.g. amount, count). */
  value?: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const liveEvents: EventRow[] = [
  { id: "e-001", name: "checkout.completed", timestamp: "2026-04-29T09:14:22Z", relativeTime: "12 sec ago", user: "Maya Krishnan", userInitials: "MK", userBg: grad("accent", "info"), source: "web", country: "US", value: "$248" },
  { id: "e-002", name: "signup", timestamp: "2026-04-29T09:14:18Z", relativeTime: "16 sec ago", user: "anon-04xj91", userInitials: "?", userBg: grad("info", "primary"), source: "web", country: "DE" },
  { id: "e-003", name: "page.view", timestamp: "2026-04-29T09:14:10Z", relativeTime: "24 sec ago", user: "Alex Lin", userInitials: "AL", userBg: grad("primary", "accent"), source: "ios", country: "CA", value: "/pricing" },
  { id: "e-004", name: "cart.add", timestamp: "2026-04-29T09:14:02Z", relativeTime: "32 sec ago", user: "Tara Singh", userInitials: "TS", userBg: grad("success", "info"), source: "web", country: "IN", value: "Trail pant" },
  { id: "e-005", name: "checkout.completed", timestamp: "2026-04-29T09:13:48Z", relativeTime: "46 sec ago", user: "Logan Reyes", userInitials: "LR", userBg: grad("primary", "accent"), source: "web", country: "US", value: "$96" },
  { id: "e-006", name: "page.view", timestamp: "2026-04-29T09:13:32Z", relativeTime: "1 min ago", user: "Jin Hong", userInitials: "JH", userBg: grad("info", "primary"), source: "android", country: "JP", value: "/blog" },
  { id: "e-007", name: "subscribe", timestamp: "2026-04-29T09:13:18Z", relativeTime: "1 min ago", user: "Riya Shah", userInitials: "RS", userBg: grad("success", "info"), source: "web", country: "UK" },
  { id: "e-008", name: "trial.started", timestamp: "2026-04-29T09:12:42Z", relativeTime: "2 min ago", user: "anon-9c2d4f", userInitials: "?", userBg: grad("info", "primary"), source: "web", country: "FR" },
  { id: "e-009", name: "page.view", timestamp: "2026-04-29T09:12:18Z", relativeTime: "2 min ago", user: "Sam Park", userInitials: "SP", userBg: grad("warning", "danger"), source: "web", country: "DE", value: "/features" },
  { id: "e-010", name: "checkout.completed", timestamp: "2026-04-29T09:11:54Z", relativeTime: "3 min ago", user: "Mateo Cruz", userInitials: "MC", userBg: grad("accent", "primary"), source: "ios", country: "MX", value: "$184" }
];

export const sourceTone: Record<EventRow["source"], string> = {
  web: "primary",
  ios: "info",
  android: "success",
  api: "accent"
};

// 30 days of daily metrics
export const dailyMetrics = {
  activeUsers: [
    4820, 4942, 5104, 5188, 5042, 4810, 4690, 5212, 5384, 5470, 5612, 5698, 5510, 5292, 5108,
    5440, 5708, 5896, 6042, 5870, 5704, 5538, 5710, 5982, 6210, 6394, 6480, 6312, 6128, 5942
  ],
  signups: [
    142, 168, 184, 192, 158, 124, 110, 188, 212, 228, 240, 256, 218, 184, 162, 198, 232, 264,
    288, 256, 224, 198, 234, 268, 296, 318, 332, 304, 282, 258
  ],
  conversions: [
    42, 48, 56, 62, 51, 39, 28, 58, 64, 71, 78, 86, 71, 58, 48, 64, 76, 88, 96, 84, 72, 62, 78,
    92, 102, 114, 124, 108, 94, 86
  ],
  // Revenue in USD thousands
  revenue: [
    8.4, 9.6, 11.2, 12.4, 10.2, 7.8, 5.6, 11.6, 12.8, 14.2, 15.6, 17.2, 14.2, 11.6, 9.6, 12.8,
    15.2, 17.6, 19.2, 16.8, 14.4, 12.4, 15.6, 18.4, 20.4, 22.8, 24.8, 21.6, 18.8, 17.2
  ]
};

export type TopEvent = {
  name: string;
  count: number;
  delta: number;
  category: "Funnel" | "Engagement" | "Conversion" | "System";
};

export const topEvents: TopEvent[] = [
  { name: "page.view", count: 1284200, delta: 12.4, category: "Engagement" },
  { name: "session.start", count: 384800, delta: 8.2, category: "Engagement" },
  { name: "signup", count: 6824, delta: 18.8, category: "Funnel" },
  { name: "trial.started", count: 4128, delta: 22.4, category: "Funnel" },
  { name: "checkout.completed", count: 2284, delta: 14.6, category: "Conversion" },
  { name: "subscribe", count: 1872, delta: -2.4, category: "Conversion" },
  { name: "feature.activated", count: 18420, delta: 6.8, category: "Engagement" },
  { name: "support.ticket.opened", count: 248, delta: -8.4, category: "System" }
];

export const formatNumber = (n: number) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};
