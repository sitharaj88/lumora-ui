import { getLabel } from "../data/labels";
import { type Issue, priorityMeta, typeMeta } from "../data/issues";
import { getMember } from "../data/members";

export function MemberAvatar({
  id,
  size = "xs"
}: {
  id: string;
  size?: "xs" | "sm" | "md";
}) {
  const m = getMember(id);
  if (!m) {
    return (
      <span
        className={`lm-avatar lm-avatar-${size}`}
        style={{ background: "var(--lm-color-surface-raised)" }}
        aria-label="Unassigned"
      >
        ?
      </span>
    );
  }
  return (
    <span
      className={`lm-avatar lm-avatar-${size}`}
      style={{ background: m.bg }}
      aria-label={m.name}
      title={m.name}
    >
      {m.initials}
    </span>
  );
}

export function PriorityIcon({ priority }: { priority: Issue["priority"] }) {
  const meta = priorityMeta[priority];
  return (
    <span
      className="inline-flex items-center justify-center text-xs font-bold tabular-nums"
      style={{ color: `var(--lm-color-${meta.tone === "soft" ? "muted" : meta.tone})` }}
      title={meta.label}
      aria-label={`Priority ${meta.label}`}
    >
      {meta.symbol}
    </span>
  );
}

export function TypeIcon({ type }: { type: Issue["type"] }) {
  const meta = typeMeta[type];
  return (
    <span
      className="inline-flex items-center justify-center text-xs"
      style={{ color: `var(--lm-color-${meta.tone === "soft" ? "muted" : meta.tone})` }}
      title={meta.label}
      aria-label={`Type ${meta.label}`}
    >
      {meta.symbol}
    </span>
  );
}

export function LabelChip({ id }: { id: string }) {
  const l = getLabel(id);
  if (!l) return null;
  return (
    <span
      className={`lm-badge lm-badge-${l.color === "soft" ? "soft" : l.color} text-[10px]`}
      style={{ padding: "0 0.375rem" }}
    >
      {l.name}
    </span>
  );
}

export function IssueKey({ id }: { id: string }) {
  return (
    <code className="lm-code text-[10px] tabular-nums" style={{ padding: "0 0.25rem" }}>
      {id}
    </code>
  );
}
