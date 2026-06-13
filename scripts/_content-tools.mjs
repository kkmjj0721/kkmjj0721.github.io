import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];

    if (!item.startsWith("--")) {
      args._.push(item);
      continue;
    }

    const [rawKey, inlineValue] = item.slice(2).split("=", 2);
    const key = rawKey.trim();

    if (!key) {
      continue;
    }

    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i += 1;
      continue;
    }

    args[key] = true;
  }

  return args;
}

export function toBoolean(value, fallback = false) {
  if (value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return ["1", "true", "yes", "y", "on"].includes(String(value).toLowerCase());
}

export function toList(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function compactObject(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => compactObject(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, compactObject(item)])
        .filter(([, item]) => item !== undefined),
    );
  }

  return value === undefined || value === "" ? undefined : value;
}

export function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function slugify(value, fallback = "entry") {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `${fallback}-${today()}`;
}

export function createPrompter() {
  if (!process.stdin.isTTY) {
    return {
      async ask(_question, defaultValue = "") {
        return defaultValue;
      },
      close() {},
    };
  }

  const rl = createInterface({ input, output });

  return {
    async ask(question, defaultValue = "") {
      const suffix = defaultValue ? ` (${defaultValue})` : "";
      const answer = await rl.question(`${question}${suffix}: `);
      return answer.trim() || defaultValue;
    },
    close() {
      rl.close();
    },
  };
}

export async function writeNewFile(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await writeFile(filePath, content, { flag: "wx" });
  } catch (error) {
    if (error?.code === "EEXIST") {
      throw new Error(`Refusing to overwrite existing file: ${filePath}`);
    }

    throw error;
  }
}

export function exitWithError(message, usage) {
  console.error(message);
  if (usage) {
    console.error("");
    console.error(usage);
  }
  process.exitCode = 1;
}
