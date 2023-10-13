import { z } from "zod";

import { MediaQuerySchema } from "./media";
import { ErrorQuerySchema } from "./error";

export const MediaResponseSchema = z.union([
  MediaQuerySchema,
  ErrorQuerySchema,
]);
