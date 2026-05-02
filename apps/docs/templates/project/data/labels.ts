export type Label = {
  id: string;
  name: string;
  color: string;
};

export const labels: Label[] = [
  { id: "ui", name: "ui", color: "primary" },
  { id: "infra", name: "infra", color: "info" },
  { id: "api", name: "api", color: "info" },
  { id: "design", name: "design", color: "accent" },
  { id: "polish", name: "polish", color: "soft" },
  { id: "v0.3", name: "v0.3", color: "warning" },
  { id: "v0.4", name: "v0.4", color: "soft" },
  { id: "bug", name: "bug", color: "danger" },
  { id: "perf", name: "perf", color: "success" },
  { id: "docs", name: "docs", color: "soft" }
];

export function getLabel(id: string) {
  return labels.find((l) => l.id === id);
}
