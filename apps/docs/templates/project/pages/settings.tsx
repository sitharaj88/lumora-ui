import { MemberAvatar } from "../components/atoms";
import { labels } from "../data/labels";
import { statusMeta } from "../data/issues";
import { members } from "../data/members";

const STATUS_ROWS = [
  { id: "backlog", description: "Triage and not yet committed.", category: "Open" },
  { id: "todo", description: "Committed to a sprint, not started.", category: "Open" },
  { id: "in-progress", description: "Active development.", category: "Open" },
  { id: "review", description: "Awaiting code review or QA.", category: "Open" },
  { id: "done", description: "Shipped to production.", category: "Closed" }
] as const;

export function ProjectSettingsPage() {
  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Workspace · Project settings
          </p>
          <h1 className="lm-page-title mt-1">Project settings</h1>
          <p className="lm-page-description">
            Workflow, fields, members, and integrations for Lumora UI.
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
          <span className="lm-sidebar-section">Project</span>
          <a className="lm-sidebar-item" href="#general" aria-current="page">
            General
          </a>
          <a className="lm-sidebar-item" href="#workflow">
            Workflow
          </a>
          <a className="lm-sidebar-item" href="#labels">
            Labels
          </a>
          <a className="lm-sidebar-item" href="#fields">
            Fields
          </a>
          <span className="lm-sidebar-section">People</span>
          <a className="lm-sidebar-item" href="#members">
            Members
          </a>
          <span className="lm-sidebar-section">Connect</span>
          <a className="lm-sidebar-item" href="#integrations">
            Integrations
          </a>
          <a className="lm-sidebar-item" href="#automations">
            Automations
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
              <p className="lm-card-subtitle">Project name and identity.</p>
            </div>
            <div className="lm-card-body grid gap-4 md:grid-cols-2">
              <label className="lm-field md:col-span-2">
                <span className="lm-label">Project name</span>
                <input className="lm-input" defaultValue="Lumora UI" />
              </label>
              <label className="lm-field">
                <span className="lm-label">Issue prefix</span>
                <div className="lm-input-group">
                  <input className="lm-input" defaultValue="LMR" />
                  <span className="lm-input-addon">-1234</span>
                </div>
              </label>
              <label className="lm-field">
                <span className="lm-label">Default assignee</span>
                <select className="lm-select" defaultValue="mk">
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="lm-field md:col-span-2">
                <span className="lm-label">Description</span>
                <textarea
                  className="lm-textarea"
                  rows={2}
                  defaultValue="Tailwind v4 design system with React + Vue adapters."
                />
              </label>
            </div>
          </section>

          {/* Workflow */}
          <section id="workflow" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Workflow</h2>
                <p className="lm-card-subtitle">Statuses your issues move through.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Add status
              </button>
            </div>
            <div className="lm-card-body p-0">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {STATUS_ROWS.map((row) => {
                    const meta = statusMeta[row.id];
                    return (
                      <tr key={row.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full flex-shrink-0"
                              style={{ background: `var(--lm-color-${meta.color})` }}
                              aria-hidden="true"
                            />
                            <strong>{meta.label}</strong>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`lm-badge lm-badge-${
                              row.category === "Open" ? "soft" : "success"
                            } text-xs`}
                          >
                            {row.category}
                          </span>
                        </td>
                        <td className="text-sm text-[var(--lm-color-muted)]">{row.description}</td>
                        <td>
                          <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Labels */}
          <section id="labels" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Labels</h2>
                <p className="lm-card-subtitle">Tags for grouping and filtering.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Add label
              </button>
            </div>
            <div className="lm-card-body">
              <div className="flex flex-wrap gap-2">
                {labels.map((l) => (
                  <span
                    className={`lm-badge lm-badge-${l.color === "soft" ? "soft" : l.color}`}
                    key={l.id}
                  >
                    {l.name}
                  </span>
                ))}
              </div>
              <div className="lm-tag-input mt-4">
                <input placeholder="Type a label name and press Enter…" />
              </div>
            </div>
          </section>

          {/* Fields */}
          <section id="fields" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Fields</h2>
                <p className="lm-card-subtitle">Custom fields available on every issue.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Add field
              </button>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                { name: "Story points", type: "Number", required: true },
                { name: "Severity", type: "Single select", required: false },
                { name: "Customer impact", type: "Multi select", required: false },
                { name: "Spec link", type: "URL", required: false }
              ].map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="grid gap-0.5">
                    <strong className="text-sm">{f.name}</strong>
                    <p className="lm-hint text-xs">
                      {f.type}
                      {f.required && " · required"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="lm-switch lm-switch-sm"
                      defaultChecked
                      aria-label={`${f.name} enabled`}
                    />
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Members */}
          <section id="members" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Members</h2>
                <p className="lm-card-subtitle">{members.length} on this project.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
                + Invite
              </button>
            </div>
            <div className="lm-card-body p-0">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Role</th>
                    <th className="text-right">Capacity</th>
                    <th>Permissions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <MemberAvatar id={m.id} size="sm" />
                          <strong>{m.name}</strong>
                        </div>
                      </td>
                      <td>{m.role}</td>
                      <td className="text-right tabular-nums">{m.capacity} pts/sprint</td>
                      <td>
                        <select
                          className="lm-select lm-select-sm"
                          defaultValue={m.role === "PM" ? "admin" : "edit"}
                          aria-label={`Permissions for ${m.name}`}
                        >
                          <option value="admin">Admin</option>
                          <option value="edit">Editor</option>
                          <option value="view">Viewer</option>
                        </select>
                      </td>
                      <td>
                        <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Integrations */}
          <section id="integrations" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Integrations</h2>
                <p className="lm-card-subtitle">Pipe events to your tools.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + Connect
              </button>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                { name: "GitHub", desc: "Auto-link PRs, branches, and commits", on: true },
                { name: "Slack", desc: "Post sprint changes to #engineering", on: true },
                { name: "Figma", desc: "Sync design specs to issue links", on: true },
                { name: "PagerDuty", desc: "Page on critical bug status", on: false }
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
                    aria-label={`${i.name} enabled`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Automations */}
          <section id="automations" className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Automations</h2>
                <p className="lm-card-subtitle">Rules that run when issues change.</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + New rule
              </button>
            </div>
            <div className="lm-card-body grid gap-3">
              {[
                {
                  when: "When PR merged",
                  then: "Move to Review",
                  on: true
                },
                {
                  when: "When status = Done",
                  then: "Close linked PR + comment",
                  on: true
                },
                {
                  when: "When unassigned > 3 days",
                  then: "Notify @engineering-leads",
                  on: false
                }
              ].map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border-b border-[var(--lm-color-border)] pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="grid gap-0.5">
                    <strong className="text-sm">
                      <span className="text-[var(--lm-color-muted)]">When </span>
                      {rule.when}
                    </strong>
                    <p className="lm-hint text-xs">
                      <span className="text-[var(--lm-color-muted)]">Then </span>
                      {rule.then}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="lm-switch lm-switch-sm"
                    defaultChecked={rule.on}
                    aria-label={`Rule ${rule.when}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Danger zone */}
          <section id="danger" className="lm-card" style={{ borderColor: "var(--lm-color-danger)" }}>
            <div className="lm-card-header">
              <h2 className="lm-card-title">Danger zone</h2>
              <p className="lm-card-subtitle">Irreversible project operations.</p>
            </div>
            <div className="lm-card-body grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <strong className="text-sm">Archive project</strong>
                  <p className="lm-hint text-xs">Hide from sidebar. Read-only.</p>
                </div>
                <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                  Archive
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[var(--lm-color-border)] pt-4">
                <div>
                  <strong className="text-sm">Delete project</strong>
                  <p className="lm-hint text-xs">
                    Removes {21} issues, {6} epics, all sprints. No recovery.
                  </p>
                </div>
                <button type="button" className="lm-btn lm-btn-danger lm-btn-sm">
                  Delete project
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
