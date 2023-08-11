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

import xml2js from 'xml2js';

export async function get(context) {
  let podcast = {
    rss: {
      $: {
        version: "2.0",
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
      },
      channel: [
        {
          title: ["Podcast Title"],
          link: ["http://www.podcastwebsite.com"],
          language: ["en-us"],
          "itunes:subtitle": ["A short description of your podcast"],
          "itunes:author": ["Author Name"],
          "itunes:summary": ["A full description of your podcast"],
          "itunes:image": [
            {
              $: {
                href: "http://www.podcastwebsite.com/podcast.jpg",
              },
            },
          ],
          item: [
            {
              title: ["Episode Title"],
              "itunes:author": ["Author Name"],
              "itunes:subtitle": ["A short description of the episode"],
              "itunes:summary": ["A full description of the episode"],
              "itunes:image": [
                {
                  $: {
                    href: "http://www.podcastwebsite.com/episode.jpg",
                  },
                },
              ],
              enclosure: [
                {
                  $: {
                    url: "http://www.podcastwebsite.com/episode.mp3",
                    length: "12345678",
                    type: "audio/mpeg",
                  },
                },
              ],
              guid: ["http://www.podcastwebsite.com/episode.mp3"],
              pubDate: ["Tue, 07 Feb 2012 00:00:00 GMT"],
              "itunes:duration": ["00:45:00"],
            },
          ],
        },
      ],
    },
  };

  let builder = new xml2js.Builder();
  let xml = builder.buildObject(podcast);

  return {
    body: xml,
  };
}
