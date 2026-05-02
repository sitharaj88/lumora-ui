import type { ReactNode } from "react";

export type TemplateEntry = {
  slug: string;
  name: string;
  category: "Admin" | "Marketing" | "Auth" | "Settings" | "App";
  description: string;
  highlights: string[];
  componentsUsed: string[];
  preview: ReactNode;
};

export const templates: TemplateEntry[] = [
  {
    slug: "admin-dashboard",
    name: "Admin dashboard",
    category: "Admin",
    description:
      "Production-grade SaaS admin shell with sidebar, KPI strip, table workflow, and bulk actions.",
    highlights: ["Sidebar + sticky navbar", "4 KPI tiles with sparklines", "Filterable table"],
    componentsUsed: ["Sidebar", "Navbar", "Stat", "Table", "Command bar", "Filter bar", "Bulk bar"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  },
  {
    slug: "settings",
    name: "Account settings",
    category: "Settings",
    description:
      "Multi-section settings page with sticky sidebar nav, profile, security, and notification panels.",
    highlights: ["Sticky section nav", "Form patterns", "Save bar"],
    componentsUsed: ["Sidebar", "Card", "Input", "Switch", "Tag input", "Banner"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  },
  {
    slug: "auth",
    name: "Sign in & onboarding",
    category: "Auth",
    description:
      "Sign-in page with SSO buttons, passwordless flow, and a multi-step onboarding wizard.",
    highlights: ["SSO buttons", "OTP flow", "Stepper wizard"],
    componentsUsed: ["Card", "Button", "Input", "OTP", "Stepper", "Dropzone"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  },
  {
    slug: "billing",
    name: "Billing & subscriptions",
    category: "Admin",
    description:
      "Plan picker, invoice table, payment method card, and usage meters with sparklines.",
    highlights: ["Plan picker", "Invoice table", "Usage meters"],
    componentsUsed: ["Card", "Stat", "Sparkline", "Table", "Banner", "Button"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  },
  {
    slug: "kanban",
    name: "Kanban board",
    category: "App",
    description:
      "Three-column work board with cards, avatars, badges, and a quick-add primary action.",
    highlights: ["Three-column board", "Cards with metadata", "Drag-handle markers"],
    componentsUsed: ["Card", "Badge", "Avatar", "Button"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  },
  {
    slug: "marketing",
    name: "Marketing landing",
    category: "Marketing",
    description:
      "Conversion-grade marketing page: gradient hero, feature grid, pricing table, and FAQ.",
    highlights: ["Hero with gradient mesh", "3-tier pricing", "FAQ accordion"],
    componentsUsed: ["Card", "Button", "Badge", "Accordion"],
    preview: <span className="lm-badge lm-badge-soft">View live →</span>
  }
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
