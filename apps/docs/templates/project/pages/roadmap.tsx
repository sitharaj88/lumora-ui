import { MemberAvatar } from "../components/atoms";
import { epics } from "../data/epics";

const QUARTERS = ["Q1 26", "Q2 26", "Q3 26", "Q4 26"];

export function RoadmapPage() {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Engineering · Roadmap
          </p>
          <h1 className="lm-page-title mt-1">2026 roadmap</h1>
          <p className="lm-page-description">
            {epics.length} epics across {QUARTERS.length} quarters · drag bars to re-plan
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item">
              Month
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Quarter
            </button>
            <button type="button" className="lm-segmented-item">
              Year
            </button>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Share roadmap
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New epic
          </button>
        </div>
      </header>

      {/* Filter strip */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--lm-color-muted)]">Show</span>
        <span className="lm-badge lm-badge-success lm-badge-dot">In progress · 3</span>
        <span className="lm-badge lm-badge-soft">Planning · 2</span>
        <span className="lm-badge lm-badge-outline">Shipped · 1</span>
        <span className="ml-2 text-[var(--lm-color-muted)]">·</span>
        <span className="lm-badge lm-badge-outline">Owner: anyone</span>
        <span className="lm-badge lm-badge-outline">Status: any</span>
      </div>

      {/* Gantt-style chart */}
      <section className="lm-card overflow-hidden">
        <div className="lm-card-header">
          <h2 className="lm-card-title">Epic timeline</h2>
          <p className="lm-card-subtitle">Status · owner · progress</p>
        </div>
        <div className="lm-card-body p-0">
          {/* Header row with quarter columns */}
          <div
            className="grid border-b border-[var(--lm-color-border)] text-xs uppercase tracking-wider text-[var(--lm-color-muted)]"
            style={{
              gridTemplateColumns: "16rem repeat(4, 1fr)",
              minWidth: "60rem"
            }}
          >
            <div className="px-4 py-2">Epic</div>
            {QUARTERS.map((q, i) => (
              <div
                key={q}
                className="border-l border-[var(--lm-color-border)] px-4 py-2"
                style={
                  i === 1
                    ? {
                        background:
                          "color-mix(in oklab, var(--lm-color-primary) 6%, transparent)"
                      }
                    : undefined
                }
              >
                <span className="flex items-center gap-2">
                  {q}
                  {i === 1 && (
                    <span className="lm-badge lm-badge-primary lm-badge-dot text-[10px]">
                      now
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Epic rows */}
          {epics.map((epic) => {
            const startIdx = QUARTERS.indexOf(epic.startQuarter);
            const endIdx = QUARTERS.indexOf(epic.dueQuarter);
            const span = Math.max(endIdx - startIdx + 1, 1);
            const progress =
              epic.totalIssues > 0 ? (epic.doneIssues / epic.totalIssues) * 100 : 0;
            return (
              <div
                key={epic.id}
                className="grid border-b border-[var(--lm-color-border)] last:border-b-0 hover:bg-[var(--lm-color-surface-raised)]"
                style={{
                  gridTemplateColumns: "16rem repeat(4, 1fr)",
                  minWidth: "60rem"
                }}
              >
                {/* Epic info */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ background: `var(--lm-color-${epic.color})` }}
                    aria-hidden="true"
                  />
                  <div className="grid gap-0.5 min-w-0">
                    <strong className="text-sm truncate">{epic.name}</strong>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--lm-color-muted)]">
                      <MemberAvatar id={epic.ownerId} size="xs" />
                      <span className="tabular-nums">
                        {epic.doneIssues}/{epic.totalIssues}
                      </span>
                      <span>·</span>
                      <span
                        className={`lm-badge lm-badge-${
                          epic.status === "shipped"
                            ? "success"
                            : epic.status === "in-progress"
                            ? "warning"
                            : "soft"
                        } text-[10px]`}
                      >
                        {epic.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quarter columns + bar */}
                <div
                  className="relative col-span-4 grid items-center"
                  style={{ gridTemplateColumns: "repeat(4, 1fr)", padding: "0.625rem 0" }}
                >
                  {/* Background quarter dividers */}
                  {QUARTERS.map((q, i) => (
                    <div
                      key={q}
                      className="h-full border-l border-[var(--lm-color-border)]"
                      style={
                        i === 1
                          ? {
                              background:
                                "color-mix(in oklab, var(--lm-color-primary) 4%, transparent)"
                            }
                          : undefined
                      }
                    />
                  ))}

                  {/* Bar */}
                  <div
                    className="absolute rounded-md overflow-hidden"
                    style={{
                      gridColumn: `${startIdx + 1} / span ${span}`,
                      left: `${(startIdx / 4) * 100}%`,
                      width: `${(span / 4) * 100}%`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "1.625rem",
                      marginLeft: "0.25rem",
                      marginRight: "0.25rem",
                      background: `color-mix(in oklab, var(--lm-color-${epic.color}) 18%, var(--lm-color-surface))`,
                      border: `1px solid color-mix(in oklab, var(--lm-color-${epic.color}) 50%, var(--lm-color-border))`
                    }}
                  >
                    {/* Progress fill */}
                    <div
                      style={{
                        background: `var(--lm-color-${epic.color})`,
                        height: "100%",
                        width: `${progress}%`,
                        opacity: 0.45
                      }}
                    />
                    {/* Bar label */}
                    <div
                      className="absolute inset-0 flex items-center justify-between gap-2 px-2 text-[11px]"
                      style={{ color: "var(--lm-color-text)" }}
                    >
                      <span className="font-medium truncate">{epic.dueQuarter}</span>
                      <span className="tabular-nums font-bold">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestone summary */}
      <div className="grid gap-3 md:grid-cols-3">
        {epics
          .filter((e) => e.status !== "shipped")
          .slice(0, 3)
          .map((e) => {
            const progress =
              e.totalIssues > 0 ? Math.round((e.doneIssues / e.totalIssues) * 100) : 0;
            return (
              <article key={e.id} className="lm-card">
                <div className="lm-card-body grid gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: `var(--lm-color-${e.color})` }}
                        aria-hidden="true"
                      />
                      <strong className="text-sm">{e.name}</strong>
                    </div>
                    <span
                      className={`lm-badge lm-badge-${
                        e.status === "in-progress" ? "warning" : "soft"
                      } text-xs`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--lm-color-muted)]">Progress</span>
                      <span className="tabular-nums">
                        {e.doneIssues}/{e.totalIssues} · {progress}%
                      </span>
                    </div>
                    <div
                      style={{
                        background: "var(--lm-color-surface-raised)",
                        borderRadius: "999px",
                        height: "0.375rem",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          background: `var(--lm-color-${e.color})`,
                          height: "100%",
                          width: `${progress}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                    <div className="flex items-center gap-1.5">
                      <MemberAvatar id={e.ownerId} size="xs" />
                      <span>owner</span>
                    </div>
                    <span>{e.dueQuarter}</span>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
