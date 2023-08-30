import astropodConfig from "./.astropod/astropod.config.json";
import languageList from "./src/helpers/languagesList.json";
import podcastMainCategories from "./src/helpers/podcastMainCategories.json";
import themes from "./src/helpers/themes.json";

export default function dcapconfig() {
  const config = {
    logo_url: "/cmsBanner.svg",
    backend: {
      name: "git-gateway",
      branch: "main",
    },
    collections: [
      {
        name: "episodes",
        label: "Episodes",
        label_singular: "Episode",
        folder: "src/content/episode",
        sortable_fields: ["title", "pubDate", "episode", "season"],
        create: true,
        delete: true,
        fields: [
          { name: "title", widget: "string", label: "Episode Title" },
          { name: "audioUrl", widget: "string", label: "Audio URL" },
          { name: "pubDate", widget: "date", label: "Publish Date", format: "DD MMM YYYY" },
          { name: "body", widget: "markdown", label: "Episode Body", required: false },
          {
            name: "duration",
            widget: "string",
            label: "Episode Duration",
            pattern: [
              "^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]$|^[0-5]?[0-9]:[0-5]?[0-9]$",
              "Must have format hh:mm:ss or mm:ss",
            ],
          },
          { name: "size", widget: "number", label: "Episode Size (MB)", value_type: "float" },
          { name: "cover", widget: "image", label: "Custom Cover URL", required: false },
          { name: "explicit", widget: "boolean", label: "Explicit", required: false, default: astropodConfig.explicit },
          { name: "episode", widget: "number", label: "Episode", required: false },
          { name: "season", widget: "number", label: "Season", required: false },
          {
            name: "episodeType",
            widget: "select",
            label: "Episode Type",
            default: "full",
            options: [
              { label: "Full", value: "full" },
              { label: "Trailer", value: "trailer" },
              { label: "Bonus", value: "bonus" },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "Settings",
        files: [
          {
            name: "general",
            label: "General",
            file: ".astropod/astropod.config.json",
            fields: [
              { name: "name", widget: "string", label: "Name" },
              { name: "description", widget: "text", label: "Description" },
              { name: "link", widget: "string", label: "Link" },
              { name: "cover", widget: "image", label: "Cover | Recomended Size 1400x1400" },
              { name: "banner", widget: "image", label: "Banner | Recomended Size 960x320" },
              { name: "favicon", widget: "image", label: "Favicon" },

              { name: "author", widget: "string", label: "Author" },
              {
                name: "email",
                widget: "string",
                label: "email",
                pattern: ["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$", "Please enter a valid email address"],
              },
              { name: "owner", widget: "string", label: "Owner", required: false },
              { name: "copyright", widget: "string", label: "Copyright", required: false },
              {
                name: "language",
                widget: "select",
                label: "Language",
                default: "en",
                options: languageList,
              },
              {
                name: "category",
                widget: "select",
                label: "Category",
                multiple: true,
                options: podcastMainCategories,
                max: 3,
              },
              { name: "explicit", widget: "boolean", label: "Explicit", default: false },
              {
                name: "theme",
                widget: "select",
                label: "Web Site Theme",
                options: themes,
              },
              { name: "pageSize", widget: "number", label: "Episodes per page" },
              { name: "feedSize", widget: "number", label: "Feed Size (Empty for include all episodes)", required: false },
              { name: "fundingUrl", widget: "string", label: "Funding Url", required: false },
              { name: "fundingText", widget: "string", label: "Funding Text", required: false },
            ],
          },
          {
            name: "listenOn",
            label: "Listen On",
            file: ".astropod/listenOn.config.json",
            fields: [
              { name: "acastPodcasts", widget: "string", label: "Acast Podcasts", required: false },
              { name: "spotify", widget: "string", label: "Spotify", required: false },
              { name: "googlePodcast", widget: "string", label: "Google Podcast", required: false },
              { name: "applePodcast", widget: "string", label: "Apple Podcast", required: false },
              { name: "easyPodcast", widget: "string", label: "Easy Podcast", required: false },
              { name: "amazonMusic", widget: "string", label: "Amazon Music", required: false },
              { name: "fountain", widget: "string", label: "Fountain", required: false },
              { name: "ivoox", widget: "string", label: "iVoox", required: false },
              { name: "pocketcasts", widget: "string", label: "Pocket Casts", required: false },
              { name: "deezer", widget: "string", label: "Deezer", required: false },
            ],
          },
          {
            name: "follow",
            label: "Social Links",
            file: ".astropod/social.config.json",
            fields: [
              { name: "facebook", widget: "string", label: "Facebook", required: false },
              { name: "twitter", widget: "string", label: "Twitter", required: false },
              { name: "youtube", widget: "string", label: "YouTube", required: false },
              { name: "instagram", widget: "string", label: "Instagram", required: false },
              { name: "github", widget: "string", label: "Github", required: false },
              { name: "telegram", widget: "string", label: "Telegram", required: false },
              { name: "linkedin", widget: "string", label: "LinkedIn", required: false },
              { name: "newsletter", widget: "string", label: "Newsletter", required: false },
            ],
          },
        ],
      },
    ],
    disableIdentityWidgetInjection: true,
  };
  return config;
}
