// AM Gym — Gemini proxy (Vercel Serverless Function).
// Keeps GEMINI_API_KEY server-side. The Figma plugin calls POST /api/gemini
// with { task, prompt } and gets back structured JSON.

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const INSTRUCTIONS = {
  palette:
    'You are a design-system color expert. Given a brand/mood description, produce ONE perceptually balanced 11-step color scale. Respond with JSON only: {"name": "<lowercase-single-word>", "shades": {"50": "#hex", "100": "#hex", "200": "#hex", "300": "#hex", "400": "#hex", "500": "#hex", "600": "#hex", "700": "#hex", "800": "#hex", "900": "#hex", "950": "#hex"}}. Lighter steps near 50, darkest near 950.',
  typography:
    'You are a typography expert. Produce a harmonious type scale. Respond with JSON only: {"typography": [{"name": "<kebab>", "label": "<Title Case>", "fontSize": <px>, "lineHeight": <px>, "fontWeight": <100-900>, "letterSpacing": <px>}]} with 7-11 entries from largest to smallest.',
  svg:
    'You are an SVG illustrator. Produce ONE clean, modern, 3D-looking vector illustration matching the prompt. No scripts, no external refs, no <image>. Use gradients/shapes only. Respond with JSON only: {"svg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 240 240\\">...</svg>"}.',
  text:
    'You are a senior product copywriter. Produce concise, useful UI/marketing copy for the request. Respond with JSON only: {"text": "<the content>"}.',
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function readBody(req) {
  if (req.body) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const task = body.task;
  const prompt = (body.prompt || "").toString().slice(0, 2000);
  const instruction = INSTRUCTIONS[task];
  if (!instruction) return res.status(400).json({ error: "Unknown task. Use palette|typography|svg|text." });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
  const payload = {
    contents: [{ role: "user", parts: [{ text: `${instruction}\n\nRequest: ${prompt}` }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.9 },
  };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: `Gemini error ${r.status}`, detail: t.slice(0, 500) });
    }
    const data = await r.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Model returned non-JSON — surface as plain text.
      return res.status(200).json({ raw, text: raw });
    }

    // Normalize into the shape the plugin expects.
    const out = { raw };
    if (task === "palette" && parsed.shades) out.palette = { name: parsed.name || "brand", shades: parsed.shades };
    else if (task === "typography" && parsed.typography) out.typography = parsed.typography;
    else if (task === "svg" && parsed.svg) out.svg = parsed.svg;
    else if (task === "text") out.text = parsed.text || raw;
    else Object.assign(out, parsed);

    return res.status(200).json(out);
  } catch (e) {
    return res.status(500).json({ error: "Request failed", detail: String(e).slice(0, 300) });
  }
};
