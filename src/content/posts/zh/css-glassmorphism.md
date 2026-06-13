---
title: 一些 CSS 毛玻璃技巧
description: backdrop-filter 在 Safari 的兼容性、降级方案、性能优化。
pubDate: 2026-04-15
tags: ["CSS", "毛玻璃", "前端"]
categories: ["技术笔记"]
---

毛玻璃（Glassmorphism）是个老套但好用的设计风格。

## 基础写法

```css
.glass {
  background: rgb(255 255 255 / 0.5);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 1rem;
}
```

`saturate(180%)` 是关键，没有它，模糊后的颜色会显得很灰。

## 降级

老 Safari 不支持 `backdrop-filter`，加一层 `@supports` 兜底：

```css
@supports not (backdrop-filter: blur(20px)) {
  .glass {
    background: rgb(255 255 255 / 0.92);
  }
}
```

## 性能

`backdrop-filter` 在低端机上会卡。如果一个页面有 10+ 个毛玻璃元素，可以考虑：

1. 减少模糊半径（`blur(10px)` 而不是 `blur(40px)`）
2. 给容器加 `will-change: transform` 触发 GPU 合成
3. 在 `prefers-reduced-motion` 用户上禁用模糊

## 我的最爱

最后这个变体，把它叫做"软玻璃"，背景透明度更高一点：

```css
.glass-soft {
  background: rgb(255 255 255 / 0.35);
  backdrop-filter: blur(10px);
}
```

适合放在背景图上的小卡片。
