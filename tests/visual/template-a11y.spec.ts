import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Phase 8 — Accessibility audit using axe-core against every template entry
 * point and a representative deep page. Asserts there are zero serious or
 * critical violations.
 *
 * We only run on the desktop project to keep the suite fast; mobile uses the
 * same DOM, so additional axe runs would just duplicate failures.
 */

test.describe.configure({ mode: "serial" });

const targets = [
  { name: "admin · dashboard", url: "/preview/admin" },
  { name: "admin · accounts", url: "/preview/admin/accounts" },
  { name: "admin · settings", url: "/preview/admin/settings" },
  { name: "crm · pipeline", url: "/preview/crm" },
  { name: "crm · contact detail", url: "/preview/crm/contacts/maya-krishnan" },
  { name: "project · board", url: "/preview/project" },
  { name: "project · sprint", url: "/preview/project/sprint" },
  { name: "ecommerce · storefront", url: "/preview/ecommerce" },
  { name: "ecommerce · product", url: "/preview/ecommerce/product/raven-jacket" },
  { name: "ecommerce · checkout", url: "/preview/ecommerce/checkout" },
  { name: "marketing · landing", url: "/preview/marketing" },
  { name: "marketing · pricing", url: "/preview/marketing/pricing" },
  { name: "marketing · blog post", url: "/preview/marketing/blog/why-compliance-platforms-fail" },
  { name: "analytics · overview", url: "/preview/analytics" },
  { name: "analytics · cohorts", url: "/preview/analytics/cohorts" }
];

test.describe("Template a11y audit", () => {
  for (const target of targets) {
    test(`${target.name} has no serious or critical axe violations`, async ({ page }) => {
      test.skip(
        test.info().project.name !== "chromium-desktop",
        "axe runs once on desktop project"
      );

      await page.goto(target.url);
      await page.getByRole("main").waitFor();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );
      if (blocking.length > 0) {
        const summary = blocking
          .map(
            (v) =>
              `  • [${v.impact}] ${v.id}: ${v.help}\n    nodes: ${v.nodes.length}\n    target: ${v.nodes[0]?.target?.join(" ")}`
          )
          .join("\n");
        console.log(`\n[a11y] ${target.name}\n${summary}`);
      }
      expect(blocking).toHaveLength(0);
    });
  }
});
