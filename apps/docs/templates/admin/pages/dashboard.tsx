import Link from "next/link";
import { AreaChart, DonutChart } from "../../../components/chart";
import { AccountAvatar, PersonAvatar } from "../components/account-avatar";
import { KpiTile } from "../components/kpi-tile";
import { MiniSpark } from "../components/mini-spark";
import { accounts, formatMoney, statusLabel, statusTone } from "../data/accounts";
import { recentActivity } from "../data/activity";

export function DashboardPage() {
  const topAccounts = [...accounts].sort((a, b) => b.spendYtd - a.spendYtd).slice(0, 5);
  const planMix = countByPlan();

  return (
    <div className="grid gap-6">
      {/* Page header */}
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Workspace · Atlas
          </p>
          <h1 className="lm-page-title mt-1">Welcome back, Alex</h1>
          <p className="lm-page-description">
            Live workspace metrics across {accounts.length} accounts. Refreshed 2 minutes ago.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented" role="radiogroup" aria-label="Time range">
            <button type="button" className="lm-segmented-item">24h</button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">7 days</button>
            <button type="button" className="lm-segmented-item">30 days</button>
            <button type="button" className="lm-segmented-item">Quarter</button>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export CSV
          </button>
          <Link className="lm-btn lm-btn-primary lm-btn-sm" href="/preview/admin/accounts">
            + New account
          </Link>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <KpiTile
          label="Revenue · YTD"
          value="$1.28M"
          delta="12.4%"
          tone="up"
          values={[62, 68, 71, 65, 78, 82, 80, 85, 92, 95, 98, 102, 110, 118]}
          chartColor="success"
        />
        <KpiTile
          label="Active seats"
          value="18,420"
          delta="3.1% MoM"
          tone="up"
          values={[45, 48, 52, 50, 56, 60, 58, 62, 66, 68, 70, 72, 75, 78]}
          chartColor="primary"
        />
        <KpiTile
          label="Risk reviews"
          value="37"
          delta="8 open"
          tone="down"
          values={[28, 32, 38, 42, 48, 52, 48, 44, 42, 40, 38, 37, 37, 37]}
          chartColor="warning"
        />
        <KpiTile
          label="SLA breaches"
          value="0"
          delta="90 days clean"
          tone="flat"
          values={[2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          chartColor="info"
        />
      </div>

      {/* Chart row */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Revenue & active seats</h2>
              <p className="lm-card-subtitle">Last 30 days · USD thousands · seat count ÷ 100</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Compare
              </button>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Download
              </button>
            </div>
          </div>
          <div className="lm-card-body">
            <AreaChart
              height={260}
              series={[
                {
                  label: "Revenue (k)",
                  color: "primary",
                  values: [
                    62, 68, 71, 65, 78, 82, 80, 85, 92, 95, 98, 96, 102, 110, 115, 118, 122,
                    128, 135, 130, 138, 142, 148, 152, 158, 162, 168, 172, 178, 184
                  ]
                },
                {
                  label: "Seats (×100)",
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
            <h2 className="lm-card-title">Plan mix</h2>
            <p className="lm-card-subtitle">Active accounts by plan</p>
          </div>
          <div className="lm-card-body grid place-items-center">
            <DonutChart
              segments={[
                { label: "Enterprise", value: planMix.Enterprise, color: "primary" },
                { label: "Growth", value: planMix.Growth, color: "accent" },
                { label: "Trial", value: planMix.Trial, color: "warning" },
                { label: "Starter", value: planMix.Starter, color: "info" }
              ]}
            />
          </div>
        </section>
      </div>

      {/* Top accounts + activity */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Top accounts</h2>
              <p className="lm-card-subtitle">By YTD spend</p>
            </div>
            <Link className="lm-btn lm-btn-outline lm-btn-sm" href="/preview/admin/accounts">
              View all {accounts.length} →
            </Link>
          </div>
          <div className="lm-card-body">
            <table className="lm-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th className="text-right">MRR</th>
                  <th className="text-right">YTD</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <Link
                        href={`/preview/admin/accounts/${a.id}`}
                        className="flex items-center gap-3 text-inherit no-underline hover:text-[var(--lm-color-primary)]"
                      >
                        <AccountAvatar account={a} size="xs" />
                        <div>
                          <strong className="text-sm">{a.name}</strong>
                          <p className="lm-hint text-xs">{a.domain}</p>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <span className="lm-badge lm-badge-soft text-xs">{a.plan}</span>
                    </td>
                    <td>
                      <span className={`lm-badge lm-badge-${statusTone[a.status]} lm-badge-dot text-xs`}>
                        {statusLabel[a.status]}
                      </span>
                    </td>
                    <td className="text-right tabular-nums">{formatMoney(a.mrr)}</td>
                    <td className="text-right tabular-nums font-medium">{formatMoney(a.spendYtd)}</td>
                    <td>
                      <MiniSpark
                        values={a.trendValues}
                        color={a.trend === "up" ? "success" : a.trend === "down" ? "danger" : "info"}
                      />
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
              <h2 className="lm-card-title">Activity</h2>
              <p className="lm-card-subtitle">Today</p>
            </div>
            <div className="lm-card-body">
              <ul className="lm-activity-feed">
                {recentActivity.slice(0, 5).map((e) => (
                  <li className="lm-activity-item" key={e.id}>
                    <PersonAvatar initials={e.whoInitials} bg={e.whoBg} />
                    <div className="lm-activity-content">
                      <p className="text-sm">
                        <strong>{e.who}</strong> {e.action}{" "}
                        {e.target && (
                          <strong className="text-[var(--lm-color-text)]">{e.target}</strong>
                        )}
                      </p>
                      <span className="lm-activity-meta">{e.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Quick actions</h2>
            </div>
            <div className="lm-card-body grid gap-1">
              {[
                { label: "Invite teammate", icon: "↗" },
                { label: "Rotate API key", icon: "🔑" },
                { label: "Run audit export", icon: "↓" },
                { label: "Configure SSO", icon: "🛡" }
              ].map((a) => (
                <button
                  key={a.label}
                  type="button"
                  className="lm-btn lm-btn-ghost flex items-center justify-between text-left"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <span aria-hidden>{a.icon}</span>
                    {a.label}
                  </span>
                  <span aria-hidden className="text-[var(--lm-color-muted)]">→</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function countByPlan() {
  const counts = { Enterprise: 0, Growth: 0, Trial: 0, Starter: 0 };
  for (const a of accounts) counts[a.plan] += 1;
  return counts;
}
