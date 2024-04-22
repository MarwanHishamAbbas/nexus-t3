import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe } from "~/lib/stripe/Stripe";
export async function POST(req: NextRequest, res: NextResponse) {
  const signature = req.headers.get("stripe-signature") ?? "";

  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    const completedEvent = event.data.object as Stripe.Checkout.Session;
    console.log(completedEvent.metadata);
    return NextResponse.json({ status: 200, event: event });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "Failed" });
  }
}
