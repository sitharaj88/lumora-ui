import type { ReactNode } from "react";

export type CatalogProp = {
  name: string;
  type: string;
  default?: string;
  description?: string;
};

export type CatalogClass = {
  name: string;
  description: string;
};

export type CatalogVariant = {
  label: string;
  preview: ReactNode;
};

export type ComponentCatalogEntry = {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  status: "stable" | "beta" | "new";
  preview: ReactNode;
  variants?: CatalogVariant[];
  classes: CatalogClass[];
  props: CatalogProp[];
  accessibility: string[];
  htmlExample: string;
  reactExample?: string;
};

export type ComponentCategory =
  | "Action"
  | "Form"
  | "Display"
  | "Feedback"
  | "Layout"
  | "Navigation"
  | "Overlay"
  | "Disclosure"
  | "Data"
  | "Media"
  | "Pattern";

export const categoryOrder: ComponentCategory[] = [
  "Action",
  "Form",
  "Display",
  "Feedback",
  "Layout",
  "Navigation",
  "Overlay",
  "Disclosure",
  "Data",
  "Media",
  "Pattern"
];

const a11yButton = [
  "Use native <button> for actions, <a> for links.",
  "Set type='button' inside forms to avoid accidental submits.",
  "Use aria-busy='true' during async actions; aria-pressed for toggles.",
  "Disabled state uses :disabled or aria-disabled='true'."
];

const a11yForm = [
  "Every control needs a visible <label> or aria-label.",
  "Use aria-describedby to link hints and error messages.",
  "Never rely on color alone for invalid state — pair with text + icon.",
  "Required fields use aria-required and an inline marker."
];

const a11yOverlay = [
  "Use role='dialog' and aria-modal='true' for blocking overlays.",
  "Trap focus inside the overlay; return focus to the trigger on close.",
  "Provide aria-labelledby and aria-describedby.",
  "Close on Escape and outside-click."
];

