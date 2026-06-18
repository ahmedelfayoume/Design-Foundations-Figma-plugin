import type { GenerateConfig } from "../shared/types";
import { resolveLibrary, getScale, scaleSteps, nearestStep, buildSemanticTokens } from "../data";
import { hexToRgba } from "./color";

/** Result of a generation run, used for the summary + docs. */
export interface GenerateResult {
  colorVarsCreated: number;
  semanticVarsCreated: number;
  spacingVarsCreated: number;
  typographyVarsCreated: number;
  /** name -> Variable for base color variables (used by semantic aliases + docs). */
  colorVars: Map<string, Variable>;
}

async function findOrCreateCollection(name: string): Promise<VariableCollection> {
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  const found = existing.find((c) => c.name === name);
  if (found) return found;
  return figma.variables.createVariableCollection(name);
}

async function localVariablesIn(collection: VariableCollection): Promise<Variable[]> {
  const all = await figma.variables.getLocalVariablesAsync();
  return all.filter((v) => v.variableCollectionId === collection.id);
}

/** Ensure the collection has exactly the requested named modes; returns name->modeId. */
function ensureModes(collection: VariableCollection, modeNames: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  // Rename the default first mode to the first requested name.
  collection.renameMode(collection.modes[0].modeId, modeNames[0]);
  map[modeNames[0]] = collection.modes[0].modeId;
  for (let i = 1; i < modeNames.length; i++) {
    const existing = collection.modes.find((m) => m.name === modeNames[i]);
    map[modeNames[i]] = existing ? existing.modeId : collection.addMode(modeNames[i]);
  }
  return map;
}

async function findOrCreateVar(
  name: string,
  collection: VariableCollection,
  type: VariableResolvedDataType,
  existing: Variable[],
): Promise<{ variable: Variable; created: boolean }> {
  const found = existing.find((v) => v.name === name && v.resolvedType === type);
  if (found) return { variable: found, created: false };
  return { variable: figma.variables.createVariable(name, collection, type), created: true };
}

export async function generateVariables(config: GenerateConfig): Promise<GenerateResult> {
  const lib = resolveLibrary(config);
  const result: GenerateResult = {
    colorVarsCreated: 0,
    semanticVarsCreated: 0,
    spacingVarsCreated: 0,
    typographyVarsCreated: 0,
    colorVars: new Map(),
  };

  const modeNames = config.modes.map((m) => (m === "light" ? "Light" : "Dark"));

  // ---- 1) Base color scales ----
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
      // Base palette colors are mode-independent: same value in every mode.
      for (const modeId of Object.values(colorModes)) {
        variable.setValueForMode(modeId, rgba);
      }
      result.colorVars.set(`${scaleName}/${step}`, variable);
    }
  }

  // ---- 2) Semantic / alias tokens ----
  if (config.includeSemantic) {
    const tokens = config.semantic.length
      ? config.semantic
      : buildSemanticTokens(config.primaryScale, config.selectedScales);

    const tokenCollection = await findOrCreateCollection("Semantic Tokens");
    const tokenModes = ensureModes(tokenCollection, modeNames);
    const tokenExisting = await localVariablesIn(tokenCollection);

    for (const token of tokens) {
      const { variable, created } = await findOrCreateVar(token.name, tokenCollection, "COLOR", tokenExisting);
      if (created) {
        tokenExisting.push(variable);
        result.semanticVarsCreated++;
      }

      const setAlias = (modeKey: "light" | "dark", modeId: string) => {
        const ref = token[modeKey];
        const scale = getScale(lib, ref.scale);
        if (!scale) return;
        const step = nearestStep(scaleSteps(scale), ref.step);
        const base = result.colorVars.get(`${ref.scale}/${step}`);
        if (base) {
          variable.setValueForMode(modeId, figma.variables.createVariableAlias(base));
        } else {
          // Base not selected — fall back to a raw color so the token still resolves.
          variable.setValueForMode(modeId, hexToRgba(scale.shades[step]));
        }
      };

      if (colorModes["Light"] && tokenModes["Light"]) setAlias("light", tokenModes["Light"]);
      if (tokenModes["Dark"]) setAlias("dark", tokenModes["Dark"]);
      else if (tokenModes["Light"] && !colorModes["Light"]) setAlias("light", tokenModes["Light"]);
    }
  }

  // ---- 3) Spacing + radius ----
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

  // ---- 4) Typography numeric tokens ----
  if (config.includeTypography && config.typography.length) {
    const typeCollection = await findOrCreateCollection("Typography");
    ensureModes(typeCollection, ["Value"]);
    const modeId = typeCollection.modes[0].modeId;
    const existing = await localVariablesIn(typeCollection);
    for (const t of config.typography) {
      const fields: Array<[string, number]> = [
        [`${t.name}/font-size`, t.fontSize],
        [`${t.name}/line-height`, t.lineHeight],
        [`${t.name}/font-weight`, t.fontWeight],
        [`${t.name}/letter-spacing`, t.letterSpacing],
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
