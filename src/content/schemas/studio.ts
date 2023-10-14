import { z } from "zod";

export const StudioQuerySchema = z.object({
  data: z.object({
    Page: z.object({
      pageInfo: z.object({ hasNextPage: z.boolean() }),
      studios: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  }),
});

export type StudioQuerySchema = z.infer<typeof StudioQuerySchema>;
export type Studio = StudioQuerySchema["data"]["Page"]["studios"][number];
