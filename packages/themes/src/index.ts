export type LumoraThemeMode = "light" | "dark";

export type LumoraThemeToken =
  | "color-bg"
  | "color-surface"
  | "color-surface-raised"
  | "color-surface-sunken"
  | "color-text"
  | "color-muted"
  | "color-border"
  | "color-border-strong"
  | "color-primary"
  | "color-primary-fg"
  | "color-primary-soft"
  | "color-secondary"
  | "color-secondary-fg"
  | "color-accent"
  | "color-accent-fg"
  | "color-success"
  | "color-success-fg"
  | "color-warning"
  | "color-warning-fg"
  | "color-danger"
  | "color-danger-fg"
  | "color-info"
  | "color-info-fg"
  | "color-overlay"
  | "color-focus-ring"
  | "radius-sm"
  | "radius-md"
  | "radius-lg"
  | "radius-xl"
  | "radius-2xl"
  | "shadow-sm"
  | "shadow-md"
  | "shadow-lg"
  | "shadow-xl"
  | "shadow-glow"
  | "ease-out"
  | "ease-spring"
  | "duration-fast"
  | "duration-base"
  | "duration-slow"
  | "density";

export type LumoraTheme = {
  name: string;
  label: string;
  mode: LumoraThemeMode;
  tokens: Record<LumoraThemeToken, string>;
};

export const requiredThemeTokens: LumoraThemeToken[] = [
  "color-bg",
  "color-surface",
  "color-surface-raised",
  "color-surface-sunken",
  "color-text",
  "color-muted",
  "color-border",
  "color-border-strong",
  "color-primary",
  "color-primary-fg",
  "color-primary-soft",
  "color-secondary",
  "color-secondary-fg",
  "color-accent",
  "color-accent-fg",
  "color-success",
  "color-success-fg",
  "color-warning",
  "color-warning-fg",
  "color-danger",
  "color-danger-fg",
  "color-info",
  "color-info-fg",
  "color-overlay",
  "color-focus-ring",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-2xl",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-glow",
  "ease-out",
  "ease-spring",
  "duration-fast",
  "duration-base",
  "duration-slow",
  "density"
];

type ThemeOverrides = Partial<Record<LumoraThemeToken, string>>;

const lightBase: Record<LumoraThemeToken, string> = {
  "color-bg": "#f8fafc",
  "color-surface": "#ffffff",
  "color-surface-raised": "#f1f5f9",
  "color-surface-sunken": "#eef2f7",
  "color-text": "#0f172a",
  "color-muted": "#475569",
  "color-border": "#e2e8f0",
  "color-border-strong": "#cbd5e1",
  "color-primary": "#1d4ed8",
  "color-primary-fg": "#ffffff",
  "color-primary-soft": "color-mix(in oklab, var(--lm-color-primary) 14%, var(--lm-color-surface))",
  "color-secondary": "#334155",
  "color-secondary-fg": "#ffffff",
  "color-accent": "#6d28d9",
  "color-accent-fg": "#ffffff",
  "color-success": "#047857",
  "color-success-fg": "#ffffff",
  "color-warning": "#92400e",
  "color-warning-fg": "#ffffff",
  "color-danger": "#be123c",
  "color-danger-fg": "#ffffff",
  "color-info": "#0369a1",
  "color-info-fg": "#ffffff",
  "color-overlay": "rgb(15 23 42 / 0.55)",
  "color-focus-ring": "color-mix(in oklab, var(--lm-color-primary) 35%, transparent)",
  "radius-sm": "0.25rem",
  "radius-md": "0.5rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1rem",
  "radius-2xl": "1.5rem",
  "shadow-sm": "0 1px 2px rgb(15 23 42 / 0.06), 0 1px 1px rgb(15 23 42 / 0.04)",
  "shadow-md": "0 4px 12px -2px rgb(15 23 42 / 0.08), 0 8px 24px -8px rgb(15 23 42 / 0.12)",
  "shadow-lg": "0 12px 32px -8px rgb(15 23 42 / 0.16), 0 20px 56px -16px rgb(15 23 42 / 0.18)",
  "shadow-xl": "0 24px 64px -12px rgb(15 23 42 / 0.22), 0 32px 80px -24px rgb(15 23 42 / 0.24)",
  "shadow-glow": "0 0 0 1px rgb(29 78 216 / 0.18), 0 8px 24px -6px rgb(29 78 216 / 0.32)",
  "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "duration-fast": "120ms",
  "duration-base": "180ms",
  "duration-slow": "260ms",
  density: "1"
};

