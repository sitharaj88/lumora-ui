import { formatPrice, type Product, type ProductBadge } from "../data/products";

export function StarRating({
  value,
  max = 5,
  size = 14
}: {
  value: number;
  max?: number;
  size?: number;
}) {
  return (
    <span
      role="img"
      className="inline-flex items-center gap-0.5"
      style={{ color: "var(--lm-color-warning)", fontSize: size }}
      aria-label={`${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.round(value);
        return (
          <span key={i} style={{ opacity: filled ? 1 : 0.25, lineHeight: 1 }} aria-hidden="true">
            ★
          </span>
        );
      })}
    </span>
  );
}

export function PriceTag({
  product,
  size = "md"
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const fontSize = size === "lg" ? "1.5rem" : size === "sm" ? "0.875rem" : "1rem";
  return (
    <span className="flex flex-wrap items-baseline gap-2">
      <strong className="tabular-nums" style={{ fontSize, lineHeight: 1.1 }}>
        {formatPrice(product.price)}
      </strong>
      {product.comparePrice && product.comparePrice > product.price && (
        <>
          <span
            className="tabular-nums text-[var(--lm-color-muted)] line-through"
            style={{ fontSize: size === "lg" ? "1rem" : "0.8125rem" }}
          >
            {formatPrice(product.comparePrice)}
          </span>
          <span className="lm-badge lm-badge-success text-[10px]">
            Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}
            %
          </span>
        </>
      )}
    </span>
  );
}

export function ProductBadgePill({ badge }: { badge: ProductBadge }) {
  if (!badge) return null;
  const tone =
    badge === "sale"
      ? "danger"
      : badge === "new"
        ? "primary"
        : badge === "limited"
          ? "warning"
          : "success";
  const label =
    badge === "sale"
      ? "Sale"
      : badge === "new"
        ? "New"
        : badge === "limited"
          ? "Limited"
          : "Best seller";
  return (
    <span className={`lm-badge lm-badge-${tone} text-[10px] uppercase tracking-wider`}>
      {label}
    </span>
  );
}

export function ProductImage({
  product,
  variant = 0,
  className = "",
  aspect = "1"
}: {
  product: Product;
  variant?: number;
  className?: string;
  aspect?: string;
}) {
  const bg = product.gallery[variant] ?? product.image;
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[var(--lm-color-border)] ${className}`}
      style={{
        background: bg,
        aspectRatio: aspect
      }}
      aria-hidden="true"
    >
      <span
        className="absolute bottom-2 right-2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
        style={{
          background: "color-mix(in oklab, var(--lm-color-bg) 70%, transparent)",
          color: "var(--lm-color-text)",
          backdropFilter: "blur(8px)"
        }}
      >
        {product.brand}
      </span>
    </div>
  );
}
