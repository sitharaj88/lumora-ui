import Link from "next/link";
import { PriceTag, ProductBadgePill, ProductImage, StarRating } from "../components/atoms";
import { ProductCard } from "../components/product-card";
import { getProduct, products } from "../data/products";
import { ratingHistogram, reviewsForProduct } from "../data/reviews";

export function ProductPage({ productId }: { productId: string }) {
  const product = getProduct(productId) ?? products[0];
  const reviews = reviewsForProduct(product.id);
  const histogram = ratingHistogram(product.id);
  const totalReviews = histogram.reduce((s, c) => s + c, 0) || product.reviewCount;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const defaultColor =
    product.colors.find((c) => c.name === product.defaultColor) ?? product.colors[0];

  return (
    <div className="grid gap-8">
      {/* Breadcrumb */}
      <nav className="lm-breadcrumbs" aria-label="Product breadcrumb">
        <Link href="/preview/ecommerce">Shop</Link>
        <span aria-hidden>/</span>
        <Link href="/preview/ecommerce">{product.category}</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* Gallery + buy box */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div className="grid gap-3">
          <div className="relative">
            <ProductImage product={product} aspect="4/5" className="w-full" />
            {product.badge && (
              <span className="absolute left-3 top-3">
                <ProductBadgePill badge={product.badge} />
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.slice(0, 4).map((g, i) => (
              <button
                key={i}
                type="button"
                className="aspect-square rounded-lg border-2 overflow-hidden"
                style={{
                  background: g,
                  borderColor: i === 0 ? "var(--lm-color-primary)" : "var(--lm-color-border)"
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="grid gap-5">
          <div className="grid gap-2">
            <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
              {product.brand} · {product.category}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <StarRating value={product.rating} />
              <span className="text-sm text-[var(--lm-color-muted)] tabular-nums">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
              {product.tags.slice(0, 3).map((t) => (
                <span className="lm-badge lm-badge-outline text-xs" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <PriceTag product={product} size="lg" />
          </div>

          <p className="text-sm leading-relaxed text-[var(--lm-color-muted)]">
            {product.description}
          </p>

          {/* Color picker */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <strong className="text-sm">
                Color · <span className="text-[var(--lm-color-muted)]">{defaultColor.name}</span>
              </strong>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  className="rounded-md border-2 p-0.5"
                  style={{
                    borderColor:
                      c.name === defaultColor.name
                        ? "var(--lm-color-primary)"
                        : "var(--lm-color-border)"
                  }}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                  aria-pressed={c.name === defaultColor.name}
                >
                  <span
                    className="block h-7 w-7 rounded-sm"
                    style={{ background: c.swatch }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size picker */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <strong className="text-sm">Size</strong>
              <a className="text-xs text-[var(--lm-color-primary)] underline" href="#">
                Size guide
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {defaultColor.variants.map((v) => {
                const out = v.stock === 0;
                const low = v.stock > 0 && v.stock < 4;
                return (
                  <button
                    key={v.size}
                    type="button"
                    disabled={out}
                    aria-pressed={v.size === "M"}
                    className="grid gap-0.5 rounded-md border-2 px-3 py-1.5 text-center text-sm font-medium"
                    style={{
                      borderColor: v.size === "M" ? "var(--lm-color-primary)" : "var(--lm-color-border)",
                      opacity: out ? 0.45 : 1,
                      cursor: out ? "not-allowed" : "pointer",
                      minWidth: "3rem"
                    }}
                  >
                    {v.size}
                    {low && (
                      <span
                        className="text-[9px] uppercase tracking-wider"
                        style={{ color: "var(--lm-color-warning)" }}
                      >
                        low
                      </span>
                    )}
                    {out && (
                      <span
                        className="text-[9px] uppercase tracking-wider"
                        style={{ color: "var(--lm-color-muted)" }}
                      >
                        out
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex flex-wrap gap-3">
            <div className="lm-number-input" style={{ width: "8rem" }}>
              <button type="button" aria-label="Decrement quantity">−</button>
              <input type="number" defaultValue={1} aria-label="Quantity" />
              <button type="button" aria-label="Increment quantity">+</button>
            </div>
            <Link
              href="/preview/ecommerce/cart"
              className="lm-btn lm-btn-primary lm-btn-lg flex-1 no-underline text-center"
            >
              Add to cart · {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              {product.price}
            </Link>
            <button type="button" className="lm-btn lm-btn-outline lm-btn-lg" aria-label="Save for later">
              ♡
            </button>
          </div>

          {/* Trust line */}
          <ul className="grid gap-2 text-sm text-[var(--lm-color-muted)]">
            {[
              "Free shipping on orders over $250",
              "60-day returns · no questions",
              "Lifetime repairs on Raven gear",
              "Carbon-neutral shipping"
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span
                  className="lm-badge lm-badge-success lm-badge-dot flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[var(--lm-color-text)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Details accordion */}
      <section className="grid gap-3">
        <h2 className="text-lg font-bold tracking-tight">Specs & details</h2>
        <div className="lm-accordion">
          <div className="lm-accordion-item">
            <button className="lm-accordion-trigger" aria-expanded="true" type="button">
              Materials & construction
            </button>
            <div className="lm-accordion-content">
              <ul className="grid gap-2 text-sm leading-relaxed">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span
                      className="lm-badge lm-badge-soft lm-badge-dot mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lm-accordion-item">
            <button className="lm-accordion-trigger" aria-expanded="false" type="button">
              Care instructions
            </button>
            <div className="lm-accordion-content" hidden>
              Cool wash inside out. Hang dry. Re-apply DWR every 12 months for waterproof items.
            </div>
          </div>
          <div className="lm-accordion-item">
            <button className="lm-accordion-trigger" aria-expanded="false" type="button">
              Shipping & returns
            </button>
            <div className="lm-accordion-content" hidden>
              Free standard shipping on orders over $250. Express ships in 1–2 business days. Free
              returns within 60 days.
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Reviews</h2>
            <p className="lm-hint text-xs">
              {totalReviews} review{totalReviews === 1 ? "" : "s"}
            </p>
          </div>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Write a review
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
          {/* Histogram */}
          <div className="lm-card">
            <div className="lm-card-body grid gap-4 p-5">
              <div className="grid gap-1">
                <span className="text-3xl font-bold tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <StarRating value={product.rating} size={16} />
                <span className="text-xs text-[var(--lm-color-muted)]">
                  {product.reviewCount} verified reviews
                </span>
              </div>
              <div className="grid gap-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = histogram[star - 1] ?? 0;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 tabular-nums text-[var(--lm-color-muted)]">{star}</span>
                      <span className="w-2" aria-hidden>★</span>
                      <div
                        className="flex-1"
                        style={{
                          background: "var(--lm-color-surface-raised)",
                          borderRadius: "999px",
                          height: "0.4rem",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            background: "var(--lm-color-warning)",
                            height: "100%",
                            width: `${pct}%`
                          }}
                        />
                      </div>
                      <span className="w-6 text-right tabular-nums text-[var(--lm-color-muted)]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className="grid gap-3">
            {reviews.map((r) => (
              <article key={r.id} className="lm-card">
                <div className="lm-card-body grid gap-2 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="lm-avatar lm-avatar-sm"
                        style={{ background: r.authorBg }}
                        aria-hidden="true"
                      >
                        {r.authorInitials}
                      </span>
                      <strong className="text-sm">{r.authorName}</strong>
                      {r.verified && (
                        <span className="lm-badge lm-badge-success lm-badge-dot text-[10px]">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--lm-color-muted)]">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={r.rating} size={14} />
                    <strong className="text-sm">{r.title}</strong>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--lm-color-muted)]">{r.body}</p>
                </div>
              </article>
            ))}
            <button
              type="button"
              className="lm-btn lm-btn-ghost lm-btn-sm justify-self-start"
            >
              Show all {product.reviewCount} reviews
            </button>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="grid gap-3">
        <h2 className="text-lg font-bold tracking-tight">More from {product.category}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
