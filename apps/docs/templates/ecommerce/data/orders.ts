export type OrderStatus = "delivered" | "shipped" | "processing" | "cancelled";

export type OrderLine = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  lines: OrderLine[];
  tracking?: string;
};

export const orders: Order[] = [
  {
    id: "o-2842",
    number: "RVN-2842",
    date: "2026-04-22",
    status: "delivered",
    total: 386,
    tracking: "1Z999AA10123456784",
    lines: [
      { productId: "raven-jacket", size: "M", color: "Raven black", quantity: 1, unitPrice: 248 },
      { productId: "merino-tee", size: "M", color: "Bone", quantity: 1, unitPrice: 78 },
      { productId: "haul-cap", size: "OS", color: "Raven black", quantity: 1, unitPrice: 38 }
    ]
  },
  {
    id: "o-2814",
    number: "RVN-2814",
    date: "2026-04-12",
    status: "shipped",
    total: 256,
    tracking: "1Z999AA10123451102",
    lines: [
      { productId: "summit-boot", size: "10", color: "Raven black", quantity: 1, unitPrice: 218 },
      { productId: "ridge-belt", size: "32", color: "Bone", quantity: 1, unitPrice: 42 }
    ]
  },
  {
    id: "o-2768",
    number: "RVN-2768",
    date: "2026-03-28",
    status: "delivered",
    total: 168,
    lines: [
      {
        productId: "alpine-merino-hoodie",
        size: "L",
        color: "Forest",
        quantity: 1,
        unitPrice: 168
      }
    ]
  },
  {
    id: "o-2702",
    number: "RVN-2702",
    date: "2026-03-04",
    status: "delivered",
    total: 322,
    lines: [
      { productId: "raven-jacket", size: "L", color: "Forest", quantity: 1, unitPrice: 248 },
      { productId: "thermal-tee", size: "L", color: "Bone", quantity: 1, unitPrice: 64 }
    ]
  },
  {
    id: "o-2691",
    number: "RVN-2691",
    date: "2026-02-18",
    status: "cancelled",
    total: 124,
    lines: [
      { productId: "bedrock-jeans", size: "32", color: "Raven black", quantity: 1, unitPrice: 124 }
    ]
  },
  {
    id: "o-2658",
    number: "RVN-2658",
    date: "2026-04-29",
    status: "processing",
    total: 246,
    lines: [
      { productId: "alpine-shell", size: "M", color: "Forest", quantity: 1, unitPrice: 184 },
      { productId: "haul-cap", size: "OS", color: "Forest", quantity: 1, unitPrice: 38 }
    ]
  }
];

export const statusTone: Record<OrderStatus, "success" | "info" | "warning" | "danger"> = {
  delivered: "success",
  shipped: "info",
  processing: "warning",
  cancelled: "danger"
};

export const statusLabel: Record<OrderStatus, string> = {
  delivered: "Delivered",
  shipped: "Shipped",
  processing: "Processing",
  cancelled: "Cancelled"
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
