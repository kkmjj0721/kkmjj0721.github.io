#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import Fontmin from "fontmin";
import { exitWithError, parseArgs } from "./_content-tools.mjs";

const usage = `Usage:
  npm run subset-fonts -- [--input public/fonts/source] [--output public/fonts]

Options:
  --input    Source directory with .ttf or .otf files. Defaults to public/fonts/source.
  --output   Destination directory. Defaults to public/fonts.
  --text     Glyph text to keep. Defaults to common ASCII punctuation and CJK sample text.`;

const args = parseArgs();
const inputDir = path.resolve(
  process.cwd(),
  args.input || "public/fonts/source",
);
const outputDir = path.resolve(process.cwd(), args.output || "public/fonts");
const text =
  args.text ||
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:!?-_()[]{}'\"/\\@#$%&*+=<>|`~\n中文博客技术生活摄影番剧游戏影视关于归档标签分类";

async function listFonts(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(dir, entry.name))
    .filter((file) =>
      [".ttf", ".otf"].includes(path.extname(file).toLowerCase()),
    );
}

try {
  if (!existsSync(inputDir)) {
    const relative = path.relative(process.cwd(), inputDir);
    if (args.input) {
      exitWithError(`Input directory does not exist: ${relative}`, usage);
    } else {
      console.log(
        `No source font directory found: ${relative}. Nothing to subset.`,
      );
    }
    process.exit();
  }

  const fonts = await listFonts(inputDir);

  if (fonts.length === 0) {
    console.log("No .ttf or .otf files found to subset.");
    process.exit();
  }

  const fontmin = new Fontmin()
    .src(fonts)
    .use(Fontmin.glyph({ text, hinting: false }))
    .use(Fontmin.ttf2woff())
    .dest(outputDir);

  await new Promise((resolve, reject) => {
    fontmin.run((error, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(files);
    });
  });

  console.log(
    `Subset ${fonts.length} font file(s) into ${path.relative(process.cwd(), outputDir)}`,
  );
} catch (error) {
  exitWithError(error.message, usage);
}
