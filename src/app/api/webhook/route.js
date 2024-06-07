import Stripe from "stripe";
import { headers } from "next/headers";
import bookModel from "@/lib/db/model/bookModel";
import { generateInvoicePdf } from "@/lib/actions/tours";
import { findBookById } from "@/lib/actions/book";
import tourModel from "@/lib/db/model/tourModel";
import connectDB from "@/lib/db/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // Specify the API version you want to use
});

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
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = months[monthIndex];
  return `${monthName} ${day} ${year}`;
}

const currentDate = new Date();

export async function POST(request) {
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

  // // Respond with 200 status immediately
  // const response = new Response("RESPONSE EXECUTE", { status: 200 });

  // // Process the event asynchronously
  // processWebhookEvent(event);

  // return response;

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      // Retrieve the Checkout Session
      const checkoutSession = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });
      let checkoutSessionCompleted = checkoutSession.data[0];

      try {
        await connectDB();

        //setting book to paid
        await bookModel.findByIdAndUpdate(
          checkoutSessionCompleted?.metadata?.bookedTourId,
          { status: "paid" }
        );

        //find book that populate user, tour
        const bookedTour = await findBookById(
          checkoutSessionCompleted?.metadata?.bookedTourId
        );

        //calculate quantity of tour
        let quantity =
          Number(checkoutSessionCompleted.amount_total / 100) /
          Number(bookedTour.tour.price);

        //put the size of the tour to be and set it
        let sizeToBe = bookedTour?.tour?.maxGroupSize - quantity;
        await tourModel.findByIdAndUpdate(bookedTour?.tour?._id, {
          maxGroupSize: sizeToBe,
        });

        //prepare data that will be in reciept
        const dataForReciept = {
          username: bookedTour.user.name,
          userEmail: bookedTour.user.email,
          isActive: true,
          userId: bookedTour.user._id,
          tourId: bookedTour.tour._id,
          tourStatus: "Active",
          startingAddress: bookedTour.tour.startLocation.address,
          endAddress:
            bookedTour.tour.location.address ||
            bookedTour.tour.location[0].address,
          tourPrice: bookedTour.tour.price,
          transactionId: checkoutSessionCompleted.id,
          date: formatDate(currentDate),
          quantity,
          amountPaid: Number(checkoutSessionCompleted.amount_total / 100),
          transactionStatus: checkoutSessionCompleted.payment_status,
          paymentIntent: checkoutSessionCompleted.payment_intent,
          currency: checkoutSessionCompleted.currency,
        };

        const reciept = await generateInvoicePdf({ dataForReciept });

        await bookModel.findByIdAndUpdate(
          checkoutSessionCompleted?.metadata?.bookedTourId,
          { pdfLink: reciept }
        );

        return new Response("RESPONSE EXECUTE", { status: 200 });
      } catch (error) {
        console.error(
          `something went wrong on stirpe payment webhook ${error}`
        );
      }
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      console.log(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("response excute", { status: 200 });
}

async function processWebhookEvent(event) {
  await connectDB();
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      try {
        await bookModel.findByIdAndUpdate(
          checkoutSessionCompleted?.metadata?.bookedTourId,
          { status: "paid" }
        );

        console.log("book updated to paid");

        const bookedTour = await findBookById(
          checkoutSessionCompleted?.metadata?.bookedTourId
        );

        let quantity =
          Number(checkoutSessionCompleted.amount_total / 100) /
          Number(bookedTour.tour.price);

        let sizeToBe = bookedTour?.tour?.maxGroupSize - quantity;
        await tourModel.findByIdAndUpdate(bookedTour?.tour?._id, {
          maxGroupSize: sizeToBe,
        });

        const dataForReciept = {
          username: bookedTour.user.name,
          userEmail: bookedTour.user.email,
          isActive: true,
          userId: bookedTour.user._id,
          tourId: bookedTour.tour._id,
          tourStatus: "Active",
          startingAddress: bookedTour.tour.startLocation.address,
          endAddress:
            bookedTour.tour.location.address ||
            bookedTour.tour.location[0].address,
          tourPrice: bookedTour.tour.price,
          transactionId: checkoutSessionCompleted.id,
          date: formatDate(currentDate),
          quantity,
          amountPaid: Number(checkoutSessionCompleted.amount_total / 100),
          transactionStatus: checkoutSessionCompleted.payment_status,
          paymentIntent: checkoutSessionCompleted.payment_intent,
          currency: checkoutSessionCompleted.currency,
        };

        const reciept = await generateInvoicePdf({ dataForReciept });

        await bookModel.findByIdAndUpdate(
          checkoutSessionCompleted?.metadata?.bookedTourId,
          { pdfLink: reciept }
        );
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
