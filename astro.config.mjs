import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import NetlifyCMS from "astro-netlify-cms";
import dcapConfig from "./decap.config.mjs";
import astropodConfig from "./.astropod/astropod.config.json";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: astropodConfig.site,
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/admin",
        },
      ],
    }),
    mdx(),
    sitemap(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      cacheDir: "./.cache/image",
      logLevel: "debug",
    }),
    NetlifyCMS({
      config: dcapConfig(),
    }),
  ],
});
