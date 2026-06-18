import type { GenerateConfig } from "../shared/types";

const WEIGHT_TO_STYLE: Record<number, string> = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
};

/** Try a list of families until one loads with the given style. */
async function loadFont(weight: number): Promise<FontName> {
  const style = WEIGHT_TO_STYLE[weight] ?? "Regular";
  const candidates: FontName[] = [
    { family: "Inter", style },
    { family: "Roboto", style },
    { family: "Inter", style: "Regular" },
    { family: "Roboto", style: "Regular" },
  ];
  for (const font of candidates) {
    try {
      await figma.loadFontAsync(font);
      return font;
    } catch {
      // try next
    }
  }
  // Last resort: a font Figma always ships with.
  const fallback: FontName = { family: "Roboto", style: "Regular" };
  await figma.loadFontAsync(fallback);
  return fallback;
}

export async function generateTextStyles(config: GenerateConfig): Promise<number> {
  if (!config.includeTextStyles || !config.typography.length) return 0;

  const existing = await figma.getLocalTextStylesAsync();
  let created = 0;

  for (const t of config.typography) {
    const font = await loadFont(t.fontWeight);
    const styleName = `${t.label}`;
    let style = existing.find((s) => s.name === styleName);
    if (!style) {
      style = figma.createTextStyle();
      style.name = styleName;
      created++;
    }
    style.fontName = font;
    style.fontSize = t.fontSize;
    style.lineHeight = { value: t.lineHeight, unit: "PIXELS" };
    style.letterSpacing = { value: t.letterSpacing, unit: "PIXELS" };
  }

  return created;
}
