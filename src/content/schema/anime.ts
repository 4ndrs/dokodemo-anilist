import { z } from "zod";

export const AnimeQuerySchema = z.object({
  data: z.object({
    Page: z.object({
      pageInfo: z.object({ hasNextPage: z.boolean() }),
      media: z.array(
        z.object({
          id: z.number(),
          title: z.object({ romaji: z.string() }),
          format: z.union([z.string(), z.null()]),
          startDate: z.object({ year: z.number().nullable() }),
          coverImage: z.object({ medium: z.string() }),
        }),
      ),
    }),
  }),
});

export type AnimeQuerySchema = z.infer<typeof AnimeQuerySchema>;
export type Anime = AnimeQuerySchema["data"]["Page"]["media"][number];
