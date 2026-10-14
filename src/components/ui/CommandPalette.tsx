"use client";

import React, { useState, useEffect, useRef } from "react";
import { Model } from "@/types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  models: Model[];
  onScrollTo: (id: string) => void;
  onSelectModel: (id: string) => void;
  onToggleTheme: () => void;
}

interface CommandItem {
  label: string;
  tag: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  models,
  onScrollTo,
  onSelectModel,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultItems: CommandItem[] = [
    {
      label: "01 / Jump to Frontier Models (Hero)",
      tag: "Landmark",
      action: () => {
        onScrollTo("apps");
        onClose();
      },
    },
    {
      label: "02 / Jump to The Lineup & Matrix",
      tag: "Landmark",
      action: () => {
        onScrollTo("lineup");
        onClose();
      },
    },
    {
      label: "03 / Jump to Principles & Dispatches",
      tag: "Landmark",
      action: () => {
        onScrollTo("principles");
        onClose();
      },
    },
    {
      label: "04 / Jump to Get Started & SDK Studio",
      tag: "Landmark",
      action: () => {
        onScrollTo("get-it");
        onClose();
      },
    },
    {
      label: "Toggle Dark / Light Theme",
      tag: "Theme",
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    ...models.map((m) => ({
      label: `${m.name} (${m.id}) — $${m.input}/$${m.output}`,
      tag: m.provider,
      action: () => {
        onSelectModel(m.id);
        onScrollTo("sec-sdk");
        onClose();
      },
    })),
  ];

  const filteredItems = defaultItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[#0A0A0E]/65 backdrop-blur-[4px] flex items-start justify-center pt-[12vh] z-[300] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] bg-[var(--bg-canvas)] border border-[var(--border-strong)] shadow-[0_24px_48px_rgba(0,0,0,0.45)] overflow-hidden"
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 19 models, benchmarks, or jump to section..."
          className="w-full p-4 px-4.5 bg-transparent border-none border-b border-[var(--border-line)] text-[var(--text-primary)] text-[13.5px] font-mono focus:outline-none"
        />

        <div className="max-h-[320px] overflow-y-auto font-mono">
          {filteredItems.slice(0, 12).map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className="p-2.5 px-4.5 border-b border-[var(--border-line)] last:border-b-0 flex justify-between items-center cursor-pointer text-[12.5px] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <span>{item.label}</span>
              <span className="art-pill text-[10px]">{item.tag}</span>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="p-4 text-center text-[var(--text-muted)] text-[12px]">
              No matching results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
