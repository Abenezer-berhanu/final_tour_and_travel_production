import Stripe from "stripe";
import { headers } from "next/headers";
import bookModel from "@/lib/db/model/bookModel";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request, res) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  const sig = headers().get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      await bookModel.findByIdAndUpdate(
        checkoutSessionCompleted?.metadata?.bookedTourId,
        { status: "paid" }
      );
      break;
    default:
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
