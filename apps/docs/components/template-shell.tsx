import Link from "next/link";
import type { ReactNode } from "react";
import type { TemplateMeta, TemplatePageMeta } from "../lib/templates-registry";

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

  return (
    <div
      className="lm-app-shell"
      style={
        {
          background: "var(--lm-color-bg)",
          minHeight: "100dvh"
        } as React.CSSProperties
      }
    >
      {/* Topbar */}
      <header className="lm-navbar" style={{ position: "sticky", top: 0 }}>
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

      <div className="lm-app-shell-sidebar">
        {/* Sidebar */}
        <aside className="lm-sidebar" aria-label="Template navigation">
          {groups.map((group) => (
            <div key={group.title ?? "default"} className="grid gap-0.5">
              {group.title && <span className="lm-sidebar-section">{group.title}</span>}
              {group.items.map((item) => {
                const href = `/preview/${template.slug}${item.path ? `/${item.path}` : ""}`;
                const isActive = item.path === activePath;
                return (
                  <Link
                    key={item.path}
                    href={href}
                    className="lm-sidebar-item"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto lm-badge lm-badge-soft text-xs">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="mt-auto pt-6">
            <div
              className="lm-card"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 14%, var(--lm-color-surface)), var(--lm-color-surface))`,
                borderColor: `color-mix(in oklab, ${accent} 30%, var(--lm-color-border))`
              }}
            >
              <div className="lm-card-body grid gap-2 p-4">
                <strong className="text-sm">This is a template preview</strong>
                <p className="lm-hint text-xs">
                  Built with Lumora UI. Copy the markup, wire your data, ship to
                  production.
                </p>
                <Link
                  className="lm-btn lm-btn-primary lm-btn-sm"
                  href={`/templates/${template.slug}`}
                >
                  View source
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <main className="lm-app-main">
          {/* Breadcrumbs */}
          <nav
            className="lm-breadcrumbs"
            aria-label="Breadcrumb"
            style={{ marginBottom: "1rem" }}
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
