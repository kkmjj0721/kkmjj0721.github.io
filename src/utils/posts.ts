import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@i18n/ui";

type Post = CollectionEntry<"posts">;

/**
 * 获取已发布文章列表
 * - 排除 draft（PROD 模式）
 * - 排除未到 pubDate 的定时文章
 * - 按语言筛选
 * - 按 sticky DESC + pubDate DESC 排序
 */
export async function getPublishedPosts(lang?: Lang): Promise<Post[]> {
  const all = await getCollection("posts");
  const now = Date.now();
  return all
    .filter((p) => {
      if (lang && p.data.lang !== lang) return false;
      if (import.meta.env.PROD && p.data.draft) return false;
      if (p.data.pubDate.getTime() > now) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.data.sticky !== b.data.sticky) return b.data.sticky - a.data.sticky;
      return b.data.pubDate.getTime() - a.data.pubDate.getTime();
    });
}

/** 按 tag 找相关文章 */
export function findRelatedPosts(
  current: Post,
  all: Post[],
  limit = 3,
): Post[] {
  const scores = all
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const overlap = p.data.tags.filter((t) =>
        current.data.tags.includes(t),
      ).length;
      const categoryOverlap = p.data.categories.filter((c) =>
        current.data.categories.includes(c),
      ).length;
      return { post: p, score: overlap * 2 + categoryOverlap };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scores.slice(0, limit).map((x) => x.post);
}

/** 上一篇 / 下一篇 */
export function getPrevNext(current: Post, all: Post[]) {
  const idx = all.findIndex((p) => p.slug === current.slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 && idx >= 0 ? all[idx + 1] : null,
  };
}

/** 按 category 分组 */
export function groupByCategory(posts: Post[]): Record<string, Post[]> {
  const map: Record<string, Post[]> = {};
  for (const p of posts) {
    for (const c of p.data.categories.length ? p.data.categories : ["未分类"]) {
      (map[c] ??= []).push(p);
    }
  }
  return map;
}

/** 按 tag 分组 */
export function groupByTag(posts: Post[]): Record<string, Post[]> {
  const map: Record<string, Post[]> = {};
  for (const p of posts) {
    for (const t of p.data.tags) (map[t] ??= []).push(p);
  }
  return map;
}

/** 按年份归档 */
export function groupByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const map: Record<number, Post[]> = {};
  for (const p of posts) {
    const y = p.data.pubDate.getFullYear();
    (map[y] ??= []).push(p);
  }
  return Object.entries(map)
    .map(([y, ps]) => ({ year: Number(y), posts: ps }))
    .sort((a, b) => b.year - a.year);
}

/** 同系列文章 */
export function getSeriesPosts(series: string, all: Post[]): Post[] {
  return all
    .filter((p) => p.data.series === series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

/** 去掉 slug 中的语言前缀（zh/xxx -> xxx）*/
export function stripLangPrefix(slug: string): string {
  return slug.replace(/^(zh|en)\//, "");
}

/** 文章在站点上的最终 URL（含语言前缀）*/
export function postUrl(post: Post): string {
  const cleanSlug = stripLangPrefix(post.slug);
  return post.data.lang === "en"
    ? `/en/posts/${cleanSlug}/`
    : `/posts/${cleanSlug}/`;
}

/** 格式化日期 */
export function formatDate(date: Date, lang: Lang = "zh"): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return lang === "zh" ? `${y}年${m}月${d}日` : `${y}-${m}-${d}`;
}
