export type PostCategory = "Engineering" | "Compliance" | "Product" | "Customers";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  authorId: string;
  date: string;
  readMinutes: number;
  /** CSS background for the cover. */
  cover: string;
  featured?: boolean;
  body: PostBlock[];
};

export type PostBlock =
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; lang: string; text: string }
  | { kind: "quote"; text: string; attribution: string }
  | { kind: "callout"; tone: "info" | "success" | "warning" | "danger"; title: string; body: string };

const radial = (a: string, b: string) =>
  `radial-gradient(80% 80% at 30% 20%, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const posts: Post[] = [
  {
    slug: "why-compliance-platforms-fail",
    title: "Why most compliance platforms fail their first audit",
    excerpt:
      "We've audited the auditors. Three patterns explain why teams scramble in the final 90 days — and how a continuous-evidence model fixes them.",
    category: "Compliance",
    authorId: "alex-lin",
    date: "2026-04-22",
    readMinutes: 9,
    cover: radial("primary", "accent"),
    featured: true,
    body: [
      { kind: "p", text: "If you've shipped a SOC 2 Type II report, you know the rhythm. The first 270 days feel calm. The last 90 don't. Engineering rewires Slack channels, security cancels weekend plans, and someone — always — discovers a control they thought was covered by a vendor and isn't." },
      { kind: "p", text: "After working with 1,200+ teams through their first audit, we've found that this isn't a tooling problem in the traditional sense. The tools exist. The gaps are structural." },
      { kind: "h2", id: "three-patterns", text: "Three patterns we see in every failed audit" },
      { kind: "p", text: "Auditors don't fail teams because they couldn't gather evidence. They fail teams because the evidence they gathered didn't match the controls they claimed." },
      { kind: "list", items: [
        "**Evidence drift.** Controls were defined in Q1, the stack changed in Q2, no one updated the mapping.",
        "**Vendor blindspots.** A subprocessor lost their own certification mid-cycle and nobody noticed.",
        "**Manual screenshot debt.** A control marked 'automated' actually requires a quarterly screenshot that was last taken in October."
      ] },
      { kind: "h2", id: "continuous-evidence", text: "What 'continuous evidence' actually means" },
      { kind: "p", text: "Most platforms ship continuous evidence as a marketing page. In practice, what they ship is a connector that fetches data once a day and stores it next to a control. That's a snapshot, not continuous." },
      { kind: "callout", tone: "info", title: "The bar we hold ourselves to", body: "Continuous evidence means: every privileged action emits a signed event in real time, every control is mapped to a query against those events, and every query runs at least hourly with versioned results stored for 7 years." },
      { kind: "h2", id: "what-good-looks-like", text: "What good looks like" },
      { kind: "p", text: "An auditor opens your dashboard. They click any control. They see a stream of evidence dating back to the last audit. They click any event. They see who, what, where, when, with cryptographic chain-of-custody." },
      { kind: "p", text: "Time spent: minutes. Confidence: total. That's the bar." },
      { kind: "code", lang: "ts", text: "// Define a control as a query, not a checklist.\nexport const accessReviewControl = {\n  id: 'CC6.3',\n  name: 'Quarterly access review',\n  evidence: query(`\n    SELECT actor, target, granted_at\n    FROM permission_grants\n    WHERE granted_at > NOW() - INTERVAL '90 days'\n  `)\n}" },
      { kind: "quote", text: "We went from spending 3 weeks per quarter on SOC 2 evidence collection to 2 hours. Lumora pays for itself in the first audit.", attribution: "Sam Chen — VP Engineering, Atlas Finance" }
    ]
  },
  {
    slug: "designing-the-detection-engine",
    title: "Designing a detection engine that costs $0.0004 per event",
    excerpt:
      "Behind every continuous-evidence claim is a query engine deciding which events matter. Here's how we kept the per-event cost under half a millicent.",
    category: "Engineering",
    authorId: "jin-hong",
    date: "2026-04-08",
    readMinutes: 12,
    cover: radial("info", "accent"),
    body: [
      { kind: "p", text: "Detection engines look simple from the product side: events come in, alerts come out. The hard part is doing it for $0.0004 per event when your customers are sending 30 million events a day." },
      { kind: "h2", id: "the-budget", text: "Setting a per-event budget" },
      { kind: "p", text: "Before any code, we set a budget: under half a millicent per event, end-to-end. If we couldn't hit that, the customer pricing model didn't work." },
      { kind: "h2", id: "the-architecture", text: "Architecture in three sentences" },
      { kind: "p", text: "Events land in a Kafka topic, partitioned by tenant. A pool of stateless workers consumes the topic and writes to ClickHouse. Continuous queries run hourly against the same ClickHouse cluster, materialising into a per-tenant evidence table." }
    ]
  },
  {
    slug: "fedramp-in-eight-weeks",
    title: "FedRAMP Moderate in eight weeks: an Ironclad case study",
    excerpt:
      "Ironclad Defense needed FedRAMP Moderate to bid on a federal contract closing in 90 days. Here's how we got them to the JAB in 56.",
    category: "Customers",
    authorId: "riya-shah",
    date: "2026-03-28",
    readMinutes: 7,
    cover: radial("danger", "warning"),
    body: [
      { kind: "p", text: "FedRAMP Moderate in two months sounds impossible. It's not — but it requires a specific kind of customer and a specific kind of platform partner." }
    ]
  },
  {
    slug: "policy-as-code-anti-patterns",
    title: "Five anti-patterns we see in policy-as-code adoption",
    excerpt:
      "Policy-as-code is the right idea. The implementations we see most often aren't. Here are the five mistakes we keep talking teams out of.",
    category: "Engineering",
    authorId: "maya-krishnan",
    date: "2026-03-12",
    readMinutes: 8,
    cover: radial("accent", "info"),
    body: [
      { kind: "p", text: "Every team adopting policy-as-code starts with the same hopeful sentence: \"We'll just write our controls as Rego.\" Six months later, the Rego file is 4,000 lines, nobody touches it, and the business team can't read it." }
    ]
  },
  {
    slug: "introducing-audit-log-api",
    title: "Introducing the Audit Log API",
    excerpt:
      "Stream every privileged action from Lumora into your SIEM, your warehouse, or your own webhook — with cryptographic signatures and 7-year retention.",
    category: "Product",
    authorId: "alex-lin",
    date: "2026-02-28",
    readMinutes: 5,
    cover: radial("primary", "info"),
    body: [
      { kind: "p", text: "Today we're shipping the Audit Log API. Every privileged action — sign-in, key rotation, role grant, policy change — is now available as a signed, queryable, exportable stream." }
    ]
  },
  {
    slug: "scim-without-the-tears",
    title: "SCIM without the tears",
    excerpt:
      "If you've never integrated with SCIM, you may believe it's a quiet, well-specified protocol. We're here to tell you the truth.",
    category: "Engineering",
    authorId: "jin-hong",
    date: "2026-02-14",
    readMinutes: 11,
    cover: radial("info", "primary"),
    body: [
      { kind: "p", text: "SCIM is a protocol for syncing users between identity providers and applications. The spec is 90 pages. The implementations are inventive." }
    ]
  }
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function postsByCategory(category: PostCategory) {
  return posts.filter((p) => p.category === category);
}

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
