import { ProductSchema } from "~/lib/validator/product-validator";
import { put } from "@vercel/blob";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { revalidatePath } from "next/cache";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(ProductSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO - upload the file and the image to blob and retrieve urls

      // const { url } = await put("articles/blob.txt", "Hello World!", {
      //   access: "public",
      // });
      try {
        await ctx.db.product.create({
          data: {
            category: input.category,
            fileUrl: "",
            imageUrl: "",
            price: parseInt(input.price),
            description: input.description,
            title: input.title,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  products: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany();
    return products;
  }),
});
