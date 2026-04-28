import { type Page, expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "components", path: "/components" },
  { name: "button", path: "/components/button" },
  { name: "theming", path: "/docs/theming" },
  { name: "patterns", path: "/patterns" }
];

async function expectPageReady(path: string, pageName: string, page: Page) {
  await page.goto(path);
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("#main-content")).toBeVisible();
  await expect(page.locator("text=Lumora UI").first()).toBeVisible();
  await expect(page.locator(".lm-card, .lm-btn, .lm-table, .lm-alert").first()).toBeVisible();
  await expect(page).toHaveScreenshot(`${pageName}.png`, { fullPage: true });
}

test.describe("Lumora docs visual regression", () => {
  for (const item of pages) {
    test(`${item.name} renders consistently`, async ({ page }) => {
      await expectPageReady(item.path, item.name, page);
    });
  }

  test("button page supports dark theme without layout breakage", async ({ page }) => {
    await page.goto("/components/button");
    await page.evaluate(() => {
      document.documentElement.dataset.lmTheme = "lumora-dark";
    });
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator(".docs-preview").first()).toBeVisible();
    await expect(page).toHaveScreenshot("button-dark.png", { fullPage: true });
  });

  test("theme page exposes 20 or more theme cards", async ({ page }) => {
    await page.goto("/docs/theming");
    expect(await page.getByTestId("theme-card").count()).toBeGreaterThanOrEqual(20);
    await expect(page).toHaveScreenshot("theme-matrix.png", { fullPage: true });
  });
});
