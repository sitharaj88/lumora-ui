import { describe, expect, it } from "vitest";
import { lumoraThemes, requiredThemeTokens } from "../packages/themes/src";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const expanded =
    value.length === 3
      ? value
          .split("")
          .map((part) => part + part)
          .join("")
      : value;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16)
  };
}

function channel(value: number) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: string, b: string) {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
}

describe("Lumora themes", () => {
  it("ships at least 20 complete themes", () => {
    expect(lumoraThemes.length).toBeGreaterThanOrEqual(20);

    for (const theme of lumoraThemes) {
      for (const token of requiredThemeTokens) {
        expect(theme.tokens[token], `${theme.name} missing ${token}`).toBeTruthy();
      }
    }
  });

  it("keeps important foreground/background pairs at WCAG AA contrast", () => {
    for (const theme of lumoraThemes) {
      const pairs = [
        ["color-bg", "color-text"],
        ["color-surface", "color-text"],
        ["color-surface", "color-muted"],
        ["color-primary", "color-primary-fg"],
        ["color-secondary", "color-secondary-fg"],
        ["color-accent", "color-accent-fg"],
        ["color-success", "color-success-fg"],
        ["color-warning", "color-warning-fg"],
        ["color-danger", "color-danger-fg"],
        ["color-info", "color-info-fg"]
      ] as const;

      for (const [background, foreground] of pairs) {
        expect(
          contrast(theme.tokens[background], theme.tokens[foreground]),
          `${theme.name}: ${foreground} on ${background}`
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
