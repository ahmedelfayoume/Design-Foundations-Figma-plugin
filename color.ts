import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import type {
  ColorScale,
  ExportFormat,
  GenerateConfig,
  Mode,
  PluginMessage,
  UIMessage,
} from "../shared/types";
import {
  libraries,
  getLibrary,
  defaultTypography,
  defaultSpacing,
  defaultRadius,
} from "../data";
import {
  callGemini,
  getBackendUrl,
  setBackendUrl,
  paletteToScale,
  type GeminiTask,
} from "./gemini";

function send(msg: UIMessage) {
  parent.postMessage({ pluginMessage: msg }, "*");
}

const TABS = ["Colors", "Tokens", "Type", "Spacing", "AI", "Export"] as const;
type Tab = (typeof TABS)[number];

function App() {
  const [tab, setTab] = useState<Tab>("Colors");
  const [libraryId, setLibraryId] = useState(libraries[0].id);
  const [selectedScales, setSelectedScales] = useState<string[]>(["slate", "blue", "red", "green", "amber"]);
  const [primaryScale, setPrimaryScale] = useState("blue");
  const [modes, setModes] = useState<Mode[]>(["light", "dark"]);
  const [includeSemantic, setSemantic] = useState(true);
  const [includeTypography, setTypography] = useState(true);
  const [includeSpacing, setSpacing] = useState(true);
  const [includeTextStyles, setTextStyles] = useState(true);
  const [aiScales, setAiScales] = useState<ColorScale[]>([]);
  const [status, setStatus] = useState("");
  const [statusErr, setStatusErr] = useState(false);
  const [exportOut, setExportOut] = useState<{ filename: string; content: string } | null>(null);

  const lib = getLibrary(libraryId);
  const allScales = useMemo(() => [...lib.scales, ...aiScales], [lib, aiScales]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const msg = e.data.pluginMessage as PluginMessage | undefined;
      if (!msg) return;
      if (msg.type === "done") {
        setStatus(msg.summary);
        setStatusErr(false);
      } else if (msg.type === "error") {
        setStatus(msg.message);
        setStatusErr(true);
      } else if (msg.type === "export-result") {
        setExportOut({ filename: msg.filename, content: msg.content });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function buildConfig(): GenerateConfig {
    return {
      libraryId,
      selectedScales,
      extraScales: aiScales,
      primaryScale,
      modes,
      includeSemantic,
      includeTypography,
      includeSpacing,
      includeTextStyles,
      typography: defaultTypography,
      spacing: [...defaultSpacing, ...defaultRadius],
      semantic: [],
    };
  }

  function toggleScale(name: string) {
    setSelectedScales((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  }

  function generate() {
    setStatus("Generating…");
    send({ type: "generate", config: buildConfig() });
  }

  return (
    <>
      <div class="tabs">
        {TABS.map((t) => (
          <button class={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div class="panel">
        {tab === "Colors" && (
          <ColorsTab
            lib={lib}
            allScales={allScales}
            libraryId={libraryId}
            setLibraryId={setLibraryId}
            selectedScales={selectedScales}
            toggleScale={toggleScale}
            primaryScale={primaryScale}
            setPrimaryScale={setPrimaryScale}
            modes={modes}
            setModes={setModes}
          />
        )}
        {tab === "Tokens" && (
          <TokensTab includeSemantic={includeSemantic} setSemantic={setSemantic} />
        )}
        {tab === "Type" && (
          <TypeTab includeTypography={includeTypography} setTypography={setTypography} includeTextStyles={includeTextStyles} setTextStyles={setTextStyles} />
        )}
        {tab === "Spacing" && (
          <SpacingTab includeSpacing={includeSpacing} setSpacing={setSpacing} />
        )}
        {tab === "AI" && (
          <AITab onPalette={(p) => { setAiScales((prev) => [...prev.filter((s) => s.name !== p.name), p]); setSelectedScales((prev) => prev.includes(p.name) ? prev : [...prev, p.name]); setStatus(`AI palette "${p.label}" added — switch to Colors to see it.`); }} />
        )}
        {tab === "Export" && (
          <ExportTab buildConfig={buildConfig} exportOut={exportOut} />
        )}
      </div>

      <div class="footer">
        <button class="btn btn-sm" onClick={() => send({ type: "print-docs", config: buildConfig() })}>
          Print docs
        </button>
        <span class="spacer" />
        <button class="btn btn-primary" onClick={generate}>
          Generate foundations
        </button>
      </div>
      {status && <div class={`status ${statusErr ? "error" : ""}`} style="padding:0 16px 10px">{status}</div>}
    </>
  );
}

function ModeChips({ modes, setModes }: { modes: Mode[]; setModes: (m: Mode[]) => void }) {
  function toggle(m: Mode) {
    if (modes.includes(m)) {
      const next = modes.filter((x) => x !== m);
      setModes(next.length ? next : [m]); // keep at least one mode active
    } else {
      setModes([...modes, m]);
    }
  }
  return (
    <div class="modes">
      {(["light", "dark"] as Mode[]).map((m) => (
        <div class={`mode-chip ${modes.includes(m) ? "on" : ""}`} onClick={() => toggle(m)}>
          {m === "light" ? "☀︎ Light" : "☾ Dark"}
        </div>
      ))}
    </div>
  );
}

function ColorsTab(props: {
  lib: ReturnType<typeof getLibrary>;
  allScales: ColorScale[];
  libraryId: string;
  setLibraryId: (id: string) => void;
  selectedScales: string[];
  toggleScale: (n: string) => void;
  primaryScale: string;
  setPrimaryScale: (n: string) => void;
  modes: Mode[];
  setModes: (m: Mode[]) => void;
}) {
  return (
    <div>
      <h3>Color library</h3>
      <p class="muted">Ready-to-use palettes from top design systems.</p>
      <div class="field">
        <select value={props.libraryId} onChange={(e) => props.setLibraryId((e.target as HTMLSelectElement).value)}>
          {libraries.map((l) => (
            <option value={l.id}>{l.label}</option>
          ))}
        </select>
      </div>

      <div class="field">
        <label class="field-label">Modes</label>
        <ModeChips modes={props.modes} setModes={props.setModes} />
      </div>

      <label class="field-label">Scales — click to select, star = primary</label>
      <div class="scale-grid">
        {props.allScales.map((scale) => {
          const selected = props.selectedScales.includes(scale.name);
          const steps = Object.keys(scale.shades).sort((a, b) => Number(a) - Number(b));
          const strip = [steps[1], steps[Math.floor(steps.length / 2)], steps[steps.length - 2]].filter(Boolean);
          return (
            <div class={`scale-chip ${selected ? "selected" : ""}`} onClick={() => props.toggleScale(scale.name)}>
              <div class="swatch-strip">
                {strip.map((s) => (
                  <span style={`background:${scale.shades[s]}`} />
                ))}
              </div>
              <span class="name">{scale.label}</span>
              <span
                class={`star ${props.primaryScale === scale.name ? "on" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  props.setPrimaryScale(scale.name);
                }}
              >
                ★
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TokensTab({ includeSemantic, setSemantic }: { includeSemantic: boolean; setSemantic: (v: boolean) => void }) {
  const names = ["Primary", "Success", "Error", "Warning", "Info", "Background", "Surface", "Border", "Text", "Text Muted"];
  return (
    <div>
      <h3>Semantic / alias tokens</h3>
      <p class="muted">Accessible, consistent meaning across light & dark — aliased to your base colors.</p>
      <label class="toggle">
        <input type="checkbox" checked={includeSemantic} onChange={(e) => setSemantic((e.target as HTMLInputElement).checked)} />
        Generate semantic tokens collection
      </label>
      <div class="banner">These resolve to aliases of your selected scales, so updating a base color updates the whole system.</div>
      <div class="row">
        {names.map((n) => (
          <span class="btn btn-sm">{n}</span>
        ))}
      </div>
    </div>
  );
}

function TypeTab(props: { includeTypography: boolean; setTypography: (v: boolean) => void; includeTextStyles: boolean; setTextStyles: (v: boolean) => void }) {
  return (
    <div>
      <h3>Typography</h3>
      <p class="muted">A tokenized modular scale + matching Figma text styles.</p>
      <label class="toggle">
        <input type="checkbox" checked={props.includeTypography} onChange={(e) => props.setTypography((e.target as HTMLInputElement).checked)} />
        Generate typography variables
      </label>
      <label class="toggle">
        <input type="checkbox" checked={props.includeTextStyles} onChange={(e) => props.setTextStyles((e.target as HTMLInputElement).checked)} />
        Generate Figma text styles
      </label>
      <div class="field" style="margin-top:12px">
        {defaultTypography.map((t) => (
          <div class="token-row">
            <span class="tname">{t.label}</span>
            <span class="tname">{t.fontSize}px</span>
            <span class="tname">{t.lineHeight}px</span>
            <span class="tname">{t.fontWeight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingTab({ includeSpacing, setSpacing }: { includeSpacing: boolean; setSpacing: (v: boolean) => void }) {
  return (
    <div>
      <h3>Spacing & size</h3>
      <p class="muted">A 4px base scale plus radius tokens for consistent layout.</p>
      <label class="toggle">
        <input type="checkbox" checked={includeSpacing} onChange={(e) => setSpacing((e.target as HTMLInputElement).checked)} />
        Generate spacing & size variables
      </label>
      <div class="row" style="margin-top:8px">
        {[...defaultSpacing, ...defaultRadius].map((s) => (
          <span class="btn btn-sm">{s.name}: {s.value}</span>
        ))}
      </div>
    </div>
  );
}

function AITab({ onPalette }: { onPalette: (p: ColorScale) => void }) {
  const [task, setTask] = useState<GeminiTask>("palette");
  const [prompt, setPrompt] = useState("A calm, trustworthy fintech brand");
  const [backend, setBackend] = useState(getBackendUrl());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ kind: GeminiTask; data: any } | null>(null);
  const [err, setErr] = useState("");

  async function run() {
    setErr("");
    setLoading(true);
    setResult(null);
    setBackendUrl(backend);
    try {
      const res = await callGemini(task, prompt);
      if (task === "palette" && res.palette) {
        const scale = paletteToScale(res.palette);
        setResult({ kind: "palette", data: scale });
      } else if (task === "typography" && res.typography) {
        setResult({ kind: "typography", data: res.typography });
      } else if (task === "svg" && res.svg) {
        setResult({ kind: "svg", data: res.svg });
      } else {
        setResult({ kind: "text", data: res.text ?? res.raw ?? "(empty response)" });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>AI assistant (Gemini)</h3>
      <p class="muted">Generate palettes, content, SVG art or type scales. The API key stays on your Vercel backend.</p>

      <div class="field">
        <label class="field-label">Backend URL</label>
        <input type="text" value={backend} onInput={(e) => setBackend((e.target as HTMLInputElement).value)} placeholder="https://am-gym.vercel.app" />
      </div>
      <div class="field">
        <label class="field-label">Task</label>
        <select value={task} onChange={(e) => setTask((e.target as HTMLSelectElement).value as GeminiTask)}>
          <option value="palette">Color palette</option>
          <option value="text">Text / content</option>
          <option value="svg">SVG illustration (3D-style)</option>
          <option value="typography">Typography scale</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label">Prompt</label>
        <textarea value={prompt} onInput={(e) => setPrompt((e.target as HTMLTextAreaElement).value)} />
      </div>
      <button class="btn btn-primary" style="flex:none" disabled={loading} onClick={run}>
        {loading ? "Thinking…" : "Generate with AI"}
      </button>

      {err && <div class="status error" style="margin-top:10px">{err}</div>}

      {result?.kind === "palette" && (
        <div class="ai-result">
          <strong>{(result.data as ColorScale).label}</strong>
          <div class="ai-swatches">
            {Object.entries((result.data as ColorScale).shades).map(([, hex]) => (
              <span style={`background:${hex}`} title={hex} />
            ))}
          </div>
          <button class="btn btn-sm" style="margin-top:8px" onClick={() => onPalette(result.data as ColorScale)}>
            Add to my colors
          </button>
        </div>
      )}
      {result?.kind === "text" && (
        <div class="ai-result">
          <div style="white-space:pre-wrap">{result.data as string}</div>
          <button class="btn btn-sm" style="margin-top:8px" onClick={() => send({ type: "insert-text", text: result.data as string })}>
            Insert into canvas
          </button>
        </div>
      )}
      {result?.kind === "svg" && (
        <div class="ai-result">
          <div dangerouslySetInnerHTML={{ __html: result.data as string }} />
          <button class="btn btn-sm" style="margin-top:8px" onClick={() => send({ type: "insert-svg", svg: result.data as string })}>
            Insert into canvas
          </button>
        </div>
      )}
      {result?.kind === "typography" && (
        <div class="ai-result">
          {(result.data as any[]).map((t) => (
            <div class="token-row">
              <span class="tname">{t.label ?? t.name}</span>
              <span class="tname">{t.fontSize}px</span>
              <span class="tname">{t.lineHeight}px</span>
              <span class="tname">{t.fontWeight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExportTab({ buildConfig, exportOut }: { buildConfig: () => GenerateConfig; exportOut: { filename: string; content: string } | null }) {
  function exportAs(format: ExportFormat) {
    send({ type: "export", format, config: buildConfig() });
  }
  function download() {
    if (!exportOut) return;
    const blob = new Blob([exportOut.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportOut.filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div>
      <h3>Export & documentation</h3>
      <p class="muted">Share variables and styles with developers as CSS, JS or JSON.</p>
      <div class="row">
        <button class="btn btn-sm" onClick={() => exportAs("css")}>CSS</button>
        <button class="btn btn-sm" onClick={() => exportAs("js")}>JS</button>
        <button class="btn btn-sm" onClick={() => exportAs("json")}>JSON</button>
      </div>
      {exportOut && (
        <div style="margin-top:12px">
          <div class="row">
            <strong>{exportOut.filename}</strong>
            <span class="spacer" />
            <button class="btn btn-sm" onClick={download}>Download</button>
          </div>
          <textarea class="export-out" readOnly value={exportOut.content} />
        </div>
      )}
    </div>
  );
}

render(<App />, document.getElementById("root")!);
