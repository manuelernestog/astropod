import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";

export async function get(context) {
  const episode = await getCollection("episode");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: episode.map((episode) => ({
      title: episode.data.title,
      pubDate: episode.data.pubDate,
      description: episode.data.description,
      link: `/episode/${episode.slug}/`,
    })),
  });
}
