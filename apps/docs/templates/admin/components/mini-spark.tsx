export function MiniSpark({
  values,
  color = "primary",
  height = 24
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 30;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const linePath = `M ${points.split(" ").join(" L ")}`;
  const areaPath = `M 0,${h} L ${points.split(" ").join(" L ")} L ${w},${h} Z`;
  return (
    <svg
      className="lm-sparkline"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      style={{ color: `var(--lm-color-${color})`, width: "5rem", height }}
      aria-hidden="true"
    >
      <path className="lm-sparkline-area" d={areaPath} />
      <path className="lm-sparkline-line" d={linePath} />
    </svg>
  );
}
