import { DocsNav } from "../../components/docs-nav";

export const metadata = {
  title: "Enterprise Patterns - Lumora UI"
};

const navItems = [
  ["dashboard-shell", "Dashboard shell"],
  ["data-table", "Data table workflow"],
  ["settings-form", "Settings form"],
  ["billing", "Billing controls"],
  ["user-management", "User management"],
  ["analytics", "Analytics overview"],
  ["auth", "Login page"]
];

export default function PatternsPage() {
  return (
    <main id="main-content" className="docs-shell min-h-screen">
      <DocsNav />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12">
        <div className="grid max-w-3xl gap-4">
          <span className="lm-badge lm-badge-primary w-fit">Patterns</span>
          <h1 className="text-4xl font-bold md:text-5xl">Enterprise workflows</h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">
            Production layouts for SaaS, admin, billing, analytics, and internal tools using the new
            enterprise primitives.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
          <aside className="lm-sidebar rounded-lg">
            {navItems.map(([id, label], index) => (
              <a
                className={`lm-sidebar-item ${index === 0 ? "lm-sidebar-item-active" : ""}`}
                href={`#${id}`}
                key={id}
              >
                {label}
              </a>
            ))}
          </aside>

          <div className="grid gap-8">
            <section
              className="lm-app-shell lm-app-shell-sidebar overflow-hidden rounded-lg border border-[var(--lm-color-border)]"
              id="dashboard-shell"
            >
              <aside className="lm-sidebar">
                <strong>Lumora Ops</strong>
                <a className="lm-sidebar-item" aria-current="page" href="#">
                  Overview
                </a>
                <a className="lm-sidebar-item" href="#">
                  Accounts
                </a>
                <a className="lm-sidebar-item" href="#">
                  Billing
                </a>
                <a className="lm-sidebar-item" href="#">
                  Security
                </a>
              </aside>
              <div className="lm-app-main">
                <header className="lm-page-header">
                  <div>
                    <h2 className="lm-page-title">Dashboard shell</h2>
                    <p className="lm-page-description">
                      Sidebar, command bar, stats, and activity in one layout.
                    </p>
                  </div>
                  <button className="lm-btn lm-btn-primary">Create account</button>
                </header>
                <div className="lm-command-bar">
                  <span className="lm-hint">Synced 2 minutes ago</span>
                  <div className="flex flex-wrap gap-2">
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Export</button>
                    <button className="lm-btn lm-btn-secondary lm-btn-sm">Invite</button>
                  </div>
                </div>
                <div className="lm-stat-grid">
                  {[
                    ["Revenue", "$1.28M", "+12.4%", "lm-stat-trend-up"],
                    ["Active seats", "18,420", "+4.8%", "lm-stat-trend-up"],
                    ["Risk reviews", "37", "-8.1%", "lm-stat-trend-down"]
                  ].map(([label, value, trend, className]) => (
                    <div className="lm-stat" key={label}>
                      <span className="lm-stat-label">{label}</span>
                      <strong className="lm-stat-value">{value}</strong>
                      <span className={`lm-stat-trend ${className}`}>{trend} this month</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="lm-card" id="data-table">
              <div className="lm-card-header">
                <h2 className="lm-card-title">Data table workflow</h2>
              </div>
              <div className="lm-card-body">
                <div className="lm-table-toolbar">
                  <div>
                    <h3 className="lm-table-title">Enterprise accounts</h3>
                    <p className="lm-hint">
                      Sortable columns, filters, bulk actions, and pagination.
                    </p>
                  </div>
                  <button className="lm-btn lm-btn-primary lm-btn-sm">Add account</button>
                </div>
                <div className="lm-filter-bar mb-4">
                  <label className="lm-field">
                    <span className="lm-label">Search</span>
                    <input className="lm-input lm-input-sm" placeholder="Company or domain" />
                  </label>
                  <label className="lm-field">
                    <span className="lm-label">Status</span>
                    <select className="lm-select lm-select-sm" defaultValue="all">
                      <option value="all">All statuses</option>
                      <option value="active">Active</option>
                      <option value="review">Review</option>
                    </select>
                  </label>
                  <label className="lm-field">
                    <span className="lm-label">Owner</span>
                    <select className="lm-select lm-select-sm" defaultValue="all">
                      <option value="all">All owners</option>
                      <option value="finance">Finance</option>
                    </select>
                  </label>
                </div>
                <div className="lm-bulk-bar mb-4">
                  <strong>3 accounts selected</strong>
                  <div className="flex flex-wrap gap-2">
                    <button className="lm-btn lm-btn-outline lm-btn-sm">Assign</button>
                    <button className="lm-btn lm-btn-danger lm-btn-sm">Suspend</button>
                  </div>
                </div>
                <table className="lm-table lm-table-striped">
                  <thead>
                    <tr>
                      <th scope="col">
                        <button className="lm-table-sort" aria-sort="ascending">
                          Account
                        </button>
                      </th>
                      <th scope="col">Owner</th>
                      <th scope="col">Status</th>
                      <th scope="col">Spend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Northstar Health", "Maya", "Active", "$84,200"],
                      ["Atlas Finance", "Ravi", "Review", "$52,910"],
                      ["Kinetic Labs", "Lena", "Active", "$29,440"]
                    ].map(([account, owner, status, spend]) => (
                      <tr key={account}>
                        <td>{account}</td>
                        <td>{owner}</td>
                        <td>
                          <span
                            className={`lm-badge ${status === "Active" ? "lm-badge-success" : "lm-badge-warning"}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td>{spend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="lm-pagination mt-4" aria-label="Accounts pages">
                  <a className="lm-pagination-item" aria-current="page" href="#">
                    1
                  </a>
                  <a className="lm-pagination-item" href="#">
                    2
                  </a>
                  <a className="lm-pagination-item" href="#">
                    Next
                  </a>
                </nav>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2" id="settings-form">
              <div className="lm-card">
                <div className="lm-card-header">
                  <h2 className="lm-card-title">Settings form</h2>
                </div>
                <div className="lm-card-body grid gap-4">
                  <label className="lm-field">
                    <span className="lm-label">Workspace name</span>
                    <input className="lm-input" defaultValue="Lumora Operations" />
                  </label>
                  <label className="lm-field">
                    <span className="lm-label">Security contact</span>
                    <input
                      className="lm-input lm-input-danger"
                      aria-invalid="true"
                      defaultValue="security@"
                    />
                    <span className="lm-hint">Enter a complete email address.</span>
                  </label>
                  <div className="lm-banner lm-banner-warning">
                    <strong>SSO enforcement changes affect all users.</strong>
                    <button className="lm-btn lm-btn-warning lm-btn-sm">Review policy</button>
                  </div>
                </div>
              </div>
              <div className="lm-card" id="billing">
                <div className="lm-card-header">
                  <h2 className="lm-card-title">Billing controls</h2>
                </div>
                <div className="lm-card-body">
                  <dl className="lm-description-list">
                    <dt>Plan</dt>
                    <dd>Enterprise annual</dd>
                    <dt>Renewal</dt>
                    <dd>April 28, 2027</dd>
                    <dt>Billing owner</dt>
                    <dd>finance@example.com</dd>
                    <dt>Seats</dt>
                    <dd>18,420 active</dd>
                  </dl>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2" id="user-management">
              <div className="lm-card">
                <div className="lm-card-header">
                  <h2 className="lm-card-title">User management</h2>
                </div>
                <div className="lm-card-body">
                  <ul className="lm-activity-feed">
                    <li className="lm-activity-item">
                      <span className="lm-avatar lm-avatar-sm">MS</span>
                      <div className="lm-activity-content">
                        <strong>Maya Shah invited 12 users</strong>
                        <span className="lm-activity-meta">2 minutes ago</span>
                      </div>
                    </li>
                    <li className="lm-activity-item">
                      <span className="lm-avatar lm-avatar-sm">RL</span>
                      <div className="lm-activity-content">
                        <strong>Ravi Lee changed billing role</strong>
                        <span className="lm-activity-meta">18 minutes ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lm-card" id="analytics">
                <div className="lm-card-header">
                  <h2 className="lm-card-title">Analytics overview</h2>
                </div>
                <div className="lm-card-body">
                  <ol className="lm-timeline">
                    <li className="lm-timeline-item">
                      <span className="lm-timeline-dot" />
                      <div>
                        <strong>Import completed</strong>
                        <p className="lm-hint">42,000 records processed.</p>
                      </div>
                    </li>
                    <li className="lm-timeline-item">
                      <span className="lm-timeline-dot" />
                      <div>
                        <strong>Risk model refreshed</strong>
                        <p className="lm-hint">New scorecard available.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="lm-card" id="auth">
              <div className="lm-card-header">
                <h2 className="lm-card-title">Login page</h2>
              </div>
              <div className="lm-card-body grid place-items-center">
                <form className="grid w-full max-w-sm gap-4" aria-label="Sign in">
                  <label className="lm-field">
                    <span className="lm-label">Email</span>
                    <input className="lm-input" type="email" placeholder="name@company.com" />
                  </label>
                  <label className="lm-field">
                    <span className="lm-label">Password</span>
                    <input className="lm-input" type="password" />
                  </label>
                  <button className="lm-btn lm-btn-primary" type="button">
                    Sign in
                  </button>
                  <div className="lm-empty-state">
                    <h3 className="lm-empty-state-title">No SSO provider configured</h3>
                    <p>Connect SAML or OIDC from workspace settings.</p>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
