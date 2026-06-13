#!/usr/bin/env node
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { exitWithError, parseArgs, toBoolean } from "./_content-tools.mjs";

const usage = `Usage:
  npm run compress -- [--input public/images] [--output public/images/optimized]

Options:
  --input      Source image directory. Defaults to public/images.
  --output     Output directory. Defaults to public/images/optimized.
  --sizes      Comma-separated widths. Defaults to 480,960,1600.
  --quality    WebP quality 1-100. Defaults to 82.
  --force      Overwrite existing generated files.`;

const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const args = parseArgs();
const inputDir = path.resolve(process.cwd(), args.input || "public/images");
const outputDir = path.resolve(
  process.cwd(),
  args.output || "public/images/optimized",
);
const sizes = String(args.sizes || "480,960,1600")
  .split(",")
  .map((item) => Number.parseInt(item.trim(), 10))
  .filter((item) => Number.isFinite(item) && item > 0);
const quality = Number.parseInt(args.quality || "82", 10);
const force = toBoolean(args.force, false);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (fullPath.startsWith(outputDir)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (
      entry.isFile() &&
      imageExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

try {
  if (!existsSync(inputDir)) {
    console.log(
      `No input directory found: ${path.relative(process.cwd(), inputDir)}`,
    );
    process.exit();
  }

  if (sizes.length === 0) {
    exitWithError("At least one valid --sizes width is required.", usage);
    process.exit();
  }

  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    exitWithError("Invalid --quality. Use an integer from 1 to 100.", usage);
    process.exit();
  }

  const files = await walk(inputDir);

  if (files.length === 0) {
    console.log("No raster images found to compress.");
    process.exit();
  }

  let written = 0;
  let skipped = 0;

  for (const file of files) {
    const relative = path.relative(inputDir, file);
    const outputSubdir = path.join(outputDir, path.dirname(relative));
    const parsed = path.parse(relative);
    const metadata = await sharp(file).metadata();
    const sourceWidth = metadata.width || Math.max(...sizes);
    const targetWidths = [
      ...new Set(sizes.map((size) => Math.min(size, sourceWidth))),
    ].sort((a, b) => a - b);

    await mkdir(outputSubdir, { recursive: true });

    for (const width of targetWidths) {
      const target = path.join(outputSubdir, `${parsed.name}-${width}.webp`);

      if (!force && existsSync(target)) {
        skipped += 1;
        continue;
      }

      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(target);
      await stat(target);
      written += 1;
      console.log(`Wrote ${path.relative(process.cwd(), target)}`);
    }
  }

  console.log(`Done. Written: ${written}. Skipped existing: ${skipped}.`);
} catch (error) {
  exitWithError(error.message, usage);
}
