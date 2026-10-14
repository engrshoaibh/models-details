"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ShowcaseCard } from "@/types";

interface ShowcaseLineupProps {
  cards: ShowcaseCard[];
  onSelectModelInStudio: (id: string) => void;
  onCopyStr: (str: string) => void;
}

export function ShowcaseLineup({
  cards,
  onSelectModelInStudio,
  onCopyStr,
}: ShowcaseLineupProps) {
  return (
    <div id="lineup">
      {/* Landmark 02 Header Bar */}
      <div className="section-strip-wrap" id="sec-lineup">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">02 /</span>
            <span>THE LINEUP</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10.5px]">
            PICK A CRAFT TO EXPLORE
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      {/* Lineup Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {cards.map((c, idx) => (
          <article
            key={c.num}
            className="group relative p-6 flex flex-col justify-between overflow-hidden bg-[var(--bg-canvas)] hover:bg-[var(--bg-hover)] transition-colors border-b border-[var(--border-line)] lg:border-r lg:[&:nth-child(2n)]:border-r-0"
          >
            {/* Top Accent Bar */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10"
              style={{ backgroundColor: c.accent }}
            />

            <div>
              {/* Meta Header */}
              <div className="flex items-center justify-between mb-3.5 font-mono text-[10.5px] tracking-[0.06em] uppercase">
                <span
                  className="text-white text-[10.5px] font-semibold px-2 py-0.5 tracking-[0.04em]"
                  style={{ backgroundColor: c.accent }}
                >
                  {c.num}
                </span>
                <span className="text-[var(--text-muted)]">{c.category}</span>
              </div>

              {/* GUI Window Viewport */}
              <div className="relative overflow-hidden border border-[var(--border-strong)] bg-[var(--workspace-bg)] rounded-[4px]">
                <div className="w-full h-full bg-[var(--workspace-bg)] text-[var(--workspace-text)] transition-transform duration-500 group-hover:scale-[1.025] origin-center">
                  <div className="h-[30px] bg-[var(--workspace-panel)] border-b border-[var(--workspace-border)] px-3 flex items-center justify-between font-mono text-[10.5px] text-[var(--workspace-muted)]">
                    <div className="flex gap-[5px]">
                      <span className="w-[7px] h-[7px] rounded-full bg-white/20" />
                      <span className="w-[7px] h-[7px] rounded-full bg-white/20" />
                      <span className="w-[7px] h-[7px] rounded-full bg-white/20" />
                    </div>
                    <span className="truncate max-w-[240px]">{c.windowTitle}</span>
                    <button
                      onClick={() => onCopyStr(c.modelId)}
                      className="cursor-pointer text-[#4B8BF5] hover:underline"
                    >
                      COPY ID
                    </button>
                  </div>

                  <div className="p-4 pb-6 grid grid-cols-1 sm:grid-cols-[1.15fr_1fr] gap-3.5 text-[11.5px]">
                    <div>
                      <div className="font-mono text-[10px] text-[var(--workspace-muted)] uppercase mb-2">
                        VERIFIED TELEMETRY
                      </div>
                      {c.metrics.map((m) => (
                        <div key={m.label} className="mb-2 last:mb-0">
                          <div className="flex justify-between font-mono text-[10.5px] mb-[3px] text-[var(--workspace-muted)]">
                            <span>{m.label}</span>
                            <strong className="text-white">{m.val}</strong>
                          </div>
                          <div className="h-[5px] bg-white/10 overflow-hidden">
                            <div
                              className="h-full origin-left transition-transform duration-1000"
                              style={{
                                width: `${m.pct}%`,
                                backgroundColor: m.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[var(--workspace-panel)] border border-[var(--workspace-border)] p-2.5 sm:p-3 flex flex-col justify-between font-mono">
                      <div className="text-[10px] text-[var(--workspace-muted)] uppercase mb-1">
                        TOKEN ECONOMICS
                      </div>
                      {c.rates.map((r) => (
                        <div
                          key={r.k}
                          className="flex justify-between py-1 border-b border-white/[0.07] last:border-b-0 text-[10.5px]"
                        >
                          <span className="text-[var(--workspace-muted)]">{r.k}</span>
                          <strong className="text-white">{r.v}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlapping Head */}
              <div className="relative pt-3 pl-1">
                <div
                  className="w-16 h-16 -mt-9 rounded-[15px] flex items-center justify-center relative z-5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300"
                  style={{ backgroundColor: c.accent }}
                >
                  <div className="w-[52px] h-[52px] rounded-[12px] bg-[#F4F1EA] border-2 border-[#101014] flex items-center justify-center overflow-hidden">
                    <Image
                      src={c.iconBadge}
                      alt={c.suffix}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between mb-2">
                  <h3 className="font-display text-[24px] leading-[1.1]">
                    {c.prefix}
                    <span style={{ color: c.accent }}>{c.suffix}</span>
                  </h3>
                  <ArrowUpRight
                    className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    strokeWidth={2}
                  />
                </div>

                <p className="text-[var(--text-muted)] text-[14px] mb-3.5 leading-normal">
                  {c.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3.5 font-mono">
                  <span
                    className="art-pill status-ready font-semibold"
                    style={{ borderColor: c.accent, color: c.accent }}
                  >
                    {c.statusBadge}
                  </span>
                  {c.tags.map((t) => (
                    <span key={t} className="art-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[var(--border-line)] flex items-center justify-between font-mono">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.06em] uppercase font-semibold text-[var(--text-primary)] hover:text-[var(--accent-blue)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Official Docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                  <button
                    onClick={() => onSelectModelInStudio(c.modelId)}
                    className="art-pill cursor-pointer hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-colors"
                  >
                    Open in SDK Studio →
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
