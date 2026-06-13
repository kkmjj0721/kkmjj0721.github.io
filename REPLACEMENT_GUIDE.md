# 占位替换速查手册

> 全站所有需要你替换的占位列表，按优先级排序。

## 🔴 上线必换（最少改这些就能正式发布）

### 1. 站点信息 — `src/data/site.ts`

```ts
title: { zh: '你的站点名', en: 'Your Site Name' }
subtitle: { zh: '你的口号', en: 'Your Tagline' }
description: { zh: '...', en: '...' }
author: {
  name: { zh: '你的名字', en: 'Your Name' },
  email: 'you@example.com',
  avatar: '/images/avatar/me.webp',  // 放好头像后改
}
social: [
  { name: 'GitHub', url: 'https://github.com/你的用户名', show: true },
  // 不想展示的就改 show: false
]
```

### 2. 首页 hero 背景图 — `public/images/heroes/`

把图片（推荐 1920×1080 webp）放到 `public/images/heroes/`，然后改 `src/components/home/HeroSection.astro` 第 12-16 行 `heroPool` 数组：

```ts
const heroPool = [
  "/images/heroes/dawn.webp",
  "/images/heroes/forest.webp",
  // ...
];
```

### 3. favicon — `public/favicon.svg`

替换为你的 logo（建议 svg 或 64×64 png）。

### 4. 头像 — `public/images/avatar/`

放头像图后修改 `site.ts` 中的 `author.avatar` 字段。

### 5. OG 分享卡 — `public/images/og/og-default.png`

1200×630 PNG，分享到微信/X 时展示。可用 [og-image.vercel.app](https://og-image.vercel.app/) 生成。

## 🟡 Phase 5/6 完成后需要补的

### 6. Giscus 评论配置

1. 仓库 Settings → Features → 勾选 **Discussions**
2. 安装 [giscus app](https://github.com/apps/giscus) 到仓库
3. 访问 https://giscus.app 走配置向导（仓库填 `kkmjj0721/kkmjj0721.github.io`）
4. 复制四个 ID 到 `src/data/site.ts` 的 `giscus` 字段

### 7. BGM 音乐 — `public/audio/bgm/`

放 1-3 首 MP3 后修改 BGM 播放列表配置（Phase 4 提供）。

### 8. 404 插画 — `public/images/placeholders/404.placeholder.svg`

可选，替换为可爱的迷路插画。

## 🟢 持续创作时随时补

- 文章封面：`public/images/posts/<slug>.webp`
- 相册照片：`public/images/gallery/<date>/`
- 番剧/游戏封面：`public/images/tracking/<type>/<slug>.webp`
- 项目截图：`public/images/projects/<slug>.webp`
- 友链头像：`public/images/friends/<name>.webp`

## 🔧 域名切换（未来）

如果想用自定义域名（如 `myblog.com`）：

```diff
// src/data/site.ts
- siteUrl: 'https://kkmjj0721.github.io',
+ siteUrl: 'https://myblog.com',
```

然后在仓库根目录新建 `CNAME` 文件，内容是你的域名（不带 https）：

```
myblog.com
```

DNS 设置：

- A 记录: `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`
- AAAA 记录（IPv6 可选）: `2606:50c0:8000::153` 等
- CNAME 记录（用 www 子域名时）: `kkmjj0721.github.io`

详见 [GitHub 官方文档](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)。

## 🔍 如何快速找到所有占位？

```bash
# 找代码里所有 TODO 标记
grep -rn "TODO(" src/ public/

# 找所有 .placeholder. 文件
find public/ -name "*.placeholder.*"

# Phase 6 完成后:
npm run check:images
```
