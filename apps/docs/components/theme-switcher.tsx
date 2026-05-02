"use client";

import { useEffect, useState } from "react";
import { lumoraThemes } from "@lumora-design/themes";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("lumora-light");

  useEffect(() => {
    document.documentElement.dataset.lmTheme = theme;
  }, [theme]);

  return (
    <label className="lm-field min-w-56">
      <span className="lm-label">Theme</span>
      <select
        className="lm-select"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
      >
        {lumoraThemes.map((item) => (
          <option key={item.name} value={item.name}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
