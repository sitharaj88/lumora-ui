export function ProbabilityBar({ value }: { value: number }) {
  const tone = value >= 70 ? "success" : value >= 40 ? "warning" : "info";
  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between text-[10px] text-[var(--lm-color-muted)]">
        <span>Probability</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div
        style={{
          background: "var(--lm-color-surface-raised)",
          borderRadius: "999px",
          height: "0.25rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            background: `var(--lm-color-${tone})`,
            borderRadius: "999px",
            height: "100%",
            width: `${value}%`
          }}
        />
      </div>
    </div>
  );
}
