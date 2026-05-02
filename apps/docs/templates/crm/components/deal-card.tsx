import Link from "next/link";
import { CrmAvatar } from "./avatar";
import { ProbabilityBar } from "./probability-bar";
import { getCompany } from "../data/companies";
import { getContact } from "../data/contacts";
import { type Deal, formatValue } from "../data/deals";

export function DealCard({ deal }: { deal: Deal }) {
  const contact = getContact(deal.contactId);
  const company = getCompany(deal.companyId);
  return (
    <article className="lm-card lm-card-interactive" style={{ cursor: "grab" }}>
      <div className="lm-card-body grid gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <strong className="text-sm leading-snug">{deal.name}</strong>
          <span className="text-sm font-bold tabular-nums">{formatValue(deal.value)}</span>
        </div>

        {company && (
          <Link
            href={contact ? `/preview/crm/contacts/${contact.id}` : "/preview/crm/contacts"}
            className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)] no-underline hover:text-[var(--lm-color-text)]"
          >
            <CrmAvatar initials={company.initials} bg={company.bg} size="xs" />
            <span>{company.name}</span>
          </Link>
        )}

        <ProbabilityBar value={deal.probability} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CrmAvatar initials={deal.ownerInitials} bg={deal.ownerBg} size="xs" />
            <span className="text-[10px] text-[var(--lm-color-muted)]">
              {deal.ownerName}
            </span>
          </div>
          <span className="text-[10px] text-[var(--lm-color-muted)]">
            {deal.expectedCloseRelative}
          </span>
        </div>
      </div>
    </article>
  );
}
