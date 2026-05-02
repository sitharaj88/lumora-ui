import Link from "next/link";
import type { ReactNode } from "react";
import { AuthorByline, PostCard, PostCover } from "../components/atoms";
import { getAuthor } from "../data/authors";
import { type PostBlock, getPost, posts } from "../data/posts";

export function PostPage({ slug }: { slug: string }) {
  const post = getPost(slug) ?? posts[0];
  const author = getAuthor(post.authorId);
  const headings = post.body.filter(
    (b): b is Extract<PostBlock, { kind: "h2" }> => b.kind === "h2"
  );
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="grid gap-12">
      {/* Hero */}
      <header className="grid gap-5">
        <nav className="lm-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/preview/marketing/blog">Blog</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{post.category}</span>
        </nav>
        <div className="grid gap-3">
          <span className="lm-badge lm-badge-soft text-xs w-fit">{post.category}</span>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--lm-color-muted)] leading-relaxed">{post.excerpt}</p>
          <AuthorByline
            authorId={post.authorId}
            date={post.date}
            readMinutes={post.readMinutes}
          />
        </div>
        <PostCover post={post} aspect="2.4/1" />
      </header>

      {/* Article + TOC */}
      <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
        {/* Body */}
        <article
          className="grid gap-6"
          style={{ maxWidth: "44rem" }}
        >
          {post.body.map((block, idx) => (
            <BlockRenderer key={idx} block={block} />
          ))}

          {/* Share row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--lm-color-border)] pt-6">
            <div className="flex flex-wrap gap-1.5">
              {[post.category, "compliance", "lumora"].map((t) => (
                <span key={t} className="lm-badge lm-badge-soft text-xs">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--lm-color-muted)]">Share</span>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Copy link
              </button>
              <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                Email
              </button>
            </div>
          </div>

          {/* Author bio */}
          {author && (
            <article
              className="lm-card lm-card-flat mt-4"
              style={{ background: "var(--lm-color-surface-sunken)" }}
            >
              <div className="lm-card-body grid gap-3 p-6 md:grid-cols-[auto_1fr] md:items-start">
                <span
                  className="lm-avatar lm-avatar-lg"
                  style={{ background: author.bg }}
                  aria-hidden="true"
                >
                  {author.initials}
                </span>
                <div className="grid gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <strong className="text-base">{author.name}</strong>
                    <span className="text-xs text-[var(--lm-color-muted)]">{author.role}</span>
                  </div>
                  <p className="text-sm text-[var(--lm-color-muted)] leading-relaxed">
                    {author.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="lm-btn lm-btn-outline lm-btn-sm">
                      Read more posts
                    </button>
                    <button type="button" className="lm-btn lm-btn-ghost lm-btn-sm">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </article>

        {/* TOC + meta */}
        <aside className="hidden lg:block">
          <div
            className="sticky grid gap-6"
            style={{ top: "calc(4rem + 1.5rem)" }}
          >
            <div className="grid gap-2 text-xs">
              <p className="font-bold uppercase tracking-wider text-[var(--lm-color-muted)]">
                On this page
              </p>
              <ul
                className="grid gap-1.5 border-l text-sm"
                style={{ borderColor: "var(--lm-color-border)", paddingLeft: "0.75rem" }}
              >
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-[var(--lm-color-muted)] no-underline hover:text-[var(--lm-color-text)]"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-2 text-xs">
              <p className="font-bold uppercase tracking-wider text-[var(--lm-color-muted)]">
                Article
              </p>
              <dl className="grid gap-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--lm-color-muted)]">Published</dt>
                  <dd>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--lm-color-muted)]">Read time</dt>
                  <dd>{post.readMinutes} min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--lm-color-muted)]">Category</dt>
                  <dd>{post.category}</dd>
                </div>
              </dl>
            </div>

            <div
              className="grid gap-2 rounded-lg border p-4"
              style={{
                borderColor: "var(--lm-color-border)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--lm-color-primary) 8%, var(--lm-color-surface)), var(--lm-color-surface))"
              }}
            >
              <strong className="text-sm">Try Lumora</strong>
              <p className="text-xs text-[var(--lm-color-muted)] leading-relaxed">
                14-day free trial. SOC 2 ready in 8 days, median.
              </p>
              <Link
                href="/preview/marketing/pricing"
                className="lm-btn lm-btn-primary lm-btn-sm no-underline"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="grid gap-4 border-t border-[var(--lm-color-border)] pt-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Related posts</h2>
            <Link href="/preview/marketing/blog" className="lm-btn lm-btn-outline lm-btn-sm">
              All posts →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BlockRenderer({ block }: { block: PostBlock }): ReactNode {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="text-balance text-2xl font-bold tracking-tight scroll-mt-32 md:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className="text-lg font-bold tracking-tight scroll-mt-32">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-base leading-relaxed text-[var(--lm-color-text)]">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="grid gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base leading-relaxed">
              <span
                className="lm-badge lm-badge-success lm-badge-dot mt-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="docs-code-window">
          <div className="docs-code-window-header">
            <span className="docs-code-window-dot" />
            <span className="docs-code-window-dot" />
            <span className="docs-code-window-dot" />
            <span className="ml-2 text-xs uppercase tracking-wider text-[var(--lm-color-muted)]">
              {block.lang}
            </span>
          </div>
          <pre className="docs-code">
            <code>{block.text}</code>
          </pre>
        </div>
      );
    case "quote":
      return (
        <blockquote
          className="grid gap-3 rounded-lg border-l-4 px-5 py-4"
          style={{
            borderColor: "var(--lm-color-primary)",
            background: "color-mix(in oklab, var(--lm-color-primary) 6%, var(--lm-color-surface))"
          }}
        >
          <p className="text-balance text-lg font-medium leading-relaxed italic">
            "{block.text}"
          </p>
          <cite className="text-sm not-italic text-[var(--lm-color-muted)]">
            — {block.attribution}
          </cite>
        </blockquote>
      );
    case "callout":
      return (
        <div className={`lm-alert lm-alert-${block.tone}`}>
          <span aria-hidden="true">
            {block.tone === "warning" ? "!" : block.tone === "danger" ? "✕" : block.tone === "success" ? "✓" : "i"}
          </span>
          <div>
            <p className="lm-alert-title">{block.title}</p>
            <p className="text-sm leading-relaxed">{block.body}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}
