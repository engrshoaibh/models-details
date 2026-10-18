import type { Metadata } from "next";
import { Inter, Archivo, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { siteConfig, getSiteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: getSiteUrl() }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: "technology",
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/app-icon.jpg",
        width: 1200,
        height: 630,
        alt: "ModelCraft — Frontier LLM Pricing Comparison & Token Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/app-icon.jpg"],
    creator: siteConfig.creator,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${getSiteUrl()}/#webapp`,
      name: "ModelCraft",
      url: getSiteUrl(),
      description: siteConfig.description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "LLM Pricing Comparison Matrix for 19+ models",
        "Interactive Token Cost Simulator & Budget Calculator",
        "Prompt Caching and Batch API Multiplier Telemetry",
        "Frontier AI Benchmark Arena (Terminal-Bench, FrontierCode, GDPval)",
        "Unified Multi-Provider SDK Code Generator",
      ],
      creator: {
        "@type": "Person",
        name: "Shoaib Hassan",
        url: "https://shoaibhassan.dev",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${getSiteUrl()}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Which LLM offers the lowest token pricing in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DeepSeek-V4.1-Flash offers the most economical token rates at $0.14 per 1M input tokens and $0.28 per 1M output tokens, with cache hits costing just $0.035/1M. For high-speed frontier reasoning, Claude Haiku 5.5 ($0.25/1M input, $0.025 prompt-cache read) and GPT-6 Luna ($0.10/1M input) lead the efficiency frontier.",
          },
        },
        {
          "@type": "Question",
          name: "How does prompt caching reduce LLM API costs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Prompt caching stores the KV-cache of prefix tokens across requests (such as large codebases, developer documentation, or agent system prompts). Providers like Anthropic, OpenAI, and DeepSeek offer up to a 90% discount on cache-read tokens compared to base input rates, cutting agentic coding loop costs by 60%–85%.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best AI model for coding benchmarks in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Based on verified October 2026 telemetry, Claude Sonnet 5.5 ranks highest on Terminal-Bench 4.0 with a 70.6% score at $3.60 blended $/1M, while Claude Opus 5.5 leads full repository architecture with 54.4% on FrontierCode v1.1 and 1846 GDPval-AA Elo, followed closely by GPT-6 Astra at 53.3%.",
          },
        },
        {
          "@type": "Question",
          name: "How do you calculate LLM input and output token costs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Total LLM cost is calculated using: Total Cost = ((Uncached Input / 1M) * Input Rate) + ((Cached Input / 1M) * Cache Read Rate) + ((Output Tokens / 1M) * Output Rate). For asynchronous non-urgent workloads, Batch API endpoints cut total expenditure by an additional 50%.",
          },
        },
        {
          "@type": "Question",
          name: "Which frontier AI models support 1M+ token context windows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Meta Llama 4 Scout leads the industry with a verified 10,000,000 token context window. Google Gemini 4 Argon and Gemini 2.5 Pro provide 2,000,000 token context, while Anthropic's entire Claude 5.5 lineup (Opus, Sonnet, and Haiku) supports 1,000,000 token context windows with up to 128K max output tokens.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