const darkBase: Record<LumoraThemeToken, string> = {
  "color-bg": "#020617",
  "color-surface": "#0f172a",
  "color-surface-raised": "#1e293b",
  "color-surface-sunken": "#0b1222",
  "color-text": "#f8fafc",
  "color-muted": "#94a3b8",
  "color-border": "#1f2a44",
  "color-border-strong": "#334155",
  "color-primary": "#93c5fd",
  "color-primary-fg": "#082f49",
  "color-primary-soft": "color-mix(in oklab, var(--lm-color-primary) 18%, var(--lm-color-surface))",
  "color-secondary": "#cbd5e1",
  "color-secondary-fg": "#0f172a",
  "color-accent": "#c4b5fd",
  "color-accent-fg": "#2e1065",
  "color-success": "#86efac",
  "color-success-fg": "#052e16",
  "color-warning": "#fde68a",
  "color-warning-fg": "#451a03",
  "color-danger": "#fda4af",
  "color-danger-fg": "#4c0519",
  "color-info": "#7dd3fc",
  "color-info-fg": "#082f49",
  "color-overlay": "rgb(2 6 23 / 0.72)",
  "color-focus-ring": "color-mix(in oklab, var(--lm-color-primary) 40%, transparent)",
  "radius-sm": "0.25rem",
  "radius-md": "0.5rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1rem",
  "radius-2xl": "1.5rem",
  "shadow-sm": "0 1px 2px rgb(0 0 0 / 0.4), 0 1px 1px rgb(0 0 0 / 0.32)",
  "shadow-md": "0 6px 16px -4px rgb(0 0 0 / 0.5), 0 12px 32px -12px rgb(0 0 0 / 0.5)",
  "shadow-lg": "0 16px 40px -8px rgb(0 0 0 / 0.6), 0 28px 64px -16px rgb(0 0 0 / 0.6)",
  "shadow-xl": "0 32px 80px -16px rgb(0 0 0 / 0.7), 0 40px 96px -24px rgb(0 0 0 / 0.7)",
  "shadow-glow": "0 0 0 1px rgb(147 197 253 / 0.28), 0 10px 32px -6px rgb(147 197 253 / 0.32)",
  "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "duration-fast": "120ms",
  "duration-base": "180ms",
  "duration-slow": "260ms",
  density: "1"
};

const makeTheme = (
  name: string,
  label: string,
  mode: LumoraThemeMode,
  overrides: ThemeOverrides
): LumoraTheme => ({
  name,
  label,
  mode,
  tokens: {
    ...(mode === "light" ? lightBase : darkBase),
    ...overrides
  }
});

