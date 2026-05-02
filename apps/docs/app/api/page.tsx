import { lumoraThemes, requiredThemeTokens } from "@lumora-design/themes";
import Link from "next/link";
import { DocsFooter } from "../../components/footer";
import { DocsNav } from "../../components/docs-nav";
import { categoryOrder, componentCatalog, componentsByCategory } from "../../lib/catalog";

export const metadata = {
  title: "API reference — Lumora UI",
  description:
    "Every Lumora UI class, prop, theme token, and CSS variable in one searchable reference."
};

export default function ApiReferencePage() {
  const totalClasses = componentCatalog.reduce((sum, c) => sum + c.classes.length, 0);
  const totalProps = componentCatalog.reduce((sum, c) => sum + c.props.length, 0);

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <aside className="lm-sidebar h-fit lg:sticky lg:top-24">
          <span className="lm-sidebar-section">API</span>
          <a className="lm-sidebar-item" href="#tokens">
            Theme tokens
          </a>
          <a className="lm-sidebar-item" href="#themes">
            Themes
          </a>
          <a className="lm-sidebar-item" href="#classes">
            CSS classes
          </a>
          <a className="lm-sidebar-item" href="#props">
            Component props
          </a>
          <span className="lm-sidebar-section">Resources</span>
          <Link className="lm-sidebar-item" href="/components">
            Components
          </Link>
          <Link className="lm-sidebar-item" href="/templates">
            Templates
          </Link>
          <Link className="lm-sidebar-item" href="/docs/installation">
            Installation
          </Link>
        </aside>

        <div className="grid min-w-0 gap-12">
          <header className="grid gap-3">
            <span className="docs-section-eyebrow">API reference</span>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              <span className="docs-headline">Every class.</span>{" "}
              <span className="docs-accent-text">Every token.</span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--lm-color-muted)]">
              Searchable reference for the Lumora design system contract. {totalClasses}+ classes,{" "}
              {totalProps}+ React props, {requiredThemeTokens.length} tokens, and{" "}
              {lumoraThemes.length} themes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="lm-badge lm-badge-soft">{componentCatalog.length} components</span>
              <span className="lm-badge lm-badge-soft">{totalClasses} classes</span>
              <span className="lm-badge lm-badge-soft">{totalProps} props</span>
              <span className="lm-badge lm-badge-soft">
                {requiredThemeTokens.length} design tokens
              </span>
              <span className="lm-badge lm-badge-soft">{lumoraThemes.length} themes</span>
            </div>
          </header>

          {/* Tokens */}
          <section id="tokens" className="grid gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="docs-headline">Theme tokens</span>{" "}
              <span className="text-base font-medium text-[var(--lm-color-muted)]">
                · {requiredThemeTokens.length}
              </span>
            </h2>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Every token is exposed as a CSS variable on{" "}
              <code className="lm-code">[data-lm-theme="…"]</code>. Override per-tenant by setting
              the data attribute on any ancestor.
            </p>
            <div className="docs-feature-card overflow-hidden">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>CSS variable</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {requiredThemeTokens.map((token) => {
                    const isColor = token.startsWith("color-");
                    const isShadow = token.startsWith("shadow-");
                    const isRadius = token.startsWith("radius-");
                    const isMotion = token.startsWith("ease-") || token.startsWith("duration-");
                    return (
                      <tr key={token}>
                        <td>
                          <strong className="text-sm">{token}</strong>
                        </td>
                        <td>
                          <code className="lm-code">--lm-{token}</code>
                        </td>
                        <td>
                          <span className="lm-badge lm-badge-soft text-xs">
                            {isColor
                              ? "color"
                              : isShadow
                                ? "shadow"
                                : isRadius
                                  ? "radius"
                                  : isMotion
                                    ? "motion"
                                    : "scalar"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Themes */}
          <section id="themes" className="grid gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="docs-headline">Built-in themes</span>{" "}
              <span className="text-base font-medium text-[var(--lm-color-muted)]">
                · {lumoraThemes.length}
              </span>
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {lumoraThemes.map((theme) => (
                <div
                  key={theme.name}
                  data-lm-theme={theme.name}
                  className="lm-card"
                  style={{ background: "var(--lm-color-surface)" }}
                >
                  <div className="lm-card-body grid gap-3">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm">{theme.label}</strong>
                      <span className="lm-badge lm-badge-soft text-xs">{theme.mode}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[
                        "var(--lm-color-primary)",
                        "var(--lm-color-accent)",
                        "var(--lm-color-success)",
                        "var(--lm-color-warning)",
                        "var(--lm-color-danger)"
                      ].map((c, i) => (
                        <span key={i} className="h-6 flex-1 rounded-md" style={{ background: c }} />
                      ))}
                    </div>
                    <code className="lm-code text-xs">data-lm-theme="{theme.name}"</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Classes */}
          <section id="classes" className="grid gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="docs-headline">CSS classes</span>{" "}
              <span className="text-base font-medium text-[var(--lm-color-muted)]">
                · {totalClasses}
              </span>
            </h2>
            <p className="text-sm text-[var(--lm-color-muted)]">
              Every class organized by component category. Click a component for full details.
            </p>
            {categoryOrder.map((category) => {
              const components =
                componentsByCategory.find((c) => c.category === category)?.components ?? [];
              if (components.length === 0) return null;
              return (
                <div key={category} className="docs-feature-card overflow-hidden">
                  <div className="border-b border-[var(--lm-color-border)] bg-[var(--lm-color-surface-raised)] px-5 py-3">
                    <strong>{category}</strong>{" "}
                    <span className="text-xs text-[var(--lm-color-muted)]">
                      · {components.length} component{components.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <table className="lm-table">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Class</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components.flatMap((component) =>
                        component.classes.map((cls) => (
                          <tr key={`${component.slug}-${cls.name}`}>
                            <td>
                              <Link
                                className="text-[var(--lm-color-primary)] underline"
                                href={`/components/${component.slug}`}
                              >
                                {component.name}
                              </Link>
                            </td>
                            <td>
                              <code className="lm-code">{cls.name}</code>
                            </td>
                            <td className="text-sm text-[var(--lm-color-muted)]">
                              {cls.description}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>

          {/* Props summary */}
          <section id="props" className="grid gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="docs-headline">React props</span>{" "}
              <span className="text-base font-medium text-[var(--lm-color-muted)]">
                · {totalProps}
              </span>
            </h2>
            <div className="docs-feature-card overflow-hidden">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {componentCatalog.flatMap((component) =>
                    component.props.map((prop) => (
                      <tr key={`${component.slug}-${prop.name}`}>
                        <td>
                          <Link
                            className="text-[var(--lm-color-primary)] underline"
                            href={`/components/${component.slug}`}
                          >
                            {component.name}
                          </Link>
                        </td>
                        <td>
                          <code className="lm-code">{prop.name}</code>
                        </td>
                        <td>
                          <code className="lm-code text-xs">{prop.type}</code>
                        </td>
                        <td>
                          {prop.default ? (
                            <code className="lm-code text-xs">{prop.default}</code>
                          ) : (
                            <span className="text-[var(--lm-color-muted)]">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}
