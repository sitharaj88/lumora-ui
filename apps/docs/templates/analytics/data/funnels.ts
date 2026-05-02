export type FunnelStep = {
  name: string;
  /** Number of users who hit this step. */
  count: number;
  /** Median time from previous step to this step. */
  avgTime?: string;
};

export type Funnel = {
  id: string;
  name: string;
  description: string;
  category: "Acquisition" | "Activation" | "Conversion" | "Retention";
  steps: FunnelStep[];
};

export const funnels: Funnel[] = [
  {
    id: "signup-to-paid",
    name: "Signup → first paid plan",
    description:
      "From the moment a visitor signs up to the moment they upgrade to a paid plan. Last 30 days.",
    category: "Conversion",
    steps: [
      { name: "Signup", count: 6824 },
      { name: "Email verified", count: 5912, avgTime: "2 min" },
      { name: "First workspace", count: 4842, avgTime: "8 min" },
      { name: "Connected integration", count: 3168, avgTime: "1 hr" },
      { name: "Trial activated", count: 2418, avgTime: "1 day" },
      { name: "Paid plan", count: 1284, avgTime: "9 days" }
    ]
  },
  {
    id: "trial-to-paid",
    name: "Trial → paid",
    description:
      "Conversion of 14-day trial users to a paid plan, by source.",
    category: "Conversion",
    steps: [
      { name: "Trial started", count: 4128 },
      { name: "Day 3 active", count: 3294, avgTime: "3 days" },
      { name: "Day 7 active", count: 2412, avgTime: "7 days" },
      { name: "Day 14 active", count: 1860, avgTime: "14 days" },
      { name: "Upgraded", count: 1284, avgTime: "12 days" }
    ]
  },
  {
    id: "page-to-cart",
    name: "Product → cart → checkout",
    description: "E-commerce funnel from product view to completed checkout.",
    category: "Conversion",
    steps: [
      { name: "Product view", count: 248200 },
      { name: "Variant selected", count: 142800 },
      { name: "Add to cart", count: 64200 },
      { name: "Begin checkout", count: 18400 },
      { name: "Payment entered", count: 6240 },
      { name: "Purchase", count: 4128 }
    ]
  }
];

export const segmentCompare = {
  webDesktop: { name: "Web · desktop", values: [6824, 5912, 4842, 3168, 2418, 1284] },
  webMobile: { name: "Web · mobile", values: [3024, 2562, 1812, 988, 642, 264] },
  ios: { name: "iOS app", values: [1842, 1742, 1462, 1124, 924, 612] },
  android: { name: "Android app", values: [1142, 1024, 824, 562, 412, 218] }
};

export function funnelById(id: string) {
  return funnels.find((f) => f.id === id) ?? funnels[0];
}
