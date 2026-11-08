import { cn } from "@/lib/utils";

// Standard ISCN cytogenetic G-banding bands for Human Chromosome 1 (hg38 / 400-550 band resolution)
// Total length ~ 248.95 Mb
const CHR1_BANDS = [
  { name: "1p36.33", start: 0.0, end: 2.3, stain: "gneg" },
  { name: "1p36.32", start: 2.3, end: 5.3, stain: "gpos25" },
  { name: "1p36.31", start: 5.3, end: 7.1, stain: "gneg" },
  { name: "1p36.23", start: 7.1, end: 9.1, stain: "gpos25" },
  { name: "1p36.22", start: 9.1, end: 12.5, stain: "gpos50" },
  { name: "1p36.21", start: 12.5, end: 15.9, stain: "gneg" },
  { name: "1p36.13", start: 15.9, end: 20.1, stain: "gpos100" },
  { name: "1p36.12", start: 20.1, end: 23.6, stain: "gneg" },
  { name: "1p36.11", start: 23.6, end: 27.6, stain: "gpos50" },
  { name: "1p35.3", start: 27.6, end: 29.9, stain: "gneg" },
  { name: "1p35.2", start: 29.9, end: 32.3, stain: "gpos50" },
  { name: "1p35.1", start: 32.3, end: 34.3, stain: "gneg" },
  { name: "1p34.3", start: 34.3, end: 39.6, stain: "gpos75" },
  { name: "1p34.2", start: 39.6, end: 43.7, stain: "gneg" },
  { name: "1p34.1", start: 43.7, end: 46.3, stain: "gpos50" },
  { name: "1p33", start: 46.3, end: 50.2, stain: "gneg" },
  { name: "1p32.3", start: 50.2, end: 53.3, stain: "gpos50" },
  { name: "1p32.2", start: 53.3, end: 55.6, stain: "gneg" },
  { name: "1p32.1", start: 55.6, end: 58.5, stain: "gpos50" },
  { name: "1p31.3", start: 58.5, end: 60.8, stain: "gneg" },
  { name: "1p31.2", start: 60.8, end: 62.4, stain: "gpos25" },
  { name: "1p31.1", start: 62.4, end: 69.8, stain: "gpos100" },
  { name: "1p22.3", start: 69.8, end: 73.8, stain: "gneg" },
  { name: "1p22.2", start: 73.8, end: 77.1, stain: "gpos75" },
  { name: "1p22.1", start: 77.1, end: 84.3, stain: "gneg" },
  { name: "1p21.3", start: 84.3, end: 89.0, stain: "gpos75" },
  { name: "1p21.2", start: 89.0, end: 94.3, stain: "gneg" },
  { name: "1p21.1", start: 94.3, end: 99.5, stain: "gpos75" },
  { name: "1p13.3", start: 99.5, end: 106.7, stain: "gneg" },
  { name: "1p13.2", start: 106.7, end: 112.1, stain: "gpos50" },
  { name: "1p13.1", start: 112.1, end: 115.4, stain: "gneg" },
  { name: "1p12", start: 115.4, end: 120.4, stain: "gpos50" },
  { name: "1p11.2", start: 120.4, end: 121.5, stain: "gneg" },
  { name: "1p11.1", start: 121.5, end: 123.4, stain: "gpos25" },
  { name: "1cen", start: 123.4, end: 125.1, stain: "acen" },
  { name: "1q12", start: 125.1, end: 143.2, stain: "gvar" },
  { name: "1q21.1", start: 143.2, end: 147.5, stain: "gneg" },
  { name: "1q21.2", start: 147.5, end: 150.6, stain: "gpos50" },
  { name: "1q21.3", start: 150.6, end: 154.1, stain: "gneg" },
  { name: "1q22", start: 154.1, end: 156.6, stain: "gpos50" },
  { name: "1q23.1", start: 156.6, end: 159.1, stain: "gneg" },
  { name: "1q23.2", start: 159.1, end: 160.5, stain: "gpos50" },
  { name: "1q23.3", start: 160.5, end: 165.5, stain: "gneg" },
  { name: "1q24.1", start: 165.5, end: 167.2, stain: "gpos50" },
  { name: "1q24.2", start: 167.2, end: 170.3, stain: "gneg" },
  { name: "1q24.3", start: 170.3, end: 173.0, stain: "gpos75" },
  { name: "1q25.1", start: 173.0, end: 176.5, stain: "gneg" },
  { name: "1q25.2", start: 176.5, end: 181.3, stain: "gpos50" },
  { name: "1q25.3", start: 181.3, end: 185.8, stain: "gneg" },
  { name: "1q31.1", start: 185.8, end: 190.8, stain: "gpos100" },
  { name: "1q31.2", start: 190.8, end: 193.8, stain: "gneg" },
  { name: "1q31.3", start: 193.8, end: 198.7, stain: "gpos50" },
  { name: "1q32.1", start: 198.7, end: 201.8, stain: "gneg" },
  { name: "1q32.2", start: 201.8, end: 207.3, stain: "gpos75" },
  { name: "1q32.3", start: 207.3, end: 211.2, stain: "gneg" },
  { name: "1q41", start: 211.2, end: 215.5, stain: "gpos100" },
  { name: "1q42.11", start: 215.5, end: 220.9, stain: "gneg" },
  { name: "1q42.12", start: 220.9, end: 222.4, stain: "gpos50" },
  { name: "1q42.13", start: 222.4, end: 224.4, stain: "gneg" },
  { name: "1q42.2", start: 224.4, end: 226.8, stain: "gpos50" },
  { name: "1q42.3", start: 226.8, end: 231.0, stain: "gneg" },
  { name: "1q43", start: 231.0, end: 234.4, stain: "gpos75" },
  { name: "1q44", start: 234.4, end: 248.9, stain: "gpos75" },
];

