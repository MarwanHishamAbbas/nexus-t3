import { z } from 'zod'

const requiredString = z.string().min(1, 'Required').max(300)
const numericAndRequiredString = requiredString.regex(
  /^\d+$/,
  'Must be a number'
)

export const ProductSchema = z.object({
  title: requiredString,
  description: z.string().max(5000).optional(),
  price: numericAndRequiredString,
  category: requiredString,
})

export type TProductSchema = z.infer<typeof ProductSchema>
