import astropodConfig from "./astropod.config.json";

export default function dcapconfig() {
  const config = {
    backend: {
      name: "astropod",
      branch: "main",
    },
    collections: [
      {
        name: "episodes",
        label: "Episodes",
        label_singular: "Episode",
        folder: "src/content/episode",
        sortable_fields: ['title', 'pubDate', 'episode','season'],
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
            name: "podcast",
            label: "Podcast",
            file: "astropod.config.json",
            fields: [{ name: "name", widget: "string", label: "Name" }],
          },
        ],
      },
    ],
    disableIdentityWidgetInjection: true,
  };
  return config;
}
