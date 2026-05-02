import { AreaChart } from "../../../components/chart";
import { IssueKey, LabelChip, MemberAvatar, PriorityIcon, TypeIcon } from "../components/atoms";
import { issuesBySprint, statusMeta } from "../data/issues";
import { members } from "../data/members";
import { activeSprint } from "../data/sprints";

export function SprintPage() {
  const sprintIssues = issuesBySprint(activeSprint.id);

  // Build burndown chart data — pad burndown to ideal length
  const burndownPadded = [...activeSprint.burndown];
  while (burndownPadded.length < activeSprint.ideal.length) burndownPadded.push(0);
  // Use 0 to represent "no data yet" — but the chart needs valid numbers. Trim ideal to burndown length to show "current day"
  const dayLabels = activeSprint.ideal.map((_, i) => `D${i + 1}`);

  // Capacity by member
  const capacityRows = members.map((m) => {
    const memberIssues = sprintIssues.filter((i) => i.assigneeId === m.id);
    const committed = memberIssues.reduce((s, i) => s + i.points, 0);
    const completed = memberIssues
      .filter((i) => i.status === "done")
      .reduce((s, i) => s + i.points, 0);
    return { member: m, committed, completed };
  });

  // Status breakdown
  const statusCounts = {
    backlog: 0,
    todo: 0,
    "in-progress": 0,
    review: 0,
    done: 0
  } as Record<keyof typeof statusMeta, number>;
  const statusPoints = { ...statusCounts };
  for (const i of sprintIssues) {
    statusCounts[i.status] += 1;
    statusPoints[i.status] += i.points;
  }

  const totalPoints = sprintIssues.reduce((s, i) => s + i.points, 0);
  const completePct = totalPoints > 0 ? Math.round((statusPoints.done / totalPoints) * 100) : 0;
  const daysInSprint = activeSprint.ideal.length;
  const daysElapsed = activeSprint.burndown.length;

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Engineering · Sprint
          </p>
          <h1 className="lm-page-title mt-1">{activeSprint.name}</h1>
          <p className="lm-page-description">
            {humanDate(activeSprint.start)} — {humanDate(activeSprint.end)} · day {daysElapsed} of{" "}
            {daysInSprint} ·{" "}
            <strong className="text-[var(--lm-color-text)]">{completePct}% complete</strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Sprint review
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Edit dates
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Close sprint
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Committed</span>
          <span className="lm-stat-value tabular-nums">{activeSprint.committed} pts</span>
          <span className="lm-stat-trend">{sprintIssues.length} issues</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Completed</span>
          <span className="lm-stat-value tabular-nums">{statusPoints.done} pts</span>
          <span className="lm-stat-trend lm-stat-trend-up">{completePct}% of committed</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">In flight</span>
          <span className="lm-stat-value tabular-nums">
            {statusPoints["in-progress"] + statusPoints.review} pts
          </span>
          <span className="lm-stat-trend">
            {statusCounts["in-progress"]} dev · {statusCounts.review} review
          </span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Days remaining</span>
          <span className="lm-stat-value tabular-nums">{daysInSprint - daysElapsed}</span>
          <span className="lm-stat-trend">ends {humanDate(activeSprint.end)}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Left: burndown + status breakdown */}
        <div className="grid gap-6">
          <section className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Burndown</h2>
                <p className="lm-card-subtitle">Story points remaining vs ideal trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "var(--lm-color-primary)" }}
                    aria-hidden="true"
                  />
                  Actual
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "var(--lm-color-muted)" }}
                    aria-hidden="true"
                  />
                  Ideal
                </span>
              </div>
            </div>
            <div className="lm-card-body">
              <AreaChart
                height={240}
                showLegend={false}
                series={[
                  {
                    label: "Ideal",
                    color: "muted",
                    values: activeSprint.ideal
                  },
                  {
                    label: "Actual",
                    color: "primary",
                    values: burndownPadded
                  }
                ]}
              />
              <div
                className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-[var(--lm-color-muted)]"
                aria-hidden="true"
              >
                {dayLabels.slice(0, 14).map((d, i) => (
                  <span
                    key={d}
                    className={`tabular-nums ${i === daysElapsed - 1 ? "font-bold text-[var(--lm-color-primary)]" : ""}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Status breakdown</h2>
              <p className="lm-card-subtitle">Story points across columns</p>
            </div>
            <div className="lm-card-body grid gap-3">
              {(Object.keys(statusMeta) as (keyof typeof statusMeta)[]).map((status) => {
                const meta = statusMeta[status];
                const pct = totalPoints > 0 ? (statusPoints[status] / totalPoints) * 100 : 0;
                return (
                  <div key={status} className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: `var(--lm-color-${meta.color})` }}
                          aria-hidden="true"
                        />
                        <strong>{meta.label}</strong>
                        <span className="lm-badge lm-badge-soft text-xs">
                          {statusCounts[status]}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--lm-color-muted)] tabular-nums">
                        {statusPoints[status]} pts
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
                          background: `var(--lm-color-${meta.color})`,
                          height: "100%",
                          width: `${pct}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Sprint issues</h2>
              <p className="lm-card-subtitle">
                {sprintIssues.length} issue{sprintIssues.length === 1 ? "" : "s"} in this sprint
              </p>
            </div>
            <div className="lm-card-body p-0">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th style={{ width: "1.5rem" }}>
                      <span className="sr-only">Type</span>
                    </th>
                    <th style={{ width: "5rem" }}>Key</th>
                    <th>Title</th>
                    <th>Labels</th>
                    <th>Status</th>
                    <th style={{ width: "5rem" }}>Priority</th>
                    <th className="text-right" style={{ width: "3rem" }}>
                      Pts
                    </th>
                    <th style={{ width: "2rem" }}>
                      <span className="sr-only">Assignee</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sprintIssues.map((issue) => {
                    const meta = statusMeta[issue.status];
                    return (
                      <tr key={issue.id}>
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
                            {issue.labelIds.slice(0, 2).map((l) => (
                              <LabelChip id={l} key={l} />
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={`lm-badge lm-badge-${meta.tone} text-xs`}>
                            {meta.label}
                          </span>
                        </td>
                        <td>
                          <PriorityIcon priority={issue.priority} />
                        </td>
                        <td className="text-right tabular-nums text-sm">{issue.points || "—"}</td>
                        <td>
                          {issue.assigneeId ? (
                            <MemberAvatar id={issue.assigneeId} size="xs" />
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right column: capacity + members */}
        <div className="grid gap-6">
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Capacity</h2>
              <p className="lm-card-subtitle">Committed vs capacity per teammate</p>
            </div>
            <div className="lm-card-body grid gap-3">
              {capacityRows.map(({ member, committed, completed }) => {
                const pct = (committed / member.capacity) * 100;
                const tone = pct > 100 ? "danger" : pct > 90 ? "warning" : "success";
                const completedPct = (completed / member.capacity) * 100;
                return (
                  <div key={member.id} className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MemberAvatar id={member.id} size="xs" />
                        <strong>{member.name}</strong>
                        <span className="text-xs text-[var(--lm-color-muted)]">{member.role}</span>
                      </div>
                      <span className="tabular-nums text-xs">
                        {committed}/{member.capacity}
                      </span>
                    </div>
                    <div
                      style={{
                        background: "var(--lm-color-surface-raised)",
                        borderRadius: "999px",
                        height: "0.375rem",
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      {/* Committed fill */}
                      <div
                        style={{
                          background: `var(--lm-color-${tone})`,
                          height: "100%",
                          width: `${Math.min(pct, 100)}%`,
                          opacity: 0.45
                        }}
                      />
                      {/* Completed fill */}
                      <div
                        style={{
                          background: `var(--lm-color-${tone})`,
                          height: "100%",
                          left: 0,
                          position: "absolute",
                          top: 0,
                          width: `${Math.min(completedPct, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">On-call rotation</h2>
            </div>
            <div className="lm-card-body grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemberAvatar id="mk" size="sm" />
                  <div>
                    <strong className="text-sm">Maya Krishnan</strong>
                    <p className="lm-hint text-xs">primary · Apr 22 — Apr 29</p>
                  </div>
                </div>
                <span className="lm-badge lm-badge-success lm-badge-dot text-xs">on-call</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemberAvatar id="rs" size="sm" />
                  <div>
                    <strong className="text-sm">Riya Shah</strong>
                    <p className="lm-hint text-xs">secondary · Apr 22 — Apr 29</p>
                  </div>
                </div>
                <span className="lm-badge lm-badge-soft text-xs">backup</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemberAvatar id="al" size="sm" />
                  <div>
                    <strong className="text-sm">Alex Lin</strong>
                    <p className="lm-hint text-xs">next · Apr 30 — May 6</p>
                  </div>
                </div>
                <span className="lm-badge lm-badge-outline text-xs">scheduled</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function humanDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}
