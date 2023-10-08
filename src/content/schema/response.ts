import { z } from "zod";

import { AnimeQuerySchema } from "./anime";
import { ErrorQuerySchema } from "./error";

export const AnimeResponseSchema = z.union([
  AnimeQuerySchema,
  ErrorQuerySchema,
]);
