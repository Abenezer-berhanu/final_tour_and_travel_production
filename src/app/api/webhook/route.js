import Stripe from "stripe";
import { headers } from "next/headers";
import bookModel from "@/lib/db/model/bookModel";
import { generateInvoicePdf } from "@/lib/actions/tours";
import { findBookById } from "@/lib/actions/book";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate(); // Get the day of the month (1-31)
  const monthIndex = date.getMonth(); // Get the month (0-11)
  const year = date.getFullYear(); // Get the full year (e.g., 2015)

  const monthName = months[monthIndex]; // Get the short name of the month

  return `${monthName} ${day} ${year}`;
}

const currentDate = new Date();

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
      try {
        await bookModel.findByIdAndUpdate(
          checkoutSessionCompleted?.metadata?.bookedTourId,
          { status: "paid" }
        );
        // make it done here
        const bookedTour = await findBookById(
          checkoutSessionCompleted?.metadata?.bookedTourId
        );
      } catch (error) {
        console.log(error);
      }
      break;
    default:
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
