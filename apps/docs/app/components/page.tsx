import { ComponentsBrowser } from "../../components/components-browser";
import { DocsNav } from "../../components/docs-nav";
import { DocsFooter } from "../../components/footer";
import {
  categoryOrder,
  componentCatalog,
  componentsByCategory,
  totalComponentCount
} from "../../lib/catalog";

export const metadata = {
  title: "Components — Lumora UI",
  description: `Browse all ${totalComponentCount} Lumora UI components with live previews, classes, props, and accessibility guidance.`
};

export default function ComponentsPage() {
  const cards = componentCatalog.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description,
    status: c.status,
    classCount: c.classes.length,
    propCount: c.props.length,
    preview: c.preview
  }));

  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pt-16 pb-8">
        <div className="grid max-w-3xl gap-4">
          <span className="docs-section-eyebrow">Component catalog</span>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            <span className="docs-headline">{totalComponentCount} components.</span>{" "}
            <span className="docs-accent-text">All in one page.</span>
          </h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">
            Every Lumora UI primitive with live previews, the exact classes you need, props for the
            React adapter, and accessibility notes you can copy into an audit.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Components" value={totalComponentCount} />
            <Stat label="Categories" value={componentsByCategory.filter((c) => c.components.length).length} />
            <Stat
              label="Stable adapters"
              value={componentCatalog.filter((c) => c.reactExample && c.vueExample).length}
            />
            <Stat
              label="WCAG AA verified"
              value={`${componentCatalog.filter((c) => c.accessibility.length > 0).length}`}
            />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <ComponentsBrowser cards={cards} categories={[...categoryOrder]} />
      </section>

      <DocsFooter />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">{label}</dt>
      <dd className="text-2xl font-semibold tracking-tight tabular-nums">{value}</dd>
    </div>
  );
}
