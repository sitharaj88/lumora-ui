import Link from "next/link";
import { CrmAvatar } from "../components/avatar";
import { getCompany } from "../data/companies";
import { contacts, statusLabel, statusTone } from "../data/contacts";
import { formatValue } from "../data/deals";

export function ContactsPage() {
  const counts = {
    all: contacts.length,
    champion: contacts.filter((c) => c.status === "champion").length,
    customer: contacts.filter((c) => c.status === "customer").length,
    qualified: contacts.filter((c) => c.status === "qualified").length,
    lead: contacts.filter((c) => c.status === "lead").length,
    lapsed: contacts.filter((c) => c.status === "lapsed").length
  };
  const totalPipeline = contacts.reduce((s, c) => s + c.totalValue, 0);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Sales · Contacts
          </p>
          <h1 className="lm-page-title mt-1">Contacts</h1>
          <p className="lm-page-description">
            {counts.all} contacts across {new Set(contacts.map((c) => c.companyId)).size} companies
            · {formatValue(totalPipeline)} in associated deals
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Import
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Export
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + Add contact
          </button>
        </div>
      </header>

      {/* Status segments */}
      <div className="lm-segmented" role="group" aria-label="Filter by status">
        <button type="button" className="lm-segmented-item" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{counts.all}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Champions <span className="ml-1 text-[var(--lm-color-success)]">{counts.champion}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Customers <span className="ml-1 text-[var(--lm-color-info)]">{counts.customer}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Qualified <span className="ml-1 text-[var(--lm-color-warning)]">{counts.qualified}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Leads <span className="ml-1 text-[var(--lm-color-muted)]">{counts.lead}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Lapsed <span className="ml-1 text-[var(--lm-color-danger)]">{counts.lapsed}</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="name, email, company…" />
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
          <span className="lm-label text-xs">Industry</span>
          <select className="lm-select" defaultValue="all">
            <option value="all">Any industry</option>
            <option>Fintech</option>
            <option>Healthcare</option>
            <option>Logistics</option>
            <option>Media</option>
            <option>Retail</option>
            <option>Defense</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Last touched</span>
          <select className="lm-select" defaultValue="any">
            <option value="any">Any time</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Older than 30 days</option>
          </select>
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
                  Contact
                </button>
              </th>
              <th>Company</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Tags</th>
              <th className="text-right">Deals</th>
              <th className="text-right">Pipeline</th>
              <th>Last touched</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => {
              const company = getCompany(c.companyId);
              return (
                <tr key={c.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="lm-checkbox"
                      aria-label={`Select ${c.firstName} ${c.lastName}`}
                    />
                  </td>
                  <td>
                    <Link
                      href={`/preview/crm/contacts/${c.id}`}
                      className="flex items-center gap-3 text-inherit no-underline hover:text-[var(--lm-color-primary)]"
                    >
                      <CrmAvatar initials={c.initials} bg={c.bg} size="xs" />
                      <div>
                        <strong className="text-sm">
                          {c.firstName} {c.lastName}
                        </strong>
                        <p className="lm-hint text-xs">{c.title}</p>
                      </div>
                    </Link>
                  </td>
                  <td>
                    {company && (
                      <div className="flex items-center gap-2">
                        <CrmAvatar initials={company.initials} bg={company.bg} size="xs" />
                        <div>
                          <strong className="text-sm">{company.name}</strong>
                          <p className="lm-hint text-xs">{company.industry}</p>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <CrmAvatar initials={c.ownerInitials} bg={c.ownerBg} size="xs" />
                      <span className="text-xs">{c.ownerName}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`lm-badge lm-badge-${statusTone[c.status]} lm-badge-dot text-xs`}
                    >
                      {statusLabel[c.status]}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {c.tags.slice(0, 2).map((t) => (
                        <span className="lm-badge lm-badge-soft text-[10px]" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-right tabular-nums">{c.deals}</td>
                  <td className="text-right tabular-nums font-medium">
                    {c.totalValue > 0 ? formatValue(c.totalValue) : "—"}
                  </td>
                  <td>
                    <span className="text-xs text-[var(--lm-color-muted)]">
                      {c.lastTouchedRelative}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="lm-btn lm-btn-ghost lm-btn-icon lm-btn-sm"
                      aria-label={`Actions for ${c.firstName} ${c.lastName}`}
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-[var(--lm-color-muted)]">
          Showing 1–{contacts.length} of {contacts.length} contacts
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
            ›
          </a>
        </nav>
      </div>
    </div>
  );
}
