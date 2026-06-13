/**
 * UI 文案翻译表
 * 增加新词条时同时补 zh + en，保持 key 对齐
 */
export const languages = {
  zh: "中文",
  en: "English",
} as const;

export const defaultLang = "zh" as const;
export type Lang = keyof typeof languages;

export const ui: Record<Lang, Record<string, string>> = {
  zh: {
    // 导航
    "nav.home": "首页",
    "nav.posts": "文章",
    "nav.categories": "分类",
    "nav.tags": "标签",
    "nav.archives": "归档",
    "nav.gallery": "照片墙",
    "nav.projects": "项目",
    "nav.music": "音乐",
    "nav.inspiration": "灵感",
    "nav.tracking": "追踪",
    "nav.anime": "番剧",
    "nav.games": "游戏",
    "nav.books": "读书",
    "nav.movies": "电影",
    "nav.moments": "说说",
    "nav.essays": "杂谈",
    "nav.friends": "友链",
    "nav.guestbook": "留言板",
    "nav.about": "关于",
    // 通用
    "common.search": "搜索",
    "common.readMore": "阅读全文",
    "common.readingTime": "约 {min} 分钟",
    "common.words": "{count} 字",
    "common.publishedAt": "发布于",
    "common.updatedAt": "更新于",
    "common.prevPost": "上一篇",
    "common.nextPost": "下一篇",
    "common.relatedPosts": "相关推荐",
    "common.tableOfContents": "目录",
    "common.backToTop": "返回顶部",
    "common.loadComments": "点击加载评论",
    "common.toggleTheme": "切换主题",
    "common.toggleLang": "切换语言",
    "common.pickColor": "主色调",
    // 首页
    "home.welcome": "欢迎",
    "home.viewAll": "查看全部",
    "home.latestPosts": "最新文章",
    "home.featuredProjects": "精选项目",
    "home.dashboard.eyebrow": "个人仪表盘",
    "home.dashboard.actions": "首页主要操作",
    "home.dashboard.startReading": "开始阅读",
    "home.dashboard.socials": "社交链接",
    "home.dashboard.searchLabel": "搜索入口",
    "home.dashboard.searchPlaceholder": "搜索文章、标签或分类",
    "home.dashboard.stats": "站点统计",
    "home.dashboard.stat.posts": "文章",
    "home.dashboard.stat.categories": "分类",
    "home.dashboard.stat.tags": "标签",
    "home.dashboard.stat.days": "运行天数",
    "home.dashboard.feed": "内容更新",
    "home.dashboard.noPosts": "暂时没有文章，新的记录会显示在这里。",
    "home.dashboard.shortcuts": "模块入口",
    "home.dashboard.modules": "探索更多",
    "home.dashboard.module.gallery":
      "相册还在整理中，之后会放旅行、日常和截图。",
    "home.dashboard.module.projects":
      "项目入口已预留，后续会展示正在维护的作品。",
    "home.dashboard.module.tracking":
      "番剧、游戏、读书和电影记录会汇总到这里。",
    "home.dashboard.module.moments":
      "短动态入口已预留，用来记录碎片想法和近况。",
    "home.dashboard.placeholder": "待添加",
    // 状态
    "status.draft": "草稿",
    "status.scheduled": "定时发布",
    "status.sticky": "置顶",
    // 404
    "404.title": "迷路了？",
    "404.subtitle": "这片星海里似乎没有你想找的页面",
    "404.goHome": "回到首页",
    // 隐私
    "cookie.notice":
      "本站使用 localStorage 保存你的偏好设置（主题/语言/主色）。不收集任何个人信息。",
    "cookie.accept": "我知道了",
  },
  en: {
    "nav.home": "Home",
    "nav.posts": "Posts",
    "nav.categories": "Categories",
    "nav.tags": "Tags",
    "nav.archives": "Archives",
    "nav.gallery": "Photo Wall",
    "nav.projects": "Projects",
    "nav.music": "Music",
    "nav.inspiration": "Inspiration",
    "nav.tracking": "Tracking",
    "nav.anime": "Anime",
    "nav.games": "Games",
    "nav.books": "Books",
    "nav.movies": "Movies",
    "nav.moments": "Moments",
    "nav.essays": "Essays",
    "nav.friends": "Friends",
    "nav.guestbook": "Guestbook",
    "nav.about": "About",
    "common.search": "Search",
    "common.readMore": "Read more",
    "common.readingTime": "~{min} min read",
    "common.words": "{count} words",
    "common.publishedAt": "Published",
    "common.updatedAt": "Updated",
    "common.prevPost": "Previous",
    "common.nextPost": "Next",
    "common.relatedPosts": "Related posts",
    "common.tableOfContents": "Table of contents",
    "common.backToTop": "Back to top",
    "common.loadComments": "Click to load comments",
    "common.toggleTheme": "Toggle theme",
    "common.toggleLang": "Switch language",
    "common.pickColor": "Brand color",
    "home.welcome": "Welcome",
    "home.viewAll": "View all",
    "home.latestPosts": "Latest posts",
    "home.featuredProjects": "Featured projects",
    "home.dashboard.eyebrow": "Personal dashboard",
    "home.dashboard.actions": "Home actions",
    "home.dashboard.startReading": "Start reading",
    "home.dashboard.socials": "Social links",
    "home.dashboard.searchLabel": "Search entry",
    "home.dashboard.searchPlaceholder": "Search posts, tags, or categories",
    "home.dashboard.stats": "Site stats",
    "home.dashboard.stat.posts": "Posts",
    "home.dashboard.stat.categories": "Categories",
    "home.dashboard.stat.tags": "Tags",
    "home.dashboard.stat.days": "Days online",
    "home.dashboard.feed": "Content feed",
    "home.dashboard.noPosts": "No posts yet. New notes will appear here.",
    "home.dashboard.shortcuts": "Module entry",
    "home.dashboard.modules": "Explore more",
    "home.dashboard.module.gallery":
      "Gallery is reserved for trips, daily photos, and screenshots.",
    "home.dashboard.module.projects":
      "Projects entry is ready for maintained work and experiments.",
    "home.dashboard.module.tracking":
      "Anime, games, books, and movies will be collected here.",
    "home.dashboard.module.moments":
      "Moments is reserved for short notes and recent updates.",
    "home.dashboard.placeholder": "Soon",
    "status.draft": "Draft",
    "status.scheduled": "Scheduled",
    "status.sticky": "Pinned",
    "404.title": "Lost in the stars?",
    "404.subtitle": "The page you're looking for isn't out here.",
    "404.goHome": "Back to home",
    "cookie.notice":
      "This site uses localStorage to remember your preferences (theme/language/color). No personal data is collected.",
    "cookie.accept": "Got it",
  },
};

/** 从 URL 提取语言 */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  if (segment in languages) return segment as Lang;
  return defaultLang;
}

/** 翻译函数工厂 */
export function useTranslations(lang: Lang) {
  return function t(
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    let str = ui[lang][key] ?? ui[defaultLang][key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}

/** 为当前语言构造路径 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean}`.replace(/\/+/g, "/");
}

/** 切换语言时保持当前页面路径 */
export function switchLang(currentUrl: URL, targetLang: Lang): string {
  const { pathname } = currentUrl;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && parts[0] in languages) parts.shift();
  const rest = "/" + parts.join("/");
  return targetLang === defaultLang
    ? rest === "/"
      ? "/"
      : rest
    : `/${targetLang}${rest}`;
}
