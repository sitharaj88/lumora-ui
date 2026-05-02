import Link from "next/link";
import { ProductImage } from "../components/atoms";
import { ProductCard } from "../components/product-card";
import { cartLines, shippingThreshold } from "../data/cart";
import { formatPrice, getProduct, products } from "../data/products";

export function CartPage() {
  const items = cartLines
    .map((line) => {
      const product = getProduct(line.productId);
      if (!product) return null;
      return { line, product };
    })
    .filter(
      (
        x
      ): x is {
        line: (typeof cartLines)[number];
        product: ReturnType<typeof getProduct> & object;
      } => Boolean(x)
    );

  const subtotal = items.reduce((s, { line, product }) => s + product!.price * line.quantity, 0);
  const tax = Math.round(subtotal * 0.0875);
  const shipping = subtotal >= shippingThreshold ? 0 : 12;
  const total = subtotal + tax + shipping;
  const recommended = products
    .filter((p) => !cartLines.some((l) => l.productId === p.id))
    .slice(0, 3);

  const towardFreeShipping = Math.max(shippingThreshold - subtotal, 0);
  const shippingPct = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">Your cart</p>
          <h1 className="lm-page-title mt-1">Cart · {items.length} items</h1>
        </div>
        <Link href="/preview/ecommerce" className="lm-btn lm-btn-ghost lm-btn-sm no-underline">
          ← Continue shopping
        </Link>
      </header>

      {/* Free-shipping progress */}
      <div className="lm-card">
        <div className="lm-card-body grid gap-2 p-4">
          <div className="flex items-center justify-between text-sm">
            <strong>
              {towardFreeShipping > 0
                ? `Add ${formatPrice(towardFreeShipping)} more for free shipping`
                : "🎉 Free shipping unlocked"}
            </strong>
            <span className="tabular-nums text-xs text-[var(--lm-color-muted)]">
              {formatPrice(subtotal)} / {formatPrice(shippingThreshold)}
            </span>
          </div>
          <div
            style={{
              background: "var(--lm-color-surface-raised)",
              borderRadius: "999px",
              height: "0.5rem",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in oklab, var(--lm-color-success) 80%, white), var(--lm-color-success))",
                height: "100%",
                transition: "width 600ms ease",
                width: `${shippingPct}%`
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Lines */}
        <section className="lm-card overflow-hidden">
          <div className="lm-card-header">
            <h2 className="lm-card-title">Items</h2>
          </div>
          <div className="lm-card-body p-0">
            <ul className="grid divide-y divide-[var(--lm-color-border)]">
              {items.map(({ line, product }) => (
                <li
                  key={`${line.productId}-${line.size}-${line.color}`}
                  className="grid grid-cols-[6rem_1fr_auto] gap-4 p-4 sm:grid-cols-[7rem_1fr_8rem_auto]"
                >
                  <Link
                    href={`/preview/ecommerce/product/${product!.id}`}
                    className="block"
                    aria-label={`Open ${product!.name}`}
                  >
                    <ProductImage product={product!} aspect="1" />
                  </Link>
                  <div className="grid gap-1 min-w-0">
                    <Link
                      href={`/preview/ecommerce/product/${product!.id}`}
                      className="text-inherit no-underline"
                    >
                      <strong className="text-sm leading-snug">{product!.name}</strong>
                    </Link>
                    <p className="lm-hint text-xs">
                      {product!.category} · {line.color} · Size {line.size}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                        Save for later
                      </button>
                      <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="grid place-content-start">
                    <div className="lm-number-input" style={{ width: "7rem" }}>
                      <button type="button" aria-label="Decrement">
                        −
                      </button>
                      <input
                        type="number"
                        defaultValue={line.quantity}
                        aria-label={`Quantity for ${product!.name}`}
                      />
                      <button type="button" aria-label="Increment">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="grid place-content-start text-right">
                    <strong className="tabular-nums">
                      {formatPrice(product!.price * line.quantity)}
                    </strong>
                    {line.quantity > 1 && (
                      <span className="lm-hint text-xs tabular-nums">
                        {formatPrice(product!.price)} each
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Summary */}
        <aside className="grid gap-4 h-fit lg:sticky lg:top-24">
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Summary</h2>
            </div>
            <div className="lm-card-body grid gap-4">
              <div className="grid gap-2">
                <SummaryRow label="Subtotal" value={subtotal} />
                <SummaryRow
                  label="Shipping"
                  value={shipping}
                  zeroLabel="Free"
                  highlight={shipping === 0}
                />
                <SummaryRow label="Estimated tax" value={tax} />
                <hr className="border-[var(--lm-color-border)]" />
                <SummaryRow label="Total" value={total} bold size="lg" />
              </div>

              <div className="grid gap-2">
                <label className="lm-field">
                  <span className="lm-label text-xs">Promo code</span>
                  <div className="lm-input-group">
                    <input className="lm-input" placeholder="SHIPFREE" />
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                      Apply
                    </button>
                  </div>
                </label>
              </div>

              <Link
                href="/preview/ecommerce/checkout"
                className="lm-btn lm-btn-primary lm-btn-lg w-full no-underline text-center"
              >
                Checkout · {formatPrice(total)}
              </Link>

              <div className="grid gap-1 text-xs text-[var(--lm-color-muted)]">
                <span className="flex items-center gap-2">
                  <span className="lm-badge lm-badge-success lm-badge-dot" aria-hidden="true" />
                  Secure checkout · 256-bit TLS
                </span>
                <span className="flex items-center gap-2">
                  <span className="lm-badge lm-badge-success lm-badge-dot" aria-hidden="true" />
                  60-day returns · free
                </span>
              </div>
            </div>
          </section>

          <section className="lm-card lm-card-flat">
            <div className="lm-card-body grid gap-2 p-4 text-xs text-[var(--lm-color-muted)]">
              <strong className="text-sm text-[var(--lm-color-text)]">We accept</strong>
              <div className="flex flex-wrap gap-1.5">
                {["Visa", "Mastercard", "Amex", "Apple Pay", "PayPal", "Klarna"].map((p) => (
                  <span className="lm-badge lm-badge-outline" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Recommended */}
      <section className="grid gap-3">
        <h2 className="text-lg font-bold tracking-tight">You might also like</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  zeroLabel,
  highlight,
  bold,
  size = "sm"
}: {
  label: string;
  value: number;
  zeroLabel?: string;
  highlight?: boolean;
  bold?: boolean;
  size?: "sm" | "lg";
}) {
  const display = value === 0 && zeroLabel ? zeroLabel : formatPrice(value);
  const fontSize = size === "lg" ? "1.125rem" : "0.875rem";
  return (
    <div className="flex items-center justify-between" style={{ fontSize }}>
      <span className={bold ? "font-bold" : "text-[var(--lm-color-muted)]"}>{label}</span>
      <span
        className={`tabular-nums ${bold ? "font-bold" : ""}`}
        style={{ color: highlight ? "var(--lm-color-success)" : undefined }}
      >
        {display}
      </span>
    </div>
  );
}
