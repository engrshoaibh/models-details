import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ModelCraft — LLM Pricing Comparison & Token Cost Calculator",
    short_name: "ModelCraft",
    description:
      "Real-time LLM pricing comparison, prompt cache multipliers, token cost calculator, and verified AI coding benchmarks.",
    start_url: "/",
    display: "standalone",
    background_color: "#141416",
    theme_color: "#141416",
    icons: [
      {
        src: "/app-icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
