#!/usr/bin/env node
// 中英成对文档的守卫。做法照 DSH 仓库的 verify-translation-pairing：
//   1) 结构签名：标题层级、围栏代码块原文、表格行列数、列表项数、链接目标——
//      两侧必须一致。代码块比的是原文，不是行数，命令写岔了会直接失败。
//   2) 分节哈希记录（README.i18n.yaml）：每节两侧各自的哈希。只改一侧、没重新
//      记录，校验就失败；--write 记录时若发现只有一侧变了，默认拒绝（说明另一侧
//      没跟上），确实不需要翻译时用 --force。
//
// 用法：
//   node scripts/i18n-pairing.mjs            校验
//   node scripts/i18n-pairing.mjs --write    重新记录（两侧都改过才行）
//   node scripts/i18n-pairing.mjs --force    强制记录（明确知道另一侧不用动）
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

export const PAIRS = [
  { en: "docs/README.en.md", zh: "README.md", record: "README.i18n.yaml" },
];

const read = (file) => fs.readFileSync(file, "utf8");

/** 把文档切成「标题前导 + 每节」，节键取英文标题的 slug 路径。 */
export function sections(markdown, { slugKey = true } = {}) {
  const lines = markdown.split("\n");
  const out = [];
  const stack = [];
  let current = { key: "/", lines: [] };
  let fence = null;
  for (const line of lines) {
    const fenceMatch = /^(\s*)(```+|~~~+)(.*)$/.exec(line);
    if (fenceMatch) {
      if (!fence) fence = { marker: fenceMatch[2][0], length: fenceMatch[2].length };
      else if (fenceMatch[2][0] === fence.marker && fenceMatch[2].length >= fence.length) fence = null;
    }
    const heading = !fence && /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (heading) {
      const depth = heading[1].length;
      stack.length = depth - 1;
      const slug = heading[2]
        .toLowerCase()
        .replace(/`/g, "")
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "");
      stack[depth - 1] = slug || "section";
      const key = slugKey ? `/${stack.filter(Boolean).join("/")}` : "/";
      out.push(current);
      current = { key, lines: [] };
      continue;
    }
    current.lines.push(line);
  }
  out.push(current);
  return out.filter((section) => section.lines.join("\n").trim() !== "" || section.key === "/");
}

