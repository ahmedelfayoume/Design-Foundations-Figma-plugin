import type { PluginMessage, UIMessage } from "./shared/types";
import { generateVariables } from "./plugin/variables";
import { generateTextStyles } from "./plugin/styles";
import { exportTokens } from "./plugin/export";
import { printDocs } from "./plugin/docs";

figma.showUI(__html__, { width: 460, height: 720, themeColors: true });

function post(msg: PluginMessage) {
  figma.ui.postMessage(msg);
}

figma.ui.onmessage = async (msg: UIMessage) => {
  try {
    switch (msg.type) {
      case "generate": {
        const result = await generateVariables(msg.config);
        const textStyles = await generateTextStyles(msg.config);
        const summary =
          `Created ${result.colorVarsCreated} color, ` +
          `${result.semanticVarsCreated} semantic, ` +
          `${result.spacingVarsCreated} spacing, ` +
          `${result.typographyVarsCreated} typography variables and ${textStyles} text styles.`;
        figma.notify("✓ Design foundations generated");
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
        figma.notify("✓ Documentation printed to canvas");
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
        figma.notify("✓ SVG inserted");
        post({ type: "done", summary: "AI illustration inserted." });
        break;
      }
      case "insert-text": {
        let loaded: FontName = { family: "Inter", style: "Regular" };
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
        figma.notify("✓ Text inserted");
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
