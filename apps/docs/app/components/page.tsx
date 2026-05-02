import Link from "next/link";
import { ComponentsBrowser } from "../../components/components-browser";
import { DocsNav } from "../../components/docs-nav";
import { DocsFooter } from "../../components/footer";
import {
  categoryOrder,
  componentCatalog,
  componentsByCategory,
  totalComponentCount,
  type ComponentCategory
} from "../../lib/catalog";

export const metadata = {
  title: "Components — Lumora UI",
  description: `Browse all ${totalComponentCount} Lumora UI components with live previews, classes, props, and accessibility guidance.`
};

const categoryAccent: Record<ComponentCategory, string> = {
  Action: "var(--lm-color-primary)",
  Form: "var(--lm-color-info)",
  Display: "var(--lm-color-accent)",
  Feedback: "var(--lm-color-warning)",
  Layout: "var(--lm-color-success)",
  Navigation: "var(--lm-color-primary)",
  Overlay: "var(--lm-color-accent)",
  Disclosure: "var(--lm-color-info)",
  Data: "var(--lm-color-primary)",
  Media: "var(--lm-color-warning)",
  Pattern: "var(--lm-color-success)"
};

const FEATURED_SLUGS = ["button", "command", "modal", "table"];

export default function ComponentsPage() {
  const cards = componentCatalog.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description,
    status: c.status,
    classCount: c.classes.length,
    propCount: c.props.length,
    accent: categoryAccent[c.category],
    preview: c.preview
  }));

  const featured = FEATURED_SLUGS.map((slug) =>
    componentCatalog.find((c) => c.slug === slug)
  ).filter((c): c is (typeof componentCatalog)[number] => !!c);

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      {/* Hero */}
      <section className="docs-aurora mx-auto grid max-w-7xl gap-8 px-6 pb-10 pt-16">
        <div className="grid max-w-3xl gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="docs-section-eyebrow">Component catalog</span>
            <span className="lm-badge lm-badge-soft text-xs">
              v0.2 · {totalComponentCount} components
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            <span className="docs-headline">Every primitive your team ships,</span>{" "}
            <span className="docs-accent-text">in one searchable catalog.</span>
          </h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">
            {totalComponentCount} components, 11 categories, both React + Vue adapters, and WCAG 2.1
            AA verified. Every entry ships with a live preview, the exact classes, props, and an
            accessibility checklist.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#catalog" className="lm-btn lm-btn-primary" data-anchor-cta>
              Browse the catalog
            </Link>
            <span className="docs-kbd-chip">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
              <span className="text-[var(--lm-color-muted)]">to search</span>
            </span>
            <Link
              href="/docs/installation"
              className="text-sm text-[var(--lm-color-muted)] underline-offset-4 hover:text-[var(--lm-color-text)] hover:underline"
            >
              Install in 60 seconds →
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Components" value={totalComponentCount} />
          <Stat
            label="Categories"
            value={componentsByCategory.filter((c) => c.components.length).length}
          />
          <Stat
            label="Stable adapters"
            value={componentCatalog.filter((c) => c.reactExample && c.vueExample).length}
          />
          <Stat
            label="WCAG AA verified"
            value={componentCatalog.filter((c) => c.accessibility.length > 0).length}
          />
        </dl>
      </section>

      {/* Featured strip */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-12">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="docs-section-eyebrow">Featured this release</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Marquee primitives
            </h2>
          </div>
          <Link
            href="#catalog"
            className="text-sm text-[var(--lm-color-muted)] hover:text-[var(--lm-color-text)]"
          >
            See all {totalComponentCount} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((c) => (
            <article
              key={c.slug}
              className="docs-featured-card relative grid gap-4 p-5"
              style={{ ["--lm-cat-color" as string]: categoryAccent[c.category] }}
            >
              <Link
                href={`/components/${c.slug}`}
                aria-label={`Open ${c.name}`}
                className="absolute inset-0 z-20 rounded-[inherit]"
              />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="grid gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--lm-color-muted)]">
                    {c.category}
                  </span>
                  <strong className="text-lg text-[var(--lm-color-text)]">{c.name}</strong>
                </div>
                {c.status === "new" && <span className="lm-badge lm-badge-soft text-xs">New</span>}
              </div>
              <div
                className="docs-preview pointer-events-none [&_*]:pointer-events-none"
                style={{ minHeight: "11rem", padding: "1.25rem" }}
                aria-hidden="true"
              >
                <div className="w-full">{c.preview}</div>
              </div>
              <p className="relative z-10 line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                {c.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-7xl px-6 pb-20 scroll-mt-24">
        <ComponentsBrowser cards={cards} categories={[...categoryOrder]} accent={categoryAccent} />
      </section>

      <DocsFooter />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="grid gap-1 border-l-2 border-[var(--lm-color-border)] pl-4">
      <dt className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">{label}</dt>
      <dd className="text-3xl font-semibold tracking-tight tabular-nums">{value}</dd>
    </div>
  );
}
