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

## ✅ 已完成（Phase 1 + Phase 2）

### Phase 1 — 骨架与脚手架

- ✅ Astro 5.18 + TypeScript strict + Tailwind 3 + React 集成
- ✅ 完整的集成栈：mdx / sitemap / rss / icon / expressive-code / pagefind
- ✅ Markdown 管道：remark-math / remark-gfm / remark-directive / rehype-katex / rehype-slug / rehype-autolink
- ✅ i18n 路由（zh 默认 `/`, en 在 `/en/`）+ 文案翻译表
- ✅ 毛玻璃样式系统（`global.css` + `glass.css` + 主题变量）
- ✅ **主色拾色器**（6 预设色 + 自定义 picker，CSS 变量 + localStorage）
- ✅ **深色/浅色模式切换**（手动 + 自动跟随系统）
- ✅ **首页改成了单屏 hero**（`height: 100svh; margin-top: -6rem;`，不滚动，隐藏 footer）
- ✅ 随机背景图（heroPool 数组）+ 打字机签名
- ✅ Header 浮动 glass-pill 导航 + 移动端菜单 + 主色面板
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
- ✅ 5 篇 demo 文章（中文 4 + 英文 1，含系列文章 / 置顶 / 多分类多标签覆盖）

**构建结果**: 29 个静态页面，Pagefind 索引就位，sitemap 自动生成。所有 `npx astro build` 通过。

---

## ⏳ 未完成（Phase 3–6）

### Phase 3 — 文章功能增强 ⬅️ **下一个要做的**

| 任务                  | 关键提示                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TOC 浮动目录**      | 创建 `src/components/post/TOC.astro`，从 `headings` prop（`post.render()` 返回）生成；用 IntersectionObserver 做 scrollspy；插入 PostLayout 侧栏                                    |
| **阅读进度条**        | 已经在 PostLayout 里有基础实现，可保留                                                                                                                                              |
| **Mermaid 图表**      | 选项：装 `astro-mermaid` 集成 + 在 `astro.config.mjs` integrations 加入。或客户端方案：在 PostLayout 末尾动态 import `mermaid` 处理 `<pre class="mermaid">`                         |
| **KaTeX 样式**        | `remark-math` + `rehype-katex` 已配置，只需在 `BaseLayout.astro` head 加 `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">`（或本地化） |
| **Admonition CSS**    | `remark-admonitions.mjs` 已写好，`.admonition-*` CSS 已在 `typography.css`，验证后无需改动                                                                                          |
| **视频/代码嵌入组件** | 创建 `src/components/embed/Bilibili.astro` / `YouTube.astro` / `CodePen.astro`，用 iframe + lazy loading；提供 MDX 使用示例                                                         |
| **系列文章侧栏**      | PostLayout 中如果 `post.data.series` 存在，调用 `getSeriesPosts()` 显示侧栏目录                                                                                                     |
| **footnotes**         | `remark-gfm` 已开启，应该已经工作。验证下 demo                                                                                                                                      |
| **Demo 文章扩展**     | 在某篇 demo 里加全部功能展示（KaTeX 公式、Mermaid 图、admonition、Bilibili 嵌入）                                                                                                   |

### Phase 4 — 互动控件与视觉打磨

| 任务                       | 关键提示                                                                          |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Lenis 平滑滚动**         | 装 `@studio-freight/lenis`，在 BaseLayout 末尾客户端 `<script>` 初始化            |
| **AOS 入场动画**           | 装 `aos`，添加 `data-aos` 属性到关键卡片                                          |
| **tsParticles 背景**       | 装 `tsparticles` slim 包，在 BaseLayout 加 canvas 容器；用户可在 settings 关闭    |
| **鼠标拖尾**               | 纯 canvas/JS，写 `src/components/widgets/MouseTrail.astro`；监听 mousemove        |
| **点击烟花**               | 用 canvas 粒子；监听 click                                                        |
| **BackToTop**              | `src/components/widgets/BackToTop.astro`，scrollY > 600 时显示                    |
| **点赞按钮**               | `src/components/post/LikeButton.tsx`（React 岛屿），localStorage 计数             |
| **BGM 播放器**             | 用 `aplayer` 或自己写浮动 audio 控件；播放列表来自 `src/data/bgm.ts`              |
| **涂鸦画布彩蛋**           | 键盘快捷键 `Ctrl+D` 触发全屏 canvas，可画完截图保存                               |
| **Cookie 同意条**          | `src/components/widgets/CookieConsent.astro`，首次访问显示，localStorage 标记接受 |
| **隐私页**                 | `src/pages/privacy.astro`（zh + en）                                              |
| **阅读位置保存**           | PostLayout 添加 scroll position 持久化（localStorage by slug）                    |
| **prefers-reduced-motion** | 全部动效都要尊重；在 utils 里加一个 `respectMotion()` helper                      |

