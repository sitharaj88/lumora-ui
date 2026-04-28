import { describe, expect, it } from "vitest";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  LumoraAlert,
  LumoraAvatar,
  LumoraBadge,
  LumoraButton,
  LumoraCard,
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
  LumoraNavbar,
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
  LumoraTabs,
  LumoraTextarea,
  LumoraToast,
  LumoraTooltip,
  LumoraTooltipContent,
  cn
} from "../packages/react/src";

describe("@lumora-ui/react", () => {
  it("renders form and feedback wrappers with expected lm-* classes", () => {
    const markup = renderToStaticMarkup(
      <>
        <LumoraButton variant="danger" size="sm" loading>
          Delete
        </LumoraButton>
        <LumoraBadge variant="success" size="lg">
          Active
        </LumoraBadge>
        <LumoraAlert status="warning">Review required</LumoraAlert>
        <LumoraField>
          <LumoraLabel>Email</LumoraLabel>
          <LumoraInput invalid state="danger" size="lg" placeholder="Email" />
          <LumoraHint>Use your company address.</LumoraHint>
        </LumoraField>
        <LumoraTextarea state="warning" />
        <LumoraSelect size="sm" state="success">
          <option>Annual</option>
        </LumoraSelect>
        <LumoraCheckbox size="lg" />
        <LumoraRadio size="sm" />
        <LumoraSwitch size="lg" />
      </>
    );

    expect(markup).toContain("lm-btn lm-btn-danger lm-btn-sm lm-btn-loading");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("lm-badge lm-badge-success lm-badge-lg");
    expect(markup).toContain("lm-alert lm-alert-warning");
    expect(markup).toContain("lm-input lm-input-lg lm-input-danger");
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain("lm-textarea lm-textarea-warning");
    expect(markup).toContain("lm-select lm-select-sm lm-select-success");
    expect(markup).toContain("lm-checkbox lm-checkbox-lg");
    expect(markup).toContain("lm-radio lm-radio-sm");
    expect(markup).toContain('role="switch"');
    expect(markup).toContain("lm-switch lm-switch-lg");
  });

  it("renders overlay and navigation wrappers with accessible defaults", () => {
    const markup = renderToStaticMarkup(
      <>
        <LumoraTabs aria-label="Settings">
          <LumoraTab active>Profile</LumoraTab>
        </LumoraTabs>
        <LumoraDropdown>
          <LumoraDropdownMenu>
            <LumoraDropdownItem active>Edit</LumoraDropdownItem>
          </LumoraDropdownMenu>
        </LumoraDropdown>
        <LumoraModal aria-label="Confirm">
          <LumoraModal.Panel size="lg">
            <LumoraModal.Header>Header</LumoraModal.Header>
            <LumoraModal.Body>Body</LumoraModal.Body>
            <LumoraModal.Footer>Footer</LumoraModal.Footer>
          </LumoraModal.Panel>
        </LumoraModal>
        <LumoraDrawer side="left" size="sm" aria-label="Filters" />
        <LumoraTooltip>
          Help
          <LumoraTooltipContent side="right">Tooltip</LumoraTooltipContent>
        </LumoraTooltip>
        <LumoraNavbar />
        <LumoraSidebar compact>
          <LumoraSidebarItem active href="/dashboard">
            Dashboard
          </LumoraSidebarItem>
        </LumoraSidebar>
        <LumoraPagination>
          <LumoraPaginationItem active href="?page=1">
            1
          </LumoraPaginationItem>
        </LumoraPagination>
      </>
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

  it("renders data display wrappers and compound aliases", () => {
    const markup = renderToStaticMarkup(
      <LumoraDensityScope density="compact">
        <LumoraCard variant="raised">
          <LumoraCard.Header>
            <LumoraCard.Title>Accounts</LumoraCard.Title>
          </LumoraCard.Header>
          <LumoraCard.Body>
            <LumoraAvatar size="xl">A</LumoraAvatar>
            <LumoraTable striped density="compact">
              <LumoraTable.Header>
                <LumoraTable.Row>
                  <LumoraTable.Head>Account</LumoraTable.Head>
                </LumoraTable.Row>
              </LumoraTable.Header>
              <LumoraTable.Body>
                <LumoraTable.Row>
                  <LumoraTable.Cell>Atlas</LumoraTable.Cell>
                </LumoraTable.Row>
              </LumoraTable.Body>
            </LumoraTable>
            <LumoraSkeleton shape="text" />
            <LumoraProgress size="lg" value={70} max={100} />
            <LumoraSpinner size="sm">Loading</LumoraSpinner>
            <LumoraToast status="success" size="sm">
              Saved
            </LumoraToast>
          </LumoraCard.Body>
        </LumoraCard>
      </LumoraDensityScope>
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
