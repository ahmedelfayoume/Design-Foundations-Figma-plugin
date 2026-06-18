// Types shared between the plugin "main" thread (code.ts) and the UI iframe.
// Keep this file dependency-free — it is imported by both bundles.

export type Mode = "light" | "dark";

/** A single color scale, e.g. Tailwind "blue" with steps 50…950. */
export interface ColorScale {
  /** Machine name, e.g. "blue". */
  name: string;
  /** Display label, e.g. "Blue". */
  label: string;
  /** step -> hex, e.g. { "50": "#eff6ff", ... }. */
  shades: Record<string, string>;
}

/** A named collection of color scales sourced from a design system. */
export interface ColorLibrary {
  id: string;
  label: string;
  /** Ordered list of step keys this library uses, e.g. ["50","100",...]. */
  steps: string[];
  scales: ColorScale[];
}

export interface TypographyToken {
  name: string; // e.g. "heading-1"
  label: string; // e.g. "Heading 1"
  fontSize: number; // px
  lineHeight: number; // px
  fontWeight: number; // 100..900
  letterSpacing: number; // px
}

export interface SpacingToken {
  name: string; // e.g. "space-4"
  value: number; // px
}

/** A semantic/alias token that points at a base color step. */
export interface SemanticToken {
  name: string; // e.g. "color-success"
  label: string; // e.g. "Success"
  /** scale name + step to alias in light/dark mode. */
  light: { scale: string; step: string };
  dark: { scale: string; step: string };
}

/** Configuration the UI sends to the main thread to generate everything. */
export interface GenerateConfig {
  libraryId: string;
  /** Selected scale names from the library, e.g. ["blue","slate","red"]. */
  selectedScales: string[];
  /** AI-generated or custom scales merged on top of the chosen library. */
  extraScales: ColorScale[];
  /** Which base scale acts as the brand/primary. */
  primaryScale: string;
  modes: Mode[];
  includeSemantic: boolean;
  includeTypography: boolean;
  includeSpacing: boolean;
  includeTextStyles: boolean;
  typography: TypographyToken[];
  spacing: SpacingToken[];
  semantic: SemanticToken[];
}

export type ExportFormat = "css" | "js" | "json";

// ---- Messages: UI -> main thread ----
export type UIMessage =
  | { type: "generate"; config: GenerateConfig }
  | { type: "export"; format: ExportFormat; config: GenerateConfig }
  | { type: "print-docs"; config: GenerateConfig }
  | { type: "insert-svg"; svg: string }
  | { type: "insert-text"; text: string }
  | { type: "resize"; width: number; height: number }
  | { type: "notify"; message: string };

// ---- Messages: main thread -> UI ----
export type PluginMessage =
  | { type: "done"; summary: string }
  | { type: "export-result"; format: ExportFormat; filename: string; content: string }
  | { type: "error"; message: string };
