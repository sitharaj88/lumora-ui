export type Sprint = {
  id: string;
  name: string;
  start: string;
  end: string;
  status: "completed" | "active" | "planned";
  capacity: number;
  committed: number;
  completed: number;
  /** Story-points completed per day. Active sprints are partial. */
  burndown: number[];
  /** Ideal-trajectory points remaining per day. */
  ideal: number[];
};

export const sprints: Sprint[] = [
  {
    id: "s-23",
    name: "Sprint 23",
    start: "2026-04-08",
    end: "2026-04-21",
    status: "completed",
    capacity: 100,
    committed: 96,
    completed: 92,
    burndown: [96, 90, 84, 78, 70, 62, 54, 48, 42, 32, 22, 12, 6, 4],
    ideal: [96, 89, 82, 75, 68, 61, 54, 47, 40, 33, 26, 19, 12, 4]
  },
  {
    id: "s-24",
    name: "Sprint 24",
    start: "2026-04-22",
    end: "2026-05-05",
    status: "active",
    capacity: 100,
    committed: 88,
    completed: 36,
    // Day 8 of 14
    burndown: [88, 82, 76, 70, 62, 58, 52, 52],
    ideal: [88, 82, 76, 70, 64, 58, 52, 46, 40, 34, 28, 22, 16, 10, 4]
  },
  {
    id: "s-25",
    name: "Sprint 25",
    start: "2026-05-06",
    end: "2026-05-19",
    status: "planned",
    capacity: 100,
    committed: 64,
    completed: 0,
    burndown: [],
    ideal: [64, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0]
  }
];

export const activeSprint = sprints.find((s) => s.status === "active") ?? sprints[1];
