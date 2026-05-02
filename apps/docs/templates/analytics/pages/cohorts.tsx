import { HeatmapCell, MetricTile } from "../components/atoms";
import { avgRetentionAt, cohortHeaders, cohorts } from "../data/cohorts";
import { formatNumber } from "../data/events";

export function CohortsPage() {
  const totalUsers = cohorts.reduce((s, c) => s + c.size, 0);
  const w1 = avgRetentionAt(1);
  const w4 = avgRetentionAt(4);
  const w8 = avgRetentionAt(8);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Insights · Cohorts
          </p>
          <h1 className="lm-page-title mt-1">Retention cohorts</h1>
          <p className="lm-page-description">
            Weekly cohorts × N-week retention · {cohorts.length} cohorts ·{" "}
            {formatNumber(totalUsers)} users
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="lm-select lm-select-sm" defaultValue="signup">
            <option value="signup">Cohort by signup week</option>
            <option>Cohort by first purchase</option>
            <option>Cohort by acquisition source</option>
          </select>
          <select className="lm-select lm-select-sm" defaultValue="any">
            <option value="any">Any retention event</option>
            <option>page.view</option>
            <option>session.start</option>
            <option>checkout.completed</option>
          </select>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export CSV
          </button>
        </div>
      </header>

      {/* KPI strip — N-week retention averages */}
      <div className="lm-stat-grid">
        <MetricTile
          label="Cohorts tracked"
          value={`${cohorts.length}`}
          caption="weekly · last 12 weeks"
        />
        <MetricTile
          label="Avg N1 retention"
          value={`${w1}%`}
          delta="6pp"
          tone="up"
          caption="users active a week later"
        />
        <MetricTile
          label="Avg N4 retention"
          value={`${w4}%`}
          delta="2pp"
          tone="up"
          caption="users active 4 weeks in"
        />
        <MetricTile
          label="Avg N8 retention"
          value={w8 > 0 ? `${w8}%` : "—"}
          tone="up"
          caption="long-term retention floor"
        />
      </div>

      {/* Heatmap */}
      <section className="lm-card overflow-hidden">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Retention heatmap</h2>
            <p className="lm-card-subtitle">
              % of cohort active in week N · stronger fill = better retention
            </p>
          </div>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              %
            </button>
            <button type="button" className="lm-segmented-item">
              Count
            </button>
          </div>
        </div>
        <div className="lm-card-body overflow-x-auto">
          <div
            className="grid gap-1.5 min-w-[64rem]"
            style={{
              gridTemplateColumns: "10rem 5rem repeat(12, minmax(3.25rem, 1fr))"
            }}
          >
            {/* Header row */}
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--lm-color-muted)]">
              Cohort
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--lm-color-muted)] text-right">
              Size
            </div>
            {cohortHeaders.map((h) => (
              <div
                key={h}
                className="text-center text-[10px] font-bold uppercase tracking-wider text-[var(--lm-color-muted)]"
              >
                {h.replace("Week ", "W")}
              </div>
            ))}

            {/* Rows */}
            {cohorts.map((c) => (
              <CohortRow key={c.label} cohort={c} />
            ))}

            {/* Footer — averages */}
            <div className="mt-2 text-xs font-bold tracking-tight">
              Average
            </div>
            <div className="mt-2 text-xs text-[var(--lm-color-muted)] tabular-nums text-right">
              {formatNumber(totalUsers)}
            </div>
            {cohortHeaders.map((_, i) => {
              const avg = avgRetentionAt(i);
              return (
                <div key={i} className="mt-2">
                  <HeatmapCell value={avg} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Best cohort</h2>
          </div>
          <div className="lm-card-body grid gap-3">
            {(() => {
              const best = [...cohorts]
                .filter((c) => c.retention.length >= 5)
                .sort((a, b) => (b.retention[4] ?? 0) - (a.retention[4] ?? 0))[0];
              return (
                <>
                  <div className="flex items-center justify-between">
                    <strong>{best.label}</strong>
                    <span className="lm-badge lm-badge-success lm-badge-dot">
                      N4 · {best.retention[4]}%
                    </span>
                  </div>
                  <p className="text-sm text-[var(--lm-color-muted)]">
                    {formatNumber(best.size)} users · {best.retention[1]}% one-week retention ·{" "}
                    {best.retention[4]}% four-week retention
                  </p>
                  <div className="grid grid-cols-12 gap-1">
                    {best.retention.map((v, i) => (
                      <HeatmapCell key={i} value={v} />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </article>

        <article className="lm-card">
          <div className="lm-card-header">
            <h2 className="lm-card-title">What changed in N1?</h2>
          </div>
          <div className="lm-card-body grid gap-3 text-sm">
            <p className="text-[var(--lm-color-muted)] leading-relaxed">
              Week-1 retention has improved from <strong>64%</strong> (Feb 8 cohort) to{" "}
              <strong>82%</strong> (Apr 26 cohort). The biggest jump correlates with our March 14
              onboarding redesign.
            </p>
            <ul className="grid gap-2">
              {[
                "March 14 · onboarding redesign · +8pp",
                "March 28 · email drip simplified · +3pp",
                "April 12 · in-product checklist · +5pp"
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs">
                  <span
                    className="lm-badge lm-badge-success lm-badge-dot mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm justify-self-start">
              Add annotation
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

function CohortRow({ cohort }: { cohort: { label: string; size: number; retention: number[] } }) {
  return (
    <>
      <div className="grid items-center text-sm">{cohort.label}</div>
      <div className="grid items-center text-right text-xs tabular-nums text-[var(--lm-color-muted)]">
        {cohort.size.toLocaleString()}
      </div>
      {Array.from({ length: 12 }, (_, i) => (
        <HeatmapCell key={i} value={cohort.retention[i]} />
      ))}
    </>
  );
}