/** 节内正文（去掉围栏代码块与语言切换器）的哈希：代码块另由签名逐字比对。 */
function sectionHash(lines, switcher = []) {
  const kept = [];
  let fence = null;
  for (const line of lines) {
    const m = /^(\s*)(```+|~~~+)(.*)$/.exec(line);
    if (m) {
      if (!fence) { fence = { marker: m[2][0], length: m[2].length }; continue; }
      if (m[2][0] === fence.marker && m[2].length >= fence.length) { fence = null; continue; }
    }
    if (fence) continue;
    // 语言切换器两侧必然互指，不参与哈希（按链接目标的文件名判断）。
    const targets = [...line.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => path.basename(m[1].replace(/[#?].*$/, "")));
    if (targets.some((name) => switcher.includes(name))) continue;
    kept.push(line);
  }
  const text = kept.join("\n").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/** 两侧必须一致的形状：标题、代码块原文、表格尺寸、列表项数、链接目标。 */
export function signature(markdown, { switcher = [] } = {}) {
  const lines = markdown.split("\n");
  const headings = [];
  const code = [];
  const tables = [];
  const lists = [];
  const links = [];
  let fence = null;
  let block = null;
  const flush = () => {
    if (!block) return;
    if (block.kind === "code") code.push(block.info + "\n" + block.body.join("\n"));
    if (block.kind === "table") {
      const cols = block.body[0]?.split("|").length ?? 0;
      tables.push(`${block.body.length}x${cols}`);
    }
    if (block.kind === "list") lists.push(block.body.length);
    block = null;
  };
  for (const line of lines) {
    const fenceMatch = /^(\s*)(```+|~~~+)(.*)$/.exec(line);
    if (fenceMatch) {
      if (!fence) {
        flush();
        fence = { marker: fenceMatch[2][0], length: fenceMatch[2].length };
        block = { kind: "code", info: fenceMatch[3].trim(), body: [] };
        continue;
      }
      if (fenceMatch[2][0] === fence.marker && fenceMatch[2].length >= fence.length) {
        flush();
        fence = null;
        continue;
      }
    }
    if (fence) { block.body.push(line); continue; }
    for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = m[1];
      // 成对文档互相指向对方的文件，链接目标天然不同：只比文件名。
      const name = /^https?:/i.test(target) ? target : path.basename(target.replace(/[#?].*$/, ""));
      // 语言切换器两侧必然互指，不算漂移。
      if (switcher.includes(name)) continue;
      links.push(name);
    }
    if (/^#{1,6}\s/.test(line)) {
      flush();
      headings.push(line.match(/^#+/)[0].length);
      continue;
    }
    if (/^\s*\|/.test(line)) {
      if (block?.kind !== "table") { flush(); block = { kind: "table", body: [] }; }
      block.body.push(line.trim());
      continue;
    }
    if (/^\s*[-*+]\s|^\s*\d+\.\s/.test(line)) {
      if (block?.kind !== "list") { flush(); block = { kind: "list", body: [] }; }
      block.body.push(line.trim());
      continue;
    }
    if (line.trim() === "") { flush(); continue; }
    flush();
  }
  flush();
  return { headings, code, tables, lists, links };
}

function diffSignatures(a, b, labelA, labelB) {
  const problems = [];
  const compare = (key, format = (v) => v) => {
    const left = a[key];
    const right = b[key];
    if (left.length !== right.length) {
      problems.push(`${labelA} 与 ${labelB} 的${key}数量不同：${left.length} vs ${right.length}`);
      return;
    }
    left.forEach((value, i) => {
      if (JSON.stringify(value) !== JSON.stringify(right[i])) {
        problems.push(`${labelA} 与 ${labelB} 第 ${i + 1} 个${key}不一致：${format(value)} ≠ ${format(right[i])}`);
      }
    });
  };
  compare("headings", (v) => `h${v}`);
  compare("code", (v) => JSON.stringify(v.slice(0, 60)));
  compare("tables", (v) => v);
  compare("lists", (v) => v);
  compare("links", (v) => v);
  return problems;
}

function parseRecord(text) {
  const record = new Map();
  let key = null;
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!line.startsWith(" ")) {
      key = line.replace(/:\s*$/, "").trim();
      record.set(key, {});
      continue;
    }
    const m = /^\s+(en|zh):\s*([0-9a-f]+)\s*$/.exec(line);
    if (m && key) record.get(key)[m[1]] = m[2];
  }
  return record;
}

function renderRecord(entries) {
  const lines = [
    "# 中英成对文档的一致性记录：每节两侧各自的哈希。",
    "# 改了一侧就把另一侧带上，然后 node scripts/i18n-pairing.mjs --write 重新记录。",
  ];
  for (const [key, { en, zh }] of entries) {
    lines.push(`${key}:`, `  en: ${en}`, `  zh: ${zh}`);
  }
  return lines.join("\n") + "\n";
}

/** 计算一对文档的当前记录（按英文侧分节，中文侧按顺序对齐）。 */
export function computeRecord(enText, zhText, switcher = []) {
  const enSections = sections(enText);
  const zhSections = sections(zhText);
  if (enSections.length !== zhSections.length) {
    return { error: `章节数不同：英文 ${enSections.length} 节，中文 ${zhSections.length} 节` };
  }
  const entries = new Map();
  enSections.forEach((section, i) => {
    const enHash = sectionHash(section.lines, switcher);
    const zhHash = sectionHash(zhSections[i].lines, switcher);
    if (!enHash && !zhHash) return;
    entries.set(section.key, { en: enHash, zh: zhHash });
  });
  return { entries, enSections, zhSections };
}

export function verifyPair(pair = PAIRS[0]) {
  const problems = [];
  const enText = read(pair.en);
  const zhText = read(pair.zh);
  const switcher = [path.basename(pair.en), path.basename(pair.zh)];
  const enSig = signature(enText, { switcher });
  const zhSig = signature(zhText, { switcher });
  problems.push(...diffSignatures(zhSig, enSig, pair.zh, pair.en));

  const computed = computeRecord(enText, zhText, switcher);
  if (computed.error) {
    problems.push(`${pair.zh} 与 ${pair.en} ${computed.error}`);
    return { problems, entries: new Map(), computed };
  }
  if (!fs.existsSync(pair.record)) {
    problems.push(`缺少 ${pair.record}：先跑 node scripts/i18n-pairing.mjs --write`);
    return { problems, entries: computed.entries, computed };
  }
  const recorded = parseRecord(read(pair.record));
  for (const [key, { en, zh }] of computed.entries) {
    const before = recorded.get(key);
    if (!before) { problems.push(`${pair.record} 缺少章节 ${key}`); continue; }
    if (before.en !== en && before.zh !== zh) problems.push(`章节 ${key} 两侧都改过但没重新记录`);
    else if (before.en !== en) problems.push(`章节 ${key} 只改了英文侧，中文侧没跟上`);
    else if (before.zh !== zh) problems.push(`章节 ${key} 只改了中文侧，英文侧没跟上`);
  }
  for (const key of recorded.keys()) if (!computed.entries.has(key)) problems.push(`${pair.record} 多出章节 ${key}`);
  return { problems, entries: computed.entries, recorded };
}

function main(argv) {
  const write = argv.includes("--write");
  const force = argv.includes("--force");
  const unknown = argv.filter((a) => !["--write", "--force"].includes(a));
  if (unknown.length) {
    console.error(`未知参数：${unknown.join(" ")}`);
    process.exit(2);
  }
  if (!write) {
    let failed = false;
    for (const pair of PAIRS) {
      const { problems } = verifyPair(pair);
      if (problems.length) {
        failed = true;
        console.error(`✗ ${pair.zh} ↔ ${pair.en}`);
        for (const p of problems) console.error("  - " + p);
      } else {
        console.log(`✓ ${pair.zh} ↔ ${pair.en} 一致`);
      }
    }
    process.exit(failed ? 1 : 0);
  }
  for (const pair of PAIRS) {
    const switcher = [path.basename(pair.en), path.basename(pair.zh)];
    const computed = computeRecord(read(pair.en), read(pair.zh), switcher);
    if (computed.error) {
      console.error(`✗ ${pair.zh} ↔ ${pair.en} ${computed.error}`);
      process.exit(1);
    }
    if (!force && fs.existsSync(pair.record)) {
      const recorded = parseRecord(read(pair.record));
      const oneSided = [];
      for (const [key, { en, zh }] of computed.entries) {
        const before = recorded.get(key);
        if (!before) continue;
        if (before.en !== en && before.zh === zh) oneSided.push(`${key}（只改英文）`);
        if (before.zh !== zh && before.en === en) oneSided.push(`${key}（只改中文）`);
      }
      if (oneSided.length) {
        console.error("✗ 这些章节只有一侧变了，另一侧没跟上：");
        for (const item of oneSided) console.error("  - " + item);
        console.error("  确实不需要翻译时用 --force。");
        process.exit(1);
      }
    }
    fs.writeFileSync(pair.record, renderRecord(computed.entries));
    console.log(`✓ 记录已更新：${pair.record}（${computed.entries.size} 节）`);
  }
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main(process.argv.slice(2));