### Phase 5 — 模块页面

| 任务                          | 关键提示                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| **Gallery 时间轴**            | `/gallery` 页 + `gallery` collection 已 schema 好；建一个 GalleryTimeline 组件 + Lightbox 组件 |
| **Moments 动态**              | `/moments` 页（仿朋友圈卡片流），用 `moments` collection                                       |
| **Anime 追番**                | `/tracking/anime` 页 + 筛选（watching/done/plan/dropped）+ 星级评分；`AnimeCard.astro` 组件    |
| **Games 游戏**                | `/tracking/games` 页，类似上面，多个 platform 筛选                                             |
| **Books 读书**                | `/tracking/books` 页                                                                           |
| **Movies 电影**               | `/tracking/movies` 页                                                                          |
| **Friends 友链**              | `/friends` 卡片宫格（头像/名称/一句话），数据放 `src/content/friends/*.yml`                    |
| **Projects 项目**             | `/projects` 展示页，featured 在最上面                                                          |
| **Guestbook 留言板**          | `/guestbook` 页，Phase 6 才接 Giscus                                                           |
| **About 关于**                | `/about` 页 + 个人简介 + 技能条 + 成就徽章 + 社交链接 + GitHub 贡献图                          |
| **Demo 数据**                 | 每个 collection 添加 2-3 条 demo 数据，用占位封面                                              |
| **导航增加 Anime/Games 分类** | `data/nav.ts` 已经有 `tracking` 父项 + 4 个子项，验证下拉菜单                                  |

### Phase 6 — 搜索 / 评论 / SEO / 部署

| 任务                        | 关键提示                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Pagefind 搜索框**         | 装好的 `astro-pagefind` 已生成索引；写 `SearchModal.tsx` (React 岛屿)，键盘 `Ctrl+K` 触发，使用 `pagefind` UI |
| **Giscus 评论懒加载**       | `src/components/post/Comments.astro`，"点击加载评论" 按钮，点击后注入 giscus.json + script                    |
| **OG 图片自动生成**         | 选项：用 `astro-og-canvas` 集成，每篇文章自动生成 1200×630 PNG                                                |
| **CLI 脚手架**              | 写 `scripts/new-post.mjs` 用 `gray-matter` + 交互式问答 (`@inquirer/prompts`)；新建文章模板                   |
| **图片压缩脚本**            | `scripts/compress-images.mjs` 用 `sharp` 批量转 WebP + 多尺寸                                                 |
| **字体子集化**              | `scripts/subset-fonts.mjs` 用 `fontmin`，输出到 `public/fonts/`                                               |
| **检查脚本**                | `scripts/check-images.mjs` grep `TODO(image)` 给出未替换列表                                                  |
| **GitHub Actions: 部署**    | 写 `.github/workflows/deploy.yml`（详见计划文件第 5 节）                                                      |
| **GitHub Actions: 检查**    | `.github/workflows/checks.yml`：lychee 死链 + cspell 拼写 + eslint                                            |
| **GitHub Actions: PR 预览** | `.github/workflows/pr-preview.yml`（可选，简单方案是 artifact 上传）                                          |
| **pre-commit 钩子**         | 装 `simple-git-hooks` + `lint-staged`，git commit 前自动 lint                                                 |
| **真正推送上线**            | 仓库 Settings → Pages → Source 选 GitHub Actions；push main → 等部署                                          |

---

## 🏗️ 关键技术决策（必读）

1. **不要换框架**: Astro 5 + Tailwind 3 + TS strict，所有依赖已锁定在 `package.json`
2. **i18n 路由**: 中文默认 `/`，英文 `/en/`；`getLangFromUrl(Astro.url)` + `useTranslations(lang)` 获取
3. **URL 约定**: 文章 URL 不带语言子目录前缀（`/posts/hello-world/` 而不是 `/posts/zh/hello-world/`），用 `postUrl(post)` 工具生成
4. **文件组织**: 中英文 markdown 分目录管理（`src/content/posts/zh/` 与 `src/content/posts/en/`），靠 frontmatter `lang:` 字段过滤
5. **主题主色**: 用 CSS 变量驱动（`--color-brand` 及 50–900 色阶），切换时只需 `document.documentElement.style.setProperty`
6. **图片占位约定**:
   - 占位文件名带 `.placeholder.` 中缀（如 `hero-01.placeholder.svg`），易 grep
   - 代码里加 `{/* TODO(image): ... */}` 注释
   - 用户在 `IMAGES.md` 看清单
