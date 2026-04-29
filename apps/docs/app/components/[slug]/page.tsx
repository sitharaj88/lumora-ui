import { notFound } from "next/navigation";
import Link from "next/link";
import { DocsFooter } from "../../../components/footer";
import { DocsNav } from "../../../components/docs-nav";
import { FrameworkTabs } from "../../../components/framework-tabs";
import {
  componentCatalog,
  componentsByCategory,
  getCatalogEntry
} from "../../../lib/catalog";

export function generateStaticParams() {
  return componentCatalog.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = getCatalogEntry(slug);
  return {
    title: component ? `${component.name} — Lumora UI` : "Component — Lumora UI",
    description: component?.description
  };
}

export default async function ComponentDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getCatalogEntry(slug);
  if (!component) notFound();

  const sameCategory = componentCatalog.filter(
    (c) => c.category === component.category && c.slug !== component.slug
  );

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <aside className="lm-sidebar h-fit lg:sticky lg:top-24">
          <Link className="lm-sidebar-item" href="/components">
            ← All components
          </Link>
          <span className="lm-sidebar-section">{component.category}</span>
          {componentsByCategory
            .find((c) => c.category === component.category)
            ?.components.map((c) => (
              <Link
                key={c.slug}
                className="lm-sidebar-item"
                href={`/components/${c.slug}`}
                aria-current={c.slug === component.slug ? "page" : undefined}
              >
                {c.name}
              </Link>
            ))}
        </aside>

        <div className="grid min-w-0 gap-10">
          {/* Header */}
          <header className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="docs-section-eyebrow">{component.category}</span>
              {component.status === "new" && (
                <span className="lm-badge lm-badge-soft">New in 0.2</span>
              )}
              {component.status === "stable" && (
                <span className="lm-badge lm-badge-success lm-badge-dot">Stable</span>
              )}
              {component.status === "beta" && (
                <span className="lm-badge lm-badge-warning">Beta</span>
              )}
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              <span className="docs-headline">{component.name}</span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--lm-color-muted)]">
              {component.description}
            </p>
          </header>

          {/* Live preview */}
          <section className="grid gap-3">
            <h2 className="docs-section-eyebrow">Live preview</h2>
            <div className="docs-feature-card overflow-hidden">
              <div
                className="docs-preview"
                style={{ minHeight: "16rem", padding: "2rem" }}
              >
                <div className="w-full">{component.preview}</div>
              </div>
            </div>
          </section>

          {/* Variants */}
          {component.variants && component.variants.length > 0 && (
            <section className="grid gap-3">
              <h2 className="docs-section-eyebrow">Variants & states</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {component.variants.map((variant) => (
                  <div className="docs-feature-card overflow-hidden" key={variant.label}>
                    <div className="border-b border-[var(--lm-color-border)] px-5 py-3">
                      <strong className="text-sm">{variant.label}</strong>
                    </div>
                    <div
                      className="docs-preview"
                      style={{
                        minHeight: "10rem",
                        borderRadius: 0,
                        border: 0,
                        padding: "1.5rem"
                      }}
                    >
                      <div className="w-full">{variant.preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Code — HTML / React / Vue tabs */}
          <section className="grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="docs-section-eyebrow">Usage</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[var(--lm-color-muted)]">Adapters:</span>
                <span
                  className={`lm-badge ${
                    component.reactExample ? "lm-badge-success lm-badge-dot" : "lm-badge-soft"
                  } text-xs`}
                >
                  React {component.reactExample ? "stable" : "v0.3"}
                </span>
                <span
                  className={`lm-badge ${
                    component.vueExample ? "lm-badge-success lm-badge-dot" : "lm-badge-soft"
                  } text-xs`}
                >
                  Vue {component.vueExample ? "stable" : "v0.3"}
                </span>
              </div>
            </div>
            <FrameworkTabs
              html={component.htmlExample}
              react={component.reactExample}
              vue={component.vueExample}
              reactStatus={component.reactAdapter ?? (component.reactExample ? "stable" : "v0.3")}
              vueStatus={component.vueAdapter ?? (component.vueExample ? "stable" : "v0.3")}
            />
          </section>

          {/* Classes table */}
          <section className="grid gap-3">
            <h2 className="docs-section-eyebrow">CSS classes ({component.classes.length})</h2>
            <div className="docs-feature-card overflow-hidden">
              <table className="lm-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {component.classes.map((cls) => (
                    <tr key={cls.name}>
                      <td>
                        <code className="lm-code">{cls.name}</code>
                      </td>
                      <td>{cls.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Props table */}
          {component.props.length > 0 && (
            <section className="grid gap-3">
              <h2 className="docs-section-eyebrow">React props ({component.props.length})</h2>
              <div className="docs-feature-card overflow-hidden">
                <table className="lm-table">
                  <thead>
                    <tr>
                      <th>Prop</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.props.map((prop) => (
                      <tr key={prop.name}>
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
                        <td>{prop.description ?? <span className="text-[var(--lm-color-muted)]">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Accessibility */}
          <section className="grid gap-3">
            <h2 className="docs-section-eyebrow">Accessibility</h2>
            <div className="docs-feature-card grid gap-3 p-6">
              <ul className="grid gap-3">
                {component.accessibility.map((item) => (
                  <li className="flex gap-3 text-sm" key={item}>
                    <span
                      className="lm-badge lm-badge-success lm-badge-dot mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[var(--lm-color-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Related */}
          {sameCategory.length > 0 && (
            <section className="grid gap-3">
              <h2 className="docs-section-eyebrow">Related in {component.category}</h2>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sameCategory.slice(0, 6).map((related) => (
                  <Link
                    key={related.slug}
                    href={`/components/${related.slug}`}
                    className="docs-feature-card grid gap-1 p-4 no-underline"
                  >
                    <strong className="text-sm text-[var(--lm-color-text)]">{related.name}</strong>
                    <span className="line-clamp-2 text-xs text-[var(--lm-color-muted)]">
                      {related.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}
