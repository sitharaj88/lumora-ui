import { expect, test } from "@playwright/test";

/**
 * Phase 8 — Theme matrix. Render the admin dashboard under three signature
 * themes (Light / Dark / Graphite) to catch regressions where a token change
 * breaks contrast or layout in one mode.
 *
 * We exercise the theme via localStorage (the boot script reads it before
 * paint) so the test mirrors the real user-toggle path.
 */

const themes = [
  { id: "lumora-light", label: "light" },
  { id: "lumora-dark", label: "dark" },
  { id: "graphite-command-dark", label: "graphite" }
];

const surfaces = [
  { name: "admin-home", url: "/preview/admin" },
  { name: "marketing-landing", url: "/preview/marketing" }
];

test.describe("Theme matrix", () => {
  for (const surface of surfaces) {
    for (const theme of themes) {
      test(`${surface.name} renders under ${theme.label}`, async ({ page, context }) => {
        // Seed the theme into localStorage before the first navigation. This
        // is what the boot script picks up on the next paint.
        await context.addInitScript((themeName) => {
          try {
            window.localStorage.setItem("lumora-theme", themeName);
          } catch {
            /* ignore */
          }
        }, theme.id);

        await page.goto(surface.url);
        await page.getByRole("main").waitFor();
        await expect(page.locator("html")).toHaveAttribute("data-lm-theme", theme.id);
        await page.waitForTimeout(300);
        await expect(page).toHaveScreenshot(`theme-${surface.name}-${theme.label}.png`, {
          fullPage: true
        });
      });
    }
  }
});
