import Link from "next/link";
import { CrmAvatar } from "../components/avatar";
import { ProbabilityBar } from "../components/probability-bar";
import { getCompany } from "../data/companies";
import { getContact } from "../data/contacts";
import { deals, formatValue, stageMeta } from "../data/deals";

export function DealsPage() {
  const open = deals.filter((d) => d.stage !== "closed-won" && d.stage !== "closed-lost");
  const won = deals.filter((d) => d.stage === "closed-won");
  const totalOpen = open.reduce((s, d) => s + d.value, 0);
  const totalWeighted = open.reduce((s, d) => s + (d.value * d.probability) / 100, 0);
  const totalWon = won.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Sales · Deals
          </p>
          <h1 className="lm-page-title mt-1">All deals</h1>
          <p className="lm-page-description">
            {open.length} open · {won.length} won this quarter ·{" "}
            {formatValue(totalOpen)} pipeline
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item">
              <Link href="/preview/crm" className="text-inherit no-underline">
                Board
              </Link>
            </button>
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              List
            </button>
            <button type="button" className="lm-segmented-item">
              Forecast
            </button>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New deal
          </button>
        </div>
      </header>

      {/* Summary strip */}
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Open pipeline</span>
          <span className="lm-stat-value tabular-nums">{formatValue(totalOpen)}</span>
          <span className="lm-stat-trend">{open.length} deals</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Weighted forecast</span>
          <span className="lm-stat-value tabular-nums">{formatValue(totalWeighted)}</span>
          <span className="lm-stat-trend">probability × value</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Won this quarter</span>
          <span className="lm-stat-value tabular-nums">{formatValue(totalWon)}</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ {won.length} deals</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Avg deal size</span>
          <span className="lm-stat-value tabular-nums">
            {formatValue(Math.round(totalOpen / Math.max(open.length, 1)))}
          </span>
          <span className="lm-stat-trend">across open deals</span>
        </div>
      </div>

      {/* Stage filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--lm-color-muted)]">Stage:</span>
        <button type="button" className="lm-badge lm-badge-soft text-xs">
          All <span className="ml-1">{deals.length}</span>
        </button>
        {Object.entries(stageMeta).map(([stage, meta]) => {
          const count = deals.filter((d) => d.stage === stage).length;
          if (count === 0) return null;
          return (
            <button
              type="button"
              key={stage}
              className={`lm-badge lm-badge-${meta.tone} text-xs`}
            >
              {meta.label} <span className="ml-1">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="deal name, company…" />
          </div>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Owner</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Anyone</option>
            <option>Aria Bennett</option>
            <option>Daniel Cole</option>
            <option>Mateo Cruz</option>
            <option>Riya Shah</option>
            <option>Jin Hong</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Source</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any source</option>
            <option>Outbound</option>
            <option>Inbound</option>
            <option>Referral</option>
            <option>Marketing</option>
            <option>Partner</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Close window</span>
          <select className="lm-select" defaultValue="quarter">
            <option>This week</option>
            <option>This month</option>
            <option value="quarter">This quarter</option>
            <option>This year</option>
          </select>
        </label>
      </div>

      {/* Table */}
      <section className="lm-card overflow-hidden">
        <table className="lm-table">
          <thead>
            <tr>
              <th aria-sort="descending">
                <button type="button" className="lm-table-sort">
                  Deal
                </button>
              </th>
              <th>Company</th>
              <th>Owner</th>
              <th>Stage</th>
              <th className="text-right">
                <button type="button" className="lm-table-sort">
                  Value
                </button>
              </th>
              <th>Probability</th>
              <th>Source</th>
              <th>
                <button type="button" className="lm-table-sort">
                  Close
                </button>
              </th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...deals]
              .sort((a, b) => b.value - a.value)
              .map((d) => {
                const company = getCompany(d.companyId);
                const contact = getContact(d.contactId);
                const meta = stageMeta[d.stage];
                return (
                  <tr key={d.id}>
                    <td>
                      {contact ? (
                        <Link
                          href={`/preview/crm/contacts/${contact.id}`}
                          className="text-inherit no-underline hover:text-[var(--lm-color-primary)]"
                        >
                          <strong className="text-sm">{d.name}</strong>
                          <p className="lm-hint text-xs">
                            {contact.firstName} {contact.lastName}
                          </p>
                        </Link>
                      ) : (
                        <strong className="text-sm">{d.name}</strong>
                      )}
                    </td>
                    <td>
                      {company && (
                        <div className="flex items-center gap-2">
                          <CrmAvatar initials={company.initials} bg={company.bg} size="xs" />
                          <span className="text-sm">{company.name}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <CrmAvatar initials={d.ownerInitials} bg={d.ownerBg} size="xs" />
                        <span className="text-xs">{d.ownerName}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`lm-badge lm-badge-${meta.tone} text-xs`}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="text-right tabular-nums font-medium">
                      {formatValue(d.value)}
                    </td>
                    <td style={{ minWidth: "8rem" }}>
                      <ProbabilityBar value={d.probability} />
                    </td>
                    <td>
                      <span className="lm-badge lm-badge-outline text-xs">{d.source}</span>
                    </td>
                    <td>
                      <span className="text-xs text-[var(--lm-color-muted)]">
                        {d.expectedCloseRelative}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-[var(--lm-color-muted)] tabular-nums">
                        {d.ageDays}d
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                        aria-label={`Actions for ${d.name}`}
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
