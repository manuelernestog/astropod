import xml2js from "xml2js";
import dayjs from "dayjs";
import astropodConfig from "../../astropod.config.json";

import { APIContext } from "astro";

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
          title: cdata(astropodConfig.name),
          description: cdata(astropodConfig.description),
          link: astropodConfig.link,
          copyright: cdata(astropodConfig.copyright),
          author: cdata(astropodConfig.author),
          generator: ["Astropod"],
          lastBuildDate: lastBuildDate,
          language: cdata(astropodConfig.language),
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
            title: cdata(astropodConfig.name),
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
          // item: [
          //   {
          //     title: ["Episode Title"],
          //     "itunes:author": ["Author Name"],
          //     "itunes:subtitle": ["A short description of the episode"],
          //     "itunes:summary": ["A full description of the episode"],
          //     "itunes:image": [
          //       {
          //         $: {
          //           href: "http://www.podcastwebsite.com/episode.jpg",
          //         },
          //       },
          //     ],
          //     enclosure: [
          //       {
          //         $: {
          //           url: "http://www.podcastwebsite.com/episode.mp3",
          //           length: "12345678",
          //           type: "audio/mpeg",
          //         },
          //       },
          //     ],
          //     guid: ["http://www.podcastwebsite.com/episode.mp3"],
          //     pubDate: ["Tue, 07 Feb 2012 00:00:00 GMT"],
          //     "itunes:duration": ["00:45:00"],
          //   },
          // ],
        },
      ],
    },
  };

  if (astropodConfig.category) {
    podcast.rss.channel[0].category = astropodConfig.category;
    podcast.rss.channel[0]["itunes:category"] = {
      $: {
        text: astropodConfig.category,
      },
    };
  }

  if (astropodConfig.fundingUrl) {
    const fundingUrl = isFullUrl(astropodConfig.fundingUrl)
      ? astropodConfig.fundingUrl
      : astropodConfig.link + astropodConfig.fundingUrl;
    podcast.rss.channel[0]["podcast:funding"] = {
      $: { url: fundingUrl },
      _: astropodConfig.fundingText,
    };
  }

  let builder = new xml2js.Builder();
  let xml = builder.buildObject(podcast);

  return {
    body: xml,
  };
}

function cdata(value) {
  return `<![CDATA[${value}]]>`;
}

function isFullUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

// import rss from "@astrojs/rss";
// import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
// import { getCollection } from "astro:content";
// const episode = await getCollection("episode");
// return rss({
//   title: SITE_TITLE,
//   description: SITE_DESCRIPTION,
//   site: import.meta.env.SITE,
//   items: episode.map((episode) => ({
//     title: episode.data.title,
//     pubDate: episode.data.pubDate,
//     description: episode.data.description,
//     link: `/episode/${episode.slug}/`,
//   })),
// });
