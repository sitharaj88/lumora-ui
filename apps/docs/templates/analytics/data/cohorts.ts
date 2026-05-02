export type Cohort = {
  /** Cohort starting label (week). */
  label: string;
  /** Number of users in the cohort at week 0. */
  size: number;
  /** Retention values per N-week. Index 0 is week 0 (always 100%). */
  retention: number[];
};

/**
 * 12 weekly cohorts × 12 retention checkpoints. Older cohorts have all 12,
 * newer cohorts only have data up to "now".
 */
export const cohorts: Cohort[] = [
  { label: "Feb 8 – 14", size: 1248, retention: [100, 64, 52, 46, 42, 39, 38, 36, 35, 35, 34, 34] },
  { label: "Feb 15 – 21", size: 1342, retention: [100, 66, 55, 49, 44, 42, 40, 38, 37, 36, 36, 35] },
  { label: "Feb 22 – 28", size: 1418, retention: [100, 68, 56, 51, 46, 44, 42, 40, 39, 38, 38] },
  { label: "Mar 1 – 7", size: 1542, retention: [100, 70, 58, 53, 48, 46, 44, 42, 41, 40] },
  { label: "Mar 8 – 14", size: 1684, retention: [100, 72, 60, 55, 50, 48, 46, 44, 43] },
  { label: "Mar 15 – 21", size: 1812, retention: [100, 74, 62, 57, 52, 50, 48, 46] },
  { label: "Mar 22 – 28", size: 1942, retention: [100, 76, 64, 59, 54, 52, 50] },
  { label: "Mar 29 – Apr 4", size: 2104, retention: [100, 77, 66, 61, 56, 54] },
  { label: "Apr 5 – 11", size: 2284, retention: [100, 78, 68, 63, 58] },
  { label: "Apr 12 – 18", size: 2412, retention: [100, 79, 70, 65] },
  { label: "Apr 19 – 25", size: 2598, retention: [100, 80, 72] },
  { label: "Apr 26 – May 2", size: 2742, retention: [100, 82] }
];

export const cohortHeaders = [
  "Week 0",
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "Week 8",
  "Week 9",
  "Week 10",
  "Week 11"
];

/** Average retention at N weeks across cohorts that have data. */
export function avgRetentionAt(week: number) {
  const values = cohorts
    .map((c) => c.retention[week])
    .filter((v): v is number => typeof v === "number");
  if (values.length === 0) return 0;
  return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
}
