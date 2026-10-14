"use client";

import React from "react";
import Image from "next/image";
import { Model } from "@/types";

interface MarqueeTickerProps {
  models: Model[];
}

function fmtUsd(v: number): string {
  if (v < 0.01) return "$" + v.toFixed(3);
  return "$" + v.toFixed(2);
}

export function MarqueeTicker({ models }: MarqueeTickerProps) {
  const renderItems = (keyPrefix: string) => (
    <div className="flex items-center gap-7 pr-7 shrink-0">
      {models.map((m) => (
        <span
          key={`${keyPrefix}-${m.id}`}
          className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-mono tracking-[0.05em] uppercase text-[var(--text-muted)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
          <Image
            src={m.brandIcon}
            alt={m.provider}
            width={12}
            height={12}
            className="w-3 h-3 object-contain opacity-80"
            unoptimized
          />
          <strong className="text-[var(--text-primary)] font-semibold">
            {m.name}
          </strong>
          <span>({m.id})</span>
          <span>—</span>
          <span>{fmtUsd(m.input)} IN</span>
          <span>/</span>
          <span className="text-[var(--accent-emerald)] font-medium">
            {fmtUsd(m.cached)} CACHE
          </span>
          <span>/</span>
          <span>{fmtUsd(m.output)} OUT</span>
          <span className="text-[var(--text-faint)]">· {m.contextLabel} CTX</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-bar flex overflow-hidden border-t border-b border-[var(--border-line)] bg-[var(--bg-sunken)] h-9 items-center select-none w-full">
      <div className="marquee-track-smooth flex items-center">
        {renderItems("track1")}
        {renderItems("track2")}
      </div>
    </div>
  );
}
