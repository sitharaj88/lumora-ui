import Link from "next/link";
import { AccountAvatar, PersonAvatar } from "../components/account-avatar";
import { MiniSpark } from "../components/mini-spark";
import { accounts, formatMoney, statusLabel, statusTone } from "../data/accounts";

export function AccountsPage() {
  const totals = {
    all: accounts.length,
    active: accounts.filter((a) => a.status === "active").length,
    review: accounts.filter((a) => a.status === "review").length,
    trial: accounts.filter((a) => a.status === "trial").length,
    paused: accounts.filter((a) => a.status === "paused").length
  };

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">Workspace</p>
          <h1 className="lm-page-title mt-1">Accounts</h1>
          <p className="lm-page-description">
            {totals.all} accounts · {totals.active} active · {totals.review} in review
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Import CSV
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New account
          </button>
        </div>
      </header>

      {/* Status segments */}
      <div className="lm-segmented" role="group" aria-label="Filter by status">
        <button type="button" className="lm-segmented-item" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{totals.all}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Active <span className="ml-1 text-[var(--lm-color-muted)]">{totals.active}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Review <span className="ml-1 text-[var(--lm-color-muted)]">{totals.review}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Trial <span className="ml-1 text-[var(--lm-color-muted)]">{totals.trial}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Paused <span className="ml-1 text-[var(--lm-color-muted)]">{totals.paused}</span>
        </button>
      </div>

      {/* Bulk actions */}
      <div className="lm-bulk-bar" aria-live="polite">
        <strong>3 accounts selected</strong>
        <div className="flex gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Tag
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Send notice
          </button>
          <button type="button" className="lm-btn lm-btn-danger lm-btn-sm">
            Suspend
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input
              className="lm-input"
              placeholder="Find by name, owner, or domain…"
              defaultValue=""
            />
          </div>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Plan</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any plan</option>
            <option value="enterprise">Enterprise</option>
            <option value="growth">Growth</option>
            <option value="trial">Trial</option>
            <option value="starter">Starter</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Region</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any region</option>
            <option value="us-east-1">us-east-1</option>
            <option value="us-west-2">us-west-2</option>
            <option value="eu-central-1">eu-central-1</option>
            <option value="eu-west-1">eu-west-1</option>
            <option value="ap-southeast-1">ap-southeast-1</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Owner</span>
          <input className="lm-input" placeholder="Anyone" />
        </label>
      </div>

      {/* Table */}
      <section className="lm-card overflow-hidden">
        <table className="lm-table">
          <thead>
            <tr>
              <th style={{ width: "1.5rem" }}>
                <input type="checkbox" className="lm-checkbox" aria-label="Select all" />
              </th>
              <th aria-sort="ascending">
                <button type="button" className="lm-table-sort">
                  Account
                </button>
              </th>
              <th>Owner</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Region</th>
              <th className="text-right">
                <button type="button" className="lm-table-sort">
                  Seats
                </button>
              </th>
              <th className="text-right">
                <button type="button" className="lm-table-sort">
                  MRR
                </button>
              </th>
              <th className="text-right">
                <button type="button" className="lm-table-sort">
                  YTD spend
                </button>
              </th>
              <th>Trend</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a, i) => (
              <tr key={a.id}>
                <td>
                  <input
                    type="checkbox"
                    className="lm-checkbox"
                    defaultChecked={i < 3}
                    aria-label={`Select ${a.name}`}
                  />
                </td>
                <td>
                  <Link
                    href={`/preview/admin/accounts/${a.id}`}
                    className="flex items-center gap-3 text-inherit no-underline hover:text-[var(--lm-color-primary)]"
                  >
                    <AccountAvatar account={a} size="xs" />
                    <div>
                      <strong className="text-sm">{a.name}</strong>
                      <p className="lm-hint text-xs">{a.domain}</p>
                    </div>
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <PersonAvatar initials={a.ownerInitials} bg={a.ownerBg} size="xs" />
                    <span className="text-sm">{a.owner}</span>
                  </div>
                </td>
                <td>
                  <span className="lm-badge lm-badge-soft text-xs">{a.plan}</span>
                </td>
                <td>
                  <span
                    className={`lm-badge lm-badge-${statusTone[a.status]} lm-badge-dot text-xs`}
                  >
                    {statusLabel[a.status]}
                  </span>
                </td>
                <td>
                  <code className="lm-code text-xs">{a.region}</code>
                </td>
                <td className="text-right tabular-nums">{a.seats}</td>
                <td className="text-right tabular-nums">{formatMoney(a.mrr)}</td>
                <td className="text-right tabular-nums font-medium">{formatMoney(a.spendYtd)}</td>
                <td>
                  <MiniSpark
                    values={a.trendValues}
                    color={a.trend === "up" ? "success" : a.trend === "down" ? "danger" : "info"}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                    aria-label={`More actions for ${a.name}`}
                  >
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer / pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-[var(--lm-color-muted)]">
          Showing 1–{accounts.length} of {accounts.length} accounts
        </span>
        <nav className="lm-pagination" aria-label="Pagination">
          <a className="lm-pagination-item" aria-disabled="true">
            ‹
          </a>
          <a className="lm-pagination-item" href="#" aria-current="page">
            1
          </a>
          <a className="lm-pagination-item" href="#">
            2
          </a>
          <a className="lm-pagination-item" href="#">
            3
          </a>
          <a className="lm-pagination-item" href="#">
            ›
          </a>
        </nav>
      </div>
    </div>
  );
}
