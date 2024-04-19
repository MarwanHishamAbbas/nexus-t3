/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

const requiredString = z.string().min(1, "Required").max(300);
const numericAndRequiredString = requiredString.regex(
  /^\d+$/,
  "Must be a number",
);

const imageSchema = z.custom<File>();

export const ProductSchema = z.object({
  title: requiredString,
  description: requiredString.max(5000),
  price: numericAndRequiredString,
  category: requiredString,
  image: imageSchema,
});
export const TRPCProductSchema = z.object({
  title: requiredString,
  description: requiredString.max(5000),
  price: numericAndRequiredString,
  category: requiredString,
  image: requiredString,
});

export type TProductSchema = z.infer<typeof ProductSchema>;
