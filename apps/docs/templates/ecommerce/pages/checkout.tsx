import Link from "next/link";
import { ProductImage } from "../components/atoms";
import { cartLines, shippingThreshold } from "../data/cart";
import { formatPrice, getProduct } from "../data/products";

export function CheckoutPage() {
  const items = cartLines
    .map((line) => ({ line, product: getProduct(line.productId) }))
    .filter(
      (
        x
      ): x is {
        line: (typeof cartLines)[number];
        product: NonNullable<ReturnType<typeof getProduct>>;
      } => Boolean(x.product)
    );

  const subtotal = items.reduce((s, { line, product }) => s + product.price * line.quantity, 0);
  const tax = Math.round(subtotal * 0.0875);
  const shipping = subtotal >= shippingThreshold ? 0 : 12;
  const total = subtotal + tax + shipping;

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Secure checkout · TLS 1.3
          </p>
          <h1 className="lm-page-title mt-1">Checkout</h1>
          <p className="lm-page-description">
            {items.length} items · total {formatPrice(total)}
          </p>
        </div>
        <Link href="/preview/ecommerce/cart" className="lm-btn lm-btn-ghost lm-btn-sm no-underline">
          ← Back to cart
        </Link>
      </header>

      {/* Stepper */}
      <ol className="lm-stepper">
        <li className="lm-step lm-step-complete">
          <span className="lm-step-marker" />
          Shipping
        </li>
        <li className="lm-step" aria-current="step">
          <span className="lm-step-marker" />
          Payment
        </li>
        <li className="lm-step">
          <span className="lm-step-marker" />
          Review
        </li>
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Form column */}
        <div className="grid gap-6">
          {/* Shipping (completed) */}
          <section className="lm-card" style={{ borderColor: "var(--lm-color-success)" }}>
            <div className="lm-card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="lm-badge lm-badge-success lm-badge-dot text-xs">Saved</span>
                <h2 className="lm-card-title">1 · Shipping</h2>
              </div>
              <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                Edit
              </button>
            </div>
            <div className="lm-card-body grid gap-1 text-sm">
              <strong>Maya Krishnan</strong>
              <p className="text-[var(--lm-color-muted)]">
                212 Mission Street · Apt 4F
                <br />
                San Francisco, CA 94105
                <br />
                United States · +1 (415) 555-0142
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="lm-badge lm-badge-soft text-xs">Standard · 3–5 days</span>
                <span className="text-xs text-[var(--lm-color-muted)]">
                  Free over {formatPrice(shippingThreshold)}
                </span>
              </div>
            </div>
          </section>

          {/* Payment (active) */}
          <section className="lm-card" style={{ borderColor: "var(--lm-color-primary)" }}>
            <div className="lm-card-header">
              <h2 className="lm-card-title">2 · Payment</h2>
              <p className="lm-card-subtitle">Choose how you'd like to pay.</p>
            </div>
            <div className="lm-card-body grid gap-5">
              {/* Method picker */}
              <div className="grid gap-2">
                {[
                  {
                    id: "card",
                    name: "Credit or debit card",
                    desc: "Visa · Mastercard · Amex",
                    selected: true
                  },
                  {
                    id: "applepay",
                    name: "Apple Pay",
                    desc: "Pay with Touch ID or Face ID",
                    selected: false
                  },
                  {
                    id: "klarna",
                    name: "Klarna · pay in 4",
                    desc: "0% interest · 4 payments of " + formatPrice(Math.round(total / 4)),
                    selected: false
                  }
                ].map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3 cursor-pointer"
                    style={{
                      borderColor: m.selected
                        ? "var(--lm-color-primary)"
                        : "var(--lm-color-border)",
                      background: m.selected
                        ? "color-mix(in oklab, var(--lm-color-primary) 6%, var(--lm-color-surface))"
                        : "var(--lm-color-surface)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="method"
                        className="lm-radio"
                        defaultChecked={m.selected}
                      />
                      <div>
                        <strong className="text-sm">{m.name}</strong>
                        <p className="lm-hint text-xs">{m.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card form */}
              <div className="grid gap-3 md:grid-cols-2">
                <label className="lm-field md:col-span-2">
                  <span className="lm-label">Card number</span>
                  <div className="lm-input-group">
                    <span className="lm-input-addon">💳</span>
                    <input
                      className="lm-input tabular-nums"
                      placeholder="1234 1234 1234 1234"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                </label>
                <label className="lm-field">
                  <span className="lm-label">Expiration</span>
                  <input
                    className="lm-input tabular-nums"
                    placeholder="MM / YY"
                    defaultValue="12 / 27"
                  />
                </label>
                <label className="lm-field">
                  <span className="lm-label">CVC</span>
                  <input className="lm-input tabular-nums" placeholder="123" defaultValue="123" />
                </label>
                <label className="lm-field md:col-span-2">
                  <span className="lm-label">Name on card</span>
                  <input className="lm-input" defaultValue="Maya Krishnan" />
                </label>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="lm-checkbox" defaultChecked />
                <span>Same as shipping address</span>
              </label>
            </div>
          </section>

          {/* Review (pending) */}
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title text-[var(--lm-color-muted)]">3 · Review</h2>
              <p className="lm-card-subtitle">
                Review your order, then place it. You won't be charged until you confirm.
              </p>
            </div>
            <div className="lm-card-body">
              <div className="lm-empty-state" style={{ minHeight: "8rem" }}>
                <span className="lm-hint text-xs">Complete payment to review your order</span>
              </div>
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="grid gap-4 h-fit lg:sticky lg:top-24">
          <section className="lm-card">
            <div className="lm-card-header">
              <h2 className="lm-card-title">Your order</h2>
              <p className="lm-card-subtitle">
                {items.length} item{items.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="lm-card-body grid gap-3">
              <ul className="grid gap-3">
                {items.map(({ line, product }) => (
                  <li
                    key={`${line.productId}-${line.size}`}
                    className="grid grid-cols-[3rem_1fr_auto] gap-3 items-center"
                  >
                    <div style={{ width: "3rem", height: "3rem" }}>
                      <ProductImage product={product} aspect="1" />
                    </div>
                    <div className="grid gap-0.5 min-w-0">
                      <strong className="text-sm leading-tight truncate">{product.name}</strong>
                      <span className="lm-hint text-xs">
                        {line.color} · {line.size} · qty {line.quantity}
                      </span>
                    </div>
                    <span className="tabular-nums text-sm">
                      {formatPrice(product.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="border-[var(--lm-color-border)]" />

              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--lm-color-muted)]">Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--lm-color-muted)]">Shipping</span>
                  <span
                    className="tabular-nums"
                    style={{ color: shipping === 0 ? "var(--lm-color-success)" : undefined }}
                  >
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--lm-color-muted)]">Estimated tax</span>
                  <span className="tabular-nums">{formatPrice(tax)}</span>
                </div>
                <hr className="border-[var(--lm-color-border)] my-1" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <button type="button" className="lm-btn lm-btn-primary lm-btn-lg w-full">
                Place order · {formatPrice(total)}
              </button>

              <p className="text-[10px] text-[var(--lm-color-muted)] text-center">
                By placing your order, you agree to our{" "}
                <a className="text-[var(--lm-color-primary)] underline" href="#">
                  Terms
                </a>{" "}
                and{" "}
                <a className="text-[var(--lm-color-primary)] underline" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>

          <section className="lm-card lm-card-flat">
            <div className="lm-card-body grid gap-2 p-4 text-xs">
              <strong className="text-sm">60-day returns</strong>
              <p className="text-[var(--lm-color-muted)]">
                Free returns within 60 days. Print a label from your account in two clicks.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
