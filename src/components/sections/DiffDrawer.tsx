"use client";

import React from "react";
import Image from "next/image";
import { Model } from "@/types";

interface DiffDrawerProps {
  selectedModels: Model[];
  onClear: () => void;
}

function fmtUsd(v: number): string {
  if (v < 0.01) return "$" + v.toFixed(3);
  return "$" + v.toFixed(2);
}

export function DiffDrawer({ selectedModels, onClear }: DiffDrawerProps) {
  if (selectedModels.length === 0) return null;

  return (
    <div className="p-5 md:px-6 border-b border-[var(--border-line)] bg-[var(--bg-hover)]">
      <div className="flex justify-between items-center font-mono">
        <span className="text-[11.5px] font-semibold text-[var(--accent-blue)] tracking-[0.04em]">
          SIDE-BY-SIDE MODEL COMPARISON ({selectedModels.length}/3 SELECTED)
        </span>
        <button
          onClick={onClear}
          className="art-pill cursor-pointer hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-colors"
        >
          Clear Selection ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[var(--border-line)] bg-[var(--bg-canvas)] mt-3">
        {selectedModels.map((m) => (
          <div
            key={m.id}
            className="p-4 border-b md:border-b-0 border-[var(--border-line)] md:border-r last:border-r-0"
          >
            <div className="flex justify-between items-center mb-1.5 font-mono">
              <span className="bg-[var(--accent-blue)] text-white text-[10px] font-semibold px-2 py-0.5 uppercase">
                {m.provider}
              </span>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--accent-blue)] hover:underline"
              >
                SPEC ↗
              </a>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <Image
                src={m.brandIcon}
                alt={m.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                unoptimized
              />
              <div className="font-display text-[17px] font-semibold">{m.name}</div>
            </div>

            <div className="font-mono text-[10.5px] text-[var(--text-muted)] mb-3">
              {m.id} · Cutoff: {m.cutoff}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11.5px] font-mono">
              <div>
                Input: <strong>{fmtUsd(m.input)}</strong>
              </div>
              <div>
                Output: <strong>{fmtUsd(m.output)}</strong>
              </div>
              <div>
                Cache Hit:{" "}
                <strong className="text-[var(--accent-emerald)]">
                  {fmtUsd(m.cached)}
                </strong>
              </div>
              <div>
                Blended:{" "}
                <strong className="text-[var(--accent-blue)]">
                  {fmtUsd(m.blended)}
                </strong>
              </div>
              <div>
                Context: <strong>{m.contextLabel}</strong>
              </div>
              <div>
                Max Out: <strong>{m.maxOutLabel}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
