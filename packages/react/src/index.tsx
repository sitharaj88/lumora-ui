import * as React from "react";

export type LumoraSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LumoraControlSize = "sm" | "md" | "lg";
export type LumoraTone =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "ghost"
  | "outline";
export type LumoraStatus = "info" | "success" | "warning" | "danger";
export type LumoraDensity = "compact" | "comfortable" | "spacious";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ariaInvalid(invalid?: boolean, existing?: React.AriaAttributes["aria-invalid"]) {
  return invalid || existing || undefined;
}

export type LumoraButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: LumoraTone;
  size?: Extract<LumoraSize, "xs" | "sm" | "md" | "lg">;
  loading?: boolean;
  active?: boolean;
  iconOnly?: boolean;
};

export const LumoraButton = React.forwardRef<HTMLButtonElement, LumoraButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      active = false,
      iconOnly = false,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        "lm-btn",
        `lm-btn-${variant}`,
        `lm-btn-${size}`,
        loading && "lm-btn-loading",
        active && "lm-btn-active",
        iconOnly && "lm-btn-icon",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"] || undefined}
      {...props}
    />
  )
);
LumoraButton.displayName = "LumoraButton";

export type LumoraBadgeProps = SpanProps & {
  variant?: "neutral" | "primary" | "secondary" | "accent" | LumoraStatus;
  size?: LumoraControlSize;
};

export function LumoraBadge({ className, variant = "neutral", size, ...props }: LumoraBadgeProps) {
  return (
    <span
      className={cn(
        "lm-badge",
        variant !== "neutral" && `lm-badge-${variant}`,
        size && `lm-badge-${size}`,
        className
      )}
      {...props}
    />
  );
}

export type LumoraAlertProps = DivProps & {
  status?: LumoraStatus;
};

export function LumoraAlert({ className, status = "info", ...props }: LumoraAlertProps) {
  return (
    <div role="status" className={cn("lm-alert", `lm-alert-${status}`, className)} {...props} />
  );
}

export type LumoraCardProps = DivProps & {
  variant?: "default" | "raised" | "flat" | "interactive";
};

const LumoraCardRoot = React.forwardRef<HTMLDivElement, LumoraCardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("lm-card", variant !== "default" && `lm-card-${variant}`, className)}
      {...props}
    />
  )
);
LumoraCardRoot.displayName = "LumoraCard";

export const LumoraCardHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-card-header", className)} {...props} />
  )
);
LumoraCardHeader.displayName = "LumoraCardHeader";

export const LumoraCardBody = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-card-body", className)} {...props} />
  )
);
LumoraCardBody.displayName = "LumoraCardBody";

export const LumoraCardFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-card-footer", className)} {...props} />
  )
);
LumoraCardFooter.displayName = "LumoraCardFooter";

export const LumoraCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("lm-card-title", className)} {...props} />
));
LumoraCardTitle.displayName = "LumoraCardTitle";

export const LumoraCard = Object.assign(LumoraCardRoot, {
  Header: LumoraCardHeader,
  Body: LumoraCardBody,
  Footer: LumoraCardFooter,
  Title: LumoraCardTitle
});

export const LumoraField = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("lm-field", className)} {...props} />
));
LumoraField.displayName = "LumoraField";

export const LumoraLabel = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("lm-label", className)} {...props} />
  )
);
LumoraLabel.displayName = "LumoraLabel";

export const LumoraHint = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("lm-hint", className)} {...props} />
  )
);
LumoraHint.displayName = "LumoraHint";

type FieldState = "success" | "warning" | "danger";

export type LumoraInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  size?: LumoraControlSize;
  state?: FieldState;
};

export const LumoraInput = React.forwardRef<HTMLInputElement, LumoraInputProps>(
  ({ className, invalid, size, state, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "lm-input",
        size && `lm-input-${size}`,
        state && `lm-input-${state}`,
        className
      )}
      aria-invalid={ariaInvalid(invalid, props["aria-invalid"])}
      {...props}
    />
  )
);
LumoraInput.displayName = "LumoraInput";

export type LumoraTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
  state?: FieldState;
};

export const LumoraTextarea = React.forwardRef<HTMLTextAreaElement, LumoraTextareaProps>(
  ({ className, invalid, state, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("lm-textarea", state && `lm-textarea-${state}`, className)}
      aria-invalid={ariaInvalid(invalid, props["aria-invalid"])}
      {...props}
    />
  )
);
LumoraTextarea.displayName = "LumoraTextarea";

export type LumoraSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  size?: LumoraControlSize;
  state?: FieldState;
};

export const LumoraSelect = React.forwardRef<HTMLSelectElement, LumoraSelectProps>(
  ({ className, invalid, size, state, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "lm-select",
        size && `lm-select-${size}`,
        state && `lm-select-${state}`,
        className
      )}
      aria-invalid={ariaInvalid(invalid, props["aria-invalid"])}
      {...props}
    />
  )
);
LumoraSelect.displayName = "LumoraSelect";

export type LumoraCheckProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: LumoraControlSize;
};

