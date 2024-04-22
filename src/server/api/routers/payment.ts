import { TRPCProductSchema } from "~/lib/validator/product-validator";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { stripe } from "~/lib/stripe/Stripe";
import { z } from "zod";

export const paymentRouter = createTRPCRouter({
  buyProduct: publicProcedure
    .input(TRPCProductSchema)
    .mutation(async ({ ctx, input }) => {
      const session = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/thank-you?productId=${input.id}`,
        cancel_url: "http://localhost:3000/",
        payment_method_types: ["paypal", "card"],
        mode: "payment",
        metadata: {
          productId: input.id,
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
    }),
});