const TOTAL_MB = 248.9;
const NUM_LINES = 220;
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 14;

interface LineSegment {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  band: string;
  stain: string;
}

function getBandAtPosition(posMb: number) {
  for (const b of CHR1_BANDS) {
    if (b.start <= posMb && posMb <= b.end) return b;
  }
  return CHR1_BANDS[CHR1_BANDS.length - 1]!;
}

// Precompute the 220 line segments representing Chromosome 1 G-banding
const CHR1_LINES: LineSegment[] = (() => {
  const step = SVG_WIDTH / (NUM_LINES - 1);
  const segments: LineSegment[] = [];

  for (let i = 0; i < NUM_LINES; i++) {
    const pos = (i / (NUM_LINES - 1)) * TOTAL_MB;
    const band = getBandAtPosition(pos);

    let width = 1.0;
    let opacity = 0.22;
    let y = 0;
    let height = SVG_HEIGHT;

    switch (band.stain) {
      case "acen": // Centromere constriction
        width = 1.0;
        y = 3.5;
        height = 7;
        opacity = 0.25;
        break;
      case "gpos100": // Maximum density G-positive bands
        width = 3.8;
        opacity = 0.95;
        break;
      case "gvar": // 1q12 heterochromatin block (hallmark of chromosome 1)
        width = 4.0;
        opacity = 0.95;
        break;
      case "gpos75": // High-density G-positive bands
        width = 2.8;
        opacity = 0.78;
        break;
      case "gpos50": // Medium-density bands
        width = 1.8;
        opacity = 0.55;
        break;
      case "gpos25": // Light G-positive bands
        width = 1.2;
        opacity = 0.35;
        break;
      default: // gneg (light interbands)
        width = 1.0;
        opacity = 0.22;
        break;
    }

    const x = i * step - width / 2;
    segments.push({
      x,
      y,
      width,
      height,
      opacity,
      band: band.name,
      stain: band.stain,
    });
  }

  return segments;
})();

interface ChromosomeStripProps {
  className?: string;
}

export function ChromosomeStrip({ className }: ChromosomeStripProps) {
  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      preserveAspectRatio="none"
      className={cn("w-full h-3.5 block overflow-hidden fill-current", className)}
      role="img"
      aria-label="Human Chromosome 1 G-banding ideogram"
    >
      {CHR1_LINES.map((seg, i) => (
        <rect
          key={i}
          x={seg.x.toFixed(2)}
          y={seg.y}
          width={seg.width}
          height={seg.height}
          opacity={seg.opacity}
          rx={0.5}
        >
          <title>{`Chr 1: ${seg.band} (${seg.stain})`}</title>
        </rect>
      ))}
    </svg>
  );
}
