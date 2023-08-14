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
        create: true,
        delete: true,
        fields: [
          { name: "title", widget: "string", label: "Episode Title" },
          { name: "audioUrl", widget: "string", label: "Audio URL" },
          { name: "pubDate", widget: "date", label: "Publish Date", format: "DD MMM YYYY" },
          { name: "body", widget: "markdown", label: "Episode Body" },
          { name: "cover", widget: "image", label: "Custom Cover URL" },
          { name: "duration", widget: "string", label: "Episode Duration (Format hh:mm:ss)" },
          { name: "size", widget: "number", label: "Episode Size (MB)", value_type: "float" },
          { name: "explicit", widget: "boolean", label: "Explicit" },
          { name: "episode", widget: "number", label: "Episode" },
          { name: "season", widget: "number", label: "Season" },
          {
            name: "episodeType",
            widget: "select",
            label: "Episode Type",
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
