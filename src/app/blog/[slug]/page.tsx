import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen } from "lucide-react";
import { getSiteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | ModelCraft",
    };
  }

  const baseUrl = getSiteUrl();
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | ModelCraft`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: "2026-10-28T00:00:00.000Z",
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full h-[54px] bg-[var(--bg-frosted)] backdrop-blur-[14px] border-b border-[var(--border-line)] flex items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ModelCraft Directory</span>
        </Link>
        <span className="font-display font-semibold text-[14px]">ModelCraft Blog</span>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-5 py-10 md:py-16">
        {/* Breadcrumb / Category */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] mb-4">
          <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
          <span>/</span>
          <Link href="/#blog" className="hover:text-[var(--text-primary)]">Blog</Link>
          <span>/</span>
          <span className="text-[var(--accent-blue)]">{post.category}</span>
        </div>

        {/* Article Header */}
        <h1 className="font-display text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.08] tracking-tight mb-5">
          {post.title}
        </h1>

        {/* Meta Bar */}
        <div className="flex items-center gap-4 font-mono text-[12px] text-[var(--text-muted)] pb-6 mb-8 border-b border-[var(--border-line)] flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
          <span>·</span>
          <span>By {post.author}</span>
        </div>

        {/* Lead Excerpt */}
        <div className="p-4 md:p-6 mb-8 rounded-sm bg-[var(--bg-sunken)] border-l-2 border-[var(--accent-blue)] text-[15px] md:text-[16px] leading-relaxed text-[var(--text-primary)] font-medium">
          {post.excerpt}
        </div>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none text-[15px] md:text-[16px] leading-[1.8] text-[var(--text-primary)]">
          <div className="whitespace-pre-line font-sans">
            {post.content}
          </div>
        </article>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-[var(--border-line)]">
          <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Article Tags
          </div>
          <div className="flex items-center gap-2 flex-wrap font-mono">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 border border-[var(--border-line)] text-[var(--text-muted)] rounded-sm bg-[var(--bg-sunken)]"
              >
                <Tag className="w-2.5 h-2.5" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 p-6 rounded-sm border border-[var(--border-line)] bg-[var(--bg-sunken)] flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-display font-semibold text-[16px] mb-1">
              Explore Live 2026 Model Telemetry
            </div>
            <p className="text-[13px] text-[var(--text-muted)]">
              Compare Gemini 4 Argon against 19 other frontier models with verified benchmarks.
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-[var(--accent-blue)] text-white text-[12px] font-mono font-medium rounded-sm hover:opacity-90 transition-opacity"
          >
            Open ModelCraft Matrix →
          </Link>
        </div>
      </main>
    </div>
  );
}
