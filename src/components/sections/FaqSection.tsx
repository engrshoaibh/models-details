"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const FAQ_ITEMS = [
  {
    q: "Which LLM offers the lowest token pricing in 2026?",
    a: "DeepSeek-V4.1-Flash offers the most economical token rates at $0.14 per 1M input tokens and $0.28 per 1M output tokens, with cache hits costing just $0.035/1M. For high-speed frontier reasoning, Claude Haiku 5.5 ($0.25/1M input, $0.025 prompt-cache read) and GPT-6 Luna ($0.10/1M input) lead the efficiency frontier.",
    tag: "Pricing & Economics",
  },
  {
    q: "How does prompt caching reduce LLM API costs?",
    a: "Prompt caching stores the KV-cache of prefix tokens across requests (such as large codebases, developer documentation, or agent system prompts). Providers like Anthropic, OpenAI, and DeepSeek offer up to a 90% discount on cache-read tokens compared to base input rates, cutting agentic coding loop costs by 60%–85%.",
    tag: "Prompt Caching",
  },
  {
    q: "What is the best AI model for coding benchmarks in 2026?",
    a: "Based on verified October 2026 telemetry, Claude Sonnet 5.5 ranks highest on Terminal-Bench 4.0 with a 70.6% score at $3.60 blended $/1M, while Claude Opus 5.5 leads full repository architecture with 54.4% on FrontierCode v1.1 and 1846 GDPval-AA Elo, followed closely by GPT-6 Astra at 53.3%.",
    tag: "Benchmarks",
  },
  {
    q: "How do you calculate LLM input and output token costs?",
    a: "Total LLM cost is calculated using: Total Cost = ((Uncached Input / 1M) * Input Rate) + ((Cached Input / 1M) * Cache Read Rate) + ((Output Tokens / 1M) * Output Rate). For asynchronous non-urgent workloads, Batch API endpoints cut total expenditure by an additional 50%. Use our interactive Cost Simulator above to test custom workloads.",
    tag: "Calculator",
  },
  {
    q: "Which frontier AI models support 1M+ token context windows?",
    a: "Meta Llama 4 Scout leads the industry with a verified 10,000,000 token context window. Google Gemini 4 Argon and Gemini 2.5 Pro provide 2,000,000 token context, while Anthropic's entire Claude 5.5 lineup (Opus, Sonnet, and Haiku) supports 1,000,000 token context windows with up to 128K max output tokens.",
    tag: "Context Windows",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="w-full border-t border-[var(--border-line)] bg-[var(--bg-canvas)]">
      {/* Section Header Strip */}
      <div className="section-strip-wrap">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">03.B /</span>
            <span>TOKEN ECONOMICS &amp; LLM PRICING FAQ</span>
          </div>
          <div className="hidden md:block text-[var(--text-muted)] text-[10.5px]">
            FREQUENTLY ASKED QUESTIONS · SEARCH &amp; COST GUIDELINES
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--accent-blue)] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Knowledge Base</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
            Frequently Asked Questions on LLM Pricing &amp; Token Economics
          </h2>
          <p className="text-[14px] text-[var(--text-muted)] max-w-[65ch]">
            Direct answers on token cost calculation, prompt caching multipliers, coding benchmarks,
            and 2026 frontier model selection.
          </p>
        </div>

        <div className="space-y-3 font-mono">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[var(--border-line)] rounded-sm bg-[var(--bg-sunken)] transition-colors hover:border-[var(--border-strong)]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[11px] px-2 py-0.5 rounded border border-[var(--border-line)] text-[var(--accent-blue)] shrink-0">
                      {item.tag}
                    </span>
                    <span className="text-[13.5px] md:text-[15px] font-sans font-medium text-[var(--text-primary)]">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--text-primary)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 md:px-5 md:pb-6 text-[13px] md:text-[14px] font-sans text-[var(--text-muted)] leading-[1.65] border-t border-[var(--border-line)] pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
