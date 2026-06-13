/**
 * 计算文章字数与阅读时间
 * ─────────────────────────────────────────────
 * 把结果写入 frontmatter.data.astro.frontmatter.readingTime
 * 中文按字符数 * 0.5，英文按词数 / 200 wpm，混合按 max
 */
import { toString } from "mdast-util-to-string";

const CHINESE_CHARS_PER_MIN = 400;
const ENGLISH_WORDS_PER_MIN = 220;

export function remarkReadingTime() {
  return (tree, { data }) => {
    const text = toString(tree);
    const cn = (text.match(/[一-龥]/g) || []).length;
    const en = (text.replace(/[一-龥]/g, " ").match(/\b\w+\b/g) || []).length;
    const minutes = Math.max(
      1,
      Math.ceil(cn / CHINESE_CHARS_PER_MIN + en / ENGLISH_WORDS_PER_MIN),
    );
    const fm = ((data.astro ??= {}).frontmatter ??= {});
    fm.readingTime = minutes;
    fm.wordCount = cn + en;
  };
}
