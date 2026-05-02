export type Testimonial = {
  quote: string;
  authorInitials: string;
  authorName: string;
  authorRole: string;
  authorBg: string;
  rating: number;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const testimonials: Testimonial[] = [
  {
    quote:
      "We went from spending 3 weeks per quarter on SOC 2 evidence collection to 2 hours. Lumora pays for itself in the first audit.",
    authorInitials: "SC",
    authorName: "Sam Chen",
    authorRole: "VP Engineering, Atlas Finance",
    authorBg: grad("primary", "accent"),
    rating: 5
  },
  {
    quote:
      "The audit log API is the difference between a Datadog dashboard auditors trust and one they don't. It just shows up. Signed.",
    authorInitials: "MK",
    authorName: "Maya Krishnan",
    authorRole: "Site Reliability, Northstar Health",
    authorBg: grad("accent", "info"),
    rating: 5
  },
  {
    quote:
      "I've shipped four SOC 2 reports across four startups. Lumora is the first time I've enjoyed it. That sentence still surprises me.",
    authorInitials: "LR",
    authorName: "Logan Reyes",
    authorRole: "Head of Security, Ironclad Defense",
    authorBg: grad("danger", "warning"),
    rating: 5
  }
];

export const faqEntries: FaqEntry[] = [
  {
    question: "How long does setup actually take?",
    answer:
      "Median time-to-first-evidence is 12 minutes. Connect your IdP and your cloud provider and Lumora maps the rest from your existing access policies. The first audit-ready set of controls populates within 24 hours."
  },
  {
    question: "Do you support custom controls?",
    answer:
      "Yes. Every plan includes custom controls. Growth caps at 3, Enterprise is unlimited. Custom controls are written in our typed DSL or in Rego — both are first-class, both run against the same evidence corpus."
  },
  {
    question: "Can we self-host?",
    answer:
      "BYOC self-hosting is available on Enterprise. We deploy a Lumora cluster into your AWS or GCP account with a one-command Terraform module. The evidence never leaves your tenant; we run a managed control plane."
  },
  {
    question: "What's your SLA?",
    answer:
      "99.9% on Starter, 99.95% on Growth, 99.99% on Enterprise. Enterprise customers get a named CSM, 1-hour P1 response, and SLA credits. Public status page at status.lumora.cloud."
  },
  {
    question: "Do you sign a DPA / BAA?",
    answer:
      "Both, on Growth and above. Custom MSAs are standard for Enterprise. We're SOC 2 Type II audited (of course) and ISO 27001 certified. The reports are downloadable from your account once you sign."
  },
  {
    question: "What happens at the end of my contract?",
    answer:
      "You can export everything — controls, policies, evidence, audit log — as JSON or Parquet. We retain backups for 30 days post-termination and then permanently delete. We will not hold your data hostage."
  }
];

export type CustomerLogo = { name: string };

export const customerLogos: CustomerLogo[] = [
  { name: "Atlas Finance" },
  { name: "Northstar" },
  { name: "Ironclad" },
  { name: "Borealis" },
  { name: "Vector Labs" },
  { name: "Helios" },
  { name: "Quartz" },
  { name: "Polaris" }
];

export const heroStats = [
  { value: "1,200+", label: "Production teams" },
  { value: "94%", label: "Less prep time" },
  { value: "8 days", label: "Median to SOC 2 ready" },
  { value: "$0", label: "Cost of a missed audit" }
];
