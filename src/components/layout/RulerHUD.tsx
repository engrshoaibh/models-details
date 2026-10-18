"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface RulerHUDProps {
  onScrollTo: (id: string) => void;
}

interface CharInfo {
  el: HTMLSpanElement;
  ch: string;
  wFactor: number;
  adv: number;
  centerOffset: number;
}

interface SectionRollerObj {
  id: string;
  label: string;
  secIdx: number;
  charEls: CharInfo[];
  totalWidth: number;
}

const RULER_SECTIONS = [
  { id: "apps", label: "FRONTIER MODELS" },
  { id: "lineup", label: "LINEUP" },
  { id: "principles", label: "PRINCIPLES" },
  { id: "faq", label: "FAQ & GUIDE" },
  { id: "get-it", label: "GET STARTED" },
];

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function RulerHUD({ onScrollTo }: RulerHUDProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const needleValRef = useRef<HTMLSpanElement>(null);
  const ticksContainerRef = useRef<HTMLDivElement>(null);
  const glyphsLayerRef = useRef<HTMLDivElement>(null);
  const sectionsDataRef = useRef<SectionRollerObj[]>([]);
  const tickRowsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Build 101 Ruler Ticks (0..100)
      if (ticksContainerRef.current) {
        ticksContainerRef.current.innerHTML = "";
        const tickRows: HTMLDivElement[] = [];

        for (let pct = 0; pct <= 100; pct++) {
          const isMajor = pct % 5 === 0;
          const row = document.createElement("div");
          row.className = "ruler-tick-row";
          row.setAttribute("data-pct", String(pct));
          row.style.top = "0px";

          if (isMajor) {
            const num = document.createElement("span");
            num.className = "ruler-tick-num font-mono";
            num.textContent = String(pct);
            row.appendChild(num);
          }

          const line = document.createElement("div");
          line.className = isMajor ? "ruler-tick-line-major" : "ruler-tick-line-minor";
          row.appendChild(line);

          ticksContainerRef.current.appendChild(row);
          tickRows.push(row);
        }
        tickRowsRef.current = tickRows;
      }

      // 2. Build Characters for Curving Section Roller
      if (glyphsLayerRef.current) {
        glyphsLayerRef.current.innerHTML = "";
        const sectionObjs: SectionRollerObj[] = RULER_SECTIONS.map((sec, secIdx) => {
          const chars = Array.from(sec.label);
          const baseStep = 23;
          let cum = 0;

          const charEls: CharInfo[] = chars.map((ch) => {
            const span = document.createElement("span");
            span.className = "roller-char";
            span.textContent = ch;
            glyphsLayerRef.current!.appendChild(span);

            const wFactor =
              ch === " " ? 0.55 : ch === "I" ? 0.62 : ch === "M" || ch === "W" ? 1.18 : 0.94;
            const adv = baseStep * wFactor;
            const centerOffset = cum + adv / 2;
            cum += adv;

            return { el: span, ch, wFactor, adv, centerOffset };
          });

          return {
            id: sec.id,
            label: sec.label,
            secIdx,
            charEls,
            totalWidth: cum,
          };
        });
        sectionsDataRef.current = sectionObjs;
      }

      // 3. Frame Update Function for Scroll Telemetry
      const updateFrame = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw <= 1024) return;

        const scrollY = window.scrollY || window.pageYOffset;
        const docH = Math.max(document.documentElement.scrollHeight, vh + 1);
        const maxScroll = Math.max(1, docH - vh);
        const scrollPct = clamp01(scrollY / maxScroll) * 100;

        // Position 101 Ruler Ticks
        const pxPerPct = Math.max(48, vh / 15.5);
        const totalVirtualRulerPx = 100 * pxPerPct;
        const rulerScrollOffset = (scrollY / maxScroll) * (totalVirtualRulerPx - vh + 48);

        tickRowsRef.current.forEach((el) => {
          const pct = +(el.getAttribute("data-pct") || 0);
          const y = 14 + pct * pxPerPct - rulerScrollOffset;
          if (y < -30 || y > vh + 30) {
            el.style.display = "none";
          } else {
            el.style.display = "flex";
            el.style.transform = `translate3d(0px, ${y.toFixed(1)}px, 0px)`;
          }
        });

        // Update Active Needle
        if (needleRef.current && needleValRef.current) {
          const needleY = 14 + (scrollY / maxScroll) * (vh - 44);
          const needleAlpha = clamp01(scrollPct / 1.5);
          needleRef.current.style.transform = `translate3d(0px, ${needleY.toFixed(1)}px, 0px)`;
          needleRef.current.style.opacity = needleAlpha.toFixed(2);
          needleValRef.current.textContent = Math.round(scrollPct).toString().padStart(2, "0");
        }

        // Calculate continuous section position u
        const anchors = RULER_SECTIONS.map((s, idx) => {
          if (idx === 0) return 0;
          const domEl = document.getElementById(s.id);
          if (!domEl) return idx * (maxScroll / 3);
          return Math.max(0, domEl.getBoundingClientRect().top + scrollY - vh * 0.25);
        });

        let u = 0;
        for (let k = 0; k < anchors.length - 1; k++) {
          const a0 = anchors[k];
          const a1 = Math.max(a0 + 1, anchors[k + 1]);
          if (scrollY >= a0 && scrollY <= a1) {
            u = k + clamp01((scrollY - a0) / (a1 - a0));
            break;
          } else if (scrollY > a1) {
            u = k + 1;
          }
        }

        // Geometry Constants
        const shellEl = document.getElementById("pageShell");
        const shellRightX = shellEl ? shellEl.getBoundingClientRect().right : vw - 268;
        const railX = vw - 42;
        const topWordY = 96;
        const bottomCornerY = vh - 86;
        const cornerRadius = 32;
        const stackRightEnd = vw - 56;
        const stackBaseY = vh - 56;
        const stackRowGap = 24;

        const arcLen = (Math.PI / 2) * cornerRadius;
        const cornerStartX = railX - cornerRadius;

        const sampleJTrack = (s: number) => {
          if (s <= 0) {
            return { x: cornerStartX + s, y: bottomCornerY, rot: 0 };
          } else if (s < arcLen) {
            const phi = (s / arcLen) * (Math.PI / 2);
            return {
              x: cornerStartX + cornerRadius * Math.sin(phi),
              y: bottomCornerY - cornerRadius + cornerRadius * Math.cos(phi),
              rot: -(phi * 180) / Math.PI,
            };
          } else {
            return {
              x: railX,
              y: bottomCornerY - cornerRadius - (s - arcLen),
              rot: -90,
            };
          }
        };

        // Render sections characters
        sectionsDataRef.current.forEach((secObj, idx) => {
          const rel = idx - u;
          const queueScale = 0.5;
          const topScale = 1.0;
          const topWordStartX = Math.min(
            shellRightX - 38,
            vw - secObj.totalWidth * topScale - 36
          );

          secObj.charEls.forEach((c) => {
            const el = c.el;

            if (rel < 0) {
              const p = clamp01(-rel / 0.55);
              const x = topWordStartX + c.centerOffset * topScale;
              const y = topWordY - p * 70;
              const alpha = 1 - p;
              el.style.opacity = alpha.toFixed(3);
              el.style.color = "var(--text-primary)";
              el.style.fontWeight = "700";
              el.style.fontSize = "32px";
              el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) translate(-50%, -50%) rotate(0deg) scale(1)`;
              return;
            }

            if (rel >= 0 && rel <= 1) {
              const tAscent = 1 - rel;
              const restBaseS = 14;
              const topTravelDist = Math.max(220, bottomCornerY - cornerRadius - (topWordY + 90));
              const sWord = restBaseS + easeInOutCubic(clamp01(tAscent / 0.78)) * topTravelDist;
              const sChar = sWord + c.centerOffset * queueScale;
              const railPt = sampleJTrack(sChar);

              const topTargetX = topWordStartX + c.centerOffset * topScale;
              const topTargetY = topWordY;

              const unbendT = easeInOutCubic(clamp01((tAscent - 0.64) / 0.36));
              const ctrlX = (railPt.x + topTargetX) / 2 - 28;
              const ctrlY = Math.min(railPt.y, topTargetY);

              const x =
                (1 - unbendT) * (1 - unbendT) * railPt.x +
                2 * (1 - unbendT) * unbendT * ctrlX +
                unbendT * unbendT * topTargetX;
              const y =
                (1 - unbendT) * (1 - unbendT) * railPt.y +
                2 * (1 - unbendT) * unbendT * ctrlY +
                unbendT * unbendT * topTargetY;
              const rot = railPt.rot * (1 - unbendT);
              const sc = queueScale + (topScale - queueScale) * unbendT;
              const alpha = 0.52 + 0.48 * unbendT;
              const weight = Math.round(600 + 150 * unbendT);

              el.style.opacity = alpha.toFixed(3);
              el.style.color = "var(--text-primary)";
              el.style.fontWeight = String(weight);
              el.style.fontSize = "32px";
              el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
              return;
            }

            if (rel > 1 && rel <= 2) {
              const tFeed = 2 - rel;
              const d = easeInOutCubic(tFeed);

              const wordScaledW = secObj.totalWidth * queueScale;
              const stackX = stackRightEnd - wordScaledW + c.centerOffset * queueScale;
              const stackY = stackBaseY;

              const sChar = 14 + c.centerOffset * queueScale;
              const cornerPt = sampleJTrack(sChar);

              const x = stackX + (cornerPt.x - stackX) * d;
              const y = stackY + (cornerPt.y - stackY) * d;
              const rot = cornerPt.rot * d;

              el.style.opacity = (0.45 + 0.07 * d).toFixed(3);
              el.style.color = "var(--text-primary)";
              el.style.fontWeight = "600";
              el.style.fontSize = "32px";
              el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) scale(${queueScale})`;
              return;
            }

            const stackSlot = rel - 2;
            const wordScaledW = secObj.totalWidth * queueScale;
            const stackX = stackRightEnd - wordScaledW + c.centerOffset * queueScale;
            const stackY = stackBaseY + stackSlot * stackRowGap;

            el.style.opacity = "0.45";
            el.style.color = "var(--text-primary)";
            el.style.fontWeight = "600";
            el.style.fontSize = "32px";
            el.style.transform = `translate3d(${stackX.toFixed(1)}px, ${stackY.toFixed(1)}px, 0px) translate(-50%, -50%) rotate(0deg) scale(${queueScale})`;
          });
        });
      };

      // Connect with GSAP ticker & window resize
      updateFrame();
      const onScroll = () => requestAnimationFrame(updateFrame);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    },
    { scope: containerRef }
  );

  return (
    <aside
      aria-label="Sections"
      className="ruler-aside"
      id="rulerAside"
      ref={containerRef}
    >
      <div className="ruler-ticks-viewport" id="rulerTicksViewport">
        <div className="ruler-active-needle" id="rulerNeedle" ref={needleRef}>
          <span
            className="ruler-odometer-badge font-mono"
            id="rulerNeedleVal"
            ref={needleValRef}
          >
            00
          </span>
          <div className="ruler-needle-line" />
        </div>
        <div id="rulerTicksContainer" ref={ticksContainerRef} />
      </div>

      <div className="roller-glyphs-layer" id="rollerGlyphsLayer" ref={glyphsLayerRef} />

      <div className="roller-hitboxes">
        <button
          className="roller-hit-btn"
          onClick={() => onScrollTo("lineup")}
          title="Jump to Lineup"
          aria-label="Jump to Lineup"
        />
        <button
          className="roller-hit-btn"
          onClick={() => onScrollTo("principles")}
          title="Jump to Principles"
          aria-label="Jump to Principles"
        />
        <button
          className="roller-hit-btn"
          onClick={() => onScrollTo("get-it")}
          title="Jump to Get Started"
          aria-label="Jump to Get Started"
        />
      </div>
    </aside>
  );
}
