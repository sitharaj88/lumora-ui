import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { NavIcon } from "../_shared/nav-icon";
import { products } from "./data/products";
import { CartPage as RealCart } from "./pages/cart";
import { CheckoutPage as RealCheckout } from "./pages/checkout";
import { OrdersPage as RealOrders } from "./pages/orders";
import { ProductPage as RealProduct } from "./pages/product";
import { StorefrontPage as RealStorefront } from "./pages/storefront";

const Storefront = (_: TemplatePageProps) => <RealStorefront />;
const Product = ({ segments }: TemplatePageProps) => (
  <RealProduct productId={segments[1] ?? "raven-jacket"} />
);
const Cart = (_: TemplatePageProps) => <RealCart />;
const Checkout = (_: TemplatePageProps) => <RealCheckout />;
const Orders = (_: TemplatePageProps) => <RealOrders />;

export const ecommerceTemplate: TemplateMeta = {
  slug: "ecommerce",
  name: "Storefront",
  category: "Commerce",
  status: "ready",
  description:
    "A 5-page direct-to-consumer storefront: catalog, product, cart, checkout, orders.",
  productName: "Raven Outfitters",
  productInitial: "R",
  accent: "var(--lm-color-warning)",
  pages: [
    {
      path: "",
      label: "Storefront",
      section: "Shop",
      icon: <NavIcon name="shop" />,
      badge: `${products.length}`,
      component: Storefront
    },
    // One hidden detail page per product — every product card link works.
    ...products.map((p) => ({
      path: `product/${p.id}`,
      label: p.name,
      hideFromNav: true,
      component: Product
    })),
    {
      path: "cart",
      label: "Cart",
      section: "Shop",
      icon: <NavIcon name="cart" />,
      badge: "3",
      component: Cart
    },
    {
      path: "checkout",
      label: "Checkout",
      section: "Shop",
      icon: <NavIcon name="checkout" />,
      component: Checkout
    },
    {
      path: "orders",
      label: "Orders",
      section: "Account",
      icon: <NavIcon name="orders" />,
      component: Orders
    }
  ]
};
