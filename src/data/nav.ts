/**
 * 导航菜单（完全体）
 * key: 唯一标识 + 用作 i18n 翻译 key
 * href: 路径，{lang} 会被替换为当前语言前缀
 */
export const nav = [
  { key: "home", href: "/" },
  { key: "posts", href: "/posts/" },
  { key: "categories", href: "/categories/" },
  { key: "tags", href: "/tags/" },
  { key: "archives", href: "/archives/" },
  { key: "gallery", href: "/gallery/" },
  { key: "projects", href: "/projects/" },
  {
    key: "tracking",
    href: "/tracking/anime/",
    children: [
      { key: "anime", href: "/tracking/anime/" },
      { key: "games", href: "/tracking/games/" },
      { key: "books", href: "/tracking/books/" },
      { key: "movies", href: "/tracking/movies/" },
    ],
  },
  { key: "moments", href: "/moments/" },
  { key: "friends", href: "/friends/" },
  { key: "guestbook", href: "/guestbook/" },
  { key: "about", href: "/about/" },
] as const;

export type NavItem = (typeof nav)[number];
