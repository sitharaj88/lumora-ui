import { expect, test } from "@playwright/test";

/**
 * Phase 8 — Smoke + structural assertions for every multi-page template route.
 *
 * Each template's homepage must:
 *  - Return 200
 *  - Render the TemplateShell topbar with the product name
 *  - Render the sidebar with `aria-current="page"` on exactly one item
 *  - Render the breadcrumb landmark
 */

const templates = [
  {
    slug: "admin",
    productName: "Atlas Console",
    pages: [
      { path: "", label: "Dashboard" },
      { path: "/accounts", label: "Accounts" },
      { path: "/accounts/atlas-finance", label: "Atlas Finance" },
      { path: "/billing", label: "Billing" },
      { path: "/audit", label: "Audit log" },
      { path: "/settings", label: "Settings" }
    ]
  },
  {
    slug: "crm",
    productName: "Northwind CRM",
    pages: [
      { path: "", label: "Pipeline" },
      { path: "/contacts", label: "Contacts" },
      { path: "/contacts/maya-krishnan", label: "Maya Krishnan" },
      { path: "/deals", label: "Deals" },
      { path: "/activity", label: "Activity" },
      { path: "/reports", label: "Reports" }
    ]
  },
  {
    slug: "project",
    productName: "Vector Tasks",
    pages: [
      { path: "", label: "Board" },
      { path: "/backlog", label: "Backlog" },
      { path: "/roadmap", label: "Roadmap" },
      { path: "/sprint", label: "Sprint 24" },
      { path: "/settings", label: "Settings" }
    ]
  },
  {
    slug: "ecommerce",
    productName: "Raven Outfitters",
    pages: [
      { path: "", label: "Storefront" },
      { path: "/product/raven-jacket", label: "Raven all-weather jacket" },
      { path: "/cart", label: "Cart" },
      { path: "/checkout", label: "Checkout" },
      { path: "/orders", label: "Orders" }
    ]
  },
  {
    slug: "marketing",
    productName: "Lumora Cloud",
    pages: [
      { path: "", label: "Landing" },
      { path: "/features", label: "Features" },
      { path: "/pricing", label: "Pricing" },
      { path: "/blog", label: "Blog" },
      { path: "/blog/why-compliance-platforms-fail", label: "Why most compliance platforms fail" }
    ]
  },
  {
    slug: "analytics",
    productName: "Helio Insights",
    pages: [
      { path: "", label: "Overview" },
      { path: "/funnels", label: "Funnels" },
      { path: "/cohorts", label: "Cohorts" },
      { path: "/segments", label: "Segments" },
      { path: "/reports", label: "Reports" }
    ]
  }
];

test.describe("Template routes · smoke + structure", () => {
  for (const tpl of templates) {
    test.describe(`${tpl.slug} (${tpl.productName})`, () => {
      for (const page of tpl.pages) {
        test(`renders ${page.label || "home"}`, async ({ page: browser }) => {
          const url = `/preview/${tpl.slug}${page.path}`;
          const response = await browser.goto(url);
          expect(response?.status()).toBe(200);

          // Topbar
          await expect(browser.getByRole("banner")).toBeVisible();
          await expect(browser.getByText(tpl.productName).first()).toBeVisible();

          // Sidebar landmark
          const sidebar = browser.getByRole("navigation", { name: "Template navigation" });
          await expect(sidebar).toBeVisible();

          // Shell breadcrumb (page-specific breadcrumbs use longer accessible
          // names like "Product breadcrumb" so we filter to the exact label).
          await expect(
            browser.getByRole("navigation", { name: "Breadcrumb", exact: true })
          ).toBeVisible();

          // Main content
          await expect(browser.getByRole("main")).toBeVisible();

          // Exactly one active sidebar item
          const activeCount = await sidebar.locator('[aria-current="page"]').count();
          expect(activeCount).toBe(1);
        });
      }
    });
  }
});
