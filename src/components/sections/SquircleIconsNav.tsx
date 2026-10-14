"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Model } from "@/types";

interface SquircleIconsNavProps {
  models: Model[];
  onSelectModel: (id: string) => void;
}

export function SquircleIconsNav({ models, onSelectModel }: SquircleIconsNavProps) {
  const heroModels = models.filter((m) => m.inHeroRight);

  return (
    <nav
      aria-label="Crafting Apps"
      className="flex flex-wrap justify-center gap-x-4 gap-y-5 w-full"
    >
      {heroModels.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelectModel(m.id)}
          className="group w-[76px] flex flex-col items-center gap-2 cursor-pointer text-center relative border-none bg-transparent p-0"
          title={`${m.name} (${m.provider})`}
        >
          <div
            className="craft-squircle"
            style={{ backgroundColor: m.sqColor }}
          >
            <div className="sq-art-badge">
              <Image
                src={m.brandIcon}
                alt={`${m.name} official logo`}
                width={34}
                height={34}
                className="w-[34px] h-[34px] object-contain transform transition-transform duration-300 group-hover:scale-110"
                priority
                unoptimized
              />
            </div>
          </div>
          <span className="text-[12px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
            {m.short}
          </span>
        </button>
      ))}
    </nav>
  );
}
