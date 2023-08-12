import { z, defineCollection } from "astro:content";

const episodeSchema = z.object({
    title: z.string(),
    audioUrl: z.string(),
    duration: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    explicit: z.boolean().optional(),
    episode: z.number().optional(),
});

export type episodeSchema = z.infer<typeof episodeSchema>;

const episodeCollection = defineCollection({ schema: episodeSchema });

export const collections = {
    'episode': episodeCollection,
}