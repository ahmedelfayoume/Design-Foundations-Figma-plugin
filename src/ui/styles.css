:root {
  --bg: var(--figma-color-bg, #ffffff);
  --bg-secondary: var(--figma-color-bg-secondary, #f5f5f5);
  --text: var(--figma-color-text, #1e1e1e);
  --text-secondary: var(--figma-color-text-secondary, #6b7280);
  --border: var(--figma-color-border, #e6e6e6);
  --brand: #6366f1;
  --brand-hover: #4f46e5;
  --radius: 8px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 12px;
  color: var(--text);
  background: var(--bg);
}

#root { display: flex; flex-direction: column; height: 100vh; }

.tabs {
  display: flex;
  gap: 2px;
  padding: 8px 12px 0;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.tab {
  padding: 8px 12px;
  border: none;
  background: none;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}
.tab.active { color: var(--brand); border-bottom-color: var(--brand); }

.panel { flex: 1; overflow-y: auto; padding: 16px; }

.footer {
  border-top: 1px solid var(--border);
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
}

h3 { margin: 0 0 4px; font-size: 13px; }
.muted { color: var(--text-secondary); font-size: 11px; margin: 0 0 12px; }

.btn {
  border: none;
  border-radius: var(--radius);
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: var(--bg-secondary);
  color: var(--text);
}
.btn:hover { filter: brightness(0.97); }
.btn-primary { background: var(--brand); color: #fff; flex: 1; }
.btn-primary:hover { background: var(--brand-hover); }
.btn-sm { padding: 6px 10px; font-size: 11px; }

.row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.spacer { flex: 1; }

.field { margin-bottom: 12px; }
label.field-label { display: block; font-weight: 500; margin-bottom: 6px; }

select, input[type="text"], input[type="number"], textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  font-family: inherit;
}
textarea { resize: vertical; min-height: 64px; }

.scale-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
.scale-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}
.scale-chip.selected { border-color: var(--brand); background: color-mix(in srgb, var(--brand) 8%, transparent); }
.scale-chip .swatch-strip { display: flex; border-radius: 4px; overflow: hidden; width: 44px; height: 18px; }
.scale-chip .swatch-strip span { flex: 1; }
.scale-chip .name { font-size: 11px; }
.scale-chip .star { margin-left: auto; opacity: 0.4; }
.scale-chip .star.on { opacity: 1; color: #f59e0b; }

.toggle { display: flex; align-items: center; gap: 8px; padding: 8px 0; cursor: pointer; }
.toggle input { width: auto; }

.token-row { display: grid; grid-template-columns: 1fr 56px 56px 56px; gap: 6px; align-items: center; margin-bottom: 6px; }
.token-row .tname { font-size: 11px; }

.modes { display: flex; gap: 8px; }
.mode-chip { padding: 6px 12px; border: 1px solid var(--border); border-radius: 6px; cursor: pointer; }
.mode-chip.on { border-color: var(--brand); color: var(--brand); font-weight: 600; }

.export-out { width: 100%; min-height: 200px; font-family: ui-monospace, Menlo, monospace; font-size: 11px; }

.ai-result { margin-top: 12px; padding: 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg-secondary); }
.ai-swatches { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
.ai-swatches span { width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--border); }

.banner { font-size: 11px; padding: 8px 10px; border-radius: 6px; background: color-mix(in srgb, var(--brand) 10%, transparent); margin-bottom: 12px; }
.status { font-size: 11px; color: var(--text-secondary); }
.error { color: #dc2626; }
