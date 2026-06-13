---
title: 用 Markdown directives 写自定义提示框
description: "`:::tip` `:::warning` `:::spoiler` 怎么实现，和它们的细节。"
pubDate: 2026-03-10
tags: ["Markdown", "remark", "Astro"]
categories: ["技术笔记"]
series: "Astro 实战"
seriesOrder: 2
---

很多博客都有那种带颜色边框的提示框，叫 admonition / callout。Markdown 标准没有，但可以用 [remark-directive](https://github.com/remarkjs/remark-directive) 自己加。

## 用法

```markdown
:::tip 小贴士
这是一个 tip 块。
:::

:::warning
这是警告。标题省略时显示类型名。
:::

:::spoiler 剧透
默认模糊，悬停时才能看清。
:::
```

## 实现

写个 remark 插件，把 `containerDirective` 节点转成带 className 的 div。详见我源码里的 `src/plugins/remark-admonitions.mjs`。

核心代码：

```js
import { visit } from "unist-util-visit";

const KNOWN = new Set(["tip", "note", "warning", "danger", "spoiler"]);

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (!KNOWN.has(node.name)) return;
      node.data.hName = "div";
      node.data.hProperties = {
        className: ["admonition", `admonition-${node.name}`],
      };
    });
  };
}
```

剩下的全是 CSS 的事了。

## 注意

记得在 `astro.config.mjs` 里把 `remarkDirective` 放到 `remarkAdmonitions` 之前 —— 后者依赖前者解析出的 AST 节点。
