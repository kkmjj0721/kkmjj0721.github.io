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
  toBoolean,
  toList,
  writeNewFile,
} from "./_content-tools.mjs";

const usage = `Usage:
  npm run new -- --title "Post title" [--lang zh|en] [--slug post-slug]

Options:
  --title          Required outside an interactive terminal.
  --lang           zh or en. Defaults to zh.
  --description    SEO/list description.
  --tags           Comma-separated tags.
  --categories     Comma-separated categories.
  --date           Publication date, YYYY-MM-DD. Defaults to today.
  --draft          Create as draft.`;

const args = parseArgs();
const prompt = createPrompter();

try {
  const title = args.title || (await prompt.ask("Title"));
  if (!title) {
    exitWithError("Missing required --title.", usage);
    process.exit();
  }

  const lang = args.lang || (await prompt.ask("Language zh/en", "zh"));
  if (!["zh", "en"].includes(lang)) {
    exitWithError(`Invalid language: ${lang}`, usage);
    process.exit();
  }

  const defaultSlug = slugify(title, "post");
  const slug = slugify(
    args.slug || (await prompt.ask("Slug", defaultSlug)),
    "post",
  );
  const description =
    args.description ||
    (await prompt.ask("Description", "TODO(content): add summary"));
  const date = args.date || (await prompt.ask("Publication date", today()));
  const tags = toList(args.tags || (await prompt.ask("Tags, comma-separated")));
  const categories = toList(
    args.categories || (await prompt.ask("Categories, comma-separated")),
  );
  const draft = toBoolean(
    args.draft ?? (await prompt.ask("Draft? yes/no", "no")),
    false,
  );

  const frontmatter = {
    title,
    description,
    pubDate: date,
    tags,
    categories,
    draft,
    sticky: 0,
    lang,
    license: "CC-BY-NC-SA-4.0",
    toc: true,
    comments: true,
  };

  const body = "\nTODO(content): write the post here.\n";
  const output = matter.stringify(body, compactObject(frontmatter));
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "posts",
    lang,
    `${slug}.md`,
  );

  await writeNewFile(filePath, output);
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);
} catch (error) {
  exitWithError(error.message, usage);
} finally {
  prompt.close();
}
