export type PricingFeature = {
  /** Section group label. */
  group: string;
  /** Display label. */
  label: string;
  /** Per-tier value: true (✓), false (—), or a string (e.g. "5 GB"). */
  values: [string | boolean, string | boolean, string | boolean];
};

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  highlight?: boolean;
  ctaLabel: string;
  ctaTone: "primary" | "outline";
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams getting their first audit done.",
    monthly: 0,
    annual: 0,
    ctaLabel: "Start free",
    ctaTone: "outline"
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For scaling teams with multiple frameworks.",
    monthly: 199,
    annual: 159,
    highlight: true,
    ctaLabel: "Start 14-day trial",
    ctaTone: "primary"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For regulated industries with custom controls.",
    monthly: -1,
    annual: -1,
    ctaLabel: "Contact sales",
    ctaTone: "outline"
  }
];

export const pricingFeatures: PricingFeature[] = [
  {
    group: "Frameworks",
    label: "SOC 2 Type II",
    values: [true, true, true]
  },
  {
    group: "Frameworks",
    label: "ISO 27001",
    values: [true, true, true]
  },
  {
    group: "Frameworks",
    label: "HIPAA",
    values: [false, true, true]
  },
  {
    group: "Frameworks",
    label: "PCI DSS",
    values: [false, true, true]
  },
  {
    group: "Frameworks",
    label: "FedRAMP Moderate",
    values: [false, false, true]
  },
  {
    group: "Frameworks",
    label: "Custom frameworks",
    values: [false, "Up to 3", "Unlimited"]
  },
  {
    group: "Evidence",
    label: "Continuous integrations",
    values: ["6 sources", "40+ sources", "Unlimited"]
  },
  {
    group: "Evidence",
    label: "Audit log retention",
    values: ["30 days", "1 year", "7 years"]
  },
  {
    group: "Evidence",
    label: "Audit log API",
    values: [false, true, true]
  },
  {
    group: "Evidence",
    label: "Webhook delivery",
    values: [false, true, true]
  },
  {
    group: "Identity",
    label: "Single sign-on (SSO)",
    values: [false, true, true]
  },
  {
    group: "Identity",
    label: "SCIM provisioning",
    values: [false, true, true]
  },
  {
    group: "Identity",
    label: "Just-in-time access",
    values: [false, false, true]
  },
  {
    group: "Compliance team",
    label: "Auditor access seats",
    values: ["1 read-only", "3 read-only", "Unlimited"]
  },
  {
    group: "Compliance team",
    label: "Dedicated CSM",
    values: [false, false, true]
  },
  {
    group: "Compliance team",
    label: "Quarterly business review",
    values: [false, false, true]
  },
  {
    group: "Support & SLA",
    label: "Email support",
    values: ["Community", "8h response", "1h response"]
  },
  {
    group: "Support & SLA",
    label: "Uptime SLA",
    values: ["99.9%", "99.95%", "99.99%"]
  },
  {
    group: "Support & SLA",
    label: "DPA + BAA",
    values: [false, true, true]
  }
];

export function pricingFeatureGroups() {
  const groups = new Map<string, PricingFeature[]>();
  for (const f of pricingFeatures) {
    if (!groups.has(f.group)) groups.set(f.group, []);
    groups.get(f.group)!.push(f);
  }
  return Array.from(groups.entries());
}

export function tierPrice(tier: PricingTier, billing: "monthly" | "annual") {
  const value = billing === "monthly" ? tier.monthly : tier.annual;
  if (value === -1) return "Custom";
  if (value === 0) return "$0";
  return `$${value}`;
}
