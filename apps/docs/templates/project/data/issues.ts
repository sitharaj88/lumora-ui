export type IssueStatus = "backlog" | "todo" | "in-progress" | "review" | "done";
export type IssuePriority = "urgent" | "high" | "medium" | "low" | "none";
export type IssueType = "feature" | "bug" | "chore" | "docs";

export type Issue = {
  id: string;
  /** Linear-style key, e.g. LMR-142 */
  key: string;
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId: string | null;
  /** Story points. */
  points: number;
  labelIds: string[];
  epicId: string | null;
  /** Sprint id, if scheduled. */
  sprintId: string | null;
  due: string | null;
  comments: number;
  /** Human-readable relative time for last update. */
  updatedRelative: string;
};

export const issues: Issue[] = [
  // Backlog
  { id: "i-101", key: "LMR-142", title: "Audit log streaming to S3 sink", type: "feature", status: "backlog", priority: "medium", assigneeId: "mk", points: 8, labelIds: ["infra", "v0.4"], epicId: "ep-headless", sprintId: null, due: null, comments: 4, updatedRelative: "3d ago" },
  { id: "i-102", key: "LMR-143", title: "Per-tenant theming UI in admin", type: "feature", status: "backlog", priority: "high", assigneeId: "al", points: 13, labelIds: ["design", "ui", "v0.4"], epicId: "ep-themes", sprintId: null, due: "2026-06-15", comments: 7, updatedRelative: "1d ago" },
  { id: "i-103", key: "LMR-144", title: "Webhook exponential-backoff retry", type: "feature", status: "backlog", priority: "low", assigneeId: "sp", points: 5, labelIds: ["api"], epicId: null, sprintId: null, due: null, comments: 1, updatedRelative: "5d ago" },
  { id: "i-104", key: "LMR-145", title: "RTL audit on overlay components", type: "chore", status: "backlog", priority: "medium", assigneeId: "rs", points: 8, labelIds: ["polish"], epicId: "ep-rtl", sprintId: null, due: "2026-07-01", comments: 2, updatedRelative: "4d ago" },
  { id: "i-105", key: "LMR-146", title: "Color-picker component", type: "feature", status: "backlog", priority: "low", assigneeId: null, points: 8, labelIds: ["ui"], epicId: null, sprintId: null, due: null, comments: 0, updatedRelative: "1w ago" },
  { id: "i-106", key: "LMR-147", title: "CLI: `lumora init` scaffolder", type: "feature", status: "backlog", priority: "medium", assigneeId: "jh", points: 13, labelIds: ["docs"], epicId: "ep-cli", sprintId: null, due: null, comments: 3, updatedRelative: "3d ago" },
  { id: "i-107", key: "LMR-148", title: "Skeleton width-jitter polish", type: "chore", status: "backlog", priority: "low", assigneeId: "rs", points: 2, labelIds: ["polish"], epicId: null, sprintId: null, due: null, comments: 0, updatedRelative: "2w ago" },
  // Todo
  { id: "i-110", key: "LMR-150", title: "Combobox component", type: "feature", status: "todo", priority: "high", assigneeId: "mk", points: 8, labelIds: ["ui", "v0.3"], epicId: "ep-headless", sprintId: "s-24", due: "2026-04-30", comments: 12, updatedRelative: "2h ago" },
  { id: "i-111", key: "LMR-151", title: "Date-picker calendar with range", type: "feature", status: "todo", priority: "high", assigneeId: "al", points: 13, labelIds: ["ui", "v0.3"], epicId: "ep-headless", sprintId: "s-24", due: "2026-05-02", comments: 8, updatedRelative: "5h ago" },
  // In progress
  { id: "i-120", key: "LMR-160", title: "Donut chart with center total", type: "feature", status: "in-progress", priority: "medium", assigneeId: "al", points: 5, labelIds: ["ui"], epicId: "ep-charts", sprintId: "s-24", due: "2026-04-28", comments: 5, updatedRelative: "1h ago" },
  { id: "i-121", key: "LMR-161", title: "Theme runtime swap without reload", type: "feature", status: "in-progress", priority: "urgent", assigneeId: "rs", points: 8, labelIds: ["ui"], epicId: "ep-themes", sprintId: "s-24", due: "2026-04-29", comments: 14, updatedRelative: "30m ago" },
  { id: "i-122", key: "LMR-162", title: "Memory leak in tooltip portal", type: "bug", status: "in-progress", priority: "urgent", assigneeId: "mk", points: 3, labelIds: ["bug", "perf"], epicId: null, sprintId: "s-24", due: "2026-04-26", comments: 9, updatedRelative: "20m ago" },
  // Review
  { id: "i-130", key: "LMR-170", title: "OTP slot animation polish", type: "chore", status: "review", priority: "low", assigneeId: "sp", points: 2, labelIds: ["polish", "ui"], epicId: null, sprintId: "s-24", due: "2026-04-28", comments: 3, updatedRelative: "2h ago" },
  { id: "i-131", key: "LMR-171", title: "Improve focus ring contrast on Aurora theme", type: "bug", status: "review", priority: "high", assigneeId: "rs", points: 2, labelIds: ["bug", "ui"], epicId: null, sprintId: "s-24", due: "2026-04-29", comments: 4, updatedRelative: "1h ago" },
  { id: "i-132", key: "LMR-172", title: "Tag input keyboard nav", type: "feature", status: "review", priority: "medium", assigneeId: "jh", points: 5, labelIds: ["ui", "v0.3"], epicId: "ep-headless", sprintId: "s-24", due: "2026-04-30", comments: 6, updatedRelative: "4h ago" },
  // Done
  { id: "i-140", key: "LMR-180", title: "Stepper component", type: "feature", status: "done", priority: "high", assigneeId: "mk", points: 5, labelIds: ["ui"], epicId: "ep-headless", sprintId: "s-23", due: "2026-04-19", comments: 11, updatedRelative: "1w ago" },
  { id: "i-141", key: "LMR-181", title: "Glass card variant", type: "feature", status: "done", priority: "medium", assigneeId: "al", points: 3, labelIds: ["ui", "polish"], epicId: null, sprintId: "s-23", due: "2026-04-15", comments: 4, updatedRelative: "1w ago" },
  { id: "i-142", key: "LMR-182", title: "Dropdown w/ arrow + sections", type: "feature", status: "done", priority: "medium", assigneeId: "rs", points: 5, labelIds: ["ui"], epicId: "ep-headless", sprintId: "s-23", due: "2026-04-17", comments: 7, updatedRelative: "1w ago" },
  { id: "i-143", key: "LMR-183", title: "Bundle size pass: -28% CSS", type: "chore", status: "done", priority: "high", assigneeId: "jh", points: 8, labelIds: ["perf"], epicId: "ep-perf", sprintId: "s-23", due: "2026-04-12", comments: 9, updatedRelative: "2w ago" },
  { id: "i-144", key: "LMR-184", title: "Sparkline component", type: "feature", status: "done", priority: "medium", assigneeId: "al", points: 3, labelIds: ["ui"], epicId: "ep-charts", sprintId: "s-23", due: "2026-04-21", comments: 3, updatedRelative: "5d ago" },
  { id: "i-145", key: "LMR-185", title: "Skeleton shimmer effect", type: "chore", status: "done", priority: "low", assigneeId: "rs", points: 2, labelIds: ["polish"], epicId: null, sprintId: "s-23", due: "2026-04-14", comments: 1, updatedRelative: "2w ago" }
];

