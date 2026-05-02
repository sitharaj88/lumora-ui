import { MiniSpark } from "./mini-spark";

export function KpiTile({
  label,
  value,
  delta,
  tone = "flat",
  values,
  chartColor = "primary"
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  values: number[];
  chartColor?: string;
}) {
  return (
    <div className="lm-stat">
      <div className="flex items-start justify-between gap-2">
        <span className="lm-stat-label">{label}</span>
        {delta && (
          <span
            className="text-xs font-bold"
            style={{
              color:
                tone === "up"
                  ? "var(--lm-color-success)"
                  : tone === "down"
                    ? "var(--lm-color-danger)"
                    : "var(--lm-color-muted)"
            }}
          >
            {tone === "up" ? "▲" : tone === "down" ? "▼" : ""} {delta}
          </span>
        )}
      </div>
      <span className="lm-stat-value tabular-nums">{value}</span>
      <MiniSpark values={values} color={chartColor} />
    </div>
  );
}
