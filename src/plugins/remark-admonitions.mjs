/**
 * 自定义 admonition 解析
 * ─────────────────────────────────────────────
 * 用法 (Markdown):
 *   :::tip 标题（可选）
 *   内容...
 *   :::
 * 支持类型: tip / note / warning / danger / spoiler
 */
import { visit } from "unist-util-visit";

const KNOWN = new Set(["tip", "note", "warning", "danger", "spoiler"]);

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (!KNOWN.has(node.name)) return;
        const data = node.data || (node.data = {});
        const tag = node.type === "textDirective" ? "span" : "div";
        data.hName = tag;
        data.hProperties = {
          className: ["admonition", `admonition-${node.name}`],
        };
        // 提取首行作为标题
        const labelChildren =
          node.attributes && node.attributes.title
            ? [{ type: "text", value: node.attributes.title }]
            : [{ type: "text", value: node.name.toUpperCase() }];
        node.children.unshift({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: { className: ["admonition-title"] },
          },
          children: labelChildren,
        });
      }
    });
  };
}
