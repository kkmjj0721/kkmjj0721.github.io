#!/usr/bin/env node
import path from "node:path";
import matter from "gray-matter";
import {
  createPrompter,
  compactObject,
  exitWithError,
  parseArgs,
  slugify,
  today,
  writeNewFile,
} from "./_content-tools.mjs";

const usage = `Usage:
  npm run new:gallery -- --title "Gallery title" [--slug gallery-slug]

Options:
  --title         Required outside an interactive terminal.
  --date          Gallery date. Defaults to today.
  --description   Optional description.
  --location      Optional location.
  --camera        Optional camera.
  --lens          Optional lens.
  --category      Defaults to photography.
  --image         Optional initial image path.
  --alt           Alt text for the initial image.
  --caption       Caption for the initial image.`;

const args = parseArgs();
const prompt = createPrompter();

try {
  const title = args.title || (await prompt.ask("Title"));
  if (!title) {
    exitWithError("Missing required --title.", usage);
    process.exit();
  }

  const date = args.date || (await prompt.ask("Date", today()));
  const slug = slugify(
    args.slug || (await prompt.ask("Slug", slugify(title, "gallery"))),
    "gallery",
  );
  const description = args.description || (await prompt.ask("Description"));
  const location = args.location || (await prompt.ask("Location"));
  const camera = args.camera || (await prompt.ask("Camera"));
  const lens = args.lens || (await prompt.ask("Lens"));
  const category =
    args.category || (await prompt.ask("Category", "photography"));
  const image = args.image || (await prompt.ask("Initial image path"));
  const alt = args.alt || title;
  const caption = args.caption || "";

  const frontmatter = {
    date,
    title,
    description: description || undefined,
    location: location || undefined,
    camera: camera || undefined,
    lens: lens || undefined,
    category,
    images: image
      ? [
          {
            src: image,
            alt,
            caption: caption || undefined,
          },
        ]
      : [],
  };

  const body = "\nTODO(content): write gallery notes.\n";
  const output = matter.stringify(body, compactObject(frontmatter));
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "gallery",
    `${slug}.md`,
  );

  await writeNewFile(filePath, output);
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);
} catch (error) {
  exitWithError(error.message, usage);
} finally {
  prompt.close();
}
