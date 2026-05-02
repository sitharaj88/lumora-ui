"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState, type ReactNode } from "react";

type BrowserCard = {
  slug: string;
  name: string;
  category: string;
  description: string;
  status: "stable" | "beta" | "new";
  classCount: number;
  propCount: number;
  preview: ReactNode;
};

const STATUSES = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "beta", label: "Beta" }
] as const;

type StatusFilter = (typeof STATUSES)[number]["id"];

export function ComponentsBrowser({
  cards,
  categories
}: {
  cards: BrowserCard[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<StatusFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return cards.filter((card) => {
      if (active.size > 0 && !active.has(card.category)) return false;
      if (status !== "all" && card.status !== status) return false;
      if (!q) return true;
      const haystack = `${card.name} ${card.description} ${card.category}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [cards, deferredQuery, active, status]);

  const grouped = useMemo(() => {
    const map = new Map<string, BrowserCard[]>();
    for (const c of filtered) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return categories
      .map((cat) => ({ category: cat, items: map.get(cat) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered, categories]);

  const toggleCategory = (cat: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const reset = () => {
    setQuery("");
    setActive(new Set());
    setStatus("all");
  };

  return (
    <div className="grid gap-8">
      <div className="docs-feature-card sticky top-20 z-30 grid gap-3 p-4 backdrop-blur-md md:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <label className="lm-input-group">
            <span className="lm-input-addon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              className="lm-input"
              placeholder={`Search ${cards.length} components by name, role, or description…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search components"
            />
          </label>
          <div
            className="lm-segmented"
            role="radiogroup"
            aria-label="Filter by status"
            style={{ width: "fit-content" }}
          >
            {STATUSES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={status === s.id}
                aria-pressed={status === s.id}
                className="lm-segmented-item"
                onClick={() => setStatus(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Categories
          </span>
          {categories.map((cat) => {
            const isOn = active.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                aria-pressed={isOn}
                className={
                  isOn
                    ? "lm-badge lm-badge-success lm-badge-dot"
                    : "lm-badge lm-badge-outline"
                }
                style={{ cursor: "pointer" }}
              >
                {cat}
              </button>
            );
          })}
          {(active.size > 0 || query || status !== "all") && (
            <button
              type="button"
              className="lm-btn lm-btn-ghost lm-btn-sm ml-auto"
              onClick={reset}
            >
              Reset
            </button>
          )}
        </div>

        <p className="text-xs text-[var(--lm-color-muted)]" aria-live="polite">
          Showing <strong className="text-[var(--lm-color-text)]">{filtered.length}</strong>{" "}
          of {cards.length} components
        </p>
      </div>

      {grouped.length === 0 ? (
        <div className="docs-feature-card grid place-items-center gap-2 p-12 text-center">
          <strong className="text-lg">No components match those filters</strong>
          <p className="text-sm text-[var(--lm-color-muted)]">
            Try a broader query or reset the filters.
          </p>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm" onClick={reset}>
            Reset filters
          </button>
        </div>
      ) : (
        grouped.map(({ category, items }) => (
          <section
            id={category.toLowerCase()}
            key={category}
            className="grid gap-5 scroll-mt-24"
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="docs-section-eyebrow">{category}</span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                  <span className="docs-headline">{category}</span>{" "}
                  <span className="text-base font-medium text-[var(--lm-color-muted)]">
                    · {items.length}
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((card) => (
                <article
                  className="docs-feature-card relative flex flex-col gap-4 p-5 transition-transform"
                  key={card.slug}
                >
                  <Link
                    href={`/components/${card.slug}`}
                    aria-label={`Open ${card.name} details`}
                    className="absolute inset-0 z-20 rounded-[inherit]"
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="grid gap-1">
                      <strong className="text-base text-[var(--lm-color-text)]">
                        {card.name}
                      </strong>
                      <span className="text-xs text-[var(--lm-color-muted)]">
                        {card.classCount} classes · {card.propCount} props
                      </span>
                    </div>
                    {card.status === "new" && (
                      <span className="lm-badge lm-badge-soft text-xs">New</span>
                    )}
                    {card.status === "beta" && (
                      <span className="lm-badge lm-badge-warning text-xs">Beta</span>
                    )}
                  </div>
                  <div
                    className="docs-preview pointer-events-none [&_*]:pointer-events-none"
                    style={{ minHeight: "12rem", padding: "1.25rem" }}
                    aria-hidden="true"
                  >
                    <div className="w-full">{card.preview}</div>
                  </div>
                  <p className="relative z-10 line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                    {card.description}
                  </p>
                  <div className="relative z-10 mt-auto flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                    <span className="lm-badge lm-badge-outline text-[10px]">{card.category}</span>
                    <span aria-hidden>→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
