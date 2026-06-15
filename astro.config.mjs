// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";

import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// 切换自定义域名时改这里 + 在仓库根新增 CNAME 文件即可
const SITE_URL = "https://kkmjj0721.github.io";

export default defineConfig({
  site: SITE_URL,
  // 用户页面 (kkmjj0721.github.io) 部署到根路径，不需要 base
  // 如改为项目页面 (例如 my-blog 仓库)，把 base 改为 '/my-blog' 即可
  base: "/",
  output: "static",
  trailingSlash: "ignore",
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
      styleOverrides: {
        borderRadius: "0.5rem",
        codeFontFamily:
          'ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace',
      },
      defaultProps: {
        wrap: true,
        showLineNumbers: true,
      },
    }),
    mdx(),
    react(),
    icon(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    pagefind(),
  ],
  markdown: {
    syntaxHighlight: false, // expressive-code 接管
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
  vite: {
    ssr: {
      noExternal: ["giscus"],
    },
  },
});
