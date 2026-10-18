"use client";

import React from "react";
import { Model, ProviderName } from "@/types";
import { SquircleIconsNav } from "./SquircleIconsNav";
import { MarqueeTicker } from "./MarqueeTicker";

interface HeroSectionProps {
  models: Model[];
  selectedProvider: string;
  onSelectProvider: (provider: string) => void;
  onScrollTo: (id: string) => void;
  onSelectModel: (id: string) => void;
}

const PROVIDERS: { label: string; value: string }[] = [
  { label: "All (19)", value: "ALL" },
  { label: "Anthropic", value: "Anthropic" },
  { label: "OpenAI", value: "OpenAI" },
  { label: "Google", value: "Google" },
  { label: "DeepSeek", value: "DeepSeek" },
  { label: "Mistral", value: "Mistral" },
  { label: "Meta", value: "Meta" },
];

export function HeroSection({
  models,
  selectedProvider,
  onSelectProvider,
  onScrollTo,
  onSelectModel,
}: HeroSectionProps) {
  return (
    <div id="apps">
      {/* Landmark 01 Header Bar */}
      <div className="section-strip-wrap">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">01 /</span>
            <span>FRONTIER MODELS</span>
          </div>
          <div className="hidden sm:block text-[var(--text-muted)] text-[10.5px]">
            NINETEEN MODELS · OPEN BENCHMARKS · PURE TELEMETRY
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      {/* Hero Content Section */}
      <section className="p-6 md:p-10 lg:px-10 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-2.5 py-1 mb-4 rounded border border-[var(--border-strong)] bg-[var(--bg-hover)] text-[var(--accent-blue)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span>Verified 2026 Telemetry · 19 Frontier AI Models</span>
          </div>
          <h1 className="font-display text-[clamp(34px,4.5vw,64px)] leading-[1.02] mb-5">
            LLM Pricing Comparison &amp; Token Cost{" "}
            <span className="font-serif-italic">Calculator.</span>
          </h1>
          <p className="text-[clamp(15px,1.2vw,17.5px)] text-[var(--text-muted)] max-w-[58ch] leading-[1.55] mb-7">
            Compare real-time LLM pricing per 1M tokens, prompt-caching discounts,
            batch API economics, and verified coding benchmark rankings (Terminal-Bench &amp; FrontierCode)
            across{" "}
            <a
              href="https://developers.openai.com/api/docs/models"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              OpenAI
            </a>
            ,{" "}
            <a
              href="https://platform.claude.com/docs/en/models/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              Anthropic
            </a>
            ,{" "}
            <a
              href="https://ai.google.dev/gemini-api/docs/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              Google DeepMind
            </a>
            ,{" "}
            <a
              href="https://www.morphllm.com/deepseek-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              DeepSeek
            </a>
            ,{" "}
            <a
              href="https://docs.mistral.ai/inference/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              Mistral
            </a>
            , and{" "}
            <a
              href="https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] border-b border-[var(--border-strong)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors"
            >
              Meta AI
            </a>
            .
          </p>

          <div className="flex items-stretch gap-2.5 flex-wrap mb-4 font-mono">
            <button
              onClick={() => onScrollTo("sec-matrix")}
              className="bg-[var(--text-primary)] text-[var(--bg-canvas)] border border-[var(--text-primary)] px-5 py-3 text-[11.5px] tracking-[0.06em] uppercase font-semibold inline-flex items-center gap-2.5 cursor-pointer hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              <span>Explore All 19 Models</span>
              <span>▾</span>
            </button>
            <button
              onClick={() => onScrollTo("sec-simulator")}
              className="bg-transparent text-[var(--text-primary)] border border-[var(--border-line)] px-4 py-3 text-[11.5px] tracking-[0.06em] uppercase font-medium inline-flex items-center gap-2 cursor-pointer hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)] transition-colors"
            >
              <span>Token Cost Simulator</span>
            </button>
            <button
              onClick={() => onScrollTo("sec-benchmarks")}
              className="bg-transparent text-[var(--text-primary)] border border-[var(--border-line)] px-4 py-3 text-[11.5px] tracking-[0.06em] uppercase font-medium inline-flex items-center gap-2 cursor-pointer hover:bg-[var(--bg-hover)] hover:border-[var(--border-strong)] transition-colors"
            >
              <span>Benchmark Arena</span>
            </button>
          </div>

          <div className="inline-flex flex-wrap border border-[var(--border-line)] font-mono mt-2 max-w-full">
            <span className="px-3 py-1.5 text-[10.5px] tracking-[0.06em] uppercase text-[var(--text-primary)] font-semibold bg-[var(--bg-hover)] border-r border-[var(--border-line)] cursor-default">
              Filter Matrix
            </span>
            {PROVIDERS.map((p) => {
              const active = selectedProvider === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => {
                    onSelectProvider(p.value);
                    onScrollTo("sec-matrix");
                  }}
                  className={`px-3 py-1.5 text-[10.5px] tracking-[0.06em] uppercase border-r last:border-r-0 border-[var(--border-line)] cursor-pointer transition-colors ${
                    active
                      ? "bg-[var(--accent-blue)] text-white font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] bg-transparent"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 13 Vibrant Illustrated Squircle Icons Cluster */}
        <div className="w-full lg:w-[440px] shrink-0 flex flex-col items-center">
          <SquircleIconsNav models={models} onSelectModel={onSelectModel} />
        </div>
      </section>

      {/* Infinite 36s Marquee Telemetry Bar */}
      <MarqueeTicker models={models} />
    </div>
  );
}
