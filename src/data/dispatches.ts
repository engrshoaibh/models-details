import { Dispatch } from "@/types";

export const DISPATCHES: Dispatch[] = [
  {
    num: "01 · OCT 13, 2026",
    title: "Gemini 4 Argon Promotional Window ($2/$10)",
    body: "Google's flagship Gemini 4 Argon (with 1M long-decode output) runs at $2.00/1M input and $10.00/1M output through November 30, 2026 before stepping to $4/$20 on December 1. Batch and Flex tiers cut costs 50% to $1/$5.",
    tags: ["GEMINI-4-ARGON", "GEMINI-3.8-FLASH ($0.75/$3.75)"],
    url: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    num: "02 · OCT 07, 2026",
    title: "Claude Haiku 5.5 Launch & Sonnet 5.5 Cache Cut",
    body: "Anthropic released Claude Haiku 5.5 at $0.10/$0.50 (for prompts ≤100K) with adjustable reasoning effort, while halving Claude Sonnet 5.5 cache read rates from $0.20 to $0.10 per 1M tokens.",
    tags: ["CLAUDE-HAIKU-5-5", "SONNET CACHE -50%"],
    url: "https://www.anthropic.com/claude-haiku-5-5",
  },
  {
    num: "03 · SEPT 28, 2026",
    title: "Claude Sonnet 5.5 Reaches 70.6% on Terminal-Bench 4.0",
    body: "Sonnet 5.5 generates output 30%+ faster than Sonnet 5 while scoring 1844 Elo on GDPval-AA v2.1 (two points behind Opus 5.5) and supporting up to 300K output tokens on the Batch API.",
    tags: ["70.6% TERMINAL-BENCH 4.0", "$2 / $10 PER 1M"],
    url: "https://www.anthropic.com/claude-sonnet-5-5",
  },
  {
    num: "04 · SEPT 10, 2026",
    title: "DeepSeek-V4.1-Flash 50x Cache-Hit Architecture",
    body: "DeepSeek consolidated its hosted API around deepseek-flash ($0.15/1M input miss, $0.003/1M cache hit, $0.60/1M output off-peak) and reversed the planned September 14 retirement of deepseek-v4-pro.",
    tags: ["$0.003/1M CACHE HIT", "384K MAX OUTPUT"],
    url: "https://www.morphllm.com/deepseek-api",
  },
  {
    num: "05 · OCT 2026",
    title: "OpenAI GPT-6 Triad & Jan 2027 Deprecations",
    body: "OpenAI's Responses API centers on GPT-6 Astra ($10/$50), GPT-6.1 Sol ($2/$10), and GPT-6 Luna ($0.10/$0.50) with 1.05M context. Legacy gpt-4o-mini and gpt-4.1 retire January 14, 2027.",
    tags: ["1.05M CONTEXT", "JAN 14, 2027 RETIREMENT"],
    url: "https://developers.openai.com/api/docs/deprecations",
  },
  {
    num: "06 · OCT 2026",
    title: "Mistral Large 4 50% Sale & Llama 4 10M Context",
    body: "Mistral cut Mistral Large 4 rates by 50% ($0.68/$2.09), while Meta's open-weight Llama 4 Scout unlocks a 10M-token context window on a single H100 GPU (Int4 quantization).",
    tags: ["MISTRAL LARGE 4 ($0.68/$2.09)", "LLAMA 4 SCOUT (10M)"],
    url: "https://docs.mistral.ai/inference/pricing",
  },
];
