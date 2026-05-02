import { ProductCard } from "../components/product-card";
import { products, type ProductCategory } from "../data/products";

const CATEGORIES: ProductCategory[] = [
  "Outerwear",
  "Tops",
  "Bottoms",
  "Footwear",
  "Accessories"
];

export function StorefrontPage() {
  const categoryCounts = CATEGORIES.map((cat) => ({
    cat,
    count: products.filter((p) => p.category === cat).length
  }));
  const onSale = products.filter((p) => p.comparePrice).length;
  const newCount = products.filter((p) => p.badge === "new").length;

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Shop · Spring 2026
          </p>
          <h1 className="lm-page-title mt-1">All gear</h1>
          <p className="lm-page-description">
            {products.length} products · {newCount} new this season · {onSale} on sale
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="lm-input-group" style={{ width: "16rem" }}>
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="Search gear…" />
          </div>
          <div className="lm-segmented">
            <button type="button" className="lm-segmented-item" aria-pressed="true">
              Grid
            </button>
            <button type="button" className="lm-segmented-item">
              List
            </button>
          </div>
          <select
            className="lm-select lm-select-sm"
            defaultValue="featured"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option>Newest</option>
            <option>Price: low → high</option>
            <option>Price: high → low</option>
            <option>Best rated</option>
          </select>
        </div>
      </header>

      {/* Promo strip */}
      <div
        className="lm-banner"
        style={{
          background: "linear-gradient(90deg, color-mix(in oklab, var(--lm-color-warning) 14%, var(--lm-color-surface)), var(--lm-color-surface))",
          borderColor: "var(--lm-color-warning)"
        }}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden>★</span>
          <div>
            <strong className="text-sm">Spring sale · up to 25% off select outerwear</strong>
            <p className="lm-hint text-xs">Free shipping over $250 · ends Sunday</p>
          </div>
        </div>
        <button type="button" className="lm-btn lm-btn-warning lm-btn-sm">
          Shop sale
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        {/* Filter sidebar */}
        <aside className="grid gap-4 h-fit lg:sticky lg:top-24" aria-label="Filters">
          <section className="lm-card">
            <div className="lm-card-body grid gap-3 p-4">
              <strong className="text-sm">Category</strong>
              <ul className="grid gap-1 text-sm">
                <li>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" className="lm-checkbox" defaultChecked />
                      All
                    </span>
                    <span className="lm-hint text-xs tabular-nums">{products.length}</span>
                  </label>
                </li>
                {categoryCounts.map(({ cat, count }) => (
                  <li key={cat}>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="flex items-center gap-2">
                        <input type="checkbox" className="lm-checkbox" />
                        {cat}
                      </span>
                      <span className="lm-hint text-xs tabular-nums">{count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-body grid gap-3 p-4">
              <strong className="text-sm">Price</strong>
              <input
                className="lm-slider"
                type="range"
                min={0}
                max={400}
                defaultValue={300}
                aria-label="Maximum price"
              />
              <div className="flex justify-between text-xs text-[var(--lm-color-muted)] tabular-nums">
                <span>$0</span>
                <span>$300</span>
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-body grid gap-3 p-4">
              <strong className="text-sm">Color</strong>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Black", "linear-gradient(135deg, #18181b, #3f3f46)"],
                  ["Bone", "linear-gradient(135deg, #f4f1ea, #e0d9c5)"],
                  ["Forest", "linear-gradient(135deg, #14532d, #166534)"],
                  ["Storm", "linear-gradient(135deg, #475569, #1e293b)"],
                  ["Rust", "linear-gradient(135deg, #a16207, #7c2d12)"],
                  ["Cream", "linear-gradient(135deg, #fef3c7, #fde68a)"]
                ].map(([name, swatch]) => (
                  <button
                    key={name}
                    type="button"
                    className="grid gap-1 text-[10px] text-[var(--lm-color-muted)]"
                    aria-label={`Filter color ${name}`}
                  >
                    <span
                      className="h-8 w-full rounded-md border border-[var(--lm-color-border)]"
                      style={{ background: swatch }}
                      aria-hidden="true"
                    />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-body grid gap-3 p-4">
              <strong className="text-sm">Size</strong>
              <div className="flex flex-wrap gap-1.5">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    className="lm-badge lm-badge-outline cursor-pointer text-xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="lm-card">
            <div className="lm-card-body grid gap-3 p-4">
              <strong className="text-sm">Highlights</strong>
              <ul className="grid gap-1 text-sm">
                {["On sale", "New arrivals", "Best sellers", "Recycled fabrics"].map((h) => (
                  <li key={h}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="lm-checkbox" />
                      {h}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
            Reset filters
          </button>
        </aside>

        {/* Product grid */}
        <div className="grid gap-4">
          <div className="flex items-center justify-between text-xs text-[var(--lm-color-muted)]">
            <span>{products.length} results</span>
            <span>Showing 1–{products.length}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <nav className="lm-pagination justify-self-center mt-4" aria-label="Pagination">
            <a className="lm-pagination-item" aria-disabled="true">‹</a>
            <a className="lm-pagination-item" aria-current="page" href="#">
              1
            </a>
            <a className="lm-pagination-item" href="#">
              2
            </a>
            <a className="lm-pagination-item" href="#">
              3
            </a>
            <a className="lm-pagination-item" href="#">
              ›
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
