import { z } from "zod";

export const ActionMessageSchema = z.object({
  action: z.enum(["open", "close"]),
  tabId: z.number(),
});

export const FetchMessageSchema = z.object({
  query: z.string(),
});

export type ActionResponse = "b-b-b-buffa";
export type FetchMessageSchema = z.infer<typeof FetchMessageSchema>;
export type ActionMessageSchema = z.infer<typeof ActionMessageSchema>;
