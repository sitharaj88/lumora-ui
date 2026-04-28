import Link from "next/link";
import { DocsFooter } from "../../components/footer";
import { DocsNav } from "../../components/docs-nav";
import { templates } from "../../lib/templates";

export const metadata = {
  title: "Templates — Lumora UI",
  description:
    "Production-grade Lumora UI templates: admin dashboard, billing, settings, kanban, auth, marketing."
};

export default function TemplatesPage() {
  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16">
        <div className="grid max-w-3xl gap-4">
          <span className="docs-section-eyebrow">Templates</span>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            <span className="docs-headline">Ship in a day.</span>{" "}
            <span className="docs-accent-text">Not a quarter.</span>
          </h1>
          <p className="text-lg leading-8 text-[var(--lm-color-muted)]">
            Composed page-level templates that drop into any Tailwind v4 project. Copy the markup,
            wire your data, ship to production.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <Link
              href={`/templates/${tpl.slug}`}
              key={tpl.slug}
              className="docs-feature-card overflow-hidden no-underline"
            >
              <div
                className="docs-preview"
                style={{
                  borderRadius: 0,
                  border: 0,
                  borderBottom: "1px solid var(--lm-color-border)",
                  minHeight: "12rem"
                }}
              >
                <div className="grid gap-2 text-center">
                  <strong className="text-base text-[var(--lm-color-text)]">{tpl.name}</strong>
                  {tpl.preview}
                </div>
              </div>
              <div className="grid gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="docs-section-eyebrow">{tpl.category}</span>
                  <span className="text-xs text-[var(--lm-color-muted)]">
                    {tpl.componentsUsed.length} components
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--lm-color-text)]">{tpl.name}</h3>
                <p className="line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                  {tpl.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tpl.highlights.slice(0, 3).map((h) => (
                    <span className="lm-badge lm-badge-soft text-xs" key={h}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <DocsFooter />
    </main>
  );
}
