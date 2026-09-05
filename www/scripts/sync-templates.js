#!/usr/bin/env node
/**
 * www/templates -> www/assets/js/data.js 동기화 스크립트
 * www가 SSOT: templates/_index.json을 생성하고 data.js 정합성을 검증
 * Usage: node www/scripts/sync-templates.js [--fix]
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";

const wwwDir = resolve(import.meta.dirname, "..");
const templatesDir = join(wwwDir, "templates");
const dataJsPath = join(wwwDir, "assets", "js", "data.js");
const indexPath = join(templatesDir, "_index.json");

function loadMeta(folder) {
  const p = join(templatesDir, folder, "metadata.json");
  if (!existsSync(p)) return null;
  try {
    const raw = readFileSync(p, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch { return null; }
}

const folders = readdirSync(templatesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .filter(n => n !== "node_modules");

const index = {
  version: 1,
  generatedAt: new Date().toISOString().slice(0,10),
  total: folders.length,
  categories: {},
  templates: []
};

const dataContentForId = readFileSync(dataJsPath, "utf-8");
const templatesKeysForId = [...dataContentForId.matchAll(/"([^"]+)":\s*\{\s*name:/g)].map(m=>m[1]);
const templatesSetForId = new Set(templatesKeysForId);

for (const folder of folders.sort()) {
  const meta = loadMeta(folder) || { id: folder, name: folder, category: "general" };
  let id = meta.id || folder;
  // www SSOT지만 data.js와의 호환을 위해 dl- prefix 매핑 유지
  if (templatesSetForId.has(`dl-${folder}`) && !templatesSetForId.has(folder)) id = `dl-${folder}`;
  else if (templatesSetForId.has(folder)) id = folder;
  else if (meta.id && templatesSetForId.has(meta.id)) id = meta.id;
  index.templates.push({
    id,
    folder,
    name: meta.name || folder,
    category: meta.category || "general",
    source: meta.source || "",
    description: meta.description || "",
    license: meta.license || "",
    framework: meta.framework || "",
    sourceUrl: meta.sourceUrl || "",
    tags: meta.tags || []
  });
  const cat = meta.category || "general";
  if (!index.categories[cat]) index.categories[cat] = [];
  index.categories[cat].push(id);
}

writeFileSync(indexPath, JSON.stringify(index, null, 2), "utf-8");
console.log(`✓ _index.json generated: ${folders.length} templates`);
console.log(index.categories);

// Validate data.js
const dataContent = readFileSync(dataJsPath, "utf-8");
const templatesInData = [...dataContent.matchAll(/"([^"]+)":\s*\{\s*name:/g)].map(m=>m[1]);
console.log(`\ndata.js TEMPLATES: ${templatesInData.length} keys`);
const missingInData = folders.filter(f => {
  const meta = loadMeta(f);
  const id = meta?.id || f;
  return !templatesInData.includes(id) && !templatesInData.includes(`dl-${id}`) && !templatesInData.includes(f);
});
if (missingInData.length) console.log(`⚠ Folders not in data.js TEMPLATES: ${missingInData.join(", ")}`);
else console.log("✓ All folders have TEMPLATES entry");

const orphans = templatesInData.filter(k => {
  if (k.startsWith("t-")) return false;
  const base = k.replace(/^dl-/, "");
  return !folders.includes(k) && !folders.includes(base) && !folders.map(f=>f.toLowerCase()).includes(k.toLowerCase()) && !folders.map(f=>f.toLowerCase()).includes(base.toLowerCase());
});
if (orphans.length) console.log(`⚠ TEMPLATES orphans (no folder): ${orphans.join(", ")}`);
else console.log("✓ No orphans");

console.log("\nDone. Run with --fix to auto-update data.js (not yet implemented).");
