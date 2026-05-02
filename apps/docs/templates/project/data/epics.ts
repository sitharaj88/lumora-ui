export type Epic = {
  id: string;
  name: string;
  color: string;
  status: "planning" | "in-progress" | "shipped";
  ownerId: string;
  dueQuarter: string;
  startQuarter: string;
  totalIssues: number;
  doneIssues: number;
};

export const epics: Epic[] = [
  {
    id: "ep-headless",
    name: "Headless behavior layer",
    color: "primary",
    status: "in-progress",
    ownerId: "mk",
    startQuarter: "Q2 26",
    dueQuarter: "Q3 26",
    totalIssues: 12,
    doneIssues: 5
  },
  {
    id: "ep-charts",
    name: "Chart primitives",
    color: "accent",
    status: "in-progress",
    ownerId: "al",
    startQuarter: "Q2 26",
    dueQuarter: "Q2 26",
    totalIssues: 8,
    doneIssues: 3
  },
  {
    id: "ep-rtl",
    name: "RTL + i18n",
    color: "info",
    status: "planning",
    ownerId: "rs",
    startQuarter: "Q3 26",
    dueQuarter: "Q4 26",
    totalIssues: 14,
    doneIssues: 0
  },
  {
    id: "ep-themes",
    name: "Theme builder",
    color: "warning",
    status: "in-progress",
    ownerId: "sp",
    startQuarter: "Q2 26",
    dueQuarter: "Q3 26",
    totalIssues: 9,
    doneIssues: 4
  },
  {
    id: "ep-cli",
    name: "CLI scaffolder",
    color: "success",
    status: "planning",
    ownerId: "jh",
    startQuarter: "Q3 26",
    dueQuarter: "Q3 26",
    totalIssues: 6,
    doneIssues: 0
  },
  {
    id: "ep-perf",
    name: "Bundle perf pass",
    color: "danger",
    status: "shipped",
    ownerId: "mk",
    startQuarter: "Q1 26",
    dueQuarter: "Q2 26",
    totalIssues: 7,
    doneIssues: 7
  }
];

export function getEpic(id: string) {
  return epics.find((e) => e.id === id);
}
