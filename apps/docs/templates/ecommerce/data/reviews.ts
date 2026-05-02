export type Review = {
  id: string;
  productId: string;
  authorInitials: string;
  authorName: string;
  authorBg: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const reviews: Review[] = [
  {
    id: "r-001",
    productId: "raven-jacket",
    authorInitials: "MK",
    authorName: "Maya K.",
    authorBg: grad("accent", "info"),
    rating: 5,
    title: "Best rain shell I've owned",
    body: "Wore it on a 3-day Pacific Northwest trip and stayed completely dry. The pit-zips actually do something, and the helmet hood is real. Sized true to chart for layering — I went up one size and it's perfect over a fleece.",
    date: "2026-04-20",
    verified: true
  },
  {
    id: "r-002",
    productId: "raven-jacket",
    authorInitials: "AL",
    authorName: "Alex L.",
    authorBg: grad("primary", "accent"),
    rating: 5,
    title: "Worth every penny",
    body: "I commute by bike year-round. This is the first jacket where I don't sweat through it. Pockets are placed for cycling, not skiing — small but important difference.",
    date: "2026-04-12",
    verified: true
  },
  {
    id: "r-003",
    productId: "raven-jacket",
    authorInitials: "SP",
    authorName: "Sam P.",
    authorBg: grad("warning", "danger"),
    rating: 4,
    title: "Great fabric, sleeves run long",
    body: "Fabric feels premium. My only complaint is the sleeves run a bit long for my arm length — fine over a base layer, sloppy over just a tee. I'm 5'10\" / 175cm.",
    date: "2026-04-04",
    verified: true
  },
  {
    id: "r-004",
    productId: "raven-jacket",
    authorInitials: "RS",
    authorName: "Riya S.",
    authorBg: grad("success", "info"),
    rating: 5,
    title: "Bought one for myself, then one for my partner",
    body: "Replaced our two old shells with this. Two months in, no leaks, no zipper issues, and the DWR is still beading water. The Forest color looks even better in person.",
    date: "2026-03-28",
    verified: true
  },
  {
    id: "r-005",
    productId: "raven-jacket",
    authorInitials: "JH",
    authorName: "Jin H.",
    authorBg: grad("info", "primary"),
    rating: 4,
    title: "Bigger sizing — order down",
    body: "Generously cut. I usually wear M but went down to S for a closer fit and it's perfect. Not a complaint, just FYI.",
    date: "2026-03-22",
    verified: false
  }
];

export function reviewsForProduct(id: string) {
  return reviews.filter((r) => r.productId === id);
}

export function ratingHistogram(productId: string) {
  const counts = [0, 0, 0, 0, 0];
  for (const r of reviews.filter((rv) => rv.productId === productId)) {
    counts[r.rating - 1] += 1;
  }
  return counts;
}