export const componentCatalog: ComponentCatalogEntry[] = [
  // -- ACTION ----------------------------------------------------------
  {
    slug: "button",
    name: "Button",
    category: "Action",
    status: "stable",
    description:
      "Primary action primitive with 8 variants, 5 sizes, loading, pressed, icon, and block states. Subtle gradient + glow on focus.",
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <button className="lm-btn lm-btn-primary">Save changes</button>
        <button className="lm-btn lm-btn-outline">Review</button>
        <button className="lm-btn lm-btn-ghost">Cancel</button>
      </div>
    ),
    variants: [
      {
        label: "Variants",
        preview: (
          <div className="flex flex-wrap gap-2">
            <button className="lm-btn lm-btn-primary">Primary</button>
            <button className="lm-btn lm-btn-secondary">Secondary</button>
            <button className="lm-btn lm-btn-accent">Accent</button>
            <button className="lm-btn lm-btn-success">Success</button>
            <button className="lm-btn lm-btn-warning">Warning</button>
            <button className="lm-btn lm-btn-danger">Danger</button>
            <button className="lm-btn lm-btn-info">Info</button>
            <button className="lm-btn lm-btn-outline">Outline</button>
            <button className="lm-btn lm-btn-ghost">Ghost</button>
            <button className="lm-btn lm-btn-link">Link</button>
          </div>
        )
      },
      {
        label: "Sizes",
        preview: (
          <div className="flex flex-wrap items-center gap-2">
            <button className="lm-btn lm-btn-primary lm-btn-xs">Extra small</button>
            <button className="lm-btn lm-btn-primary lm-btn-sm">Small</button>
            <button className="lm-btn lm-btn-primary lm-btn-md">Medium</button>
            <button className="lm-btn lm-btn-primary lm-btn-lg">Large</button>
            <button className="lm-btn lm-btn-primary lm-btn-xl">Extra large</button>
          </div>
        )
      },
      {
        label: "States",
        preview: (
          <div className="flex flex-wrap gap-2">
            <button className="lm-btn lm-btn-primary" aria-busy="true">
              Loading
            </button>
            <button className="lm-btn lm-btn-primary" aria-pressed="true">
              Pressed
            </button>
            <button className="lm-btn lm-btn-primary" disabled>
              Disabled
            </button>
            <button className="lm-btn lm-btn-primary lm-btn-icon" aria-label="Filter">
              ⌖
            </button>
          </div>
        )
      },
      {
        label: "Group",
        preview: (
          <div className="lm-btn-group">
            <button className="lm-btn">Day</button>
            <button className="lm-btn" aria-pressed="true">
              Week
            </button>
            <button className="lm-btn">Month</button>
          </div>
        )
      }
    ],
    classes: [
      { name: "lm-btn", description: "Base class — required on every button" },
      { name: "lm-btn-{variant}", description: "primary | secondary | accent | success | warning | danger | info | outline | ghost | link" },
      { name: "lm-btn-{size}", description: "xs | sm | md | lg | xl" },
      { name: "lm-btn-icon", description: "Square icon-only button" },
      { name: "lm-btn-block", description: "Full-width button" },
      { name: "lm-btn-loading", description: "Show inline spinner; pairs with aria-busy" },
      { name: "lm-btn-group", description: "Wrapper for adjacent buttons with shared borders" }
    ],
    props: [
      { name: "variant", type: "Variant", default: "default", description: "Visual emphasis" },
      { name: "size", type: "Size", default: "md", description: "xs / sm / md / lg / xl" },
      { name: "loading", type: "boolean", default: "false", description: "Adds spinner + sets aria-busy" },
      { name: "pressed", type: "boolean", description: "Toggle pressed state via aria-pressed" },
      { name: "iconOnly", type: "boolean", description: "Square padding for icon-only" },
      { name: "block", type: "boolean", description: "Full-width" },
      { name: "as", type: "ElementType", default: "button", description: "Render as <a>, <Link>, etc." }
    ],
    accessibility: a11yButton,
    htmlExample: `<button class="lm-btn lm-btn-primary lm-btn-md" type="button">
  Save changes
</button>

<button class="lm-btn lm-btn-primary" aria-busy="true">
  Saving…
</button>`,
    reactExample: `import { LumoraButton } from "@lumora-ui/react";

<LumoraButton variant="primary" size="md">Save changes</LumoraButton>
<LumoraButton variant="primary" loading>Saving…</LumoraButton>`
  },
  {
    slug: "button-group",
    name: "Button group",
    category: "Action",
    status: "stable",
    description: "Adjacent buttons with shared borders and isolation, perfect for segmented filter controls.",
    preview: (
      <div className="lm-btn-group">
        <button className="lm-btn">Day</button>
        <button className="lm-btn" aria-pressed="true">
          Week
        </button>
        <button className="lm-btn">Month</button>
      </div>
    ),
    classes: [
      { name: "lm-btn-group", description: "Inline-flex wrapper that joins .lm-btn children" }
    ],
    props: [
      { name: "orientation", type: "horizontal | vertical", default: "horizontal", description: "Stack direction" }
    ],
    accessibility: a11yButton,
    htmlExample: `<div class="lm-btn-group" role="group" aria-label="Time range">
  <button class="lm-btn">Day</button>
  <button class="lm-btn" aria-pressed="true">Week</button>
  <button class="lm-btn">Month</button>
</div>`
  },
  {
    slug: "toggle-group",
    name: "Toggle group",
    category: "Action",
    status: "new",
    description: "Single-select segmented buttons for view modes, filter dimensions, or unit pickers.",
    preview: (
      <div className="lm-toggle-group">
        <button className="lm-toggle-group-item">Compact</button>
        <button className="lm-toggle-group-item" aria-pressed="true">
          Comfortable
        </button>
        <button className="lm-toggle-group-item">Spacious</button>
      </div>
    ),
    classes: [
      { name: "lm-toggle-group", description: "Wrapper with shared border" },
      { name: "lm-toggle-group-item", description: "Each pill; aria-pressed='true' = selected" }
    ],
    props: [
      { name: "value", type: "string", description: "Active item value" },
      { name: "onValueChange", type: "(value: string) => void", description: "Selection callback" }
    ],
    accessibility: [
      "Use role='radiogroup' and aria-checked on items.",
      "Wire arrow keys for focus traversal."
    ],
    htmlExample: `<div class="lm-toggle-group" role="radiogroup">
  <button class="lm-toggle-group-item" aria-checked="false">Compact</button>
  <button class="lm-toggle-group-item" aria-pressed="true" aria-checked="true">Comfortable</button>
  <button class="lm-toggle-group-item" aria-checked="false">Spacious</button>
</div>`
  },
  // -- DISPLAY ---------------------------------------------------------
  {
    slug: "badge",
    name: "Badge",
    category: "Display",
    status: "stable",
    description: "Small status indicator with semantic colors, soft, outline, and dot variants.",
    preview: (
      <div className="flex flex-wrap gap-2">
        <span className="lm-badge lm-badge-primary">Primary</span>
        <span className="lm-badge lm-badge-success lm-badge-dot">Active</span>
        <span className="lm-badge lm-badge-warning lm-badge-dot">Review</span>
        <span className="lm-badge lm-badge-danger">Failed</span>
        <span className="lm-badge lm-badge-soft">Soft</span>
        <span className="lm-badge lm-badge-outline">Outline</span>
      </div>
    ),
    classes: [
      { name: "lm-badge", description: "Base pill" },
      { name: "lm-badge-{variant}", description: "primary | secondary | accent | success | warning | danger | info" },
      { name: "lm-badge-soft", description: "Muted primary tint" },
      { name: "lm-badge-outline", description: "Transparent with stronger border" },
      { name: "lm-badge-dot", description: "Adds a leading colored dot" },
      { name: "lm-badge-{size}", description: "sm | md | lg" }
    ],
    props: [
      { name: "variant", type: "Variant", default: "default", description: "Color scheme" },
      { name: "tone", type: "solid | soft | outline", default: "solid", description: "Surface treatment" },
      { name: "dot", type: "boolean", description: "Show leading dot" }
    ],
    accessibility: [
      "Always pair color with text — color alone fails A11y.",
      "Wrap in role='status' for live regions when content changes."
    ],
    htmlExample: `<span class="lm-badge lm-badge-success lm-badge-dot">Active</span>
<span class="lm-badge lm-badge-soft">12 new</span>`
  },
  {
    slug: "tag",
    name: "Tag / Chip",
    category: "Display",
    status: "stable",
    description: "Removable tags with optional remove button. Pair with .lm-tag-input for chip-input fields.",
    preview: (
      <div className="flex flex-wrap gap-2">
        <span className="lm-tag">enterprise</span>
        <span className="lm-tag lm-tag-removable">
          annual
          <button className="lm-tag-remove" aria-label="Remove annual">
            ×
          </button>
        </span>
        <span className="lm-tag lm-tag-removable">
          priority-1
          <button className="lm-tag-remove" aria-label="Remove priority-1">
            ×
          </button>
        </span>
      </div>
    ),
    classes: [
      { name: "lm-tag", description: "Base chip" },
      { name: "lm-tag-removable", description: "Adjusts padding for the remove button" },
      { name: "lm-tag-remove", description: "Circular dismiss button" },
      { name: "lm-tag-input", description: "Input field that hosts tags + a typeahead input" }
    ],
    props: [
      { name: "removable", type: "boolean", description: "Show remove button" },
      { name: "onRemove", type: "() => void", description: "Remove callback" }
    ],
    accessibility: [
      "Remove button must include aria-label='Remove {tag}'.",
      "Backspace from empty tag input removes the previous tag."
    ],
    htmlExample: `<span class="lm-tag lm-tag-removable">
  enterprise
  <button class="lm-tag-remove" aria-label="Remove enterprise">×</button>
</span>`
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Display",
    status: "stable",
    description: "Circular user identity. Sizes xs–xl, image fallback, group with overlap, status dot.",
    preview: (
      <div className="flex items-center gap-3">
        <span className="lm-avatar lm-avatar-sm">AL</span>
        <span className="lm-avatar lm-avatar-md">MK</span>
        <span className="lm-avatar lm-avatar-lg">RS</span>
        <div className="lm-avatar-group">
          <span className="lm-avatar lm-avatar-sm">AL</span>
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background: "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
            }}
          >
            MK
          </span>
          <span className="lm-avatar-stack-more">+5</span>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-avatar", description: "Base circle" },
      { name: "lm-avatar-{size}", description: "xs | sm | md | lg | xl" },
      { name: "lm-avatar-group", description: "Inline-flex wrapper with overlapping margins" },
      { name: "lm-avatar-stack-more", description: "Overflow chip ('+5')" },
      { name: "lm-avatar-status", description: "Bottom-right colored dot" }
    ],
    props: [
      { name: "size", type: "Size", default: "md" },
      { name: "src", type: "string", description: "Image URL" },
      { name: "alt", type: "string", description: "Image alt text" },
      { name: "fallback", type: "string", description: "Initials when image missing" }
    ],
    accessibility: [
      "Use alt text on <img>; provide aria-label if avatar is interactive.",
      "Decorative avatars can use alt='' or role='presentation'."
    ],
    htmlExample: `<div class="lm-avatar-group">
  <span class="lm-avatar lm-avatar-sm">AL</span>
  <span class="lm-avatar lm-avatar-sm">MK</span>
  <span class="lm-avatar-stack-more">+5</span>
</div>`
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Display",
    status: "new",
    description: "Keyboard key indicator for shortcuts and command palettes. Monospace + raised border.",
    preview: (
      <div className="flex items-center gap-2 text-sm">
        <span>Quick search</span>
        <span className="lm-kbd">⌘</span>
        <span className="lm-kbd">K</span>
        <span className="ml-4">Submit</span>
        <span className="lm-kbd">↵</span>
      </div>
    ),
    classes: [{ name: "lm-kbd", description: "Single key indicator" }],
    props: [],
    accessibility: ["Wrap keys in <kbd> element for semantic HTML."],
    htmlExample: `<kbd class="lm-kbd">⌘</kbd> <kbd class="lm-kbd">K</kbd>`
  },
  {
    slug: "code",
    name: "Code & Code block",
    category: "Display",
    status: "new",
    description: "Inline code and full code blocks with monospace, sunken background, and bordered container.",
    preview: (
      <div className="grid gap-3">
        <p className="text-sm">
          Add <code className="lm-code">@plugin "@lumora-ui/core"</code> to your CSS.
        </p>
        <pre className="lm-code-block">{`@import "tailwindcss";
@plugin "@lumora-ui/core";`}</pre>
      </div>
    ),
    classes: [
      { name: "lm-code", description: "Inline code span" },
      { name: "lm-code-block", description: "Multi-line code container" }
    ],
    props: [],
    accessibility: ["Use semantic <code> and <pre><code> elements."],
    htmlExample: `<code class="lm-code">npm install</code>
<pre class="lm-code-block"><code>const x = 1;</code></pre>`
  },
  // -- FEEDBACK --------------------------------------------------------
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    status: "stable",
    description: "Inline message with semantic stripe accent. 4 tones, optional title and icon.",
    preview: (
      <div className="grid gap-2">
        <div className="lm-alert lm-alert-success">
          <span>✓</span>
          <div>
            <p className="lm-alert-title">Settings saved</p>
            <p className="lm-hint">Changes apply on next sign-in.</p>
          </div>
        </div>
        <div className="lm-alert lm-alert-warning">
          <span>!</span>
          <div>
            <p className="lm-alert-title">License renewing in 9 days</p>
          </div>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-alert", description: "Base callout" },
      { name: "lm-alert-{tone}", description: "info | success | warning | danger" },
      { name: "lm-alert-title", description: "Bold title row" }
    ],
    props: [
      { name: "tone", type: "Tone", default: "info" },
      { name: "title", type: "string" },
      { name: "icon", type: "ReactNode" }
    ],
    accessibility: [
      "Use role='status' for non-urgent updates.",
      "Use role='alert' for time-sensitive errors only — it interrupts screen readers."
    ],
    htmlExample: `<div class="lm-alert lm-alert-success" role="status">
  <span>✓</span>
  <div>
    <p class="lm-alert-title">Settings saved</p>
    <p class="lm-hint">Changes apply on next sign-in.</p>
  </div>
</div>`
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    status: "stable",
    description: "Slide-in notification with semantic left stripe. Use the lm-toaster region for stacking.",
    preview: (
      <div className="grid gap-2">
        <div className="lm-toast lm-toast-success">
          <span>✓</span>
          <div>
            <p className="lm-toast-title">Backup completed</p>
            <p className="lm-hint">128 GB encrypted snapshot uploaded.</p>
          </div>
        </div>
        <div className="lm-toast lm-toast-warning">
          <div>
            <p className="lm-toast-title">License renewing in 9 days</p>
          </div>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-toast", description: "Base toast card" },
      { name: "lm-toast-{tone}", description: "info | success | warning | danger" },
      { name: "lm-toast-title", description: "Bold title row" },
      { name: "lm-toaster", description: "Fixed bottom-right region for stacking toasts" }
    ],
    props: [
      { name: "tone", type: "Tone", default: "info" },
      { name: "duration", type: "number", default: "5000", description: "Auto-dismiss ms" }
    ],
    accessibility: [
      "Wrap in aria-live='polite' region.",
      "Provide a manual dismiss button — never auto-only.",
      "Pause auto-dismiss on hover/focus."
    ],
    htmlExample: `<div class="lm-toaster" aria-live="polite">
  <div class="lm-toast lm-toast-success">…</div>
</div>`
  },
  {
    slug: "banner",
    name: "Banner",
    category: "Feedback",
    status: "stable",
    description: "Full-width inline ribbon for system messages above main content.",
    preview: (
      <div className="lm-banner lm-banner-warning">
        <span>SSO certificate rotates in 7 days. Action required.</span>
        <button className="lm-btn lm-btn-warning lm-btn-sm">Rotate now</button>
      </div>
    ),
    classes: [
      { name: "lm-banner", description: "Base banner" },
      { name: "lm-banner-{tone}", description: "info | success | warning | danger" }
    ],
    props: [{ name: "tone", type: "Tone", default: "info" }],
    accessibility: ["Use role='status' or role='alert' depending on urgency."],
    htmlExample: `<div class="lm-banner lm-banner-warning" role="status">
  SSO certificate rotates in 7 days.
</div>`
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Feedback",
    status: "stable",
    description: "Native <progress> bar with gradient fill and 3 sizes.",
    preview: (
      <div className="grid gap-3">
        <progress className="lm-progress lm-progress-sm" value={32} max={100} />
        <progress className="lm-progress lm-progress-md" value={68} max={100} />
        <progress className="lm-progress lm-progress-lg" value={92} max={100} />
      </div>
    ),
    classes: [
      { name: "lm-progress", description: "Base track" },
      { name: "lm-progress-{size}", description: "sm | md | lg" }
    ],
    props: [
      { name: "value", type: "number", description: "Current progress 0–max" },
      { name: "max", type: "number", default: "100" }
    ],
    accessibility: ["Use native <progress>; provide aria-label for context."],
    htmlExample: `<progress class="lm-progress" value="68" max="100" aria-label="Upload"></progress>`
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Feedback",
    status: "stable",
    description: "Inline loading spinner with 3 sizes, derived from theme primary.",
    preview: (
      <div className="flex items-center gap-3">
        <span className="lm-spinner lm-spinner-sm" />
        <span className="lm-spinner lm-spinner-md" />
        <span className="lm-spinner lm-spinner-lg" />
      </div>
    ),
    classes: [
      { name: "lm-spinner", description: "Base spinner" },
      { name: "lm-spinner-{size}", description: "sm | md | lg" }
    ],
    props: [{ name: "size", type: "Size", default: "md" }],
    accessibility: ["Wrap in aria-live='polite' if standalone, or pair with aria-busy on container."],
    htmlExample: `<span class="lm-spinner" aria-hidden="true"></span><span class="sr-only">Loading…</span>`
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    status: "stable",
    description: "Shimmer placeholder for content-loading states. Block, text, and circle shapes.",
    preview: (
      <div className="grid gap-2">
        <div className="lm-skeleton h-6 w-2/3" />
        <div className="lm-skeleton lm-skeleton-text w-full" />
        <div className="lm-skeleton lm-skeleton-text w-5/6" />
        <div className="flex items-center gap-3 pt-2">
          <div className="lm-skeleton lm-skeleton-circle h-10 w-10" />
          <div className="grid flex-1 gap-2">
            <div className="lm-skeleton lm-skeleton-text w-1/3" />
            <div className="lm-skeleton lm-skeleton-text w-1/2" />
          </div>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-skeleton", description: "Base shimmer block" },
      { name: "lm-skeleton-text", description: "1em high, ideal for line text" },
      { name: "lm-skeleton-circle", description: "Round, for avatars" }
    ],
    props: [],
    accessibility: ["Mark loading regions with aria-busy='true' on a parent."],
    htmlExample: `<div class="lm-skeleton h-6 w-1/2"></div>`
  },
  // -- LAYOUT ----------------------------------------------------------
  {
    slug: "card",
    name: "Card",
    category: "Layout",
    status: "stable",
    description:
      "Universal content container. Header / body / footer slots, with raised, flat, glass, gradient, and interactive variants.",
    preview: (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="lm-card">
          <div className="lm-card-header">
            <h3 className="lm-card-title">Default</h3>
            <p className="lm-card-subtitle">Border + soft shadow.</p>
          </div>
          <div className="lm-card-body text-sm text-[var(--lm-color-muted)]">Body content.</div>
        </div>
        <div className="lm-card lm-card-glass">
          <div className="lm-card-header">
            <h3 className="lm-card-title">Glass</h3>
            <p className="lm-card-subtitle">Backdrop saturation + blur.</p>
          </div>
          <div className="lm-card-body text-sm text-[var(--lm-color-muted)]">Body content.</div>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-card", description: "Base container" },
      { name: "lm-card-raised", description: "Larger elevated shadow" },
      { name: "lm-card-flat", description: "No shadow" },
      { name: "lm-card-glass", description: "Backdrop blur surface" },
      { name: "lm-card-gradient", description: "Soft primary→surface gradient" },
      { name: "lm-card-interactive", description: "Hover lift + primary border" },
      { name: "lm-card-header / -body / -footer", description: "Padded slot regions" },
      { name: "lm-card-title / -subtitle", description: "Typography helpers" }
    ],
    props: [
      { name: "variant", type: "default | raised | flat | glass | gradient" },
      { name: "interactive", type: "boolean" }
    ],
    accessibility: [
      "Use semantic <article> when card is self-contained content.",
      "Interactive cards must wrap an <a> or <button> for the focusable target."
    ],
    htmlExample: `<article class="lm-card">
  <header class="lm-card-header">
    <h3 class="lm-card-title">Account</h3>
    <p class="lm-card-subtitle">Plan + billing</p>
  </header>
  <div class="lm-card-body">…</div>
  <footer class="lm-card-footer">…</footer>
</article>`
  },
  {
    slug: "app-shell",
    name: "App shell",
    category: "Layout",
    status: "stable",
    description: "Full-page application layout: sidebar + main content with sticky navbar.",
    preview: (
      <div className="lm-app-shell rounded-lg border border-[var(--lm-color-border)]">
        <div className="lm-app-shell-sidebar">
          <aside className="lm-sidebar">
            <span className="lm-sidebar-section">Workspace</span>
            <a className="lm-sidebar-item" href="#" aria-current="page">
              Dashboard
            </a>
            <a className="lm-sidebar-item" href="#">
              Accounts
            </a>
          </aside>
          <main className="lm-app-main">
            <div className="lm-page-header">
              <div>
                <h1 className="lm-page-title">Dashboard</h1>
                <p className="lm-page-description">Active accounts, billing, and workflows.</p>
              </div>
              <button className="lm-btn lm-btn-primary lm-btn-sm">Export</button>
            </div>
          </main>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-app-shell", description: "Top-level grid container" },
      { name: "lm-app-shell-sidebar", description: "Two-column variant" },
      { name: "lm-app-main", description: "Inner content region" },
      { name: "lm-page-header", description: "Title + actions row" },
      { name: "lm-page-title / -description", description: "Page heading typography" }
    ],
    props: [],
    accessibility: ["Use semantic <main>, <nav>, <header> landmarks."],
    htmlExample: `<div class="lm-app-shell lm-app-shell-sidebar">
  <nav class="lm-sidebar">…</nav>
  <main class="lm-app-main">…</main>
</div>`
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Layout",
    status: "new",
    description: "Visual separator with optional label, horizontal or vertical.",
    preview: (
      <div className="grid gap-3">
        <div>Section A</div>
        <div className="lm-divider">or</div>
        <div>Section B</div>
        <div className="flex items-center gap-3 pt-3">
          Item
          <span className="lm-divider-vertical" />
          Item
          <span className="lm-divider-vertical" />
          Item
        </div>
      </div>
    ),
    classes: [
      { name: "lm-divider", description: "Horizontal line with optional centered text" },
      { name: "lm-divider-vertical", description: "1px vertical separator" }
    ],
    props: [{ name: "orientation", type: "horizontal | vertical", default: "horizontal" }],
    accessibility: ["Use role='separator' if used purely for layout."],
    htmlExample: `<div class="lm-divider">or</div>
<span class="lm-divider-vertical" role="separator"></span>`
  },
  // -- FORM ------------------------------------------------------------
  {
    slug: "input",
    name: "Input",
    category: "Form",
    status: "stable",
    description:
      "Text input with hover, focus, invalid, and 3 sizes. Combine with .lm-input-group for prefix/suffix addons.",
    preview: (
      <div className="grid gap-3">
        <input className="lm-input" placeholder="Default input" />
        <div className="lm-input-group">
          <span className="lm-input-addon">@</span>
          <input className="lm-input" placeholder="email" />
          <span className="lm-input-addon">.com</span>
        </div>
        <input className="lm-input" aria-invalid="true" placeholder="Invalid input" />
      </div>
    ),
    classes: [
      { name: "lm-input", description: "Base input" },
      { name: "lm-input-{size}", description: "sm | md | lg" },
      { name: "lm-input-group", description: "Joined input + addons wrapper" },
      { name: "lm-input-addon", description: "Prefix or suffix slot" },
      { name: "lm-input-{state}", description: "success | warning | danger" }
    ],
    props: [
      { name: "size", type: "Size", default: "md" },
      { name: "state", type: "default | success | warning | danger" },
      { name: "addonStart / addonEnd", type: "ReactNode" }
    ],
    accessibility: a11yForm,
    htmlExample: `<label class="lm-field">
  <span class="lm-label lm-required">Company email</span>
  <div class="lm-input-group">
    <span class="lm-input-addon">@</span>
    <input class="lm-input" type="email" required />
  </div>
</label>`
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Form",
    status: "stable",
    description: "Multi-line text input with vertical resize and the same focus contract as Input.",
    preview: (
      <textarea className="lm-textarea" placeholder="Type a note…" defaultValue="" rows={3} />
    ),
    classes: [{ name: "lm-textarea", description: "Multi-line input" }],
    props: [
      { name: "rows", type: "number", default: "3" },
      { name: "resize", type: "vertical | none", default: "vertical" }
    ],
    accessibility: a11yForm,
    htmlExample: `<textarea class="lm-textarea" rows="4"></textarea>`
  },
  {
    slug: "select",
    name: "Select",
    category: "Form",
    status: "stable",
    description: "Native <select> with custom chevron, sized to match Input.",
    preview: (
      <select className="lm-select" defaultValue="annual">
        <option value="annual">Annual</option>
        <option value="quarterly">Quarterly</option>
        <option value="monthly">Monthly</option>
      </select>
    ),
    classes: [
      { name: "lm-select", description: "Native <select> styling" },
      { name: "lm-select-{size}", description: "sm | md | lg" }
    ],
    props: [{ name: "size", type: "Size", default: "md" }],
    accessibility: a11yForm,
    htmlExample: `<select class="lm-select"><option>Annual</option></select>`
  },
  {
    slug: "checkbox",
    name: "Checkbox & Radio",
    category: "Form",
    status: "stable",
    description: "Native checkbox/radio with theme accent color and 3 sizes.",
    preview: (
      <div className="grid gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input className="lm-checkbox" type="checkbox" defaultChecked /> Subscribe
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input className="lm-radio" type="radio" name="plan" defaultChecked /> Annual
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input className="lm-radio" type="radio" name="plan" /> Quarterly
        </label>
      </div>
    ),
    classes: [
      { name: "lm-checkbox", description: "Native checkbox" },
      { name: "lm-radio", description: "Native radio" },
      { name: "lm-{control}-{size}", description: "sm | md | lg" }
    ],
    props: [{ name: "size", type: "Size", default: "md" }],
    accessibility: a11yForm,
    htmlExample: `<input class="lm-checkbox" type="checkbox" id="terms" />
<label for="terms">I agree</label>`
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Form",
    status: "stable",
    description: "Native checkbox styled as iOS-style switch with gradient when checked.",
    preview: (
      <div className="flex items-center gap-3 text-sm">
        <input className="lm-switch lm-switch-sm" type="checkbox" />
        <input className="lm-switch" type="checkbox" defaultChecked />
        <input className="lm-switch lm-switch-lg" type="checkbox" />
      </div>
    ),
    classes: [
      { name: "lm-switch", description: "Native checkbox styled as switch" },
      { name: "lm-switch-{size}", description: "sm | md | lg" }
    ],
    props: [{ name: "size", type: "Size", default: "md" }],
    accessibility: a11yForm,
    htmlExample: `<input class="lm-switch" type="checkbox" aria-label="Enable SSO" />`
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Form",
    status: "new",
    description: "Native range input with cross-browser styled track and thumb. Glow on focus.",
    preview: (
      <div className="grid gap-3">
        <input className="lm-slider" type="range" defaultValue="32" />
        <input className="lm-slider" type="range" defaultValue="64" />
        <input className="lm-slider" type="range" defaultValue="86" />
      </div>
    ),
    classes: [{ name: "lm-slider", description: "Native range input" }],
    props: [
      { name: "min", type: "number" },
      { name: "max", type: "number" },
      { name: "step", type: "number" },
      { name: "value", type: "number" }
    ],
    accessibility: ["Provide aria-label or visible <label>; aria-valuetext for non-numeric values."],
    htmlExample: `<input class="lm-slider" type="range" min="0" max="100" value="50" aria-label="Volume" />`
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Form",
    status: "new",
    description: "Star rating control with hover scale and aria-checked semantics.",
    preview: (
      <div className="lm-rating" role="radiogroup" aria-label="Rating">
        <button className="lm-rating-star" aria-checked="true" role="radio">
          ★
        </button>
        <button className="lm-rating-star" aria-checked="true" role="radio">
          ★
        </button>
        <button className="lm-rating-star" aria-checked="true" role="radio">
          ★
        </button>
        <button className="lm-rating-star" aria-checked="true" role="radio">
          ★
        </button>
        <button className="lm-rating-star" aria-checked="false" role="radio">
          ★
        </button>
      </div>
    ),
    classes: [
      { name: "lm-rating", description: "Inline-flex container" },
      { name: "lm-rating-star", description: "Each star button; aria-checked='true' = filled" }
    ],
    props: [
      { name: "value", type: "number", description: "Filled stars 0–max" },
      { name: "max", type: "number", default: "5" }
    ],
    accessibility: ["Use role='radiogroup' + role='radio' on stars; arrow-key navigation."],
    htmlExample: `<div class="lm-rating" role="radiogroup">
  <button class="lm-rating-star" aria-checked="true">★</button>
  <button class="lm-rating-star" aria-checked="false">★</button>
</div>`
  },
  {
    slug: "otp",
    name: "OTP / PIN",
    category: "Form",
    status: "new",
    description: "Slot-based code entry for 2FA and PINs. Per-slot focus + filled state.",
    preview: (
      <div className="lm-otp">
        <input className="lm-otp-slot" defaultValue="9" maxLength={1} />
        <input className="lm-otp-slot" defaultValue="2" data-state="filled" maxLength={1} />
        <input className="lm-otp-slot" defaultValue="4" data-state="filled" maxLength={1} />
        <span className="lm-otp-separator">—</span>
        <input className="lm-otp-slot" maxLength={1} />
        <input className="lm-otp-slot" maxLength={1} />
        <input className="lm-otp-slot" maxLength={1} />
      </div>
    ),
    classes: [
      { name: "lm-otp", description: "Inline-flex slot wrapper" },
      { name: "lm-otp-slot", description: "Single character input" },
      { name: "lm-otp-separator", description: "Visual divider between groups" }
    ],
    props: [
      { name: "length", type: "number", default: "6" },
      { name: "groups", type: "number[]", description: "e.g. [3, 3] renders two groups separated" }
    ],
    accessibility: [
      "Each slot needs aria-label='Digit n of m'.",
      "Forward focus on input, backward on Backspace from empty slot."
    ],
    htmlExample: `<div class="lm-otp">
  <input class="lm-otp-slot" maxlength="1" aria-label="Digit 1 of 6" />
  <!-- … -->
</div>`
  },
  {
    slug: "number-input",
    name: "Number input",
    category: "Form",
    status: "new",
    description: "Increment/decrement stepper with editable center field.",
    preview: (
      <div className="lm-number-input">
        <button type="button" aria-label="Decrement">
          −
        </button>
        <input defaultValue="42" />
        <button type="button" aria-label="Increment">
          +
        </button>
      </div>
    ),
    classes: [{ name: "lm-number-input", description: "Wrapper with steppers + input" }],
    props: [
      { name: "value", type: "number" },
      { name: "min / max / step", type: "number" }
    ],
    accessibility: [
      "Stepper buttons need aria-label.",
      "Use <input type='number'> with inputmode='numeric'."
    ],
    htmlExample: `<div class="lm-number-input">
  <button type="button" aria-label="Decrement">−</button>
  <input type="number" value="42" />
  <button type="button" aria-label="Increment">+</button>
</div>`
  },
  {
    slug: "tag-input",
    name: "Tag input",
    category: "Form",
    status: "new",
    description: "Multi-tag entry field. Add chips on Enter or comma; remove with Backspace.",
    preview: (
      <div className="lm-tag-input">
        <span className="lm-tag lm-tag-removable">
          enterprise
          <button className="lm-tag-remove" aria-label="Remove">
            ×
          </button>
        </span>
        <span className="lm-tag lm-tag-removable">
          annual
          <button className="lm-tag-remove" aria-label="Remove">
            ×
          </button>
        </span>
        <input placeholder="Add tag…" />
      </div>
    ),
    classes: [{ name: "lm-tag-input", description: "Wrapper that hosts tags + an inline input" }],
    props: [
      { name: "value", type: "string[]" },
      { name: "onValueChange", type: "(values: string[]) => void" }
    ],
    accessibility: [
      "Combobox semantics: aria-expanded, aria-activedescendant.",
      "Backspace from empty input removes the previous tag."
    ],
    htmlExample: `<div class="lm-tag-input">
  <span class="lm-tag lm-tag-removable">enterprise<button class="lm-tag-remove">×</button></span>
  <input placeholder="Add tag…" />
</div>`
  },
  {
    slug: "dropzone",
    name: "Dropzone",
    category: "Form",
    status: "new",
    description: "Drag-and-drop file target with hover and active states.",
    preview: (
      <div className="lm-dropzone">
        <strong className="lm-dropzone-title">Drop files here</strong>
        <span className="lm-hint">PDF, PNG, JPG up to 10 MB</span>
        <button className="lm-btn lm-btn-outline lm-btn-sm">Browse</button>
      </div>
    ),
    classes: [
      { name: "lm-dropzone", description: "Dashed bordered drop region" },
      { name: "lm-dropzone-title", description: "Bold title" }
    ],
    props: [
      { name: "accept", type: "string", description: "MIME types e.g. 'image/*'" },
      { name: "maxSize", type: "number", description: "Bytes" },
      { name: "multiple", type: "boolean" }
    ],
    accessibility: [
      "Pair with a hidden <input type='file'> for keyboard fallback.",
      "Announce upload progress via aria-live."
    ],
    htmlExample: `<label class="lm-dropzone">
  <strong class="lm-dropzone-title">Drop files</strong>
  <input type="file" class="sr-only" />
</label>`
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Form",
    status: "new",
    description: "Typeahead with floating listbox. Supports option metadata column.",
    preview: (
      <div className="lm-combobox">
        <input className="lm-input" defaultValue="atl" placeholder="Find a workspace…" />
        <ul className="lm-combobox-listbox">
          <li className="lm-combobox-option" aria-selected="true">
            <span>Atlas Finance</span>
            <span className="lm-combobox-option-meta">Production</span>
          </li>
          <li className="lm-combobox-option">
            <span>Atlas Health</span>
            <span className="lm-combobox-option-meta">Sandbox</span>
          </li>
        </ul>
      </div>
    ),
    classes: [
      { name: "lm-combobox", description: "Position-relative wrapper" },
      { name: "lm-combobox-listbox", description: "Floating options list" },
      { name: "lm-combobox-option", description: "Each option" },
      { name: "lm-combobox-option-meta", description: "Right-aligned meta text" }
    ],
    props: [
      { name: "options", type: "Option[]" },
      { name: "value", type: "string" },
      { name: "onValueChange", type: "(value: string) => void" }
    ],
    accessibility: [
      "role='combobox' on input, aria-controls=listbox-id, aria-expanded.",
      "role='listbox' + role='option' with aria-selected.",
      "Up/Down arrow + Enter + Escape keyboard."
    ],
    htmlExample: `<div class="lm-combobox">
  <input class="lm-input" role="combobox" aria-controls="lb" aria-expanded="true" />
  <ul class="lm-combobox-listbox" role="listbox" id="lb">
    <li class="lm-combobox-option" role="option" aria-selected="true">…</li>
  </ul>
</div>`
  },
  {
    slug: "calendar",
    name: "Calendar",
    category: "Form",
    status: "new",
    description: "Month-view date grid with selected, today, range, and outside-month states.",
    preview: (
      <div className="lm-calendar">
        <div className="lm-calendar-header">
          <button className="lm-btn lm-btn-ghost lm-btn-sm" aria-label="Previous month">
            ‹
          </button>
          <span>April 2026</span>
          <button className="lm-btn lm-btn-ghost lm-btn-sm" aria-label="Next month">
            ›
          </button>
        </div>
        <div className="lm-calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} className="lm-calendar-weekday">
              {d}
            </span>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              className="lm-calendar-day"
              aria-selected={d === 18 ? "true" : undefined}
              data-today={d === 22 ? "true" : undefined}
              data-range={
                d >= 18 && d <= 24
                  ? d === 18
                    ? "start"
                    : d === 24
                    ? "end"
                    : "middle"
                  : undefined
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    ),
    classes: [
      { name: "lm-calendar", description: "Wrapper card" },
      { name: "lm-calendar-header", description: "Month nav row" },
      { name: "lm-calendar-grid", description: "7-column day grid" },
      { name: "lm-calendar-day", description: "Day button; data-today, data-outside, data-range" }
    ],
    props: [
      { name: "value", type: "Date | DateRange" },
      { name: "mode", type: "single | range | multiple", default: "single" }
    ],
    accessibility: [
      "Use role='grid' with role='gridcell' on days.",
      "Arrow keys move focus; Page Up/Down for months."
    ],
    htmlExample: `<div class="lm-calendar" role="grid">…</div>`
  },
  {
    slug: "datepicker",
    name: "Date picker",
    category: "Form",
    status: "new",
    description: "Trigger button + popover containing a calendar.",
    preview: (
      <div className="lm-datepicker">
        <button className="lm-datepicker-trigger" aria-haspopup="dialog">
          <span>Apr 18 — Apr 24, 2026</span>
          <span aria-hidden="true">▾</span>
        </button>
      </div>
    ),
    classes: [
      { name: "lm-datepicker", description: "Position-relative wrapper" },
      { name: "lm-datepicker-trigger", description: "Input-like button" },
      { name: "lm-datepicker-panel", description: "Floating calendar panel" }
    ],
    props: [
      { name: "value", type: "Date | DateRange" },
      { name: "mode", type: "single | range" }
    ],
    accessibility: ["Trigger uses aria-haspopup='dialog' + aria-expanded."],
    htmlExample: `<button class="lm-datepicker-trigger">Apr 18 — Apr 24</button>`
  },
  // -- NAVIGATION ------------------------------------------------------
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    status: "stable",
    description: "Tab list with underline + pills variants, 3 sizes, and disabled support.",
    preview: (
      <div className="lm-tabs" role="tablist">
        <button className="lm-tab" role="tab" aria-selected="true">
          Overview
        </button>
        <button className="lm-tab" role="tab">
          Activity
        </button>
        <button className="lm-tab" role="tab">
          Settings
        </button>
        <button className="lm-tab" role="tab" aria-disabled="true">
          Billing
        </button>
      </div>
    ),
    variants: [
      {
        label: "Pills",
        preview: (
          <div className="lm-tabs lm-tabs-pills">
            <button className="lm-tab" aria-selected="true">
              Daily
            </button>
            <button className="lm-tab">Weekly</button>
            <button className="lm-tab">Monthly</button>
          </div>
        )
      }
    ],
    classes: [
      { name: "lm-tabs", description: "Tab list container" },
      { name: "lm-tabs-pills", description: "Rounded segmented variant" },
      { name: "lm-tab", description: "Each tab button" },
      { name: "lm-tab-{size}", description: "sm | md | lg" }
    ],
    props: [
      { name: "value", type: "string", description: "Active tab id" },
      { name: "size", type: "Size", default: "md" }
    ],
    accessibility: [
      "Use role='tablist' / 'tab' / 'tabpanel'.",
      "Roving tabindex; Home / End / Arrow keys.",
      "aria-controls links tabs to their panels."
    ],
    htmlExample: `<div class="lm-tabs" role="tablist">
  <button class="lm-tab" role="tab" aria-selected="true">Overview</button>
  <button class="lm-tab" role="tab">Activity</button>
</div>`
  },
  {
    slug: "segmented",
    name: "Segmented",
    category: "Navigation",
    status: "new",
    description: "iOS-style segmented control. Single-select with shadowed active item.",
    preview: (
      <div className="lm-segmented">
        <button className="lm-segmented-item">24h</button>
        <button className="lm-segmented-item" aria-pressed="true">
          7 days
        </button>
        <button className="lm-segmented-item">30 days</button>
        <button className="lm-segmented-item">Quarter</button>
      </div>
    ),
    classes: [
      { name: "lm-segmented", description: "Sunken background container" },
      { name: "lm-segmented-item", description: "Each option; aria-pressed='true' = active" }
    ],
    props: [{ name: "value", type: "string" }],
    accessibility: ["Use role='radiogroup' + role='radio' on items."],
    htmlExample: `<div class="lm-segmented" role="radiogroup">
  <button class="lm-segmented-item" aria-pressed="true">7 days</button>
</div>`
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    status: "new",
    description:
      "Numbered wizard with auto-counter, complete (✓) state, current state, and connecting lines.",
    preview: (
      <ol className="lm-stepper">
        <li className="lm-step lm-step-complete">
          <span className="lm-step-marker" />
          Connect identity
        </li>
        <li className="lm-step" aria-current="step">
          <span className="lm-step-marker" />
          Map roles
        </li>
        <li className="lm-step">
          <span className="lm-step-marker" />
          Invite admins
        </li>
        <li className="lm-step">
          <span className="lm-step-marker" />
          Review
        </li>
      </ol>
    ),
    classes: [
      { name: "lm-stepper", description: "Ordered list with auto counter-reset" },
      { name: "lm-step", description: "Each step; aria-current='step' = active" },
      { name: "lm-step-complete", description: "Renders ✓ instead of number" },
      { name: "lm-step-marker", description: "Numbered/checked circle" }
    ],
    props: [
      { name: "current", type: "number", description: "Active step index" },
      { name: "orientation", type: "horizontal | vertical" }
    ],
    accessibility: ["Use aria-current='step' on the active step.", "Pair with aria-label='Progress'."],
    htmlExample: `<ol class="lm-stepper" aria-label="Onboarding">
  <li class="lm-step lm-step-complete"><span class="lm-step-marker"></span>Connect</li>
  <li class="lm-step" aria-current="step"><span class="lm-step-marker"></span>Map roles</li>
</ol>`
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Navigation",
    status: "stable",
    description: "Hierarchical trail with hover and aria-current support.",
    preview: (
      <nav className="lm-breadcrumbs" aria-label="Breadcrumb">
        <a href="#">Workspace</a>
        <span>/</span>
        <a href="#">Accounts</a>
        <span>/</span>
        <span aria-current="page">Atlas Finance</span>
      </nav>
    ),
    classes: [{ name: "lm-breadcrumbs", description: "Inline-flex trail" }],
    props: [],
    accessibility: ["Use <nav aria-label='Breadcrumb'>.", "Last item: aria-current='page'."],
    htmlExample: `<nav class="lm-breadcrumbs" aria-label="Breadcrumb">
  <a href="/">Workspace</a> /
  <span aria-current="page">Atlas</span>
</nav>`
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    status: "stable",
    description: "Page selector with active, disabled, and 3 sizes.",
    preview: (
      <nav className="lm-pagination" aria-label="Pagination">
        <a className="lm-pagination-item" aria-disabled="true">
          ‹
        </a>
        <a className="lm-pagination-item" href="#">
          1
        </a>
        <a className="lm-pagination-item" href="#" aria-current="page">
          2
        </a>
        <a className="lm-pagination-item" href="#">
          3
        </a>
        <a className="lm-pagination-item" href="#">
          4
        </a>
        <a className="lm-pagination-item" href="#">
          ›
        </a>
      </nav>
    ),
    classes: [
      { name: "lm-pagination", description: "Inline-flex container" },
      { name: "lm-pagination-item", description: "Each page link/button" },
      { name: "lm-pagination-{size}", description: "sm | md | lg" }
    ],
    props: [
      { name: "page", type: "number" },
      { name: "total", type: "number" },
      { name: "size", type: "Size" }
    ],
    accessibility: ["Use <nav aria-label='Pagination'>.", "Active page: aria-current='page'."],
    htmlExample: `<nav class="lm-pagination">
  <a class="lm-pagination-item" aria-current="page">2</a>
</nav>`
  },
  {
    slug: "navbar",
    name: "Navbar",
    category: "Navigation",
    status: "stable",
    description: "Top app bar with backdrop blur, sticky position, and brand slot.",
    preview: (
      <div className="lm-navbar rounded-lg border border-[var(--lm-color-border)]">
        <div className="lm-navbar-brand">
          <span className="lm-avatar lm-avatar-sm">L</span>
          Lumora
        </div>
        <button className="lm-btn lm-btn-ghost lm-btn-sm">Components</button>
        <button className="lm-btn lm-btn-ghost lm-btn-sm">Patterns</button>
        <span className="ml-auto" />
        <button className="lm-btn lm-btn-primary lm-btn-sm">Sign in</button>
      </div>
    ),
    classes: [
      { name: "lm-navbar", description: "Sticky top bar" },
      { name: "lm-navbar-brand", description: "Logo + name slot" }
    ],
    props: [],
    accessibility: ["Wrap in <header> with role='banner'."],
    htmlExample: `<header class="lm-navbar">
  <a class="lm-navbar-brand" href="/">Lumora</a>
</header>`
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    status: "stable",
    description: "App-shell side navigation with sections, active state, and compact variant.",
    preview: (
      <aside
        className="lm-sidebar rounded-lg"
        style={{ width: "100%", maxWidth: "16rem" }}
      >
        <span className="lm-sidebar-section">Workspace</span>
        <a className="lm-sidebar-item" href="#" aria-current="page">
          Dashboard
        </a>
        <a className="lm-sidebar-item" href="#">
          Accounts
        </a>
        <a className="lm-sidebar-item" href="#">
          Billing
        </a>
        <span className="lm-sidebar-section">System</span>
        <a className="lm-sidebar-item" href="#">
          Audit
        </a>
        <a className="lm-sidebar-item" href="#">
          Settings
        </a>
      </aside>
    ),
    classes: [
      { name: "lm-sidebar", description: "Vertical nav" },
      { name: "lm-sidebar-section", description: "Uppercase section header" },
      { name: "lm-sidebar-item", description: "Each link/button" },
      { name: "lm-sidebar-compact", description: "Narrow icon-only variant" }
    ],
    props: [{ name: "compact", type: "boolean" }],
    accessibility: ["Wrap in <nav aria-label='Primary'>.", "Active link: aria-current='page'."],
    htmlExample: `<nav class="lm-sidebar" aria-label="Primary">
  <a class="lm-sidebar-item" aria-current="page">Dashboard</a>
</nav>`
  },
  // -- OVERLAY ---------------------------------------------------------
  {
    slug: "modal",
    name: "Modal",
    category: "Overlay",
    status: "stable",
    description: "Blocking dialog with backdrop blur, spring scale-in animation, 4 sizes.",
    preview: (
      <div
        className="lm-card overflow-hidden"
        style={{ background: "var(--lm-color-overlay)", padding: "2rem" }}
      >
        <section className="lm-modal-panel lm-modal-panel-md mx-auto" role="dialog" aria-modal="true">
          <header className="lm-modal-header">
            <h2 className="lm-modal-title">Confirm deletion</h2>
          </header>
          <div className="lm-modal-body">
            Atlas Finance will be permanently deleted. This cannot be undone.
          </div>
          <footer className="lm-modal-footer">
            <button className="lm-btn lm-btn-ghost">Cancel</button>
            <button className="lm-btn lm-btn-danger">Delete</button>
          </footer>
        </section>
      </div>
    ),
    classes: [
      { name: "lm-modal", description: "Backdrop + grid container" },
      { name: "lm-modal-panel", description: "Centered card" },
      { name: "lm-modal-{size}", description: "sm | md | lg | xl" },
      { name: "lm-modal-header / -body / -footer", description: "Slots" },
      { name: "lm-modal-title", description: "Heading typography" }
    ],
    props: [
      { name: "open", type: "boolean" },
      { name: "size", type: "sm | md | lg | xl" },
      { name: "onOpenChange", type: "(open: boolean) => void" }
    ],
    accessibility: a11yOverlay,
    htmlExample: `<div class="lm-modal" role="dialog" aria-modal="true" aria-labelledby="title">
  <section class="lm-modal-panel">
    <header class="lm-modal-header"><h2 id="title">Confirm</h2></header>
    <div class="lm-modal-body">…</div>
  </section>
</div>`
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlay",
    status: "stable",
    description: "Side-anchored panel with slide-in animation. Left or right, 3 sizes.",
    preview: (
      <div
        className="lm-card overflow-hidden"
        style={{
          background: "var(--lm-color-overlay)",
          minHeight: "12rem",
          padding: "0",
          position: "relative"
        }}
      >
        <aside
          className="lm-drawer lm-drawer-md"
          style={{ position: "static", height: "auto", boxShadow: "none" }}
        >
          <header className="grid gap-1">
            <h3 className="lm-card-title">Filters</h3>
            <p className="lm-hint">Refine the account list.</p>
          </header>
        </aside>
      </div>
    ),
    classes: [
      { name: "lm-drawer", description: "Side panel (right by default)" },
      { name: "lm-drawer-left", description: "Anchor to left edge" },
      { name: "lm-drawer-{size}", description: "sm | md | lg" }
    ],
    props: [
      { name: "side", type: "left | right" },
      { name: "size", type: "sm | md | lg" }
    ],
    accessibility: a11yOverlay,
    htmlExample: `<aside class="lm-drawer lm-drawer-md" role="dialog" aria-modal="true">…</aside>`
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    status: "stable",
    description: "Brief hover label with rotated arrow on every side.",
    preview: (
      <div className="flex flex-wrap gap-3 py-12 text-sm">
        <span className="lm-tooltip">
          <button className="lm-btn lm-btn-outline">Hover me</button>
          <span className="lm-tooltip-content" data-side="top">
            Top tooltip
          </span>
        </span>
        <span className="lm-tooltip">
          <button className="lm-btn lm-btn-outline">Right</button>
          <span className="lm-tooltip-content" data-side="right">
            Right tooltip
          </span>
        </span>
      </div>
    ),
    classes: [
      { name: "lm-tooltip", description: "Inline-flex anchor" },
      { name: "lm-tooltip-content", description: "Floating content (data-side='top|right|bottom|left')" }
    ],
    props: [
      { name: "side", type: "top | right | bottom | left", default: "top" },
      { name: "delay", type: "number", default: "300" }
    ],
    accessibility: [
      "Use aria-describedby to link tooltip id.",
      "Show on hover AND focus; dismiss on Escape."
    ],
    htmlExample: `<span class="lm-tooltip">
  <button aria-describedby="tip-1">?</button>
  <span class="lm-tooltip-content" id="tip-1">Help text</span>
</span>`
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlay",
    status: "new",
    description: "Rich floating panel with arrow. For settings, inline help, or quick forms.",
    preview: (
      <div className="flex flex-wrap gap-3 py-8 text-sm">
        <span className="lm-popover">
          <button className="lm-btn lm-btn-outline">Open popover</button>
          <div className="lm-popover-content">
            <div className="lm-popover-arrow" />
            <p className="text-sm">Quick settings panel can live here.</p>
          </div>
        </span>
      </div>
    ),
    classes: [
      { name: "lm-popover", description: "Anchor wrapper" },
      { name: "lm-popover-content", description: "Floating card" },
      { name: "lm-popover-arrow", description: "Pointer arrow" }
    ],
    props: [
      { name: "side", type: "top | right | bottom | left" },
      { name: "align", type: "start | center | end" }
    ],
    accessibility: a11yOverlay,
    htmlExample: `<span class="lm-popover">
  <button aria-haspopup="dialog">Open</button>
  <div class="lm-popover-content"><div class="lm-popover-arrow"></div>…</div>
</span>`
  },
  {
    slug: "hover-card",
    name: "Hover card",
    category: "Overlay",
    status: "new",
    description: "Rich preview on hover — perfect for user mentions and link previews.",
    preview: (
      <span className="lm-hover-card">
        <a href="#" className="text-[var(--lm-color-primary)] underline">
          @maya-k
        </a>
        <div className="lm-hover-card-content">
          <div className="flex items-center gap-3">
            <span className="lm-avatar lm-avatar-md">MK</span>
            <div>
              <strong>Maya Krishnan</strong>
              <p className="lm-hint">Engineering · Site Reliability</p>
            </div>
          </div>
        </div>
      </span>
    ),
    classes: [
      { name: "lm-hover-card", description: "Anchor wrapper" },
      { name: "lm-hover-card-content", description: "Preview panel" }
    ],
    props: [
      { name: "openDelay", type: "number", default: "700" },
      { name: "closeDelay", type: "number", default: "300" }
    ],
    accessibility: [
      "Show on hover AND focus.",
      "Don't make critical info hover-only — provide a click path."
    ],
    htmlExample: `<span class="lm-hover-card">
  <a href="/users/maya">@maya</a>
  <div class="lm-hover-card-content">…</div>
</span>`
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    category: "Overlay",
    status: "stable",
    description: "Action menu with labels, separators, items, shortcuts, and pop animation.",
    preview: (
      <div className="lm-dropdown">
        <button className="lm-btn lm-btn-outline" aria-expanded="true">
          Actions ↓
        </button>
        <div
          className="lm-dropdown-menu"
          style={{ position: "static", animation: "none", marginTop: "0.5rem" }}
        >
          <span className="lm-dropdown-label">Account</span>
          <button className="lm-dropdown-item">
            Edit profile <span className="lm-dropdown-shortcut">⌘E</span>
          </button>
          <button className="lm-dropdown-item">
            View activity <span className="lm-dropdown-shortcut">⌘L</span>
          </button>
          <span className="lm-dropdown-separator" />
          <span className="lm-dropdown-label">Danger</span>
          <button className="lm-dropdown-item">Delete account</button>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-dropdown", description: "Position-relative anchor" },
      { name: "lm-dropdown-menu", description: "Floating menu" },
      { name: "lm-dropdown-item", description: "Each menu item" },
      { name: "lm-dropdown-label", description: "Section header" },
      { name: "lm-dropdown-separator", description: "1px divider" },
      { name: "lm-dropdown-shortcut", description: "Right-aligned key hint" }
    ],
    props: [
      { name: "side", type: "top | right | bottom | left" },
      { name: "align", type: "start | center | end" }
    ],
    accessibility: [
      "role='menu' + role='menuitem'.",
      "Trigger: aria-haspopup='menu' + aria-expanded.",
      "Arrow keys navigate; Escape closes."
    ],
    htmlExample: `<div class="lm-dropdown">
  <button aria-haspopup="menu" aria-expanded="true">Actions</button>
  <div class="lm-dropdown-menu" role="menu">…</div>
</div>`
  },
  {
    slug: "context-menu",
    name: "Context menu",
    category: "Overlay",
    status: "new",
    description: "Right-click contextual menu. Same item DSL as dropdown plus a danger variant.",
    preview: (
      <div
        className="lm-context-menu"
        style={{ position: "static", animation: "none", maxWidth: "16rem" }}
      >
        <button className="lm-context-menu-item">
          Cut <span className="lm-context-menu-shortcut">⌘X</span>
        </button>
        <button className="lm-context-menu-item">
          Copy <span className="lm-context-menu-shortcut">⌘C</span>
        </button>
        <button className="lm-context-menu-item">
          Paste <span className="lm-context-menu-shortcut">⌘V</span>
        </button>
        <button className="lm-context-menu-item lm-context-menu-item-danger">Delete</button>
      </div>
    ),
    classes: [
      { name: "lm-context-menu", description: "Fixed-positioned menu" },
      { name: "lm-context-menu-item", description: "Each item" },
      { name: "lm-context-menu-item-danger", description: "Red hover" },
      { name: "lm-context-menu-shortcut", description: "Right-aligned key" }
    ],
    props: [{ name: "anchor", type: "{x: number; y: number}" }],
    accessibility: ["Open on contextmenu OR Shift+F10.", "Same role/aria as dropdown."],
    htmlExample: `<div class="lm-context-menu" role="menu" style="top: 100px; left: 200px">…</div>`
  },
  {
    slug: "command",
    name: "Command palette",
    category: "Overlay",
    status: "new",
    description: "⌘K finder with input, grouped list, footer with keyboard hints, and animated selection.",
    preview: (
      <div className="lm-command" style={{ maxWidth: "100%" }}>
        <input
          className="lm-command-input"
          placeholder="Search workspaces, settings, docs…"
          defaultValue=""
        />
        <ul className="lm-command-list">
          <li className="lm-command-group-label">Suggested</li>
          <li className="lm-command-item" aria-selected="true">
            <span>Open billing dashboard</span>
            <span className="lm-kbd">↵</span>
          </li>
          <li className="lm-command-item">
            <span>Invite teammates</span>
            <span className="lm-kbd">I</span>
          </li>
          <li className="lm-command-item">
            <span>Switch theme</span>
            <span className="lm-kbd">T</span>
          </li>
        </ul>
        <div className="lm-command-footer">
          <span>
            <span className="lm-kbd">↑</span> <span className="lm-kbd">↓</span> navigate
          </span>
          <span>
            <span className="lm-kbd">esc</span> close
          </span>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-command", description: "Outer card" },
      { name: "lm-command-input", description: "Search input" },
      { name: "lm-command-list", description: "Scrollable result list" },
      { name: "lm-command-item", description: "Each row" },
      { name: "lm-command-group-label", description: "Section header" },
      { name: "lm-command-empty", description: "No-results state" },
      { name: "lm-command-footer", description: "Keyboard hint footer" }
    ],
    props: [
      { name: "open", type: "boolean" },
      { name: "shortcut", type: "string", default: "cmd+k" }
    ],
    accessibility: [
      "role='combobox' on input + role='listbox'/'option' on results.",
      "Up/Down move selection; Enter activates; Escape closes."
    ],
    htmlExample: `<div class="lm-command" role="dialog" aria-label="Command palette">
  <input class="lm-command-input" />
  <ul class="lm-command-list" role="listbox">…</ul>
</div>`
  },
  // -- DISCLOSURE ------------------------------------------------------
  {
    slug: "accordion",
    name: "Accordion",
    category: "Disclosure",
    status: "new",
    description: "Collapsible sections with rotating chevron and animated content.",
    preview: (
      <div className="lm-accordion">
        <div className="lm-accordion-item">
          <button className="lm-accordion-trigger" aria-expanded="true">
            What's included in the free tier?
          </button>
          <div className="lm-accordion-content">
            Up to 3 workspaces, 5,000 events / month, and 14-day audit log retention.
          </div>
        </div>
        <div className="lm-accordion-item">
          <button className="lm-accordion-trigger" aria-expanded="false">
            Do you support SSO and SCIM?
          </button>
          <div className="lm-accordion-content" hidden>
            SSO via SAML 2.0 and OIDC; SCIM 2.0 user provisioning included on Business plans.
          </div>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-accordion", description: "Card-styled wrapper" },
      { name: "lm-accordion-item", description: "Each section" },
      { name: "lm-accordion-trigger", description: "Header button (rotates ›)" },
      { name: "lm-accordion-content", description: "Collapsible body" }
    ],
    props: [
      { name: "type", type: "single | multiple", default: "single" },
      { name: "defaultValue", type: "string | string[]" }
    ],
    accessibility: [
      "Trigger: aria-expanded + aria-controls.",
      "Content: role='region' + aria-labelledby."
    ],
    htmlExample: `<div class="lm-accordion-item">
  <button class="lm-accordion-trigger" aria-expanded="true" aria-controls="panel-1">…</button>
  <div class="lm-accordion-content" id="panel-1" role="region">…</div>
</div>`
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Disclosure",
    status: "new",
    description: "Hierarchical list with dashed connectors. For file explorers and outlines.",
    preview: (
      <ul className="lm-tree">
        <li>
          <div className="lm-tree-item" aria-selected="false">
            ▸ src
          </div>
          <ul>
            <li>
              <div className="lm-tree-item" aria-selected="true">
                index.ts
              </div>
            </li>
            <li>
              <div className="lm-tree-item">components.ts</div>
            </li>
          </ul>
        </li>
        <li>
          <div className="lm-tree-item">README.md</div>
        </li>
      </ul>
    ),
    classes: [
      { name: "lm-tree", description: "Root <ul>" },
      { name: "lm-tree-item", description: "Each row; aria-selected for active" }
    ],
    props: [{ name: "data", type: "TreeNode[]" }],
    accessibility: [
      "Use role='tree' / 'treeitem' / 'group'.",
      "Arrow keys: ←/→ collapse/expand, ↑/↓ move focus."
    ],
    htmlExample: `<ul class="lm-tree" role="tree">
  <li role="treeitem"><div class="lm-tree-item">src</div></li>
</ul>`
  },
  // -- DATA ------------------------------------------------------------
  {
    slug: "table",
    name: "Table",
    category: "Data",
    status: "stable",
    description: "Native table styling with uppercase headers, hover row, sort, and density modes.",
    preview: (
      <table className="lm-table">
        <thead>
          <tr>
            <th>
              <button className="lm-table-sort" aria-sort="ascending">
                Account
              </button>
            </th>
            <th>Status</th>
            <th>Spend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Atlas Finance</td>
            <td>
              <span className="lm-badge lm-badge-success lm-badge-dot">Active</span>
            </td>
            <td>$84,200</td>
          </tr>
          <tr>
            <td>Northstar Health</td>
            <td>
              <span className="lm-badge lm-badge-warning lm-badge-dot">Review</span>
            </td>
            <td>$52,910</td>
          </tr>
          <tr>
            <td>Vector Labs</td>
            <td>
              <span className="lm-badge lm-badge-soft lm-badge-dot">Trial</span>
            </td>
            <td>$12,480</td>
          </tr>
        </tbody>
      </table>
    ),
    classes: [
      { name: "lm-table", description: "Native <table>" },
      { name: "lm-table-striped", description: "Zebra rows" },
      { name: "lm-table-compact", description: "Smaller padding" },
      { name: "lm-table-spacious", description: "Larger padding" },
      { name: "lm-table-toolbar", description: "Title + actions row" },
      { name: "lm-table-sort", description: "Header sort button (aria-sort)" }
    ],
    props: [
      { name: "striped", type: "boolean" },
      { name: "density", type: "compact | comfortable | spacious" }
    ],
    accessibility: [
      "Prefer semantic <thead><tbody>.",
      "Use scope='col' on header cells; <caption> when complex.",
      "Mirror sort with aria-sort='ascending|descending|none'."
    ],
    htmlExample: `<table class="lm-table">
  <thead><tr><th><button class="lm-table-sort" aria-sort="ascending">Name</button></th></tr></thead>
  <tbody>…</tbody>
</table>`
  },
  {
    slug: "stat",
    name: "Stat",
    category: "Data",
    status: "stable",
    description: "KPI tile with label, value, and trend indicator. Auto-grid with .lm-stat-grid.",
    preview: (
      <div className="lm-stat-grid">
        <div className="lm-stat">
          <span className="lm-stat-label">Revenue</span>
          <span className="lm-stat-value">$1.28M</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 12.4% vs Q1</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Active seats</span>
          <span className="lm-stat-value">18,420</span>
          <span className="lm-stat-trend lm-stat-trend-up">▲ 3.1% MoM</span>
        </div>
        <div className="lm-stat">
          <span className="lm-stat-label">Risk reviews</span>
          <span className="lm-stat-value">37</span>
          <span className="lm-stat-trend lm-stat-trend-down">▼ 8 open</span>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-stat", description: "Tile" },
      { name: "lm-stat-grid", description: "Auto-fit grid" },
      { name: "lm-stat-label / -value / -trend", description: "Slot typography" },
      { name: "lm-stat-trend-up / -down", description: "Semantic green/red" }
    ],
    props: [
      { name: "label", type: "string" },
      { name: "value", type: "string | number" },
      { name: "trend", type: "{ direction: 'up' | 'down'; label: string }" }
    ],
    accessibility: [
      "Use <dl><dt><dd> if it's a definition list.",
      "Trend indicator should not be color-only — pair with arrow + text."
    ],
    htmlExample: `<div class="lm-stat">
  <span class="lm-stat-label">Revenue</span>
  <span class="lm-stat-value">$1.28M</span>
  <span class="lm-stat-trend lm-stat-trend-up">▲ 12.4%</span>
</div>`
  },
  {
    slug: "sparkline",
    name: "Sparkline",
    category: "Data",
    status: "new",
    description: "SVG inline mini-chart container. Pair with stats for trend at-a-glance.",
    preview: (
      <div className="flex items-center gap-6">
        <div>
          <p className="lm-stat-label">Latency p95</p>
          <p className="lm-stat-value">128ms</p>
        </div>
        <svg className="lm-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            className="lm-sparkline-area"
            d="M0,22 L10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10 90,4 100,8 L100,30 L0,30 Z"
          />
          <path
            className="lm-sparkline-line"
            d="M0,22 L10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10 90,4 100,8"
          />
        </svg>
      </div>
    ),
    classes: [
      { name: "lm-sparkline", description: "<svg> wrapper sized to inherit currentColor" },
      { name: "lm-sparkline-line", description: "Stroked line path" },
      { name: "lm-sparkline-area", description: "Filled area path" }
    ],
    props: [
      { name: "data", type: "number[]" },
      { name: "color", type: "string", description: "Override via inline color style" }
    ],
    accessibility: ["Provide a textual value next to the sparkline; include aria-label."],
    htmlExample: `<svg class="lm-sparkline" viewBox="0 0 100 30">
  <path class="lm-sparkline-line" d="M0,22 L10,18 …" />
</svg>`
  },
  {
    slug: "description-list",
    name: "Description list",
    category: "Data",
    status: "stable",
    description: "Two-column key/value list for read-only details panels.",
    preview: (
      <dl className="lm-description-list">
        <dt>Plan</dt>
        <dd>Enterprise — annual</dd>
        <dt>Renewal</dt>
        <dd>April 18, 2027</dd>
        <dt>Owner</dt>
        <dd>finance@atlas.example</dd>
      </dl>
    ),
    classes: [{ name: "lm-description-list", description: "Two-column dl" }],
    props: [],
    accessibility: ["Use semantic <dl><dt><dd>."],
    htmlExample: `<dl class="lm-description-list">
  <dt>Plan</dt><dd>Enterprise</dd>
</dl>`
  },
  {
    slug: "activity-feed",
    name: "Activity feed",
    category: "Data",
    status: "stable",
    description: "Vertical list of activity items with avatar/icon, content, and meta.",
    preview: (
      <ul className="lm-activity-feed">
        <li className="lm-activity-item">
          <span className="lm-avatar lm-avatar-sm">AL</span>
          <div className="lm-activity-content">
            <p>
              <strong>Alex</strong> approved the compliance review.
            </p>
            <span className="lm-activity-meta">2 min ago</span>
          </div>
        </li>
        <li className="lm-activity-item">
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background: "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
            }}
          >
            MK
          </span>
          <div className="lm-activity-content">
            <p>
              <strong>Maya</strong> updated the SSO certificate.
            </p>
            <span className="lm-activity-meta">1 hr ago</span>
          </div>
        </li>
      </ul>
    ),
    classes: [
      { name: "lm-activity-feed", description: "<ul> root" },
      { name: "lm-activity-item", description: "Each row" },
      { name: "lm-activity-content", description: "Text region" },
      { name: "lm-activity-meta", description: "Timestamp text" }
    ],
    props: [],
    accessibility: ["Use semantic <ul><li>."],
    htmlExample: `<ul class="lm-activity-feed">
  <li class="lm-activity-item">…</li>
</ul>`
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data",
    status: "stable",
    description: "Vertical timeline with connecting lines and prominent dots.",
    preview: (
      <ul className="lm-timeline">
        <li className="lm-timeline-item">
          <span className="lm-timeline-dot" />
          <div>
            <strong>Workspace created</strong>
            <p className="lm-hint">April 12, 2026 · System</p>
          </div>
        </li>
        <li className="lm-timeline-item">
          <span className="lm-timeline-dot" />
          <div>
            <strong>SSO enabled</strong>
            <p className="lm-hint">April 14, 2026 · Maya K.</p>
          </div>
        </li>
        <li className="lm-timeline-item">
          <span className="lm-timeline-dot" />
          <div>
            <strong>First admin invited</strong>
            <p className="lm-hint">April 18, 2026 · Maya K.</p>
          </div>
        </li>
      </ul>
    ),
    classes: [
      { name: "lm-timeline", description: "<ul> root" },
      { name: "lm-timeline-item", description: "Each event row" },
      { name: "lm-timeline-dot", description: "Glowing event marker" }
    ],
    props: [],
    accessibility: ["Use semantic <ul><li>; provide order context (oldest/newest)."],
    htmlExample: `<ul class="lm-timeline">
  <li class="lm-timeline-item"><span class="lm-timeline-dot"></span>…</li>
</ul>`
  },
  {
    slug: "diff",
    name: "Diff",
    category: "Data",
    status: "new",
    description: "Inline diff view with +/− line markers and tinted background.",
    preview: (
      <div className="lm-diff">
        <div className="lm-diff-line lm-diff-line-meta">
          <span />
          <span> tokens.css</span>
        </div>
        <div className="lm-diff-line lm-diff-line-remove">
          <span />
          <span> --lm-radius-md: 0.375rem;</span>
        </div>
        <div className="lm-diff-line lm-diff-line-add">
          <span />
          <span> --lm-radius-md: 0.5rem;</span>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-diff", description: "Bordered container" },
      { name: "lm-diff-line", description: "Single line row" },
      { name: "lm-diff-line-add", description: "Green + line" },
      { name: "lm-diff-line-remove", description: "Red − line" },
      { name: "lm-diff-line-meta", description: "@ context line" }
    ],
    props: [],
    accessibility: ["Provide visible +/− markers (not just color)."],
    htmlExample: `<div class="lm-diff">
  <div class="lm-diff-line lm-diff-line-add"><span></span><span> new line</span></div>
</div>`
  },
  {
    slug: "inbox",
    name: "Inbox",
    category: "Data",
    status: "new",
    description: "Notification center with unread tinting, item meta, and overflow scroll.",
    preview: (
      <div className="lm-inbox">
        <div className="lm-inbox-header">
          <span>Notifications</span>
          <span className="lm-badge lm-badge-soft">3 unread</span>
        </div>
        <ul className="lm-inbox-list">
          <li className="lm-inbox-item" data-state="unread">
            <span className="lm-avatar lm-avatar-sm">AL</span>
            <div>
              <p className="lm-inbox-item-title">Atlas approved your review</p>
              <span className="lm-inbox-item-meta">2 min ago</span>
            </div>
            <span className="lm-badge lm-badge-soft text-xs">New</span>
          </li>
          <li className="lm-inbox-item" data-state="unread">
            <span className="lm-avatar lm-avatar-sm">MK</span>
            <div>
              <p className="lm-inbox-item-title">SSO certificate rotates in 7 days</p>
              <span className="lm-inbox-item-meta">1 hr ago</span>
            </div>
          </li>
          <li className="lm-inbox-item">
            <span className="lm-avatar lm-avatar-sm">RS</span>
            <div>
              <p className="lm-inbox-item-title">3 teammates joined</p>
              <span className="lm-inbox-item-meta">Yesterday</span>
            </div>
          </li>
        </ul>
      </div>
    ),
    classes: [
      { name: "lm-inbox", description: "Outer card" },
      { name: "lm-inbox-header", description: "Title row" },
      { name: "lm-inbox-list", description: "Scroll region" },
      { name: "lm-inbox-item", description: "Each notification" }
    ],
    props: [{ name: "items", type: "Notification[]" }],
    accessibility: ["Wrap in role='log' or aria-live='polite'.", "Mark unread with aria-label."],
    htmlExample: `<div class="lm-inbox" role="log" aria-live="polite">
  <ul class="lm-inbox-list">…</ul>
</div>`
  },
  {
    slug: "empty-state",
    name: "Empty state",
    category: "Data",
    status: "stable",
    description: "Centered prompt for empty lists. Pairs with a primary CTA.",
    preview: (
      <div className="lm-empty-state">
        <div className="lm-empty-state-title">No accounts yet</div>
        <p className="lm-hint">Connect your first identity provider to get started.</p>
        <button className="lm-btn lm-btn-primary lm-btn-sm">Connect provider</button>
      </div>
    ),
    classes: [
      { name: "lm-empty-state", description: "Dashed-border centered region" },
      { name: "lm-empty-state-title", description: "Bold title" }
    ],
    props: [],
    accessibility: ["Provide a clear next-action button."],
    htmlExample: `<div class="lm-empty-state">
  <div class="lm-empty-state-title">No data</div>
</div>`
  },
  // -- MEDIA -----------------------------------------------------------
  {
    slug: "carousel",
    name: "Carousel",
    category: "Media",
    status: "new",
    description: "Scroll-snap track with animated dots.",
    preview: (
      <div className="lm-carousel">
        <div className="lm-carousel-track">
          {[
            { title: "Onboarding", body: "SSO + SCIM in minutes." },
            { title: "Audit log", body: "30-day immutable retention." },
            { title: "Billing", body: "Per-seat or per-tenant." }
          ].map((s) => (
            <div className="lm-carousel-item" key={s.title}>
              <div className="lm-card lm-card-gradient">
                <div className="lm-card-body grid gap-2">
                  <strong>{s.title}</strong>
                  <p className="lm-hint">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lm-carousel-dots">
          <button className="lm-carousel-dot" aria-selected="true" />
          <button className="lm-carousel-dot" />
          <button className="lm-carousel-dot" />
        </div>
      </div>
    ),
    classes: [
      { name: "lm-carousel", description: "Wrapper" },
      { name: "lm-carousel-track", description: "Scroll-snap row" },
      { name: "lm-carousel-item", description: "Each slide" },
      { name: "lm-carousel-dots / -dot", description: "Active-indicator pills" }
    ],
    props: [
      { name: "autoplay", type: "boolean" },
      { name: "interval", type: "number" }
    ],
    accessibility: ["Use role='region' aria-roledescription='carousel'."],
    htmlExample: `<section class="lm-carousel" role="region" aria-roledescription="carousel">…</section>`
  },
  {
    slug: "split",
    name: "Split pane",
    category: "Media",
    status: "new",
    description: "Resizable panes with horizontal or vertical handles.",
    preview: (
      <div
        className="lm-split rounded-lg border border-[var(--lm-color-border)]"
        style={{ minHeight: "10rem" }}
      >
        <div className="p-4 text-sm">Left pane</div>
        <div className="lm-split-handle" aria-orientation="vertical" role="separator" />
        <div className="p-4 text-sm">Right pane</div>
      </div>
    ),
    classes: [
      { name: "lm-split", description: "Grid wrapper" },
      { name: "lm-split-vertical", description: "Stack vertically" },
      { name: "lm-split-handle", description: "Drag handle" }
    ],
    props: [
      { name: "sizes", type: "[number, number]" },
      { name: "minSize", type: "number" }
    ],
    accessibility: [
      "Handle: role='separator', aria-orientation, aria-valuenow.",
      "Arrow keys resize 5%; Home/End jump to extremes."
    ],
    htmlExample: `<div class="lm-split">
  <div>Left</div>
  <div class="lm-split-handle" role="separator"></div>
  <div>Right</div>
</div>`
  },
  {
    slug: "chat",
    name: "Chat",
    category: "Media",
    status: "new",
    description: "Message bubbles with self-vs-other styling, mentions, and timestamps.",
    preview: (
      <div className="lm-chat">
        <div className="lm-chat-message">
          <span className="lm-avatar lm-avatar-sm">MK</span>
          <div>
            <div className="lm-chat-bubble">
              Hey <span className="lm-mention">alex</span>, the staging bake is green.
            </div>
            <span className="lm-chat-meta">Maya · 2:14 PM</span>
          </div>
        </div>
        <div className="lm-chat-message lm-chat-message-self">
          <div>
            <div className="lm-chat-bubble">Promoting to prod in 5.</div>
            <span className="lm-chat-meta">You · 2:15 PM</span>
          </div>
          <span className="lm-avatar lm-avatar-sm">AL</span>
        </div>
      </div>
    ),
    classes: [
      { name: "lm-chat", description: "List wrapper" },
      { name: "lm-chat-message", description: "Single message row" },
      { name: "lm-chat-message-self", description: "Right-aligned (own message)" },
      { name: "lm-chat-bubble", description: "Speech bubble" },
      { name: "lm-chat-meta", description: "Timestamp + author line" }
    ],
    props: [],
    accessibility: ["Use role='log' aria-live='polite' on scroll container."],
    htmlExample: `<div class="lm-chat" role="log">
  <div class="lm-chat-message">…</div>
</div>`
  },
  {
    slug: "mention",
    name: "Mention",
    category: "Media",
    status: "new",
    description: "@-prefixed user reference chip for chat, comments, and rich text.",
    preview: (
      <p className="text-sm">
        Reviewed by <span className="lm-mention">alex</span> and{" "}
        <span className="lm-mention">maya</span>.
      </p>
    ),
    classes: [{ name: "lm-mention", description: "@user chip with primary tint" }],
    props: [],
    accessibility: ["Use <a> if mentions link to a profile."],
    htmlExample: `<a class="lm-mention" href="/users/alex">alex</a>`
  },
  {
    slug: "rt-toolbar",
    name: "Rich text toolbar",
    category: "Media",
    status: "new",
    description: "Formatting bar for editors with pressed-state indicators and dividers.",
    preview: (
      <div className="lm-rt-toolbar">
        <button className="lm-rt-button" aria-pressed="true">
          B
        </button>
        <button className="lm-rt-button">
          <em>I</em>
        </button>
        <button className="lm-rt-button">
          <u>U</u>
        </button>
        <span className="lm-rt-divider" />
        <button className="lm-rt-button">{"</>"}</button>
        <button className="lm-rt-button">@</button>
        <button className="lm-rt-button">↩</button>
      </div>
    ),
    classes: [
      { name: "lm-rt-toolbar", description: "Wrapper bar" },
      { name: "lm-rt-button", description: "Each formatting button" },
      { name: "lm-rt-divider", description: "1px vertical divider" }
    ],
    props: [],
    accessibility: [
      "Use role='toolbar' on wrapper.",
      "Active formatting: aria-pressed='true'."
    ],
    htmlExample: `<div class="lm-rt-toolbar" role="toolbar">
  <button class="lm-rt-button" aria-pressed="true">B</button>
</div>`
  },
  // -- PATTERN ---------------------------------------------------------
  {
    slug: "command-bar",
    name: "Command bar",
    category: "Pattern",
    status: "stable",
    description: "Toolbar above tables and lists with title, primary action, and secondary actions.",
    preview: (
      <div className="lm-command-bar">
        <div className="grid gap-1">
          <strong>Accounts</strong>
          <span className="lm-hint text-xs">128 active</span>
        </div>
        <div className="flex gap-2">
          <button className="lm-btn lm-btn-outline lm-btn-sm">Filter</button>
          <button className="lm-btn lm-btn-primary lm-btn-sm">Add account</button>
        </div>
      </div>
    ),
    classes: [{ name: "lm-command-bar", description: "Title + actions toolbar" }],
    props: [],
    accessibility: ["Use role='toolbar' if it contains only buttons."],
    htmlExample: `<div class="lm-command-bar">…</div>`
  },
  {
    slug: "filter-bar",
    name: "Filter bar",
    category: "Pattern",
    status: "stable",
    description: "Auto-fit grid of filter inputs above tables.",
    preview: (
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label">Status</span>
          <select className="lm-select">
            <option>All</option>
            <option>Active</option>
            <option>Review</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label">Owner</span>
          <input className="lm-input" placeholder="Anyone" />
        </label>
        <label className="lm-field">
          <span className="lm-label">Plan</span>
          <select className="lm-select">
            <option>Any</option>
            <option>Enterprise</option>
            <option>Trial</option>
          </select>
        </label>
      </div>
    ),
    classes: [{ name: "lm-filter-bar", description: "Auto-fit input grid" }],
    props: [],
    accessibility: ["Each filter must have a visible label."],
    htmlExample: `<div class="lm-filter-bar">
  <label class="lm-field">…</label>
</div>`
  },
  {
    slug: "bulk-bar",
    name: "Bulk action bar",
    category: "Pattern",
    status: "stable",
    description: "Sticky bar that appears when rows are selected. Holds bulk actions.",
    preview: (
      <div className="lm-bulk-bar">
        <strong>3 accounts selected</strong>
        <div className="flex gap-2">
          <button className="lm-btn lm-btn-outline lm-btn-sm">Export</button>
          <button className="lm-btn lm-btn-danger lm-btn-sm">Suspend</button>
        </div>
      </div>
    ),
    classes: [{ name: "lm-bulk-bar", description: "Primary-tinted action ribbon" }],
    props: [{ name: "count", type: "number" }],
    accessibility: ["Use aria-live='polite' to announce selection changes."],
    htmlExample: `<div class="lm-bulk-bar" aria-live="polite">…</div>`
  }
];

export const componentsByCategory = categoryOrder.map((category) => ({
  category,
  components: componentCatalog.filter((c) => c.category === category)
}));

export function getCatalogEntry(slug: string) {
  return componentCatalog.find((entry) => entry.slug === slug);
}

export const totalComponentCount = 72;
