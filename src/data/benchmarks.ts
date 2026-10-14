import { BenchmarkSuite } from "@/types";

export const BENCHMARKS: Record<string, BenchmarkSuite> = {
  terminal: {
    title: "PARETO FRONTIER // TERMINAL-BENCH 4.0 VS. BLENDED $/1M",
    unit: "%",
    max: 80,
    items: [
      { name: "Claude Sonnet 5.5", prov: "Anthropic", val: 70.6, blended: 3.6, url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { name: "Claude Opus 5.5 (xhigh)", prov: "Anthropic", val: 66.4, blended: 7.2, url: "https://www.anthropic.com/claude-opus-5-5" },
      { name: "GPT-6 Astra (high)", prov: "OpenAI", val: 57.9, blended: 18.0, url: "https://developers.openai.com/api/docs/models" },
      { name: "Claude Fable 5.1", prov: "Anthropic", val: 55.8, blended: 18.0, url: "https://platform.claude.com/docs/en/models/overview" },
      { name: "Claude Haiku 5.5", prov: "Anthropic", val: 39.2, blended: 0.18, url: "https://www.anthropic.com/claude-haiku-5-5" },
      { name: "GPT-6.1 Sol", prov: "OpenAI", val: 37.3, blended: 3.6, url: "https://developers.openai.com/api/docs/models" },
      { name: "GPT-6 Luna", prov: "OpenAI", val: 16.4, blended: 0.18, url: "https://developers.openai.com/api/docs/models" },
    ],
  },
  frontiercode: {
    title: "PARETO FRONTIER // FRONTIERCODE V1.1 VS. BLENDED $/1M",
    unit: "%",
    max: 65,
    items: [
      { name: "Claude Opus 5.5", prov: "Anthropic", val: 54.4, blended: 7.2, url: "https://www.anthropic.com/claude-opus-5-5" },
      { name: "GPT-6 Astra", prov: "OpenAI", val: 53.3, blended: 18.0, url: "https://developers.openai.com/api/docs/models" },
      { name: "Claude Sonnet 5.5 (xhigh)", prov: "Anthropic", val: 52.1, blended: 3.6, url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { name: "Claude Fable 5.1", prov: "Anthropic", val: 50.3, blended: 18.0, url: "https://platform.claude.com/docs/en/models/overview" },
      { name: "GPT-6.1 Sol", prov: "OpenAI", val: 49.3, blended: 3.6, url: "https://developers.openai.com/api/docs/models" },
      { name: "Claude Haiku 5.5", prov: "Anthropic", val: 46.4, blended: 0.18, url: "https://www.anthropic.com/claude-haiku-5-5" },
      { name: "GPT-6 Luna", prov: "OpenAI", val: 42.4, blended: 0.18, url: "https://developers.openai.com/api/docs/models" },
    ],
  },
  gdpval: {
    title: "PARETO FRONTIER // GDPVAL-AA V2.1 (ELO) VS. BLENDED $/1M",
    unit: " Elo",
    max: 2000,
    items: [
      { name: "Claude Opus 5.5", prov: "Anthropic", val: 1846, blended: 7.2, url: "https://www.anthropic.com/claude-opus-5-5" },
      { name: "Claude Sonnet 5.5", prov: "Anthropic", val: 1844, blended: 3.6, url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { name: "Claude Fable 5.1", prov: "Anthropic", val: 1735, blended: 18.0, url: "https://platform.claude.com/docs/en/models/overview" },
      { name: "Claude Haiku 5.5", prov: "Anthropic", val: 1620, blended: 0.18, url: "https://www.anthropic.com/claude-haiku-5-5" },
      { name: "GPT-6 Astra", prov: "OpenAI", val: 1542, blended: 18.0, url: "https://developers.openai.com/api/docs/models" },
      { name: "GPT-6.1 Sol", prov: "OpenAI", val: 1487, blended: 3.6, url: "https://developers.openai.com/api/docs/models" },
      { name: "GPT-6 Luna", prov: "OpenAI", val: 1437, blended: 0.18, url: "https://developers.openai.com/api/docs/models" },
    ],
  },
  hle: {
    title: "PARETO FRONTIER // HUMANITY'S LAST EXAM VS. BLENDED $/1M",
    unit: "%",
    max: 80,
    items: [
      { name: "Claude Opus 5.5", prov: "Anthropic", val: 67.7, blended: 7.2, url: "https://www.anthropic.com/claude-opus-5-5" },
      { name: "Claude Fable 5.1", prov: "Anthropic", val: 65.6, blended: 18.0, url: "https://platform.claude.com/docs/en/models/overview" },
      { name: "Claude Sonnet 5.5", prov: "Anthropic", val: 64.5, blended: 3.6, url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { name: "Claude Haiku 5.5", prov: "Anthropic", val: 57.4, blended: 0.18, url: "https://www.anthropic.com/claude-haiku-5-5" },
      { name: "GPT-6 Astra", prov: "OpenAI", val: 57.2, blended: 18.0, url: "https://developers.openai.com/api/docs/models" },
    ],
  },
  osworld: {
    title: "PARETO FRONTIER // OSWORLD 2.1 VS. BLENDED $/1M",
    unit: "%",
    max: 95,
    items: [
      { name: "Claude Opus 5.5", prov: "Anthropic", val: 81.8, blended: 7.2, url: "https://www.anthropic.com/claude-opus-5-5" },
      { name: "Claude Fable 5.1", prov: "Anthropic", val: 80.7, blended: 18.0, url: "https://platform.claude.com/docs/en/models/overview" },
      { name: "Claude Sonnet 5.5", prov: "Anthropic", val: 80.1, blended: 3.6, url: "https://www.anthropic.com/claude-sonnet-5-5" },
      { name: "Claude Haiku 5.5 (Offline)", prov: "Anthropic", val: 72.4, blended: 0.18, url: "https://www.anthropic.com/claude-haiku-5-5" },
      { name: "GPT-6 Luna (Offline)", prov: "OpenAI", val: 48.9, blended: 0.18, url: "https://developers.openai.com/api/docs/models" },
    ],
  },
};
