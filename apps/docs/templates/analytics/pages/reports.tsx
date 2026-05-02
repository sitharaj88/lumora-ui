import { MetricTile } from "../components/atoms";
import { reports } from "../data/reports";

export function ReportsPage() {
  const scheduled = reports.filter((r) => r.schedule).length;
  const totalRecipients = reports.reduce((s, r) => s + r.recipients, 0);
  const totalWidgets = reports.reduce((s, r) => s + r.widgetCount, 0);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Tools · Reports
          </p>
          <h1 className="lm-page-title mt-1">Reports & dashboards</h1>
          <p className="lm-page-description">
            {reports.length} saved reports · {scheduled} scheduled · {totalRecipients} subscribers
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Search reports…" />
          </div>
          <select className="lm-select lm-select-sm" defaultValue="updated">
            <option value="updated">Recently updated</option>
            <option>Most subscribed</option>
            <option>Most widgets</option>
            <option>A → Z</option>
          </select>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New report
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <MetricTile label="Saved reports" value={`${reports.length}`} caption="across the team" />
        <MetricTile
          label="Scheduled digests"
          value={`${scheduled}`}
          delta="2 new"
          tone="up"
          caption="auto-emailed"
        />
        <MetricTile label="Subscribers" value={`${totalRecipients}`} caption="across all digests" />
        <MetricTile label="Widgets" value={`${totalWidgets}`} caption="charts, tables, KPIs" />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[var(--lm-color-muted)]">Category:</span>
        <button type="button" className="lm-badge lm-badge-soft">
          All <span className="ml-1">{reports.length}</span>
        </button>
        {(["Growth", "Product", "Revenue", "Engineering"] as const).map((cat) => {
          const count = reports.filter((r) => r.category === cat).length;
          if (count === 0) return null;
          return (
            <button type="button" className="lm-badge lm-badge-outline" key={cat}>
              {cat} <span className="ml-1">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Report grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <article key={r.id} className="lm-card lm-card-interactive flex flex-col overflow-hidden">
            {/* Cover */}
            <div
              className="relative grid place-items-center"
              style={{
                background: r.cover,
                aspectRatio: "16/9",
                borderBottom: "1px solid var(--lm-color-border)"
              }}
              aria-hidden="true"
            >
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: "color-mix(in oklab, var(--lm-color-bg) 70%, transparent)",
                  color: "var(--lm-color-text)",
                  backdropFilter: "blur(8px)"
                }}
              >
                {r.category}
              </span>
              <span
                className="absolute right-3 top-3 lm-badge text-[10px]"
                style={{
                  background: "color-mix(in oklab, var(--lm-color-bg) 70%, transparent)",
                  color: "var(--lm-color-text)",
                  backdropFilter: "blur(8px)"
                }}
              >
                {r.widgetCount} widgets
              </span>
            </div>

            <div className="grid gap-3 p-5 flex-1">
              <div className="grid gap-1">
                <strong className="text-base leading-tight">{r.name}</strong>
                <p className="line-clamp-2 text-sm text-[var(--lm-color-muted)]">{r.description}</p>
              </div>

              <div className="grid gap-2 text-xs">
                {r.schedule ? (
                  <div className="flex items-center gap-2">
                    <span className="lm-badge lm-badge-success lm-badge-dot text-[10px]">
                      Scheduled
                    </span>
                    <span className="text-[var(--lm-color-muted)]">{r.schedule}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="lm-badge lm-badge-soft text-[10px]">On demand</span>
                    <span className="text-[var(--lm-color-muted)]">No digest scheduled</span>
                  </div>
                )}
                {r.recipients > 0 && (
                  <div className="flex items-center gap-2 text-[var(--lm-color-muted)]">
                    <span aria-hidden>↗</span>
                    <span>
                      {r.recipients} subscriber{r.recipients === 1 ? "" : "s"}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
                  <span
                    className="lm-avatar lm-avatar-xs"
                    style={{ background: r.ownerBg }}
                    aria-hidden="true"
                  >
                    {r.ownerInitials}
                  </span>
                  <span>{r.ownerName}</span>
                  <span aria-hidden>·</span>
                  <span>{r.updatedRelative}</span>
                </div>
                <div className="flex items-center gap-1">
                  {r.shared ? (
                    <span className="lm-badge lm-badge-success lm-badge-dot text-[10px]">
                      shared
                    </span>
                  ) : (
                    <span className="lm-badge lm-badge-soft text-[10px]">personal</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Schedule manager */}
      <section className="lm-card">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Active digest schedule</h2>
            <p className="lm-card-subtitle">
              {scheduled} reports auto-email {totalRecipients} people across the org
            </p>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Manage subscribers
          </button>
        </div>
        <div className="lm-card-body p-0">
          <table className="lm-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Owner</th>
                <th>Schedule</th>
                <th className="text-right">Recipients</th>
                <th>Next run</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reports
                .filter((r) => r.schedule)
                .map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.name}</strong>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          className="lm-avatar lm-avatar-xs"
                          style={{ background: r.ownerBg }}
                          aria-hidden="true"
                        >
                          {r.ownerInitials}
                        </span>
                        <span className="text-sm">{r.ownerName}</span>
                      </div>
                    </td>
                    <td>{r.schedule}</td>
                    <td className="text-right tabular-nums">{r.recipients}</td>
                    <td>
                      <span className="lm-badge lm-badge-soft text-xs">
                        {/* Deterministic "next run" derived from id length */}
                        in {((r.id.length * 3) % 22) + 2} hr
                      </span>
                    </td>
                    <td>
                      <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                        Edit
                      </button>
                      <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                        Pause
                      </button>
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
