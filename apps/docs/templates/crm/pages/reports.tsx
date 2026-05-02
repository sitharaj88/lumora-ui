import { AreaChart, BarChart, DonutChart } from "../../../components/chart";
import { CrmAvatar } from "../components/avatar";
import { deals, formatValue, stageMeta } from "../data/deals";

type RepRow = {
  initials: string;
  name: string;
  bg: string;
  closedWon: number;
  closedWonValue: number;
  open: number;
  openValue: number;
  winRate: number;
};

function buildLeaderboard(): RepRow[] {
  const reps = new Map<string, RepRow>();
  for (const d of deals) {
    const key = d.ownerInitials;
    if (!reps.has(key)) {
      reps.set(key, {
        initials: d.ownerInitials,
        name: d.ownerName,
        bg: d.ownerBg,
        closedWon: 0,
        closedWonValue: 0,
        open: 0,
        openValue: 0,
        winRate: 0
      });
    }
    const rep = reps.get(key)!;
    if (d.stage === "closed-won") {
      rep.closedWon += 1;
      rep.closedWonValue += d.value;
    } else if (d.stage !== "closed-lost") {
      rep.open += 1;
      rep.openValue += d.value;
    }
  }
  for (const r of reps.values()) {
    const total = r.closedWon + r.open;
    r.winRate = total > 0 ? Math.round((r.closedWon / total) * 100) : 0;
  }
  return Array.from(reps.values()).sort((a, b) => b.closedWonValue - a.closedWonValue);
}

const sourceMix = (() => {
  const counts: Record<string, number> = {};
  for (const d of deals) counts[d.source] = (counts[d.source] ?? 0) + 1;
  return counts;
})();

