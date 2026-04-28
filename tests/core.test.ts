import { describe, expect, it } from "vitest";
import {
  defaultThemeName,
  lumoraComponents,
  lumoraThemes,
  tokensToCssVariables
} from "../packages/core/src";

describe("@lumora-ui/core", () => {
  it("exposes the planned lm-* component surface", () => {
    const required = [
      ".lm-btn",
      ".lm-btn-primary",
      ".lm-btn-danger",
      ".lm-badge",
      ".lm-alert",
      ".lm-card",
      ".lm-input, .lm-textarea, .lm-select",
      ".lm-checkbox, .lm-radio",
      ".lm-switch",
      ".lm-tabs",
      ".lm-dropdown",
      ".lm-modal",
      ".lm-drawer",
      ".lm-tooltip",
      ".lm-toast",
      ".lm-avatar",
      ".lm-breadcrumbs",
      ".lm-pagination",
      ".lm-navbar",
      ".lm-sidebar",
      ".lm-table",
      ".lm-skeleton",
      ".lm-progress",
      ".lm-spinner"
    ];

    for (const selector of required) {
      expect(lumoraComponents[selector], `${selector} should exist`).toBeTruthy();
    }
  });

  it("exposes Phase 2 variants, states, sizes, and density modes", () => {
    const required = [
      ".lm-density-compact",
      ".lm-density-comfortable",
      ".lm-density-spacious",
      ".lm-btn-success",
      ".lm-btn-warning",
      ".lm-btn-info",
      ".lm-btn-active, .lm-btn[aria-pressed='true']",
      ".lm-btn[aria-expanded='true']",
      ".lm-btn-loading, .lm-btn[aria-busy='true']",
      ".lm-badge-secondary",
      ".lm-badge-accent",
      ".lm-badge-info",
      ".lm-input-sm, .lm-select-sm",
      ".lm-input-lg, .lm-select-lg",
      ".lm-input-success, .lm-textarea-success, .lm-select-success",
      ".lm-input-danger, .lm-textarea-danger, .lm-select-danger, .lm-input-invalid",
      ".lm-checkbox-lg, .lm-radio-lg",
      ".lm-switch-lg",
      ".lm-tab:disabled, .lm-tab[aria-disabled='true']",
      ".lm-dropdown-menu[hidden], .lm-dropdown-menu[data-state='closed']",
      ".lm-dropdown-item[aria-selected='true'], .lm-dropdown-item-active",
      ".lm-modal[hidden], .lm-modal[data-state='closed']",
      ".lm-modal-lg .lm-modal-panel, .lm-modal-panel-lg",
      ".lm-drawer-left",
      ".lm-tooltip-content[data-side='right']",
      ".lm-toast-success",
      ".lm-avatar-xl",
      ".lm-pagination-item[aria-disabled='true'], .lm-pagination-disabled",
      ".lm-sidebar-item[aria-current='page']",
      ".lm-table-striped tbody tr:nth-child(even) td",
      ".lm-progress-lg",
      ".lm-spinner-lg"
    ];

    for (const selector of required) {
      expect(lumoraComponents[selector], `${selector} should exist`).toBeTruthy();
    }
  });

  it("exports theme helpers for customization", () => {
    expect(defaultThemeName).toBe("lumora-light");
    expect(lumoraThemes.length).toBeGreaterThanOrEqual(20);
    expect(tokensToCssVariables(lumoraThemes[0])["--lm-color-bg"]).toBeTruthy();
  });

  it("exposes Phase 8 enterprise workflow primitives", () => {
    const required = [
      ".lm-app-shell",
      ".lm-app-shell-sidebar",
      ".lm-app-main",
      ".lm-page-header",
      ".lm-page-title",
      ".lm-command-bar",
      ".lm-filter-bar",
      ".lm-table-toolbar",
      ".lm-table-sort",
      ".lm-bulk-bar",
      ".lm-empty-state",
      ".lm-stat-grid",
      ".lm-stat",
      ".lm-stat-trend-up",
      ".lm-description-list",
      ".lm-activity-feed",
      ".lm-activity-item",
      ".lm-timeline",
      ".lm-timeline-item",
      ".lm-timeline-dot",
      ".lm-banner",
      ".lm-banner-warning"
    ];

    for (const selector of required) {
      expect(lumoraComponents[selector], `${selector} should exist`).toBeTruthy();
    }
  });

  it("keeps a stable CSS snapshot for primary controls", () => {
    expect({
      button: lumoraComponents[".lm-btn"],
      primary: lumoraComponents[".lm-btn-primary"],
      input: lumoraComponents[".lm-input, .lm-textarea, .lm-select"],
      card: lumoraComponents[".lm-card"],
      density: lumoraComponents[".lm-density-compact"],
      states: {
        buttonLoading: lumoraComponents[".lm-btn-loading, .lm-btn[aria-busy='true']"],
        inputInvalid:
          lumoraComponents[
            ".lm-input-danger, .lm-textarea-danger, .lm-select-danger, .lm-input-invalid"
          ],
        dropdownClosed:
          lumoraComponents[".lm-dropdown-menu[hidden], .lm-dropdown-menu[data-state='closed']"]
      }
    }).toMatchSnapshot();
  });
});
