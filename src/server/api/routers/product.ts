import { TRPCProductSchema } from "~/lib/validator/product-validator";
import { QueryValidator } from "~/lib/validator/query-validator";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(TRPCProductSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.create({
        data: {
          category: input.category,
          file: "",
          image: input.image,
          price: input.price,
          description: input.description,
          title: input.title,
        },
      });
    }),
  products: publicProcedure
    .input(QueryValidator)
    .query(async ({ ctx, input }) => {
      const { category, limit } = input;
      const products = await ctx.db.product.findMany({
        where: {
          category: {
            equals: category,
          },
        },
        take: limit,
      });
      return products;
    }),
});
