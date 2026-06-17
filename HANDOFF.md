# 个人博客 my_blog — 项目交接文档

> 这份文档用于在新会话中无缝续做。把整个文档贴给 Claude Code，它就能从中断处接上。

---

## 📍 项目位置

- 工作目录: `/home/kk/github/my_blog/`
- 计划文件: `/home/kk/.claude/plans/whimsical-swimming-hejlsberg.md`
- GitHub: `kkmjj0721` / 仓库 `kkmjj0721.github.io`（用户页面，无 base 路径）

---

## 🎯 项目目标（一句话）

用 **Astro 5 + Tailwind + TypeScript** 搭一个**毛玻璃风格 + 中英双语 + 6 类内容（技术/生活/摄影/番剧/游戏/影视）**的个人博客，部署到 **GitHub Pages**，全部图片用占位符，由用户后期替换。

---

## ✅ 当前已完成状态

### Phase 1 — 骨架与脚手架

- ✅ Astro 5.18 + TypeScript strict + Tailwind 3 + React 集成
- ✅ 完整的集成栈：mdx / sitemap / rss / icon / expressive-code / pagefind
- ✅ Markdown 管道：remark-math / remark-gfm / remark-directive / rehype-katex / rehype-slug / rehype-autolink
- ✅ i18n 路由（zh 默认 `/`, en 在 `/en/`）+ 文案翻译表
- ✅ 毛玻璃样式系统（`global.css` + `glass.css` + 主题变量）
- ✅ **主色预设色块**（首页 `HomeDashboard` 暴露 6 个品牌色预设，CSS 变量 + localStorage；当前不含自定义颜色输入）
- ✅ **深色/浅色模式切换**（手动 + 自动跟随系统）
- ✅ **首页改成了单视口 dashboard**（`height: 100svh; margin-top: -3rem; overflow-y: auto;`，保持 `hideFooter`）
- ✅ 全站共享背景由 `src/components/layout/SharedBackground.astro` 负责，含 light/dark 视频与 poster；旧 `HeroSection` 的随机背景/typewriter 组件仍在源码中但当前首页未挂载
- ✅ Header 浮动 glass-pill 导航 + 移动端菜单
- ✅ Footer 社交链接 + 运行天数
- ✅ 404 页（带占位插画）
- ✅ Open Graph + Twitter Card + canonical + RSS link
- ✅ 占位 SVG 体系（hero-01/02/03、avatar、og-default、404、favicon）
- ✅ 4 份文档：README.md / IMAGES.md / CLAUDE.md / REPLACEMENT_GUIDE.md

### Phase 2 — 核心内容系统

- ✅ 9 个 Content Collections 的 Zod schema（`src/content/config.ts`）
- ✅ 文章工具（`src/utils/posts.ts`）：
  - `getPublishedPosts(lang)` — 草稿/定时过滤 + 排序
  - `findRelatedPosts` — 按 tag/category 重合度
  - `getPrevNext`、`groupByCategory`、`groupByTag`、`groupByYear`、`getSeriesPosts`
  - `stripLangPrefix` + `postUrl` — 干净 URL（`/posts/hello-world/` 不带语言子目录）
- ✅ 8 个页面：`/posts/` 列表 + `/posts/[slug]` 详情 + `/en/posts/[slug]` + `/archives/` + `/categories/` + `/categories/[cat]` + `/tags/` + `/tags/[tag]`
- ✅ PostCard 组件（封面 / 标题 / 摘要 / 分类 / 标签 / 日期 / 置顶徽章）
- ✅ PostLayout（标题区 / 封面 / 元信息 / 标签 / 版权 / 上下篇 / 相关推荐 / 评论占位 / 阅读进度条）
- ✅ RSS endpoint
- ✅ demo 文章（含系列文章 / 置顶 / 多分类多标签 / Phase 3 showcase 覆盖）

### Phase 3 — 文章功能增强

- ✅ TOC / scrollspy / 阅读进度条已集成在 `src/layouts/PostLayout.astro`
- ✅ KaTeX CSS、Mermaid 懒渲染、GFM footnotes、admonition 样式已接入
- ✅ 系列文章侧栏已接入 `src/components/post/SeriesSidebar.astro`
- ✅ Bilibili / YouTube / CodePen 嵌入组件复用 `src/components/embed/EmbedFrame.astro`
- ✅ `src/content/posts/zh/phase-3-showcase.mdx` 用于文章功能展示

### Phase 4 — 互动控件与视觉打磨