export const LumoraCheckbox = React.forwardRef<HTMLInputElement, LumoraCheckProps>(
  ({ className, size, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      type="checkbox"
      className={cn("lm-checkbox", size && `lm-checkbox-${size}`, className)}
    />
  )
);
LumoraCheckbox.displayName = "LumoraCheckbox";

export const LumoraRadio = React.forwardRef<HTMLInputElement, LumoraCheckProps>(
  ({ className, size, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      type="radio"
      className={cn("lm-radio", size && `lm-radio-${size}`, className)}
    />
  )
);
LumoraRadio.displayName = "LumoraRadio";

export const LumoraSwitch = React.forwardRef<HTMLInputElement, LumoraCheckProps>(
  ({ className, size, role, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      type="checkbox"
      role={role ?? "switch"}
      className={cn("lm-switch", size && `lm-switch-${size}`, className)}
    />
  )
);
LumoraSwitch.displayName = "LumoraSwitch";

export const LumoraTabs = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, role, ...props }, ref) => (
    <div ref={ref} role={role ?? "tablist"} className={cn("lm-tabs", className)} {...props} />
  )
);
LumoraTabs.displayName = "LumoraTabs";

export type LumoraTabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  size?: LumoraControlSize;
};

export const LumoraTab = React.forwardRef<HTMLButtonElement, LumoraTabProps>(
  ({ className, active, size, role, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      role={role ?? "tab"}
      type={type}
      className={cn("lm-tab", active && "lm-tab-active", size && `lm-tab-${size}`, className)}
      aria-selected={active ?? props["aria-selected"]}
      {...props}
    />
  )
);
LumoraTab.displayName = "LumoraTab";

export const LumoraDropdown = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-dropdown", className)} {...props} />
  )
);
LumoraDropdown.displayName = "LumoraDropdown";

export const LumoraDropdownMenu = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, role, ...props }, ref) => (
    <div ref={ref} role={role ?? "menu"} className={cn("lm-dropdown-menu", className)} {...props} />
  )
);
LumoraDropdownMenu.displayName = "LumoraDropdownMenu";

export type LumoraDropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export const LumoraDropdownItem = React.forwardRef<HTMLButtonElement, LumoraDropdownItemProps>(
  ({ className, active, role, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      role={role ?? "menuitem"}
      type={type}
      className={cn("lm-dropdown-item", active && "lm-dropdown-item-active", className)}
      {...props}
    />
  )
);
LumoraDropdownItem.displayName = "LumoraDropdownItem";

export type LumoraModalProps = DivProps & {
  open?: boolean;
  size?: LumoraControlSize | "xl";
};

const LumoraModalRoot = React.forwardRef<HTMLDivElement, LumoraModalProps>(
  ({ className, open = true, size, role, ...props }, ref) => {
    if (!open) return null;
    return (
      <div
        ref={ref}
        role={role ?? "dialog"}
        aria-modal="true"
        className={cn("lm-modal", size && `lm-modal-${size}`, className)}
        {...props}
      />
    );
  }
);
LumoraModalRoot.displayName = "LumoraModal";

export const LumoraModalPanel = React.forwardRef<
  HTMLDivElement,
  DivProps & { size?: LumoraControlSize | "xl" }
>(({ className, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("lm-modal-panel", size && `lm-modal-panel-${size}`, className)}
    {...props}
  />
));
LumoraModalPanel.displayName = "LumoraModalPanel";

export const LumoraModalHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-modal-header", className)} {...props} />
  )
);
LumoraModalHeader.displayName = "LumoraModalHeader";

export const LumoraModalBody = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-modal-body", className)} {...props} />
  )
);
LumoraModalBody.displayName = "LumoraModalBody";

export const LumoraModalFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-modal-footer", className)} {...props} />
  )
);
LumoraModalFooter.displayName = "LumoraModalFooter";

export const LumoraModal = Object.assign(LumoraModalRoot, {
  Panel: LumoraModalPanel,
  Header: LumoraModalHeader,
  Body: LumoraModalBody,
  Footer: LumoraModalFooter
});

export type LumoraDrawerProps = DivProps & {
  open?: boolean;
  side?: "left" | "right";
  size?: LumoraControlSize;
};

