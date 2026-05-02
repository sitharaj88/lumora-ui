import { formatNumber } from "../data/events";

/** Color-tinted retention cell. Higher value = stronger primary tint. */
export function HeatmapCell({ value }: { value: number | undefined }) {
  if (value === undefined) {
    return (
      <div
        className="grid h-9 w-full place-items-center rounded text-[10px] text-[var(--lm-color-muted)]"
        style={{ background: "var(--lm-color-surface-sunken)", opacity: 0.5 }}
        aria-hidden="true"
      >
        ·
      </div>
    );
  }
  // Map 0–100 to color intensity. Anything ≥ 80 = strong, 50 = mid, 20 = weak.
  const intensity = Math.min(value / 80, 1);
  return (
    <div
      className="grid h-9 w-full place-items-center rounded text-[11px] font-medium tabular-nums"
      style={{
        background: `color-mix(in oklab, var(--lm-color-primary) ${Math.round(
          intensity * 70 + 6
        )}%, var(--lm-color-surface))`,
        color: intensity > 0.45 ? "var(--lm-color-primary-fg)" : "var(--lm-color-text)"
      }}
      title={`${value}% retention`}
    >
      {value}
    </div>
  );
}

/** Big metric tile with label, value, delta, and optional sparkline. */
export function MetricTile({
  label,
  value,
  delta,
  tone = "flat",
  caption
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  caption?: string;
}) {
  return (
    <div className="lm-stat">
      <div className="flex items-start justify-between gap-2">
        <span className="lm-stat-label">{label}</span>
        {delta && (
          <span
            className="text-xs font-bold tabular-nums"
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
      {caption && <span className="lm-stat-trend">{caption}</span>}
    </div>
  );
}

/** Horizontal funnel-step bar showing count + drop-off from previous. */
export function FunnelStepBar({
  index,
  name,
  count,
  total,
  previous,
  avgTime
}: {
  index: number;
  name: string;
  count: number;
  total: number;
  previous: number | null;
  avgTime?: string;
}) {
  const pct = (count / total) * 100;
  const dropPct = previous !== null ? ((previous - count) / previous) * 100 : 0;
  const stepConversion = previous !== null ? (count / previous) * 100 : 100;
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold tabular-nums"
            style={{
              background: "var(--lm-color-primary-soft)",
              color: "var(--lm-color-primary)"
            }}
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <strong>{name}</strong>
          {avgTime && (
            <span className="text-xs text-[var(--lm-color-muted)]">·  median {avgTime}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs">
          {previous !== null && (
            <span
              className="tabular-nums"
              style={{
                color:
                  stepConversion >= 70
                    ? "var(--lm-color-success)"
                    : stepConversion >= 40
                    ? "var(--lm-color-warning)"
                    : "var(--lm-color-danger)"
              }}
            >
              {stepConversion.toFixed(1)}% step
            </span>
          )}
          <span className="tabular-nums text-[var(--lm-color-text)] font-medium">
            {formatNumber(count)}
          </span>
          <span className="tabular-nums text-[var(--lm-color-muted)]">
            {pct.toFixed(1)}% overall
          </span>
        </div>
      </div>
      <div
        style={{
          background: "var(--lm-color-surface-raised)",
          borderRadius: "0.5rem",
          height: "1.75rem",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--lm-color-primary) 80%, white), var(--lm-color-primary))",
            height: "100%",
            transition: "width 600ms ease",
            width: `${pct}%`
          }}
        />
        {previous !== null && dropPct > 0 && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider tabular-nums"
            style={{
              color: "var(--lm-color-danger)"
            }}
          >
            ▼ {dropPct.toFixed(1)}% drop
          </span>
        )}
      </div>
    </div>
  );
}
