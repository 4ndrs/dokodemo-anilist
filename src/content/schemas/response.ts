import { z } from "zod";

import { StaffQuerySchema } from "./staff";
import { MediaQuerySchema } from "./media";
import { ErrorQuerySchema } from "./error";
import { StudioQuerySchema } from "./studio";
import { CharacterQuerySchema } from "./character";

export const StaffResponseSchema = z.union([
  StaffQuerySchema,
  ErrorQuerySchema,
]);

export const StudioResponseSchema = z.union([
  StudioQuerySchema,
  ErrorQuerySchema,
]);

export const MediaResponseSchema = z.union([
  MediaQuerySchema,
  ErrorQuerySchema,
]);

export const CharacterResponseSchema = z.union([
  CharacterQuerySchema,
  ErrorQuerySchema,
]);
