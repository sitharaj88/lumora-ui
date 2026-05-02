import Link from "next/link";
import { getAuthor } from "../data/authors";
import { type Post, formatPostDate } from "../data/posts";

export function PostCover({
  post,
  className = "",
  aspect = "16/9"
}: {
  post: Post;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[var(--lm-color-border)] ${className}`}
      style={{ background: post.cover, aspectRatio: aspect }}
      aria-hidden="true"
    >
      <span
        className="absolute bottom-3 left-3 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
        style={{
          background: "color-mix(in oklab, var(--lm-color-bg) 70%, transparent)",
          color: "var(--lm-color-text)",
          backdropFilter: "blur(8px)"
        }}
      >
        {post.category}
      </span>
    </div>
  );
}

export function AuthorByline({
  authorId,
  date,
  readMinutes
}: {
  authorId: string;
  date: string;
  readMinutes: number;
}) {
  const author = getAuthor(authorId);
  if (!author) return null;
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--lm-color-muted)]">
      <span
        className="lm-avatar lm-avatar-xs"
        style={{ background: author.bg }}
        aria-hidden="true"
      >
        {author.initials}
      </span>
      <span className="text-[var(--lm-color-text)] font-medium">{author.name}</span>
      <span aria-hidden="true">·</span>
      <span>{formatPostDate(date)}</span>
      <span aria-hidden="true">·</span>
      <span>{readMinutes} min read</span>
    </div>
  );
}

export function PostCard({ post, size = "md" }: { post: Post; size?: "md" | "lg" }) {
  const isLg = size === "lg";
  return (
    <article className="lm-card lm-card-interactive flex flex-col" style={{ overflow: "visible" }}>
      <Link
        href={`/preview/marketing/blog/${post.slug}`}
        className="grid gap-3 p-4 text-inherit no-underline"
      >
        <PostCover post={post} aspect={isLg ? "16/9" : "16/10"} />
        <div className="grid gap-1">
          <p className="text-[10px] uppercase tracking-wider text-[var(--lm-color-muted)]">
            {post.category} · {post.readMinutes} min
          </p>
          <strong className={`leading-snug ${isLg ? "text-lg" : "text-base"}`}>
            {post.title}
          </strong>
          <p className="line-clamp-2 text-sm text-[var(--lm-color-muted)]">{post.excerpt}</p>
        </div>
        <div className="mt-auto pt-1">
          <AuthorByline
            authorId={post.authorId}
            date={post.date}
            readMinutes={post.readMinutes}
          />
        </div>
      </Link>
    </article>
  );
}

export function ComplianceBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{
        background: "color-mix(in oklab, var(--lm-color-success) 8%, var(--lm-color-surface))",
        color: "var(--lm-color-success)",
        border: "1px solid color-mix(in oklab, var(--lm-color-success) 24%, transparent)"
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--lm-color-success)" }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
