import { IssueKey, LabelChip, MemberAvatar, PriorityIcon, TypeIcon } from "./atoms";
import type { Issue } from "../data/issues";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <article className="lm-card lm-card-interactive" style={{ cursor: "grab" }}>
      <div className="lm-card-body grid gap-2.5 p-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <TypeIcon type={issue.type} />
            <IssueKey id={issue.key} />
          </div>
          <PriorityIcon priority={issue.priority} />
        </div>
        <strong className="text-sm leading-snug">{issue.title}</strong>
        {issue.labelIds.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issue.labelIds.map((l) => (
              <LabelChip id={l} key={l} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-[11px] text-[var(--lm-color-muted)]">
          <div className="flex items-center gap-2">
            {issue.assigneeId && <MemberAvatar id={issue.assigneeId} size="xs" />}
            {issue.points > 0 && (
              <span
                className="lm-badge lm-badge-outline tabular-nums"
                style={{ padding: "0 0.4rem", minHeight: "1.125rem", fontSize: "10px" }}
                title={`${issue.points} story points`}
              >
                {issue.points}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {issue.comments > 0 && (
              <span className="tabular-nums" title={`${issue.comments} comments`}>
                💬 {issue.comments}
              </span>
            )}
            <span className="tabular-nums">{issue.updatedRelative}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
