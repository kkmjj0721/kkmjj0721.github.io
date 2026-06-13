#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { exitWithError, parseArgs, toBoolean } from "./_content-tools.mjs";

const usage = `Usage:
  npm run check:images -- [--root src,public] [--allow-placeholders]

Options:
  --root                 Comma-separated roots to scan. Defaults to src,public.
  --allow-placeholders   Report findings but exit 0.`;

const args = parseArgs();
const roots = String(args.root || "src,public")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)
  .map((item) => path.resolve(process.cwd(), item));
const allowPlaceholders = toBoolean(args["allow-placeholders"], false);
const ignoredDirs = new Set(["node_modules", "dist", ".astro", ".git"]);
const textExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const patterns = [/TODO\(image\)/, /\.placeholder\./];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (
      entry.isFile() &&
      textExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

try {
  const missingRoots = roots.filter((root) => !existsSync(root));
  if (missingRoots.length > 0) {
    exitWithError(
      `Scan root does not exist: ${missingRoots
        .map((root) => path.relative(process.cwd(), root))
        .join(", ")}`,
      usage,
    );
    process.exit();
  }

  const files = (await Promise.all(roots.map((root) => walk(root)))).flat();
  const findings = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (patterns.some((pattern) => pattern.test(line))) {
        findings.push({
          file: path.relative(process.cwd(), file),
          line: index + 1,
          text: line.trim(),
        });
      }
    });
  }

  if (findings.length === 0) {
    console.log(
      "No TODO(image) markers or placeholder image references found.",
    );
    process.exit();
  }

  for (const finding of findings) {
    console.log(`${finding.file}:${finding.line}: ${finding.text}`);
  }

  console.log(
    `Found ${findings.length} unresolved image placeholder marker(s).`,
  );
  if (!allowPlaceholders) {
    process.exitCode = 1;
  }
} catch (error) {
  exitWithError(error.message, usage);
}
