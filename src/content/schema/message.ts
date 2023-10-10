import { z } from "zod";

export const ActionMessageSchema = z.object({
  action: z.enum(["open", "close"]),
  tabId: z.number(),
});

export type ActionResponse = "b-b-b-buffa";
export type ActionMessageSchema = z.infer<typeof ActionMessageSchema>;
