import { FunnelStepBar, MetricTile } from "../components/atoms";
import { formatNumber } from "../data/events";
import { funnels, segmentCompare } from "../data/funnels";

export function FunnelsPage() {
  const funnel = funnels[0]; // Signup → first paid plan
  const total = funnel.steps[0].count;
  const last = funnel.steps[funnel.steps.length - 1].count;
  const overallConversion = (last / total) * 100;
  const biggestDrop = funnel.steps
    .map((s, i) => ({ s, i, drop: i === 0 ? 0 : funnel.steps[i - 1].count - s.count }))
    .reduce((a, b) => (b.drop > a.drop ? b : a));

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Insights · Funnels
          </p>
          <h1 className="lm-page-title mt-1">Conversion funnels</h1>
          <p className="lm-page-description">
            6-step funnel · last 30 days · {formatNumber(total)} entered · {formatNumber(last)}{" "}
            converted
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="lm-select lm-select-sm" defaultValue={funnel.id}>
            {funnels.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item">
              7d
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              30d
            </button>
            <button type="button" className="lm-segmented-item">
              Quarter
            </button>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Save funnel
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New funnel
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <MetricTile
          label="Overall conversion"
          value={`${overallConversion.toFixed(1)}%`}
          delta="2.3pp"
          tone="up"
          caption={`${formatNumber(last)} of ${formatNumber(total)}`}
        />
        <MetricTile
          label="Biggest drop"
          value={`${(
            (biggestDrop.drop / funnel.steps[Math.max(biggestDrop.i - 1, 0)].count) *
            100
          ).toFixed(1)}%`}
          tone="down"
          caption={`${funnel.steps[biggestDrop.i - 1]?.name ?? "—"} → ${biggestDrop.s.name}`}
        />
        <MetricTile
          label="Median completion"
          value="9 days"
          delta="2 days"
          tone="up"
          caption="signup → paid"
        />
        <MetricTile
          label="In-flight"
          value={formatNumber(total - last)}
          caption="users still in funnel"
        />
      </div>

      {/* Description card */}
      <div className="lm-card">
        <div className="lm-card-body grid gap-2 p-4">
          <div className="flex items-center justify-between">
            <strong>{funnel.name}</strong>
            <span className="lm-badge lm-badge-soft text-xs">{funnel.category}</span>
          </div>
          <p className="lm-hint text-xs">{funnel.description}</p>
        </div>
      </div>

      {/* Main funnel viz */}
      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Funnel breakdown</h2>
            <p className="lm-card-subtitle">Step-over-step conversion · drop-off labelled inline</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
              Export CSV
            </button>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
              Annotate drop
            </button>
          </div>
        </div>
        <div className="lm-card-body grid gap-5">
          {funnel.steps.map((step, i) => (
            <FunnelStepBar
              key={step.name}
              index={i}
              name={step.name}
              count={step.count}
              total={total}
              previous={i === 0 ? null : funnel.steps[i - 1].count}
              avgTime={step.avgTime}
            />
          ))}
        </div>
      </section>

      {/* Segment compare */}
      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Compare segments</h2>
            <p className="lm-card-subtitle">Same 6 steps · split by acquisition source</p>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            + Add segment
          </button>
        </div>
        <div className="lm-card-body p-0">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Segment</th>
                {funnel.steps.map((s) => (
                  <th key={s.name} className="text-right">
                    {s.name}
                  </th>
                ))}
                <th className="text-right">Conv.</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ...segmentCompare.webDesktop, color: "primary" },
                { ...segmentCompare.webMobile, color: "info" },
                { ...segmentCompare.ios, color: "accent" },
                { ...segmentCompare.android, color: "success" }
              ].map((seg) => {
                const conv = (seg.values[seg.values.length - 1] / seg.values[0]) * 100;
                return (
                  <tr key={seg.name}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full flex-shrink-0"
                          style={{ background: `var(--lm-color-${seg.color})` }}
                          aria-hidden="true"
                        />
                        <strong className="text-sm">{seg.name}</strong>
                      </div>
                    </td>
                    {seg.values.map((v, i) => (
                      <td key={i} className="text-right tabular-nums text-sm">
                        {formatNumber(v)}
                      </td>
                    ))}
                    <td
                      className="text-right tabular-nums text-sm font-bold"
                      style={{
                        color:
                          conv >= 25
                            ? "var(--lm-color-success)"
                            : conv >= 15
                              ? "var(--lm-color-warning)"
                              : "var(--lm-color-danger)"
                      }}
                    >
                      {conv.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Time-between-steps */}
      <section className="lm-card">
        <div className="lm-card-header">
          <h2 className="lm-card-title">Time between steps</h2>
          <p className="lm-card-subtitle">Median time from previous step</p>
        </div>
        <div className="lm-card-body grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {funnel.steps.map((step, i) => (
            <div
              key={step.name}
              className="grid gap-1 rounded-lg border border-[var(--lm-color-border)] p-3 text-center"
              style={{ background: "var(--lm-color-surface-sunken)" }}
            >
              <span className="text-[10px] uppercase tracking-wider text-[var(--lm-color-muted)]">
                Step {i + 1}
              </span>
              <strong className="text-xs leading-tight">{step.name}</strong>
              <span className="text-base font-bold tabular-nums">{step.avgTime ?? "—"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
