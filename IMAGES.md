# 图片占位指南

> 所有以 `.placeholder.svg` 结尾的文件 / 含 `TODO(image)` 注释的位置都是占位图，请按需替换。

## 🎯 替换原则

1. **不改路径** — 把新图放到 `public/images/<分类>/` 下，然后修改对应组件里的 `src` 路径即可。
2. **保持尺寸/长宽比** — 见下表的"推荐尺寸"。
3. **优先 WebP/AVIF** — 体积小，浏览器支持广。`npm run compress` 可批量转换。
4. **保留原图备份** — 可在仓库外保存大图原片，仓库内只放压缩版。

## 📋 占位清单

### 必换 — 上线前

| 槽位                       | 当前路径                                                | 推荐尺寸         | 格式     | 说明                                                                                            |
| -------------------------- | ------------------------------------------------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------- |
| 首页 hero 背景（5-10张池） | `public/images/placeholders/hero-*.placeholder.svg`     | 1920×1080        | webp     | 放到 `public/images/heroes/`，然后改 `src/components/home/HeroSection.astro` 的 `heroPool` 数组 |
| 头像                       | `public/images/placeholders/avatar.placeholder.svg`     | 200×200 (square) | webp/png | 改 `src/data/site.ts` 中的 `author.avatar`                                                      |
| favicon                    | `public/favicon.svg`                                    | 64×64            | svg      | 改 svg 内容或换成你自己的                                                                       |
| OG 分享卡（默认）          | `public/images/placeholders/og-default.placeholder.svg` | 1200×630         | png      | 用于分享到微信/X 等的预览图                                                                     |
| 404 插画                   | `public/images/placeholders/404.placeholder.svg`        | 600×400          | png      | 改 `src/pages/404.astro` 中的 `<img src>`                                                       |

### 按需 — 创建文章/相册时

| 槽位                    | 路径                                        | 推荐尺寸       | 格式 |
| ----------------------- | ------------------------------------------- | -------------- | ---- |
| 文章封面                | `public/images/posts/<slug>.webp`           | 1600×900       | webp |
| 文章 OG 图              | 同上，自动复用封面                          | 1200×630       | webp |
| 相册照片                | `public/images/gallery/<date>/`             | 不限           | webp |
| 番剧/游戏/读书/电影封面 | `public/images/tracking/<type>/<slug>.webp` | 300×450 (海报) | webp |
| 项目截图                | `public/images/projects/<slug>.webp`        | 1280×720       | webp |
| 友链头像                | `public/images/friends/<name>.webp`         | 100×100        | webp |
| BGM 封面                | `public/images/bgm/<song>.webp`             | 300×300        | webp |

## 🛠️ 替换流程示例

### 替换首页 hero 图

```bash
# 1. 把你的 5 张图放到 public/images/heroes/ 下
cp ~/Pictures/hero1.jpg public/images/heroes/dawn.webp
cp ~/Pictures/hero2.jpg public/images/heroes/forest.webp
# ... 以此类推

# 2. 压缩（可选但推荐）
npm run compress

# 3. 编辑 src/components/home/HeroSection.astro，修改 heroPool 数组
```

修改后的 `heroPool`:

```ts
const heroPool = [
  "/images/heroes/dawn.webp",
  "/images/heroes/forest.webp",
  "/images/heroes/ocean.webp",
];
```

### 替换头像

只需把图片放到 `public/images/avatar/me.webp`，然后改 `src/data/site.ts`:

```ts
avatar: '/images/avatar/me.webp',
```

## 🔍 查找所有未替换的占位

```bash
# 查找代码中所有 TODO(image) 标记
grep -rn "TODO(image)" src/

# 查找仍在使用的 .placeholder. 文件
grep -rn "\.placeholder\." src/

# 或运行专门的检查脚本（Phase 6 提供）
npm run check:images
```

## 💡 图片优化建议

- **首屏图片** ≤ 200 KB
- **文章内联图** ≤ 300 KB
- **相册图** ≤ 500 KB（带懒加载）
- 优先 WebP（兼容性 95%+），不行再 AVIF + WebP 双备份
- 使用 `<Image>` 组件自动多尺寸（Astro 内置）
- 大图（>1MB）放外部图床（GitHub 另一个仓库 + jsDelivr）
