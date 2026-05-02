import type { Account } from "../data/accounts";

export function AccountAvatar({
  account,
  size = "md"
}: {
  account: Pick<Account, "initials" | "bgGradient">;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <span
      className={`lm-avatar lm-avatar-${size}`}
      style={{ background: account.bgGradient }}
      aria-hidden="true"
    >
      {account.initials}
    </span>
  );
}

export function PersonAvatar({
  initials,
  bg,
  size = "sm"
}: {
  initials: string;
  bg: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <span className={`lm-avatar lm-avatar-${size}`} style={{ background: bg }} aria-hidden="true">
      {initials}
    </span>
  );
}
