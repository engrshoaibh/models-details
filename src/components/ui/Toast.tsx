"use client";

import React from "react";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-6 bg-[var(--text-primary)] text-[var(--bg-canvas)] py-2 px-3.5 text-[11.5px] tracking-[0.04em] uppercase font-mono shadow-lg transition-opacity duration-150 z-[400] animate-in fade-in slide-in-from-bottom-2">
      {message}
    </div>
  );
}
