# AM Gym — Design Foundations (Figma Plugin)

Create your design-system foundations — **variables, styles and tokens** — in a few
clicks, the way [Kigen](https://kigen.design/) does, plus an **AI assistant** powered
by Google Gemini for generating palettes, content, SVG art and type scales.

## ✨ Features

- **Color palettes** from top design systems — Tailwind CSS & Material Design (more to come).
- **Light & Dark modes** — base scales generated as Figma Variables with both modes.
- **Predefined variables** — sensible, customizable defaults to kickstart a system.
- **Semantic / alias tokens** — Success, Error, Warning, Info, Surface, Text, Border… created as **aliases** of your base colors, per mode.
- **Typography tokens & text styles** — a modular type scale tokenized as variables + real Figma text styles.
- **Spacing & size variables** — a 4px spacing scale plus radius tokens.
- **Export** — download all tokens as **CSS**, **JS** or **JSON** (W3C design-tokens style) for developer handoff.
- **Print docs** — generate a documentation frame on the canvas with swatches, tokens and type samples.
- **AI (Gemini)** — generate a color palette from a brand brief, draft UI/marketing copy, create a 3D-style SVG illustration, or suggest a typography scale. The API key stays on your Vercel backend.

---

## 🏗️ Architecture

```
am-gym/
├── manifest.json         # Figma plugin manifest (update networkAccess with your Vercel URL)
├── build.mjs             # esbuild → dist/code.js (sandbox) + dist/ui.html (UI iframe)
├── src/
│   ├── code.ts           # plugin main thread (Figma API: variables, styles, docs)
│   ├── shared/types.ts   # message + token types shared by both bundles
│   ├── data/             # palettes (tailwind, material), typography, spacing, semantic
│   ├── plugin/           # variables, styles, export, docs, color helpers
│   └── ui/               # Preact UI (tabs, AI panel, export)
└── api/gemini.js         # Vercel serverless function — Gemini proxy (holds the API key)
```

The plugin runs **inside Figma**. The optional Gemini features call a small backend on
**Vercel** so your API key is never shipped in the plugin.

---

## 🚀 Quick start (build & run in Figma)

```bash
npm install
npm run build      # outputs dist/code.js and dist/ui.html
```

Then in Figma desktop: **Menu → Plugins → Development → Import plugin from manifest…**
and pick this repo's `manifest.json`. Run **AM Gym — Design Foundations** from
Plugins → Development.

For live development:

```bash
npm run watch
```

### بالعربي — تشغيل سريع

1. `npm install` ثم `npm run build`.
2. في Figma Desktop: **Plugins → Development → Import plugin from manifest…** واختَر `manifest.json`.
3. شغّل الإضافة، اختار اللوحة (Tailwind/Material)، حدّد الـ scales، فعّل الـ light/dark، واضغط **Generate foundations**.
4. للتصدير: تبويب **Export** ← CSS/JS/JSON. للتوثيق: زر **Print docs**.

---

## 🤖 AI backend on Vercel (optional)

The AI tab needs a backend that holds your Gemini key.

1. Get a key from <https://aistudio.google.com/app/apikey>.
2. Deploy this repo to Vercel (it auto-detects `api/gemini.js`).
3. In Vercel **Settings → Environment Variables**, add:
   - `GEMINI_API_KEY` = your key
   - `GEMINI_MODEL` = `gemini-2.0-flash` (optional)
4. Copy your deployment URL (e.g. `https://am-gym.vercel.app`) and:
   - Put it in the **Backend URL** field of the plugin's **AI** tab, and
   - Add it to `manifest.json` → `networkAccess.allowedDomains`, then `npm run build` and re-import.

The endpoint is `POST /api/gemini` with body `{ "task": "palette" | "text" | "svg" | "typography", "prompt": "..." }`.

### بالعربي — الـ AI

المفتاح بيتخزن على Vercel (مش في الإضافة). بعد ما ترفع المشروع على Vercel وتضيف
`GEMINI_API_KEY`، حُط رابط الموقع في خانة **Backend URL** جوه تبويب AI، وكمان في
`manifest.json` تحت `allowedDomains`.

---

## 📦 Export formats

- `tokens.css` — CSS custom properties (`:root` + `[data-theme="dark"]`).
- `tokens.js` — a typed `tokens` object.
- `tokens.json` — W3C-style design tokens (`$value` / `$type`).

## 🛠️ Scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Bundle the plugin to `dist/` |
| `npm run watch` | Rebuild on change |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## License

MIT
