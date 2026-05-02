import Link from "next/link";
import { AreaChart } from "../../../components/chart";
import { AccountAvatar, PersonAvatar } from "../components/account-avatar";
import { KpiTile } from "../components/kpi-tile";
import { accounts, formatMoney, formatMoneyFull, statusLabel, statusTone } from "../data/accounts";
import { recentActivity } from "../data/activity";

export function AccountDetailPage({ accountId }: { accountId: string }) {
  const account = accounts.find((a) => a.id === accountId) ?? accounts[0];
  const activity = recentActivity.filter((e) => !e.target || e.target.includes(account.name)).slice(0, 4);

  return (
    <div className="grid gap-6">
      {/* Page header */}
      <header className="lm-page-header">
        <div className="grid gap-3">
          <div className="flex items-center gap-3 text-xs text-[var(--lm-color-muted)]">
            <Link href="/preview/admin/accounts" className="hover:text-[var(--lm-color-text)]">
              Accounts
            </Link>
            <span aria-hidden>/</span>
            <span>{account.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <AccountAvatar account={account} size="lg" />
            <div className="grid gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="lm-page-title m-0">{account.name}</h1>
                <span
                  className={`lm-badge lm-badge-${statusTone[account.status]} lm-badge-dot text-xs`}
                >
                  {statusLabel[account.status]}
                </span>
                <span className="lm-badge lm-badge-soft text-xs">{account.plan}</span>
              </div>
              <p className="lm-hint">
                <code className="lm-code">{account.domain}</code> · {account.region} · since{" "}
                {account.since}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Impersonate
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Send notice
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Edit account
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="lm-tabs" role="tablist" aria-label="Account sections">
        <button type="button" role="tab" className="lm-tab" aria-selected="true">
          Overview
        </button>
        <button type="button" role="tab" className="lm-tab">
          Members <span className="lm-badge lm-badge-soft text-xs ml-1">{account.admins}</span>
        </button>
        <button type="button" role="tab" className="lm-tab">
          Billing
        </button>
        <button type="button" role="tab" className="lm-tab">
          Audit
        </button>
        <button type="button" role="tab" className="lm-tab">
          Settings
        </button>
      </div>

      {/* KPI strip — for this account */}
      <div className="lm-stat-grid">
        <KpiTile
          label="MRR"
          value={formatMoneyFull(account.mrr)}
          values={account.trendValues}
          chartColor={account.trend === "up" ? "success" : account.trend === "down" ? "danger" : "info"}
          tone={account.trend}
          delta={account.trend === "up" ? "+12.4%" : account.trend === "down" ? "−4.8%" : "stable"}
        />
        <KpiTile
          label="Active seats"
          value={`${account.seats}`}
          values={account.trendValues}
          chartColor="primary"
        />
        <KpiTile
          label="YTD spend"
          value={formatMoneyFull(account.spendYtd)}
          values={account.trendValues}
          chartColor="accent"
        />
        <KpiTile
          label="Admins"
          value={`${account.admins}`}
          values={[2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, account.admins]}
          chartColor="info"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Left column */}
        <div className="grid gap-6">
          <section className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Usage trend</h2>
                <p className="lm-card-subtitle">Monthly active seats · last 12 months</p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Download
              </button>
            </div>
            <div className="lm-card-body">
              <AreaChart
                height={220}
                showGrid
                series={[
                  {
                    label: "Active seats",
                    color: "primary",
                    values: account.trendValues
                  }
                ]}
              />
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Tags</h2>
            </div>
            <div className="lm-card-body">
              <div className="lm-tag-input">
                {account.tags.map((tag) => (
                  <span className="lm-tag lm-tag-removable" key={tag}>
                    {tag}
                    <button
                      type="button"
                      className="lm-tag-remove"
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input placeholder="Add tag…" />
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Recent activity</h2>
            </div>
            <div className="lm-card-body">
              <ul className="lm-timeline">
                {(activity.length > 0 ? activity : recentActivity.slice(0, 4)).map((e) => (
                  <li className="lm-timeline-item" key={e.id}>
                    <span className="lm-timeline-dot" aria-hidden="true" />
                    <div>
                      <p className="text-sm">
                        <strong>{e.who}</strong> {e.action}{" "}
                        {e.target && <strong>{e.target}</strong>}
                      </p>
                      <p className="lm-hint text-xs">{e.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid gap-6">
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Account profile</h2>
            </div>
            <div className="lm-card-body">
              <dl className="lm-description-list">
                <dt>Plan</dt>
                <dd>{account.plan}</dd>
                <dt>Status</dt>
                <dd>
                  <span className={`lm-badge lm-badge-${statusTone[account.status]} lm-badge-dot text-xs`}>
                    {statusLabel[account.status]}
                  </span>
                </dd>
                <dt>Domain</dt>
                <dd>
                  <code className="lm-code text-xs">{account.domain}</code>
                </dd>
                <dt>Region</dt>
                <dd>
                  <code className="lm-code text-xs">{account.region}</code>
                </dd>
                <dt>Since</dt>
                <dd>{account.since}</dd>
                <dt>Seats</dt>
                <dd className="tabular-nums">{account.seats}</dd>
                <dt>MRR</dt>
                <dd className="tabular-nums">{formatMoneyFull(account.mrr)}</dd>
                <dt>YTD</dt>
                <dd className="tabular-nums">{formatMoneyFull(account.spendYtd)}</dd>
              </dl>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <h2 className="lm-card-title">Owner</h2>
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Change
              </button>
            </div>
            <div className="lm-card-body">
              <div className="flex items-center gap-3">
                <PersonAvatar
                  initials={account.ownerInitials}
                  bg={account.ownerBg}
                  size="md"
                />
                <div className="grid">
                  <strong>{account.owner}</strong>
                  <span className="lm-hint text-xs">{account.admins - 1} other admins</span>
                </div>
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Danger zone</h2>
            </div>
            <div className="lm-card-body grid gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-sm">Suspend account</strong>
                  <p className="lm-hint text-xs">Read-only mode for all members.</p>
                </div>
                <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                  Suspend
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-sm">Delete account</strong>
                  <p className="lm-hint text-xs">Permanently remove all data.</p>
                </div>
                <button type="button" className="lm-btn lm-btn-danger lm-btn-sm">
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
