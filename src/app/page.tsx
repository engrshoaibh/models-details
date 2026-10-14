"use client";

import React, { useState, useCallback } from "react";
import { MODELS } from "@/data/models";
import { SHOWCASE_CARDS } from "@/data/showcases";
import { Navbar } from "@/components/layout/Navbar";
import { RulerHUD } from "@/components/layout/RulerHUD";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ShowcaseLineup } from "@/components/sections/ShowcaseLineup";
import { PricingMatrix } from "@/components/sections/PricingMatrix";
import { CostSimulator } from "@/components/sections/CostSimulator";
import { BenchmarkArena } from "@/components/sections/BenchmarkArena";
import { DispatchesGrid } from "@/components/sections/DispatchesGrid";
import { SdkStudio } from "@/components/sections/SdkStudio";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Toast } from "@/components/ui/Toast";

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState<string>("ALL");
  const [selectedModelId, setSelectedModelId] = useState<string>("claude-opus-5-5");
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2000);
  }, []);

  const handleCopyStr = useCallback(
    (str: string) => {
      navigator.clipboard.writeText(str);
      showToast(`COPIED ${str}`);
    },
    [showToast]
  );

  const handleCopySnippet = useCallback(
    (code: string) => {
      navigator.clipboard.writeText(code);
      showToast("COPIED SDK SNIPPET");
    },
    [showToast]
  );

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSelectModel = useCallback(
    (id: string) => {
      setSelectedModelId(id);
      scrollToId("sec-sdk");
    },
    [scrollToId]
  );

  const handleToggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mc_theme", next);
  }, []);

  return (
    <>
      {/* Full-Width Top Navigation Bar */}
      <Navbar
        onOpenCmd={() => setIsCmdOpen(true)}
        onScrollTo={scrollToId}
      />

      {/* Fixed Right-Side Ruler & Curving Section Roller HUD */}
      <RulerHUD onScrollTo={scrollToId} />

      {/* Main Architectural Page Shell */}
      <div className="page-shell max-w-full overflow-x-hidden" id="pageShell">
        <main className="w-full max-w-full overflow-x-hidden">
          {/* 01 / CRAFTING APPS */}
          <HeroSection
            models={MODELS}
            selectedProvider={selectedProvider}
            onSelectProvider={setSelectedProvider}
            onScrollTo={scrollToId}
            onSelectModel={handleSelectModel}
          />

          {/* 02 / THE LINEUP */}
          <ShowcaseLineup
            cards={SHOWCASE_CARDS}
            onSelectModelInStudio={handleSelectModel}
            onCopyStr={handleCopyStr}
          />

          {/* 02.B / PRICING & SPECIFICATION MATRIX */}
          <PricingMatrix
            models={MODELS}
            selectedProvider={selectedProvider}
            onCopyStr={handleCopyStr}
          />

          {/* 02.C / TOKEN COST SIMULATOR */}
          <CostSimulator models={MODELS} />

          {/* 02.D / BENCHMARK ARENA */}
          <BenchmarkArena />

          {/* 03 / PRINCIPLES & DISPATCHES */}
          <DispatchesGrid />

          {/* 04 / GET STARTED · SDK STUDIO */}
          <SdkStudio
            models={MODELS}
            selectedModelId={selectedModelId}
            onSelectModelId={setSelectedModelId}
            onCopySnippet={handleCopySnippet}
            onOpenCmd={() => setIsCmdOpen(true)}
          />
        </main>

        <Footer />
      </div>

      {/* Global Command Palette & Toast Notification */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        models={MODELS}
        onScrollTo={scrollToId}
        onSelectModel={setSelectedModelId}
        onToggleTheme={handleToggleTheme}
      />

      <Toast message={toastMessage} />
    </>
  );
}
