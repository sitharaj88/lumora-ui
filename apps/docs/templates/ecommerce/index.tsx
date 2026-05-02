import { TemplatePlaceholder } from "../_shared/placeholder";
import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";

const Storefront = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Storefront"
    description="48 products across 6 categories. Sortable, filterable grid."
    next={{ href: "/preview/ecommerce/product/raven-jacket", label: "View Raven jacket" }}
  />
);
const Product = ({ segments }: TemplatePageProps) => (
  <TemplatePlaceholder
    title={`Product · ${segments[1] ?? "raven-jacket"}`}
    description="Image gallery, variant picker, reviews, related products."
    next={{ href: "/preview/ecommerce/cart", label: "Open cart" }}
  />
);
const Cart = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Cart"
    description="3 items, $284 subtotal, free shipping unlocked at $250."
    next={{ href: "/preview/ecommerce/checkout", label: "Checkout" }}
  />
);
const Checkout = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Checkout"
    description="3-step checkout: shipping, payment, review. Saved addresses + card on file."
    next={{ href: "/preview/ecommerce/orders", label: "View orders" }}
  />
);
const Orders = (_: TemplatePageProps) => (
  <TemplatePlaceholder
    title="Orders"
    description="Order history with status, tracking, and re-order shortcuts."
  />
);

export const ecommerceTemplate: TemplateMeta = {
  slug: "ecommerce",
  name: "Storefront",
  category: "Commerce",
  status: "preview",
  description:
    "A 5-page direct-to-consumer storefront: catalog, product, cart, checkout, orders.",
  productName: "Raven Outfitters",
  productInitial: "R",
  accent: "var(--lm-color-warning)",
  pages: [
    { path: "", label: "Storefront", section: "Shop", component: Storefront },
    { path: "product/raven-jacket", label: "Raven jacket", hideFromNav: true, component: Product },
    { path: "cart", label: "Cart", section: "Shop", badge: "3", component: Cart },
    { path: "checkout", label: "Checkout", section: "Shop", component: Checkout },
    { path: "orders", label: "Orders", section: "Account", component: Orders }
  ]
};
