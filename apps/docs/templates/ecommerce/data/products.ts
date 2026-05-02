export type ProductCategory = "Outerwear" | "Tops" | "Bottoms" | "Footwear" | "Accessories";
export type ProductBadge = "new" | "sale" | "limited" | "best-seller" | null;

export type ProductVariant = {
  size: string;
  stock: number;
};

export type ProductColor = {
  name: string;
  swatch: string;
  variants: ProductVariant[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  badge: ProductBadge;
  description: string;
  details: string[];
  /** CSS background for the visual placeholder. */
  image: string;
  /** Additional gallery placeholders. */
  gallery: string[];
  colors: ProductColor[];
  defaultColor: string;
  tags: string[];
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

const radial = (a: string, b: string) =>
  `radial-gradient(80% 80% at 30% 20%, var(--lm-color-${a}), var(--lm-color-${b}))`;

const all: ProductColor[] = [
  {
    name: "Raven black",
    swatch: "linear-gradient(135deg, #18181b, #3f3f46)",
    variants: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 12 },
      { size: "M", stock: 18 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 0 }
    ]
  },
  {
    name: "Bone",
    swatch: "linear-gradient(135deg, #f4f1ea, #e0d9c5)",
    variants: [
      { size: "XS", stock: 0 },
      { size: "S", stock: 6 },
      { size: "M", stock: 9 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 2 }
    ]
  },
  {
    name: "Forest",
    swatch: "linear-gradient(135deg, #14532d, #166534)",
    variants: [
      { size: "XS", stock: 1 },
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 }
    ]
  }
];

