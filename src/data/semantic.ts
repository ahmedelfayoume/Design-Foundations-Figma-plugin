import type { SemanticToken } from "../shared/types";

// Preference lists: the builder picks the first scale that exists in the
// selected set, so semantic tokens stay meaningful across libraries.
const NEUTRALS = ["slate", "gray", "grey", "neutral", "zinc", "stone", "blueGrey"];
const SUCCESS = ["green", "emerald", "lightGreen"];
const ERROR = ["red", "rose"];
const WARNING = ["amber", "orange", "yellow"];
const INFO = ["blue", "sky", "lightBlue", "indigo"];

function pick(available: string[], prefs: string[], fallback: string): string {
  return prefs.find((p) => available.includes(p)) ?? fallback;
}

/**
 * Build the semantic/alias token set, aliasing the most appropriate base
 * scale that is actually present in the user's selection.
 */
export function buildSemanticTokens(primaryScale: string, available: string[]): SemanticToken[] {
  const neutral = pick(available, NEUTRALS, primaryScale);
  const success = pick(available, SUCCESS, primaryScale);
  const error = pick(available, ERROR, primaryScale);
  const warning = pick(available, WARNING, primaryScale);
  const info = pick(available, INFO, primaryScale);

  return [
    { name: "color-primary", label: "Primary", light: { scale: primaryScale, step: "600" }, dark: { scale: primaryScale, step: "400" } },
    { name: "color-primary-hover", label: "Primary Hover", light: { scale: primaryScale, step: "700" }, dark: { scale: primaryScale, step: "300" } },
    { name: "color-on-primary", label: "On Primary", light: { scale: neutral, step: "50" }, dark: { scale: neutral, step: "50" } },
    { name: "color-success", label: "Success", light: { scale: success, step: "600" }, dark: { scale: success, step: "400" } },
    { name: "color-error", label: "Error", light: { scale: error, step: "600" }, dark: { scale: error, step: "400" } },
    { name: "color-warning", label: "Warning", light: { scale: warning, step: "500" }, dark: { scale: warning, step: "400" } },
    { name: "color-info", label: "Info", light: { scale: info, step: "600" }, dark: { scale: info, step: "400" } },
    { name: "color-background", label: "Background", light: { scale: neutral, step: "50" }, dark: { scale: neutral, step: "950" } },
    { name: "color-surface", label: "Surface", light: { scale: neutral, step: "100" }, dark: { scale: neutral, step: "900" } },
    { name: "color-border", label: "Border", light: { scale: neutral, step: "200" }, dark: { scale: neutral, step: "800" } },
    { name: "color-text", label: "Text", light: { scale: neutral, step: "900" }, dark: { scale: neutral, step: "50" } },
    { name: "color-text-muted", label: "Text Muted", light: { scale: neutral, step: "500" }, dark: { scale: neutral, step: "400" } },
  ];
}
