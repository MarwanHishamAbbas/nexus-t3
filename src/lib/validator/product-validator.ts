/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

const requiredString = z.string().min(1, "Required").max(300);

const imageSchema = z.custom<File>();

export const ProductSchema = z.object({
  title: requiredString,
  description: requiredString.max(5000),
  price: z.number({ required_error: "Must be a number" }),
  category: requiredString,
  image: imageSchema,
});
export const TRPCProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().max(5000),
  price: z.number(),
  category: z.string(),
  image: z.string(),
  file: z.string(),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
export type TTRPCProductSchema = z.infer<typeof TRPCProductSchema>;