export const LumoraDrawer = React.forwardRef<HTMLDivElement, LumoraDrawerProps>(
  ({ className, open = true, side = "right", size, role, ...props }, ref) => {
    if (!open) return null;
    return (
      <aside
        ref={ref}
        role={role ?? "dialog"}
        className={cn(
          "lm-drawer",
          side === "left" && "lm-drawer-left",
          size && `lm-drawer-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);
LumoraDrawer.displayName = "LumoraDrawer";

export const LumoraTooltip = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("lm-tooltip", className)} {...props} />
));
LumoraTooltip.displayName = "LumoraTooltip";

export type LumoraTooltipContentProps = DivProps & {
  side?: "top" | "right" | "bottom" | "left";
};

export const LumoraTooltipContent = React.forwardRef<HTMLDivElement, LumoraTooltipContentProps>(
  ({ className, side, role, ...props }, ref) => (
    <div
      ref={ref}
      role={role ?? "tooltip"}
      data-side={side}
      className={cn("lm-tooltip-content", className)}
      {...props}
    />
  )
);
LumoraTooltipContent.displayName = "LumoraTooltipContent";

export type LumoraToastProps = DivProps & {
  status?: LumoraStatus;
  size?: LumoraControlSize;
};

export const LumoraToast = React.forwardRef<HTMLDivElement, LumoraToastProps>(
  ({ className, status, size, role = "status", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn(
        "lm-toast",
        status && `lm-toast-${status}`,
        size && `lm-toast-${size}`,
        className
      )}
      {...props}
    />
  )
);
LumoraToast.displayName = "LumoraToast";

export type LumoraAvatarProps = DivProps & {
  size?: LumoraSize;
};

export const LumoraAvatar = React.forwardRef<HTMLDivElement, LumoraAvatarProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div ref={ref} className={cn("lm-avatar", `lm-avatar-${size}`, className)} {...props} />
  )
);
LumoraAvatar.displayName = "LumoraAvatar";

export const LumoraBreadcrumbs = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={props["aria-label"] ?? "Breadcrumb"}
      className={cn("lm-breadcrumbs", className)}
      {...props}
    />
  )
);
LumoraBreadcrumbs.displayName = "LumoraBreadcrumbs";

export const LumoraPagination = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { size?: LumoraControlSize }
>(({ className, size, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label={props["aria-label"] ?? "Pagination"}
    className={cn("lm-pagination", size && `lm-pagination-${size}`, className)}
    {...props}
  />
));
LumoraPagination.displayName = "LumoraPagination";

export type LumoraPaginationItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  disabled?: boolean;
  size?: LumoraControlSize;
};

export const LumoraPaginationItem = React.forwardRef<HTMLAnchorElement, LumoraPaginationItemProps>(
  ({ className, active, disabled, size, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "lm-pagination-item",
        active && "lm-pagination-active",
        disabled && "lm-pagination-disabled",
        size && `lm-pagination-item-${size}`,
        className
      )}
      aria-current={active ? "page" : props["aria-current"]}
      aria-disabled={disabled || props["aria-disabled"] || undefined}
      {...props}
    />
  )
);
LumoraPaginationItem.displayName = "LumoraPaginationItem";

export const LumoraNavbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("lm-navbar", className)} {...props} />
  )
);
LumoraNavbar.displayName = "LumoraNavbar";

export type LumoraSidebarProps = React.HTMLAttributes<HTMLElement> & {
  compact?: boolean;
};

export const LumoraSidebar = React.forwardRef<HTMLElement, LumoraSidebarProps>(
  ({ className, compact, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn("lm-sidebar", compact && "lm-sidebar-compact", className)}
      {...props}
    />
  )
);
LumoraSidebar.displayName = "LumoraSidebar";

export type LumoraSidebarItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

export const LumoraSidebarItem = React.forwardRef<HTMLAnchorElement, LumoraSidebarItemProps>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn("lm-sidebar-item", active && "lm-sidebar-item-active", className)}
      aria-current={active ? "page" : props["aria-current"]}
      {...props}
    />
  )
);
LumoraSidebarItem.displayName = "LumoraSidebarItem";

export type LumoraTableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  striped?: boolean;
  density?: "compact" | "default" | "spacious";
};

const LumoraTableRoot = React.forwardRef<HTMLTableElement, LumoraTableProps>(
  ({ className, striped, density = "default", ...props }, ref) => (
    <table
      ref={ref}
      className={cn(
        "lm-table",
        striped && "lm-table-striped",
        density === "compact" && "lm-table-compact",
        density === "spacious" && "lm-table-spacious",
        className
      )}
      {...props}
    />
  )
);
LumoraTableRoot.displayName = "LumoraTable";

export const LumoraTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <thead ref={ref} {...props} />);
LumoraTableHeader.displayName = "LumoraTableHeader";

export const LumoraTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} />);
LumoraTableBody.displayName = "LumoraTableBody";

export const LumoraTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => <tr ref={ref} {...props} />);
LumoraTableRow.displayName = "LumoraTableRow";

export const LumoraTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <th ref={ref} scope={props.scope ?? "col"} {...props} />);
LumoraTableHead.displayName = "LumoraTableHead";

export const LumoraTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <td ref={ref} {...props} />);
LumoraTableCell.displayName = "LumoraTableCell";

export const LumoraTable = Object.assign(LumoraTableRoot, {
  Header: LumoraTableHeader,
  Body: LumoraTableBody,
  Row: LumoraTableRow,
  Head: LumoraTableHead,
  Cell: LumoraTableCell
});

export type LumoraSkeletonProps = DivProps & {
  shape?: "block" | "circle" | "text";
};

export const LumoraSkeleton = React.forwardRef<HTMLDivElement, LumoraSkeletonProps>(
  ({ className, shape = "block", ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("lm-skeleton", shape !== "block" && `lm-skeleton-${shape}`, className)}
      {...props}
    />
  )
);
LumoraSkeleton.displayName = "LumoraSkeleton";

export type LumoraProgressProps = React.ProgressHTMLAttributes<HTMLProgressElement> & {
  size?: LumoraControlSize;
};

export const LumoraProgress = React.forwardRef<HTMLProgressElement, LumoraProgressProps>(
  ({ className, size, ...props }, ref) => (
    <progress
      ref={ref}
      className={cn("lm-progress", size && `lm-progress-${size}`, className)}
      {...props}
    />
  )
);
LumoraProgress.displayName = "LumoraProgress";

export type LumoraSpinnerProps = SpanProps & {
  size?: LumoraControlSize;
};

export const LumoraSpinner = React.forwardRef<HTMLSpanElement, LumoraSpinnerProps>(
  ({ className, size, role = "status", ...props }, ref) => (
    <span
      ref={ref}
      role={role}
      className={cn("lm-spinner", size && `lm-spinner-${size}`, className)}
      {...props}
    />
  )
);
LumoraSpinner.displayName = "LumoraSpinner";

export type LumoraDensityScopeProps = DivProps & {
  density?: LumoraDensity;
};

export const LumoraDensityScope = React.forwardRef<HTMLDivElement, LumoraDensityScopeProps>(
  ({ className, density = "comfortable", ...props }, ref) => (
    <div ref={ref} className={cn(`lm-density-${density}`, className)} {...props} />
  )
);
LumoraDensityScope.displayName = "LumoraDensityScope";

// ============================================================
// v0.2 — additive components
// ============================================================

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type UlProps = React.HTMLAttributes<HTMLUListElement>;
type LiProps = React.LiHTMLAttributes<HTMLLIElement>;

// -- Button group ----------------------------------------------------
export const LumoraButtonGroup = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-btn-group", className)} role="group" {...props} />
  )
);
LumoraButtonGroup.displayName = "LumoraButtonGroup";

// -- Toggle group ----------------------------------------------------
export type LumoraToggleGroupProps = DivProps & {
  value?: string;
  onValueChange?: (value: string) => void;
};
export const LumoraToggleGroup = React.forwardRef<HTMLDivElement, LumoraToggleGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="radiogroup" className={cn("lm-toggle-group", className)} {...props} />
  )
);
LumoraToggleGroup.displayName = "LumoraToggleGroup";

export type LumoraToggleGroupItemProps = ButtonProps & { pressed?: boolean };
export const LumoraToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  LumoraToggleGroupItemProps
>(({ className, pressed, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="radio"
    aria-checked={pressed}
    aria-pressed={pressed}
    className={cn("lm-toggle-group-item", className)}
    {...props}
  />
));
LumoraToggleGroupItem.displayName = "LumoraToggleGroupItem";

// -- Segmented -------------------------------------------------------
export type LumoraSegmentedProps = DivProps;
export const LumoraSegmented = React.forwardRef<HTMLDivElement, LumoraSegmentedProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="radiogroup" className={cn("lm-segmented", className)} {...props} />
  )
);
LumoraSegmented.displayName = "LumoraSegmented";

export type LumoraSegmentedItemProps = ButtonProps & { pressed?: boolean };
export const LumoraSegmentedItem = React.forwardRef<HTMLButtonElement, LumoraSegmentedItemProps>(
  ({ className, pressed, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={pressed}
      aria-pressed={pressed}
      className={cn("lm-segmented-item", className)}
      {...props}
    />
  )
);
LumoraSegmentedItem.displayName = "LumoraSegmentedItem";

// -- Tag / Chip ------------------------------------------------------
export type LumoraTagProps = SpanProps & {
  removable?: boolean;
  onRemove?: () => void;
};
export const LumoraTag = React.forwardRef<HTMLSpanElement, LumoraTagProps>(
  ({ className, removable, onRemove, children, ...props }, ref) => (
    <span ref={ref} className={cn("lm-tag", removable && "lm-tag-removable", className)} {...props}>
      {children}
      {removable && (
        <button type="button" className="lm-tag-remove" aria-label="Remove tag" onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  )
);
LumoraTag.displayName = "LumoraTag";

export type LumoraTagInputProps = DivProps;
export const LumoraTagInput = React.forwardRef<HTMLDivElement, LumoraTagInputProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-tag-input", className)} {...props} />
  )
);
LumoraTagInput.displayName = "LumoraTagInput";

// -- Slider ----------------------------------------------------------
export type LumoraSliderProps = Omit<InputProps, "type">;
export const LumoraSlider = React.forwardRef<HTMLInputElement, LumoraSliderProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} type="range" className={cn("lm-slider", className)} {...props} />
  )
);
LumoraSlider.displayName = "LumoraSlider";

// -- Rating ----------------------------------------------------------
export type LumoraRatingProps = DivProps & {
  value?: number;
  max?: number;
  onValueChange?: (value: number) => void;
};
export const LumoraRating = React.forwardRef<HTMLDivElement, LumoraRatingProps>(
  ({ className, value = 0, max = 5, onValueChange, ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={props["aria-label"] ?? "Rating"}
      className={cn("lm-rating", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={i < value}
          className="lm-rating-star"
          onClick={() => onValueChange?.(i + 1)}
        >
          ★
        </button>
      ))}
    </div>
  )
);
LumoraRating.displayName = "LumoraRating";

// -- Dropzone --------------------------------------------------------
export type LumoraDropzoneProps = React.LabelHTMLAttributes<HTMLLabelElement>;
export const LumoraDropzone = React.forwardRef<HTMLLabelElement, LumoraDropzoneProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("lm-dropzone", className)} {...props} />
  )
);
LumoraDropzone.displayName = "LumoraDropzone";

// -- Kbd / Code / Code Block -----------------------------------------
export const LumoraKbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <kbd ref={ref} className={cn("lm-kbd", className)} {...props} />
);
LumoraKbd.displayName = "LumoraKbd";

export const LumoraCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code ref={ref} className={cn("lm-code", className)} {...props} />
  )
);
LumoraCode.displayName = "LumoraCode";

export const LumoraCodeBlock = React.forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ className, ...props }, ref) => (
  <pre ref={ref} className={cn("lm-code-block", className)} {...props} />
));
LumoraCodeBlock.displayName = "LumoraCodeBlock";

// -- Banner ----------------------------------------------------------
export type LumoraBannerProps = DivProps & { tone?: LumoraStatus };
export const LumoraBanner = React.forwardRef<HTMLDivElement, LumoraBannerProps>(
  ({ className, tone, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn("lm-banner", tone && `lm-banner-${tone}`, className)}
      {...props}
    />
  )
);
LumoraBanner.displayName = "LumoraBanner";

// -- Stat / Stat grid / Description list -----------------------------
export const LumoraStatGrid = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-stat-grid", className)} {...props} />
  )
);
LumoraStatGrid.displayName = "LumoraStatGrid";

export type LumoraStatProps = DivProps & {
  label?: React.ReactNode;
  value?: React.ReactNode;
  trend?: { direction: "up" | "down"; label: React.ReactNode };
};
export const LumoraStat = React.forwardRef<HTMLDivElement, LumoraStatProps>(
  ({ className, label, value, trend, children, ...props }, ref) => (
    <div ref={ref} className={cn("lm-stat", className)} {...props}>
      {label !== undefined && <span className="lm-stat-label">{label}</span>}
      {value !== undefined && <span className="lm-stat-value">{value}</span>}
      {trend && (
        <span
          className={cn(
            "lm-stat-trend",
            trend.direction === "up" && "lm-stat-trend-up",
            trend.direction === "down" && "lm-stat-trend-down"
          )}
        >
          {trend.label}
        </span>
      )}
      {children}
    </div>
  )
);
LumoraStat.displayName = "LumoraStat";

export const LumoraDescriptionList = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn("lm-description-list", className)} {...props} />
));
LumoraDescriptionList.displayName = "LumoraDescriptionList";

// -- Activity feed / Timeline ----------------------------------------
export const LumoraActivityFeed = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("lm-activity-feed", className)} {...props} />
  )
);
LumoraActivityFeed.displayName = "LumoraActivityFeed";

export const LumoraActivityItem = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("lm-activity-item", className)} {...props} />
  )
);
LumoraActivityItem.displayName = "LumoraActivityItem";

export const LumoraTimeline = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("lm-timeline", className)} {...props} />
  )
);
LumoraTimeline.displayName = "LumoraTimeline";

export const LumoraTimelineItem = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("lm-timeline-item", className)} {...props}>
      <span className="lm-timeline-dot" aria-hidden="true" />
      {props.children}
    </li>
  )
);
LumoraTimelineItem.displayName = "LumoraTimelineItem";

// -- Empty state -----------------------------------------------------
export type LumoraEmptyStateProps = DivProps & {
  title?: React.ReactNode;
};
export const LumoraEmptyState = React.forwardRef<HTMLDivElement, LumoraEmptyStateProps>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} className={cn("lm-empty-state", className)} {...props}>
      {title && <p className="lm-empty-state-title">{title}</p>}
      {children}
    </div>
  )
);
LumoraEmptyState.displayName = "LumoraEmptyState";

// -- Accordion -------------------------------------------------------
export const LumoraAccordion = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-accordion", className)} {...props} />
  )
);
LumoraAccordion.displayName = "LumoraAccordion";

export const LumoraAccordionItem = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-accordion-item", className)} {...props} />
  )
);
LumoraAccordionItem.displayName = "LumoraAccordionItem";

export type LumoraAccordionTriggerProps = ButtonProps & { expanded?: boolean };
export const LumoraAccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  LumoraAccordionTriggerProps
>(({ className, expanded, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={expanded}
    className={cn("lm-accordion-trigger", className)}
    {...props}
  />
));
LumoraAccordionTrigger.displayName = "LumoraAccordionTrigger";

export type LumoraAccordionContentProps = DivProps & { open?: boolean };
export const LumoraAccordionContent = React.forwardRef<HTMLDivElement, LumoraAccordionContentProps>(
  ({ className, open, hidden, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      hidden={open === false || hidden}
      className={cn("lm-accordion-content", className)}
      {...props}
    />
  )
);
LumoraAccordionContent.displayName = "LumoraAccordionContent";

// -- Tree ------------------------------------------------------------
export const LumoraTree = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} role="tree" className={cn("lm-tree", className)} {...props} />
  )
);
LumoraTree.displayName = "LumoraTree";

export type LumoraTreeItemProps = DivProps & { selected?: boolean };
export const LumoraTreeItem = React.forwardRef<HTMLDivElement, LumoraTreeItemProps>(
  ({ className, selected, ...props }, ref) => (
    <div
      ref={ref}
      role="treeitem"
      aria-selected={selected}
      className={cn("lm-tree-item", className)}
      {...props}
    />
  )
);
LumoraTreeItem.displayName = "LumoraTreeItem";

// -- Stepper ---------------------------------------------------------
export const LumoraStepper = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("lm-stepper", className)} {...props} />
));
LumoraStepper.displayName = "LumoraStepper";

export type LumoraStepProps = LiProps & {
  state?: "complete" | "current" | "pending";
};
export const LumoraStep = React.forwardRef<HTMLLIElement, LumoraStepProps>(
  ({ className, state, children, ...props }, ref) => (
    <li
      ref={ref}
      aria-current={state === "current" ? "step" : undefined}
      data-state={state === "complete" ? "complete" : undefined}
      className={cn("lm-step", state === "complete" && "lm-step-complete", className)}
      {...props}
    >
      <span className="lm-step-marker" />
      {children}
    </li>
  )
);
LumoraStep.displayName = "LumoraStep";

// -- Popover ---------------------------------------------------------
export type LumoraPopoverProps = SpanProps;
export const LumoraPopover = React.forwardRef<HTMLSpanElement, LumoraPopoverProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("lm-popover", className)} {...props} />
  )
);
LumoraPopover.displayName = "LumoraPopover";

export type LumoraPopoverContentProps = DivProps & {
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
};
export const LumoraPopoverContent = React.forwardRef<HTMLDivElement, LumoraPopoverContentProps>(
  ({ className, side, open, hidden, ...props }, ref) => (
    <div
      ref={ref}
      role="dialog"
      data-side={side}
      data-state={open === false ? "closed" : "open"}
      hidden={open === false || hidden}
      className={cn("lm-popover-content", className)}
      {...props}
    />
  )
);
LumoraPopoverContent.displayName = "LumoraPopoverContent";

// -- Hover card ------------------------------------------------------
export const LumoraHoverCard = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("lm-hover-card", className)} {...props} />
  )
);
LumoraHoverCard.displayName = "LumoraHoverCard";

export type LumoraHoverCardContentProps = DivProps & { open?: boolean };
export const LumoraHoverCardContent = React.forwardRef<HTMLDivElement, LumoraHoverCardContentProps>(
  ({ className, open, hidden, ...props }, ref) => (
    <div
      ref={ref}
      hidden={open === false || hidden}
      className={cn("lm-hover-card-content", className)}
      {...props}
    />
  )
);
LumoraHoverCardContent.displayName = "LumoraHoverCardContent";

// -- Context menu ----------------------------------------------------
export type LumoraContextMenuProps = DivProps & { x?: number; y?: number };
export const LumoraContextMenu = React.forwardRef<HTMLDivElement, LumoraContextMenuProps>(
  ({ className, x, y, style, ...props }, ref) => (
    <div
      ref={ref}
      role="menu"
      className={cn("lm-context-menu", className)}
      style={x !== undefined && y !== undefined ? { ...style, top: y, left: x } : style}
      {...props}
    />
  )
);
LumoraContextMenu.displayName = "LumoraContextMenu";

export type LumoraContextMenuItemProps = ButtonProps & { tone?: "default" | "danger" };
export const LumoraContextMenuItem = React.forwardRef<
  HTMLButtonElement,
  LumoraContextMenuItemProps
>(({ className, tone, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="menuitem"
    className={cn(
      "lm-context-menu-item",
      tone === "danger" && "lm-context-menu-item-danger",
      className
    )}
    {...props}
  />
));
LumoraContextMenuItem.displayName = "LumoraContextMenuItem";

// -- Command palette -------------------------------------------------
export const LumoraCommand = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="dialog"
      aria-label="Command palette"
      className={cn("lm-command", className)}
      {...props}
    />
  )
);
LumoraCommand.displayName = "LumoraCommand";

export const LumoraCommandInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      role="combobox"
      aria-autocomplete="list"
      className={cn("lm-command-input", className)}
      {...props}
    />
  )
);
LumoraCommandInput.displayName = "LumoraCommandInput";

export const LumoraCommandList = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} role="listbox" className={cn("lm-command-list", className)} {...props} />
  )
);
LumoraCommandList.displayName = "LumoraCommandList";

export type LumoraCommandItemProps = LiProps & { selected?: boolean };
export const LumoraCommandItem = React.forwardRef<HTMLLIElement, LumoraCommandItemProps>(
  ({ className, selected, ...props }, ref) => (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      className={cn("lm-command-item", className)}
      {...props}
    />
  )
);
LumoraCommandItem.displayName = "LumoraCommandItem";

export const LumoraCommandGroupLabel = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("lm-command-group-label", className)} {...props} />
  )
);
LumoraCommandGroupLabel.displayName = "LumoraCommandGroupLabel";

export const LumoraCommandFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-command-footer", className)} {...props} />
  )
);
LumoraCommandFooter.displayName = "LumoraCommandFooter";

// -- Calendar --------------------------------------------------------
export const LumoraCalendar = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="grid" className={cn("lm-calendar", className)} {...props} />
  )
);
LumoraCalendar.displayName = "LumoraCalendar";

export const LumoraCalendarHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-calendar-header", className)} {...props} />
  )
);
LumoraCalendarHeader.displayName = "LumoraCalendarHeader";

export const LumoraCalendarGrid = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-calendar-grid", className)} {...props} />
  )
);
LumoraCalendarGrid.displayName = "LumoraCalendarGrid";

export type LumoraCalendarDayProps = ButtonProps & {
  selected?: boolean;
  today?: boolean;
  outside?: boolean;
  range?: "start" | "middle" | "end";
};
export const LumoraCalendarDay = React.forwardRef<HTMLButtonElement, LumoraCalendarDayProps>(
  ({ className, selected, today, outside, range, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="gridcell"
      aria-selected={selected}
      data-today={today ? "true" : undefined}
      data-outside={outside ? "true" : undefined}
      data-range={range}
      className={cn("lm-calendar-day", className)}
      {...props}
    />
  )
);
LumoraCalendarDay.displayName = "LumoraCalendarDay";

// -- Date picker -----------------------------------------------------
export const LumoraDatePicker = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-datepicker", className)} {...props} />
  )
);
LumoraDatePicker.displayName = "LumoraDatePicker";

export const LumoraDatePickerTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      className={cn("lm-datepicker-trigger", className)}
      {...props}
    />
  )
);
LumoraDatePickerTrigger.displayName = "LumoraDatePickerTrigger";

// -- Combobox --------------------------------------------------------
export const LumoraCombobox = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-combobox", className)} {...props} />
  )
);
LumoraCombobox.displayName = "LumoraCombobox";

export type LumoraComboboxListboxProps = UlProps & { open?: boolean };
export const LumoraComboboxListbox = React.forwardRef<HTMLUListElement, LumoraComboboxListboxProps>(
  ({ className, open, hidden, ...props }, ref) => (
    <ul
      ref={ref}
      role="listbox"
      hidden={open === false || hidden}
      className={cn("lm-combobox-listbox", className)}
      {...props}
    />
  )
);
LumoraComboboxListbox.displayName = "LumoraComboboxListbox";

export type LumoraComboboxOptionProps = LiProps & { selected?: boolean };
export const LumoraComboboxOption = React.forwardRef<HTMLLIElement, LumoraComboboxOptionProps>(
  ({ className, selected, ...props }, ref) => (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      className={cn("lm-combobox-option", className)}
      {...props}
    />
  )
);
LumoraComboboxOption.displayName = "LumoraComboboxOption";

// -- OTP / PIN -------------------------------------------------------
export const LumoraOtp = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("lm-otp", className)} {...props} />
);
LumoraOtp.displayName = "LumoraOtp";

export type LumoraOtpSlotProps = InputProps & { filled?: boolean };
export const LumoraOtpSlot = React.forwardRef<HTMLInputElement, LumoraOtpSlotProps>(
  ({ className, filled, maxLength = 1, ...props }, ref) => (
    <input
      ref={ref}
      maxLength={maxLength}
      data-state={filled ? "filled" : undefined}
      className={cn("lm-otp-slot", className)}
      {...props}
    />
  )
);
LumoraOtpSlot.displayName = "LumoraOtpSlot";

// -- Number input ----------------------------------------------------
export type LumoraNumberInputProps = Omit<InputProps, "type"> & {
  onIncrement?: () => void;
  onDecrement?: () => void;
};
export const LumoraNumberInput = React.forwardRef<HTMLInputElement, LumoraNumberInputProps>(
  ({ className, onIncrement, onDecrement, ...props }, ref) => (
    <div className={cn("lm-number-input", className)}>
      <button type="button" aria-label="Decrement" onClick={onDecrement}>
        −
      </button>
      <input ref={ref} type="number" inputMode="numeric" {...props} />
      <button type="button" aria-label="Increment" onClick={onIncrement}>
        +
      </button>
    </div>
  )
);
LumoraNumberInput.displayName = "LumoraNumberInput";

// -- Carousel --------------------------------------------------------
export const LumoraCarousel = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      className={cn("lm-carousel", className)}
      {...props}
    />
  )
);
LumoraCarousel.displayName = "LumoraCarousel";

export const LumoraCarouselTrack = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-carousel-track", className)} {...props} />
  )
);
LumoraCarouselTrack.displayName = "LumoraCarouselTrack";

export const LumoraCarouselItem = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-carousel-item", className)} {...props} />
  )
);
LumoraCarouselItem.displayName = "LumoraCarouselItem";

export const LumoraCarouselDots = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-carousel-dots", className)} {...props} />
  )
);
LumoraCarouselDots.displayName = "LumoraCarouselDots";

export type LumoraCarouselDotProps = ButtonProps & { selected?: boolean };
export const LumoraCarouselDot = React.forwardRef<HTMLButtonElement, LumoraCarouselDotProps>(
  ({ className, selected, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-selected={selected}
      className={cn("lm-carousel-dot", className)}
      {...props}
    />
  )
);
LumoraCarouselDot.displayName = "LumoraCarouselDot";

// -- Split pane ------------------------------------------------------
export type LumoraSplitProps = DivProps & { orientation?: "horizontal" | "vertical" };
export const LumoraSplit = React.forwardRef<HTMLDivElement, LumoraSplitProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("lm-split", orientation === "vertical" && "lm-split-vertical", className)}
      {...props}
    />
  )
);
LumoraSplit.displayName = "LumoraSplit";

export type LumoraSplitHandleProps = DivProps & {
  orientation?: "horizontal" | "vertical";
};
export const LumoraSplitHandle = React.forwardRef<HTMLDivElement, LumoraSplitHandleProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn("lm-split-handle", className)}
      {...props}
    />
  )
);
LumoraSplitHandle.displayName = "LumoraSplitHandle";

// -- Diff ------------------------------------------------------------
export const LumoraDiff = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-diff", className)} {...props} />
  )
);
LumoraDiff.displayName = "LumoraDiff";

export type LumoraDiffLineProps = DivProps & {
  variant?: "context" | "add" | "remove" | "meta";
};
export const LumoraDiffLine = React.forwardRef<HTMLDivElement, LumoraDiffLineProps>(
  ({ className, variant = "context", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "lm-diff-line",
        variant === "add" && "lm-diff-line-add",
        variant === "remove" && "lm-diff-line-remove",
        variant === "meta" && "lm-diff-line-meta",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
);
LumoraDiffLine.displayName = "LumoraDiffLine";

// -- Sparkline -------------------------------------------------------
export type LumoraSparklineProps = React.SVGAttributes<SVGSVGElement> & {
  values: number[];
  showArea?: boolean;
};
export const LumoraSparkline = React.forwardRef<SVGSVGElement, LumoraSparklineProps>(
  ({ className, values, showArea = true, viewBox = "0 0 100 30", ...props }, ref) => {
    if (values.length < 2) return null;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const w = 100;
    const h = 30;
    const points = values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    const linePath = `M ${points.split(" ").join(" L ")}`;
    const areaPath = `M 0,${h} L ${points.split(" ").join(" L ")} L ${w},${h} Z`;
    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        preserveAspectRatio="none"
        className={cn("lm-sparkline", className)}
        {...props}
      >
        {showArea && <path className="lm-sparkline-area" d={areaPath} />}
        <path className="lm-sparkline-line" d={linePath} />
      </svg>
    );
  }
);
LumoraSparkline.displayName = "LumoraSparkline";

// -- Inbox -----------------------------------------------------------
export const LumoraInbox = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="log" aria-live="polite" className={cn("lm-inbox", className)} {...props} />
  )
);
LumoraInbox.displayName = "LumoraInbox";

export const LumoraInboxHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-inbox-header", className)} {...props} />
  )
);
LumoraInboxHeader.displayName = "LumoraInboxHeader";

export const LumoraInboxList = React.forwardRef<HTMLUListElement, UlProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("lm-inbox-list", className)} {...props} />
  )
);
LumoraInboxList.displayName = "LumoraInboxList";

export type LumoraInboxItemProps = LiProps & { unread?: boolean };
export const LumoraInboxItem = React.forwardRef<HTMLLIElement, LumoraInboxItemProps>(
  ({ className, unread, ...props }, ref) => (
    <li
      ref={ref}
      data-state={unread ? "unread" : undefined}
      className={cn("lm-inbox-item", className)}
      {...props}
    />
  )
);
LumoraInboxItem.displayName = "LumoraInboxItem";

// -- Divider ---------------------------------------------------------
export type LumoraDividerProps = DivProps & {
  orientation?: "horizontal" | "vertical";
};
export const LumoraDivider = React.forwardRef<HTMLDivElement, LumoraDividerProps>(
  ({ className, orientation = "horizontal", role = "separator", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation}
      className={cn(orientation === "vertical" ? "lm-divider-vertical" : "lm-divider", className)}
      {...props}
    />
  )
);
LumoraDivider.displayName = "LumoraDivider";

// -- Chat ------------------------------------------------------------
export const LumoraChat = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="log" aria-live="polite" className={cn("lm-chat", className)} {...props} />
  )
);
LumoraChat.displayName = "LumoraChat";

export type LumoraChatMessageProps = DivProps & { self?: boolean };
export const LumoraChatMessage = React.forwardRef<HTMLDivElement, LumoraChatMessageProps>(
  ({ className, self, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("lm-chat-message", self && "lm-chat-message-self", className)}
      {...props}
    />
  )
);
LumoraChatMessage.displayName = "LumoraChatMessage";

export const LumoraChatBubble = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-chat-bubble", className)} {...props} />
  )
);
LumoraChatBubble.displayName = "LumoraChatBubble";

// -- Mention ---------------------------------------------------------
export const LumoraMention = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("lm-mention", className)} {...props} />
  )
);
LumoraMention.displayName = "LumoraMention";

// -- Rich text toolbar -----------------------------------------------
export const LumoraRichTextToolbar = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="toolbar" className={cn("lm-rt-toolbar", className)} {...props} />
  )
);
LumoraRichTextToolbar.displayName = "LumoraRichTextToolbar";

export type LumoraRichTextButtonProps = ButtonProps & { pressed?: boolean };
export const LumoraRichTextButton = React.forwardRef<HTMLButtonElement, LumoraRichTextButtonProps>(
  ({ className, pressed, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      className={cn("lm-rt-button", className)}
      {...props}
    />
  )
);
LumoraRichTextButton.displayName = "LumoraRichTextButton";

// -- Scroll area -----------------------------------------------------
export const LumoraScrollArea = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-scroll-area", className)} {...props} />
  )
);
LumoraScrollArea.displayName = "LumoraScrollArea";

// -- Page header / Filter bar / Toolbars -----------------------------
export const LumoraPageHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-page-header", className)} {...props} />
  )
);
LumoraPageHeader.displayName = "LumoraPageHeader";

export const LumoraCommandBar = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-command-bar", className)} {...props} />
  )
);
LumoraCommandBar.displayName = "LumoraCommandBar";

export const LumoraFilterBar = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-filter-bar", className)} {...props} />
  )
);
LumoraFilterBar.displayName = "LumoraFilterBar";

export const LumoraBulkBar = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("lm-bulk-bar", className)} {...props} />
  )
);
LumoraBulkBar.displayName = "LumoraBulkBar";

// ============================================================
// Aliases for ergonomic usage
// ============================================================
export const Tabs = Object.assign(LumoraTabs, { Trigger: LumoraTab });
export const Card = LumoraCard;
export const Modal = LumoraModal;
export const Table = LumoraTable;
