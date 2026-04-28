"use client";

import { useMemo, useState } from "react";
import type { ComponentDoc } from "../lib/docs";

export function DocsSearch({ components }: { components: ComponentDoc[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return components;

    return components.filter((component) =>
      [component.name, component.category, component.description, component.classes.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [components, query]);

  return (
    <section className="grid gap-4">
      <label className="lm-field">
        <span className="lm-label">Search components</span>
        <input
          className="lm-input"
          type="search"
          placeholder="Search by name, class, or category"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="docs-grid">
        {filtered.map((component) => (
          <a
            className="lm-card lm-card-interactive text-inherit no-underline"
            href={`/components/${component.slug}`}
            key={component.slug}
          >
            <div className="lm-card-body grid gap-3">
              <span className="lm-badge w-fit">{component.category}</span>
              <strong>{component.name}</strong>
              <p className="lm-hint">{component.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
