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
  toList,
  writeNewFile,
} from "./_content-tools.mjs";

const usage = `Usage:
  npm run new:moment -- [--date YYYY-MM-DD] [--slug moment-slug]

Options:
  --date         Moment date. Defaults to today.
  --mood         Optional mood label.
  --location     Optional location.
  --images       Comma-separated image paths.
  --visibility   public or unlisted. Defaults to public.`;

const args = parseArgs();
const prompt = createPrompter();

try {
  const date = args.date || (await prompt.ask("Date", today()));
  const mood = args.mood || (await prompt.ask("Mood"));
  const location = args.location || (await prompt.ask("Location"));
  const images = toList(
    args.images || (await prompt.ask("Images, comma-separated")),
  );
  const visibility =
    args.visibility ||
    (await prompt.ask("Visibility public/unlisted", "public"));

  if (!["public", "unlisted"].includes(visibility)) {
    exitWithError(`Invalid visibility: ${visibility}`, usage);
    process.exit();
  }

  const slug = slugify(args.slug || date, "moment");
  const frontmatter = {
    date,
    mood: mood || undefined,
    location: location || undefined,
    images,
    visibility,
  };

  const body = "\nTODO(content): write this moment.\n";
  const output = matter.stringify(body, compactObject(frontmatter));
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "moments",
    `${slug}.md`,
  );

  await writeNewFile(filePath, output);
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);
} catch (error) {
  exitWithError(error.message, usage);
} finally {
  prompt.close();
}