export const statusMeta: Record<
  IssueStatus,
  { label: string; tone: string; color: string }
> = {
  backlog: { label: "Backlog", tone: "soft", color: "info" },
  todo: { label: "Todo", tone: "soft", color: "muted" },
  "in-progress": { label: "In progress", tone: "warning", color: "warning" },
  review: { label: "Review", tone: "accent", color: "accent" },
  done: { label: "Done", tone: "success", color: "success" }
};

export const priorityMeta: Record<
  IssuePriority,
  { label: string; symbol: string; tone: string }
> = {
  urgent: { label: "Urgent", symbol: "▲", tone: "danger" },
  high: { label: "High", symbol: "▲", tone: "warning" },
  medium: { label: "Medium", symbol: "■", tone: "info" },
  low: { label: "Low", symbol: "▼", tone: "soft" },
  none: { label: "—", symbol: "—", tone: "soft" }
};

export const typeMeta: Record<IssueType, { label: string; symbol: string; tone: string }> = {
  feature: { label: "Feature", symbol: "✦", tone: "primary" },
  bug: { label: "Bug", symbol: "●", tone: "danger" },
  chore: { label: "Chore", symbol: "▴", tone: "soft" },
  docs: { label: "Docs", symbol: "≡", tone: "info" }
};

export const boardColumns: IssueStatus[] = ["backlog", "todo", "in-progress", "review", "done"];

export function issuesByStatus(status: IssueStatus) {
  return issues.filter((i) => i.status === status);
}

export function issuesBySprint(sprintId: string) {
  return issues.filter((i) => i.sprintId === sprintId);
}

export function issuesByEpic(epicId: string) {
  return issues.filter((i) => i.epicId === epicId);
}
