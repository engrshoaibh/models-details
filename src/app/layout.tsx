import type { Metadata } from "next";
import { Inter, Archivo, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ModelCraft — Frontier AI Model Pricing, Benchmarks & Dispatches",
  description:
    "Nineteen frontier AI models. One craft. Agentic coding, frontier reasoning, 10M repository context, prompt-caching multipliers, and verified October 2026 telemetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
