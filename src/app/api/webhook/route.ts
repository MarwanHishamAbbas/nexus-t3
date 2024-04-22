import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe } from "~/lib/stripe/Stripe";
import { db } from "~/server/db";
export async function POST(req: NextRequest, res: NextResponse) {
  const signature = req.headers.get("stripe-signature") ?? "";

  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    const session = event.data.object as Stripe.Checkout.Session;
    if (!session?.metadata?.orderId) {
      return NextResponse.json(`Webhook Error: No data present in metadata`);
    }

    await db.order.update({
      where: { id: parseInt(session.metadata.orderId) },
      data: { isPaid: true },
    });
    console.log("Order Updated");

    return NextResponse.json({ status: 200, event: event });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "Failed" });
  }
}