- ✅ `src/components/widgets/SiteWidgets.astro` 已集中实现 BackToTop、Cookie 同意条、指针拖尾/点击粒子、涂鸦板，并在 `astro:before-swap` 中清理事件；BGM 仅在曲目启用、授权已验证且有 provenance URL 时渲染，当前 Departures 资源禁用且未验证，默认不暴露播放 UI
- ✅ `src/components/post/LikeButton.astro` 已实现本地点赞状态
- ✅ `src/layouts/PostLayout.astro` 已实现阅读进度与阅读位置保存
- ✅ `src/components/layout/Header.astro` 移动端菜单已实现 Tab 焦点陷阱、Escape 关闭和关闭后焦点回到菜单按钮

### Phase 5 — 模块页面路由

- ✅ 已有 about、archives、categories、tags、gallery、moments、friends、projects、tracking/anime、tracking/books、tracking/games、tracking/movies 页面
- ✅ 英文路由已覆盖 about、archives、categories、tags、gallery、moments、friends、projects、tracking 系列和 posts
- ⚠️ 多数模块仍使用 demo/空集合状态，需要用户后续补真实内容

### Phase 6 — 搜索 / 评论 / 自动化 / 部署

- ✅ Pagefind 搜索入口已实现：`src/components/search/SearchModal.astro`，首页 dashboard 已挂载
- ✅ Giscus 评论/留言入口已实现：`src/components/post/Comments.astro`，未配置真实 ID 时受保护显示，不会加载无效脚本
- ✅ npm 脚本已覆盖内容脚手架、图片检查/压缩、字体子集化、lint、build
- ✅ GitHub Actions 已有 `deploy.yml`、`checks.yml`、`pr-preview.yml`，均使用 npm

**最近已知验证**: `ARCHITECTURE_CONTEXT.md` 记录过 `npm run lint`、`npm run build`、`npm run check:images -- --allow-placeholders`、`node --check scripts/*.mjs` 等通过；本次发布验证已确认 `npm run lint`、`npm run build`、路由检查、widgets/like button、BGM HTML 排除、reduced-motion/search focus/stale sweep 全部通过，并达到 `[ALL_TESTS_PASSED]`。

---

## ⏳ 当前剩余实现缺口

### Phase 4 — 互动控件与视觉打磨

核心互动控件已完成：BackToTop、点赞、Cookie 同意条、指针拖尾/点击粒子、涂鸦板、隐私页、阅读进度和阅读位置保存均已接入。BGM 资源仍保留在 `public/audio/bgm/` 作为用户提供/待替换素材，首页和默认 UI 不暴露未验证曲目的播放入口。当前实现使用轻量原生 JS/CSS，没有引入 Lenis、AOS 或 tsParticles；这些库仅作为后续可选视觉增强，不是当前实现缺口。

### 内容与私有配置

- ⏳ demo/真实内容：gallery、moments、tracking、friends、projects 等集合需要用户补真实条目和图片
- ⏳ 音频治理：`public/audio/bgm/Departures.mp3` 保留为用户提供/待替换资源，首页和默认 UI 不再暴露播放入口；若要重新启用，需先补来源/授权说明或替换为已验证曲目
- ⏳ 外部私有配置：Giscus repo/category ID、社交链接、邮箱、头像、背景/封面等真实资产需要用户提供
- ⏳ 可选 SEO 增强：自动 OG 图片生成尚未接入

---

## 🏗️ 关键技术决策（必读）

1. **不要换框架**: Astro 5 + Tailwind 3 + TS strict，所有依赖已锁定在 `package.json`
2. **i18n 路由**: 中文默认 `/`，英文 `/en/`；`getLangFromUrl(Astro.url)` + `useTranslations(lang)` 获取
3. **URL 约定**: 文章 URL 不带语言子目录前缀（`/posts/hello-world/` 而不是 `/posts/zh/hello-world/`），用 `postUrl(post)` 工具生成
4. **文件组织**: 中英文 markdown 分目录管理（`src/content/posts/zh/` 与 `src/content/posts/en/`），靠 frontmatter `lang:` 字段过滤
5. **主题主色**: 用 CSS 变量驱动（`--color-brand` 及 50–900 色阶）；当前 UI 在首页 `HomeDashboard` 提供亮色 / 暗色 / 自动按钮和品牌预设色块，Header 只包含导航与移动端菜单
6. **图片占位约定**:
   - 占位文件名带 `.placeholder.` 中缀（如 `hero-01.placeholder.svg`），易 grep
   - 代码里加 `{/* TODO(image): ... */}` 注释
   - 用户在 `IMAGES.md` 看清单
7. **不要安装 pnpm**: 环境使用 npm + Node 24，CI 也按 npm 走
8. **GitHub Actions 使用 npm**: `.github/workflows/deploy.yml` / `checks.yml` / `pr-preview.yml` 均使用 `npm ci` 和 `npm run build`
9. **首页是单视口 dashboard**: 不要再加长页面内容；当前 `HomeDashboard` 使用 `height: 100svh; margin-top: -3rem; overflow-y: auto;`，修改首页时保持 `<BaseLayout noContainer hideFooter>`
10. **代码注释极简**: 用户不需要每行注释。frontmatter 占位标记保留（`TODO(image)` / `TODO(content)`）

