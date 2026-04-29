import Link from "next/link";
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

const categoryDescriptions: Record<string, string> = {
  Action: "Buttons, button groups, and toggle pickers.",
  Form: "Inputs, selects, sliders, calendars, and chip inputs.",
  Display: "Badges, tags, avatars, kbd, and code.",
  Feedback: "Alerts, toasts, banners, progress, and skeletons.",
  Layout: "Cards, app shells, and dividers.",
  Navigation: "Tabs, segmented, stepper, breadcrumbs, navbar, sidebar.",
  Overlay: "Modal, drawer, tooltip, popover, dropdown, command palette.",
  Disclosure: "Accordion and tree.",
  Data: "Tables, stats, sparklines, timelines, diff, inbox, empty.",
  Media: "Carousel, split pane, chat, mention, rich-text toolbar.",
  Pattern: "Composed enterprise toolbars: command bar, filter bar, bulk bar."
};

export default function ComponentsPage() {
  return (
    <main id="main-content" className="docs-shell relative min-h-screen">
      <div className="docs-grid-overlay" />
      <DocsNav />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16">
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
          <div className="flex flex-wrap items-center gap-2">
            {categoryOrder.map((category) => (
              <a
                className="lm-badge lm-badge-outline transition-transform hover:-translate-y-0.5"
                href={`#${category.toLowerCase()}`}
                key={category}
              >
                {category} ·{" "}
                {componentsByCategory.find((c) => c.category === category)?.components.length}
              </a>
            ))}
          </div>
        </div>
      </section>

      {componentsByCategory.map(({ category, components }) =>
        components.length === 0 ? null : (
          <section
            id={category.toLowerCase()}
            key={category}
            className="mx-auto max-w-7xl px-6 py-12"
          >
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="docs-section-eyebrow">{category}</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  <span className="docs-headline">{category}</span>{" "}
                  <span className="text-base font-medium text-[var(--lm-color-muted)]">
                    · {components.length} component{components.length === 1 ? "" : "s"}
                  </span>
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-[var(--lm-color-muted)]">
                  {categoryDescriptions[category]}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {components.map((component) => (
                <article
                  className="docs-feature-card relative flex flex-col gap-4 p-5"
                  key={component.slug}
                >
                  {/* Absolute-positioned link covers the whole card.
                      Sits above the preview so clicks anywhere navigate,
                      while preview content remains visually interactive. */}
                  <Link
                    href={`/components/${component.slug}`}
                    aria-label={`Open ${component.name} details`}
                    className="absolute inset-0 z-20 rounded-[inherit]"
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="grid gap-1">
                      <strong className="text-base text-[var(--lm-color-text)]">
                        {component.name}
                      </strong>
                      <span className="text-xs text-[var(--lm-color-muted)]">
                        {component.classes.length} classes · {component.props.length} props
                      </span>
                    </div>
                    {component.status === "new" && (
                      <span className="lm-badge lm-badge-soft text-xs">New</span>
                    )}
                    {component.status === "beta" && (
                      <span className="lm-badge lm-badge-warning text-xs">Beta</span>
                    )}
                  </div>
                  <div
                    className="docs-preview pointer-events-none [&_*]:pointer-events-none"
                    style={{ minHeight: "11rem", padding: "1rem" }}
                    aria-hidden="true"
                  >
                    <div className="w-full">{component.preview}</div>
                  </div>
                  <p className="relative z-10 line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                    {component.description}
                  </p>
                  <div className="relative z-10 mt-auto flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                    <span>View API & variants</span>
                    <span aria-hidden>→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      )}

      <DocsFooter />
    </main>
  );
}
