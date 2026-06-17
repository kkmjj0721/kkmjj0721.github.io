---
title: Astro 是怎么把首页渲染成单屏 hero 的
description: 一篇笔记 · 关于如何用 100svh、负 margin、fixed header 三件套做一个干净的单屏首页。
pubDate: 2026-05-20
tags: ["Astro", "CSS", "前端"]
categories: ["技术笔记"]
series: "Astro 实战"
seriesOrder: 1
---

做博客首页的时候我想要的是：进入网站，背景图占满整个视口，**没有任何向下滚动的痕迹**。

听起来简单，但有几个坑要避开。

## 坑 1: 100vh 在移动端 Safari 会撑出滚动条

iOS Safari 会把地址栏的高度也算进 `100vh`，导致 100vh 比实际可见高度大几十像素。解决方案是用 `100svh`（small viewport height）：

```css
.hero {
  height: 100svh;
}
```

## 坑 2: Fixed header 占位条把内容推下去了

我的 Header 是 `position: fixed`，所以在它后面放了个占位，防止下面的内容被遮挡。但这样 hero 就被向下推了 3rem。

解决：让 hero 用负 margin 把自己拉回去：

```css
.hero {
  height: 100svh;
  margin-top: -3rem;
}
```

## 坑 3: Footer 仍然渲染在下面

即使 hero 是 100svh，下面还有 footer，仍然能滚动。所以给 BaseLayout 加了个 `hideFooter` prop：

```astro
{!hideFooter && <Footer />}
```

首页传 `<BaseLayout noContainer hideFooter>` 就完美单屏了。

## 完整代码

```astro
<section class="hero">
  <div class="bg" style="background-image: url(...)"></div>
  <div class="content">
    <h1>站点名</h1>
    <p>签名</p>
  </div>
</section>

<style>
  .hero {
    height: 100svh;
    margin-top: -3rem;
    position: relative;
    overflow: hidden;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```

就这样。
