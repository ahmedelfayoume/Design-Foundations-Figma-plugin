"use strict";
(() => {
  // src/data/tailwind.ts
  var STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
  var RAW = {
    slate: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"],
    gray: ["#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937", "#111827", "#030712"],
    zinc: ["#fafafa", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b", "#09090b"],
    neutral: ["#fafafa", "#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373", "#525252", "#404040", "#262626", "#171717", "#0a0a0a"],
    stone: ["#fafaf9", "#f5f5f4", "#e7e5e4", "#d6d3d1", "#a8a29e", "#78716c", "#57534e", "#44403c", "#292524", "#1c1917", "#0c0a09"],
    red: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"],
    orange: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"],
    amber: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"],
    yellow: ["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"],
    lime: ["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"],
    green: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"],
    emerald: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"],
    teal: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"],
    cyan: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"],
    sky: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"],
    blue: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
    indigo: ["#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81", "#1e1b4b"],
    violet: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"],
    purple: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"],
    fuchsia: ["#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"],
    pink: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"],
    rose: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"]
  };
  function toScale(name, values) {
    const shades = {};
    STEPS.forEach((step, i) => shades[step] = values[i]);
    return { name, label: name.charAt(0).toUpperCase() + name.slice(1), shades };
  }
  var tailwind = {
    id: "tailwind",
    label: "Tailwind CSS",
    steps: STEPS,
    scales: Object.entries(RAW).map(([name, values]) => toScale(name, values))
  };

  // src/data/material.ts
  var STEPS2 = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  var RAW2 = {
    red: ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c"],
    pink: ["#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f"],
    purple: ["#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"],
    deepPurple: ["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"],
    indigo: ["#e8eaf6", "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593", "#1a237e"],
    blue: ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"],
    lightBlue: ["#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd", "#01579b"],
    cyan: ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"],
    teal: ["#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"],
    green: ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"],
    lightGreen: ["#f1f8e9", "#dcedc8", "#c5e1a5", "#aed581", "#9ccc65", "#8bc34a", "#7cb342", "#689f38", "#558b2f", "#33691e"],
    lime: ["#f9fbe7", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#cddc39", "#c0ca33", "#afb42b", "#9e9d24", "#827717"],
    yellow: ["#fffde7", "#fff9c4", "#fff59d", "#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825", "#f57f17"],
    amber: ["#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00"],
    orange: ["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"],
    deepOrange: ["#fbe9e7", "#ffccbc", "#ffab91", "#ff8a65", "#ff7043", "#ff5722", "#f4511e", "#e64a19", "#d84315", "#bf360c"],
    brown: ["#efebe9", "#d7ccc8", "#bcaaa4", "#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e", "#3e2723"],
    grey: ["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121"],
    blueGrey: ["#eceff1", "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f", "#263238"]
  };
  var LABELS = {
    deepPurple: "Deep Purple",
    lightBlue: "Light Blue",
    lightGreen: "Light Green",
    deepOrange: "Deep Orange",
    blueGrey: "Blue Grey"
  };
  function toScale2(name, values) {
    const shades = {};
    STEPS2.forEach((step, i) => shades[step] = values[i]);
    const label = LABELS[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
    return { name, label, shades };
  }
  var material = {
    id: "material",
    label: "Material Design",
    steps: STEPS2,
    scales: Object.entries(RAW2).map(([name, values]) => toScale2(name, values))
  };

  // src/data/semantic.ts
  var NEUTRALS = ["slate", "gray", "grey", "neutral", "zinc", "stone", "blueGrey"];
  var SUCCESS = ["green", "emerald", "lightGreen"];
  var ERROR = ["red", "rose"];
  var WARNING = ["amber", "orange", "yellow"];
  var INFO = ["blue", "sky", "lightBlue", "indigo"];
  function pick(available, prefs, fallback) {
    return prefs.find((p) => available.includes(p)) ?? fallback;
  }
  function buildSemanticTokens(primaryScale, available) {
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
      { name: "color-text-muted", label: "Text Muted", light: { scale: neutral, step: "500" }, dark: { scale: neutral, step: "400" } }
    ];
  }

  // src/data/index.ts
  var libraries = [tailwind, material];
  function getLibrary(id) {
    return libraries.find((l) => l.id === id) ?? tailwind;
  }
  function getScale(lib, name) {
    return lib.scales.find((s) => s.name === name);
  }
  function scaleSteps(scale) {
    return Object.keys(scale.shades).sort((a, b) => Number(a) - Number(b));
  }
  function resolveLibrary(config) {
    const base = getLibrary(config.libraryId);
    if (!config.extraScales || config.extraScales.length === 0) return base;
    const extra = config.extraScales.filter((e) => !base.scales.some((s) => s.name === e.name));
    return { ...base, scales: [...base.scales, ...extra] };
  }
  function nearestStep(steps, wanted) {
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

  // src/plugin/color.ts
  function hexToRgba(hex) {
    let h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h.split("").map((c) => c + c).join("");
    }
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }
  function hexToRgb(hex) {
    const { r, g, b } = hexToRgba(hex);
    return { r, g, b };
  }

  // src/plugin/variables.ts
  async function findOrCreateCollection(name) {
    const existing = await figma.variables.getLocalVariableCollectionsAsync();
    const found = existing.find((c) => c.name === name);
    if (found) return found;
    return figma.variables.createVariableCollection(name);
  }
  async function localVariablesIn(collection) {
    const all = await figma.variables.getLocalVariablesAsync();
    return all.filter((v) => v.variableCollectionId === collection.id);
  }
  function ensureModes(collection, modeNames) {
    const map = {};
    collection.renameMode(collection.modes[0].modeId, modeNames[0]);
    map[modeNames[0]] = collection.modes[0].modeId;
    for (let i = 1; i < modeNames.length; i++) {
      const existing = collection.modes.find((m) => m.name === modeNames[i]);
      map[modeNames[i]] = existing ? existing.modeId : collection.addMode(modeNames[i]);
    }
    return map;
  }
  async function findOrCreateVar(name, collection, type, existing) {
    const found = existing.find((v) => v.name === name && v.resolvedType === type);
    if (found) return { variable: found, created: false };
    return { variable: figma.variables.createVariable(name, collection, type), created: true };
  }
  async function generateVariables(config) {
    const lib = resolveLibrary(config);
    const result = {
      colorVarsCreated: 0,
      semanticVarsCreated: 0,
      spacingVarsCreated: 0,
      typographyVarsCreated: 0,
      colorVars: /* @__PURE__ */ new Map()
    };
    const modeNames = config.modes.map((m) => m === "light" ? "Light" : "Dark");
    const colorCollection = await findOrCreateCollection("Colors");
    const colorModes = ensureModes(colorCollection, modeNames);
    let colorExisting = await localVariablesIn(colorCollection);
    for (const scaleName of config.selectedScales) {
      const scale = getScale(lib, scaleName);
      if (!scale) continue;
      for (const step of scaleSteps(scale)) {
        const hex = scale.shades[step];
        if (!hex) continue;
        const varName = `${scale.label}/${step}`;
        const { variable, created } = await findOrCreateVar(varName, colorCollection, "COLOR", colorExisting);
        if (created) {
          colorExisting.push(variable);
          result.colorVarsCreated++;
        }
        const rgba = hexToRgba(hex);
        for (const modeId of Object.values(colorModes)) {
          variable.setValueForMode(modeId, rgba);
        }
        result.colorVars.set(`${scaleName}/${step}`, variable);
      }
    }
    if (config.includeSemantic) {
      const tokens = config.semantic.length ? config.semantic : buildSemanticTokens(config.primaryScale, config.selectedScales);
      const tokenCollection = await findOrCreateCollection("Semantic Tokens");
      const tokenModes = ensureModes(tokenCollection, modeNames);
      const tokenExisting = await localVariablesIn(tokenCollection);
      for (const token of tokens) {
        const { variable, created } = await findOrCreateVar(token.name, tokenCollection, "COLOR", tokenExisting);
        if (created) {
          tokenExisting.push(variable);
          result.semanticVarsCreated++;
        }
        const setAlias = (modeKey, modeId) => {
          const ref = token[modeKey];
          const scale = getScale(lib, ref.scale);
          if (!scale) return;
          const step = nearestStep(scaleSteps(scale), ref.step);
          const base = result.colorVars.get(`${ref.scale}/${step}`);
          if (base) {
            variable.setValueForMode(modeId, figma.variables.createVariableAlias(base));
          } else {
            variable.setValueForMode(modeId, hexToRgba(scale.shades[step]));
          }
        };
        if (colorModes["Light"] && tokenModes["Light"]) setAlias("light", tokenModes["Light"]);
        if (tokenModes["Dark"]) setAlias("dark", tokenModes["Dark"]);
        else if (tokenModes["Light"] && !colorModes["Light"]) setAlias("light", tokenModes["Light"]);
      }
    }
    if (config.includeSpacing && config.spacing.length) {
      const spacingCollection = await findOrCreateCollection("Spacing & Size");
      ensureModes(spacingCollection, ["Value"]);
      const modeId = spacingCollection.modes[0].modeId;
      const existing = await localVariablesIn(spacingCollection);
      for (const token of config.spacing) {
        const { variable, created } = await findOrCreateVar(token.name, spacingCollection, "FLOAT", existing);
        if (created) {
          existing.push(variable);
          result.spacingVarsCreated++;
        }
        variable.setValueForMode(modeId, token.value);
      }
    }
    if (config.includeTypography && config.typography.length) {
      const typeCollection = await findOrCreateCollection("Typography");
      ensureModes(typeCollection, ["Value"]);
      const modeId = typeCollection.modes[0].modeId;
      const existing = await localVariablesIn(typeCollection);
      for (const t of config.typography) {
        const fields = [
          [`${t.name}/font-size`, t.fontSize],
          [`${t.name}/line-height`, t.lineHeight],
          [`${t.name}/font-weight`, t.fontWeight],
          [`${t.name}/letter-spacing`, t.letterSpacing]
        ];
        for (const [name, value] of fields) {
          const { variable, created } = await findOrCreateVar(name, typeCollection, "FLOAT", existing);
          if (created) {
            existing.push(variable);
            result.typographyVarsCreated++;
          }
          variable.setValueForMode(modeId, value);
        }
      }
    }
    return result;
  }

  // src/plugin/styles.ts
  var WEIGHT_TO_STYLE = {
    100: "Thin",
    200: "Extra Light",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "Semi Bold",
    700: "Bold",
    800: "Extra Bold",
    900: "Black"
  };
  async function loadFont(weight) {
    const style = WEIGHT_TO_STYLE[weight] ?? "Regular";
    const candidates = [
      { family: "Inter", style },
      { family: "Roboto", style },
      { family: "Inter", style: "Regular" },
      { family: "Roboto", style: "Regular" }
    ];
    for (const font of candidates) {
      try {
        await figma.loadFontAsync(font);
        return font;
      } catch {
      }
    }
    const fallback = { family: "Roboto", style: "Regular" };
    await figma.loadFontAsync(fallback);
    return fallback;
  }
  async function generateTextStyles(config) {
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

  // src/plugin/export.ts
  function collect(config) {
    const lib = resolveLibrary(config);
    const out = { colors: {}, semanticLight: {}, semanticDark: {}, spacing: {}, typography: {} };
    for (const scaleName of config.selectedScales) {
      const scale = getScale(lib, scaleName);
      if (!scale) continue;
      for (const step of scaleSteps(scale)) {
        if (scale.shades[step]) out.colors[`${scaleName}-${step}`] = scale.shades[step];
      }
    }
    if (config.includeSemantic) {
      const tokens = config.semantic.length ? config.semantic : buildSemanticTokens(config.primaryScale, config.selectedScales);
      for (const t of tokens) {
        const l = getScale(lib, t.light.scale);
        const d = getScale(lib, t.dark.scale);
        if (l) out.semanticLight[t.name] = l.shades[nearestStep(scaleSteps(l), t.light.step)];
        if (d) out.semanticDark[t.name] = d.shades[nearestStep(scaleSteps(d), t.dark.step)];
      }
    }
    if (config.includeSpacing) for (const s of config.spacing) out.spacing[s.name] = s.value;
    if (config.includeTypography)
      for (const t of config.typography)
        out.typography[t.name] = {
          fontSize: t.fontSize,
          lineHeight: t.lineHeight,
          fontWeight: t.fontWeight,
          letterSpacing: t.letterSpacing
        };
    return out;
  }
  function toCss(t) {
    const lines = [":root {"];
    for (const [k, v] of Object.entries(t.colors)) lines.push(`  --color-${k}: ${v};`);
    for (const [k, v] of Object.entries(t.semanticLight)) lines.push(`  --${k}: ${v};`);
    for (const [k, v] of Object.entries(t.spacing)) lines.push(`  --${k}: ${v}px;`);
    for (const [k, v] of Object.entries(t.typography)) {
      lines.push(`  --font-${k}-size: ${v.fontSize}px;`);
      lines.push(`  --font-${k}-line-height: ${v.lineHeight}px;`);
      lines.push(`  --font-${k}-weight: ${v.fontWeight};`);
      lines.push(`  --font-${k}-letter-spacing: ${v.letterSpacing}px;`);
    }
    lines.push("}");
    if (Object.keys(t.semanticDark).length) {
      lines.push("", '[data-theme="dark"] {');
      for (const [k, v] of Object.entries(t.semanticDark)) lines.push(`  --${k}: ${v};`);
      lines.push("}");
    }
    return lines.join("\n");
  }
  function toJs(t) {
    return `// Design tokens generated by AM Gym \u2014 Design Foundations
export const tokens = ${JSON.stringify(
      {
        colors: t.colors,
        semantic: { light: t.semanticLight, dark: t.semanticDark },
        spacing: t.spacing,
        typography: t.typography
      },
      null,
      2
    )};

export default tokens;
`;
  }
  function toJson(t) {
    const doc = {};
    const color = {};
    for (const [k, v] of Object.entries(t.colors)) color[k] = { $value: v, $type: "color" };
    doc.color = color;
    if (Object.keys(t.semanticLight).length) {
      const sem = {};
      for (const [k, v] of Object.entries(t.semanticLight)) {
        sem[k] = { $value: v, $type: "color", $extensions: { dark: t.semanticDark[k] } };
      }
      doc.semantic = sem;
    }
    if (Object.keys(t.spacing).length) {
      const sp = {};
      for (const [k, v] of Object.entries(t.spacing)) sp[k] = { $value: `${v}px`, $type: "dimension" };
      doc.spacing = sp;
    }
    if (Object.keys(t.typography).length) {
      const ty = {};
      for (const [k, v] of Object.entries(t.typography))
        ty[k] = {
          $type: "typography",
          $value: {
            fontSize: `${v.fontSize}px`,
            lineHeight: `${v.lineHeight}px`,
            fontWeight: v.fontWeight,
            letterSpacing: `${v.letterSpacing}px`
          }
        };
      doc.typography = ty;
    }
    return JSON.stringify(doc, null, 2);
  }
  function exportTokens(format, config) {
    const t = collect(config);
    switch (format) {
      case "css":
        return { filename: "tokens.css", content: toCss(t) };
      case "js":
        return { filename: "tokens.js", content: toJs(t) };
      case "json":
        return { filename: "tokens.json", content: toJson(t) };
    }
  }

  // src/plugin/docs.ts
  var FONT_REGULAR = { family: "Inter", style: "Regular" };
  var FONT_BOLD = { family: "Inter", style: "Bold" };
  async function loadDocFonts() {
    try {
      await figma.loadFontAsync(FONT_REGULAR);
      await figma.loadFontAsync(FONT_BOLD);
      return { regular: FONT_REGULAR, bold: FONT_BOLD };
    } catch {
      const r = { family: "Roboto", style: "Regular" };
      const b = { family: "Roboto", style: "Bold" };
      await figma.loadFontAsync(r);
      await figma.loadFontAsync(b);
      return { regular: r, bold: b };
    }
  }
  function text(content, font, size, color = "#1e293b") {
    const node = figma.createText();
    node.fontName = font;
    node.fontSize = size;
    node.characters = content;
    node.fills = [{ type: "SOLID", color: hexToRgb(color) }];
    return node;
  }
  function vstack(name, gap, padding = 0) {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = "VERTICAL";
    f.itemSpacing = gap;
    f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = padding;
    f.fills = [];
    f.counterAxisSizingMode = "AUTO";
    f.primaryAxisSizingMode = "AUTO";
    return f;
  }
  function hstack(name, gap) {
    const f = vstack(name, gap);
    f.layoutMode = "HORIZONTAL";
    return f;
  }
  function swatch(hex, label, sub, fonts) {
    const cell = vstack(`swatch ${label}`, 4);
    const rect = figma.createRectangle();
    rect.resize(72, 48);
    rect.cornerRadius = 6;
    rect.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
    rect.strokes = [{ type: "SOLID", color: hexToRgb("#e2e8f0") }];
    rect.strokeWeight = 1;
    cell.appendChild(rect);
    cell.appendChild(text(label, fonts.regular, 11, "#0f172a"));
    cell.appendChild(text(sub, fonts.regular, 10, "#64748b"));
    return cell;
  }
  async function printDocs(config) {
    const fonts = await loadDocFonts();
    const lib = resolveLibrary(config);
    const root = vstack("AM Gym \u2014 Design Foundations", 32, 48);
    root.fills = [{ type: "SOLID", color: hexToRgb("#ffffff") }];
    root.cornerRadius = 16;
    root.appendChild(text("Design Foundations", fonts.bold, 32, "#0f172a"));
    root.appendChild(text(`${lib.label} \u2022 generated by AM Gym`, fonts.regular, 14, "#64748b"));
    const colorSection = vstack("Color Palette", 16);
    colorSection.appendChild(text("Color Palette", fonts.bold, 20));
    for (const scaleName of config.selectedScales) {
      const scale = getScale(lib, scaleName);
      if (!scale) continue;
      const row = vstack(scale.label, 8);
      row.appendChild(text(scale.label, fonts.bold, 13));
      const swatches = hstack(`${scale.label} swatches`, 8);
      for (const step of scaleSteps(scale)) {
        if (scale.shades[step]) swatches.appendChild(swatch(scale.shades[step], step, scale.shades[step], fonts));
      }
      row.appendChild(swatches);
      colorSection.appendChild(row);
    }
    root.appendChild(colorSection);
    if (config.includeSemantic) {
      const tokens = config.semantic.length ? config.semantic : buildSemanticTokens(config.primaryScale, config.selectedScales);
      const sec = vstack("Semantic Tokens", 12);
      sec.appendChild(text("Semantic Tokens", fonts.bold, 20));
      const grid = hstack("semantic swatches", 8);
      grid.layoutWrap = "WRAP";
      grid.counterAxisSizingMode = "FIXED";
      grid.resize(900, 10);
      for (const t of tokens) {
        const l = getScale(lib, t.light.scale);
        if (l) grid.appendChild(swatch(l.shades[nearestStep(scaleSteps(l), t.light.step)], t.label, t.name, fonts));
      }
      sec.appendChild(grid);
      root.appendChild(sec);
    }
    if (config.includeTypography && config.typography.length) {
      const sec = vstack("Typography", 12);
      sec.appendChild(text("Typography", fonts.bold, 20));
      for (const t of config.typography) {
        const sample = text(`${t.label} \u2014 ${t.fontSize}/${t.lineHeight} \xB7 ${t.fontWeight}`, fonts.regular, Math.min(t.fontSize, 48));
        sec.appendChild(sample);
      }
      root.appendChild(sec);
    }
    if (config.includeSpacing && config.spacing.length) {
      const sec = vstack("Spacing & Size", 8);
      sec.appendChild(text("Spacing & Size", fonts.bold, 20));
      for (const s of config.spacing) {
        const rowf = hstack(s.name, 12);
        rowf.counterAxisAlignItems = "CENTER";
        rowf.appendChild(text(`${s.name} (${s.value})`, fonts.regular, 12));
        const bar = figma.createRectangle();
        bar.resize(Math.max(s.value, 1), 12);
        bar.cornerRadius = 2;
        bar.fills = [{ type: "SOLID", color: hexToRgb("#6366f1") }];
        rowf.appendChild(bar);
        sec.appendChild(rowf);
      }
      root.appendChild(sec);
    }
    root.x = figma.viewport.center.x - 500;
    root.y = figma.viewport.center.y - 300;
    figma.currentPage.appendChild(root);
    figma.viewport.scrollAndZoomIntoView([root]);
    return root;
  }

  // src/code.ts
  figma.showUI(__html__, { width: 460, height: 720, themeColors: true });
  function post(msg) {
    figma.ui.postMessage(msg);
  }
  figma.ui.onmessage = async (msg) => {
    try {
      switch (msg.type) {
        case "generate": {
          const result = await generateVariables(msg.config);
          const textStyles = await generateTextStyles(msg.config);
          const summary = `Created ${result.colorVarsCreated} color, ${result.semanticVarsCreated} semantic, ${result.spacingVarsCreated} spacing, ${result.typographyVarsCreated} typography variables and ${textStyles} text styles.`;
          figma.notify("\u2713 Design foundations generated");
          post({ type: "done", summary });
          break;
        }
        case "export": {
          const { filename, content } = exportTokens(msg.format, msg.config);
          post({ type: "export-result", format: msg.format, filename, content });
          break;
        }
        case "print-docs": {
          await printDocs(msg.config);
          figma.notify("\u2713 Documentation printed to canvas");
          post({ type: "done", summary: "Documentation frame added to the canvas." });
          break;
        }
        case "insert-svg": {
          const node = figma.createNodeFromSvg(msg.svg);
          node.x = figma.viewport.center.x - node.width / 2;
          node.y = figma.viewport.center.y - node.height / 2;
          figma.currentPage.appendChild(node);
          figma.currentPage.selection = [node];
          figma.viewport.scrollAndZoomIntoView([node]);
          figma.notify("\u2713 SVG inserted");
          post({ type: "done", summary: "AI illustration inserted." });
          break;
        }
        case "insert-text": {
          let loaded = { family: "Inter", style: "Regular" };
          try {
            await figma.loadFontAsync(loaded);
          } catch {
            loaded = { family: "Roboto", style: "Regular" };
            await figma.loadFontAsync(loaded);
          }
          const node = figma.createText();
          node.fontName = loaded;
          node.characters = msg.text;
          node.fontSize = 16;
          node.resize(420, node.height);
          node.textAutoResize = "HEIGHT";
          node.x = figma.viewport.center.x - 210;
          node.y = figma.viewport.center.y - node.height / 2;
          figma.currentPage.appendChild(node);
          figma.currentPage.selection = [node];
          figma.viewport.scrollAndZoomIntoView([node]);
          figma.notify("\u2713 Text inserted");
          post({ type: "done", summary: "AI text inserted." });
          break;
        }
        case "resize": {
          figma.ui.resize(msg.width, msg.height);
          break;
        }
        case "notify": {
          figma.notify(msg.message);
          break;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      figma.notify(`Error: ${message}`, { error: true });
      post({ type: "error", message });
    }
  };
})();
