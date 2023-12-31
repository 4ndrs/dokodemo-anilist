import { z } from "zod";

export const ActionMessageSchema = z.union([
  z.object({
    action: z.literal("open"),
    tabId: z.number(),
    text: z.string().optional(),
  }),
  z.object({
    action: z.literal("close"),
    tabId: z.number(),
  }),
]);

const QueryMessageSchema = z.object({
  type: z.literal("query"),
  query: z.string(),
});

const ImageMessageSchema = z.object({
  type: z.literal("image"),
  src: z.string(),
});

export const FetchMessageSchema = z.union([
  QueryMessageSchema,
  ImageMessageSchema,
]);

export type ActionResponse = "b-b-b-buffa";

export type FetchMessageSchema = z.infer<typeof FetchMessageSchema>;
export type ActionMessageSchema = z.infer<typeof ActionMessageSchema>;
