import { renderToString } from "@vue/server-renderer";
import { h } from "vue";
import { describe, expect, it } from "vitest";
import {
  LumoraAlert,
  LumoraAvatar,
  LumoraBadge,
  LumoraButton,
  LumoraCard,
  LumoraCardBody,
  LumoraCardHeader,
  LumoraCardTitle,
  LumoraCheckbox,
  LumoraDensityScope,
  LumoraDrawer,
  LumoraDropdown,
  LumoraDropdownItem,
  LumoraDropdownMenu,
  LumoraField,
  LumoraHint,
  LumoraInput,
  LumoraLabel,
  LumoraModal,
  LumoraModalBody,
  LumoraModalFooter,
  LumoraModalHeader,
  LumoraModalPanel,
  LumoraPagination,
  LumoraPaginationItem,
  LumoraProgress,
  LumoraRadio,
  LumoraSelect,
  LumoraSidebar,
  LumoraSidebarItem,
  LumoraSkeleton,
  LumoraSpinner,
  LumoraSwitch,
  LumoraTab,
  LumoraTable,
  LumoraTableBody,
  LumoraTableCell,
  LumoraTableHead,
  LumoraTableHeader,
  LumoraTableRow,
  LumoraTabs,
  LumoraTextarea,
  LumoraToast,
  LumoraTooltip,
  LumoraTooltipContent,
  cn
} from "../packages/vue/src";

describe("@lumora-design/vue", () => {
  it("renders form and feedback wrappers with expected lm-* classes", async () => {
    const markup = await renderToString(
      h("div", [
        h(LumoraButton, { variant: "secondary", size: "lg", loading: true }, () => "Assign"),
        h(LumoraBadge, { variant: "success", size: "lg" }, () => "Active"),
        h(LumoraAlert, { status: "danger" }, () => "Failed"),
        h(LumoraField, () => [
          h(LumoraLabel, () => "Email"),
          h(LumoraInput, { invalid: true, state: "danger", size: "lg" }),
          h(LumoraHint, () => "Use your company address.")
        ]),
        h(LumoraTextarea, { state: "warning" }),
        h(LumoraSelect, { size: "sm", state: "success" }, () => [h("option", "Annual")]),
        h(LumoraCheckbox, { size: "lg" }),
        h(LumoraRadio, { size: "sm" }),
        h(LumoraSwitch, { size: "lg" })
      ])
    );

    expect(markup).toContain("lm-btn lm-btn-secondary lm-btn-lg lm-btn-loading");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("lm-badge lm-badge-success lm-badge-lg");
    expect(markup).toContain("lm-alert lm-alert-danger");
    expect(markup).toContain("lm-input lm-input-lg lm-input-danger");
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain("lm-textarea lm-textarea-warning");
    expect(markup).toContain("lm-select lm-select-sm lm-select-success");
    expect(markup).toContain("lm-checkbox lm-checkbox-lg");
    expect(markup).toContain("lm-radio lm-radio-sm");
    expect(markup).toContain('role="switch"');
    expect(markup).toContain("lm-switch lm-switch-lg");
  });

  it("renders overlay and navigation wrappers with accessible defaults", async () => {
    const markup = await renderToString(
      h("div", [
        h(LumoraTabs, { "aria-label": "Settings" }, () => [
          h(LumoraTab, { active: true }, () => "Profile")
        ]),
        h(LumoraDropdown, () => [
          h(LumoraDropdownMenu, () => [h(LumoraDropdownItem, { active: true }, () => "Edit")])
        ]),
        h(LumoraModal, { "aria-label": "Confirm" }, () => [
          h(LumoraModalPanel, { size: "lg" }, () => [
            h(LumoraModalHeader, () => "Header"),
            h(LumoraModalBody, () => "Body"),
            h(LumoraModalFooter, () => "Footer")
          ])
        ]),
        h(LumoraDrawer, { side: "left", size: "sm", "aria-label": "Filters" }),
        h(LumoraTooltip, () => [
          "Help",
          h(LumoraTooltipContent, { side: "right" }, () => "Tooltip")
        ]),
        h(LumoraSidebar, { compact: true }, () => [
          h(LumoraSidebarItem, { active: true, href: "/dashboard" }, () => "Dashboard")
        ]),
        h(LumoraPagination, () => [
          h(LumoraPaginationItem, { active: true, href: "?page=1" }, () => "1")
        ])
      ])
    );

    expect(markup).toContain('role="tablist"');
    expect(markup).toContain('role="tab"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('role="menu"');
    expect(markup).toContain("lm-dropdown-item lm-dropdown-item-active");
    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain("lm-modal-panel lm-modal-panel-lg");
    expect(markup).toContain("lm-drawer lm-drawer-left lm-drawer-sm");
    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain('data-side="right"');
    expect(markup).toContain("lm-sidebar lm-sidebar-compact");
    expect(markup).toContain('aria-current="page"');
  });

  it("renders data display wrappers", async () => {
    const markup = await renderToString(
      h(LumoraDensityScope, { density: "compact" }, () => [
        h(LumoraCard, { variant: "raised" }, () => [
          h(LumoraCardHeader, () => [h(LumoraCardTitle, () => "Accounts")]),
          h(LumoraCardBody, () => [
            h(LumoraAvatar, { size: "xl" }, () => "A"),
            h(LumoraTable, { striped: true, density: "compact" }, () => [
              h(LumoraTableHeader, () => [
                h(LumoraTableRow, () => [h(LumoraTableHead, () => "Account")])
              ]),
              h(LumoraTableBody, () => [
                h(LumoraTableRow, () => [h(LumoraTableCell, () => "Atlas")])
              ])
            ]),
            h(LumoraSkeleton, { shape: "text" }),
            h(LumoraProgress, { size: "lg", value: 70, max: 100 }),
            h(LumoraSpinner, { size: "sm" }, () => "Loading"),
            h(LumoraToast, { status: "success", size: "sm" }, () => "Saved")
          ])
        ])
      ])
    );

    expect(markup).toContain("lm-density-compact");
    expect(markup).toContain("lm-card lm-card-raised");
    expect(markup).toContain("lm-card-title");
    expect(markup).toContain("lm-avatar lm-avatar-xl");
    expect(markup).toContain("lm-table lm-table-striped lm-table-compact");
    expect(markup).toContain('<th scope="col">Account</th>');
    expect(markup).toContain("lm-skeleton lm-skeleton-text");
    expect(markup).toContain("lm-progress lm-progress-lg");
    expect(markup).toContain("lm-spinner lm-spinner-sm");
    expect(markup).toContain("lm-toast lm-toast-success lm-toast-sm");
  });

  it("exports cn helper", () => {
    expect(cn("lm-btn", false, undefined, "lm-btn-primary")).toBe("lm-btn lm-btn-primary");
  });
});
