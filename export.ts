// UI-side client for the AM Gym Gemini backend (hosted on Vercel).
// The API key never reaches the client — the backend holds it.

import type { ColorScale, TypographyToken } from "../shared/types";

export type GeminiTask = "palette" | "text" | "svg" | "typography";

export interface GeminiResponse {
  palette?: { name: string; shades: Record<string, string> };
  text?: string;
  svg?: string;
  typography?: TypographyToken[];
  raw?: string;
}

const DEFAULT_BACKEND = "https://am-gym.vercel.app";

export function getBackendUrl(): string {
  try {
    return localStorage.getItem("am-gym-backend") || DEFAULT_BACKEND;
  } catch {
    return DEFAULT_BACKEND;
  }
}

export function setBackendUrl(url: string): void {
  try {
    localStorage.setItem("am-gym-backend", url.replace(/\/$/, ""));
  } catch {
    /* ignore */
  }
}

export async function callGemini(task: GeminiTask, prompt: string): Promise<GeminiResponse> {
  const base = getBackendUrl().replace(/\/$/, "");
  const res = await fetch(`${base}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, prompt }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${detail.slice(0, 200)}`);
  }
  return (await res.json()) as GeminiResponse;
}

/** Convert an AI palette response into a ColorScale we can render + generate. */
export function paletteToScale(p: { name: string; shades: Record<string, string> }): ColorScale {
  return {
    name: p.name,
    label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    shades: p.shades,
  };
}
