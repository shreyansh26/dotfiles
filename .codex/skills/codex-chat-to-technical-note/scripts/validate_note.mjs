#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const target = process.argv[2];

if (!target || process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node validate_note.mjs /absolute/path/to/note.md");
  process.exit(target ? 0 : 2);
}

const absolute = path.resolve(target);
if (!fs.existsSync(absolute)) {
  console.error(`ERROR: file does not exist: ${absolute}`);
  process.exit(2);
}

const source = fs.readFileSync(absolute, "utf8");
const lines = source.split(/\r?\n/);
const errors = [];
const warnings = [];
const headings = [];
const anchors = new Map();
const internalLinks = [];

let fence = null;
let inDisplayMath = false;
let mermaidBlocks = 0;
let codeBlocks = 0;
let tableRows = 0;
let inlineMathWarnings = 0;

function githubSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function addAnchor(base) {
  const count = anchors.get(base) ?? 0;
  anchors.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function countUnescapedDollars(text) {
  let count = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] !== "$") continue;
    let precedingBackslashes = 0;
    for (let j = i - 1; j >= 0 && text[j] === "\\"; j -= 1) {
      precedingBackslashes += 1;
    }
    if (precedingBackslashes % 2 === 0) count += 1;
  }
  return count;
}

for (let index = 0; index < lines.length; index += 1) {
  const lineNumber = index + 1;
  const line = lines[index];
  const fenceMatch = line.match(/^\s*(`{3,}|~{3,})(.*)$/);

  if (fenceMatch) {
    const marker = fenceMatch[1][0];
    const length = fenceMatch[1].length;
    const info = fenceMatch[2].trim().toLowerCase();

    if (fence === null) {
      fence = { marker, length, lineNumber, info };
      codeBlocks += 1;
      if (info.split(/\s+/)[0] === "mermaid") mermaidBlocks += 1;
    } else if (fence.marker === marker && length >= fence.length) {
      fence = null;
    }
    continue;
  }

  if (fence !== null) continue;

  if (/^\s*\\\(|\\\)|\\\[|\\\]\s*$/.test(line) || /\\\(|\\\)|\\\[|\\\]/.test(line)) {
    warnings.push(
      `line ${lineNumber}: use $...$ or $$...$$ instead of \\\\(...\\\\) or \\\\[...\\\\] for portability`,
    );
  }

  if (line.trim() === "$$") {
    inDisplayMath = !inDisplayMath;
    continue;
  }

  if (!inDisplayMath) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const base = githubSlug(text);
      const anchor = addAnchor(base);
      headings.push({ level, text, anchor, lineNumber });
    }

    for (const match of line.matchAll(/\[[^\]]+\]\(#([^)]+)\)/g)) {
      internalLinks.push({ anchor: decodeURIComponent(match[1]), lineNumber });
    }

    if (/^\s*\|.*\|\s*$/.test(line)) tableRows += 1;

    const dollars = countUnescapedDollars(line);
    if (dollars % 2 !== 0) {
      inlineMathWarnings += 1;
      warnings.push(`line ${lineNumber}: odd number of unescaped $ delimiters`);
    }
  }
}

if (fence !== null) {
  errors.push(`unclosed code fence opened at line ${fence.lineNumber}`);
}

if (inDisplayMath) {
  errors.push("unclosed display-math block ($$)");
}

const h1s = headings.filter((heading) => heading.level === 1);
if (h1s.length === 0) errors.push("missing H1 title");
if (h1s.length > 1) {
  errors.push(`expected one H1 title, found ${h1s.length}`);
}

for (let i = 1; i < headings.length; i += 1) {
  const previous = headings[i - 1];
  const current = headings[i];
  if (current.level > previous.level + 1) {
    warnings.push(
      `line ${current.lineNumber}: heading jumps from H${previous.level} to H${current.level}`,
    );
  }
}

const realizedAnchors = new Set(headings.map((heading) => heading.anchor));
for (const link of internalLinks) {
  if (!realizedAnchors.has(link.anchor)) {
    warnings.push(
      `line ${link.lineNumber}: internal link target #${link.anchor} was not found by the validator's GitHub-style slug approximation`,
    );
  }
}

if (headings.length < 4) {
  warnings.push("note has fewer than four headings; confirm that the treatment is sufficiently structured");
}

if (codeBlocks === 0) {
  warnings.push("note has no fenced code or pseudocode blocks");
}

if (!/\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(source)) {
  warnings.push("note has no direct HTTP(S) source links");
}

if (lines[0]?.trim() === "---") {
  warnings.push("note starts with YAML/Jekyll front matter; omit it unless explicitly requested");
}

console.log(`Validated: ${absolute}`);
console.log(
  `Summary: ${lines.length} lines, ${headings.length} headings, ${codeBlocks} code blocks, ${mermaidBlocks} Mermaid blocks, ${tableRows} table rows`,
);

if (errors.length > 0) {
  console.log("\nErrors:");
  for (const error of errors) console.log(`- ${error}`);
}

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("\nOK: no structural portability issues found.");
} else if (errors.length === 0) {
  console.log(`\nOK with ${warnings.length} warning(s); review warnings manually.`);
}

process.exit(errors.length > 0 ? 1 : 0);
