import axe from "axe-core";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import {
  createLumoraBaseStyles,
  defaultThemeName,
  lumoraAccessibilityGuidelines,
  lumoraAccessibilityTarget,
  lumoraThemes
} from "../packages/core/src";

async function axeViolations(markup: string) {
  const dom = new JSDOM(
    `<!doctype html><html lang="en"><head><title>Lumora accessibility test</title></head><body>${markup}</body></html>`,
    {
      runScripts: "dangerously"
    }
  );

  dom.window.eval(axe.source);
  const results = await dom.window.axe.run(dom.window.document, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false }
    }
  });

  return results.violations;
}

const accessibleSnippets = [
  {
    name: "buttons and loading state",
    markup: `
      <main>
        <button class="lm-btn lm-btn-primary" type="button">Save</button>
        <button class="lm-btn lm-btn-secondary" type="button" aria-busy="true">Syncing</button>
      </main>
    `
  },
  {
    name: "form controls",
    markup: `
      <main>
        <form>
          <label class="lm-field" for="email">
            <span class="lm-label">Company email</span>
            <input id="email" class="lm-input" type="email" aria-describedby="email-hint" />
            <span id="email-hint" class="lm-hint">Used for billing and security alerts.</span>
          </label>
          <label>
            <input class="lm-switch" type="checkbox" role="switch" />
            Require SSO
          </label>
        </form>
      </main>
    `
  },
  {
    name: "tabs",
    markup: `
      <main>
        <div class="lm-tabs" role="tablist" aria-label="Account sections">
          <button id="tab-profile" class="lm-tab lm-tab-active" role="tab" aria-selected="true" aria-controls="panel-profile" type="button">Profile</button>
          <button id="tab-security" class="lm-tab" role="tab" aria-selected="false" aria-controls="panel-security" tabindex="-1" type="button">Security</button>
        </div>
        <section id="panel-profile" role="tabpanel" aria-labelledby="tab-profile">Profile settings</section>
      </main>
    `
  },
  {
    name: "modal",
    markup: `
      <main>
        <div class="lm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <section class="lm-modal-panel">
            <header class="lm-modal-header"><h1 id="confirm-title">Confirm approval</h1></header>
            <div class="lm-modal-body"><p>This action approves the account.</p></div>
            <footer class="lm-modal-footer">
              <button class="lm-btn lm-btn-ghost" type="button">Cancel</button>
              <button class="lm-btn lm-btn-primary" type="button">Approve</button>
            </footer>
          </section>
        </div>
      </main>
    `
  },
  {
    name: "dropdown menu",
    markup: `
      <main>
        <div class="lm-dropdown">
          <button class="lm-btn" type="button" aria-haspopup="menu" aria-expanded="true" aria-controls="actions-menu">Actions</button>
          <div id="actions-menu" class="lm-dropdown-menu" role="menu">
            <button class="lm-dropdown-item" role="menuitem" type="button">Edit</button>
            <button class="lm-dropdown-item" role="menuitem" type="button">Archive</button>
          </div>
        </div>
      </main>
    `
  },
  {
    name: "data table",
    markup: `
      <main>
        <table class="lm-table">
          <caption>Enterprise accounts</caption>
          <thead>
            <tr><th scope="col">Account</th><th scope="col">Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Atlas Finance</td><td><span class="lm-badge lm-badge-success">Active</span></td></tr>
          </tbody>
        </table>
      </main>
    `
  },
  {
    name: "toast status",
    markup: `
      <main>
        <div class="lm-toast lm-toast-success" role="status">
          <p>Settings saved successfully.</p>
          <button class="lm-btn lm-btn-ghost lm-btn-sm" type="button" aria-label="Dismiss notification">Dismiss</button>
        </div>
      </main>
    `
  }
];

describe("Lumora accessibility", () => {
  it("publishes WCAG 2.2 AA target and component guidance", () => {
    expect(lumoraAccessibilityTarget.standard).toBe("WCAG 2.2 AA");
    expect(lumoraAccessibilityGuidelines.length).toBeGreaterThanOrEqual(8);

    for (const guideline of lumoraAccessibilityGuidelines) {
      expect(guideline.wcag.length, `${guideline.component} WCAG criteria`).toBeGreaterThan(0);
      expect(
        guideline.requiredAttributes.length,
        `${guideline.component} attributes`
      ).toBeGreaterThan(0);
      expect(guideline.keyboard.length, `${guideline.component} keyboard`).toBeGreaterThan(0);
      expect(guideline.focus, `${guideline.component} focus guidance`).toBeTruthy();
    }
  });

  it.each(accessibleSnippets)("has no automated axe violations for $name", async ({ markup }) => {
    await expect(axeViolations(markup)).resolves.toEqual([]);
  });

  it("keeps reduced motion rules in base styles", () => {
    const base = createLumoraBaseStyles(lumoraThemes, defaultThemeName);

    expect(base["@media (prefers-reduced-motion: reduce)"]).toBeTruthy();
    expect(base["@media (prefers-reduced-motion: reduce)"]["*, *::before, *::after"]).toMatchObject(
      {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        scrollBehavior: "auto !important",
        transitionDuration: "0.01ms !important"
      }
    );
  });
});
