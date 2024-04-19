import { TRPCProductSchema } from "~/lib/validator/product-validator";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(TRPCProductSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.create({
        data: {
          category: input.category,
          fileUrl: "",
          imageUrl: input.image,
          price: parseInt(input.price),
          description: input.description,
          title: input.title,
        },
      });
    }),
  products: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany();
    return products;
  }),
});
