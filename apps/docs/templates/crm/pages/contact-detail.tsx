import Link from "next/link";
import { CrmAvatar } from "../components/avatar";
import { ProbabilityBar } from "../components/probability-bar";
import { crmActivity, activityIcon } from "../data/activity";
import { getCompany } from "../data/companies";
import { contacts, getContact, statusLabel, statusTone } from "../data/contacts";
import { dealsByContact, formatValue, formatValueFull, stageMeta } from "../data/deals";

export function ContactDetailPage({ contactId }: { contactId: string }) {
  const contact = getContact(contactId) ?? contacts[0];
  const company = getCompany(contact.companyId);
  const contactDeals = dealsByContact(contact.id);
  const contactActivity = crmActivity
    .filter((a) => a.contactId === contact.id)
    .slice(0, 8);

  return (
    <div className="grid gap-6">
      {/* Header */}
      <header className="lm-page-header">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
            <Link href="/preview/crm/contacts" className="hover:text-[var(--lm-color-text)]">
              Contacts
            </Link>
            <span aria-hidden>/</span>
            <span>
              {contact.firstName} {contact.lastName}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CrmAvatar initials={contact.initials} bg={contact.bg} size="lg" />
            <div className="grid gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="lm-page-title m-0">
                  {contact.firstName} {contact.lastName}
                </h1>
                <span
                  className={`lm-badge lm-badge-${statusTone[contact.status]} lm-badge-dot text-xs`}
                >
                  {statusLabel[contact.status]}
                </span>
              </div>
              <p className="lm-hint">
                {contact.title}
                {company && (
                  <>
                    {" · "}
                    <Link
                      href="/preview/crm/contacts"
                      className="text-[var(--lm-color-text)] hover:text-[var(--lm-color-primary)]"
                    >
                      {company.name}
                    </Link>
                    {" · "}
                    {company.industry}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            ✉ Email
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            📞 Call
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            🗓 Schedule
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            + New deal
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="lm-tabs" role="tablist" aria-label="Contact sections">
        <button type="button" role="tab" className="lm-tab" aria-selected="true">
          Overview
        </button>
        <button type="button" role="tab" className="lm-tab">
          Deals <span className="lm-badge lm-badge-soft text-xs ml-1">{contactDeals.length}</span>
        </button>
        <button type="button" role="tab" className="lm-tab">
          Activity{" "}
          <span className="lm-badge lm-badge-soft text-xs ml-1">{contactActivity.length}</span>
        </button>
        <button type="button" role="tab" className="lm-tab">
          Notes
        </button>
        <button type="button" role="tab" className="lm-tab">
          Files
        </button>
      </div>

      {/* KPI strip */}
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Pipeline value</span>
          <span className="lm-stat-value tabular-nums">{formatValue(contact.totalValue)}</span>
          <span className="lm-stat-trend">{contactDeals.length} deals</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Open deals</span>
          <span className="lm-stat-value tabular-nums">
            {contactDeals.filter((d) => d.stage !== "closed-won" && d.stage !== "closed-lost").length}
          </span>
          <span className="lm-stat-trend">across stages</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Last touched</span>
          <span className="lm-stat-value text-2xl">{contact.lastTouchedRelative}</span>
          <span className="lm-stat-trend">{contact.tags.length} tags</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Account owner</span>
          <span className="flex items-center gap-2 mt-1">
            <CrmAvatar initials={contact.ownerInitials} bg={contact.ownerBg} size="sm" />
            <strong className="text-base">{contact.ownerName}</strong>
          </span>
          <span className="lm-stat-trend">primary rep</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left column */}
        <div className="grid gap-6">
          {/* Deals */}
          <section className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <div>
                <h2 className="lm-card-title">Deals</h2>
                <p className="lm-card-subtitle">
                  {contactDeals.length} deal{contactDeals.length === 1 ? "" : "s"} ·{" "}
                  {formatValue(contact.totalValue)} total
                </p>
              </div>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                + New deal
              </button>
            </div>
            <div className="lm-card-body">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Deal</th>
                    <th>Stage</th>
                    <th className="text-right">Value</th>
                    <th>Probability</th>
                    <th>Close</th>
                  </tr>
                </thead>
                <tbody>
                  {contactDeals.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-sm text-[var(--lm-color-muted)] py-4">
                        No deals yet — start one with the button above.
                      </td>
                    </tr>
                  )}
                  {contactDeals.map((d) => {
                    const meta = stageMeta[d.stage];
                    return (
                      <tr key={d.id}>
                        <td>
                          <strong className="text-sm">{d.name}</strong>
                          <p className="lm-hint text-xs">via {d.source}</p>
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
                          <span className="text-xs text-[var(--lm-color-muted)]">
                            {d.expectedCloseRelative}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity timeline */}
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Activity</h2>
              <p className="lm-card-subtitle">{contactActivity.length} events</p>
            </div>
            <div className="lm-card-body">
              <ul className="lm-timeline">
                {(contactActivity.length > 0 ? contactActivity : crmActivity.slice(0, 4)).map(
                  (e) => (
                    <li className="lm-timeline-item" key={e.id}>
                      <span className="lm-timeline-dot" aria-hidden="true" />
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span aria-hidden>{activityIcon[e.type]}</span>
                          <strong>{e.authorName}</strong>
                          <span className="text-[var(--lm-color-muted)]">{e.summary}</span>
                        </div>
                        {e.detail && <p className="lm-hint text-xs">{e.detail}</p>}
                        <span className="lm-hint text-xs">{e.relativeTime}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>

          {/* Notes */}
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Internal notes</h2>
            </div>
            <div className="lm-card-body grid gap-3">
              <textarea
                className="lm-textarea"
                rows={3}
                placeholder="Add a note about this contact… visible only to your team."
                defaultValue=""
              />
              <div className="flex items-center justify-between">
                <span className="lm-hint text-xs">Markdown supported</span>
                <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
                  Save note
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid gap-6">
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Profile</h2>
            </div>
            <div className="lm-card-body">
              <dl className="lm-description-list">
                <dt>Email</dt>
                <dd>
                  <code className="lm-code text-xs">{contact.email}</code>
                </dd>
                <dt>Phone</dt>
                <dd>
                  <code className="lm-code text-xs">{contact.phone}</code>
                </dd>
                <dt>Title</dt>
                <dd>{contact.title}</dd>
                {company && (
                  <>
                    <dt>Company</dt>
                    <dd>{company.name}</dd>
                    <dt>Industry</dt>
                    <dd>{company.industry}</dd>
                    <dt>Size</dt>
                    <dd>{company.size}</dd>
                    <dt>Region</dt>
                    <dd>
                      <code className="lm-code text-xs">{company.region}</code>
                    </dd>
                  </>
                )}
                <dt>Pipeline</dt>
                <dd className="tabular-nums">{formatValueFull(contact.totalValue)}</dd>
              </dl>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Tags</h2>
            </div>
            <div className="lm-card-body">
              <div className="lm-tag-input">
                {contact.tags.map((t) => (
                  <span className="lm-tag lm-tag-removable" key={t}>
                    {t}
                    <button type="button" className="lm-tag-remove" aria-label={`Remove ${t}`}>
                      ×
                    </button>
                  </span>
                ))}
                <input placeholder="Add tag…" />
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-header flex items-center justify-between">
              <h2 className="lm-card-title">Owner</h2>
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Reassign
              </button>
            </div>
            <div className="lm-card-body">
              <div className="flex items-center gap-3">
                <CrmAvatar initials={contact.ownerInitials} bg={contact.ownerBg} size="md" />
                <div className="grid">
                  <strong>{contact.ownerName}</strong>
                  <span className="lm-hint text-xs">Primary rep</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
