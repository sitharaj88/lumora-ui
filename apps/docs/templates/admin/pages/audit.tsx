import { PersonAvatar } from "../components/account-avatar";
import { auditLog, formatTimestamp, relativeTime, severityTone } from "../data/audit";

export function AuditPage() {
  const counts = {
    total: auditLog.length,
    info: auditLog.filter((e) => e.severity === "info").length,
    warning: auditLog.filter((e) => e.severity === "warning").length,
    danger: auditLog.filter((e) => e.severity === "danger").length
  };

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            System
          </p>
          <h1 className="lm-page-title mt-1">Audit log</h1>
          <p className="lm-page-description">
            Immutable record of every privileged action. Retention: 90 days.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="lm-badge lm-badge-success lm-badge-dot text-xs">
            Live · streaming
          </span>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Stream to S3
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Export
          </button>
        </div>
      </header>

      {/* Severity tabs */}
      <div className="lm-segmented" role="group" aria-label="Filter by severity">
        <button type="button" className="lm-segmented-item" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{counts.total}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Info <span className="ml-1 text-[var(--lm-color-muted)]">{counts.info}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Warning <span className="ml-1 text-[var(--lm-color-warning)]">{counts.warning}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Critical <span className="ml-1 text-[var(--lm-color-danger)]">{counts.danger}</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input
              className="lm-input"
              placeholder="action, resource, IP, actor…"
            />
          </div>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Action</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any action</option>
            <option>auth.failed</option>
            <option>billing.escalate</option>
            <option>members.invite</option>
            <option>plan.upgrade</option>
            <option>saml.cert.rotate</option>
            <option>webhook.delete</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Region</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any region</option>
            <option>us-east-1</option>
            <option>us-west-2</option>
            <option>eu-central-1</option>
            <option>ap-southeast-1</option>
            <option>global</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Date range</span>
          <input className="lm-input" defaultValue="Apr 22 — Apr 29, 2026" />
        </label>
      </div>

      {/* Critical alert */}
      <div className="lm-alert lm-alert-danger">
        <span aria-hidden>!</span>
        <div>
          <p className="lm-alert-title">1 critical event in the last 24 hours</p>
          <p className="lm-hint">
            Failed authentication from <code className="lm-code">203.0.113.74</code> targeting
            <code className="lm-code"> atlas-finance/sso</code>. Review log{" "}
            <code className="lm-code">lg-2837</code>.
          </p>
        </div>
      </div>

      {/* Log table */}
      <section className="lm-card overflow-hidden">
        <div className="lm-card-header flex items-center justify-between">
          <div>
            <h2 className="lm-card-title">Events</h2>
            <p className="lm-card-subtitle">{auditLog.length} events · sorted newest first</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
              ⟲ Refresh
            </button>
          </div>
        </div>
        <div className="lm-card-body">
          <table className="lm-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Severity</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>IP</th>
                <th>Region</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="grid">
                      <strong className="text-sm tabular-nums">{relativeTime(e.timestamp)}</strong>
                      <span className="lm-hint text-xs tabular-nums">
                        {formatTimestamp(e.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`lm-badge lm-badge-${severityTone[e.severity]} lm-badge-dot text-xs`}
                    >
                      {e.severity === "info"
                        ? "info"
                        : e.severity === "warning"
                        ? "warning"
                        : "critical"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <PersonAvatar initials={e.actorInitials} bg={e.actorBg} size="xs" />
                      <div>
                        <strong className="text-sm">{e.actor}</strong>
                        <p className="lm-hint text-xs">{e.actorRole}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="lm-code text-xs">{e.action}</code>
                  </td>
                  <td>
                    <code className="lm-code text-xs">{e.resource}</code>
                  </td>
                  <td>
                    <code className="lm-code text-xs">{e.ip}</code>
                  </td>
                  <td>
                    <code className="lm-code text-xs">{e.region}</code>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="lm-btn lm-btn-ghost lm-btn-sm"
                      aria-label={`Inspect event ${e.id}`}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-[var(--lm-color-muted)]">
        Audit log entries are signed and immutable. Retention is set per workspace plan and
        cannot be shortened by admins. Need longer retention?{" "}
        <a className="text-[var(--lm-color-primary)] underline" href="#">
          Contact sales
        </a>
        .
      </p>
    </div>
  );
}
