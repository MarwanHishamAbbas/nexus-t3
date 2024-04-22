import { TRPCProductSchema } from "~/lib/validator/product-validator";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { stripe } from "~/lib/stripe/Stripe";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const paymentRouter = createTRPCRouter({
  buyProduct: publicProcedure
    .input(TRPCProductSchema)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.create({
        data: {
          productId: input.id,
        },
      });
      try {
        const session = await stripe.checkout.sessions.create({
          success_url: `http://localhost:3000/thank-you?orderId=${order.id}`,
          cancel_url: "http://localhost:3000/",
          payment_method_types: ["paypal", "card"],
          mode: "payment",
          metadata: {
            order: order.id,
          },
          line_items: [
            {
              price_data: {
                currency: "USD",
                product_data: {
                  name: input.title,
                  description: input.description,
                  images: [input.image],
                },
                unit_amount: input.price * 100,
              },
              quantity: 1,
            },
          ],
        });

        return { url: session.url };
      } catch (error) {
        if (error instanceof TRPCError) {
          console.log(error.message);
          return { url: null };
        }
      }
    }),
  orderStatus: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input: orderId }) => {
      const order = await ctx.db.order.findUnique({
        where: {
          id: orderId,
        },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });
      return { isPaid: order.isPaid, productId: order.productId };
    }),
});
