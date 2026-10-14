import React from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { DISPATCHES } from "@/data/dispatches";

export function DispatchesGrid() {
  return (
    <div id="principles">
      {/* Landmark 03 Header Bar */}
      <div className="section-strip-wrap" id="sec-dispatches">
        <div className="draw-rule-line" />
        <div className="section-strip font-mono">
          <span className="hud-tick tick-tl" />
          <span className="hud-tick tick-tr" />
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
            <span className="text-[var(--accent-blue)] font-semibold">03 /</span>
            <span>PRINCIPLES & DISPATCHES</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10.5px]">
            SHARED BY EVERY CRAFT
          </div>
        </div>
        <div className="draw-rule-line" />
      </div>

      <div className="p-9 md:px-10 pb-8 border-b border-[var(--border-line)]">
        <h2 className="font-display text-[clamp(34px,4.4vw,58px)] leading-[1.02] mb-3">
          Built the <span className="font-serif-italic">hard</span> way.
        </h2>
        <p className="text-[15.5px] text-[var(--text-muted)] max-w-[60ch] leading-relaxed">
          Every model entry, cache multiplier, and deprecation date is verified
          against primary API documentation and October 2026 release dispatches.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--border-line)]">
        {DISPATCHES.map((d) => (
          <div
            key={d.num}
            className="group p-7 px-8 border-b md:border-r border-[var(--border-line)] md:[&:nth-child(2n)]:border-r-0 flex flex-col justify-between hover:bg-[var(--bg-hover)] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono">
                <div className="w-9 h-9 border border-[var(--border-line)] flex items-center justify-center text-[var(--accent-blue)] group-hover:-translate-y-0.5 group-hover:border-[var(--accent-blue)] transition-all">
                  <FileText className="w-4 h-4" strokeWidth={2} />
                </div>
                <span className="text-[11.5px] text-[var(--text-muted)]">
                  {d.num}
                </span>
              </div>

              <h3 className="font-display text-[20px] font-semibold mb-2">
                {d.title}
              </h3>
              <p className="text-[14px] text-[var(--text-muted)] mb-4 leading-[1.55]">
                {d.body}
              </p>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-2 pt-3 border-t border-[var(--border-line)] font-mono">
              <div className="flex gap-1.5 flex-wrap">
                {d.tags.map((t) => (
                  <span key={t} className="art-pill">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.06em] uppercase font-semibold text-[var(--text-primary)] hover:text-[var(--accent-blue)] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Dispatch</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
