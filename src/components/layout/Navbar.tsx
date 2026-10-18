"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Sun, Moon, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenCmd: () => void;
  onScrollTo: (id: string) => void;
}

export function Navbar({ onOpenCmd, onScrollTo }: NavbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mc_theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mc_theme", next);
  };

  return (
    <header className="sticky top-0 z-[110] w-full max-w-full overflow-hidden h-[54px] bg-[var(--bg-frosted)] backdrop-blur-[14px] border-b border-[var(--border-line)] flex items-stretch justify-between">
      <div className="flex items-stretch min-w-0">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-[44px] sm:w-[54px] shrink-0 border-r border-[var(--border-line)] flex items-center justify-center cursor-pointer hover:bg-[var(--bg-hover)] transition-colors p-1.5 sm:p-2"
          title="ModelCraft Home"
          aria-label="ModelCraft Home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id="mcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="mcLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E7490" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="mcRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>
            <rect
              width="32"
              height="32"
              rx="8"
              fill="#141416"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.2"
            />
            <polygon
              points="16,6 25,11 16,16 7,11"
              fill="url(#mcGrad)"
              opacity="0.95"
            />
            <polygon
              points="7,11 16,16 16,26 7,21"
              fill="url(#mcLeft)"
              opacity="0.9"
            />
            <polygon
              points="16,16 25,11 25,21 16,26"
              fill="url(#mcRight)"
              opacity="0.9"
            />
            <polygon
              points="16,10 21,13 16,16 11,13"
              fill="#FFFFFF"
              opacity="0.95"
            />
            <circle cx="16" cy="13" r="1.5" fill="#3B82F6" />
            <polyline
              points="7,11 16,16 25,11"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.8"
            />
            <line
              x1="16"
              y1="16"
              x2="16"
              y2="26"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.8"
            />
          </svg>
        </button>

        <div className="flex items-center px-2.5 sm:px-[18px] border-r border-[var(--border-line)] font-display text-[13.5px] sm:text-[15px] font-semibold tracking-[-0.02em] whitespace-nowrap shrink-0">
          ModelCraft
        </div>

        <nav className="hidden md:flex items-center px-[10px] gap-[2px] font-mono">
          <button
            onClick={() => onScrollTo("apps")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            01/Frontier Models
          </button>
          <button
            onClick={() => onScrollTo("lineup")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            02/Lineup
          </button>
          <button
            onClick={() => onScrollTo("sec-matrix")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            Pricing Matrix
          </button>
          <button
            onClick={() => onScrollTo("sec-simulator")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            Cost Simulator
          </button>
          <button
            onClick={() => onScrollTo("principles")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            03/Principles
          </button>
          <button
            onClick={() => onScrollTo("faq")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onScrollTo("get-it")}
            className="px-[11px] py-[6px] text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            04/Get Started
          </button>
        </nav>
      </div>

      <div className="flex items-stretch shrink-0">
        <button
          onClick={onOpenCmd}
          className="w-[42px] sm:w-[54px] shrink-0 border-l border-[var(--border-line)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer font-mono"
          title="Command Palette (Cmd+K)"
          aria-label="Open Command Palette"
        >
          <Search className="w-[15px] height-[15px]" strokeWidth={1.8} />
        </button>

        <button
          onClick={toggleTheme}
          className="w-[42px] sm:w-[54px] shrink-0 border-l border-[var(--border-line)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          title="Toggle Dark / Light Theme"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-[15px] height-[15px]" strokeWidth={1.8} />
          ) : (
            <Moon className="w-[15px] height-[15px]" strokeWidth={1.8} />
          )}
        </button>

        <button
          onClick={() => onScrollTo("sec-simulator")}
          className="border-l border-[var(--border-line)] px-2.5 sm:px-5 bg-[var(--text-primary)] text-[var(--bg-canvas)] text-[10.5px] sm:text-[11px] tracking-[0.06em] uppercase font-semibold font-mono flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">Launch Simulator</span>
          <span className="sm:hidden text-[10px]">Simulator</span>
          <ArrowUpRight className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
