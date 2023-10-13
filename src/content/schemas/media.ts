import { z } from "zod";

export const MediaQuerySchema = z.object({
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

export type MediaQuerySchema = z.infer<typeof MediaQuerySchema>;
export type Media = MediaQuerySchema["data"]["Page"]["media"][number];
