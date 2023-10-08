import { z } from "zod";

export const ErrorQuerySchema = z.object({
  data: z.null(),
  errors: z.array(
    z.object({
      message: z.string(),
      status: z.number(),
      locations: z.array(z.object({ line: z.number(), column: z.number() })),
    }),
  ),
});

export type ErrorQuerySchema = z.infer<typeof ErrorQuerySchema>;
