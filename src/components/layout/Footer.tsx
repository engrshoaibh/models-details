import React from "react";

export function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[var(--border-line)] bg-[var(--bg-canvas)]">
      <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--border-line)]">
        <div className="font-display text-[18px] font-semibold mb-2">
          ModelCraft
        </div>
        <p className="text-[13px] text-[var(--text-muted)] max-w-[34ch] mb-[14px]">
          The architectural directory for AI model pricing, prompt-cache economics,
          and agentic evaluations.
        </p>
        <div className="font-mono text-[10.5px] text-[var(--text-muted)]">
          © 2026 MODELCRAFT · SNAPSHOT 2026-10-14
        </div>
      </div>

      <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--border-line)]">
        <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-[var(--text-muted)] mb-3">
          Frontier APIs
        </div>
        <ul className="flex flex-col gap-[7px] text-[13px] list-none p-0 m-0">
          <li>
            <a
              href="https://developers.openai.com/api/docs/models"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              OpenAI GPT-6 Astra & Sol ↗
            </a>
          </li>
          <li>
            <a
              href="https://platform.claude.com/docs/en/models/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Anthropic Claude 5.5 Lineup ↗
            </a>
          </li>
          <li>
            <a
              href="https://ai.google.dev/gemini-api/docs/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Google Gemini 4 Argon & 3.8 ↗
            </a>
          </li>
          <li>
            <a
              href="https://docs.mistral.ai/inference/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Mistral Large 4 & Codestral ↗
            </a>
          </li>
        </ul>
      </div>

      <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--border-line)]">
        <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-[var(--text-muted)] mb-3">
          Open-Weight & MoE
        </div>
        <ul className="flex flex-col gap-[7px] text-[13px] list-none p-0 m-0">
          <li>
            <a
              href="https://www.morphllm.com/deepseek-api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              DeepSeek-V4.1-Flash & V3.2-Exp ↗
            </a>
          </li>
          <li>
            <a
              href="https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Meta Llama 4 Scout (10M) ↗
            </a>
          </li>
          <li>
            <a
              href="https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Meta Llama 4 Maverick ↗
            </a>
          </li>
          <li>
            <a
              href="https://openrouter.ai/google/gemini-2.5-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Gemini 2.5 Pro Reference ↗
            </a>
          </li>
        </ul>
      </div>

      <div className="p-8">
        <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-[var(--text-muted)] mb-3">
          Release Notes
        </div>
        <ul className="flex flex-col gap-[7px] text-[13px] list-none p-0 m-0">
          <li>
            <a
              href="https://www.anthropic.com/claude-haiku-5-5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Claude Haiku 5.5 Launch ↗
            </a>
          </li>
          <li>
            <a
              href="https://www.anthropic.com/claude-sonnet-5-5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Claude Sonnet 5.5 System Card ↗
            </a>
          </li>
          <li>
            <a
              href="https://www.anthropic.com/claude-opus-5-5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              Claude Opus 5.5 Release ↗
            </a>
          </li>
          <li>
            <a
              href="https://developers.openai.com/api/docs/deprecations"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              OpenAI API Deprecations ↗
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
