import xml2js from "xml2js";
import dayjs from "dayjs";
import astropodConfig from "../../.astropod/astropod.config.json";
import { getCollection } from "astro:content";
let episode = await getCollection("episode");
episode.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
if (astropodConfig.feedSize) episode = episode.slice(0, astropodConfig.feedSize);

import { marked } from "marked";

const lastBuildDate = dayjs().format("ddd, DD MMM YYYY hh:mm:ss ZZ");
const cover = isFullUrl(astropodConfig.cover) ? astropodConfig.cover : astropodConfig.link + astropodConfig.cover;

export async function get(context) {
  let podcast = {
    rss: {
      $: {
        version: "2.0",
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "xmlns:podcast": "https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md",
        "xmlns:atom": "http://www.w3.org/2005/Atom",
        "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      },
      channel: [
        {
          title: astropodConfig.name,
          description: astropodConfig.description,
          link: astropodConfig.link,
          copyright: astropodConfig.copyright,
          author: astropodConfig.author,
          generator: ["Astropod"],
          lastBuildDate: lastBuildDate,
          language: astropodConfig.language,
          "itunes:author": astropodConfig.author,
          "itunes:image": { $: { href: cover } },
          "itunes:summary": astropodConfig.description,
          "itunes:type": "episodic",
          "itunes:explicit": astropodConfig.explicit,
          "itunes:owner": {
            "itunes:name": astropodConfig.owner,
            "itunes:email": astropodConfig.email,
          },
          image: {
            link: astropodConfig.link,
            title: astropodConfig.name,
            url: cover,
          },
          "atom:link": [
            {
              $: {
                href: `${astropodConfig.link}/rss.xml`,
                rel: "self",
                type: "application/rss+xml",
              },
            },
            {
              $: {
                href: `https://pubsubhubbub.appspot.com/`,
                rel: "hub",
                type: "application/rss+xml",
              },
            },
          ],
        },
      ],
    },
  };

  podcast.rss.channel[0].category = astropodConfig.category.map((category) => category);
  podcast.rss.channel[0]["itunes:category"] = astropodConfig.category.map((category) => ({
    $: {
      text: category,
    },
  }));

  // podcast.rss.channel[0]["itunes:category"] = {
  //   $: {
  //     text: astropodConfig.category,
  //   },
  // };

  if (astropodConfig.fundingUrl) {
    const fundingUrl = isFullUrl(astropodConfig.fundingUrl)
      ? astropodConfig.fundingUrl
      : astropodConfig.link + astropodConfig.fundingUrl;
    podcast.rss.channel[0]["podcast:funding"] = {
      $: { url: fundingUrl },
      _: astropodConfig.fundingText,
    };
  }

  const items = episode.map((episode) => {
    let item = {
      title: episode.data.title,
      description: marked.parse(episode.body),
      pubDate: dayjs(episode.data.pubDate).format("ddd, DD MMM YYYY hh:mm:ss ZZ"),
      link: `${astropodConfig.link}/episode/${episode.slug}/`,
      guid: `${astropodConfig.link}/episode/${episode.slug}/`,
      "itunes:episode": episode.data.episode,
      "itunes:season": episode.data.season,
      "itunes:episodeType": episode.data.episodeType,
      "itunes:explicit": episode.data.explicit === undefined ? astropodConfig.explicit : episode.data.explicit,
      enclosure: {
        $: {
          url: isFullUrl(episode.data.audioUrl) ? episode.data.audioUrl : astropodConfig.link + episode.data.audioUrl,
          length: episode.data.size && episode.data.size * 1000000,
          type: "audio/mpeg",
        },
      },
      "itunes:duration": episode.data.duration,
    };
    const cover_url = episode.data.cover ? episode.data.cover : astropodConfig.cover;
    item["itunes:image"] = {
      $: { href: isFullUrl(cover_url) ? cover_url : astropodConfig.link + cover_url },
    };
    return item;
  });

  podcast.rss.channel[0].item = items;

  let builder = new xml2js.Builder({cdata: true});
  let xml = builder.buildObject(podcast);

  return {
    body: xml,
  };
}

function isFullUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}