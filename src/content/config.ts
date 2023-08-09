import { z, defineCollection } from "astro:content";

const podcastSchema = z.object({
    title: z.string(),
    description: z.string(),
    audioUrl: z.string(),
    duration: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    badge: z.string().optional(),
    cover: z.string().optional(),
});

export type podcastSchema = z.infer<typeof podcastSchema>;

const podcastCollection = defineCollection({ schema: podcastSchema });

export const collections = {
    'podcast': podcastCollection,
}