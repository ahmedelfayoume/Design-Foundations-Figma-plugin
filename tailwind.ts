// Color helpers for the Figma main thread.

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Parse "#rgb", "#rrggbb" or "#rrggbbaa" into Figma's 0..1 RGBA. */
export function hexToRgba(hex: string): RGBA {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

export function hexToRgb(hex: string): RGB {
  const { r, g, b } = hexToRgba(hex);
  return { r, g, b };
}

function channel(n: number): string {
  return Math.round(n * 255)
    .toString(16)
    .padStart(2, "0");
}

export function rgbaToHex({ r, g, b, a }: RGBA): string {
  const base = `#${channel(r)}${channel(g)}${channel(b)}`;
  return a < 1 ? base + channel(a) : base;
}
