/**
 * 站点核心元数据
 * ──────────────────────────────────────────────
 * TODO(content): 把以下字段都改成你自己的
 * 未来切换自定义域名: 只改 siteUrl + base（如果是项目页面）+ 仓库根放 CNAME
 */
export const site = {
  /** 站点 URL（部署后访问的地址）*/
  siteUrl: "https://kkmjj0721.github.io",

  /** GitHub 仓库地址（用于 Giscus / 源码链接 / RSS 等）*/
  repoUrl: "https://github.com/kkmjj0721/kkmjj0721.github.io",

  /** 站点名（zh/en 双语）*/
  title: {
    zh: "奈奈奈奈奈绪の博客", // TODO(content): 改为你的站点名
    en: "Stellar Corridor",
  },

  /** 站点副标题 / 一句话签名 */
  subtitle: {
    zh: "一个记录代码、生活与喜欢的事物的小角落",
    en: "A little corner of code, life, and things I love",
  },

  /** 默认描述（用于 SEO）*/
  description: {
    zh: "kk 的个人博客，分享技术笔记、生活随笔、摄影作品与番剧游戏评测。",
    en: "kk's personal blog. Tech notes, life essays, photography, and reviews of anime & games.",
  },

  /** 作者信息 */
  author: {
    name: {
      zh: "kk",
      en: "kk",
    },
    nameAlias: {
      zh: "小小的代码工匠",
      en: "A tiny code crafter",
    },
    bio: {
      zh: "写一点代码，记一点生活。",
      en: "I write a little code, I keep a little log.",
    },
    /** 头像（占位，后期替换 public/images/avatar/avatar.png）*/
    avatar: "/images/placeholders/avatar.placeholder.svg",
    /** 邮箱 */
    email: "your-email@example.com", // TODO(content)
  },

  /** 社交链接：set show:false 可隐藏 */
  social: [
    {
      name: "GitHub",
      icon: "mdi:github",
      url: "https://github.com/kkmjj0721",
      show: true,
    },
    {
      name: "X (Twitter)",
      icon: "simple-icons:x",
      url: "https://x.com/your-handle",
      show: false,
    }, // TODO(content)
    {
      name: "Bilibili",
      icon: "simple-icons:bilibili",
      url: "https://space.bilibili.com/your-id",
      show: false,
    }, // TODO(content)
    {
      name: "QQ",
      icon: "simple-icons:tencentqq",
      url: "tencent://message/?uin=12345678",
      show: false,
    }, // TODO(content)
    {
      name: "Email",
      icon: "mdi:email",
      url: "mailto:your-email@example.com",
      show: true,
    }, // TODO(content)
    { name: "RSS", icon: "mdi:rss", url: "/rss.xml", show: true },
  ],

  /** 默认主色 + 可切换的预设色板（用于首页主色拾色器）*/
  brand: {
    /** 默认主色（rgb 三元组，不带括号，便于 Tailwind 透明度合成）*/
    default: "#7c3aed",
    presets: [
      { name: "Violet", value: "#7c3aed" },
      { name: "Indigo", value: "#4f46e5" },
      { name: "Sky", value: "#0ea5e9" },
      { name: "Emerald", value: "#10b981" },
      { name: "Amber", value: "#f59e0b" },
      { name: "Rose", value: "#f43f5e" },
    ],
  },

  /** Giscus 评论配置（Phase 5/6 才会真正用上，先留位）*/
  giscus: {
    repo: "kkmjj0721/kkmjj0721.github.io", // TODO(content): 启用 Discussions 后替换
    repoId: "TODO_REPO_ID",
    category: "General",
    categoryId: "TODO_CATEGORY_ID",
    guestbookCategory: "Guestbook",
    guestbookCategoryId: "TODO_GUESTBOOK_CATEGORY_ID",
    mapping: "pathname",
    reactionsEnabled: "1",
    inputPosition: "top",
    loading: "lazy",
  },

  /** 备案号（中国大陆站点需要，国外可留空）*/
  icp: "",

  /** 站点开始运行的日期（用于「已运行 XXX 天」展示）*/
  startedAt: "2026-06-12",

  /** 默认许可证 */
  license: "CC-BY-NC-SA-4.0",
} as const;

export type SiteConfig = typeof site;
