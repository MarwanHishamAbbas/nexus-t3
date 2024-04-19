import { z } from "zod";

export const QueryValidator = z.object({
  category: z.enum(["Templates", "Wallpapers", "Icons", "Fonts"]).optional(),
  limit: z.number().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
