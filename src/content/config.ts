import { defineCollection, z } from "astro:content";

/**
 * 通用 frontmatter 字段
 * 草稿在 PROD 下排除；定时发布按 pubDate 过滤
 */

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      categories: z.array(z.string()).default([]),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
      draft: z.boolean().default(false),
      sticky: z.number().default(0),
      lang: z.enum(["zh", "en"]).default("zh"),
      translationKey: z.string().optional(),
      license: z.string().default("CC-BY-NC-SA-4.0"),
      toc: z.boolean().default(true),
      comments: z.boolean().default(true),
    }),
});

const moments = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      mood: z.string().optional(),
      location: z.string().optional(),
      images: z.array(z.string()).default([]),
      visibility: z.enum(["public", "unlisted"]).default("public"),
    }),
});

const gallery = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      title: z.string(),
      description: z.string().optional(),
      location: z.string().optional(),
      camera: z.string().optional(),
      lens: z.string().optional(),
      category: z.string().default("photography"),
      images: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

const anime = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      titleAlt: z.string().optional(),
      status: z.enum(["watching", "done", "plan", "dropped"]).default("plan"),
      rating: z.number().min(0).max(10).optional(),
      episodes: z.number().optional(),
      year: z.number().optional(),
      cover: z.string().optional(),
      bangumiUrl: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const games = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      platform: z.string().optional(),
      status: z
        .enum(["owned", "playing", "done", "wishlist", "dropped"])
        .default("wishlist"),
      rating: z.number().min(0).max(10).optional(),
      hoursPlayed: z.number().optional(),
      cover: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const books = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      author: z.string().optional(),
      status: z.enum(["reading", "done", "plan", "dropped"]).default("plan"),
      rating: z.number().min(0).max(10).optional(),
      cover: z.string().optional(),
      doubanUrl: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const movies = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      year: z.number().optional(),
      director: z.string().optional(),
      status: z.enum(["watched", "plan", "dropped"]).default("plan"),
      rating: z.number().min(0).max(10).optional(),
      cover: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const friends = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    avatar: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    group: z.string().default("friends"),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string().optional(),
      url: z.string().url().optional(),
      repo: z.string().url().optional(),
      tech: z.array(z.string()).default([]),
      cover: z.string().optional(),
      featured: z.boolean().default(false),
      status: z.enum(["active", "maintenance", "archived"]).default("active"),
      date: z.coerce.date().optional(),
    }),
});

export const collections = {
  posts,
  moments,
  gallery,
  anime,
  games,
  books,
  movies,
  friends,
  projects,
};