export const products: Product[] = [
  {
    id: "raven-jacket",
    name: "Raven all-weather jacket",
    brand: "Raven",
    category: "Outerwear",
    price: 248,
    comparePrice: 320,
    rating: 4.7,
    reviewCount: 312,
    badge: "best-seller",
    description:
      "A 3-layer waterproof shell with a soft inner liner. YKK waterproof zippers, helmet-compatible hood, and pit-zip ventilation.",
    details: [
      "3-layer waterproof / breathable shell · 28k mm rating",
      "Helmet-compatible adjustable hood",
      "YKK waterproof zippers throughout",
      "Pit-zip underarm ventilation",
      "Recycled face fabric (84% post-consumer)"
    ],
    image: radial("primary", "accent"),
    gallery: [radial("primary", "accent"), radial("accent", "info"), radial("info", "primary")],
    colors: all,
    defaultColor: "Raven black",
    tags: ["waterproof", "3-layer", "rain"]
  },
  {
    id: "merino-tee",
    name: "Merino lightweight tee",
    brand: "Raven",
    category: "Tops",
    price: 78,
    rating: 4.6,
    reviewCount: 184,
    badge: "new",
    description:
      "150 GSM merino wool tee. Anti-odour, fast-drying, no static cling. The shirt you forget you're wearing.",
    details: ["100% merino wool · 150 GSM", "Flatlock seams to eliminate chafe", "Hand-feel: silky"],
    image: radial("success", "info"),
    gallery: [radial("success", "info"), radial("info", "primary"), radial("primary", "accent")],
    colors: all.slice(0, 2),
    defaultColor: "Bone",
    tags: ["merino", "anti-odour", "travel"]
  },
  {
    id: "trail-pant",
    name: "Trail technical pant",
    brand: "Raven",
    category: "Bottoms",
    price: 138,
    rating: 4.5,
    reviewCount: 96,
    badge: null,
    description:
      "Stretch nylon trail pant with abrasion-resistant knees and articulated cut. Two zip pockets, one side pocket.",
    details: ["94% nylon / 6% spandex", "Abrasion-resistant knee panels", "Articulated 4-way stretch"],
    image: radial("warning", "danger"),
    gallery: [radial("warning", "danger")],
    colors: [all[0], all[2]],
    defaultColor: "Forest",
    tags: ["trail", "stretch"]
  },
  {
    id: "summit-boot",
    name: "Summit waterproof boot",
    brand: "Raven",
    category: "Footwear",
    price: 218,
    comparePrice: 260,
    rating: 4.8,
    reviewCount: 421,
    badge: "sale",
    description:
      "Waterproof leather hiker with a Vibram outsole. Sized true to standard US, available half sizes.",
    details: ["Vibram MegaGrip outsole", "Full-grain waterproof leather", "Removable footbed"],
    image: radial("accent", "warning"),
    gallery: [radial("accent", "warning"), radial("warning", "danger")],
    colors: [all[0]],
    defaultColor: "Raven black",
    tags: ["waterproof", "leather", "trail"]
  },
  {
    id: "alpine-shell",
    name: "Alpine softshell",
    brand: "Raven",
    category: "Outerwear",
    price: 184,
    rating: 4.4,
    reviewCount: 78,
    badge: "limited",
    description:
      "A soft-touch, wind-blocking shell that's stretchy enough for the climb and warm enough for the descent.",
    details: ["Wind-blocking face fabric", "DWR finish", "4-way stretch"],
    image: radial("info", "accent"),
    gallery: [radial("info", "accent")],
    colors: all,
    defaultColor: "Forest",
    tags: ["softshell", "wind"]
  },
  {
    id: "haul-cap",
    name: "Haul 5-panel cap",
    brand: "Raven",
    category: "Accessories",
    price: 38,
    rating: 4.5,
    reviewCount: 62,
    badge: null,
    description: "Recycled-cotton 5-panel with a low crown. Looks better when it's a little broken-in.",
    details: ["100% recycled cotton", "Low crown · 5-panel"],
    image: radial("primary", "info"),
    gallery: [radial("primary", "info")],
    colors: [all[0], all[2]],
    defaultColor: "Raven black",
    tags: ["recycled"]
  },
  {
    id: "alpine-merino-hoodie",
    name: "Alpine merino hoodie",
    brand: "Raven",
    category: "Tops",
    price: 168,
    rating: 4.7,
    reviewCount: 142,
    badge: "best-seller",
    description: "230 GSM merino hoodie with an oversized hood and thumb loops. The travel layer.",
    details: ["100% merino · 230 GSM", "Thumb loops on cuffs", "Generous helmet-compatible hood"],
    image: radial("info", "success"),
    gallery: [radial("info", "success")],
    colors: all,
    defaultColor: "Forest",
    tags: ["merino", "hoodie"]
  },
  {
    id: "ridge-belt",
    name: "Ridge canvas belt",
    brand: "Raven",
    category: "Accessories",
    price: 42,
    rating: 4.3,
    reviewCount: 38,
    badge: null,
    description: "Heavy canvas belt with a rugged steel buckle. Sized to the inch.",
    details: ["Heavy 14-oz canvas", "Solid steel buckle"],
    image: radial("warning", "primary"),
    gallery: [radial("warning", "primary")],
    colors: [all[0], all[1]],
    defaultColor: "Bone",
    tags: ["canvas", "belt"]
  },
  {
    id: "nimbus-rain-shell",
    name: "Nimbus packable rain shell",
    brand: "Raven",
    category: "Outerwear",
    price: 158,
    rating: 4.4,
    reviewCount: 88,
    badge: "new",
    description: "Packs into its own pocket. 6.4 oz. Carry it because you'll wear it.",
    details: ["6.4 oz total weight", "Packs into chest pocket", "DWR + 10k mm waterproof"],
    image: radial("info", "primary"),
    gallery: [radial("info", "primary")],
    colors: [all[0], all[2]],
    defaultColor: "Raven black",
    tags: ["rain", "packable"]
  },
  {
    id: "bedrock-jeans",
    name: "Bedrock 13oz jeans",
    brand: "Raven",
    category: "Bottoms",
    price: 124,
    rating: 4.6,
    reviewCount: 112,
    badge: null,
    description: "Heavyweight selvedge denim, classic 5-pocket cut. Will last a decade.",
    details: ["13 oz selvedge denim", "Classic 5-pocket", "Mid-rise"],
    image: radial("primary", "accent"),
    gallery: [radial("primary", "accent")],
    colors: [all[0]],
    defaultColor: "Raven black",
    tags: ["denim", "selvedge"]
  },
  {
    id: "thermal-tee",
    name: "Thermal long-sleeve",
    brand: "Raven",
    category: "Tops",
    price: 64,
    rating: 4.4,
    reviewCount: 56,
    badge: null,
    description: "Waffle-knit baselayer for cold mornings.",
    details: ["100% organic cotton", "Waffle-knit", "Slim fit"],
    image: radial("warning", "info"),
    gallery: [radial("warning", "info")],
    colors: [all[0], all[1]],
    defaultColor: "Bone",
    tags: ["base-layer"]
  },
  {
    id: "field-tote",
    name: "Field utility tote · 22L",
    brand: "Raven",
    category: "Accessories",
    price: 88,
    rating: 4.7,
    reviewCount: 71,
    badge: null,
    description: "Heavy waxed-canvas tote with leather straps and a zip closure.",
    details: ["18-oz waxed canvas", "Bridle-leather straps", "22L volume"],
    image: radial("danger", "warning"),
    gallery: [radial("danger", "warning")],
    colors: [all[0], all[1]],
    defaultColor: "Bone",
    tags: ["tote", "canvas"]
  }
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
