"use client";

import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";
import { BENCHMARKS } from "@/data/benchmarks";

type ChartViewType = "bar" | "scatter" | "efficiency";

interface ChartItem {
  name: string;
  cleanName: string;
  prov: string;
  val: number;
  blended: number;
  efficiency: number;
  url: string;
  color: string;
  isLeader: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartItem; value?: number }>;
  unit: string;
  chartType: ChartViewType;
}

function CustomTooltip({ active, payload, unit, chartType }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#141416] border border-white/20 p-3 shadow-2xl rounded-[4px] font-mono text-[12px] z-50 min-w-[200px]">
        <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/10">
          <strong className="text-white text-[13px]">{data.name}</strong>
          <span
            className="text-[10px] px-1.5 py-0.5 border border-white/15 uppercase font-semibold"
            style={{ color: data.color }}
          >
            {data.prov}
          </span>
        </div>
        <div className="space-y-1 text-white/70">
          <div>
            Benchmark Score:{" "}
            <span className="text-white font-semibold">
              {data.val}
              {unit}
            </span>
          </div>
          <div>
            Blended Cost (4:1):{" "}
            <span className="text-[#3B82F6] font-semibold">
              ${data.blended.toFixed(2)}/1M
            </span>
          </div>
          <div>
            Cost-Efficiency:{" "}
            <span className="text-[#10B981] font-semibold">
              {data.efficiency.toFixed(1)} pts / $
            </span>
          </div>
          {data.isLeader && (
            <div className="text-[#F05A40] font-semibold text-[10px] uppercase mt-1">
              ★ Benchmark Leader
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export function BenchmarkArena() {
  const [selectedSuiteKey, setSelectedSuiteKey] = useState<string>("terminal");
  const [chartType, setChartType] = useState<ChartViewType>("bar");

  const currentSuite = BENCHMARKS[selectedSuiteKey] || BENCHMARKS.terminal;

  const chartData: ChartItem[] = useMemo(() => {
    return currentSuite.items.map((item, idx) => {
      const isLeader = idx === 0;
      let color = "#3B82F6";
      if (isLeader) {
        color = "#F05A40";
      } else if (item.prov === "Anthropic") {
        color = "#06B6D4";
      } else if (item.prov === "OpenAI") {
        color = "#10B981";
      } else if (item.prov === "Google") {
        color = "#2563EB";
      } else if (item.prov === "DeepSeek") {
        color = "#8B5CF6";
      }

      const cleanName = item.name
        .replace("Claude ", "")
        .replace(" (Offline)", "");

      const efficiency = +(item.val / Math.max(0.01, item.blended)).toFixed(1);

      return {
        ...item,
        cleanName,
        efficiency,
        color,
        isLeader,
      };
    });
  }, [currentSuite]);

  const sortedEfficiencyData = useMemo(() => {
    return [...chartData].sort((a, b) => b.efficiency - a.efficiency);
  }, [chartData]);

  const minY = Math.floor(Math.min(...currentSuite.items.map((x) => x.val)) * 0.85);
  const maxY = currentSuite.max;

  return (
    <div id="sec-benchmarks">
      {/* Landmark 02.D Header Bar */}
      <div className="section-strip-wrap">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">02.D /</span>
            <span>BENCHMARK ARENA</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10.5px]">
            VERIFIED EVALUATION SCORES VS. BLENDED COST
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[390px_1fr] border-b border-[var(--border-line)]">
        {/* Left Suite Switcher & Leaderboard */}
        <div className="p-7 px-6 border-b lg:border-b-0 lg:border-r border-[var(--border-line)]">
          <h2 className="font-display text-[30px] leading-[1.08] mb-2.5">
            Every frontier lab, <span className="font-serif-italic">benchmarked.</span>
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mb-4 leading-normal">
            Select an official October 2026 evaluation suite to inspect rankings
            and plot capability against log-scaled token cost.
          </p>

          <div className="flex flex-col gap-1.5 mb-5 font-mono">
            {[
              {
                key: "terminal",
                label: "01 / Terminal-Bench 4.0 (CLI Coding)",
                top: "70.6% Top",
              },
              {
                key: "frontiercode",
                label: "02 / FrontierCode v1.1 (Merge-Ready PRs)",
                top: "54.4% Top",
              },
              {
                key: "gdpval",
                label: "03 / GDPval-AA v2.1 (44 Occupations)",
                top: "1846 Elo",
              },
              {
                key: "hle",
                label: "04 / Humanity's Last Exam (With Tools)",
                top: "67.7% Top",
              },
              {
                key: "osworld",
                label: "05 / OSWorld 2.1 (Computer Use)",
                top: "81.8% Top",
              },
            ].map((btn) => {
              const active = selectedSuiteKey === btn.key;
              return (
                <button
                  key={btn.key}
                  onClick={() => setSelectedSuiteKey(btn.key)}
                  className={`p-2 px-3 border flex justify-between items-center text-[11.5px] cursor-pointer transition-colors ${
                    active
                      ? "border-[var(--accent-blue)] bg-[var(--bg-hover)] text-[var(--accent-blue)] font-semibold"
                      : "border-[var(--border-line)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className="text-[var(--text-muted)]">{btn.top}</span>
                </button>
              );
            })}
          </div>

          {/* Live Leaderboard */}
          <div className="font-mono">
            {chartData.map((item, i) => (
              <div
                key={item.name}
                className="flex justify-between items-center py-1.5 border-b border-[var(--border-line)] text-[11.5px] last:border-b-0"
              >
                <span>
                  <strong className="text-[var(--accent-blue)] mr-1.5">
                    0{i + 1}
                  </strong>
                  {item.name}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-blue)] hover:underline"
                >
                  {item.val}
                  {currentSuite.unit} ↗
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right Recharts Viewport */}
        <div className="p-7 px-6 bg-[var(--workspace-bg)] text-[var(--workspace-text)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3 font-mono flex-wrap gap-2">
              <span className="text-[11.5px] text-white font-medium">
                {chartType === "bar" && `RANKED EVALUATION // ${currentSuite.title}`}
                {chartType === "scatter" && currentSuite.title}
                {chartType === "efficiency" && `COST-EFFICIENCY // SCORE PER $1 BLENDED`}
              </span>

              {/* Chart Mode Switcher */}
              <div className="flex items-center gap-1 font-mono">
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-2.5 py-1 text-[10.5px] border transition-colors cursor-pointer ${
                    chartType === "bar"
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 text-white font-semibold"
                      : "border-white/10 text-white/50 hover:text-white bg-transparent"
                  }`}
                >
                  Ranked Bar
                </button>
                <button
                  onClick={() => setChartType("scatter")}
                  className={`px-2.5 py-1 text-[10.5px] border transition-colors cursor-pointer ${
                    chartType === "scatter"
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 text-white font-semibold"
                      : "border-white/10 text-white/50 hover:text-white bg-transparent"
                  }`}
                >
                  Pareto Scatter
                </button>
                <button
                  onClick={() => setChartType("efficiency")}
                  className={`px-2.5 py-1 text-[10.5px] border transition-colors cursor-pointer ${
                    chartType === "efficiency"
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 text-white font-semibold"
                      : "border-white/10 text-white/50 hover:text-white bg-transparent"
                  }`}
                >
                  Efficiency (Pts/$)
                </button>
              </div>
            </div>

            <div className="w-full h-[360px] border border-[var(--workspace-border)] bg-[var(--workspace-panel)] p-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  /* 1. Ranked Horizontal Bar Chart (Zero label collision, clear metrics) */
                  <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{
                      top: 15,
                      right: 90,
                      bottom: 10,
                      left: 30,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <XAxis
                      type="number"
                      domain={[0, maxY]}
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "rgba(242,241,238,0.6)",
                        fontSize: 10.5,
                        fontFamily: "monospace",
                      }}
                      tickFormatter={(v) => `${v}${currentSuite.unit}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="cleanName"
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "#F2F1EE",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                      width={100}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          unit={currentSuite.unit}
                          chartType={chartType}
                        />
                      }
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    />
                    <Bar
                      dataKey="val"
                      radius={[0, 4, 4, 0]}
                      isAnimationActive={true}
                      animationDuration={600}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="val"
                        position="right"
                        offset={8}
                        formatter={(val: any) => {
                          const numVal = Number(val);
                          const item = chartData.find((x) => x.val === numVal);
                          const costStr = item ? ` ($${item.blended})` : "";
                          return `${val ?? ""}${currentSuite.unit}${costStr}`;
                        }}
                        style={{
                          fill: "#F2F1EE",
                          fontSize: 10.5,
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      />
                    </Bar>
                  </BarChart>
                ) : chartType === "scatter" ? (
                  /* 2. Pareto Scatter Plot with log scale */
                  <ScatterChart
                    margin={{
                      top: 24,
                      right: 80,
                      bottom: 24,
                      left: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <XAxis
                      type="number"
                      dataKey="blended"
                      name="Blended Cost"
                      scale="log"
                      domain={[0.1, 24]}
                      ticks={[0.18, 1.0, 3.6, 7.2, 18.0]}
                      tickFormatter={(v) => `$${v}`}
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "rgba(242,241,238,0.6)",
                        fontSize: 10.5,
                        fontFamily: "monospace",
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="val"
                      name="Score"
                      domain={[minY, maxY]}
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "rgba(242,241,238,0.6)",
                        fontSize: 10.5,
                        fontFamily: "monospace",
                      }}
                      tickFormatter={(v) => `${v}${currentSuite.unit}`}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          unit={currentSuite.unit}
                          chartType={chartType}
                        />
                      }
                      cursor={{
                        strokeDasharray: "3 3",
                        stroke: "rgba(255,255,255,0.2)",
                      }}
                    />
                    <Scatter
                      data={chartData}
                      isAnimationActive={true}
                      animationDuration={600}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#101014"
                          strokeWidth={1.5}
                        />
                      ))}
                      <LabelList
                        dataKey="cleanName"
                        position="right"
                        offset={9}
                        style={{
                          fill: "#F2F1EE",
                          fontSize: 10,
                          fontFamily: "monospace",
                          fontWeight: 500,
                          pointerEvents: "none",
                        }}
                      />
                    </Scatter>
                  </ScatterChart>
                ) : (
                  /* 3. Cost-Efficiency Chart (Points per dollar) */
                  <BarChart
                    layout="vertical"
                    data={sortedEfficiencyData}
                    margin={{
                      top: 15,
                      right: 80,
                      bottom: 10,
                      left: 30,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <XAxis
                      type="number"
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "rgba(242,241,238,0.6)",
                        fontSize: 10.5,
                        fontFamily: "monospace",
                      }}
                      tickFormatter={(v) => `${v} pts/$`}
                    />
                    <YAxis
                      type="category"
                      dataKey="cleanName"
                      stroke="rgba(255,255,255,0.25)"
                      tick={{
                        fill: "#F2F1EE",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                      width={100}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          unit={currentSuite.unit}
                          chartType={chartType}
                        />
                      }
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    />
                    <Bar
                      dataKey="efficiency"
                      radius={[0, 4, 4, 0]}
                      isAnimationActive={true}
                      animationDuration={600}
                    >
                      {sortedEfficiencyData.map((entry, index) => (
                        <Cell key={`eff-${index}`} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="efficiency"
                        position="right"
                        offset={8}
                        formatter={(val: any) => `${val ?? ""} pts/$`}
                        style={{
                          fill: "#F2F1EE",
                          fontSize: 10.5,
                          fontFamily: "monospace",
                          fontWeight: 500,
                        }}
                      />
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 text-[10.5px] text-[var(--workspace-muted)] flex justify-between font-mono">
            <span>
              {chartType === "bar" && "X-AXIS: EVALUATION SCORE | LABELS: SCORE & (4:1 BLENDED $/1M)"}
              {chartType === "scatter" && "X-AXIS: LOG10 BLENDED $/1M ($0.15 → $20.00)"}
              {chartType === "efficiency" && "X-AXIS: BENCHMARK SCORE DIVIDED BY BLENDED $/1M"}
            </span>
            <span>SOURCES: OFFICIAL OCT 2026 SYSTEM CARDS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
