export type LumoraAccessibilityGuideline = {
  component: string;
  wcag: string[];
  role: string;
  requiredAttributes: string[];
  keyboard: string[];
  focus: string;
  notes: string;
};

export const lumoraAccessibilityTarget = {
  standard: "WCAG 2.2 AA",
  includes: [
    "Keyboard access",
    "Visible focus states",
    "Programmatic names and states",
    "Color contrast",
    "Reduced motion",
    "Error identification"
  ]
} as const;

export const lumoraAccessibilityGuidelines: LumoraAccessibilityGuideline[] = [
  {
    component: "Button",
    wcag: ["2.1.1 Keyboard", "2.4.7 Focus Visible", "4.1.2 Name, Role, Value"],
    role: "Native button or link with button-like styling",
    requiredAttributes: [
      "type on form buttons",
      "aria-busy when loading",
      "aria-disabled only when non-native"
    ],
    keyboard: ["Enter activates", "Space activates when rendered as button"],
    focus:
      "Use the built-in focus-visible ring and never remove focus outlines without replacement.",
    notes:
      "Use native disabled for button elements; reserve aria-disabled for links or custom elements."
  },
  {
    component: "Form controls",
    wcag: ["1.3.1 Info and Relationships", "3.3.1 Error Identification", "3.3.2 Labels"],
    role: "Native input, select, textarea, checkbox, radio, or switch",
    requiredAttributes: [
      "label or aria-label",
      "aria-invalid for errors",
      "aria-describedby for hints/errors"
    ],
    keyboard: ["Tab moves between fields", "Space toggles checkbox, radio, and switch"],
    focus:
      "Focus stays on the edited field; validation messages must be announced through descriptions.",
    notes: "Do not rely on color alone for invalid, warning, or success states."
  },
  {
    component: "Tabs",
    wcag: ["2.1.1 Keyboard", "2.4.3 Focus Order", "4.1.2 Name, Role, Value"],
    role: "tablist, tab, and tabpanel",
    requiredAttributes: ["aria-selected", "aria-controls", "aria-labelledby", "tabindex"],
    keyboard: ["Arrow keys move between tabs", "Home moves to first tab", "End moves to last tab"],
    focus: "Focus should move to the active tab; tab panels should not trap focus.",
    notes: "Use roving tabindex for interactive tab lists."
  },
  {
    component: "Dropdown",
    wcag: ["2.1.1 Keyboard", "2.4.3 Focus Order", "4.1.2 Name, Role, Value"],
    role: "button plus menu/menuitem when used as an action menu",
    requiredAttributes: ["aria-haspopup", "aria-expanded", "aria-controls", "role=menuitem"],
    keyboard: ["Enter or Space opens", "Escape closes", "Arrow keys move through menu items"],
    focus: "Move focus into the menu on open and return focus to the trigger on close.",
    notes:
      "Use aria-disabled on disabled menu items and keep them focusable only when the pattern requires it."
  },
  {
    component: "Modal",
    wcag: ["2.1.1 Keyboard", "2.4.3 Focus Order", "2.4.7 Focus Visible"],
    role: "dialog",
    requiredAttributes: ["aria-modal=true", "aria-labelledby or aria-label"],
    keyboard: [
      "Escape closes when safe",
      "Tab cycles inside the dialog",
      "Shift+Tab cycles backward"
    ],
    focus:
      "Move focus to the first meaningful control on open and restore focus to the trigger on close.",
    notes: "Background content should be inert while the modal is open."
  },
  {
    component: "Drawer",
    wcag: ["2.1.1 Keyboard", "2.4.3 Focus Order", "4.1.2 Name, Role, Value"],
    role: "dialog or complementary depending on behavior",
    requiredAttributes: ["aria-modal=true for blocking drawers", "aria-labelledby or aria-label"],
    keyboard: ["Escape closes blocking drawers", "Tab order remains contained when modal"],
    focus: "Blocking drawers follow modal focus rules; persistent drawers must not trap focus.",
    notes: "Choose drawer semantics based on whether it blocks interaction with the page."
  },
  {
    component: "Tooltip",
    wcag: ["1.4.13 Content on Hover or Focus", "2.1.1 Keyboard"],
    role: "tooltip",
    requiredAttributes: ["aria-describedby on trigger", "role=tooltip on content"],
    keyboard: ["Appears on focus", "Escape dismisses when interactive dismissal is implemented"],
    focus: "Tooltip content does not receive focus unless it contains interactive content.",
    notes: "Tooltips must be dismissible, hoverable, and persistent enough to read."
  },
  {
    component: "Toast",
    wcag: ["4.1.3 Status Messages", "2.2.1 Timing Adjustable"],
    role: "status or alert",
    requiredAttributes: ["role=status for passive updates", "role=alert for urgent errors"],
    keyboard: ["Dismiss button is keyboard reachable when present"],
    focus: "Do not steal focus for passive notifications.",
    notes: "Use polite announcements for success/info and assertive only for urgent failures."
  },
  {
    component: "Table",
    wcag: ["1.3.1 Info and Relationships", "2.4.6 Headings and Labels"],
    role: "Native table",
    requiredAttributes: ["caption or accessible name for complex tables", "scope on header cells"],
    keyboard: ["Native reading and browser table navigation should remain intact"],
    focus: "Interactive cells must have visible focus and predictable tab order.",
    notes:
      "Prefer native table markup for enterprise data grids until richer grid behavior is implemented."
  }
];

export const lumoraKeyboardPatterns = Object.fromEntries(
  lumoraAccessibilityGuidelines.map((guideline) => [guideline.component, guideline.keyboard])
) as Record<string, string[]>;
