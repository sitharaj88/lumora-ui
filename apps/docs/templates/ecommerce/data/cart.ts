export type CartLine = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

export const cartLines: CartLine[] = [
  { productId: "raven-jacket", color: "Raven black", size: "M", quantity: 1 },
  { productId: "merino-tee", color: "Bone", size: "M", quantity: 2 },
  { productId: "haul-cap", color: "Raven black", size: "OS", quantity: 1 }
];

export const promoCode = "SHIPFREE";
export const shippingThreshold = 250;
