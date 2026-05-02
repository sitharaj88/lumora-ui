export type FeatureBlock = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  /** CSS background for the visual placeholder. */
  visual: string;
  reverse?: boolean;
};

const radial = (a: string, b: string) =>
  `radial-gradient(60% 80% at 30% 20%, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const featureBlocks: FeatureBlock[] = [
  {
    id: "continuous-evidence",
    eyebrow: "Evidence",
    title: "Continuous evidence, not screenshots",
    body: "Forty integrations, hourly polling, signed events. Your auditor sees a stream — not a folder of last quarter's PNGs.",
    bullets: [
      "40+ continuous integrations · AWS · GCP · Azure · Okta · GitHub · Datadog · Snowflake",
      "Hourly polling cadence · 24-hour coverage gap maximum",
      "Cryptographically signed events with 7-year retention"
    ],
    visual: radial("primary", "accent")
  },
  {
    id: "policy-as-code",
    eyebrow: "Policy",
    title: "Policy as code, with guardrails",
    body: "Write policies in Rego or our typed DSL. Diff them in pull requests. Test them against historical evidence before they ship.",
    bullets: [
      "Native Rego support + a typed DSL for non-engineers",
      "Pull-request diffs against the live evidence corpus",
      "Backwards-test against the last 12 months of events"
    ],
    visual: radial("info", "primary"),
    reverse: true
  },
  {
    id: "frameworks",
    eyebrow: "Frameworks",
    title: "Every framework your auditor reads",
    body: "SOC 2, ISO 27001, HIPAA, PCI DSS, FedRAMP, GDPR, and 12 more. Map your existing controls in minutes; we suggest the gaps.",
    bullets: [
      "18 built-in framework templates · always-current",
      "AI-suggested mappings from your existing control library",
      "Cross-framework reuse: one control, multiple frameworks"
    ],
    visual: radial("success", "info")
  },
  {
    id: "audit-log",
    eyebrow: "Audit log",
    title: "An audit log your SIEM can query",
    body: "Stream every privileged action to your SIEM, your warehouse, or a webhook. Sign and verify with chain-of-custody guarantees.",
    bullets: [
      "Push or pull · webhook, Kafka, or REST",
      "Chain-of-custody signatures verifiable offline",
      "Per-tenant, per-user, per-control queryability"
    ],
    visual: radial("warning", "danger"),
    reverse: true
  }
];
