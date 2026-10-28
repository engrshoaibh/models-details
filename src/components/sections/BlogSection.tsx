"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { BookOpen, Calendar, Clock, ArrowRight, Tag, ChevronDown, ChevronUp } from "lucide-react";

export function BlogSection() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <div id="blog">
      {/* Landmark 03.C Header Bar */}
      <div className="section-strip-wrap" id="sec-blog">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">03.C /</span>
            <span>ENGINEERING BLOG &amp; GUIDES</span>
          </div>
          <div className="hidden sm:block text-[var(--text-muted)] text-[10.5px]">
            FRONTIER AI TELEMETRY · FIELD FIXES &amp; BENCHMARK GUIDES
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <div className="p-7 md:p-10 border-b border-[var(--border-line)] bg-[var(--bg-canvas)]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--accent-blue)] uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Knowledge &amp; Troubleshooting</span>
          </div>
          <h2 className="font-display text-[clamp(28px,3.8vw,48px)] leading-[1.05] mb-3">
            In-depth guides for <span className="font-serif-italic">frontier developers.</span>
          </h2>
          <p className="text-[14.5px] text-[var(--text-muted)] leading-relaxed max-w-[65ch]">
            Real-world debugging, environment setup, model availability deep dives, and practical
            workarounds for modern agentic development workflows.
          </p>
        </div>
      </div>

      {/* Blog Articles Feed */}
      <section className="border-b border-[var(--border-line)] bg-[var(--bg-canvas)] divide-y divide-[var(--border-line)]">
        {BLOG_POSTS.map((post: BlogPost) => {
          const isExpanded = expandedSlug === post.slug;
          return (
            <article
              key={post.slug}
              className="p-6 md:p-9 lg:p-10 hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="max-w-4xl">
                {/* Meta Bar */}
                <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--text-muted)] mb-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded border border-[var(--accent-blue)]/30 text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 font-semibold uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span>·</span>
                  <span>{post.author}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-[22px] md:text-[28px] font-semibold text-[var(--text-primary)] leading-[1.2] mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[var(--accent-blue)] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap mb-5 font-mono">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 border border-[var(--border-line)] text-[var(--text-muted)] rounded-sm bg-[var(--bg-sunken)]"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Inline Quick Read / Full Article Actions */}
                <div className="flex items-center gap-4 flex-wrap font-mono">
                  <button
                    onClick={() => toggleExpand(post.slug)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--accent-blue)] hover:underline cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <span>Hide Full Article</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Read Full Guide Inline</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[12px] text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors"
                  >
                    <span>Permanent URL &amp; Discussion</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Expanded Article Body (Inline Reader) */}
                {isExpanded && (
                  <div className="mt-7 pt-6 border-t border-[var(--border-line)] prose prose-invert max-w-none text-[14px] leading-relaxed text-[var(--text-primary)]">
                    <div className="p-6 md:p-8 bg-[var(--bg-sunken)] border border-[var(--border-line)] rounded-sm whitespace-pre-line font-sans">
                      {post.content}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
