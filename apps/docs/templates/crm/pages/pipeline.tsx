import { CrmAvatar } from "../components/avatar";
import { DealCard } from "../components/deal-card";
import {
  dealsByStage,
  formatValue,
  formatValueFull,
  pipelineStages,
  stageMeta,
  deals
} from "../data/deals";

export function PipelinePage() {
  const totalValue = deals
    .filter((d) => d.stage !== "closed-lost")
    .reduce((s, d) => s + d.value, 0);
  const wonThisQuarter = deals
    .filter((d) => d.stage === "closed-won")
    .reduce((s, d) => s + d.value, 0);
  const openCount = deals.filter(
    (d) => d.stage !== "closed-won" && d.stage !== "closed-lost"
  ).length;

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Sales · Pipeline
          </p>
          <h1 className="lm-page-title mt-1">Q2 pipeline</h1>
          <p className="lm-page-description">
            {openCount} open deals worth {formatValue(totalValue)} ·{" "}
            <strong className="text-[var(--lm-color-success)]">
              {formatValue(wonThisQuarter)} won
            </strong>{" "}
            this quarter
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Board
            </button>
            <button type="button" className="lm-segmented-item">
              List
            </button>
            <button type="button" className="lm-segmented-item">
              Forecast
            </button>
          </div>
          <div className="lm-avatar-group">
            <CrmAvatar
              initials="AB"
              bg="linear-gradient(135deg, var(--lm-color-danger), var(--lm-color-primary))"
            />
            <CrmAvatar
              initials="DC"
              bg="linear-gradient(135deg, var(--lm-color-danger), var(--lm-color-warning))"
            />
            <CrmAvatar
              initials="MC"
              bg="linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-primary))"
            />
            <CrmAvatar
              initials="RS"
              bg="linear-gradient(135deg, var(--lm-color-success), var(--lm-color-info))"
            />
            <span className="lm-avatar-stack-more">+2</span>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Filter
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New deal
          </button>
        </div>
      </header>

      {/* Forecast strip */}
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Open pipeline</span>
          <span className="lm-stat-value tabular-nums">{formatValue(totalValue)}</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 22% vs Q1</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Weighted forecast</span>
          <span className="lm-stat-value tabular-nums">
            {formatValue(
              deals
                .filter((d) => d.stage !== "closed-won" && d.stage !== "closed-lost")
                .reduce((s, d) => s + (d.value * d.probability) / 100, 0)
            )}
          </span>
          <span className="lm-stat-trend">based on stage probabilities</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Won this quarter</span>
          <span className="lm-stat-value tabular-nums">{formatValue(wonThisQuarter)}</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 2 deals</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Avg cycle</span>
          <span className="lm-stat-value tabular-nums">38d</span>
          <span className="lm-stat-trend lm-stat-trend-down">▼ 6d vs Q1</span>
        </div>
      </div>

      {/* Kanban board */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(5, minmax(18rem, 1fr))",
          overflowX: "auto",
          paddingBottom: "0.5rem"
        }}
      >
        {pipelineStages.map((stage) => {
          const stageDeals = dealsByStage(stage);
          const meta = stageMeta[stage];
          const total = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage} className="grid gap-3" style={{ minWidth: 0 }}>
              <div
                className="rounded-lg border px-3 py-2"
                style={{
                  borderColor: `color-mix(in oklab, var(--lm-color-${meta.color}) 30%, var(--lm-color-border))`,
                  background: `color-mix(in oklab, var(--lm-color-${meta.color}) 6%, var(--lm-color-surface))`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: `var(--lm-color-${meta.color})` }}
                      aria-hidden="true"
                    />
                    <strong className="text-sm">{meta.label}</strong>
                    <span className="lm-badge lm-badge-soft text-xs">{stageDeals.length}</span>
                  </div>
                  <span className="text-xs font-bold tabular-nums">{formatValue(total)}</span>
                </div>
              </div>

              {stageDeals.map((d) => (
                <DealCard key={d.id} deal={d} />
              ))}

              <button
                type="button"
                className="lm-btn lm-btn-ghost lm-btn-sm w-full"
                style={{
                  border: "1px dashed var(--lm-color-border)",
                  color: "var(--lm-color-muted)"
                }}
              >
                + Add deal
              </button>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <p className="text-xs text-[var(--lm-color-muted)]">
        Closed deals are archived after 90 days and exported to{" "}
        <code className="lm-code">/preview/crm/reports</code>. Total contracted value won this
        fiscal year:{" "}
        <strong className="text-[var(--lm-color-text)] tabular-nums">
          {formatValueFull(wonThisQuarter)}
        </strong>
        .
      </p>
    </div>
  );
}
