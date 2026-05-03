import Link from "next/link";
import type { ReactNode } from "react";
import { DocsFooter } from "./footer";
import { DocsNav } from "./docs-nav";

export type DocsTocItem = {
  id: string;
  label: string;
};

export type DocsNavItem = {
  href: string;
  label: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavSection[] = [
  {
    title: "Get started",
    items: [
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/tokens", label: "Design tokens" },
      { href: "/docs/migration", label: "Versioning" }
    ]
  },
  {
    title: "Reference",
    items: [
      { href: "/components", label: "Components" },
      { href: "/templates", label: "Templates" },
      { href: "/api", label: "API reference" },
      { href: "/accessibility", label: "Accessibility" }
    ]
  }
];

export function DocsLayout({
  current,
  title,
  eyebrow,
  description,
  toc,
  children,
  next,
  prev
}: {
  current: string;
  title: string;
  eyebrow?: string;
  description?: string;
  toc?: DocsTocItem[];
  children: ReactNode;
  next?: { href: string; label: string };
  prev?: { href: string; label: string };
}) {
  const hasToc = toc && toc.length > 0;
  const cols = hasToc
    ? "lg:grid-cols-[16rem_minmax(0,1fr)_15rem]"
    : "lg:grid-cols-[16rem_minmax(0,1fr)]";

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section
        className={`mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:gap-10 ${cols}`}
      >
        {/* Sidebar — full size on lg+, collapsible on mobile */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">
          <nav aria-label="Documentation" className="lm-sidebar">
            {docsNavigation.map((section) => (
              <div key={section.title} className="grid gap-0.5">
                <span className="lm-sidebar-section">{section.title}</span>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="lm-sidebar-item"
                    aria-current={item.href === current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <details className="docs-feature-card lg:hidden">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium">
            Documentation menu
          </summary>
          <nav
            aria-label="Documentation"
            className="lm-sidebar border-t border-[var(--lm-color-border)]"
            style={{ borderRadius: 0 }}
          >
            {docsNavigation.map((section) => (
              <div key={section.title} className="grid gap-0.5">
                <span className="lm-sidebar-section">{section.title}</span>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="lm-sidebar-item"
                    aria-current={item.href === current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </details>

        {/* Content */}
        <article className="grid min-w-0 gap-10">
          <header className="grid gap-3 border-b border-[var(--lm-color-border)] pb-8">
            {eyebrow && <span className="docs-section-eyebrow">{eyebrow}</span>}
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              <span className="docs-headline">{title}</span>
            </h1>
            {description && (
              <p className="max-w-3xl text-lg leading-8 text-[var(--lm-color-muted)]">
                {description}
              </p>
            )}
          </header>

          <div className="grid gap-12">{children}</div>

          {(prev || next) && (
            <nav
              className="grid gap-4 border-t border-[var(--lm-color-border)] pt-8 sm:grid-cols-2"
              aria-label="Page navigation"
            >
              {prev ? (
                <Link href={prev.href} className="docs-feature-card grid gap-1 p-5 no-underline">
                  <span className="text-xs text-[var(--lm-color-muted)]">← Previous</span>
                  <strong className="text-[var(--lm-color-text)]">{prev.label}</strong>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="docs-feature-card grid gap-1 p-5 text-right no-underline"
                >
                  <span className="text-xs text-[var(--lm-color-muted)]">Next →</span>
                  <strong className="text-[var(--lm-color-text)]">{next.label}</strong>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>

        {/* On this page */}
        {hasToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <span className="docs-section-eyebrow mb-3 inline-flex">On this page</span>
              <ul className="grid gap-1.5 border-l border-[var(--lm-color-border)] pl-3 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-[var(--lm-color-muted)] transition-colors hover:text-[var(--lm-color-text)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </section>

      <DocsFooter />
    </main>
  );
}

// ============================================================
// Prose helpers — used inside docs pages for consistent typography
// ============================================================
export function DocsSection({
  id,
  title,
  level = 2,
  children
}: {
  id: string;
  title: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  const sizeClass =
    level === 2 ? "text-2xl font-bold tracking-tight" : "text-lg font-bold tracking-tight";
  return (
    <section id={id} className="grid gap-4 scroll-mt-24">
      <Tag className={sizeClass}>
        <span className="docs-headline">{title}</span>
      </Tag>
      {children}
    </section>
  );
}

export function DocsParagraph({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-base leading-7 text-[var(--lm-color-muted)]">{children}</p>;
}

export function DocsList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-2 text-base leading-7 text-[var(--lm-color-muted)]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="lm-badge lm-badge-success lm-badge-dot mt-2 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-[var(--lm-color-text)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DocsCallout({
  tone = "info",
  title,
  children
}: {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`lm-alert lm-alert-${tone}`}>
      <span aria-hidden="true">
        {tone === "warning" ? "!" : tone === "danger" ? "✕" : tone === "success" ? "✓" : "i"}
      </span>
      <div>
        {title && <p className="lm-alert-title">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function DocsCode({
  filename,
  code,
  lang
}: {
  filename?: string;
  code: string;
  lang?: string;
}) {
  return (
    <div className="docs-code-window">
      <div className="docs-code-window-header">
        <span className="docs-code-window-dot" />
        <span className="docs-code-window-dot" />
        <span className="docs-code-window-dot" />
        {filename && <span className="ml-2 text-xs text-[var(--lm-color-muted)]">{filename}</span>}
        {lang && (
          <span className="ml-auto text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            {lang}
          </span>
        )}
      </div>
      <pre className="docs-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DocsKeyTable({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <div className="docs-feature-card overflow-hidden">
      <table className="lm-table">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="w-1/3">
                <strong>{row.label}</strong>
              </td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
