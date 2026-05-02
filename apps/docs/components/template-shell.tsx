import Link from "next/link";
import type { ReactNode } from "react";
import type { TemplateMeta, TemplatePageMeta } from "../lib/templates-registry";

const NAVBAR_HEIGHT = "4rem";

export function TemplateShell({
  template,
  activePath,
  children
}: {
  template: TemplateMeta;
  activePath: string;
  children: ReactNode;
}) {
  const groups = groupPages(template.pages);
  const activePage = template.pages.find((p) => p.path === activePath);
  const accent = template.accent ?? "var(--lm-color-primary)";
  const accentSoft = `color-mix(in oklab, ${accent} 14%, var(--lm-color-surface))`;
  const accentMid = `color-mix(in oklab, ${accent} 30%, var(--lm-color-border))`;

  // For detail pages (hidden from nav), pick the visible nav item whose path is
  // the longest prefix of the active path. This keeps "Accounts" highlighted
  // when you're viewing /accounts/<id>.
  const visibleItems = groups.flatMap((g) => g.items);
  const activeItemPath =
    visibleItems
      .map((item) => item.path)
      .filter((p) => activePath === p || activePath.startsWith(p ? `${p}/` : ""))
      .sort((a, b) => b.length - a.length)[0] ?? "";

  return (
    <div
      style={{
        background: "var(--lm-color-bg)",
        color: "var(--lm-color-text)",
        minHeight: "100dvh",
        // Expose template accent as a CSS variable so child components can use it.
        ["--lm-template-accent" as string]: accent
      }}
    >
      {/* Topbar */}
      <header
        className="lm-navbar"
        style={{
          position: "sticky",
          top: 0,
          height: NAVBAR_HEIGHT,
          minHeight: NAVBAR_HEIGHT,
          zIndex: 30
        }}
      >
        <div className="lm-navbar-brand">
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background: `linear-gradient(135deg, ${accent}, var(--lm-color-accent))`
            }}
            aria-hidden="true"
          >
            {template.productInitial}
          </span>
          <strong className="text-base font-bold tracking-tight">
            {template.productName}
          </strong>
          <span className="lm-badge lm-badge-soft hidden sm:inline-flex text-xs">
            {template.category}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="lm-btn lm-btn-ghost lm-btn-sm hidden sm:inline-flex items-center gap-2"
            aria-label="Search"
          >
            <span className="text-[var(--lm-color-muted)] text-xs">Search</span>
            <span className="lm-kbd">⌘</span>
            <span className="lm-kbd">K</span>
          </button>
          <Link
            href="/templates"
            className="lm-btn lm-btn-ghost lm-btn-sm"
            title="Back to template gallery"
          >
            ← Templates
          </Link>
          <span
            className="lm-avatar lm-avatar-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--lm-color-accent), var(--lm-color-info))"
            }}
            aria-label="Demo user"
          >
            AL
          </span>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "16rem minmax(0, 1fr)",
          minHeight: `calc(100dvh - ${NAVBAR_HEIGHT})`
        }}
      >
        {/* Sidebar — sticky, scrollable, promo pinned to bottom via flex */}
        <aside
          style={{
            position: "sticky",
            top: NAVBAR_HEIGHT,
            height: `calc(100dvh - ${NAVBAR_HEIGHT})`,
            overflowY: "auto",
            background: "var(--lm-color-surface)",
            borderRight: "1px solid var(--lm-color-border)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Nav items grow — `aria-label` on the <nav> exposes a navigation
              landmark with the right accessible name. The wrapping <aside>
              keeps a complementary landmark for the promo card. */}
          <nav
            aria-label="Template navigation"
            style={{
              padding: "1rem 0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
              flex: "1 1 auto"
            }}
          >
            {groups.map((group, gi) => (
              <div
                key={group.title ?? `group-${gi}`}
                style={{ display: "grid", gap: "0.125rem" }}
              >
                {group.title && (
                  <span
                    className="lm-sidebar-section"
                    style={{
                      padding: "0.5rem 0.75rem 0.375rem",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "var(--lm-color-muted)"
                    }}
                  >
                    {group.title}
                  </span>
                )}
                {group.items.map((item) => {
                  const href = `/preview/${template.slug}${item.path ? `/${item.path}` : ""}`;
                  const isActive = item.path === activeItemPath;
                  return (
                    <Link
                      key={item.path}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className="lm-sidebar-item"
                      style={
                        isActive
                          ? {
                              background: accentSoft,
                              color: accent,
                              fontWeight: 650,
                              boxShadow: `inset 2px 0 0 ${accent}`
                            }
                          : undefined
                      }
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flex: "0 0 auto",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "1rem",
                          height: "1rem",
                          color: isActive ? accent : "var(--lm-color-muted)"
                        }}
                      >
                        {item.icon ?? <DefaultIcon />}
                      </span>
                      <span
                        style={{
                          flex: "1 1 auto",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className="lm-badge lm-badge-soft text-xs"
                          style={{
                            flex: "0 0 auto",
                            fontVariantNumeric: "tabular-nums",
                            ...(isActive
                              ? {
                                  background: `color-mix(in oklab, ${accent} 22%, transparent)`,
                                  color: accent
                                }
                              : null)
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Promo pinned to bottom by flex column */}
          <div style={{ padding: "0.75rem", flex: "0 0 auto" }}>
            <div
              className="lm-card"
              style={{
                background: `linear-gradient(135deg, ${accentSoft}, var(--lm-color-surface))`,
                borderColor: accentMid
              }}
            >
              <div
                className="lm-card-body"
                style={{ display: "grid", gap: "0.5rem", padding: "0.875rem" }}
              >
                <strong className="text-sm">Template preview</strong>
                <p className="lm-hint text-xs">
                  Built with Lumora UI. Copy the markup, wire your data, ship.
                </p>
                <Link
                  className="lm-btn lm-btn-sm"
                  href={`/templates/${template.slug}`}
                  style={{
                    background: accent,
                    borderColor: accent,
                    color: "var(--lm-color-primary-fg)",
                    backgroundImage: `linear-gradient(180deg, color-mix(in oklab, ${accent} 92%, white), ${accent})`
                  }}
                >
                  View source
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <main
          className="lm-app-main"
          style={{ minWidth: 0, display: "grid", gap: "1.5rem", padding: "1.5rem" }}
        >
          {/* Breadcrumbs */}
          <nav
            className="lm-breadcrumbs"
            aria-label="Breadcrumb"
            style={{ marginBottom: "0.25rem" }}
          >
            <Link href="/templates">Templates</Link>
            <span aria-hidden>/</span>
            <Link href={`/preview/${template.slug}`}>{template.productName}</Link>
            {activePath && (
              <>
                <span aria-hidden>/</span>
                <span aria-current="page">{activePage?.label ?? activePath}</span>
              </>
            )}
          </nav>

          {children}
        </main>
      </div>
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function groupPages(pages: TemplatePageMeta[]) {
  const visible = pages.filter((p) => !p.hideFromNav);
  const grouped = new Map<string | undefined, TemplatePageMeta[]>();
  for (const page of visible) {
    const key = page.section;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(page);
  }
  return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }));
}
