import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BandDefinition {
  name: string;
  start: number; // 0.0 to 1.0 (pter to qter)
  end: number;   // 0.0 to 1.0
  type: "bold" | "medium" | "light" | "centromere" | "hatched";
  gene?: string;
  condition?: string;
}

// Calibrated cytogenetic G-banding ideogram for Human Chromosome 1
// Matching reference ideogram with landmark disease loci:
// UROD (1p34.1), GBA (1q22), GLC1A (1q24.3), HPC1 (1q25.3), PS2 (1q42.1)
export const CHR1_BANDS: BandDefinition[] = [
  { name: "1pter", start: 0.000, end: 0.020, type: "light" },
  { name: "1p36", start: 0.020, end: 0.075, type: "bold" },
  { name: "1p35", start: 0.075, end: 0.110, type: "light" },
  {
    name: "1p34.1",
    start: 0.110,
    end: 0.140,
    type: "medium",
    gene: "UROD",
    condition: "Porphyria cutanea tarda",
  },
  { name: "1p33", start: 0.140, end: 0.175, type: "light" },
  { name: "1p32", start: 0.175, end: 0.205, type: "medium" },
  { name: "1p31.2", start: 0.205, end: 0.235, type: "light" },
  { name: "1p31.1", start: 0.235, end: 0.295, type: "bold" },
  { name: "1p22", start: 0.295, end: 0.330, type: "light" },
  { name: "1p21", start: 0.330, end: 0.385, type: "bold" },
  { name: "1p13", start: 0.385, end: 0.435, type: "medium" },
  { name: "1p12", start: 0.435, end: 0.465, type: "medium" },
  { name: "1p11", start: 0.465, end: 0.485, type: "light" },
  {
    name: "1cen",
    start: 0.485,
    end: 0.505,
    type: "centromere",
    condition: "Centromeric constriction",
  },
  {
    name: "1q12",
    start: 0.505,
    end: 0.575,
    type: "hatched",
    condition: "Pericentromeric heterochromatin (qh)",
  },
  { name: "1q21", start: 0.575, end: 0.615, type: "light" },
  {
    name: "1q22",
    start: 0.615,
    end: 0.645,
    type: "medium",
    gene: "GBA",
    condition: "Gaucher disease",
  },
  { name: "1q23", start: 0.645, end: 0.665, type: "light" },
  {
    name: "1q24.3",
    start: 0.665,
    end: 0.695,
    type: "medium",
    gene: "GLC1A",
    condition: "Glaucoma",
  },
  { name: "1q25.1", start: 0.695, end: 0.720, type: "light" },
  {
    name: "1q25.3",
    start: 0.720,
    end: 0.745,
    type: "medium",
    gene: "HPC1",
    condition: "Prostate cancer",
  },
  { name: "1q31-32", start: 0.745, end: 0.840, type: "bold" },
  {
    name: "1q41-42.1",
    start: 0.840,
    end: 0.880,
    type: "light",
    gene: "PS2",
    condition: "Alzheimer disease",
  },
  { name: "1q42-43", start: 0.880, end: 0.920, type: "bold" },
  { name: "1q43.3", start: 0.920, end: 0.940, type: "light" },
  { name: "1q44", start: 0.940, end: 0.980, type: "bold" },
  { name: "1qter", start: 0.980, end: 1.000, type: "light" },
];

function getBandAt(t: number): BandDefinition {
  for (const b of CHR1_BANDS) {
    if (t >= b.start && t <= b.end) return b;
  }
  return CHR1_BANDS[CHR1_BANDS.length - 1]!;
}

interface RenderLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
  opacity: number;
  tooltip: string;
  isLandmark: boolean;
}

const SVG_HEIGHT = 14;
const PITCH = 6.0; // uniform 6px center-to-center pitch prevents line merging on all viewports

interface ChromosomeStripProps {
  className?: string;
}

export function ChromosomeStrip({ className }: ChromosomeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined" && window.innerWidth) {
      return Math.min(window.innerWidth - 48, 1280);
    }
    return 1200;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setWidth(w);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const lines = useMemo<RenderLine[]>(() => {
    const w = Math.max(120, width);
    const numLines = Math.max(16, Math.floor(w / PITCH));
    const step = (w - 2) / (numLines - 1);
    const result: RenderLine[] = [];

    for (let i = 0; i < numLines; i++) {
      const t = i / (numLines - 1);
      const band = getBandAt(t);
      const x = 1 + i * step;

      let strokeWidth = 1.0;
      let opacity = 0.22;
      let y1 = 0.5;
      let y2 = SVG_HEIGHT - 0.5;
      let x1 = x;
      let x2 = x;

      switch (band.type) {
        case "bold":
          strokeWidth = 2.4;
          opacity = 0.95;
          break;
        case "medium":
          strokeWidth = 1.7;
          opacity = 0.68;
          break;
        case "centromere":
          // Constricted waist at 1cen
          strokeWidth = 1.2;
          opacity = 0.40;
          y1 = 3.5;
          y2 = SVG_HEIGHT - 3.5;
          break;
        case "hatched":
          // Pericentromeric heterochromatin (1q12) diagonal stripes ///
          strokeWidth = 1.6;
          opacity = 0.85;
          y1 = 1.0;
          y2 = SVG_HEIGHT - 1.0;
          x1 = x - 2.8;
          x2 = x + 2.8;
          break;
        case "light":
        default:
          strokeWidth = 1.0;
          opacity = 0.22;
          break;
      }

      const isLandmark = Boolean(band.gene);
      const tooltip = band.gene
        ? `Chr 1: ${band.name} — ${band.gene} (${band.condition})`
        : band.condition
        ? `Chr 1: ${band.name} (${band.condition})`
        : `Chr 1: ${band.name} (${band.type === "bold" ? "G-positive dark band" : "G-negative band"})`;

      result.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        strokeWidth,
        opacity,
        tooltip,
        isLandmark,
      });
    }

    return result;
  }, [width]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-3.5 select-none overflow-hidden", className)}
      role="img"
      aria-label="Human Chromosome 1 cytogenetic G-banding ideogram with landmark disease loci"
    >
      <svg
        width={width}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${width} ${SVG_HEIGHT}`}
        className="w-full h-full block"
      >
        {lines.map((line) => (
          <line
            key={line.id}
            x1={line.x1.toFixed(2)}
            y1={line.y1.toFixed(2)}
            x2={line.x2.toFixed(2)}
            y2={line.y2.toFixed(2)}
            stroke="currentColor"
            strokeWidth={line.strokeWidth}
            strokeOpacity={line.opacity}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-150 cursor-pointer",
              line.isLandmark && "hover:stroke-[#2563eb] hover:stroke-opacity-100",
              !line.isLandmark && "hover:stroke-opacity-100",
            )}
          >
            <title>{line.tooltip}</title>
          </line>
        ))}
      </svg>
    </div>
  );
}
