"use client";

import { useEffect, useState } from "react";

const themes = [
  { name: "lumora-light", label: "Light", icon: "☀" },
  { name: "lumora-dark", label: "Dark", icon: "☾" },
  { name: "graphite-command-dark", label: "Graphite", icon: "◐" }
] as const;

export const THEME_STORAGE_KEY = "lumora-theme";
export const DEFAULT_THEME = "lumora-dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initial = stored ?? document.documentElement.dataset.lmTheme ?? DEFAULT_THEME;
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.lmTheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors (private mode, quota)
    }
  }, [theme, mounted]);

  return (
    <div className="lm-segmented" role="radiogroup" aria-label="Theme">
      {themes.map((option) => (
        <button
          key={option.name}
          type="button"
          role="radio"
          aria-checked={theme === option.name}
          aria-pressed={theme === option.name}
          className="lm-segmented-item"
          onClick={() => setTheme(option.name)}
          title={option.label}
        >
          <span aria-hidden="true">{option.icon}</span>
          <span className="sr-only">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
