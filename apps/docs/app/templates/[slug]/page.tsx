import { notFound } from "next/navigation";
import Link from "next/link";
import { AreaChart, BarChart, DonutChart } from "../../../components/chart";
import { DocsFooter } from "../../../components/footer";
import { DocsNav } from "../../../components/docs-nav";
import { Icon } from "../../../components/icon";
import { getTemplate, templates } from "../../../lib/templates";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  return {
    title: template ? `${template.name} template — Lumora UI` : "Template — Lumora UI",
    description: template?.description
  };
}

export default async function TemplatePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-12">
        <div className="flex items-center gap-2 text-sm">
          <Link className="text-[var(--lm-color-muted)]" href="/templates">
            ← All templates
          </Link>
        </div>
        <div className="grid max-w-3xl gap-3">
          <span className="docs-section-eyebrow">{template.category} template</span>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            <span className="docs-headline">{template.name}</span>
          </h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">{template.description}</p>
          <div className="flex flex-wrap gap-2">
            {template.componentsUsed.map((c) => (
              <span className="lm-badge lm-badge-soft" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="docs-feature-card overflow-hidden">
          <div className="border-b border-[var(--lm-color-border)] bg-[var(--lm-color-surface-raised)] px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="docs-code-window-dot" />
                <span className="docs-code-window-dot" />
                <span className="docs-code-window-dot" />
                <span className="ml-2 text-xs text-[var(--lm-color-muted)]">
                  preview · {template.slug}.lumora.dev
                </span>
              </div>
              <span className="lm-badge lm-badge-soft text-xs">Live preview</span>
            </div>
          </div>
          <div
            className="overflow-hidden"
            style={{ background: "var(--lm-color-bg)", padding: "0" }}
          >
            <TemplateBody slug={template.slug} />
          </div>
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}

function TemplateBody({ slug }: { slug: string }) {
  switch (slug) {
    case "admin-dashboard":
      return <AdminDashboard />;
    case "settings":
      return <SettingsTemplate />;
    case "auth":
      return <AuthTemplate />;
    case "billing":
      return <BillingTemplate />;
    case "kanban":
      return <KanbanTemplate />;
    case "marketing":
      return <MarketingTemplate />;
    default:
      return null;
  }
}

// ============================================================
// SHARED ICONS (inline SVG for sidebar items)
// ============================================================
function NavIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    accounts: "M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8zM16 13a7.96 7.96 0 0 0-3.6.85A9.99 9.99 0 0 1 18 21h6a8 8 0 0 0-8-8z",
    billing: "M2 7h20v4H2zM2 13h20v6H2z",
    reports: "M3 22V8h4v14H3zm7 0V2h4v20h-4zm7 0v-9h4v9h-4z",
    audit: "M5 3h11l5 5v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0v6h6M8 13h8M8 17h6",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.18-1.62l2.12-1.65-2-3.46-2.5 1a7 7 0 0 0-2.81-1.63L13 2h-2l-.63 2.64A7 7 0 0 0 7.56 6.27l-2.5-1-2 3.46 2.12 1.65A7 7 0 0 0 5 12c0 .56.07 1.1.18 1.62L3.06 15.27l2 3.46 2.5-1a7 7 0 0 0 2.81 1.63L11 22h2l.63-2.64a7 7 0 0 0 2.81-1.63l2.5 1 2-3.46-2.12-1.65A7 7 0 0 0 19 12z"
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name] ?? paths.dashboard} />
    </svg>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard() {
  return (
    <div
      className="lm-app-shell"
      style={{ background: "var(--lm-color-bg)", minHeight: "auto" }}
    >
      <header className="lm-navbar" style={{ position: "static" }}>
        <div className="lm-navbar-brand">
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
            }}
          >
            A
          </span>
          Atlas Console
          <span className="lm-badge lm-badge-soft text-xs">Production</span>
        </div>
        <div className="ml-4 hidden items-center gap-1 md:flex">
          <button className="lm-btn lm-btn-ghost lm-btn-sm">Workspace</button>
          <button className="lm-btn lm-btn-ghost lm-btn-sm">Reports</button>
          <button className="lm-btn lm-btn-ghost lm-btn-sm">Audit</button>
        </div>
        <span className="ml-auto" />
        <div className="lm-input-group" style={{ width: "20rem", maxWidth: "100%" }}>
          <span className="lm-input-addon">⌘K</span>
          <input className="lm-input" placeholder="Jump to anything…" />
        </div>
        <button
          className="lm-btn lm-btn-ghost lm-btn-icon"
          aria-label="Notifications"
          style={{ position: "relative" }}
        >
          🔔
          <span
            className="lm-badge lm-badge-danger"
            style={{
              position: "absolute",
              top: "0.25rem",
              right: "0.25rem",
              minHeight: "1rem",
              minWidth: "1rem",
              padding: "0 0.25rem",
              fontSize: "0.625rem"
            }}
          >
            3
          </span>
        </button>
        <span className="lm-avatar lm-avatar-sm">AL</span>
      </header>

      <div className="lm-app-shell-sidebar">
        <aside className="lm-sidebar">
          <span className="lm-sidebar-section">Workspace</span>
          <a className="lm-sidebar-item" href="#" aria-current="page">
            <NavIcon name="dashboard" />
            Dashboard
          </a>
          <a className="lm-sidebar-item" href="#">
            <NavIcon name="accounts" />
            Accounts
            <span className="ml-auto lm-badge lm-badge-soft text-xs">128</span>
          </a>
          <a className="lm-sidebar-item" href="#">
            <NavIcon name="billing" />
            Billing
          </a>
          <a className="lm-sidebar-item" href="#">
            <NavIcon name="reports" />
            Reports
          </a>
          <span className="lm-sidebar-section">System</span>
          <a className="lm-sidebar-item" href="#">
            <NavIcon name="audit" />
            Audit log
          </a>
          <a className="lm-sidebar-item" href="#">
            <NavIcon name="settings" />
            Settings
          </a>

          <div className="mt-auto pt-4">
            <div className="lm-card lm-card-gradient">
              <div className="lm-card-body grid gap-2">
                <strong className="text-sm">Upgrade to Pro</strong>
                <p className="lm-hint text-xs">Unlock SAML SSO and SCIM provisioning.</p>
                <button className="lm-btn lm-btn-primary lm-btn-sm">See plans</button>
              </div>
            </div>
          </div>
        </aside>

        <main className="lm-app-main">
          <div className="lm-page-header">
            <div>
              <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
                <span>Workspace</span> <span>/</span> <span>Atlas</span> <span>/</span>
                <strong className="text-[var(--lm-color-text)]">Dashboard</strong>
              </div>
              <h1 className="lm-page-title mt-2">Welcome back, Alex</h1>
              <p className="lm-page-description">
                Live workspace metrics across 128 accounts. Refreshed 2 minutes ago.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="lm-segmented">
                <button className="lm-segmented-item">24h</button>
                <button className="lm-segmented-item" aria-pressed="true">
                  7 days
                </button>
                <button className="lm-segmented-item">30 days</button>
                <button className="lm-segmented-item">Quarter</button>
              </div>
              <button className="lm-btn lm-btn-outline lm-btn-sm">Export CSV</button>
              <button className="lm-btn lm-btn-primary lm-btn-sm">+ New account</button>
            </div>
          </div>

          {/* KPI strip */}
          <div className="lm-stat-grid">
            <KpiTile
              label="Revenue"
              value="$1.28M"
              delta="▲ 12.4%"
              tone="up"
              chartColor="success"
            />
            <KpiTile
              label="Active seats"
              value="18,420"
              delta="▲ 3.1% MoM"
              tone="up"
              chartColor="primary"
            />
            <KpiTile
              label="Risk reviews"
              value="37"
              delta="▼ 8 open"
              tone="down"
              chartColor="warning"
            />
            <KpiTile
              label="SLA breaches"
              value="0"
              delta="90 days clean"
              tone="flat"
              chartColor="info"
            />
          </div>

          {/* Chart row */}
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <section className="lm-card">
              <div className="lm-card-header flex items-center justify-between">
                <div>
                  <h3 className="lm-card-title">Revenue & active seats</h3>
                  <p className="lm-card-subtitle">Last 30 days</p>
                </div>
                <div className="flex gap-2">
                  <button className="lm-btn lm-btn-ghost lm-btn-sm">Compare</button>
                  <button className="lm-btn lm-btn-outline lm-btn-sm">Download</button>
                </div>
              </div>
              <div className="lm-card-body">
                <AreaChart
                  height={260}
                  series={[
                    {
                      label: "Revenue",
                      color: "primary",
                      values: [
                        62, 68, 71, 65, 78, 82, 80, 85, 92, 95, 98, 96, 102, 110, 115, 118, 122,
                        128, 135, 130, 138, 142, 148, 152, 158, 162, 168, 172, 178, 184
                      ]
                    },
                    {
                      label: "Active seats (×100)",
                      color: "accent",
                      values: [
                        45, 48, 52, 50, 56, 60, 58, 62, 66, 68, 70, 72, 75, 78, 82, 84, 86, 88, 90,
                        92, 95, 97, 99, 102, 105, 108, 110, 114, 118, 122
                      ]
                    }
                  ]}
                />
              </div>
            </section>

            <section className="lm-card">
              <div className="lm-card-header">
                <h3 className="lm-card-title">Plan mix</h3>
                <p className="lm-card-subtitle">Active accounts by plan</p>
              </div>
              <div className="lm-card-body grid place-items-center">
                <DonutChart
                  segments={[
                    { label: "Enterprise", value: 42, color: "primary" },
                    { label: "Growth", value: 68, color: "accent" },
                    { label: "Trial", value: 18, color: "warning" }
                  ]}
                />
              </div>
            </section>
          </div>

          {/* Activity + table */}
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <section className="lm-card">
              <div className="lm-card-header flex items-center justify-between">
                <div>
                  <h3 className="lm-card-title">Top accounts</h3>
                  <p className="lm-card-subtitle">By spend, last 30 days</p>
                </div>
                <div className="flex gap-2">
                  <button className="lm-btn lm-btn-ghost lm-btn-sm">Filter</button>
                  <button className="lm-btn lm-btn-outline lm-btn-sm">View all</button>
                </div>
              </div>
              <div className="lm-card-body grid gap-3">
                <div className="lm-bulk-bar">
                  <strong>3 accounts selected</strong>
                  <div className="flex gap-2">
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Tag</button>
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Export</button>
                    <button className="lm-btn lm-btn-danger lm-btn-sm">Suspend</button>
                  </div>
                </div>
                <table className="lm-table">
                  <thead>
                    <tr>
                      <th style={{ width: "1.5rem" }}>
                        <input type="checkbox" className="lm-checkbox" />
                      </th>
                      <th>Account</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th className="text-right">Spend</th>
                      <th>Trend</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountRows.map((row) => (
                      <tr key={row.name}>
                        <td>
                          <input type="checkbox" className="lm-checkbox" defaultChecked={row.checked} />
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span
                              className="lm-avatar lm-avatar-xs"
                              style={{ background: row.bg }}
                            >
                              {row.initials}
                            </span>
                            <div>
                              <strong className="text-sm">{row.name}</strong>
                              <p className="lm-hint text-xs">{row.owner}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="lm-badge lm-badge-soft">{row.plan}</span>
                        </td>
                        <td>
                          <span
                            className={`lm-badge lm-badge-${row.statusTone} lm-badge-dot`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="text-right tabular-nums">{row.spend}</td>
                        <td>
                          <MiniSpark color={row.trendColor} />
                        </td>
                        <td>
                          <button
                            className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                            aria-label="More"
                          >
                            ⋯
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-6">
              <div className="lm-card">
                <div className="lm-card-header">
                  <h3 className="lm-card-title">Activity</h3>
                  <p className="lm-card-subtitle">Today</p>
                </div>
                <div className="lm-card-body">
                  <ul className="lm-activity-feed">
                    {activityRows.map((row) => (
                      <li className="lm-activity-item" key={row.text}>
                        <span className="lm-avatar lm-avatar-sm" style={{ background: row.bg }}>
                          {row.who}
                        </span>
                        <div className="lm-activity-content">
                          <p className="text-sm">{row.text}</p>
                          <span className="lm-activity-meta">{row.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lm-card">
                <div className="lm-card-header">
                  <h3 className="lm-card-title">Quick actions</h3>
                </div>
                <div className="lm-card-body grid gap-2">
                  {[
                    { icon: "globe" as const, label: "Invite teammate" },
                    { icon: "shield" as const, label: "Rotate API key" },
                    { icon: "bolt" as const, label: "Run audit export" },
                    { icon: "palette" as const, label: "Configure theme" }
                  ].map((a) => (
                    <button
                      key={a.label}
                      className="lm-btn lm-btn-ghost flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <Icon name={a.icon} size={16} />
                        {a.label}
                      </span>
                      <span aria-hidden>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

const accountRows = [
  {
    name: "Atlas Finance",
    initials: "AF",
    bg: "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))",
    owner: "Maya K. · 5 admins",
    plan: "Enterprise",
    status: "Active",
    statusTone: "success",
    spend: "$84,200",
    trendColor: "success",
    checked: true
  },
  {
    name: "Northstar Health",
    initials: "NH",
    bg: "linear-gradient(135deg, var(--lm-color-success), var(--lm-color-info))",
    owner: "Alex L. · 3 admins",
    plan: "Enterprise",
    status: "Review",
    statusTone: "warning",
    spend: "$52,910",
    trendColor: "warning",
    checked: true
  },
  {
    name: "Helios Logistics",
    initials: "HL",
    bg: "linear-gradient(135deg, var(--lm-color-warning), var(--lm-color-danger))",
    owner: "Sam P. · 8 admins",
    plan: "Growth",
    status: "Active",
    statusTone: "success",
    spend: "$48,140",
    trendColor: "success",
    checked: true
  },
  {
    name: "Vector Labs",
    initials: "VL",
    bg: "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))",
    owner: "Riya S. · 2 admins",
    plan: "Trial",
    status: "Trial",
    statusTone: "soft",
    spend: "$12,480",
    trendColor: "primary",
    checked: false
  },
  {
    name: "Borealis Media",
    initials: "BM",
    bg: "linear-gradient(135deg, var(--lm-color-info), var(--lm-color-primary))",
    owner: "Jin H. · 4 admins",
    plan: "Growth",
    status: "Active",
    statusTone: "success",
    spend: "$31,820",
    trendColor: "success",
    checked: false
  }
];

const activityRows = [
  {
    who: "MK",
    bg: "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))",
    text: "Maya rotated the SAML certificate for Atlas Finance.",
    time: "2 min ago"
  },
  {
    who: "AL",
    bg: "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))",
    text: "Alex invited 3 admins to Northstar Health.",
    time: "14 min ago"
  },
  {
    who: "RS",
    bg: "linear-gradient(135deg, var(--lm-color-success), var(--lm-color-info))",
    text: "Riya promoted Vector Labs to Growth plan.",
    time: "1 hr ago"
  },
  {
    who: "SP",
    bg: "linear-gradient(135deg, var(--lm-color-warning), var(--lm-color-danger))",
    text: "Sam exported the quarterly compliance report.",
    time: "3 hrs ago"
  }
];

function KpiTile({
  label,
  value,
  delta,
  tone,
  chartColor
}: {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down" | "flat";
  chartColor: string;
}) {
  return (
    <div className="lm-stat">
      <div className="flex items-start justify-between">
        <span className="lm-stat-label">{label}</span>
        <span
          className="lm-badge lm-badge-soft text-xs"
          style={{
            color:
              tone === "up"
                ? "var(--lm-color-success)"
                : tone === "down"
                ? "var(--lm-color-danger)"
                : "var(--lm-color-muted)"
          }}
        >
          {delta}
        </span>
      </div>
      <span className="lm-stat-value">{value}</span>
      <MiniSpark color={chartColor} />
    </div>
  );
}

function MiniSpark({ color }: { color: string }) {
  return (
    <svg
      className="lm-sparkline"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      style={{ color: `var(--lm-color-${color})`, width: "100%", height: "1.5rem" }}
    >
      <path
        className="lm-sparkline-area"
        d="M0,22 L10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10 90,4 100,8 L100,30 L0,30 Z"
      />
      <path
        className="lm-sparkline-line"
        d="M0,22 L10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10 90,4 100,8"
      />
    </svg>
  );
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsTemplate() {
  return (
    <div
      className="lm-app-shell-sidebar grid gap-6"
      style={{ background: "var(--lm-color-bg)", padding: "1.5rem" }}
    >
      <div
        className="lm-banner"
        style={{
          borderColor: "var(--lm-color-warning)",
          background:
            "color-mix(in oklab, var(--lm-color-warning) 10%, var(--lm-color-surface))"
        }}
      >
        <div className="flex items-center gap-3">
          <Icon name="bolt" />
          <div>
            <strong>SSO certificate rotates April 27</strong>
            <p className="lm-hint text-xs">
              Verify your IdP metadata before then to prevent service interruption.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="lm-btn lm-btn-ghost lm-btn-sm">Dismiss</button>
          <button className="lm-btn lm-btn-warning lm-btn-sm">Rotate now</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="lm-sidebar h-fit">
          <span className="lm-sidebar-section">Account</span>
          <a className="lm-sidebar-item" href="#profile" aria-current="page">
            Profile
          </a>
          <a className="lm-sidebar-item" href="#security">
            Security
          </a>
          <a className="lm-sidebar-item" href="#api">
            API keys
          </a>
          <a className="lm-sidebar-item" href="#notifications">
            Notifications
          </a>
          <span className="lm-sidebar-section">Workspace</span>
          <a className="lm-sidebar-item" href="#members">
            Members
          </a>
          <a className="lm-sidebar-item" href="#billing">
            Billing
          </a>
          <a className="lm-sidebar-item" href="#integrations">
            Integrations
          </a>
        </aside>

        <div className="grid gap-6">
          <div className="lm-page-header">
            <div>
              <h1 className="lm-page-title">Account settings</h1>
              <p className="lm-page-description">
                Manage your profile, security, and notification preferences.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="lm-btn lm-btn-ghost lm-btn-sm">Discard</button>
              <button className="lm-btn lm-btn-primary lm-btn-sm">Save changes</button>
            </div>
          </div>

          <section id="profile" className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Profile</h2>
              <p className="lm-card-subtitle">How others see you across the workspace.</p>
            </div>
            <div className="lm-card-body grid gap-6">
              <div className="flex flex-wrap items-center gap-5">
                <span
                  className="lm-avatar lm-avatar-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))",
                    fontSize: "1.5rem"
                  }}
                >
                  MK
                </span>
                <div className="grid gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Upload photo</button>
                    <button className="lm-btn lm-btn-ghost lm-btn-sm">Remove</button>
                  </div>
                  <p className="lm-hint text-xs">PNG or JPG up to 4 MB. 1:1 ratio recommended.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="lm-field md:col-span-2">
                  <span className="lm-label">Display name</span>
                  <input className="lm-input" defaultValue="Maya Krishnan" />
                </label>
                <label className="lm-field">
                  <span className="lm-label">Title</span>
                  <input className="lm-input" defaultValue="Site Reliability Engineer" />
                </label>
                <label className="lm-field">
                  <span className="lm-label">Pronouns</span>
                  <input className="lm-input" defaultValue="they/them" />
                </label>
                <label className="lm-field md:col-span-2">
                  <span className="lm-label">Bio</span>
                  <textarea
                    className="lm-textarea"
                    rows={3}
                    defaultValue="Eng @ Atlas. Caretaker of pipelines, paging, and post-mortems."
                  />
                  <span className="lm-hint">Max 240 characters · 198 left.</span>
                </label>
                <div className="md:col-span-2">
                  <span className="lm-label">Skills</span>
                  <div className="lm-tag-input mt-2">
                    <span className="lm-tag lm-tag-removable">
                      sre
                      <button className="lm-tag-remove" aria-label="Remove">
                        ×
                      </button>
                    </span>
                    <span className="lm-tag lm-tag-removable">
                      on-call
                      <button className="lm-tag-remove" aria-label="Remove">
                        ×
                      </button>
                    </span>
                    <span className="lm-tag lm-tag-removable">
                      kubernetes
                      <button className="lm-tag-remove" aria-label="Remove">
                        ×
                      </button>
                    </span>
                    <span className="lm-tag lm-tag-removable">
                      terraform
                      <button className="lm-tag-remove" aria-label="Remove">
                        ×
                      </button>
                    </span>
                    <input placeholder="Add skill…" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="security" className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Security</h2>
              <p className="lm-card-subtitle">Authentication and recovery.</p>
            </div>
            <div className="lm-card-body grid gap-5">
              <SettingRow
                title="Two-factor authentication"
                desc="Use an authenticator app for sign-in."
                badge={{ tone: "success", label: "Enabled" }}
                action={<input type="checkbox" className="lm-switch" defaultChecked />}
              />
              <SettingRow
                title="Single sign-on"
                desc="All members must sign in via your IdP."
                action={<input type="checkbox" className="lm-switch" />}
              />
              <SettingRow
                title="Session timeout"
                desc="Auto sign-out after this period of inactivity."
                action={
                  <div className="flex items-center gap-3" style={{ minWidth: "12rem" }}>
                    <input
                      className="lm-slider"
                      type="range"
                      defaultValue="30"
                      style={{ width: "8rem" }}
                    />
                    <span className="lm-badge lm-badge-soft" style={{ minWidth: "3.5rem" }}>
                      30 min
                    </span>
                  </div>
                }
              />
              <SettingRow
                title="Active sessions"
                desc="Sign out other devices."
                action={<button className="lm-btn lm-btn-outline lm-btn-sm">Sign out all</button>}
              />
            </div>
          </section>

          <section id="api" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">API keys</h2>
                <p className="lm-card-subtitle">Personal access tokens for the Lumora API.</p>
              </div>
              <button className="lm-btn lm-btn-primary lm-btn-sm">+ New key</button>
            </div>
            <div className="lm-card-body">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Token</th>
                    <th>Created</th>
                    <th>Last used</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "CI/CD",
                      token: "lmra_live_a3f1…b829",
                      created: "Jan 8, 2026",
                      used: "12 min ago"
                    },
                    {
                      name: "Local dev",
                      token: "lmra_test_82c9…f4d2",
                      created: "Mar 1, 2026",
                      used: "yesterday"
                    },
                    {
                      name: "Datadog sync",
                      token: "lmra_live_71be…ac15",
                      created: "Apr 12, 2026",
                      used: "5 hours ago"
                    }
                  ].map((row) => (
                    <tr key={row.name}>
                      <td>
                        <strong>{row.name}</strong>
                      </td>
                      <td>
                        <code className="lm-code">{row.token}</code>
                      </td>
                      <td className="text-sm text-[var(--lm-color-muted)]">{row.created}</td>
                      <td className="text-sm text-[var(--lm-color-muted)]">{row.used}</td>
                      <td>
                        <button className="lm-btn lm-btn-ghost lm-btn-sm">Copy</button>
                        <button className="lm-btn lm-btn-ghost lm-btn-sm">Revoke</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="notifications" className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Notifications</h2>
              <p className="lm-card-subtitle">Choose how Lumora reaches you.</p>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                { label: "Account changes", desc: "Sign-ins, role changes, key rotations.", on: true },
                { label: "Weekly digest", desc: "Summary of activity, every Monday.", on: true },
                { label: "Security alerts", desc: "Failed logins and suspicious access.", on: true },
                { label: "Marketing", desc: "Product news and roadmap updates.", on: false }
              ].map((row) => (
                <SettingRow
                  key={row.label}
                  title={row.label}
                  desc={row.desc}
                  action={
                    <input
                      type="checkbox"
                      className="lm-switch lm-switch-sm"
                      defaultChecked={row.on}
                    />
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  title,
  desc,
  badge,
  action
}: {
  title: string;
  desc?: string;
  badge?: { tone: string; label: string };
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-4 last:border-b-0 last:pb-0">
      <div className="grid gap-0.5">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{title}</strong>
          {badge && (
            <span className={`lm-badge lm-badge-${badge.tone} lm-badge-dot text-xs`}>
              {badge.label}
            </span>
          )}
        </div>
        {desc && <p className="lm-hint text-xs">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

// ============================================================
// AUTH (split-screen)
// ============================================================
function AuthTemplate() {
  return (
    <div
      className="grid gap-0 overflow-hidden md:grid-cols-2"
      style={{ minHeight: "44rem" }}
    >
      {/* Branding panel */}
      <div
        className="relative flex flex-col justify-between p-12 text-[var(--lm-color-primary-fg)]"
        style={{
          background:
            "radial-gradient(40rem 28rem at 20% 10%, color-mix(in oklab, var(--lm-color-primary) 80%, transparent), transparent 70%), radial-gradient(36rem 28rem at 80% 90%, color-mix(in oklab, var(--lm-color-accent) 70%, transparent), transparent 70%), var(--lm-color-primary)",
          color: "var(--lm-color-primary-fg)"
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="lm-avatar lm-avatar-md"
            style={{
              background: "rgb(255 255 255 / 0.18)",
              color: "var(--lm-color-primary-fg)",
              backdropFilter: "blur(8px)"
            }}
          >
            L
          </span>
          <strong className="text-lg">Lumora</strong>
        </div>

        <div className="grid gap-6">
          <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
            "Lumora let our team rebuild the admin in two weeks. The components feel polished
            without us touching CSS."
          </h2>
          <div className="flex items-center gap-3">
            <span
              className="lm-avatar lm-avatar-md"
              style={{ background: "rgb(255 255 255 / 0.2)" }}
            >
              SC
            </span>
            <div>
              <strong className="text-base">Sam Chen</strong>
              <p className="text-sm" style={{ opacity: 0.85 }}>
                VP Engineering, Atlas Finance
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <span
              className="lm-badge"
              style={{
                background: "rgb(255 255 255 / 0.18)",
                borderColor: "rgb(255 255 255 / 0.24)",
                color: "var(--lm-color-primary-fg)"
              }}
            >
              SOC 2 Type II
            </span>
            <span
              className="lm-badge"
              style={{
                background: "rgb(255 255 255 / 0.18)",
                borderColor: "rgb(255 255 255 / 0.24)",
                color: "var(--lm-color-primary-fg)"
              }}
            >
              GDPR
            </span>
            <span
              className="lm-badge"
              style={{
                background: "rgb(255 255 255 / 0.18)",
                borderColor: "rgb(255 255 255 / 0.24)",
                color: "var(--lm-color-primary-fg)"
              }}
            >
              ISO 27001
            </span>
          </div>
          <p className="text-xs" style={{ opacity: 0.7 }}>
            Trusted by 1,200+ teams shipping to production.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div
        className="grid place-items-center p-12"
        style={{ background: "var(--lm-color-surface)" }}
      >
        <div className="grid w-full max-w-md gap-6">
          <div className="grid gap-2">
            <h1 className="text-balance text-3xl font-bold tracking-tight">
              <span className="docs-headline">Welcome back</span>
            </h1>
            <p className="text-[var(--lm-color-muted)]">
              Sign in to continue to your workspace.
            </p>
          </div>

          <div className="grid gap-2">
            <button className="lm-btn lm-btn-block lm-btn-outline">
              <span aria-hidden>G</span> Continue with Google
            </button>
            <button className="lm-btn lm-btn-block lm-btn-outline">
              <span aria-hidden>M</span> Continue with Microsoft
            </button>
            <button className="lm-btn lm-btn-block lm-btn-outline">
              <span aria-hidden>S</span> Continue with SSO
            </button>
          </div>

          <div className="lm-divider">or</div>

          <label className="lm-field">
            <span className="lm-label">Work email</span>
            <input className="lm-input lm-input-lg" type="email" placeholder="name@company.com" />
          </label>
          <button className="lm-btn lm-btn-primary lm-btn-block lm-btn-lg">
            Send magic link
          </button>

          <p className="text-center text-xs text-[var(--lm-color-muted)]">
            By continuing you agree to our{" "}
            <a className="text-[var(--lm-color-primary)] underline" href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className="text-[var(--lm-color-primary)] underline" href="#">
              Privacy Policy
            </a>
            .
          </p>

          <div className="lm-divider">already have a code</div>

          <div className="grid gap-3 text-center">
            <span className="text-sm font-medium">Verify with the code we sent</span>
            <div className="lm-otp justify-center">
              <input className="lm-otp-slot" defaultValue="9" maxLength={1} />
              <input
                className="lm-otp-slot"
                defaultValue="2"
                data-state="filled"
                maxLength={1}
              />
              <input
                className="lm-otp-slot"
                defaultValue="4"
                data-state="filled"
                maxLength={1}
              />
              <span className="lm-otp-separator">—</span>
              <input className="lm-otp-slot" maxLength={1} />
              <input className="lm-otp-slot" maxLength={1} />
              <input className="lm-otp-slot" maxLength={1} />
            </div>
            <p className="text-xs text-[var(--lm-color-muted)]">
              Code expires in 9:48 ·{" "}
              <a className="text-[var(--lm-color-primary)] underline" href="#">
                Resend
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BILLING
// ============================================================
function BillingTemplate() {
  return (
    <div
      className="grid gap-6"
      style={{ background: "var(--lm-color-bg)", padding: "1.5rem" }}
    >
      <div className="lm-page-header">
        <div>
          <h1 className="lm-page-title">Billing & subscriptions</h1>
          <p className="lm-page-description">Manage your plan, usage, and invoices.</p>
        </div>
        <div className="flex gap-2">
          <button className="lm-btn lm-btn-outline lm-btn-sm">Download tax docs</button>
          <button className="lm-btn lm-btn-primary lm-btn-sm">Upgrade plan</button>
        </div>
      </div>

      <div
        className="lm-card lm-card-gradient"
        style={{ borderColor: "var(--lm-color-primary)" }}
      >
        <div className="lm-card-body grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <span className="lm-badge lm-badge-primary">Growth plan</span>
              <span className="text-sm text-[var(--lm-color-muted)]">Annual · renews Apr 2027</span>
            </div>
            <div className="text-4xl font-bold tracking-tight">
              $24,960 <span className="text-base font-medium text-[var(--lm-color-muted)]">/ mo</span>
            </div>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Includes 200 seats, 500K events/mo, 90-day audit retention.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="lm-btn lm-btn-primary lm-btn-sm">Manage seats</button>
              <button className="lm-btn lm-btn-outline lm-btn-sm">Change plan</button>
            </div>
          </div>
          <div className="grid gap-3">
            <UsageRow label="Seats" used={142} max={200} />
            <UsageRow label="Storage" used={184} max={250} unit="GB" />
            <UsageRow label="API calls" used={8.2} max={30} unit="M" decimals={1} />
            <UsageRow label="Audit retention" used={62} max={90} unit="days" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "$0",
            period: "Free forever",
            cta: "Current",
            ctaVariant: "outline",
            features: ["3 workspaces", "5,000 events / month", "14-day retention", "Community support"]
          },
          {
            name: "Growth",
            price: "$199",
            period: "per workspace / month",
            highlight: true,
            cta: "Active",
            ctaVariant: "primary",
            features: [
              "Unlimited workspaces",
              "500K events / month",
              "90-day audit retention",
              "SSO + SCIM",
              "Email support"
            ]
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "Talk to us",
            cta: "Contact sales",
            ctaVariant: "outline",
            features: [
              "Custom retention",
              "Audit log API",
              "DPA + BAA",
              "Dedicated CSM",
              "99.99% SLA"
            ]
          }
        ].map((plan) => (
          <div
            key={plan.name}
            className={`lm-card ${plan.highlight ? "lm-card-gradient" : ""}`}
            style={
              plan.highlight
                ? {
                    borderColor: "var(--lm-color-primary)",
                    boxShadow: "var(--lm-shadow-glow)"
                  }
                : undefined
            }
          >
            <div className="lm-card-body grid gap-5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="lm-card-title text-lg">{plan.name}</h3>
                {plan.highlight && (
                  <span className="lm-badge lm-badge-primary">Recommended</span>
                )}
              </div>
              <div className="grid gap-1">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="lm-hint text-sm">{plan.period}</span>
              </div>
              <ul className="grid gap-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      className="lm-badge lm-badge-success lm-badge-dot mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`lm-btn lm-btn-block lm-btn-${plan.ctaVariant}`}
                disabled={plan.cta === "Active"}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h3 className="lm-card-title">Usage trend</h3>
              <p className="lm-card-subtitle">API calls per day, last 30 days</p>
            </div>
            <div className="lm-segmented">
              <button className="lm-segmented-item">7d</button>
              <button className="lm-segmented-item" aria-pressed="true">
                30d
              </button>
              <button className="lm-segmented-item">90d</button>
            </div>
          </div>
          <div className="lm-card-body">
            <BarChart
              values={[
                42, 58, 65, 72, 51, 39, 28, 48, 62, 71, 82, 78, 64, 52, 38, 56, 78, 92, 88, 76, 64,
                52, 68, 84, 96, 88, 72, 58, 84, 102
              ]}
              labels={["1", "5", "10", "15", "20", "25", "30"]}
              color="primary"
              height={200}
            />
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h3 className="lm-card-title">Payment method</h3>
          </div>
          <div className="lm-card-body grid gap-4">
            <div
              className="rounded-xl p-5 text-[var(--lm-color-primary-fg)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
              }}
            >
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Visa
                  </span>
                  <span className="text-xs opacity-70">Exp 12/27</span>
                </div>
                <div className="font-mono text-lg tracking-widest">•••• •••• •••• 4242</div>
                <div className="flex items-center justify-between text-xs">
                  <span>ATLAS FINANCE</span>
                  <span className="opacity-70">Default</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="lm-btn lm-btn-outline lm-btn-sm">Update</button>
              <button className="lm-btn lm-btn-ghost lm-btn-sm">+ Add backup</button>
            </div>
          </div>
        </section>
      </div>

      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h3 className="lm-card-title">Invoices</h3>
            <p className="lm-card-subtitle">12 months · all paid</p>
          </div>
          <button className="lm-btn lm-btn-outline lm-btn-sm">Export all</button>
        </div>
        <div className="lm-card-body">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Plan</th>
                <th className="text-right">Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: "Apr 1, 2026", n: "INV-1042", p: "Growth", a: "$24,960" },
                { d: "Mar 1, 2026", n: "INV-1031", p: "Growth", a: "$24,960" },
                { d: "Feb 1, 2026", n: "INV-1019", p: "Growth", a: "$23,440" },
                { d: "Jan 1, 2026", n: "INV-1008", p: "Growth", a: "$22,180" }
              ].map((row) => (
                <tr key={row.n}>
                  <td>{row.d}</td>
                  <td>
                    <code className="lm-code">{row.n}</code>
                  </td>
                  <td>
                    <span className="lm-badge lm-badge-soft">{row.p}</span>
                  </td>
                  <td className="text-right tabular-nums font-medium">{row.a}</td>
                  <td>
                    <span className="lm-badge lm-badge-success lm-badge-dot">Paid</span>
                  </td>
                  <td>
                    <button className="lm-btn lm-btn-ghost lm-btn-sm">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function UsageRow({
  label,
  used,
  max,
  unit,
  decimals
}: {
  label: string;
  used: number;
  max: number;
  unit?: string;
  decimals?: number;
}) {
  const pct = (used / max) * 100;
  const tone = pct > 90 ? "danger" : pct > 70 ? "warning" : "primary";
  const fmt = (n: number) => (decimals ? n.toFixed(decimals) : n.toString());
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--lm-color-muted)]">
          {fmt(used)}
          {unit ? ` ${unit}` : ""} / {fmt(max)}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div
        style={{
          background: "var(--lm-color-surface-raised)",
          borderRadius: "999px",
          height: "0.5rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, color-mix(in oklab, var(--lm-color-${tone}) 80%, white), var(--lm-color-${tone}))`,
            borderRadius: "999px",
            height: "100%",
            transition: "width 600ms ease",
            width: `${Math.min(pct, 100)}%`
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// KANBAN
// ============================================================
function KanbanTemplate() {
  const columns = [
    {
      title: "Backlog",
      tone: "soft",
      cards: [
        {
          title: "Audit log streaming",
          desc: "Stream privileged events to S3 + GCS sinks.",
          labels: ["infra", "0.4"],
          assignees: [{ initials: "MK" }],
          priority: "Low",
          due: "May 14"
        },
        {
          title: "Per-tenant theming UI",
          desc: "Admin can upload a logo and pick brand colors.",
          labels: ["design", "0.3"],
          assignees: [{ initials: "AL" }, { initials: "RS" }],
          priority: "Med",
          due: "May 6"
        },
        {
          title: "Webhook retry policy",
          desc: "Exponential backoff with jitter.",
          labels: ["api"],
          assignees: [{ initials: "SP" }],
          priority: "Low"
        }
      ]
    },
    {
      title: "In progress",
      tone: "info",
      cards: [
        {
          title: "Combobox component",
          desc: "Headless behavior + listbox markup.",
          labels: ["ui", "0.3"],
          assignees: [{ initials: "MK" }],
          priority: "High",
          due: "Apr 30",
          progress: 64
        },
        {
          title: "Date picker calendar",
          desc: "Range mode + keyboard navigation.",
          labels: ["ui", "0.3"],
          assignees: [{ initials: "AL" }],
          priority: "Med",
          due: "May 2",
          progress: 38
        }
      ]
    },
    {
      title: "Review",
      tone: "warning",
      cards: [
        {
          title: "OTP slot animation",
          desc: "Tighten the focus + filled transitions.",
          labels: ["polish"],
          assignees: [{ initials: "RS" }],
          priority: "Low",
          due: "Apr 28"
        }
      ]
    },
    {
      title: "Done",
      tone: "success",
      cards: [
        {
          title: "Stepper component",
          labels: ["ui"],
          assignees: [{ initials: "MK" }],
          priority: "Med"
        },
        {
          title: "Glass card variant",
          labels: ["polish"],
          assignees: [{ initials: "AL" }],
          priority: "Low"
        },
        {
          title: "Theme runtime swap",
          labels: ["theming"],
          assignees: [{ initials: "RS" }, { initials: "MK" }],
          priority: "High"
        }
      ]
    }
  ];

  return (
    <div style={{ background: "var(--lm-color-bg)", padding: "1.5rem" }}>
      <div className="lm-page-header mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
            <span>Engineering</span> <span>/</span> <span>Sprint 24</span>
          </div>
          <h1 className="lm-page-title mt-2">Lumora UI 0.3</h1>
          <p className="lm-page-description">9 cards in flight · ends Friday May 2</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Filter cards…" />
          </div>
          <div className="lm-segmented">
            <button className="lm-segmented-item" aria-pressed="true">
              Board
            </button>
            <button className="lm-segmented-item">List</button>
            <button className="lm-segmented-item">Timeline</button>
          </div>
          <div className="lm-avatar-group">
            <span className="lm-avatar lm-avatar-sm">AL</span>
            <span
              className="lm-avatar lm-avatar-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
              }}
            >
              MK
            </span>
            <span
              className="lm-avatar lm-avatar-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--lm-color-success), var(--lm-color-info))"
              }}
            >
              RS
            </span>
            <span className="lm-avatar-stack-more">+2</span>
          </div>
          <button className="lm-btn lm-btn-outline lm-btn-sm">Filter</button>
          <button className="lm-btn lm-btn-primary lm-btn-sm">+ New card</button>
        </div>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(4, minmax(16rem, 1fr))",
          overflowX: "auto"
        }}
      >
        {columns.map((col) => (
          <div key={col.title} className="grid gap-3">
            <div
              className="flex items-center justify-between rounded-lg border border-[var(--lm-color-border)] bg-[var(--lm-color-surface-raised)] px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full bg-[var(--lm-color-${col.tone})]`} />
                <strong className="text-sm">{col.title}</strong>
                <span className={`lm-badge lm-badge-${col.tone} lm-badge-dot text-xs`}>
                  {col.cards.length}
                </span>
              </div>
              <button
                className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                aria-label="Add card"
              >
                +
              </button>
            </div>
            {col.cards.map((card: any) => (
              <article
                key={card.title}
                className="lm-card lm-card-interactive"
                style={{ cursor: "grab" }}
              >
                <div className="lm-card-body grid gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-sm leading-snug">{card.title}</strong>
                    <button
                      className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                      aria-label="More"
                      style={{ marginRight: "-0.5rem" }}
                    >
                      ⋯
                    </button>
                  </div>
                  {card.desc && <p className="lm-hint text-xs">{card.desc}</p>}
                  {card.labels && (
                    <div className="flex flex-wrap gap-1.5">
                      {card.labels.map((l: string) => (
                        <span className="lm-badge lm-badge-soft text-xs" key={l}>
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                  {card.progress !== undefined && (
                    <div className="grid gap-1">
                      <div className="flex justify-between text-[10px] text-[var(--lm-color-muted)]">
                        <span>Progress</span>
                        <span>{card.progress}%</span>
                      </div>
                      <progress
                        className="lm-progress lm-progress-sm"
                        value={card.progress}
                        max={100}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="lm-avatar-group">
                      {card.assignees.map((a: any, i: number) => (
                        <span
                          key={i}
                          className="lm-avatar lm-avatar-xs"
                          style={
                            i === 1
                              ? {
                                  background:
                                    "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
                                }
                              : undefined
                          }
                        >
                          {a.initials}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--lm-color-muted)]">
                      <span
                        className={`lm-badge ${
                          card.priority === "High"
                            ? "lm-badge-danger"
                            : card.priority === "Med"
                            ? "lm-badge-warning"
                            : "lm-badge-soft"
                        } text-[10px]`}
                      >
                        {card.priority}
                      </span>
                      {card.due && <span>📅 {card.due}</span>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <button
              className="lm-btn lm-btn-ghost lm-btn-sm w-full"
              style={{
                border: "1px dashed var(--lm-color-border)",
                color: "var(--lm-color-muted)"
              }}
            >
              + Add card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MARKETING
// ============================================================
function MarketingTemplate() {
  return (
    <div style={{ background: "var(--lm-color-bg)" }}>
      {/* Hero */}
      <div
        className="relative px-8 pt-20 pb-24 text-center"
        style={{
          background:
            "radial-gradient(28rem 22rem at 50% 0%, color-mix(in oklab, var(--lm-color-primary) 28%, transparent), transparent 60%), radial-gradient(28rem 22rem at 80% 30%, color-mix(in oklab, var(--lm-color-accent) 22%, transparent), transparent 60%), radial-gradient(28rem 22rem at 20% 50%, color-mix(in oklab, var(--lm-color-info) 16%, transparent), transparent 60%)"
        }}
      >
        <span className="lm-badge lm-badge-soft lm-badge-dot mb-6">
          Now in beta · Free for early teams
        </span>
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-bold tracking-tight md:text-7xl">
          <span className="docs-headline">The compliance platform</span>
          <br />
          <span className="docs-accent-text">your auditors will love.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--lm-color-muted)]">
          Continuous SOC 2, ISO 27001, and HIPAA evidence collection. Wired into the tools your
          team already uses. No agents. No audits-of-audits.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="lm-btn lm-btn-primary lm-btn-xl">Start free 14-day trial</button>
          <button className="lm-btn lm-btn-outline lm-btn-xl">Book a demo</button>
        </div>
        <p className="mt-4 text-xs text-[var(--lm-color-muted)]">
          No credit card · 5-minute setup · Cancel anytime
        </p>

        {/* Hero product preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="lm-card lm-card-glass overflow-hidden p-2">
            <div
              className="rounded-lg p-6"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 6%, var(--lm-color-surface)), var(--lm-color-surface))"
              }}
            >
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="docs-code-window-dot" />
                    <span className="docs-code-window-dot" />
                    <span className="docs-code-window-dot" />
                  </div>
                  <span className="lm-badge lm-badge-soft">Live · 47 controls passing</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Controls covered", value: "247", trend: "▲ 12 this week" },
                    { label: "Evidence items", value: "1,842", trend: "▲ 184 today" },
                    { label: "Compliance score", value: "98%", trend: "🛡 SOC 2 ready" }
                  ].map((s) => (
                    <div className="lm-stat" key={s.label}>
                      <span className="lm-stat-label">{s.label}</span>
                      <span className="lm-stat-value">{s.value}</span>
                      <span className="lm-stat-trend lm-stat-trend-up">{s.trend}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-md p-4"
                  style={{ background: "var(--lm-color-surface-sunken)" }}
                >
                  <AreaChart
                    height={140}
                    showLegend={false}
                    showGrid={false}
                    series={[
                      {
                        label: "Controls",
                        color: "primary",
                        values: [42, 48, 52, 56, 62, 68, 72, 78, 84, 92, 102, 118, 132, 148, 168, 184, 198, 214, 226, 238, 247]
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo wall */}
      <div
        className="border-y border-[var(--lm-color-border)] py-12"
        style={{ background: "var(--lm-color-surface)" }}
      >
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--lm-color-muted)]">
          Trusted by teams shipping to production
        </p>
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-3 items-center gap-x-8 gap-y-6 px-6 sm:grid-cols-6">
          {["Atlas", "Northstar", "Vector", "Helios", "Borealis", "Quartz"].map((name) => (
            <div
              key={name}
              className="text-center text-base font-bold tracking-tight text-[var(--lm-color-muted)]"
              style={{ opacity: 0.7 }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="docs-section-eyebrow justify-center">Everything you need</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight">
              <span className="docs-headline">Compliance, fully automated.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "spark",
                title: "Continuous evidence",
                body:
                  "Scans 40+ tools every hour and files findings to your auditor in one click."
              },
              {
                icon: "shield",
                title: "Frameworks built-in",
                body: "SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR — out of the box, mapped to your stack."
              },
              {
                icon: "scale",
                title: "Audit log API",
                body:
                  "Stream every privileged action to your SIEM with immutable, queryable retention."
              },
              {
                icon: "globe",
                title: "Vendor risk",
                body:
                  "Auto-assess subprocessors. Renewal alerts before SOC 2 reports go stale."
              },
              {
                icon: "wand",
                title: "Policy generator",
                body:
                  "AI-drafted policies grounded in your real config — not generic templates."
              },
              {
                icon: "command",
                title: "Slack-native",
                body:
                  "Approvals, evidence requests, and remediation — all in your existing channels."
              }
            ].map((f) => (
              <div className="docs-feature-card p-6" key={f.title}>
                <div className="grid gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--lm-color-primary)]"
                    style={{ background: "var(--lm-color-primary-soft)" }}
                  >
                    <Icon name={f.icon as any} size={22} />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="text-sm text-[var(--lm-color-muted)]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big stats */}
      <div
        className="border-y border-[var(--lm-color-border)] px-8 py-20"
        style={{ background: "var(--lm-color-surface-sunken)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1,200+", label: "Production teams" },
              { value: "$0", label: "Cost of a missed audit" },
              { value: "94%", label: "Less prep time" },
              { value: "8 days", label: "Average to SOC 2 ready" }
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-5xl font-bold tracking-tight">
                  <span className="docs-accent-text">{s.value}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--lm-color-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="docs-feature-card p-10">
            <div className="grid gap-6">
              <div className="flex items-center gap-1 text-xl text-[var(--lm-color-warning)]">
                ★ ★ ★ ★ ★
              </div>
              <blockquote className="text-balance text-2xl font-medium leading-relaxed">
                "We went from spending 3 weeks per quarter on SOC 2 evidence collection to 2 hours.
                Lumora pays for itself in the first audit."
              </blockquote>
              <div className="flex items-center gap-3">
                <span
                  className="lm-avatar lm-avatar-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--lm-color-primary), var(--lm-color-accent))"
                  }}
                >
                  SC
                </span>
                <div>
                  <strong>Sam Chen</strong>
                  <p className="text-sm text-[var(--lm-color-muted)]">VP Engineering, Atlas Finance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-8 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="docs-section-eyebrow justify-center">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              <span className="docs-headline">Common questions</span>
            </h2>
          </div>
          <div className="mt-10 lm-accordion">
            {[
              {
                q: "How long does setup take?",
                a: "Median is 5 minutes. Connect your IdP, code repo, and cloud provider — Lumora maps the rest automatically."
              },
              {
                q: "Do you support custom controls?",
                a: "Yes — define unlimited custom controls with mapped evidence, owners, and renewal cadence."
              },
              {
                q: "Can we self-host?",
                a: "Self-host (BYOC) is available on Enterprise plans, deployed in your AWS or GCP account with a one-line Terraform module."
              },
              {
                q: "What's your SLA?",
                a: "99.95% on Growth, 99.99% on Enterprise with credits and a named CSM."
              },
              {
                q: "Do you sign a DPA / BAA?",
                a: "Yes — both DPA and BAA are standard on Growth and above. Custom MSAs for Enterprise."
              }
            ].map((item, idx) => (
              <div className="lm-accordion-item" key={idx}>
                <button
                  className="lm-accordion-trigger"
                  aria-expanded={idx === 0 ? "true" : "false"}
                >
                  {item.q}
                </button>
                <div className="lm-accordion-content" hidden={idx !== 0}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 pb-20">
        <div
          className="mx-auto max-w-5xl rounded-2xl p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 16%, var(--lm-color-surface)), color-mix(in oklab, var(--lm-color-accent) 12%, var(--lm-color-surface)))"
          }}
        >
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight">
            <span className="docs-headline">Get audit-ready in 8 days.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--lm-color-muted)]">
            14-day free trial. No credit card. White-glove onboarding.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="lm-btn lm-btn-primary lm-btn-lg">Start free trial</button>
            <button className="lm-btn lm-btn-outline lm-btn-lg">Talk to sales</button>
          </div>
        </div>
      </div>
    </div>
  );
}
