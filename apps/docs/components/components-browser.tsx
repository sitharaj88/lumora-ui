"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type BrowserCard = {
  slug: string;
  name: string;
  category: string;
  description: string;
  status: "stable" | "beta" | "new";
  classCount: number;
  propCount: number;
  accent: string;
  preview: ReactNode;
};

const STATUSES = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "beta", label: "Beta" }
] as const;

type StatusFilter = (typeof STATUSES)[number]["id"];

const CATEGORY_HINTS: Record<string, string> = {
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

export function ComponentsBrowser({
  cards,
  categories,
  accent
}: {
  cards: BrowserCard[];
  categories: string[];
  accent: Record<string, string>;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<StatusFilter>("all");
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <div className="grid gap-10">
      <div className="sticky top-20 z-30">
        <div className="docs-feature-card grid gap-3 p-4 backdrop-blur-md md:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="relative">
            <label className="lm-input-group">
              <span className="lm-input-addon" aria-hidden="true">
                ⌕
              </span>
              <input
                ref={inputRef}
                type="search"
                className="lm-input"
                placeholder={`Search ${cards.length} components by name, role, or description…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search components"
                style={{ paddingRight: "5rem" }}
              />
            </label>
            <span
              className="docs-kbd-chip pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </div>
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
                className={isOn ? "lm-badge lm-badge-dot" : "lm-badge lm-badge-outline"}
                style={{
                  cursor: "pointer",
                  ...(isOn
                    ? {
                        background: `color-mix(in oklab, ${accent[cat]} 18%, transparent)`,
                        color: "var(--lm-color-text)",
                        borderColor: `color-mix(in oklab, ${accent[cat]} 50%, var(--lm-color-border))`,
                        ["--lm-badge-dot-color" as string]: accent[cat]
                      }
                    : {})
                }}
              >
                {cat}
              </button>
            );
          })}
          {(active.size > 0 || query || status !== "all") && (
            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm ml-auto" onClick={reset}>
              Reset
            </button>
          )}
        </div>

        <p className="text-xs text-[var(--lm-color-muted)]" aria-live="polite">
          Showing <strong className="text-[var(--lm-color-text)]">{filtered.length}</strong> of{" "}
          {cards.length} components
        </p>
        </div>
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
          <section id={category.toLowerCase()} key={category} className="grid gap-5 scroll-mt-24">
            <div
              className="docs-cat-banner"
              style={{ ["--lm-cat-color" as string]: accent[category] }}
            >
              <span className="docs-cat-banner-dot" aria-hidden="true" />
              <div className="grid gap-0.5">
                <strong className="text-base">{category}</strong>
                <span className="text-xs text-[var(--lm-color-muted)]">
                  {CATEGORY_HINTS[category] ?? ""}
                </span>
              </div>
              <span className="ml-auto text-sm tabular-nums text-[var(--lm-color-muted)]">
                {items.length} component{items.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((card) => (
                <article
                  className="docs-feature-card docs-cat-card relative flex flex-col gap-4 p-5"
                  key={card.slug}
                  style={{ ["--lm-cat-color" as string]: card.accent }}
                >
                  <Link
                    href={`/components/${card.slug}`}
                    aria-label={`Open ${card.name} details`}
                    className="absolute inset-0 z-20 rounded-[inherit]"
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="grid gap-1">
                      <strong className="text-base text-[var(--lm-color-text)]">{card.name}</strong>
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
                    className="docs-preview docs-preview-clip pointer-events-none [&_*]:pointer-events-none"
                    style={{ height: "12rem", padding: "1.25rem" }}
                    aria-hidden="true"
                  >
                    <div className="w-full">{card.preview}</div>
                  </div>
                  <p className="relative z-10 line-clamp-2 text-sm text-[var(--lm-color-muted)]">
                    {card.description}
                  </p>
                  <div className="relative z-10 mt-auto flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
                    <span
                      className="lm-badge lm-badge-outline text-[10px]"
                      style={{
                        borderColor: `color-mix(in oklab, ${card.accent} 40%, var(--lm-color-border))`,
                        color: "var(--lm-color-text)"
                      }}
                    >
                      {card.category}
                    </span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
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
