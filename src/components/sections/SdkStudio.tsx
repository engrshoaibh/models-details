"use client";

import React, { useState } from "react";
import { Model } from "@/types";

interface SdkStudioProps {
  models: Model[];
  selectedModelId: string;
  onSelectModelId: (id: string) => void;
  onCopySnippet: (code: string) => void;
  onOpenCmd: () => void;
}

export function SdkStudio({
  models,
  selectedModelId,
  onSelectModelId,
  onCopySnippet,
  onOpenCmd,
}: SdkStudioProps) {
  const [lang, setLang] = useState<"py" | "ts" | "curl">("py");
  const [effort, setEffort] = useState<"low" | "medium" | "high" | "xhigh">("medium");

  const currentModel =
    models.find((m) => m.id === selectedModelId) || models[0];

  const generateCode = () => {
    const m = currentModel;
    if (m.provider === "Anthropic") {
      if (lang === "py") {
        return `import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="${m.id}",
    max_tokens=16384,
    thinking={"type": "adaptive"},
    extra_body={"output_config": {"effort": "${effort}"}},
    messages=[
        {"role": "user", "content": "Audit this codebase for concurrency bugs."}
    ]
)
print(response.content[-1].text)`;
      } else if (lang === "ts") {
        return `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "${m.id}",
  max_tokens: 16384,
  thinking: { type: "adaptive" },
  messages: [{ role: "user", content: "Audit this codebase for concurrency bugs." }]
});
console.log(response.content);`;
      } else {
        return `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "${m.id}",
    "max_tokens": 16384,
    "messages": [{"role": "user", "content": "Audit this codebase for concurrency bugs."}]
  }'`;
      }
    } else if (m.provider === "Google") {
      if (lang === "py") {
        return `from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="${m.id}",
    contents="Design a zero-downtime Postgres migration strategy.",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=4096),
        temperature=0.2,
    ),
)
print(response.text)`;
      } else if (lang === "ts") {
        return `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: "${m.id}",
  contents: "Design a zero-downtime Postgres migration strategy."
});
console.log(response.text);`;
      } else {
        return `curl "https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent?key=$GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"contents": [{"parts": [{"text": "Design a zero-downtime Postgres migration strategy."}]}]}'`;
      }
    } else if (m.provider === "DeepSeek") {
      if (lang === "py") {
        return `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com"
)

resp = client.chat.completions.create(
    model="${m.id}",
    reasoning_effort="${effort}",
    messages=[
        {"role": "system", "content": "Stable system prefix billed at $0.003/1M on cache hit."},
        {"role": "user", "content": "Implement a lock-free work-stealing queue."}
    ]
)
print(resp.choices[0].message.content)`;
      } else if (lang === "ts") {
        return `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});

const resp = await client.chat.completions.create({
  model: "${m.id}",
  messages: [{ role: "user", content: "Implement a lock-free work-stealing queue." }]
});
console.log(resp.choices[0].message.content);`;
      } else {
        return `curl https://api.deepseek.com/chat/completions \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${m.id}",
    "reasoning_effort": "${effort}",
    "messages": [{"role": "user", "content": "Implement a lock-free work-stealing queue."}]
  }'`;
      }
    } else {
      const base =
        m.provider === "Mistral"
          ? `    base_url="https://api.mistral.ai/v1",\n`
          : "";
      if (lang === "py") {
        return `from openai import OpenAI

client = OpenAI(
${base})

response = client.responses.create(
    model="${m.id}",
    reasoning={"effort": "${effort}"},
    input="Refactor this module to eliminate N+1 query overhead."
)
print(response.output_text)`;
      } else if (lang === "ts") {
        return `import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "${m.id}",
  reasoning: { effort: "${effort}" },
  input: "Refactor this module to eliminate N+1 query overhead."
});
console.log(response.output_text);`;
      } else {
        return `curl https://api.openai.com/v1/responses \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${m.id}",
    "reasoning": {"effort": "${effort}"},
    "input": "Refactor this module to eliminate N+1 query overhead."
  }'`;
      }
    }
  };

  const codeSnippet = generateCode();

  return (
    <div id="get-it">
      {/* Landmark 04 Header Bar */}
      <div className="section-strip-wrap" id="sec-sdk">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">04 /</span>
            <span>GET STARTED · SDK STUDIO</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10.5px]">
            AGENT-READY BOILERPLATE & SUBAGENT ROUTING
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[390px_1fr] border-b border-[var(--border-line)]">
        {/* Left Controls Pane */}
        <div className="p-7 px-6 border-b lg:border-b-0 lg:border-r border-[var(--border-line)]">
          <h2 className="font-display text-[28px] leading-[1.1] mb-2.5">
            Agent-ready from <span className="font-serif-italic">day one.</span>
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mb-4.5 leading-normal">
            Select any model to generate official Python, TypeScript, or cURL
            boilerplate with adaptive reasoning effort parameters.
          </p>

          <div className="grid gap-3 mb-4.5 font-mono">
            <div>
              <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                TARGET MODEL
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => onSelectModelId(e.target.value)}
                className="w-full h-[34px] px-3 bg-transparent border border-[var(--border-line)] text-[var(--text-primary)] text-[12px] focus:outline-none focus:border-[var(--accent-blue)] font-mono cursor-pointer"
              >
                {models.map((m) => (
                  <option
                    key={m.id}
                    value={m.id}
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    {m.name} ({m.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                  RUNTIME
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as "py" | "ts" | "curl")}
                  className="w-full h-[34px] px-3 bg-transparent border border-[var(--border-line)] text-[var(--text-primary)] text-[12px] focus:outline-none focus:border-[var(--accent-blue)] font-mono cursor-pointer"
                >
                  <option
                    value="py"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    Python SDK
                  </option>
                  <option
                    value="ts"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    TypeScript SDK
                  </option>
                  <option
                    value="curl"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    cURL HTTP
                  </option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                  REASONING EFFORT
                </label>
                <select
                  value={effort}
                  onChange={(e) =>
                    setEffort(
                      e.target.value as "low" | "medium" | "high" | "xhigh"
                    )
                  }
                  className="w-full h-[34px] px-3 bg-transparent border border-[var(--border-line)] text-[var(--text-primary)] text-[12px] focus:outline-none focus:border-[var(--accent-blue)] font-mono cursor-pointer"
                >
                  <option
                    value="low"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    low
                  </option>
                  <option
                    value="medium"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    medium
                  </option>
                  <option
                    value="high"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    high
                  </option>
                  <option
                    value="xhigh"
                    className="bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                  >
                    xhigh
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border-line)] pt-3.5">
            <div className="font-mono text-[10px] text-[var(--text-muted)] mb-2">
              RECOMMENDED LEAD + SUBAGENT PAIRINGS
            </div>
            <div className="text-[12.5px] text-[var(--text-muted)] leading-relaxed space-y-1">
              <div>
                • <strong className="text-[var(--text-primary)]">Anthropic Stack:</strong>{" "}
                <a
                  href="https://www.anthropic.com/claude-opus-5-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  Claude Opus 5.5
                </a>{" "}
                lead +{" "}
                <a
                  href="https://www.anthropic.com/claude-haiku-5-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  Claude Haiku 5.5
                </a>{" "}
                subagent ($0.01/1M cache reads)
              </div>
              <div>
                • <strong className="text-[var(--text-primary)]">OpenAI Stack:</strong>{" "}
                <a
                  href="https://developers.openai.com/api/docs/models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  GPT-6.1 Sol
                </a>{" "}
                lead +{" "}
                <a
                  href="https://developers.openai.com/api/docs/models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  GPT-6 Luna
                </a>{" "}
                high-volume router
              </div>
              <div>
                • <strong className="text-[var(--text-primary)]">Google Stack:</strong>{" "}
                <a
                  href="https://ai.google.dev/gemini-api/docs/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  Gemini 4 Argon
                </a>{" "}
                ($2/$10 promo) +{" "}
                <a
                  href="https://ai.google.dev/gemini-api/docs/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[var(--border-strong)] text-[var(--text-primary)]"
                >
                  Gemini 3.1 Flash-Lite
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Code Viewer Pane */}
        <div className="p-7 px-6 bg-[var(--workspace-bg)] text-[var(--workspace-text)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-[var(--workspace-border)] font-mono">
              <span className="text-[11px] text-white">
                {currentModel.id} // {lang.toUpperCase()}
              </span>
              <div className="flex gap-3 items-center">
                <a
                  href={currentModel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] text-[var(--workspace-muted)] hover:text-white"
                >
                  OFFICIAL DOCS ↗
                </a>
                <button
                  onClick={() => onCopySnippet(codeSnippet)}
                  className="art-pill text-white border-[var(--workspace-border)] cursor-pointer hover:border-[var(--accent-blue)] transition-colors"
                >
                  COPY SNIPPET
                </button>
              </div>
            </div>

            <pre className="font-mono text-[12px] leading-[1.65] overflow-x-auto text-[#E2E8F0] p-2 bg-[var(--workspace-panel)] border border-[var(--workspace-border)] rounded-[4px]">
              {codeSnippet}
            </pre>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="p-10 md:p-14 border-b border-[var(--border-line)] flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-muted)] mb-2">
            OPEN TELEMETRY · FREE TO USE
          </div>
          <h2 className="font-display text-[clamp(32px,4.2vw,52px)] leading-[1.02]">
            Build it <span className="font-serif-italic">with us.</span>
          </h2>
        </div>
        <div className="flex gap-2.5 flex-wrap font-mono">
          <button
            onClick={onOpenCmd}
            className="bg-[var(--text-primary)] text-[var(--bg-canvas)] border border-[var(--text-primary)] px-5 py-3 text-[11.5px] tracking-[0.06em] uppercase font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Open Command Palette (⌘K)
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-transparent text-[var(--text-primary)] border border-[var(--border-line)] px-4 py-3 text-[11.5px] tracking-[0.06em] uppercase font-medium cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </section>
    </div>
  );
}
