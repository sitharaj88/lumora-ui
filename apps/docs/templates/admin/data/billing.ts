export type Invoice = {
  id: string;
  number: string;
  date: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
};

export const invoices: Invoice[] = [
  {
    id: "i-1042",
    number: "INV-1042",
    date: "Apr 1, 2026",
    plan: "Growth",
    amount: 24960,
    status: "paid"
  },
  {
    id: "i-1031",
    number: "INV-1031",
    date: "Mar 1, 2026",
    plan: "Growth",
    amount: 24960,
    status: "paid"
  },
  {
    id: "i-1019",
    number: "INV-1019",
    date: "Feb 1, 2026",
    plan: "Growth",
    amount: 23440,
    status: "paid"
  },
  {
    id: "i-1008",
    number: "INV-1008",
    date: "Jan 1, 2026",
    plan: "Growth",
    amount: 22180,
    status: "paid"
  },
  {
    id: "i-998",
    number: "INV-998",
    date: "Dec 1, 2025",
    plan: "Growth",
    amount: 21940,
    status: "paid"
  },
  {
    id: "i-986",
    number: "INV-986",
    date: "Nov 1, 2025",
    plan: "Growth",
    amount: 20820,
    status: "paid"
  }
];

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  current?: boolean;
  features: string[];
  cta: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "Free forever",
    cta: "Downgrade",
    features: [
      "3 workspaces",
      "5,000 events / month",
      "14-day audit retention",
      "Community support"
    ]
  },
  {
    name: "Growth",
    price: "$199",
    period: "per workspace / month",
    highlight: true,
    current: true,
    cta: "Current plan",
    features: [
      "Unlimited workspaces",
      "500K events / month",
      "90-day audit retention",
      "SSO + SCIM",
      "Email support · 8h response"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Talk to us",
    cta: "Contact sales",
    features: [
      "Custom retention policy",
      "Audit log API",
      "DPA + BAA",
      "Dedicated CSM",
      "99.99% SLA · 1h response"
    ]
  }
];

export const usageTrend30d = [
  42, 58, 65, 72, 51, 39, 28, 48, 62, 71, 82, 78, 64, 52, 38, 56, 78, 92, 88, 76, 64, 52, 68, 84,
  96, 88, 72, 58, 84, 102
];

export const formatMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
