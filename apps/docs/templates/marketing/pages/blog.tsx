import Link from "next/link";
import { AuthorByline, PostCard, PostCover } from "../components/atoms";
import { authors } from "../data/authors";
import { posts, type PostCategory } from "../data/posts";

const CATEGORIES: PostCategory[] = ["Engineering", "Compliance", "Product", "Customers"];

export function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const others = posts.filter((p) => p.slug !== featured.slug);

  return (
    <div className="grid gap-12">
      {/* Header */}
      <header className="grid gap-3 text-center">
        <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
          Lumora · Field notes
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
          The Lumora blog
        </h1>
        <p className="mx-auto max-w-2xl text-[var(--lm-color-muted)] md:text-lg">
          Engineering deep dives, customer stories, and field notes from the people building
          Lumora.
        </p>
      </header>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" className="lm-segmented-item lm-badge lm-badge-soft" aria-pressed="true">
          All <span className="ml-1 text-[var(--lm-color-muted)]">{posts.length}</span>
        </button>
        {CATEGORIES.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length;
          return (
            <button
              type="button"
              key={cat}
              className="lm-badge lm-badge-outline cursor-pointer"
            >
              {cat} <span className="ml-1 text-[var(--lm-color-muted)]">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Featured */}
      <section className="grid gap-4">
        <article className="lm-card lm-card-interactive overflow-hidden">
          <Link
            href={`/preview/marketing/blog/${featured.slug}`}
            className="grid gap-0 text-inherit no-underline lg:grid-cols-[1.2fr_1fr]"
          >
            <PostCover post={featured} aspect="16/10" className="rounded-none border-0" />
            <div className="grid content-center gap-4 p-6 md:p-10">
              <div className="flex items-center gap-2">
                <span className="lm-badge lm-badge-primary text-xs">Featured</span>
                <span className="lm-badge lm-badge-soft text-xs">{featured.category}</span>
                <span className="text-xs text-[var(--lm-color-muted)]">
                  {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {featured.title}
              </h2>
              <p className="text-[var(--lm-color-muted)]">{featured.excerpt}</p>
              <AuthorByline
                authorId={featured.authorId}
                date={featured.date}
                readMinutes={featured.readMinutes}
              />
              <div className="mt-2">
                <span className="lm-btn lm-btn-primary lm-btn-sm">Read article →</span>
              </div>
            </div>
          </Link>
        </article>
      </section>

      {/* Latest grid */}
      <section className="grid gap-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest</h2>
          <span className="text-xs text-[var(--lm-color-muted)]">
            {others.length} posts
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Authors */}
      <section className="grid gap-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Writers
          </p>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight">
            People writing for Lumora
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {authors.map((a) => (
            <article key={a.id} className="lm-card">
              <div className="lm-card-body grid gap-3 p-5">
                <span
                  className="lm-avatar lm-avatar-md"
                  style={{ background: a.bg }}
                  aria-hidden="true"
                >
                  {a.initials}
                </span>
                <div className="grid gap-0.5">
                  <strong className="text-sm">{a.name}</strong>
                  <span className="text-xs text-[var(--lm-color-muted)]">{a.role}</span>
                </div>
                <p className="text-xs text-[var(--lm-color-muted)] leading-relaxed">{a.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="grid place-items-center">
        <div
          className="grid w-full max-w-3xl gap-4 rounded-2xl border border-[var(--lm-color-border)] px-6 py-10 text-center md:py-12"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 12%, var(--lm-color-surface)), color-mix(in oklab, var(--lm-color-accent) 8%, var(--lm-color-surface)))"
          }}
        >
          <p className="text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
            Field notes
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Get one good post a month.
          </h2>
          <p className="mx-auto max-w-xl text-[var(--lm-color-muted)]">
            Engineering deep dives and compliance lessons. We send 12 emails a year. No tracking
            pixels, no upsells.
          </p>
          <form className="mx-auto flex w-full max-w-md flex-wrap items-stretch gap-2">
            <input
              className="lm-input flex-1"
              type="email"
              placeholder="you@company.example"
              aria-label="Email"
            />
            <button type="button" className="lm-btn lm-btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
