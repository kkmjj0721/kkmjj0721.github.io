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

本地如需预览现有未验证 BGM，可运行 `PUBLIC_ENABLE_UNVERIFIED_BGM=true npm run dev`。生产部署默认不要设置该变量；只有 `licenseStatus: "verified"` 的曲目才会默认渲染。

## 📁 项目结构

```
src/
├── content/        # 9 个 Content Collections（posts/moments/gallery/...）
├── components/     # UI 组件
├── layouts/        # 页面布局（BaseLayout 挂载全站 SharedBackground）
├── pages/          # 路由页面
├── data/site.ts    # 站点元数据（改这里！）
├── i18n/           # 中英双语
├── styles/         # 全局 CSS
└── utils/          # 工具函数

public/
├── images/         # 所有图片资源（占位图在 placeholders/，全站背景视频/poster 在 backgrounds/）
├── audio/bgm/      # 用户提供/待替换 BGM 资源；默认不在首页 UI 暴露
└── fonts/          # 本地字体
```

## 🎨 个性化

### 1. 改站点信息

站点名称、作者、社交入口、评论开关等信息集中维护在 `src/data/site.ts`。发布前按当前站点实际状态校对这些字段，并在私有配置变更后重新运行 lint 与构建。

### 2. 改图片

所有需要替换的图片都标记为 `*.placeholder.svg`。详见 [IMAGES.md](./IMAGES.md)。

### 3. 改主色

首页 `HomeDashboard` 的“界面偏好”面板提供品牌色预设色块；当前没有自定义颜色输入，也没有 Header 主色控制。选择会保存到 localStorage。

### 4. 切换深色/浅色模式

首页 `HomeDashboard` 的“界面偏好”面板提供亮色 / 暗色 / 自动按钮；当前 Header 只包含导航和移动端菜单。

### 5. 中英文切换

中文默认路由是 `/`，英文路由是 `/en/`；当前 Header 没有语言切换按钮。

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
- [x] Phase 2: 内容系统（文章 / 标签 / 归档 / RSS）
- [x] Phase 3: 文章功能（TOC / KaTeX / Mermaid / Admonitions / 嵌入组件 / 系列文章）
- [x] Phase 4: 互动控件与视觉打磨（主题、主色、BackToTop、点赞、Cookie、指针动效、阅读位置、涂鸦板、隐私页、移动菜单焦点陷阱已实现；BGM 资源保留但首页播放 UI 默认关闭，待来源/授权确认或替换后再启用）
- [x] Phase 5: 模块页面路由（相册 / 动态 / 追番 / 游戏 / 读书 / 电影 / 友链 / 项目 / 关于；内容通过 `src/content/` 按集合维护）
- [x] Phase 6: 搜索 / 评论 / CI / 部署（Pagefind、受保护的 Giscus 入口、npm 脚本、GitHub Actions 已实现；Giscus ID 和私有配置按部署环境维护）

## 🔧 自动化与私有配置状态

- 已有 npm 脚本：`new` / `new:moment` / `new:gallery` / `compress` / `subset-fonts` / `check:images` / `lint` / `build`
- 已有 GitHub Actions：`deploy.yml`、`checks.yml`、`pr-preview.yml`，均使用 npm
- 私有配置维护项：个人信息、图片资源、社交/邮箱入口、Giscus `repoId` / `categoryId` / `guestbookCategoryId`
- 当前实现会在 Giscus 未配置时显示保护提示，不会加载无效评论脚本
- 发布验证：`npm run lint`、`npm run build`、路由检查、widgets/like button、BGM HTML 排除、reduced-motion/search focus/stale sweep 均已通过

## 📚 进一步阅读

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Pagefind 搜索](https://pagefind.app)
- [Giscus 评论](https://giscus.app)