---

## 📁 关键文件位置（速查）

```
my_blog/
├── astro.config.mjs              # 集成 + Markdown 管道 + i18n
├── tailwind.config.mjs           # CSS 变量映射、品牌色色阶
├── tsconfig.json                 # @/ @components/ @layouts/ 等别名
├── package.json                  # 依赖列表
│
├── src/data/site.ts              # ⭐ 站点元数据 / 作者 / 社交 / Giscus / 主色板
├── src/data/nav.ts               # 导航菜单（完全体 11 项 + tracking 子菜单）
├── src/i18n/ui.ts                # 中英 UI 文案 + getLangFromUrl + useTranslations
│
├── src/layouts/BaseLayout.astro  # HTML 外壳，hideFooter prop 已支持，挂载 SharedBackground
├── src/layouts/PageLayout.astro  # 普通页面（带 glass 容器）
├── src/layouts/PostLayout.astro  # 文章页（TOC/系列/评论入口/上下篇/相关推荐/阅读进度条）
│
├── src/components/layout/Header.astro    # 透明 glass 导航 + 移动端菜单
├── src/components/layout/Footer.astro    # 社交 + 运行天数
├── src/components/layout/SharedBackground.astro # 全站 light/dark 视频背景 + poster
├── src/components/home/HomeDashboard.astro # 单视口 dashboard 内容 + 搜索入口 + 主题模式按钮 + 品牌色预设
├── src/components/search/SearchModal.astro # Pagefind 搜索弹窗
├── src/components/post/Comments.astro    # Giscus 受保护懒加载入口
├── src/components/post/PostCard.astro    # 列表卡片
│
├── src/utils/posts.ts            # 文章相关全部 utils（必读）
├── src/utils/theme.ts            # 主题/主色运行时
│
├── src/plugins/remark-admonitions.mjs    # :::tip :::warning :::spoiler 解析
├── src/plugins/remark-reading-time.mjs   # 阅读时间计算
│
├── src/content/config.ts         # 9 个集合的 Zod schema（⭐必读）
├── src/content/posts/zh/*.md     # 中文 demo / showcase
├── src/content/posts/en/*.md     # 1 篇英文 demo
│
├── src/pages/index.astro          # 中文首页（单屏 dashboard，挂载 HomeDashboard）
├── src/pages/en/index.astro       # 英文首页（单屏 dashboard，挂载 HomeDashboard）
├── src/pages/posts/[...slug].astro
├── src/pages/en/posts/[...slug].astro
├── src/pages/posts/index.astro    # 文章列表
├── src/pages/archives.astro       # 时间轴归档
├── src/pages/categories/index.astro + [category].astro
├── src/pages/tags/index.astro + [tag].astro  # 标签云
├── src/pages/gallery/ moments/ friends/ projects/ tracking/  # 模块页面
├── src/pages/guestbook.astro      # Giscus 留言入口（需真实配置）
├── src/pages/privacy.astro        # 隐私页
├── src/pages/rss.xml.ts           # RSS endpoint
├── src/pages/404.astro
│
├── src/styles/global.css          # CSS 变量 + body 渐变背景
├── src/styles/glass.css           # 毛玻璃工具类
├── src/styles/typography.css      # 文章正文 + admonition 样式
│
├── public/favicon.svg
├── public/robots.txt
├── public/images/placeholders/   # 占位 SVG（hero/avatar/og/404）
│
├── README.md                      # 用户视角的使用说明
├── IMAGES.md                      # 图片占位清单
├── CLAUDE.md                      # 给 Claude 的项目上下文
├── REPLACEMENT_GUIDE.md           # 占位替换速查手册
└── HANDOFF.md                     # 本文件
```

---

## 🚀 续做提示词（直接复制贴给新会话）

