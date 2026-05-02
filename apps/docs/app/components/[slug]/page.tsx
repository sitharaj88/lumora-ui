import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailToc } from "../../../components/detail-toc";
import { DocsFooter } from "../../../components/footer";
import { DocsNav } from "../../../components/docs-nav";
import { FrameworkTabs } from "../../../components/framework-tabs";
import { componentCatalog, componentsByCategory, getCatalogEntry } from "../../../lib/catalog";

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

  const toc = [
    { id: "preview", label: "Live preview" },
    ...(component.variants && component.variants.length > 0
      ? [{ id: "variants", label: "Variants & states" }]
      : []),
    { id: "usage", label: "Usage" },
    { id: "classes", label: `CSS classes (${component.classes.length})` },
    ...(component.props.length > 0
      ? [{ id: "props", label: `React props (${component.props.length})` }]
      : []),
    { id: "a11y", label: "Accessibility" },
    ...(sameCategory.length > 0 ? [{ id: "related", label: "Related" }] : [])
  ];

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[14rem_minmax(0,1fr)_12rem]">
        {/* Left: category sidebar */}
        <aside
          className="lm-sidebar h-fit lg:sticky lg:top-24"
          aria-label={`${component.category} components`}
        >
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

        {/* Center: content */}
        <div className="grid min-w-0 gap-12">
          <header className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link
                href="/components"
                className="text-[var(--lm-color-muted)] hover:text-[var(--lm-color-text)]"
              >
                Components
              </Link>
              <span aria-hidden className="text-[var(--lm-color-muted)]">
                /
              </span>
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

          {/* Live preview — showcase */}
          <section id="preview" className="grid gap-3 scroll-mt-24">
            <h2 className="docs-section-eyebrow">Live preview</h2>
            <div className="docs-feature-card overflow-hidden">
              <div
                className="docs-preview docs-preview-hero"
                style={{ minHeight: "22rem", padding: "2.5rem" }}
              >
                <div className="w-full">{component.preview}</div>
              </div>
            </div>
          </section>

          {/* Variants */}
          {component.variants && component.variants.length > 0 && (
            <section id="variants" className="grid gap-3 scroll-mt-24">
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
                        minHeight: "11rem",
                        borderRadius: 0,
                        border: 0,
                        padding: "1.75rem"
                      }}
                    >
                      <div className="w-full">{variant.preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Usage / code */}
          <section id="usage" className="grid gap-3 scroll-mt-24">
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

          {/* Classes */}
          <section id="classes" className="grid gap-3 scroll-mt-24">
            <h2 className="docs-section-eyebrow">CSS classes ({component.classes.length})</h2>
            <div className="docs-feature-card overflow-x-auto">
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

          {/* Props */}
          {component.props.length > 0 && (
            <section id="props" className="grid gap-3 scroll-mt-24">
              <h2 className="docs-section-eyebrow">React props ({component.props.length})</h2>
              <div className="docs-feature-card overflow-x-auto">
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
                        <td>
                          {prop.description ?? (
                            <span className="text-[var(--lm-color-muted)]">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Accessibility */}
          <section id="a11y" className="grid gap-3 scroll-mt-24">
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
            <section id="related" className="grid gap-3 scroll-mt-24">
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

          <p className="text-xs text-[var(--lm-color-muted)]">
            Spotted something wrong?{" "}
            <a
              className="underline hover:text-[var(--lm-color-text)]"
              href={`https://github.com/sitharaj88/lumora-ui/edit/main/apps/docs/lib/catalog.tsx`}
              target="_blank"
              rel="noreferrer"
            >
              Edit this entry on GitHub
            </a>
            .
          </p>
        </div>

        {/* Right: TOC */}
        <aside className="hidden h-fit lg:sticky lg:top-24 lg:block">
          <DetailToc items={toc} />
        </aside>
      </section>

      <DocsFooter />
    </main>
  );
}
