import Link from "next/link";
import { PriceTag, ProductBadgePill, ProductImage, StarRating } from "./atoms";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="lm-card lm-card-interactive flex flex-col" style={{ overflow: "visible" }}>
      <Link
        href={`/preview/ecommerce/product/${product.id}`}
        className="grid gap-3 p-4 text-inherit no-underline"
      >
        <div className="relative">
          <ProductImage product={product} aspect="4/5" />
          {product.badge && (
            <span className="absolute left-2 top-2">
              <ProductBadgePill badge={product.badge} />
            </span>
          )}
        </div>

        <div className="grid gap-1">
          <p className="text-[10px] uppercase tracking-wider text-[var(--lm-color-muted)]">
            {product.category}
          </p>
          <strong className="text-sm leading-snug">{product.name}</strong>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--lm-color-muted)]">
          <StarRating value={product.rating} size={12} />
          <span className="tabular-nums">
            {product.rating.toFixed(1)} · {product.reviewCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <PriceTag product={product} size="sm" />
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className="h-3.5 w-3.5 rounded-full border border-[var(--lm-color-border)]"
                style={{ background: c.swatch }}
                title={c.name}
                aria-hidden="true"
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[var(--lm-color-muted)]">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
