import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts, postUrl } from "@utils/posts";
import { site } from "@data/site";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts("zh");
  return rss({
    title: site.title.zh,
    description: site.description.zh,
    site: context.site ?? site.siteUrl,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description ?? "",
      link: postUrl(p),
      categories: [...p.data.categories, ...p.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
    stylesheet: "/rss/style.xsl",
  });
}
