import Link from "next/link";
import { ProductImage } from "../components/atoms";
import { formatDate, orders, statusLabel, statusTone } from "../data/orders";
import { formatPrice, getProduct } from "../data/products";

export function OrdersPage() {
  const counts = {
    all: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    processing: orders.filter((o) => o.status === "processing").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length
  };
  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="grid gap-6">
      <header className="lm-page-header">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Account · Order history
          </p>
          <h1 className="lm-page-title mt-1">Orders</h1>
          <p className="lm-page-description">
            {orders.length} orders · {formatPrice(totalSpent)} lifetime spend
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Download all invoices
          </button>
          <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
            Help with an order
          </button>
        </div>
      </header>

      {/* Status segments */}
      <div className="lm-segmented" role="group" aria-label="Filter by status">
        <button type="button" className="lm-segmented-item" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{counts.all}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Delivered <span className="ml-1 text-[var(--lm-color-success)]">{counts.delivered}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Shipped <span className="ml-1 text-[var(--lm-color-info)]">{counts.shipped}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Processing{" "}
          <span className="ml-1 text-[var(--lm-color-warning)]">{counts.processing}</span>
        </button>
        <button type="button" className="lm-segmented-item">
          Cancelled <span className="ml-1 text-[var(--lm-color-danger)]">{counts.cancelled}</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="lm-filter-bar">
        <label className="lm-field">
          <span className="lm-label text-xs">Search orders</span>
          <div className="lm-input-group">
            <span className="lm-input-addon">⌕</span>
            <input className="lm-input" placeholder="order number, product…" />
          </div>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Range</span>
          <select className="lm-select" defaultValue="year">
            <option>Last 30 days</option>
            <option>Last 6 months</option>
            <option value="year">Last year</option>
            <option>All time</option>
          </select>
        </label>
        <label className="lm-field">
          <span className="lm-label text-xs">Sort</span>
          <select className="lm-select" defaultValue="newest">
            <option value="newest">Newest first</option>
            <option>Oldest first</option>
            <option>Highest total</option>
          </select>
        </label>
      </div>

      {/* Orders */}
      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="lm-card overflow-hidden">
            <div
              className="lm-card-header flex flex-wrap items-center justify-between gap-3"
              style={{ background: "var(--lm-color-surface-raised)" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid gap-0.5">
                  <span className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
                    Order placed
                  </span>
                  <strong className="text-sm">{formatDate(order.date)}</strong>
                </div>
                <span
                  className="hidden h-8 w-px sm:block"
                  style={{ background: "var(--lm-color-border)" }}
                  aria-hidden="true"
                />
                <div className="grid gap-0.5">
                  <span className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
                    Total
                  </span>
                  <strong className="tabular-nums">{formatPrice(order.total)}</strong>
                </div>
                <span
                  className="hidden h-8 w-px sm:block"
                  style={{ background: "var(--lm-color-border)" }}
                  aria-hidden="true"
                />
                <div className="grid gap-0.5">
                  <span className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
                    Order
                  </span>
                  <code className="lm-code text-xs">{order.number}</code>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`lm-badge lm-badge-${statusTone[order.status]} lm-badge-dot text-xs`}
                >
                  {statusLabel[order.status]}
                </span>
                {order.tracking && (
                  <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                    Track package
                  </button>
                )}
                <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                  View invoice
                </button>
              </div>
            </div>

            <div className="lm-card-body">
              <ul className="grid gap-4">
                {order.lines.map((line) => {
                  const product = getProduct(line.productId);
                  if (!product) return null;
                  return (
                    <li
                      key={`${line.productId}-${line.size}`}
                      className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 sm:grid-cols-[6rem_1fr_auto_auto]"
                    >
                      <Link href={`/preview/ecommerce/product/${product.id}`} className="block">
                        <ProductImage product={product} aspect="1" />
                      </Link>
                      <div className="grid gap-1 min-w-0">
                        <Link
                          href={`/preview/ecommerce/product/${product.id}`}
                          className="text-inherit no-underline"
                        >
                          <strong className="text-sm leading-snug">{product.name}</strong>
                        </Link>
                        <span className="lm-hint text-xs">
                          {line.color} · Size {line.size} · qty {line.quantity}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {order.status === "delivered" && (
                            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                              Buy again
                            </button>
                          )}
                          {order.status === "delivered" && (
                            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                              Write review
                            </button>
                          )}
                          {(order.status === "shipped" || order.status === "delivered") && (
                            <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                              Return
                            </button>
                          )}
                        </div>
                      </div>
                      <span className="hidden text-xs text-[var(--lm-color-muted)] sm:inline tabular-nums">
                        {formatPrice(line.unitPrice)} ea
                      </span>
                      <strong className="text-sm tabular-nums">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </strong>
                    </li>
                  );
                })}
              </ul>
            </div>

            {order.tracking && (
              <div
                className="lm-card-footer flex flex-wrap items-center justify-between gap-2 text-xs"
                style={{
                  background: "var(--lm-color-surface)",
                  borderTop: "1px solid var(--lm-color-border)"
                }}
              >
                <span className="text-[var(--lm-color-muted)]">
                  Tracking · <code className="lm-code text-[10px]">{order.tracking}</code>
                </span>
                {order.status === "shipped" && (
                  <span className="lm-badge lm-badge-info lm-badge-dot">
                    Out for delivery · arrives Friday
                  </span>
                )}
                {order.status === "delivered" && (
                  <span className="lm-badge lm-badge-success lm-badge-dot">Delivered · Apr 24</span>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
