#!/usr/bin/env node
// Brand voice forbids em dashes. This script greps the source for them and
// fails loudly if any sneak in. Wire to CI later.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "lib"];
const EXTS = new Set([".ts", ".tsx", ".css", ".md"]);
const PATTERN = /—|—/; // U+2014 EM DASH (also matched literally for safety)

let violations = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXTS.has(extname(full))) continue;
    const content = readFileSync(full, "utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (PATTERN.test(line)) {
        violations++;
        console.error(`${full}:${i + 1}  ${line.trim()}`);
      }
    });
  }
}

for (const root of ROOTS) {
  try {
    walk(root);
  } catch {
    // Folder might not exist on a fresh clone; skip silently.
  }
}

if (violations > 0) {
  console.error(`\nFound ${violations} em dash(es). Brand voice forbids them. Replace with full stops, commas, or rewrite.`);
  process.exit(1);
} else {
  console.log("No em dashes found.");
}
