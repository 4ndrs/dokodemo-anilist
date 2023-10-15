import { z } from "zod";

const MediaSchema = z.object({
  id: z.number(),
  title: z.object({ romaji: z.string() }),
  format: z.union([z.string(), z.null()]),
  startDate: z.object({ year: z.number().nullable() }),
  coverImage: z.object({ medium: z.string() }),
});

const CharacterSchema = z.object({
  id: z.number(),
  name: z.object({ full: z.string() }),
  image: z.object({ medium: z.string() }),
});

const StaffSchema = z.object({
  id: z.number(),
  name: z.object({ full: z.string() }),
  image: z.object({ medium: z.string() }),
  primaryOccupations: z.array(z.string()),
});

const StudioSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const PageInfoSchema = z.object({ hasNextPage: z.boolean() });

const MediaPaginationSchema = z.object({
  pageInfo: PageInfoSchema,
  results: z.array(MediaSchema),
});

const CharactersPaginationSchema = z.object({
  pageInfo: PageInfoSchema,
  results: z.array(CharacterSchema),
});

const StaffPaginationSchema = z.object({
  pageInfo: PageInfoSchema,
  results: z.array(StaffSchema),
});

const StudiosPaginationSchema = z.object({
  pageInfo: PageInfoSchema,
  results: z.array(StudioSchema),
});

const SuccessQuerySchema = z.object({
  data: z.object({
    anime: MediaPaginationSchema,
    manga: MediaPaginationSchema,
    staff: StaffPaginationSchema,
    studios: StudiosPaginationSchema,
    characters: CharactersPaginationSchema,
  }),
});

const ErrorQuerySchema = z.object({
  data: z.null(),
  errors: z.array(
    z.object({
      message: z.string(),
      status: z.number(),
      locations: z.array(z.object({ line: z.number(), column: z.number() })),
    }),
  ),
});

export const SearchResponseSchema = z.union([
  SuccessQuerySchema,
  ErrorQuerySchema,
]);

export type Anime = z.infer<typeof MediaSchema>;
export type Manga = z.infer<typeof MediaSchema>;
export type Staff = z.infer<typeof StaffSchema>;
export type Studio = z.infer<typeof StudioSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type SearchResponseSchema = z.infer<typeof SearchResponseSchema>;
