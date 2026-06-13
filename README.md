# my-blog

> 个人博客 · Astro + GitHub Pages · 毛玻璃风格 · 中英双语

## 🚀 快速开始

```bash
# 安装依赖（首次）
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── content/        # 9 个 Content Collections（posts/moments/gallery/...）
├── components/     # UI 组件
├── layouts/        # 页面布局
├── pages/          # 路由页面
├── data/site.ts    # 站点元数据（改这里！）
├── i18n/           # 中英双语
├── styles/         # 全局 CSS
└── utils/          # 工具函数

public/
├── images/         # 所有图片资源（占位图在 placeholders/）
├── audio/bgm/      # BGM 音乐文件
└── fonts/          # 本地字体
```

## 🎨 个性化

### 1. 改站点信息

打开 `src/data/site.ts`，把所有 `TODO(content)` 标记的字段改成你自己的。

### 2. 改图片

所有需要替换的图片都标记为 `*.placeholder.svg`。详见 [IMAGES.md](./IMAGES.md)。

### 3. 改主色

访问首页右上角的 🎨 图标 → 从 6 个预设色中选择，或用自定义色。颜色会保存到 localStorage。

### 4. 切换深色/浅色模式

点击右上角的 🌙/☀️ 图标。

### 5. 中英文切换

点击右上角的 EN/中 按钮。

## ✍️ 写文章

```bash
npm run new       # 交互式创建新文章（Phase 6 完成）
```

或手动在 `src/content/posts/zh/` 下新建 `.md` 文件，按以下 frontmatter:

```yaml
---
title: 我的第一篇文章
description: 简短描述（用于 SEO 和列表预览）
pubDate: 2026-06-12
tags: ["Astro", "博客"]
categories: ["技术笔记"]
draft: false
---
正文内容...
```

## 🚢 部署到 GitHub Pages

1. 在 GitHub 创建仓库 `kkmjj0721.github.io`
2. 推送本地代码: `git push origin main`
3. 仓库 Settings → Pages → Source 选 **GitHub Actions**
4. GitHub Actions 自动构建并部署，等几分钟访问 https://kkmjj0721.github.io 即可

## 🧩 阶段路线图

- [x] Phase 1: 骨架与脚手架
- [ ] Phase 2: 内容系统（文章 / 标签 / 归档 / RSS）
- [ ] Phase 3: 文章功能（TOC / KaTeX / Mermaid / Admonitions）
- [ ] Phase 4: 互动控件（拾色器 / 烟花 / BGM / 涂鸦）
- [ ] Phase 5: 模块页面（相册 / 追番 / 友链 / 项目）
- [ ] Phase 6: 搜索 / 评论 / CI / 部署

## 📚 进一步阅读

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Pagefind 搜索](https://pagefind.app)
- [Giscus 评论](https://giscus.app)
