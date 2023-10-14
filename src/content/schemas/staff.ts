import { z } from "zod";

export const StaffQuerySchema = z.object({
  data: z.object({
    Page: z.object({
      pageInfo: z.object({ hasNextPage: z.boolean() }),
      staff: z.array(
        z.object({
          id: z.number(),
          name: z.object({ full: z.string() }),
          image: z.object({ medium: z.string() }),
        }),
      ),
    }),
  }),
});

export type StaffQuerySchema = z.infer<typeof StaffQuerySchema>;
export type Staff = StaffQuerySchema["data"]["Page"]["staff"][number];
