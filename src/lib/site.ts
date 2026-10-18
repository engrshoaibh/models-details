export const siteConfig = {
  name: "ModelCraft",
  title: "ModelCraft — LLM Pricing Comparison, Token Cost Calculator & AI Coding Benchmarks (2026)",
  shortTitle: "ModelCraft | LLM Pricing & Token Cost Calculator",
  description:
    "Live 2026 LLM pricing comparison and token cost calculator for 19+ frontier AI models. Compare input, output, prompt caching discounts ($/1M tokens), batch API rates, and verified coding benchmarks across Claude, OpenAI, Gemini, DeepSeek, and Mistral.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://modelcraft.shoaibhassan.dev"),
  keywords: [
    "llm pricing comparison",
    "llm pricing comparison 2026",
    "token cost calculator",
    "ai token cost calculator",
    "llm token cost",
    "ai token cost comparison",
    "ai model benchmarks for coding",
    "best ai model for coding 2026",
    "ai model ranking 2026",
    "llm calculator",
    "prompt caching pricing",
    "claude token cost",
    "openai pricing 2026",
    "deepseek pricing",
    "gemini token cost",
    "frontier ai models",
    "batch api pricing discounts",
    "terminal-bench coding ranking",
  ],
  author: "ModelCraft",
  creator: "@engrshoaibh",
};

export function getSiteUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}
