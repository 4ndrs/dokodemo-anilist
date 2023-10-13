import { z } from "zod";

import { MediaQuerySchema } from "./media";
import { ErrorQuerySchema } from "./error";
import { CharacterQuerySchema } from "./character";

export const MediaResponseSchema = z.union([
  MediaQuerySchema,
  ErrorQuerySchema,
]);

export const CharacterResponseSchema = z.union([
  CharacterQuerySchema,
  ErrorQuerySchema,
]);