export function ReportsPage() {
  const leaderboard = buildLeaderboard();
  const winnableValue = deals
    .filter((d) => d.stage !== "closed-lost")
    .reduce((s, d) => s + d.value, 0);
  const wonValue = deals.filter((d) => d.stage === "closed-won").reduce((s, d) => s + d.value, 0);
  const overallWinRate = Math.round(
    (deals.filter((d) => d.stage === "closed-won").length /
      deals.filter((d) => d.stage === "closed-won" || d.stage === "closed-lost").length) *
      100
  );
  const avgCycle = Math.round(deals.reduce((s, d) => s + d.ageDays, 0) / deals.length);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Workspace · Reports
          </p>
          <h1 className="lm-page-title mt-1">Reports</h1>
          <p className="lm-page-description">
            Win rate, cycle time, source attribution, and team leaderboard.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item">
              7d
            </button>
            <button type="button" className="lm-segmented-item">
              30d
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Quarter
            </button>
            <button type="button" className="lm-segmented-item">
              Year
            </button>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Schedule digest
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Win rate</span>
          <span className="lm-stat-value tabular-nums">{overallWinRate}%</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 4pp vs Q1</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Pipeline + won</span>
          <span className="lm-stat-value tabular-nums">{formatValue(winnableValue)}</span>
          <span className="lm-stat-trend">{deals.length - 1} active deals</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Avg cycle time</span>
          <span className="lm-stat-value tabular-nums">{avgCycle}d</span>
          <span className="lm-stat-trend lm-stat-trend-down">▼ 6d vs Q1</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Won this quarter</span>
          <span className="lm-stat-value tabular-nums">{formatValue(wonValue)}</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 22%</span>
        </div>
      </div>

      {/* Trend chart + sources donut */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="lm-card">
          <div className="lm-card-header flex items-center justify-between">
            <div>
              <h2 className="lm-card-title">Pipeline value · last 12 weeks</h2>
              <p className="lm-card-subtitle">Open + weighted forecast</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Compare
              </button>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Drill in
              </button>
            </div>
          </div>
          <div className="lm-card-body">
            <AreaChart
              height={240}
              series={[
                {
                  label: "Pipeline",
                  color: "primary",
                  values: [620, 680, 712, 750, 780, 820, 880, 940, 1020, 1080, 1140, 1240]
                },
                {
                  label: "Weighted",
                  color: "success",
                  values: [240, 268, 282, 305, 330, 352, 384, 420, 462, 498, 538, 588]
                }
              ]}
            />
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Source mix</h2>
            <p className="lm-card-subtitle">Active deals by source</p>
          </div>
          <div className="lm-card-body grid place-items-center">
            <DonutChart
              segments={[
                { label: "Outbound", value: sourceMix.Outbound ?? 0, color: "primary" },
                { label: "Inbound", value: sourceMix.Inbound ?? 0, color: "info" },
                { label: "Referral", value: sourceMix.Referral ?? 0, color: "success" },
                { label: "Marketing", value: sourceMix.Marketing ?? 0, color: "warning" },
                { label: "Partner", value: sourceMix.Partner ?? 0, color: "accent" }
              ]}
            />
          </div>
        </section>
      </div>

      {/* Stage funnel + cycle bar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Stage funnel</h2>
            <p className="lm-card-subtitle">Deal counts at each stage</p>
          </div>
          <div className="lm-card-body grid gap-3">
            {(["prospecting", "qualifying", "proposal", "negotiation", "closed-won"] as const).map(
              (stage) => {
                const count = deals.filter((d) => d.stage === stage).length;
                const meta = stageMeta[stage];
                const max = Math.max(
                  ...["prospecting", "qualifying", "proposal", "negotiation", "closed-won"].map(
                    (s) => deals.filter((d) => d.stage === (s as typeof stage)).length
                  )
                );
                const pct = (count / max) * 100;
                return (
                  <div key={stage} className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: `var(--lm-color-${meta.color})` }}
                          aria-hidden="true"
                        />
                        <strong>{meta.label}</strong>
                      </div>
                      <span className="tabular-nums text-[var(--lm-color-muted)]">
                        {count} deal{count === 1 ? "" : "s"}
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
                          background: `linear-gradient(90deg, color-mix(in oklab, var(--lm-color-${meta.color}) 80%, white), var(--lm-color-${meta.color}))`,
                          borderRadius: "999px",
                          height: "100%",
                          width: `${pct}%`
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        <section className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Activities · last 4 weeks</h2>
            <p className="lm-card-subtitle">Calls, emails, meetings, notes</p>
          </div>
          <div className="lm-card-body">
            <BarChart
              values={[
                18, 24, 22, 28, 26, 32, 38, 34, 30, 36, 42, 48, 44, 38, 34, 30, 28, 32, 36, 40, 38,
                32, 28, 26, 30, 34, 38, 42
              ]}
              labels={["W1", "W2", "W3", "W4"]}
              color="success"
              height={200}
            />
          </div>
        </section>
      </div>

      {/* Leaderboard */}
      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Leaderboard</h2>
            <p className="lm-card-subtitle">Closed won + open pipeline by rep</p>
          </div>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Won
            </button>
            <button type="button" className="lm-segmented-item">
              Open pipeline
            </button>
            <button type="button" className="lm-segmented-item">
              Win rate
            </button>
          </div>
        </div>
        <div className="lm-card-body">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Rep</th>
                <th className="text-right">Closed won</th>
                <th className="text-right">Won value</th>
                <th className="text-right">Open</th>
                <th className="text-right">Open value</th>
                <th>Win rate</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((r, i) => (
                <tr key={r.initials}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold tabular-nums w-5 text-[var(--lm-color-muted)]"
                        aria-label={`Rank ${i + 1}`}
                      >
                        #{i + 1}
                      </span>
                      <CrmAvatar initials={r.initials} bg={r.bg} size="sm" />
                      <strong>{r.name}</strong>
                    </div>
                  </td>
                  <td className="text-right tabular-nums">{r.closedWon}</td>
                  <td className="text-right tabular-nums font-medium">
                    {formatValue(r.closedWonValue)}
                  </td>
                  <td className="text-right tabular-nums">{r.open}</td>
                  <td className="text-right tabular-nums">{formatValue(r.openValue)}</td>
                  <td style={{ minWidth: "8rem" }}>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          background: "var(--lm-color-surface-raised)",
                          borderRadius: "999px",
                          flex: 1,
                          height: "0.375rem",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            background: "var(--lm-color-success)",
                            height: "100%",
                            width: `${r.winRate}%`
                          }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-[var(--lm-color-muted)]">
                        {r.winRate}%
                      </span>
                    </div>
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
