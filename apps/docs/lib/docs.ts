import { lumoraThemes, requiredThemeTokens } from "@lumora-ui/themes";

export type DocsExample = {
  html: string;
  react: string;
  vue: string;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  category: string;
  description: string;
  classes: string[];
  props: string[];
  accessibility: string[];
  examples: DocsExample;
};

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description:
      "Primary action primitive with variants, sizes, loading, active, and icon-only states.",
    classes: ["lm-btn", "lm-btn-primary", "lm-btn-outline", "lm-btn-danger", "lm-btn-loading"],
    props: ["variant", "size", "loading", "active", "iconOnly", "disabled"],
    accessibility: [
      "Use native button elements for actions.",
      "Set type on buttons inside forms.",
      "Use aria-busy for loading operations."
    ],
    examples: {
      html: `<button class="lm-btn lm-btn-primary lm-btn-md" type="button">Save changes</button>`,
      react: `<LumoraButton variant="primary" size="md">Save changes</LumoraButton>`,
      vue: `<LumoraButton variant="primary" size="md">Save changes</LumoraButton>`
    }
  },
  {
    slug: "form-controls",
    name: "Form controls",
    category: "Forms",
    description:
      "Input, textarea, select, checkbox, radio, and switch classes for enterprise forms.",
    classes: ["lm-field", "lm-label", "lm-input", "lm-select", "lm-checkbox", "lm-switch"],
    props: ["size", "state", "invalid", "disabled"],
    accessibility: [
      "Every control needs a visible label or aria-label.",
      "Use aria-describedby for hints and errors.",
      "Do not rely on color alone for validation."
    ],
    examples: {
      html: `<label class="lm-field">
  <span class="lm-label">Company email</span>
  <input class="lm-input" type="email" aria-describedby="email-hint" />
  <span id="email-hint" class="lm-hint">Used for billing alerts.</span>
</label>`,
      react: `<LumoraField>
  <LumoraLabel>Company email</LumoraLabel>
  <LumoraInput type="email" />
  <LumoraHint>Used for billing alerts.</LumoraHint>
</LumoraField>`,
      vue: `<LumoraField>
  <LumoraLabel>Company email</LumoraLabel>
  <LumoraInput type="email" />
  <LumoraHint>Used for billing alerts.</LumoraHint>
</LumoraField>`
    }
  },
  {
    slug: "card",
    name: "Card",
    category: "Layout",
    description:
      "Content container with header, body, footer, title, raised, flat, and interactive variants.",
    classes: ["lm-card", "lm-card-header", "lm-card-body", "lm-card-footer", "lm-card-raised"],
    props: ["variant"],
    accessibility: [
      "Use semantic headings inside cards.",
      "Interactive cards need a clear focusable target.",
      "Avoid nesting cards inside cards."
    ],
    examples: {
      html: `<article class="lm-card">
  <header class="lm-card-header"><h3 class="lm-card-title">Account</h3></header>
  <div class="lm-card-body">Plan details and controls.</div>
</article>`,
      react: `<LumoraCard>
  <LumoraCard.Header>
    <LumoraCard.Title>Account</LumoraCard.Title>
  </LumoraCard.Header>
  <LumoraCard.Body>Plan details and controls.</LumoraCard.Body>
</LumoraCard>`,
      vue: `<LumoraCard>
  <LumoraCardHeader>
    <LumoraCardTitle>Account</LumoraCardTitle>
  </LumoraCardHeader>
  <LumoraCardBody>Plan details and controls.</LumoraCardBody>
</LumoraCard>`
    }
  },
  {
    slug: "modal",
    name: "Modal",
    category: "Overlays",
    description: "Blocking dialog surface with panel sizing, header, body, and footer sections.",
    classes: ["lm-modal", "lm-modal-panel", "lm-modal-header", "lm-modal-body", "lm-modal-footer"],
    props: ["open", "size"],
    accessibility: [
      "Use role=dialog and aria-modal=true.",
      "Provide aria-labelledby or aria-label.",
      "Trap focus and restore it to the trigger."
    ],
    examples: {
      html: `<div class="lm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
  <section class="lm-modal-panel">
    <header class="lm-modal-header"><h2 id="confirm-title">Confirm</h2></header>
    <div class="lm-modal-body">Approve this account?</div>
  </section>
</div>`,
      react: `<LumoraModal aria-label="Confirm">
  <LumoraModal.Panel>
    <LumoraModal.Body>Approve this account?</LumoraModal.Body>
  </LumoraModal.Panel>
</LumoraModal>`,
      vue: `<LumoraModal aria-label="Confirm">
  <LumoraModalPanel>
    <LumoraModalBody>Approve this account?</LumoraModalBody>
  </LumoraModalPanel>
</LumoraModal>`
    }
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    category: "Overlays",
    description:
      "Positioned action menu primitives for menus, filters, and compact command surfaces.",
    classes: ["lm-dropdown", "lm-dropdown-menu", "lm-dropdown-item", "lm-dropdown-item-active"],
    props: ["active"],
    accessibility: [
      "Use aria-haspopup and aria-expanded on the trigger.",
      "Use role=menu and role=menuitem for action menus.",
      "Return focus to the trigger on close."
    ],
    examples: {
      html: `<div class="lm-dropdown">
  <button class="lm-btn" aria-haspopup="menu" aria-expanded="true">Actions</button>
  <div class="lm-dropdown-menu" role="menu">
    <button class="lm-dropdown-item" role="menuitem">Edit</button>
  </div>
</div>`,
      react: `<LumoraDropdown>
  <LumoraDropdownMenu>
    <LumoraDropdownItem>Edit</LumoraDropdownItem>
  </LumoraDropdownMenu>
</LumoraDropdown>`,
      vue: `<LumoraDropdown>
  <LumoraDropdownMenu>
    <LumoraDropdownItem>Edit</LumoraDropdownItem>
  </LumoraDropdownMenu>
</LumoraDropdown>`
    }
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Accessible tab list styling with selected, disabled, and size states.",
    classes: ["lm-tabs", "lm-tab", "lm-tab-active", "lm-tab-sm", "lm-tab-lg"],
    props: ["active", "size"],
    accessibility: [
      "Use tablist, tab, and tabpanel roles.",
      "Use roving tabindex.",
      "Support Arrow, Home, and End key movement."
    ],
    examples: {
      html: `<div class="lm-tabs" role="tablist" aria-label="Settings">
  <button class="lm-tab lm-tab-active" role="tab" aria-selected="true">Profile</button>
  <button class="lm-tab" role="tab" aria-selected="false">Security</button>
</div>`,
      react: `<LumoraTabs aria-label="Settings">
  <LumoraTab active>Profile</LumoraTab>
  <LumoraTab>Security</LumoraTab>
</LumoraTabs>`,
      vue: `<LumoraTabs aria-label="Settings">
  <LumoraTab active>Profile</LumoraTab>
  <LumoraTab>Security</LumoraTab>
</LumoraTabs>`
    }
  },
  {
    slug: "table",
    name: "Table",
    category: "Data display",
    description: "Native table styling for dense enterprise data with striped and compact modes.",
    classes: ["lm-table", "lm-table-striped", "lm-table-compact", "lm-table-spacious"],
    props: ["striped", "density"],
    accessibility: [
      "Prefer native table markup.",
      "Use captions for complex tables.",
      "Use scope on header cells."
    ],
    examples: {
      html: `<table class="lm-table lm-table-striped">
  <caption>Enterprise accounts</caption>
  <thead><tr><th scope="col">Account</th><th scope="col">Status</th></tr></thead>
  <tbody><tr><td>Atlas</td><td>Active</td></tr></tbody>
</table>`,
      react: `<LumoraTable striped>
  <LumoraTable.Header>
    <LumoraTable.Row><LumoraTable.Head>Account</LumoraTable.Head></LumoraTable.Row>
  </LumoraTable.Header>
</LumoraTable>`,
      vue: `<LumoraTable striped>
  <LumoraTableHeader>
    <LumoraTableRow><LumoraTableHead>Account</LumoraTableHead></LumoraTableRow>
  </LumoraTableHeader>
</LumoraTable>`
    }
  },
  {
    slug: "navigation",
    name: "Navigation",
    category: "Navigation",
    description: "Navbar, sidebar, breadcrumbs, and pagination primitives for application shells.",
    classes: ["lm-navbar", "lm-sidebar", "lm-sidebar-item", "lm-breadcrumbs", "lm-pagination"],
    props: ["active", "compact", "size"],
    accessibility: [
      "Use nav landmarks with accessible names when multiple navs exist.",
      "Use aria-current for active links.",
      "Keep keyboard focus order matching visual order."
    ],
    examples: {
      html: `<nav class="lm-sidebar" aria-label="Primary">
  <a class="lm-sidebar-item lm-sidebar-item-active" aria-current="page" href="/dashboard">Dashboard</a>
</nav>`,
      react: `<LumoraSidebar>
  <LumoraSidebarItem active href="/dashboard">Dashboard</LumoraSidebarItem>
</LumoraSidebar>`,
      vue: `<LumoraSidebar>
  <LumoraSidebarItem active href="/dashboard">Dashboard</LumoraSidebarItem>
</LumoraSidebar>`
    }
  },
  {
    slug: "status",
    name: "Status and loading",
    category: "Feedback",
    description: "Toast, alert, progress, spinner, badge, avatar, and skeleton primitives.",
    classes: ["lm-toast", "lm-alert", "lm-progress", "lm-spinner", "lm-skeleton", "lm-avatar"],
    props: ["status", "size", "shape"],
    accessibility: [
      "Use role=status for passive updates.",
      "Use role=alert only for urgent failures.",
      "Do not steal focus for passive notifications."
    ],
    examples: {
      html: `<div class="lm-toast lm-toast-success" role="status">
  Settings saved successfully.
</div>`,
      react: `<LumoraToast status="success">Settings saved successfully.</LumoraToast>`,
      vue: `<LumoraToast status="success">Settings saved successfully.</LumoraToast>`
    }
  },
  {
    slug: "enterprise-workflows",
    name: "Enterprise workflows",
    category: "Patterns",
    description:
      "Application shell, command bars, filter bars, bulk actions, empty states, stats, timelines, and activity feeds.",
    classes: [
      "lm-app-shell",
      "lm-page-header",
      "lm-command-bar",
      "lm-filter-bar",
      "lm-table-toolbar",
      "lm-bulk-bar",
      "lm-empty-state",
      "lm-stat",
      "lm-description-list",
      "lm-activity-feed",
      "lm-timeline",
      "lm-banner"
    ],
    props: ["status", "density", "aria-sort", "aria-current"],
    accessibility: [
      "Use landmarks for application shell regions.",
      "Keep table sort state in aria-sort.",
      "Use role=status or role=alert for workflow banners when appropriate."
    ],
    examples: {
      html: `<section class="lm-app-shell">
  <header class="lm-page-header">
    <div>
      <h1 class="lm-page-title">Accounts</h1>
      <p class="lm-page-description">Manage enterprise customers.</p>
    </div>
    <button class="lm-btn lm-btn-primary">Add account</button>
  </header>
  <div class="lm-command-bar">
    <strong>3 selected</strong>
    <button class="lm-btn lm-btn-outline lm-btn-sm">Export</button>
  </div>
</section>`,
      react: `<section className="lm-app-shell">
  <header className="lm-page-header">
    <h1 className="lm-page-title">Accounts</h1>
    <LumoraButton variant="primary">Add account</LumoraButton>
  </header>
</section>`,
      vue: `<section class="lm-app-shell">
  <header class="lm-page-header">
    <h1 class="lm-page-title">Accounts</h1>
    <LumoraButton variant="primary">Add account</LumoraButton>
  </header>
</section>`
    }
  }
];

export const guideCards = [
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Install core, React, Vue, and wire Tailwind v4."
  },
  {
    href: "/docs/theming",
    title: "Theming",
    description: "Use built-in themes, CSS variables, and density modes."
  },
  {
    href: "/docs/tokens",
    title: "Design tokens",
    description: "Inspect required token names and built-in theme coverage."
  },
  {
    href: "/docs/migration",
    title: "Versioning",
    description: "Semver, migrations, and package upgrade policy."
  },
  {
    href: "/accessibility",
    title: "Accessibility",
    description: "WCAG target, ARIA, keyboard, and focus guidance."
  },
  {
    href: "/patterns",
    title: "Enterprise patterns",
    description: "Dashboard, settings, billing, auth, analytics, and tables."
  }
];

export const patternDocs = [
  "Dashboard shell",
  "Login page",
  "Settings form",
  "Billing controls",
  "Data table workflow",
  "User management",
  "Analytics overview"
];

export const themeSummary = {
  count: lumoraThemes.length,
  tokenCount: requiredThemeTokens.length,
  themes: lumoraThemes,
  tokens: requiredThemeTokens
};

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
