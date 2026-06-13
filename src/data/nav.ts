/**
 * 导航菜单（完全体）
 * key: 唯一标识 + 用作 i18n 翻译 key
 * href: 路径，{lang} 会被替换为当前语言前缀
 */
export const nav = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects/" },
  { key: "archives", href: "/archives/" },
  { key: "gallery", href: "/gallery/" },
  { key: "music", href: "/music/" },
  { key: "inspiration", href: "/inspiration/" },
  { key: "moments", href: "/moments/" },
  { key: "essays", href: "/posts/" },
  { key: "friends", href: "/friends/" },
  { key: "about", href: "/about/" },
] as const;

export type NavItem = (typeof nav)[number];
