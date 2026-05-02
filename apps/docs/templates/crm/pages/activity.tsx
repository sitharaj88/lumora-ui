import Link from "next/link";
import { CrmAvatar } from "../components/avatar";
import { activityIcon, crmActivity } from "../data/activity";
import { getContact } from "../data/contacts";

export function ActivityPage() {
  const counts = {
    all: crmActivity.length,
    call: crmActivity.filter((a) => a.type === "call").length,
    email: crmActivity.filter((a) => a.type === "email").length,
    meeting: crmActivity.filter((a) => a.type === "meeting").length,
    note: crmActivity.filter((a) => a.type === "note").length,
    stage: crmActivity.filter((a) => a.type === "stage").length
  };

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Workspace · Activity
          </p>
          <h1 className="lm-page-title mt-1">Team activity</h1>
          <p className="lm-page-description">
            Calls, emails, meetings, notes, and stage moves across the team.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Subscribe
          </button>
          <button type="button" className="lm-btn lm-btn-primary lm-btn-sm">
            Log activity
          </button>
        </div>
      </header>

      {/* Type filter */}
      <div className="lm-segmented" role="group" aria-label="Filter by activity type">
        <button type="button" className="lm-segmented-item" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{counts.all}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          ✉ Email <span className="ml-1 text-[var(--lm-color-muted)]">{counts.email}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          📞 Call <span className="ml-1 text-[var(--lm-color-muted)]">{counts.call}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          🗓 Meeting <span className="ml-1 text-[var(--lm-color-muted)]">{counts.meeting}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          ✎ Note <span className="ml-1 text-[var(--lm-color-muted)]">{counts.note}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          → Stage <span className="ml-1 text-[var(--lm-color-muted)]">{counts.stage}</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="contact, deal, content…" />
          </div>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Author</span>
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
          <span className="lm-label text-xs">Range</span>
          <select className="lm-select" defaultValue="week">
            <option>Today</option>
            <option value="week">Last 7 days</option>
            <option>Last 30 days</option>
            <option>This quarter</option>
          </select>
        </label>
      </div>

      {/* Feed grouped by day */}
      <div className="grid gap-6">
        {groupByDay(crmActivity).map(({ label, items }) => (
          <section key={label} className="grid gap-3">
            <div className="flex items-center gap-3">
              <span className="docs-section-eyebrow">{label}</span>
              <span className="lm-badge lm-badge-soft text-xs">{items.length}</span>
              <span
                className="flex-1 h-px"
                style={{ background: "var(--lm-color-border)" }}
                aria-hidden="true"
              />
            </div>
            <div className="grid gap-2">
              {items.map((e) => {
                const contact = e.contactId ? getContact(e.contactId) : undefined;
                return (
                  <article
                    key={e.id}
                    className="lm-card lm-card-flat"
                    style={{ borderColor: "var(--lm-color-border)" }}
                  >
                    <div className="lm-card-body grid gap-3 p-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                      <CrmAvatar initials={e.authorInitials} bg={e.authorBg} size="md" />
                      <div className="grid gap-1 min-w-0">
                        <p className="text-sm">
                          <strong>{e.authorName}</strong>{" "}
                          <span className="text-[var(--lm-color-muted)]">{e.summary}</span>
                        </p>
                        {e.detail && <p className="lm-hint text-xs leading-relaxed">{e.detail}</p>}
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                          <span className="lm-badge lm-badge-soft" aria-label={`Type ${e.type}`}>
                            {activityIcon[e.type]} {e.type}
                          </span>
                          {contact && (
                            <Link
                              href={`/preview/crm/contacts/${contact.id}`}
                              className="lm-badge lm-badge-outline no-underline"
                            >
                              {contact.firstName} {contact.lastName}
                            </Link>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-[var(--lm-color-muted)] whitespace-nowrap">
                        {e.relativeTime}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function groupByDay(events: typeof crmActivity) {
  const today: typeof crmActivity = [];
  const yesterday: typeof crmActivity = [];
  const earlier: typeof crmActivity = [];
  for (const e of events) {
    if (e.relativeTime.includes("min") || e.relativeTime.includes("hr")) today.push(e);
    else if (e.relativeTime === "yesterday") yesterday.push(e);
    else earlier.push(e);
  }
  const groups: { label: string; items: typeof crmActivity }[] = [];
  if (today.length) groups.push({ label: "Today", items: today });
  if (yesterday.length) groups.push({ label: "Yesterday", items: yesterday });
  if (earlier.length) groups.push({ label: "Earlier", items: earlier });
  return groups;
}
