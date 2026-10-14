"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { Model, ProviderName } from "@/types";
import { DiffDrawer } from "./DiffDrawer";

interface PricingMatrixProps {
  models: Model[];
  selectedProvider: string;
  onCopyStr: (str: string) => void;
}

type SortColumn =
  | "name"
  | "provider"
  | "input"
  | "cached"
  | "output"
  | "blended"
  | "context"
  | "maxOut";

function fmtUsd(v: number): string {
  if (v < 0.01) return "$" + v.toFixed(3);
  return "$" + v.toFixed(2);
}

export function PricingMatrix({
  models,
  selectedProvider,
  onCopyStr,
}: PricingMatrixProps) {
  const [search, setSearch] = useState("");
  const [activeCaps, setActiveCaps] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<SortColumn>("blended");
  const [sortAsc, setSortAsc] = useState(true);
  const [diffSet, setDiffSet] = useState<Set<string>>(
    new Set(["claude-sonnet-5-5", "gpt-6.1-sol", "gemini-4-argon"])
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCap = (cap: string) => {
    setActiveCaps((prev) => {
      const next = new Set(prev);
      if (next.has(cap)) next.delete(cap);
      else next.add(cap);
      return next;
    });
  };

  const handleSort = (col: SortColumn) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const handleToggleDiff = (id: string, checked: boolean) => {
    setDiffSet((prev) => {
      const next = new Set(prev);
      if (checked) {
        if (next.size >= 3) return prev;
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleCopy = (id: string) => {
    onCopyStr(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredModels = useMemo(() => {
    const q = search.toLowerCase().trim();

    return models
      .filter((m) => {
        if (selectedProvider !== "ALL" && m.provider !== selectedProvider)
          return false;
        if (activeCaps.has("thinking") && !m.thinking) return false;
        if (activeCaps.has("vision") && !m.vision) return false;
        if (activeCaps.has("1m") && m.context < 1000000) return false;
        if (activeCaps.has("open") && !m.openWeight) return false;

        if (q) {
          const hay = `${m.name} ${m.id} ${m.provider} ${m.note} ${m.caps.join(
            " "
          )}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const va = a[sortCol];
        const vb = b[sortCol];
        if (typeof va === "string" && typeof vb === "string") {
          return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
        }
        return sortAsc
          ? (va as number) - (vb as number)
          : (vb as number) - (va as number);
      });
  }, [models, selectedProvider, activeCaps, search, sortCol, sortAsc]);

  const diffModels = useMemo(() => {
    return models.filter((m) => diffSet.has(m.id));
  }, [models, diffSet]);

  const renderSortIndicator = (col: SortColumn) => {
    if (sortCol !== col) return null;
    return <span className="ml-1 text-[var(--accent-blue)]">{sortAsc ? "↑" : "↓"}</span>;
  };

  return (
    <div id="sec-matrix">
      {/* Landmark 02.B Header Bar */}
      <div className="section-strip-wrap">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">02.B /</span>
            <span>PRICING & SPECIFICATION MATRIX</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10.5px]">
            19 VERIFIED MODELS · USD PER 1M TOKENS
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <section className="bg-[var(--bg-canvas)]">
        {/* Controls */}
        <div className="p-3.5 md:px-6 border-b border-[var(--border-line)] flex items-center justify-between gap-3 flex-wrap font-mono">
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => toggleCap("thinking")}
              className={`art-pill cursor-pointer transition-colors ${
                activeCaps.has("thinking") ? "status-ready" : ""
              }`}
            >
              Adaptive Thinking
            </button>
            <button
              onClick={() => toggleCap("vision")}
              className={`art-pill cursor-pointer transition-colors ${
                activeCaps.has("vision") ? "status-ready" : ""
              }`}
            >
              Vision Input
            </button>
            <button
              onClick={() => toggleCap("1m")}
              className={`art-pill cursor-pointer transition-colors ${
                activeCaps.has("1m") ? "status-ready" : ""
              }`}
            >
              ≥1M Context
            </button>
            <button
              onClick={() => toggleCap("open")}
              className={`art-pill cursor-pointer transition-colors ${
                activeCaps.has("open") ? "status-ready" : ""
              }`}
            >
              Open-Weight
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search model name or API ID..."
            className="h-[34px] px-3 bg-transparent border border-[var(--border-line)] text-[var(--text-primary)] text-[12px] min-w-[240px] focus:outline-none focus:border-[var(--accent-blue)] font-mono"
          />
        </div>

        {/* Table Viewport */}
        <div className="overflow-x-auto border-b border-[var(--border-line)]">
          <table className="w-full border-collapse min-w-[980px] text-[12.5px]">
            <thead className="font-mono bg-[var(--bg-sunken)]">
              <tr>
                <th className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-center w-[42px]">
                  Diff
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-left cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Model & API ID {renderSortIndicator("name")}
                </th>
                <th
                  onClick={() => handleSort("provider")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-left cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Lab {renderSortIndicator("provider")}
                </th>
                <th
                  onClick={() => handleSort("input")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Input / 1M {renderSortIndicator("input")}
                </th>
                <th
                  onClick={() => handleSort("cached")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Cache Hit / 1M {renderSortIndicator("cached")}
                </th>
                <th
                  onClick={() => handleSort("output")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Output / 1M {renderSortIndicator("output")}
                </th>
                <th
                  onClick={() => handleSort("blended")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Blended (4:1) {renderSortIndicator("blended")}
                </th>
                <th
                  onClick={() => handleSort("context")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Context {renderSortIndicator("context")}
                </th>
                <th
                  onClick={() => handleSort("maxOut")}
                  className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-right cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  Max Out {renderSortIndicator("maxOut")}
                </th>
                <th className="p-2.5 px-3.5 border-b border-r border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-left">
                  Capabilities & Billing Notes
                </th>
                <th className="p-2.5 px-3.5 border-b border-[var(--border-line)] text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] text-center w-[68px]">
                  Docs
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((m) => {
                const isChecked = diffSet.has(m.id);
                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-[var(--bg-hover)] transition-colors border-b border-[var(--border-line)] last:border-b-0 ${
                      isChecked ? "bg-[rgba(59,130,246,0.08)]" : ""
                    }`}
                  >
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggleDiff(m.id, e.target.checked)}
                        className="cursor-pointer accent-[var(--accent-blue)]"
                      />
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={m.brandIcon}
                          alt={m.name}
                          width={18}
                          height={18}
                          className="w-[18px] h-[18px] object-contain"
                          unoptimized
                        />
                        <div className="font-display font-medium text-[14px]">
                          {m.name}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(m.id)}
                        className="inline-flex items-center gap-1.5 px-1.5 py-0.5 border border-[var(--border-line)] text-[10.5px] font-mono text-[var(--text-muted)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] cursor-pointer mt-1 bg-transparent transition-colors"
                        title="Click to copy API ID"
                      >
                        <span>{m.id}</span>
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-[var(--accent-emerald)]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] font-mono text-[11.5px]">
                      {m.provider}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono">
                      {fmtUsd(m.input)}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono text-[var(--accent-emerald)] font-semibold">
                      {fmtUsd(m.cached)}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono">
                      {fmtUsd(m.output)}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono text-[var(--accent-blue)] font-semibold">
                      {fmtUsd(m.blended)}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono">
                      {m.contextLabel}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)] text-right font-mono">
                      {m.maxOutLabel}
                    </td>
                    <td className="p-2.5 px-3.5 border-r border-[var(--border-line)]">
                      <div className="flex gap-1 flex-wrap mb-1 font-mono">
                        {m.caps.map((c) => (
                          <span
                            key={c}
                            className="art-pill px-1.5 py-0.5 text-[9.5px]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11.5px] text-[var(--text-muted)]">
                        {m.note}
                      </div>
                    </td>
                    <td className="p-2.5 px-3.5 text-center font-mono">
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-blue)] font-semibold hover:underline"
                      >
                        DOCS ↗
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Comparison Drawer */}
        <DiffDrawer
          selectedModels={diffModels}
          onClear={() => setDiffSet(new Set())}
        />
      </section>
    </div>
  );
}
