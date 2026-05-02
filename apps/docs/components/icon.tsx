export type IconName =
  | "spark"
  | "layers"
  | "shield"
  | "wand"
  | "globe"
  | "bolt"
  | "moon"
  | "code"
  | "palette"
  | "command"
  | "accessibility"
  | "scale";

const paths: Record<IconName, string> = {
  spark:
    "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z",
  wand: "M9 4l2 2-7 7-2-2 7-7zM13 4l3 3M19 9l1 1M14 14l1 1M18 16l3 3M16 19l3 3",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a13 13 0 0 1 4 9 13 13 0 0 1-4 9 13 13 0 0 1-4-9 13 13 0 0 1 4-9z",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
  moon: "M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10z",
  code: "M9 18l-6-6 6-6M15 6l6 6-6 6",
  palette:
    "M12 21a9 9 0 1 1 9-9c0 2-2 3-4 3h-2a2 2 0 0 0-2 2v1c0 1-1 2-1 3zM7 10a1 1 0 1 1 0-2M11 7a1 1 0 1 1 0-2M16 8a1 1 0 1 1 0-2M17 13a1 1 0 1 1 0-2",
  command: "M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6z",
  accessibility: "M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 9l5 1v4l-2 8M19 9l-5 1v4l2 8M8 12h8",
  scale: "M3 7h18M6 7l-3 7a4 4 0 0 0 8 0L8 7M16 7l-3 7a4 4 0 0 0 8 0l-3-7M12 3v18"
};

export function Icon({
  name,
  className = "",
  size = 20
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={paths[name]} />
    </svg>
  );
}
