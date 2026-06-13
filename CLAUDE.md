# CLAUDE.md — 给未来 Claude Code 的项目上下文

## 项目概览

个人博客 · Astro 4.x + Tailwind CSS + TypeScript · GitHub Pages 部署 · 中英双语 · 毛玻璃视觉风格。

## 关键决策

- **框架**: Astro 静态站点，按需引入 React 岛屿
- **路由**: 用户页面 `kkmjj0721.github.io`，无 base 路径
- **多语言**: i18n 中文默认 (`/`)，英文 (`/en/`)
- **样式**: Tailwind + CSS 变量驱动主题/主色（用户可在首页拾色器修改）
- **内容**: Content Collections + Zod schema（9 个集合）
- **图片**: 全部放仓库 `public/images/`，占位文件命名 `*.placeholder.svg`
- **评论**: Giscus（懒加载，点击展开）
- **搜索**: Pagefind（构建期索引）

## 阶段路线

1. **Phase 1** ✅ 骨架 + 主题/主色/语言切换 + 首页 hero + 404
2. **Phase 2** Content Collections + 文章/分类/标签/归档 + RSS
3. **Phase 3** 文章增强（TOC / 进度条 / KaTeX / Mermaid / Admonitions / Embeds / 相关推荐）
4. **Phase 4** 互动控件（粒子 / Lenis / 烟花 / BGM / 涂鸦 / Cookie 同意）
5. **Phase 5** 模块页面（相册时间轴 / 追番 / 游戏 / 读书 / 电影 / 友链 / 项目 / 动态 / 留言板）
6. **Phase 6** Pagefind / Giscus / OG 卡 / 脚本工具 / GitHub Actions

## 重要文件位置

- `src/data/site.ts` — **改这里**改站点信息（域名、作者、社交、Giscus、主色板）
- `src/data/nav.ts` — 导航栏配置
- `src/i18n/ui.ts` — UI 文案翻译表（新增 key 必须 zh + en 都加）
- `src/utils/theme.ts` — 主题/主色运行时工具
- `src/plugins/remark-admonitions.mjs` — `:::tip` `:::warning` `:::spoiler` 解析
- `src/plugins/remark-reading-time.mjs` — 阅读时间计算
- `astro.config.mjs` — Astro 集成 + Markdown 管道 + i18n
- `IMAGES.md` — 图片占位完整清单

## 命名约定

- **图片占位**: 文件名加 `.placeholder.` 中缀（如 `hero-01.placeholder.svg`），易 grep
- **代码注释**: 占位位置标 `TODO(image):` 或 `TODO(content):`，便于批量找
- **i18n key**: `section.subkey` 格式（如 `nav.posts` / `common.readMore`）

## 常用命令

```bash
npm run dev          # 开发服务器
npm run build        # 生产构建（含 Pagefind 索引）
npm run preview      # 本地预览构建结果
npm run new          # 创建新文章（Phase 6 提供）
npm run compress     # 压缩 public/images/ 下的图片（Phase 6 提供）
npm run check:images # 检查未替换的占位图（Phase 6 提供）
```

## 已知约定 / 注意事项

- **不要硬编码颜色**: 用 `text-brand-600` 等 Tailwind 类，会通过 CSS 变量响应主色切换
- **不要直接写 `lang === 'zh'`**: 用 `localizedPath()` 和 `useTranslations()` 工具函数
- **添加新页面后**: 如果有大量文案，记得更新 `src/i18n/ui.ts` 的 key
- **添加新 content collection**: 在 `src/content/config.ts` 加 schema，并更新 `IMAGES.md` 图片清单
- **本仓库不引入秘钥**: Giscus 用公开 ID，所有 ID 在 `site.ts` 里
