import { MetricTile } from "../components/atoms";
import { formatNumber } from "../data/events";
import { clauseKindTone, segments } from "../data/segments";

export function SegmentsPage() {
  const totalAudience = segments.reduce((s, seg) => s + seg.audienceSize, 0);
  const sharedCount = segments.filter((s) => s.shared).length;
  const personalCount = segments.length - sharedCount;
  const builderSegment = segments[0]; // featured for the live builder

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Tools · Segments
          </p>
          <h1 className="lm-page-title mt-1">Segments</h1>
          <p className="lm-page-description">
            {segments.length} saved segments · {formatNumber(totalAudience)} users matched
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Search segments…" />
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Import
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New segment
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <MetricTile
          label="Total audience"
          value={formatNumber(totalAudience)}
          delta="6.4%"
          tone="up"
          caption="users · across all segments"
        />
        <MetricTile label="Shared" value={`${sharedCount}`} caption="visible to your team" />
        <MetricTile label="Personal" value={`${personalCount}`} caption="visible only to owner" />
        <MetricTile label="Auto-syncing" value="6" caption="all segments live-update" />
      </div>

      {/* Live builder */}
      <section className="lm-card overflow-hidden">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Segment builder</h2>
            <p className="lm-card-subtitle">
              Editing <strong>{builderSegment.name}</strong> ·{" "}
              {formatNumber(builderSegment.audienceSize)} users match
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
              Cancel
            </button>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
              Test query
            </button>
            <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
              Save changes
            </button>
          </div>
        </div>
        <div className="lm-card-body grid gap-4">
          {/* Match-all/any */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[var(--lm-color-muted)]">Match</span>
            <div className="lm-segmented">
              <button type="button" className="lm-segmented-item" aria-pressed="true">
                All
              </button>
              <button type="button" className="lm-segmented-item">
                Any
              </button>
            </div>
            <span className="text-[var(--lm-color-muted)]">of the following clauses:</span>
          </div>

          {/* Clause rows */}
          <div className="grid gap-3">
            {builderSegment.clauses.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-3 rounded-lg border p-3"
                style={{
                  borderColor: "var(--lm-color-border)",
                  background: "var(--lm-color-surface-sunken)"
                }}
              >
                <span
                  className={`lm-badge lm-badge-${clauseKindTone[c.kind]} text-[10px] grid place-items-center`}
                  style={{ minWidth: "2.5rem" }}
                  title={c.kind}
                >
                  {c.kind}
                </span>
                <div className="grid gap-2 sm:grid-cols-3">
                  <select className="lm-select lm-select-sm" defaultValue={c.field}>
                    <option value={c.field}>{c.field}</option>
                  </select>
                  <select className="lm-select lm-select-sm" defaultValue={c.operator}>
                    <option value={c.operator}>{c.operator}</option>
                  </select>
                  <input
                    className="lm-input lm-input-sm"
                    defaultValue={c.value}
                    aria-label="Clause value"
                  />
                </div>
                <button
                  type="button"
                  className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                  aria-label={`Remove clause ${i + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add clause */}
          <div className="flex flex-wrap gap-2">
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
              + Property clause
            </button>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
              + Behavior clause
            </button>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
              + Frequency clause
            </button>
          </div>

          {/* Live preview */}
          <div
            className="grid gap-2 rounded-lg p-4"
            style={{
              background:
                "color-mix(in oklab, var(--lm-color-success) 8%, var(--lm-color-surface))",
              border:
                "1px solid color-mix(in oklab, var(--lm-color-success) 30%, var(--lm-color-border))"
            }}
          >
            <div className="flex items-center justify-between">
              <strong className="text-sm">Live preview</strong>
              <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
                {formatNumber(builderSegment.audienceSize)} users
              </span>
            </div>
            <p className="text-xs text-[var(--lm-color-muted)]">
              Updated {builderSegment.updatedRelative} · re-runs hourly
            </p>
          </div>
        </div>
      </section>

      {/* Saved segments grid */}
      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Saved segments</h2>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              All <span className="ml-1 text-[var(--lm-color-muted)]">{segments.length}</span>
            </button>
            <button type="button" className="lm-segmented-item">
              Shared <span className="ml-1 text-[var(--lm-color-muted)]">{sharedCount}</span>
            </button>
            <button type="button" className="lm-segmented-item">
              Personal <span className="ml-1 text-[var(--lm-color-muted)]">{personalCount}</span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {segments.map((seg) => (
            <article key={seg.id} className="lm-card lm-card-interactive">
              <div className="lm-card-body grid gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-base">{seg.name}</strong>
                      {seg.shared ? (
                        <span className="lm-badge lm-badge-success lm-badge-dot text-[10px]">
                          shared
                        </span>
                      ) : (
                        <span className="lm-badge lm-badge-soft text-[10px]">personal</span>
                      )}
                    </div>
                    <p className="lm-hint text-xs">{seg.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold tabular-nums">
                      {formatNumber(seg.audienceSize)}
                    </div>
                    <div
                      className="text-xs font-bold tabular-nums"
                      style={{
                        color:
                          seg.delta > 0
                            ? "var(--lm-color-success)"
                            : seg.delta < 0
                              ? "var(--lm-color-danger)"
                              : "var(--lm-color-muted)"
                      }}
                    >
                      {seg.delta > 0 ? "▲" : seg.delta < 0 ? "▼" : "·"}{" "}
                      {Math.abs(seg.delta).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Clause chips */}
                <div className="flex flex-wrap gap-1.5">
                  {seg.clauses.map((c, ci) => (
                    <span
                      key={ci}
                      className={`lm-badge lm-badge-${clauseKindTone[c.kind]} text-[10px]`}
                      title={c.kind}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
                    <span
                      className="lm-avatar lm-avatar-xs"
                      style={{ background: seg.ownerBg }}
                      aria-hidden="true"
                    >
                      {seg.ownerInitials}
                    </span>
                    <span>{seg.ownerName}</span>
                    <span aria-hidden>·</span>
                    <span>{seg.updatedRelative}</span>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                      Send to funnel
                    </button>
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm">
                      ⋯
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
