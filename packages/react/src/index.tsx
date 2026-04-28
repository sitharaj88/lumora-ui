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

export const Tabs = Object.assign(LumoraTabs, { Trigger: LumoraTab });
export const Card = LumoraCard;
export const Modal = LumoraModal;
export const Table = LumoraTable;
