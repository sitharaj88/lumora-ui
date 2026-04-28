type ChartSeries = {
  label: string;
  color: string;
  values: number[];
};

export function AreaChart({
  series,
  height = 220,
  showGrid = true,
  showLegend = true
}: {
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}) {
  if (series.length === 0) return null;
  const maxLen = Math.max(...series.map((s) => s.values.length));
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = max - min || 1;

  const width = 800;
  const padX = 40;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const xFor = (i: number) =>
    padX + (i / Math.max(maxLen - 1, 1)) * innerW;
  const yFor = (v: number) => padY + innerH - ((v - min) / range) * innerH;

  const linePath = (values: number[]) =>
    values
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
      .join(" ");

  const areaPath = (values: number[]) => {
    const baseline = padY + innerH;
    return (
      values
        .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
        .join(" ") +
      ` L ${xFor(values.length - 1).toFixed(1)} ${baseline} L ${xFor(0).toFixed(1)} ${baseline} Z`
    );
  };

  const gridLines = 4;
  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) => {
    const v = min + (range * (gridLines - i)) / gridLines;
    return { value: v, y: padY + (i / gridLines) * innerH };
  });

  return (
    <div className="grid gap-3">
      {showLegend && (
        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--lm-color-muted)]">
          {series.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `var(--lm-color-${s.color})` }}
              />
              <strong className="text-[var(--lm-color-text)] font-medium">{s.label}</strong>
            </span>
          ))}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={series.map((s) => s.label).join(", ")}
      >
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={`grad-${s.label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={`var(--lm-color-${s.color})`}
                stopOpacity="0.32"
              />
              <stop
                offset="100%"
                stopColor={`var(--lm-color-${s.color})`}
                stopOpacity="0"
              />
            </linearGradient>
          ))}
        </defs>
        {showGrid &&
          yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={padX}
                x2={width - padX}
                y1={t.y}
                y2={t.y}
                stroke="var(--lm-color-border)"
                strokeDasharray="2 4"
                strokeWidth="1"
              />
              <text
                x={padX - 8}
                y={t.y + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--lm-color-muted)"
              >
                {Math.round(t.value)}
              </text>
            </g>
          ))}
        {series.map((s) => (
          <g key={s.label}>
            <path
              d={areaPath(s.values)}
              fill={`url(#grad-${s.label.replace(/\s/g, "")})`}
            />
            <path
              d={linePath(s.values)}
              fill="none"
              stroke={`var(--lm-color-${s.color})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BarChart({
  values,
  labels,
  color = "primary",
  height = 180
}: {
  values: number[];
  labels?: string[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  return (
    <div className="grid gap-2" style={{ height: height + 28 }}>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {values.map((v, i) => {
          const h = (v / max) * 100;
          return (
            <div
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                background: `linear-gradient(180deg, color-mix(in oklab, var(--lm-color-${color}) 92%, white), var(--lm-color-${color}))`,
                height: `${h}%`,
                minHeight: "2px"
              }}
              title={`${v}`}
            />
          );
        })}
      </div>
      {labels && (
        <div className="flex gap-1.5 text-[10px] text-[var(--lm-color-muted)]">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 text-center">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function DonutChart({
  segments,
  size = 140,
  strokeWidth = 18
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--lm-color-border)"
          strokeWidth={strokeWidth}
        />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const dashoffset = -offset;
          offset += len;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`var(--lm-color-${s.color})`}
              strokeWidth={strokeWidth}
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
        <text
          x={size / 2}
          y={size / 2 - 4}
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill="var(--lm-color-text)"
        >
          {total}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          textAnchor="middle"
          fontSize="10"
          fill="var(--lm-color-muted)"
        >
          total
        </text>
      </svg>
      <div className="grid gap-1.5 text-xs">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `var(--lm-color-${s.color})` }}
            />
            <strong className="text-[var(--lm-color-text)]">{s.label}</strong>
            <span className="text-[var(--lm-color-muted)]">
              {((s.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
