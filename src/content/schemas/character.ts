import { z } from "zod";

export const CharacterQuerySchema = z.object({
  data: z.object({
    Page: z.object({
      pageInfo: z.object({ hasNextPage: z.boolean() }),
      characters: z.array(
        z.object({
          id: z.number(),
          name: z.object({ full: z.string() }),
          image: z.object({ medium: z.string() }),
        }),
      ),
    }),
  }),
});

export type CharacterQuerySchema = z.infer<typeof CharacterQuerySchema>;

export type Character =
  CharacterQuerySchema["data"]["Page"]["characters"][number];
