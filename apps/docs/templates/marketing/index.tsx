import { NavIcon } from "../_shared/nav-icon";
import type { TemplateMeta, TemplatePageProps } from "../../lib/templates-registry";
import { posts } from "./data/posts";
import { BlogPage as RealBlog } from "./pages/blog";
import { FeaturesPage as RealFeatures } from "./pages/features";
import { LandingPage as RealLanding } from "./pages/landing";
import { PostPage as RealPost } from "./pages/post";
import { PricingPage as RealPricing } from "./pages/pricing";

const Landing = (_: TemplatePageProps) => <RealLanding />;
const Features = (_: TemplatePageProps) => <RealFeatures />;
const Pricing = (_: TemplatePageProps) => <RealPricing />;
const Blog = (_: TemplatePageProps) => <RealBlog />;
const Post = ({ segments }: TemplatePageProps) => (
  <RealPost slug={segments[1] ?? "why-compliance-platforms-fail"} />
);

export const marketingTemplate: TemplateMeta = {
  slug: "marketing",
  name: "Marketing site",
  category: "Marketing",
  status: "ready",
  description: "A 5-page marketing site: landing, features, pricing, blog list, blog post.",
  productName: "Lumora Cloud",
  productInitial: "L",
  accent: "var(--lm-color-accent)",
  pages: [
    {
      path: "",
      label: "Landing",
      section: "Site",
      icon: <NavIcon name="home" />,
      component: Landing
    },
    {
      path: "features",
      label: "Features",
      section: "Site",
      icon: <NavIcon name="features" />,
      component: Features
    },
    {
      path: "pricing",
      label: "Pricing",
      section: "Site",
      icon: <NavIcon name="pricing" />,
      component: Pricing
    },
    {
      path: "blog",
      label: "Blog",
      section: "Content",
      icon: <NavIcon name="blog" />,
      badge: `${posts.length}`,
      component: Blog
    },
    // One hidden page per blog post so every link works
    ...posts.map((p) => ({
      path: `blog/${p.slug}`,
      label: p.title,
      hideFromNav: true,
      component: Post
    }))
  ]
};
