import type { ColorLibrary, ColorScale, GenerateConfig } from "../shared/types";
import { tailwind } from "./tailwind";
import { material } from "./material";

export const libraries: ColorLibrary[] = [tailwind, material];

export function getLibrary(id: string): ColorLibrary {
  return libraries.find((l) => l.id === id) ?? tailwind;
}

export function getScale(lib: ColorLibrary, name: string) {
  return lib.scales.find((s) => s.name === name);
}

/** The numeric step keys of a single scale, sorted ascending. */
export function scaleSteps(scale: ColorScale): string[] {
  return Object.keys(scale.shades).sort((a, b) => Number(a) - Number(b));
}

/** Build the effective library: the chosen base library plus any extra scales. */
export function resolveLibrary(config: GenerateConfig): ColorLibrary {
  const base = getLibrary(config.libraryId);
  if (!config.extraScales || config.extraScales.length === 0) return base;
  const extra = config.extraScales.filter((e) => !base.scales.some((s) => s.name === e.name));
  return { ...base, scales: [...base.scales, ...extra] };
}

/** Pick the nearest available step when a requested step is missing. */
export function nearestStep(steps: string[], wanted: string): string {
  if (steps.includes(wanted)) return wanted;
  const target = Number(wanted);
  let best = steps[0];
  let bestDiff = Infinity;
  for (const s of steps) {
    const diff = Math.abs(Number(s) - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = s;
    }
  }
  return best;
}

export { tailwind, material };
export { defaultTypography } from "./typography";
export { defaultSpacing, defaultRadius } from "./spacing";
export { buildSemanticTokens } from "./semantic";
