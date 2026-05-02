import { IssueKey, LabelChip, MemberAvatar, PriorityIcon, TypeIcon } from "../components/atoms";
import { getEpic } from "../data/epics";
import { issues, issuesByStatus, priorityMeta } from "../data/issues";

export function BacklogPage() {
  const backlog = issuesByStatus("backlog");
  const todo = issuesByStatus("todo");
  const ungrouped = [...backlog, ...todo];

  // Group by epic
  const grouped = new Map<string | null, typeof ungrouped>();
  for (const issue of ungrouped) {
    const key = issue.epicId;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(issue);
  }

  const totalPoints = ungrouped.reduce((s, i) => s + i.points, 0);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Engineering · Backlog
          </p>
          <h1 className="lm-page-title mt-1">Backlog</h1>
          <p className="lm-page-description">
            {ungrouped.length} unscheduled issues · {totalPoints} points · grouped by epic
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Filter…" />
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Bulk move to sprint
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New issue
          </button>
        </div>
      </header>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--lm-color-muted)]">Group by</span>
        <div className="lm-segmented">
          <button type="button" className="lm-segmented-item">
            Status
          </button>
          <button type="button" className="lm-segmented-item">
            Priority
          </button>
          <button type="button" className="lm-segmented-item" aria-pressed="true">
            Epic
          </button>
          <button type="button" className="lm-segmented-item">
            Label
          </button>
        </div>
        <span className="ml-2 text-[var(--lm-color-muted)]">·</span>
        <span className="lm-badge lm-badge-soft">Status: backlog + todo</span>
        <span className="lm-badge lm-badge-outline">Priority: any</span>
        <span className="lm-badge lm-badge-outline">Assignee: any</span>
      </div>

      {/* Groups */}
      <div className="grid gap-6">
        {Array.from(grouped.entries()).map(([epicId, items]) => {
          const epic = epicId ? getEpic(epicId) : null;
          const groupPoints = items.reduce((s, i) => s + i.points, 0);
          return (
            <section key={epicId ?? "none"} className="lm-card overflow-hidden">
              <div
                className="lm-card-header flex items-center justify-between"
                style={
                  epic
                    ? {
                        borderBottom: `1px solid color-mix(in oklab, var(--lm-color-${epic.color}) 30%, var(--lm-color-border))`,
                        background: `color-mix(in oklab, var(--lm-color-${epic.color}) 4%, var(--lm-color-surface))`
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {epic ? (
                    <>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: `var(--lm-color-${epic.color})` }}
                        aria-hidden="true"
                      />
                      <h2 className="lm-card-title">{epic.name}</h2>
                      <span className="lm-badge lm-badge-soft text-xs">
                        {epic.dueQuarter}
                      </span>
                    </>
                  ) : (
                    <h2 className="lm-card-title">No epic</h2>
                  )}
                  <span className="lm-badge lm-badge-soft text-xs">
                    {items.length} issue{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <span className="text-xs text-[var(--lm-color-muted)] tabular-nums">
                  {groupPoints} pts
                </span>
              </div>
              <div className="lm-card-body p-0">
                <table className="lm-table">
                  <thead>
                    <tr>
                      <th style={{ width: "1.5rem" }}>
                        <input type="checkbox" className="lm-checkbox" aria-label="Select all" />
                      </th>
                      <th style={{ width: "1.5rem" }}>
                        <span className="sr-only">Type</span>
                      </th>
                      <th style={{ width: "5rem" }}>Key</th>
                      <th>Title</th>
                      <th>Labels</th>
                      <th style={{ width: "5rem" }}>Priority</th>
                      <th className="text-right" style={{ width: "4rem" }}>
                        Pts
                      </th>
                      <th style={{ width: "8rem" }}>Due</th>
                      <th style={{ width: "2rem" }}>
                        <span className="sr-only">Assignee</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((issue) => (
                      <tr key={issue.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="lm-checkbox"
                            aria-label={`Select ${issue.key}`}
                          />
                        </td>
                        <td>
                          <TypeIcon type={issue.type} />
                        </td>
                        <td>
                          <IssueKey id={issue.key} />
                        </td>
                        <td>
                          <strong className="text-sm">{issue.title}</strong>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {issue.labelIds.slice(0, 3).map((l) => (
                              <LabelChip id={l} key={l} />
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <PriorityIcon priority={issue.priority} />
                            <span
                              className="text-xs"
                              style={{ color: "var(--lm-color-muted)" }}
                            >
                              {priorityMeta[issue.priority].label}
                            </span>
                          </div>
                        </td>
                        <td className="text-right tabular-nums text-sm">
                          {issue.points || "—"}
                        </td>
                        <td className="text-xs text-[var(--lm-color-muted)]">
                          {issue.due ? humanDate(issue.due) : "—"}
                        </td>
                        <td>
                          {issue.assigneeId ? (
                            <MemberAvatar id={issue.assigneeId} size="xs" />
                          ) : (
                            <span
                              className="lm-avatar lm-avatar-xs"
                              style={{
                                background: "var(--lm-color-surface-raised)",
                                color: "var(--lm-color-muted)"
                              }}
                              title="Unassigned"
                            >
                              ?
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function humanDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
