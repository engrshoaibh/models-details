"use client";

import React, { useState, useMemo } from "react";
import { Model } from "@/types";

interface CostSimulatorProps {
  models: Model[];
}

export function CostSimulator({ models }: CostSimulatorProps) {
  const [reqDay, setReqDay] = useState(1500);
  const [tokIn, setTokIn] = useState(12000);
  const [tokOut, setTokOut] = useState(800);
  const [hitPct, setHitPct] = useState(75);
  const [batchDiscount, setBatchDiscount] = useState(false);

  const applyPreset = (
    presetReq: number,
    presetIn: number,
    presetOut: number,
    presetHit: number
  ) => {
    setReqDay(presetReq);
    setTokIn(presetIn);
    setTokOut(presetOut);
    setHitPct(presetHit);
  };

  const { totalInM, cachedInM, totalOutM, calculatedModels, maxTotal } =
    useMemo(() => {
      const monthlyReqs = reqDay * 30;
      const tInM = (monthlyReqs * tokIn) / 1e6;
      const tOutM = (monthlyReqs * tokOut) / 1e6;
      const cInM = tInM * (hitPct / 100);
      const uncachedInM = tInM - cInM;

      const results = models
        .map((m) => {
          const mult = batchDiscount ? m.batchDiscount : 1.0;
          const cUncached = uncachedInM * (m.input * mult);
          const cCached = cInM * m.cached;
          const cOut = tOutM * (m.output * mult);
          const total = cUncached + cCached + cOut;
          return { ...m, cUncached, cCached, cOut, total };
        })
        .sort((a, b) => a.total - b.total);

      const maxT = Math.max(...results.slice(0, 13).map((x) => x.total), 1);

      return {
        totalInM: tInM,
        cachedInM: cInM,
        totalOutM: tOutM,
        calculatedModels: results.slice(0, 13),
        maxTotal: maxT,
      };
    }, [models, reqDay, tokIn, tokOut, hitPct, batchDiscount]);

  return (
    <div id="sec-simulator">
      {/* Landmark 02.C Header Bar */}
      <div className="section-strip-wrap">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">02.C /</span>
            <span>TOKEN COST SIMULATOR</span>
          </div>
          <div className="hidden sm:block text-[var(--text-muted)] text-[10.5px]">
            30-DAY WORKLOAD & PROMPT CACHE CALCULATOR
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[390px_1fr] border-b border-[var(--border-line)]">
        {/* Left Inputs Pane */}
        <div className="p-4 sm:p-7 sm:px-6 border-b lg:border-b-0 lg:border-r border-[var(--border-line)] min-w-0">
          <h2 className="font-display text-[30px] leading-[1.08] mb-2.5">
            Token economics, <span className="font-serif-italic">demystified.</span>
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mb-4.5 leading-normal">
            Model how prompt cache hit ratios and 50% Batch API discounts shift
            your 30-day production spend across all 20 models.
          </p>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 border border-[var(--border-line)] mb-5 font-mono">
            <button
              onClick={() => applyPreset(1500, 12000, 800, 75)}
              className="p-2.5 border-r border-b border-[var(--border-line)] text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                01 / Coding Agent
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                1.5k/d · 12k in · 75% hit
              </div>
            </button>
            <button
              onClick={() => applyPreset(10000, 2000, 400, 50)}
              className="p-2.5 border-b border-[var(--border-line)] text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                02 / Support Triage
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                10k/d · 2k in · 50% hit
              </div>
            </button>
            <button
              onClick={() => applyPreset(300, 80000, 2500, 80)}
              className="p-2.5 border-r border-[var(--border-line)] text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                03 / Long-Context RAG
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                300/d · 80k in · 80% hit
              </div>
            </button>
            <button
              onClick={() => applyPreset(5000, 1000, 300, 0)}
              className="p-2.5 text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                04 / Cold Extraction
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                5k/d · 1k in · 0% hit
              </div>
            </button>
          </div>

          {/* Slider 1: Requests / Day */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-[12px] mb-1 font-mono">
              <span>REQUESTS / DAY</span>
              <input
                type="number"
                value={reqDay}
                onChange={(e) => setReqDay(Math.max(1, +e.target.value || 0))}
                className="w-[88px] h-6 border border-[var(--border-line)] bg-transparent text-[var(--text-primary)] text-right px-1.5 text-[11.5px] font-mono"
              />
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={reqDay}
              onChange={(e) => setReqDay(+e.target.value)}
              className="art-range"
            />
          </div>

          {/* Slider 2: Input Tokens / Req */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-[12px] mb-1 font-mono">
              <span>INPUT TOKENS / REQ</span>
              <input
                type="number"
                value={tokIn}
                onChange={(e) => setTokIn(Math.max(1, +e.target.value || 0))}
                className="w-[88px] h-6 border border-[var(--border-line)] bg-transparent text-[var(--text-primary)] text-right px-1.5 text-[11.5px] font-mono"
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={tokIn}
              onChange={(e) => setTokIn(+e.target.value)}
              className="art-range"
            />
          </div>

          {/* Slider 3: Output Tokens / Req */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-[12px] mb-1 font-mono">
              <span>OUTPUT TOKENS / REQ</span>
              <input
                type="number"
                value={tokOut}
                onChange={(e) => setTokOut(Math.max(1, +e.target.value || 0))}
                className="w-[88px] h-6 border border-[var(--border-line)] bg-transparent text-[var(--text-primary)] text-right px-1.5 text-[11.5px] font-mono"
              />
            </div>
            <input
              type="range"
              min="100"
              max="16000"
              step="100"
              value={tokOut}
              onChange={(e) => setTokOut(+e.target.value)}
              className="art-range"
            />
          </div>

          {/* Slider 4: Cache Hit Ratio */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-[12px] mb-1 font-mono">
              <span>CACHE HIT RATIO (%)</span>
              <input
                type="number"
                min="0"
                max="98"
                value={hitPct}
                onChange={(e) =>
                  setHitPct(Math.min(99, Math.max(0, +e.target.value || 0)))
                }
                className="w-[88px] h-6 border border-[var(--border-line)] bg-transparent text-[var(--text-primary)] text-right px-1.5 text-[11.5px] font-mono"
              />
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={hitPct}
              onChange={(e) => setHitPct(+e.target.value)}
              className="art-range"
            />
          </div>

          <label className="flex items-center gap-2 text-[11.5px] cursor-pointer mt-2.5 font-mono select-none">
            <input
              type="checkbox"
              checked={batchDiscount}
              onChange={(e) => setBatchDiscount(e.target.checked)}
              className="cursor-pointer accent-[var(--accent-blue)]"
            />
            <span>APPLY 50% BATCH API DISCOUNT (OPENAI / ANTHROPIC / GOOGLE)</span>
          </label>
        </div>

        {/* Right Outputs Breakdown */}
        <div className="p-4 sm:p-7 sm:px-6 bg-[var(--workspace-bg)] text-[var(--workspace-text)] min-w-0 overflow-hidden">
          <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-[var(--workspace-border)] font-mono flex-wrap gap-2">
            <span className="text-[11px] text-white font-medium">
              30-DAY VOLUME: {totalInM.toFixed(1)}M IN ({cachedInM.toFixed(1)}M HIT)
              · {totalOutM.toFixed(1)}M OUT
            </span>
            <div className="flex gap-3 text-[10px] text-[var(--workspace-muted)]">
              <span className="flex items-center">
                <span className="inline-block w-[7px] h-[7px] bg-[#64748B] mr-1" />
                UNCACHED IN
              </span>
              <span className="flex items-center">
                <span className="inline-block w-[7px] h-[7px] bg-[#22C58B] mr-1" />
                CACHE HIT
              </span>
              <span className="flex items-center">
                <span className="inline-block w-[7px] h-[7px] bg-[#4B8BF5] mr-1" />
                OUTPUT
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            {calculatedModels.map((r) => {
              const w1 = (r.cUncached / maxTotal) * 100;
              const w2 = (r.cCached / maxTotal) * 100;
              const w3 = (r.cOut / maxTotal) * 100;

              return (
                <div
                  key={r.id}
                  className="grid grid-cols-[110px_1fr_95px] sm:grid-cols-[160px_1fr_115px] items-center gap-2 sm:gap-3 py-1.5 border-b border-[var(--workspace-border)] last:border-b-0 text-[11px] sm:text-[12px] font-mono"
                >
                  <div className="truncate text-white" title={r.name}>
                    {r.name}
                  </div>
                  <div className="h-[7px] bg-white/[0.08] flex overflow-hidden">
                    <div
                      style={{ width: `${w1}%` }}
                      className="bg-[#64748B] transition-all duration-300"
                    />
                    <div
                      style={{ width: `${w2}%` }}
                      className="bg-[#22C58B] transition-all duration-300"
                    />
                    <div
                      style={{ width: `${w3}%` }}
                      className="bg-[#4B8BF5] transition-all duration-300"
                    />
                  </div>
                  <div className="text-right text-white">
                    <strong>
                      $
                      {r.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                    <span className="text-[10px] text-[var(--workspace-muted)] ml-1">
                      /mo
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