```
你接手一个进行中的 Astro 5 个人博客项目。

工作目录: /home/kk/github/my_blog/
项目交接文档: /home/kk/github/my_blog/HANDOFF.md ← 先 Read 这个

【现状】
- Phase 1/2/3 已完成，Phase 5 路由壳、Phase 6 搜索/评论入口/自动化已基本就位
- Pagefind 搜索、受保护的 Giscus 评论/留言入口、npm 脚本、GitHub Actions 已存在
- 首页是单视口 dashboard，改时要保持 <BaseLayout noContainer hideFooter>，并保留当前 `height: 100svh; margin-top: -3rem; overflow-y: auto;` 的布局约束

【请继续做】
优先处理剩余缺口：模块真实/demo 内容补齐、BGM 来源/授权或替换策略（当前默认不暴露播放 UI）、Giscus/社交/邮箱等私有配置，以及可选 OG 图片生成/视觉增强。

【约束】
- 不安装 pnpm，只用 npm（v11）+ Node 24
- 不要变更已选定的技术栈
- URL 不带语言子目录（用 src/utils/posts.ts 的 postUrl()）
- 中英 i18n 字符串补 src/i18n/ui.ts，新增 key 必须 zh + en 都加
- 代码注释极简，frontmatter 里的 TODO(image) / TODO(content) 占位保留
- 图片全部用占位 SVG，用户后期自己换
- 完成后跑 npm run build 验证

【任务跟踪】
TaskList 里的早期 Phase 状态可能已经落后，先按本文“当前已完成状态/当前剩余实现缺口”核对。

先读 HANDOFF.md 全文，再按任务读相关组件和 `ARCHITECTURE_CONTEXT.md`，避免重复实现已完成项。
```

---

## 🧪 验证命令

```bash
cd /home/kk/github/my_blog

# 检查依赖是否完整
ls node_modules > /dev/null || npm install

# 构建（必跑）
npm run build

# 本地预览
npm run dev -- --host 127.0.0.1 --port 4321
# 然后访问 http://127.0.0.1:4321/

# 关键路径自检
curl -s -o /dev/null -w "%{http_code} /\n"        http://127.0.0.1:4321/
curl -s -o /dev/null -w "%{http_code} /posts/\n"  http://127.0.0.1:4321/posts/
curl -s -o /dev/null -w "%{http_code} /posts/hello-world/\n" http://127.0.0.1:4321/posts/hello-world/
curl -s -o /dev/null -w "%{http_code} /archives/\n" http://127.0.0.1:4321/archives/
curl -s -o /dev/null -w "%{http_code} /tags/\n"   http://127.0.0.1:4321/tags/
curl -s -o /dev/null -w "%{http_code} /rss.xml\n" http://127.0.0.1:4321/rss.xml
curl -s -o /dev/null -w "%{http_code} /en/\n"     http://127.0.0.1:4321/en/
curl -s -o /dev/null -w "%{http_code} /en/posts/hello-world/\n" http://127.0.0.1:4321/en/posts/hello-world/
```

---

## 🧰 任务状态（TaskList）

```
#2  Phase 1: 项目骨架与脚手架     ✅ completed
#3  Phase 2: 核心内容系统          ✅ completed
#4  Phase 3: 文章功能增强          ✅ completed
#5  Phase 4: 互动控件与视觉打磨    ✅ core widgets complete / ⏳ optional polish
#6  Phase 5: 追踪/相册/动态/友链/项目  ✅ route shells / ⏳ real content
#7  Phase 6: 搜索/SEO/部署/自动化  ✅ search/comments/tooling/CI / ⏳ private config + optional OG
```

---

## ❓ 用户期间要提供的（按优先级）

**MVP 之前可以全用占位**:

- ✅ GitHub 用户名: `kkmjj0721`
- ✅ 仓库名: `kkmjj0721.github.io`
- ⏳ 真实副标题 / 签名 / 作者简介等个人内容（站点中文标题当前为 `奈奈奈奈奈绪の博客`）
- ⏳ 真实头像（现用 SVG 占位 "kk"）
- ⏳ BGM 来源/授权说明，或替换/移除默认 `public/audio/bgm/Departures.mp3`；当前首页和默认 UI 不暴露该未验证曲目

**启用评论/留言前需要**:

- ⏳ 启用 GitHub Discussions 并配置 Giscus
- ⏳ 把 `src/data/site.ts` 的 `giscus.repoId / categoryId / guestbookCategoryId` 改成真实值

**可选**:

- ⏳ 自定义域名（用户已确认暂不购买）

---

## 🎨 用户的特殊偏好（重要）

1. **首页必须单屏**：用户原话「首页不用上下化，就做成一个一个页面，刚好背面能看到背景图」— 不要再往首页堆卡片
2. **图片全用占位**：用户要"所有图片我自己后期放"，所有图片位置必须有 `TODO(image)` 标记 + `.placeholder.svg` 文件名
3. **完整 6 阶段交付**：用户选了"完全体"，所有番剧/游戏/读书/电影追踪页都要做
4. **域名暂不买**：先用 `kkmjj0721.github.io` 默认域名，但代码里要预留 `siteUrl` 切换位
5. **双主题**：手动 + 自动跟随系统，都要支持
6. **主色用户可改**：首页 `HomeDashboard` 已实现 6 个品牌色预设色块，写入 localStorage；当前没有自定义颜色输入或 Header 颜色控制
7. **中英双语**：i18n 切换，新增 UI 字符串必须 zh + en 都补
