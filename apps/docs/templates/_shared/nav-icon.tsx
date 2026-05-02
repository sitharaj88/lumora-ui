/**
 * Shared icon set for template sidebars. Outline single-color SVGs that inherit
 * `currentColor`, so the parent's active-state color tints the icon.
 */
export type NavIconName =
  | "dashboard"
  | "accounts"
  | "billing"
  | "audit"
  | "reports"
  | "settings"
  | "pipeline"
  | "contacts"
  | "deals"
  | "activity"
  | "board"
  | "backlog"
  | "roadmap"
  | "sprint"
  | "shop"
  | "cart"
  | "checkout"
  | "orders"
  | "home"
  | "features"
  | "pricing"
  | "blog"
  | "overview"
  | "funnel"
  | "cohort"
  | "segment"
  | "default";

const paths: Record<NavIconName, string> = {
  dashboard:
    "M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10",
  accounts:
    "M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a6 6 0 0 1 12 0M22 21a6 6 0 0 0-6-6",
  billing:
    "M2 7h20v10H2zM6 11h2M6 14h6M16 14h2",
  audit:
    "M5 4h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM15 4v6h6M8 14h8M8 18h6",
  reports:
    "M3 22V4a1 1 0 0 1 1-1h16M7 18V10M12 18V6M17 18V13",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.18-1.62l2.12-1.65-2-3.46-2.5 1a7 7 0 0 0-2.81-1.63L13 2h-2l-.63 2.64A7 7 0 0 0 7.56 6.27l-2.5-1-2 3.46 2.12 1.65A7 7 0 0 0 5 12c0 .56.07 1.1.18 1.62L3.06 15.27l2 3.46 2.5-1a7 7 0 0 0 2.81 1.63L11 22h2l.63-2.64a7 7 0 0 0 2.81-1.63l2.5 1 2-3.46-2.12-1.65A7 7 0 0 0 19 12z",
  pipeline:
    "M4 4h4v6H4zM10 6h4v4h-4zM16 4h4v8h-4zM4 14h4v6H4zM10 12h4v8h-4zM16 16h4v4h-4z",
  contacts:
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 21a6 6 0 0 1 12 0M16 8h6M19 5v6",
  deals:
    "M3 7h18l-2 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7zM8 7V5a4 4 0 1 1 8 0v2",
  activity:
    "M3 12h4l3-9 4 18 3-9h4",
  board:
    "M4 4h6v16H4zM12 4h8v9h-8zM12 15h8v5h-8z",
  backlog:
    "M4 6h16M4 12h16M4 18h10",
  roadmap:
    "M3 6h7v4H3zM7 14h10v4H7zM14 6h7v4h-7zM5 10v4M16 10v4",
  sprint:
    "M21 12a9 9 0 1 1-3.5-7.1L21 4M16 5h5v5",
  shop:
    "M3 9l3-6h12l3 6M3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M3 9h18M9 13a3 3 0 0 0 6 0",
  cart:
    "M3 5h2l3 11h12l3-9H7M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  checkout:
    "M5 7h14l-1 12H6L5 7zM9 7V5a3 3 0 0 1 6 0v2M9 12l2 2 4-4",
  orders:
    "M5 4h14v17l-4-3-3 3-3-3-4 3zM8 9h8M8 13h6",
  home:
    "M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10",
  features:
    "M12 3l2.5 5.5L20 10l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z",
  pricing:
    "M21 11l-9 9-9-9V3h8zM7 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  blog:
    "M5 3h11l3 3v15H5zM8 8h8M8 12h8M8 16h6",
  overview:
    "M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0zM3 12h18M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z",
  funnel:
    "M3 4h18l-7 9v7l-4-2v-5z",
  cohort:
    "M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z",
  segment:
    "M3 6h18M3 12h12M3 18h7",
  default: "M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
};

export function NavIcon({ name }: { name: NavIconName }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.default} />
    </svg>
  );
}
