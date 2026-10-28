"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-prose leading-[1.8] text-[var(--text-primary)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="font-display text-[26px] md:text-[34px] font-bold text-[var(--text-primary)] mt-10 mb-4 tracking-tight border-b border-[var(--border-line)] pb-3"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="font-display text-[22px] md:text-[26px] font-bold text-[var(--text-primary)] mt-10 mb-3 tracking-tight flex items-center gap-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="font-display text-[18px] md:text-[20px] font-semibold text-[var(--text-primary)] mt-7 mb-2 tracking-tight"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="text-[15px] md:text-[16px] leading-[1.8] mb-5 text-[var(--text-primary)]/90" {...props} />
          ),
          a: ({ node, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[var(--accent-blue)] underline underline-offset-4 decoration-[var(--accent-blue)]/40 hover:decoration-[var(--accent-blue)] transition-colors font-medium"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2 text-[15px] md:text-[16px]" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2 text-[15px] md:text-[16px]" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-[1.75] text-[var(--text-primary)]/90" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-[var(--text-primary)]" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-t border-[var(--border-line)]" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-6 p-4 md:p-5 rounded-sm bg-[var(--bg-sunken)] border-l-4 border-[var(--accent-blue)] text-[14.5px] md:text-[15.5px] italic text-[var(--text-primary)] font-sans"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--bg-sunken)] border border-[var(--border-line)] text-[var(--accent-blue)]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-5 p-4 rounded bg-[var(--workspace-bg)] border border-[var(--workspace-border)] overflow-x-auto font-mono text-[12.5px] text-[#E2E8F0]">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