7. **不要安装 pnpm**: 环境只有 npm（11.12.1）+ Node 24.15.0
8. **GitHub Actions deploy.yml 改用 npm**: 计划文件里写的是 pnpm，实际部署要改成 npm install
9. **首页是单屏 hero**: 不要再加滚动卡片！用户明确要求"刚好背面能看到背景图"。修改首页时保持 `<BaseLayout noContainer hideFooter>`
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
├── src/layouts/BaseLayout.astro  # HTML 外壳，hideFooter prop 已支持
├── src/layouts/PageLayout.astro  # 普通页面（带 glass 容器）
├── src/layouts/PostLayout.astro  # 文章页（封面/上下篇/相关推荐/阅读进度条）
│
├── src/components/layout/Header.astro    # 导航 + 主题/主色/语言切换
├── src/components/layout/Footer.astro    # 社交 + 运行天数
├── src/components/home/HeroSection.astro # 单屏 hero + 打字机
├── src/components/post/PostCard.astro    # 列表卡片
│
├── src/utils/posts.ts            # 文章相关全部 utils（必读）
├── src/utils/theme.ts            # 主题/主色运行时
│
├── src/plugins/remark-admonitions.mjs    # :::tip :::warning :::spoiler 解析
├── src/plugins/remark-reading-time.mjs   # 阅读时间计算
│
├── src/content/config.ts         # 9 个集合的 Zod schema（⭐必读）
├── src/content/posts/zh/*.md     # 4 篇中文 demo
├── src/content/posts/en/*.md     # 1 篇英文 demo
│
├── src/pages/index.astro          # 中文首页（单屏 hero）
├── src/pages/en/index.astro       # 英文首页（单屏 hero）
├── src/pages/posts/[...slug].astro
├── src/pages/en/posts/[...slug].astro
├── src/pages/posts/index.astro    # 文章列表
├── src/pages/archives.astro       # 时间轴归档
├── src/pages/categories/index.astro + [category].astro
├── src/pages/tags/index.astro + [tag].astro  # 标签云
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
- Phase 1（骨架）和 Phase 2（内容系统）已完成
- 29 个静态页面，最近一次 npx astro build 全绿
- 首页是单屏 hero（用户明确不要滚动），改时要保持 <BaseLayout noContainer hideFooter>

【请继续做】
Phase 3：文章功能增强（TOC、KaTeX 样式表、Mermaid、Admonitions 验证、视频/代码嵌入组件、系列文章侧栏）

【约束】
- 不安装 pnpm，只用 npm（v11）+ Node 24
- 不要变更已选定的技术栈
- URL 不带语言子目录（用 src/utils/posts.ts 的 postUrl()）
- 中英 i18n 字符串补 src/i18n/ui.ts，新增 key 必须 zh + en 都加
- 代码注释极简，frontmatter 里的 TODO(image) / TODO(content) 占位保留
- 图片全部用占位 SVG，用户后期自己换
- 完成后跑 npx astro build 验证

【任务跟踪】
TaskList 里已经有 Phase 3–6 的占位任务，开始时 TaskUpdate Phase 3 to in_progress。

先读 HANDOFF.md 全文，再读 src/utils/posts.ts、src/layouts/PostLayout.astro、astro.config.mjs，然后开始 Phase 3。
```

---

## 🧪 验证命令

```bash
cd /home/kk/github/my_blog

# 检查依赖是否完整
ls node_modules > /dev/null || npm install

# 构建（必跑）
npx astro build

# 本地预览
npx astro dev --host 127.0.0.1 --port 4321
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
#4  Phase 3: 文章功能增强          ⏳ pending  ← 下一个
#5  Phase 4: 互动控件与视觉打磨    ⏳ pending
#6  Phase 5: 追踪/相册/动态/友链/项目  ⏳ pending
#7  Phase 6: 搜索/SEO/部署/自动化  ⏳ pending
```

---

## ❓ 用户期间要提供的（按优先级）

**MVP 之前可以全用占位**:

- ✅ GitHub 用户名: `kkmjj0721`
- ✅ 仓库名: `kkmjj0721.github.io`
- ⏳ 真实站点名 / 副标题 / 签名（现用 `星之回廊` / `Stellar Corridor` 占位）
- ⏳ 真实头像（现用 SVG 占位 "kk"）

**Phase 6 之前需要**:

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
6. **主色用户可改**：首页拾色器已实现，6 预设色 + 自定义 picker，写入 localStorage
7. **中英双语**：i18n 切换，新增 UI 字符串必须 zh + en 都补
