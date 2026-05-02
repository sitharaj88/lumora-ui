import { MemberAvatar } from "../components/atoms";
import { IssueCard } from "../components/issue-card";
import { boardColumns, issuesByStatus, statusMeta } from "../data/issues";
import { members } from "../data/members";
import { activeSprint } from "../data/sprints";

export function BoardPage() {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Engineering · Project board
          </p>
          <h1 className="lm-page-title mt-1">Lumora UI 0.3</h1>
          <p className="lm-page-description">
            {activeSprint.name} · {activeSprint.completed}/{activeSprint.committed} points completed
            · ends {humanDate(activeSprint.end)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Filter issues…" />
          </div>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Board
            </button>
            <button type="button" className="lm-segmented-item">
              List
            </button>
            <button type="button" className="lm-segmented-item">
              Timeline
            </button>
          </div>
          <div className="lm-avatar-group">
            {members.slice(0, 4).map((m) => (
              <MemberAvatar key={m.id} id={m.id} size="sm" />
            ))}
            <span className="lm-avatar-stack-more">+{Math.max(members.length - 4, 0)}</span>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Filter
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New issue
          </button>
        </div>
      </header>

      {/* Group + filter strip */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--lm-color-muted)]">Group by</span>
        <div className="lm-segmented">
          <button type="button" className="lm-segmented-item" aria-pressed="true">
            Status
          </button>
          <button type="button" className="lm-segmented-item">
            Priority
          </button>
          <button type="button" className="lm-segmented-item">
            Assignee
          </button>
          <button type="button" className="lm-segmented-item">
            Epic
          </button>
        </div>
        <span className="ml-2 text-[var(--lm-color-muted)]">·</span>
        <span className="lm-badge lm-badge-soft">Sprint: {activeSprint.name}</span>
        <span className="lm-badge lm-badge-outline">Priority: any</span>
        <span className="lm-badge lm-badge-outline">Label: any</span>
        <button
          type="button"
          className="text-[10px] text-[var(--lm-color-muted)] underline ml-auto"
        >
          Save view
        </button>
      </div>

      {/* Kanban */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(5, minmax(15rem, 1fr))",
          overflowX: "auto",
          paddingBottom: "0.5rem"
        }}
      >
        {boardColumns.map((status) => {
          const colIssues = issuesByStatus(status);
          const meta = statusMeta[status];
          const points = colIssues.reduce((s, i) => s + i.points, 0);
          return (
            <div key={status} className="grid gap-3" style={{ minWidth: 0 }}>
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
                    <span className="lm-badge lm-badge-soft text-xs">{colIssues.length}</span>
                  </div>
                  <span className="text-[10px] text-[var(--lm-color-muted)] tabular-nums">
                    {points} pts
                  </span>
                </div>
              </div>

              {colIssues.length === 0 && (
                <div
                  className="grid place-items-center rounded-lg border border-dashed text-xs text-[var(--lm-color-muted)]"
                  style={{ borderColor: "var(--lm-color-border)", padding: "1.25rem 0.5rem" }}
                >
                  No issues
                </div>
              )}

              {colIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}

              <button
                type="button"
                className="lm-btn lm-btn-ghost lm-btn-sm w-full"
                style={{
                  border: "1px dashed var(--lm-color-border)",
                  color: "var(--lm-color-muted)"
                }}
              >
                + Add issue
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function humanDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