export const lumoraThemes: LumoraTheme[] = [
  makeTheme("lumora-light", "Lumora Light", "light", {}),
  makeTheme("lumora-dark", "Lumora Dark", "dark", {}),
  makeTheme("slate-boardroom", "Slate Boardroom", "light", {
    "color-bg": "#f8fafc",
    "color-primary": "#334155",
    "color-accent": "#0f766e"
  }),
  makeTheme("slate-boardroom-dark", "Slate Boardroom Dark", "dark", {
    "color-primary": "#cbd5e1",
    "color-primary-fg": "#0f172a",
    "color-accent": "#99f6e4",
    "color-accent-fg": "#042f2e"
  }),
  makeTheme("cobalt-office", "Cobalt Office", "light", {
    "color-primary": "#1e40af",
    "color-accent": "#0f766e"
  }),
  makeTheme("cobalt-office-dark", "Cobalt Office Dark", "dark", {
    "color-primary": "#bfdbfe",
    "color-primary-fg": "#172554",
    "color-accent": "#99f6e4",
    "color-accent-fg": "#042f2e"
  }),
  makeTheme("emerald-ledger", "Emerald Ledger", "light", {
    "color-primary": "#047857",
    "color-accent": "#4338ca"
  }),
  makeTheme("emerald-ledger-dark", "Emerald Ledger Dark", "dark", {
    "color-primary": "#86efac",
    "color-primary-fg": "#052e16",
    "color-accent": "#a5b4fc",
    "color-accent-fg": "#1e1b4b"
  }),
  makeTheme("indigo-enterprise", "Indigo Enterprise", "light", {
    "color-primary": "#4338ca",
    "color-accent": "#0369a1"
  }),
  makeTheme("indigo-enterprise-dark", "Indigo Enterprise Dark", "dark", {
    "color-primary": "#a5b4fc",
    "color-primary-fg": "#1e1b4b",
    "color-accent": "#7dd3fc",
    "color-accent-fg": "#082f49"
  }),
  makeTheme("rose-compliance", "Rose Compliance", "light", {
    "color-primary": "#be123c",
    "color-accent": "#334155"
  }),
  makeTheme("rose-compliance-dark", "Rose Compliance Dark", "dark", {
    "color-primary": "#fda4af",
    "color-primary-fg": "#4c0519",
    "color-accent": "#cbd5e1",
    "color-accent-fg": "#0f172a"
  }),
  makeTheme("amber-ops", "Amber Ops", "light", {
    "color-primary": "#92400e",
    "color-accent": "#1d4ed8"
  }),
  makeTheme("amber-ops-dark", "Amber Ops Dark", "dark", {
    "color-primary": "#fde68a",
    "color-primary-fg": "#451a03",
    "color-accent": "#93c5fd",
    "color-accent-fg": "#082f49"
  }),
  makeTheme("teal-systems", "Teal Systems", "light", {
    "color-primary": "#0f766e",
    "color-accent": "#6d28d9"
  }),
  makeTheme("teal-systems-dark", "Teal Systems Dark", "dark", {
    "color-primary": "#99f6e4",
    "color-primary-fg": "#042f2e",
    "color-accent": "#c4b5fd",
    "color-accent-fg": "#2e1065"
  }),
  makeTheme("graphite-command", "Graphite Command", "light", {
    "color-bg": "#f4f4f5",
    "color-surface-raised": "#e4e4e7",
    "color-primary": "#27272a",
    "color-accent": "#0369a1"
  }),
  makeTheme("graphite-command-dark", "Graphite Command Dark", "dark", {
    "color-bg": "#09090b",
    "color-surface": "#18181b",
    "color-surface-raised": "#27272a",
    "color-border": "#52525b",
    "color-primary": "#e4e4e7",
    "color-primary-fg": "#18181b"
  }),
  makeTheme("violet-suite", "Violet Suite", "light", {
    "color-primary": "#6d28d9",
    "color-accent": "#047857"
  }),
  makeTheme("violet-suite-dark", "Violet Suite Dark", "dark", {
    "color-primary": "#c4b5fd",
    "color-primary-fg": "#2e1065",
    "color-accent": "#86efac",
    "color-accent-fg": "#052e16"
  }),
  makeTheme("sky-analytics", "Sky Analytics", "light", {
    "color-primary": "#0369a1",
    "color-accent": "#be123c"
  }),
  makeTheme("sky-analytics-dark", "Sky Analytics Dark", "dark", {
    "color-primary": "#7dd3fc",
    "color-primary-fg": "#082f49",
    "color-accent": "#fda4af",
    "color-accent-fg": "#4c0519"
  }),
  makeTheme("neutral-density", "Neutral Density", "light", {
    "color-bg": "#fafafa",
    "color-surface": "#ffffff",
    "color-surface-raised": "#f5f5f5",
    "color-border": "#d4d4d4",
    "color-primary": "#404040",
    density: "0.92"
  }),
  makeTheme("neutral-density-dark", "Neutral Density Dark", "dark", {
    "color-bg": "#0a0a0a",
    "color-surface": "#171717",
    "color-surface-raised": "#262626",
    "color-border": "#525252",
    "color-primary": "#e5e5e5",
    "color-primary-fg": "#171717",
    density: "0.92"
  }),
  // -- Sunset (warm orange / amber) -----------------------------------
  makeTheme("sunset", "Sunset", "light", {
    "color-bg": "#fff7ed",
    "color-surface": "#ffffff",
    "color-surface-raised": "#ffedd5",
    "color-primary": "#c2410c",
    "color-accent": "#9d174d"
  }),
  makeTheme("sunset-dark", "Sunset Dark", "dark", {
    "color-bg": "#1c0a03",
    "color-surface": "#2a1208",
    "color-surface-raised": "#431a0a",
    "color-primary": "#fed7aa",
    "color-primary-fg": "#431a0a",
    "color-accent": "#fbcfe8",
    "color-accent-fg": "#500724"
  }),
  // -- Mint (fresh green) ---------------------------------------------
  makeTheme("mint", "Mint", "light", {
    "color-bg": "#f0fdf4",
    "color-surface": "#ffffff",
    "color-surface-raised": "#dcfce7",
    "color-primary": "#15803d",
    "color-accent": "#0e7490"
  }),
  makeTheme("mint-dark", "Mint Dark", "dark", {
    "color-bg": "#022c1a",
    "color-surface": "#053524",
    "color-surface-raised": "#064e2c",
    "color-primary": "#bbf7d0",
    "color-primary-fg": "#022c1a",
    "color-accent": "#a5f3fc",
    "color-accent-fg": "#083344"
  }),
  // -- Berry (deep magenta / wine) ------------------------------------
  makeTheme("berry", "Berry", "light", {
    "color-bg": "#fdf4ff",
    "color-surface": "#ffffff",
    "color-surface-raised": "#fae8ff",
    "color-primary": "#86198f",
    "color-accent": "#9f1239"
  }),
  makeTheme("berry-dark", "Berry Dark", "dark", {
    "color-bg": "#1a0820",
    "color-surface": "#2a0e34",
    "color-surface-raised": "#401756",
    "color-primary": "#f0abfc",
    "color-primary-fg": "#3b0764",
    "color-accent": "#fda4af",
    "color-accent-fg": "#4c0519"
  }),
  // -- Ocean (deep blue + teal) ---------------------------------------
  makeTheme("ocean", "Ocean", "light", {
    "color-bg": "#ecfeff",
    "color-surface": "#ffffff",
    "color-surface-raised": "#cffafe",
    "color-primary": "#155e75",
    "color-accent": "#1e40af"
  }),
  makeTheme("ocean-dark", "Ocean Dark", "dark", {
    "color-bg": "#031824",
    "color-surface": "#082f49",
    "color-surface-raised": "#0c4a6e",
    "color-primary": "#7dd3fc",
    "color-primary-fg": "#031824",
    "color-accent": "#bfdbfe",
    "color-accent-fg": "#172554"
  }),
  // -- Mocha (warm earth) ---------------------------------------------
  makeTheme("mocha", "Mocha", "light", {
    "color-bg": "#fbf3eb",
    "color-surface": "#ffffff",
    "color-surface-raised": "#f3e3d2",
    "color-border": "#e5d5c0",
    "color-primary": "#7c3a0f",
    "color-accent": "#7e22ce"
  }),
  makeTheme("mocha-dark", "Mocha Dark", "dark", {
    "color-bg": "#1c130a",
    "color-surface": "#2a1d10",
    "color-surface-raised": "#3a2a1a",
    "color-primary": "#fde68a",
    "color-primary-fg": "#3a2a1a",
    "color-accent": "#e9d5ff",
    "color-accent-fg": "#3b0764"
  }),
  // -- Pastel (soft brand-friendly) -----------------------------------
  makeTheme("pastel", "Pastel", "light", {
    "color-bg": "#fdf2f8",
    "color-surface": "#ffffff",
    "color-surface-raised": "#fce7f3",
    "color-border": "#fbcfe8",
    "color-primary": "#9d174d",
    "color-secondary": "#5b21b6",
    "color-accent": "#1d4ed8"
  }),
  makeTheme("pastel-dark", "Pastel Dark", "dark", {
    "color-bg": "#1a0b15",
    "color-surface": "#2a1521",
    "color-surface-raised": "#3a1d2c",
    "color-primary": "#fbcfe8",
    "color-primary-fg": "#500724",
    "color-accent": "#bfdbfe",
    "color-accent-fg": "#172554"
  }),
  // -- Carbon (true high-contrast dark) -------------------------------
  makeTheme("carbon", "Carbon", "dark", {
    "color-bg": "#000000",
    "color-surface": "#0a0a0a",
    "color-surface-raised": "#171717",
    "color-surface-sunken": "#050505",
    "color-border": "#262626",
    "color-border-strong": "#404040",
    "color-text": "#fafafa",
    "color-muted": "#a3a3a3",
    "color-primary": "#fafafa",
    "color-primary-fg": "#0a0a0a"
  }),
  // -- Solar (warm document / paper) ----------------------------------
  makeTheme("solar", "Solar", "light", {
    "color-bg": "#fdf6e3",
    "color-surface": "#fffaeb",
    "color-surface-raised": "#f5eed4",
    "color-border": "#e8d8a8",
    "color-primary": "#854d0e",
    "color-accent": "#9f1239",
    "color-success": "#3f6212",
    "color-info": "#075985"
  }),
  // -- Aurora (bold gradient-friendly) --------------------------------
  makeTheme("aurora-dark", "Aurora", "dark", {
    "color-bg": "#0a1428",
    "color-surface": "#0f1f3d",
    "color-surface-raised": "#1a2d52",
    "color-primary": "#a5f3fc",
    "color-primary-fg": "#083344",
    "color-accent": "#f0abfc",
    "color-accent-fg": "#3b0764",
    "color-success": "#bef264",
    "color-success-fg": "#1a2e05"
  })
];

export const defaultThemeName = "lumora-light";

export function getLumoraTheme(name: string): LumoraTheme | undefined {
  return lumoraThemes.find((theme) => theme.name === name);
}

export function tokensToCssVariables(theme: LumoraTheme): Record<string, string> {
  return Object.fromEntries(
    Object.entries(theme.tokens).map(([key, value]) => [`--lm-${key}`, value])
  );
}
