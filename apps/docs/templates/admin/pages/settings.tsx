import type { ReactNode } from "react";

export function SettingsPage() {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            System
          </p>
          <h1 className="lm-page-title mt-1">Workspace settings</h1>
          <p className="lm-page-description">
            Authentication, integrations, API access, and workspace defaults.
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
            Discard
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Save changes
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[14rem_1fr]">
        {/* Sub-nav */}
        <aside className="lm-sidebar h-fit lg:sticky lg:top-24" aria-label="Settings sections">
          <span className="lm-sidebar-section">Workspace</span>
          <a className="lm-sidebar-item" href="#general" aria-current="page">
            General
          </a>
          <a className="lm-sidebar-item" href="#authentication">
            Authentication
          </a>
          <a className="lm-sidebar-item" href="#integrations">
            Integrations
          </a>
          <span className="lm-sidebar-section">Developer</span>
          <a className="lm-sidebar-item" href="#api-keys">
            API keys
          </a>
          <a className="lm-sidebar-item" href="#webhooks">
            Webhooks
          </a>
          <span className="lm-sidebar-section">Other</span>
          <a className="lm-sidebar-item" href="#danger">
            Danger zone
          </a>
        </aside>

        <div className="grid gap-6">
          {/* General */}
          <section id="general" className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">General</h2>
              <p className="lm-card-subtitle">Workspace identity and defaults.</p>
            </div>
            <div className="lm-card-body grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="lm-field">
                  <span className="lm-label">Workspace name</span>
                  <input className="lm-input" defaultValue="Atlas Console" />
                </label>
                <label className="lm-field">
                  <span className="lm-label">Workspace URL</span>
                  <div className="lm-input-group">
                    <span className="lm-input-addon">atlas.</span>
                    <input className="lm-input" defaultValue="lumora.dev" />
                  </div>
                </label>
                <label className="lm-field md:col-span-2">
                  <span className="lm-label">Description</span>
                  <textarea
                    className="lm-textarea"
                    rows={3}
                    defaultValue="Internal SaaS admin for managing customer accounts, billing, and audit."
                  />
                </label>
                <label className="lm-field">
                  <span className="lm-label">Default region</span>
                  <select className="lm-select" defaultValue="us-east-1">
                    <option>us-east-1</option>
                    <option>us-west-2</option>
                    <option>eu-central-1</option>
                    <option>ap-southeast-1</option>
                  </select>
                </label>
                <label className="lm-field">
                  <span className="lm-label">Density</span>
                  <select className="lm-select" defaultValue="comfortable">
                    <option>compact</option>
                    <option>comfortable</option>
                    <option>spacious</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Authentication</h2>
              <p className="lm-card-subtitle">SSO, SCIM, MFA, and session policy.</p>
            </div>
            <div className="lm-card-body grid gap-5">
              <SettingRow
                title="Single sign-on"
                desc="Members must sign in via your IdP."
                badge={{ tone: "success", label: "Active" }}
                action={
                  <input
                    type="checkbox"
                    className="lm-switch"
                    defaultChecked
                    aria-label="Single sign-on"
                  />
                }
              />
              <SettingRow
                title="SCIM 2.0 provisioning"
                desc="Stream user lifecycle events from your IdP."
                badge={{ tone: "soft", label: "Configured" }}
                action={
                  <input
                    type="checkbox"
                    className="lm-switch"
                    defaultChecked
                    aria-label="SCIM 2.0 provisioning"
                  />
                }
              />
              <SettingRow
                title="Multi-factor required"
                desc="Members must complete TOTP at sign-in."
                action={
                  <input
                    type="checkbox"
                    className="lm-switch"
                    defaultChecked
                    aria-label="Multi-factor required"
                  />
                }
              />
              <SettingRow
                title="Session timeout"
                desc="Sign out after this idle period."
                action={
                  <div className="flex items-center gap-3" style={{ minWidth: "12rem" }}>
                    <input
                      className="lm-slider"
                      type="range"
                      defaultValue="30"
                      style={{ width: "8rem" }}
                      aria-label="Session timeout · minutes"
                    />
                    <span className="lm-badge lm-badge-soft" style={{ minWidth: "3.5rem" }}>
                      30 min
                    </span>
                  </div>
                }
              />
              <SettingRow
                title="IP allowlist"
                desc="Restrict admin sign-in to specific networks."
                action={
                  <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                    Configure
                  </button>
                }
              />
            </div>
          </section>

          {/* Integrations */}
          <section id="integrations" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Integrations</h2>
                <p className="lm-card-subtitle">Pipe events to your team's tools.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Connect
              </button>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                { name: "Slack", desc: "Critical events to #ops-alerts", on: true, badge: "success" },
                { name: "PagerDuty", desc: "Page on-call for severity 1+", on: true, badge: "success" },
                { name: "Datadog", desc: "Stream audit log to Logs Explorer", on: true, badge: "success" },
                { name: "Jira", desc: "Auto-create tickets from review events", on: false, badge: "soft" }
              ].map((i) => (
                <div
                  key={i.name}
                  className="flex items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="lm-avatar lm-avatar-sm"
                      style={{
                        background: "var(--lm-color-surface-raised)",
                        color: "var(--lm-color-text)"
                      }}
                    >
                      {i.name[0]}
                    </span>
                    <div>
                      <strong className="text-sm">{i.name}</strong>
                      <p className="lm-hint text-xs">{i.desc}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="lm-switch lm-switch-sm"
                    defaultChecked={i.on}
                    aria-label={`${i.name} integration`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* API keys */}
          <section id="api-keys" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">API keys</h2>
                <p className="lm-card-subtitle">Workspace-scoped tokens for the Atlas API.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
                + New key
              </button>
            </div>
            <div className="lm-card-body">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Token</th>
                    <th>Scopes</th>
                    <th>Created</th>
                    <th>Last used</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "CI/CD",
                      token: "atlas_live_a3f1…b829",
                      scopes: ["read", "write"],
                      created: "Jan 8, 2026",
                      used: "12 min ago"
                    },
                    {
                      name: "Datadog sync",
                      token: "atlas_live_71be…ac15",
                      scopes: ["read"],
                      created: "Apr 12, 2026",
                      used: "5 hr ago"
                    },
                    {
                      name: "Local dev",
                      token: "atlas_test_82c9…f4d2",
                      scopes: ["read", "write", "admin"],
                      created: "Mar 1, 2026",
                      used: "yesterday"
                    }
                  ].map((row) => (
                    <tr key={row.name}>
                      <td>
                        <strong>{row.name}</strong>
                      </td>
                      <td>
                        <code className="lm-code">{row.token}</code>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {row.scopes.map((s) => (
                            <span className="lm-badge lm-badge-soft text-xs" key={s}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="text-sm text-[var(--lm-color-muted)]">{row.created}</td>
                      <td className="text-sm text-[var(--lm-color-muted)]">{row.used}</td>
                      <td>
                        <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                          Copy
                        </button>
                        <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Webhooks */}
          <section id="webhooks" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Webhooks</h2>
                <p className="lm-card-subtitle">HTTP callbacks for workspace events.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Add endpoint
              </button>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                {
                  url: "https://atlas.example/webhooks/lumora",
                  events: ["account.*", "billing.*"],
                  status: "healthy"
                },
                {
                  url: "https://hooks.slack.com/services/T0/B0/xxx",
                  events: ["audit.severity.high"],
                  status: "healthy"
                },
                {
                  url: "https://staging.atlas.example/lumora",
                  events: ["account.created"],
                  status: "failing"
                }
              ].map((w) => (
                <div
                  key={w.url}
                  className="flex items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="grid gap-1">
                    <code className="lm-code text-xs">{w.url}</code>
                    <div className="flex flex-wrap gap-1">
                      {w.events.map((ev) => (
                        <span className="lm-badge lm-badge-outline text-xs" key={ev}>
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`lm-badge lm-badge-${
                      w.status === "healthy" ? "success" : "danger"
                    } lm-badge-dot text-xs`}
                  >
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Danger zone */}
          <section id="danger" className="lm-card" style={{ borderColor: "var(--lm-color-danger)" }}>
            <div className="lm-card-header">
              <h2 className="lm-card-title">Danger zone</h2>
              <p className="lm-card-subtitle">Irreversible workspace operations.</p>
            </div>
            <div className="lm-card-body grid gap-4">
              <SettingRow
                title="Transfer ownership"
                desc="Move workspace ownership to another admin."
                action={
                  <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                    Transfer
                  </button>
                }
              />
              <SettingRow
                title="Archive workspace"
                desc="Read-only mode for all members. Can be reactivated."
                action={
                  <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                    Archive
                  </button>
                }
              />
              <SettingRow
                title="Delete workspace"
                desc="Permanently delete this workspace and all data. No recovery."
                action={
                  <button type="button" className="lm-btn lm-btn-danger lm-btn-sm">
                    Delete workspace
                  </button>
                }
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  title,
  desc,
  badge,
  action
}: {
  title: string;
  desc?: string;
  badge?: { tone: string; label: string };
  action: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-4 last:border-b-0 last:pb-0">
      <div className="grid gap-0.5">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{title}</strong>
          {badge && (
            <span className={`lm-badge lm-badge-${badge.tone} lm-badge-dot text-xs`}>
              {badge.label}
            </span>
          )}
        </div>
        {desc && <p className="lm-hint text-xs">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
