export function CrmAvatar({
  initials,
  bg,
  size = "sm"
}: {
  initials: string;
  bg: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <span
      className={`lm-avatar lm-avatar-${size}`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
