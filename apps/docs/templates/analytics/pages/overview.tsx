import Link from "next/link";
import { AreaChart, BarChart } from "../../../components/chart";
import { MetricTile } from "../components/atoms";
import {
  dailyMetrics,
  formatNumber,
  liveEvents,
  sourceTone,
  topEvents
} from "../data/events";

export function OverviewPage() {
  // Today's "now" values from the last entry of the daily series.
  const dau = dailyMetrics.activeUsers[dailyMetrics.activeUsers.length - 1];
  const dauPrev = dailyMetrics.activeUsers[dailyMetrics.activeUsers.length - 8];
  const signups = dailyMetrics.signups[dailyMetrics.signups.length - 1];
  const conversions = dailyMetrics.conversions[dailyMetrics.conversions.length - 1];
  const revenue = dailyMetrics.revenue[dailyMetrics.revenue.length - 1];

  const dauDelta = ((dau - dauPrev) / dauPrev) * 100;

  const last7DaysLabels = Array.from({ length: 30 }, (_, i) =>
    i % 5 === 0 ? `D${i + 1}` : ""
  );

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Insights · Live
          </p>
          <h1 className="lm-page-title mt-1">Product overview</h1>
          <p className="lm-page-description">
            Yesterday vs prior week · 30-day trend below · stream updated 12 seconds ago
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented" role="radiogroup" aria-label="Time range">
            <button type="button" className="lm-segmented-item">
              24h
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              7 days
            </button>
            <button type="button" className="lm-segmented-item">
              30 days
            </button>
            <button type="button" className="lm-segmented-item">
              Quarter
            </button>
          </div>
          <span className="lm-badge lm-badge-success lm-badge-dot text-xs">Live</span>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Compare
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New report
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <MetricTile
          label="Daily active users"
          value={formatNumber(dau)}
          delta={`${Math.abs(dauDelta).toFixed(1)}%`}
          tone={dauDelta >= 0 ? "up" : "down"}
          caption="vs prior week"
        />
        <MetricTile
          label="Signups today"
          value={formatNumber(signups)}
          delta="14.4%"
          tone="up"
          caption="rolling 7-day avg"
        />
        <MetricTile
          label="Conversions"
          value={formatNumber(conversions)}
          delta="8.1%"
          tone="up"
          caption="paid + trial → paid"
        />
        <MetricTile
          label="Revenue · today"
          value={`$${revenue.toFixed(1)}K`}
          delta="22.4%"
          tone="up"
          caption="USD · gross"
        />
      </div>

      {/* Trend chart row */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Active users · last 30 days</h2>
              <p className="lm-card-subtitle">
                Daily actives vs signups (×10 for visual scale)
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Annotate
              </button>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Share
              </button>
            </div>
          </div>
          <div className="lm-card-body">
            <AreaChart
              height={260}
              series={[
                {
                  label: "Daily active users",
                  color: "primary",
                  values: dailyMetrics.activeUsers
                },
                {
                  label: "Signups (×10)",
                  color: "info",
                  values: dailyMetrics.signups.map((v) => v * 10)
                }
              ]}
            />
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Conversions · daily</h2>
            <p className="lm-card-subtitle">Last 30 days</p>
          </div>
          <div className="lm-card-body">
            <BarChart
              values={dailyMetrics.conversions}
              labels={last7DaysLabels}
              color="success"
              height={220}
            />
          </div>
        </section>
      </div>

      {/* Top events + live stream */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Top events · last 7 days</h2>
              <p className="lm-card-subtitle">Sorted by volume</p>
            </div>
            <Link
              href="/preview/analytics/segments"
              className="lm-btn lm-btn-ghost lm-btn-sm no-underline"
            >
              Build a segment →
            </Link>
          </div>
          <div className="lm-card-body p-0">
            <table className="lm-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Category</th>
                  <th className="text-right">Count</th>
                  <th className="text-right">Δ vs prior</th>
                  <th className="text-right">Per DAU</th>
                </tr>
              </thead>
              <tbody>
                {topEvents.map((e) => (
                  <tr key={e.name}>
                    <td>
                      <code className="lm-code">{e.name}</code>
                    </td>
                    <td>
                      <span className="lm-badge lm-badge-soft text-xs">{e.category}</span>
                    </td>
                    <td className="text-right tabular-nums font-medium">{formatNumber(e.count)}</td>
                    <td
                      className="text-right tabular-nums text-xs font-bold"
                      style={{
                        color:
                          e.delta > 0
                            ? "var(--lm-color-success)"
                            : "var(--lm-color-danger)"
                      }}
                    >
                      {e.delta > 0 ? "▲" : "▼"} {Math.abs(e.delta).toFixed(1)}%
                    </td>
                    <td className="text-right tabular-nums text-xs text-[var(--lm-color-muted)]">
                      {(e.count / dau).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Live event stream</h2>
              <p className="lm-card-subtitle">Last 10 · auto-refresh</p>
            </div>
            <span className="lm-badge lm-badge-success lm-badge-dot text-xs">Streaming</span>
          </div>
          <div className="lm-card-body p-0">
            <ul className="grid divide-y divide-[var(--lm-color-border)]">
              {liveEvents.map((e) => (
                <li key={e.id} className="grid gap-2 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <code className="lm-code text-xs">{e.name}</code>
                    <span className="text-[10px] text-[var(--lm-color-muted)] tabular-nums">
                      {e.relativeTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="lm-avatar lm-avatar-xs flex-shrink-0"
                        style={{ background: e.userBg }}
                        aria-hidden="true"
                      >
                        {e.userInitials}
                      </span>
                      <span className="truncate">{e.user}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className={`lm-badge lm-badge-${sourceTone[e.source]} text-[10px]`}
                      >
                        {e.source}
                      </span>
                      <span className="text-[10px] text-[var(--lm-color-muted)] tabular-nums">
                        {e.country}
                      </span>
                      {e.value && (
                        <span className="text-[10px] font-bold text-[var(--lm-color-success)] tabular-nums">
                          {e.value}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Source / region split */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Active users by source</h2>
          </div>
          <div className="lm-card-body grid gap-3">
            {[
              { label: "Web", value: 68, count: 4042, color: "primary" },
              { label: "iOS app", value: 18, count: 1068, color: "info" },
              { label: "Android app", value: 11, count: 658, color: "success" },
              { label: "API", value: 3, count: 174, color: "accent" }
            ].map((s) => (
              <div key={s.label} className="grid gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <strong>{s.label}</strong>
                  <span className="tabular-nums text-[var(--lm-color-muted)] text-xs">
                    {formatNumber(s.count)} · {s.value}%
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--lm-color-surface-raised)",
                    borderRadius: "999px",
                    height: "0.4rem",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      background: `var(--lm-color-${s.color})`,
                      height: "100%",
                      width: `${s.value}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Top countries</h2>
          </div>
          <div className="lm-card-body grid gap-3">
            {[
              { label: "United States", value: 42, count: 2496, code: "US" },
              { label: "United Kingdom", value: 14, count: 832, code: "UK" },
              { label: "Germany", value: 11, count: 654, code: "DE" },
              { label: "Canada", value: 8, count: 476, code: "CA" },
              { label: "Japan", value: 6, count: 357, code: "JP" }
            ].map((c) => (
              <div key={c.label} className="grid gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <code className="lm-code text-xs">{c.code}</code>
                    <strong>{c.label}</strong>
                  </span>
                  <span className="tabular-nums text-[var(--lm-color-muted)] text-xs">
                    {formatNumber(c.count)}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--lm-color-surface-raised)",
                    borderRadius: "999px",
                    height: "0.4rem",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      background: "var(--lm-color-info)",
                      height: "100%",
                      width: `${(c.value / 42) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Quick links</h2>
          </div>
          <div className="lm-card-body grid gap-1">
            {[
              { label: "Open the funnel explorer", href: "/preview/analytics/funnels", desc: "6-step signup → paid" },
              { label: "View cohort retention", href: "/preview/analytics/cohorts", desc: "12 weekly cohorts" },
              { label: "Browse saved segments", href: "/preview/analytics/segments", desc: "6 active segments" },
              { label: "Schedule a digest", href: "/preview/analytics/reports", desc: "6 saved reports" }
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="lm-btn lm-btn-ghost flex items-center justify-between text-left no-underline"
              >
                <span className="grid gap-0.5">
                  <strong className="text-sm">{l.label}</strong>
                  <span className="text-[10px] text-[var(--lm-color-muted)]">{l.desc}</span>
                </span>
                <span aria-hidden className="text-[var(--lm-color-muted)]">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
