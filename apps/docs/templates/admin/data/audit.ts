export type AuditSeverity = "info" | "warning" | "danger";

export type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  actorInitials: string;
  actorBg: string;
  actorRole: string;
  action: string;
  resource: string;
  ip: string;
  region: string;
  severity: AuditSeverity;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const auditLog: AuditEntry[] = [
  {
    id: "lg-2842",
    timestamp: "2026-04-29T09:14:22Z",
    actor: "Maya Krishnan",
    actorInitials: "MK",
    actorBg: grad("accent", "info"),
    actorRole: "Owner",
    action: "saml.cert.rotate",
    resource: "atlas-finance/idp",
    ip: "73.214.18.42",
    region: "us-east-1",
    severity: "warning"
  },
  {
    id: "lg-2841",
    timestamp: "2026-04-29T09:02:11Z",
    actor: "Alex Lin",
    actorInitials: "AL",
    actorBg: grad("primary", "accent"),
    actorRole: "Admin",
    action: "members.invite",
    resource: "northstar-health/admins",
    ip: "192.0.2.18",
    region: "us-west-2",
    severity: "info"
  },
  {
    id: "lg-2840",
    timestamp: "2026-04-29T08:48:54Z",
    actor: "Riya Shah",
    actorInitials: "RS",
    actorBg: grad("success", "info"),
    actorRole: "Admin",
    action: "plan.upgrade",
    resource: "vector-labs",
    ip: "10.114.92.4",
    region: "us-east-1",
    severity: "info"
  },
  {
    id: "lg-2839",
    timestamp: "2026-04-29T07:14:08Z",
    actor: "Sam Park",
    actorInitials: "SP",
    actorBg: grad("warning", "danger"),
    actorRole: "Admin",
    action: "report.export",
    resource: "quarterly-compliance",
    ip: "172.18.4.221",
    region: "eu-central-1",
    severity: "info"
  },
  {
    id: "lg-2838",
    timestamp: "2026-04-29T06:02:00Z",
    actor: "System",
    actorInitials: "SY",
    actorBg: grad("info", "primary"),
    actorRole: "System",
    action: "accounts.auto-archive",
    resource: "12 inactive accounts",
    ip: "—",
    region: "global",
    severity: "info"
  },
  {
    id: "lg-2837",
    timestamp: "2026-04-28T22:18:42Z",
    actor: "Unknown",
    actorInitials: "??",
    actorBg: grad("danger", "warning"),
    actorRole: "Anonymous",
    action: "auth.failed",
    resource: "atlas-finance/sso",
    ip: "203.0.113.74",
    region: "ap-southeast-1",
    severity: "danger"
  },
  {
    id: "lg-2836",
    timestamp: "2026-04-28T19:48:22Z",
    actor: "Logan Reyes",
    actorInitials: "LR",
    actorBg: grad("primary", "accent"),
    actorRole: "Owner",
    action: "billing.escalate",
    resource: "ironclad-defense",
    ip: "98.224.18.92",
    region: "us-east-1",
    severity: "warning"
  },
  {
    id: "lg-2835",
    timestamp: "2026-04-28T18:32:14Z",
    actor: "Tara Singh",
    actorInitials: "TS",
    actorBg: grad("success", "info"),
    actorRole: "Member",
    action: "api-key.create",
    resource: "polaris-consumer/datadog-sync",
    ip: "192.0.2.91",
    region: "us-east-1",
    severity: "info"
  },
  {
    id: "lg-2834",
    timestamp: "2026-04-28T17:04:02Z",
    actor: "Daniel Cole",
    actorInitials: "DC",
    actorBg: grad("danger", "warning"),
    actorRole: "Owner",
    action: "settings.update",
    resource: "quartz-research/retention-policy",
    ip: "73.214.18.42",
    region: "us-west-2",
    severity: "info"
  },
  {
    id: "lg-2833",
    timestamp: "2026-04-28T15:42:18Z",
    actor: "Maya Krishnan",
    actorInitials: "MK",
    actorBg: grad("accent", "info"),
    actorRole: "Owner",
    action: "webhook.delete",
    resource: "atlas-finance/staging-events",
    ip: "73.214.18.42",
    region: "us-east-1",
    severity: "warning"
  }
];

export const severityTone: Record<AuditSeverity, "soft" | "warning" | "danger"> = {
  info: "soft",
  warning: "warning",
  danger: "danger"
};

export function formatTimestamp(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}

export function relativeTime(iso: string) {
  const now = new Date("2026-04-29T09:30:00Z").getTime();
  const t = new Date(iso).getTime();
  const diff = now - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}
