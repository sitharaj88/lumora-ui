import { expect, test } from "@playwright/test";

/**
 * Phase 8 — Visual regression for every template homepage. Captures one
 * full-page screenshot per template at desktop + mobile viewports. The first
 * run generates baselines; subsequent runs fail on diffs > 2% (config default).
 */

const templates = [
  { slug: "admin", name: "Atlas Console" },
  { slug: "crm", name: "Northwind CRM" },
  { slug: "project", name: "Vector Tasks" },
  { slug: "ecommerce", name: "Raven Outfitters" },
  { slug: "marketing", name: "Lumora Cloud" },
  { slug: "analytics", name: "Helio Insights" }
];

test.describe("Template visual regression", () => {
  for (const tpl of templates) {
    test(`${tpl.slug} home renders consistently`, async ({ page }) => {
      await page.goto(`/preview/${tpl.slug}`);
      // Wait for the main content + sidebar before screenshotting.
      await page.getByRole("main").waitFor();
      await page.getByRole("navigation", { name: "Template navigation" }).waitFor();
      // Allow CSS animations to settle.
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot(`template-${tpl.slug}-home.png`, {
        fullPage: true
      });
    });
  }

  test("templates gallery renders consistently", async ({ page }) => {
    await page.goto("/templates");
    await page.getByRole("main").waitFor();
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot("templates-gallery.png", { fullPage: true });
  });
});
