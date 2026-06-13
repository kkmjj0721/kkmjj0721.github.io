/**
 * 导航菜单
 * key: 唯一标识 + 用作 i18n 翻译 key
 * href: 本项目内实际存在的 Astro 路由
 * match: 可选的当前页匹配前缀
 */
export const nav = [
  { key: "home", href: "/", icon: "mdi:home-outline" },
  { key: "projects", href: "/projects/", icon: "mdi:source-branch" },
  { key: "archives", href: "/archives/", icon: "mdi:timeline-clock-outline" },
  { key: "gallery", href: "/gallery/", icon: "mdi:image-multiple-outline" },
  {
    key: "tracking",
    href: "/tracking/anime/",
    match: "/tracking/",
    icon: "mdi:radar",
  },
  { key: "moments", href: "/moments/", icon: "mdi:message-processing-outline" },
  { key: "essays", href: "/posts/", icon: "mdi:text-box-edit-outline" },
  { key: "friends", href: "/friends/", icon: "mdi:account-group-outline" },
  { key: "about", href: "/about/", icon: "mdi:account-circle-outline" },
] as const;

export type NavItem = (typeof nav)[number];
