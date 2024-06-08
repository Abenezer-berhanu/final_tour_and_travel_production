import Stripe from "stripe";
import { headers } from "next/headers";
import bookModel from "@/lib/db/model/bookModel";
import { generateInvoicePdf } from "@/lib/actions/tours";
import { findBookById } from "@/lib/actions/book";
import tourModel from "@/lib/db/model/tourModel";
import connectDB from "@/lib/db/config";
import { NextResponse } from "next/server";

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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // Specify the API version you want to use
});

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { session_id } = reqBody;

    const stripeSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "line_items"],
    });

    if (stripeSession) {
      await connectDB();

      const bookedTour = await findBookById(
        stripeSession?.metadata?.bookedTourId
      );

      if (bookedTour?.status != "paid") {
        await bookModel.findByIdAndUpdate(
          stripeSession?.metadata?.bookedTourId,
          {
            status: "paid",
          }
        );

        let quantity =
          Number(stripeSession.amount_total / 100) /
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
          transactionId: stripeSession.id,
          date: formatDate(currentDate),
          quantity,
          amountPaid: Number(stripeSession.amount_total / 100),
          transactionStatus: stripeSession.payment_status,
          paymentIntent: stripeSession.payment_intent,
          currency: stripeSession.currency,
        };

        const reciept = await generateInvoicePdf({ dataForReciept });

        await bookModel.findByIdAndUpdate(
          stripeSession?.metadata?.bookedTourId,
          {
            pdfLink: reciept,
          }
        );
        return NextResponse.json({
          success: "Tour is successfully booked.",
        });
      } else {
        return NextResponse.json({
          success: "Tour already booked.",
        });
      }
    } else {
      return NextResponse.json({
        error: "couldn't find stripe payment detail",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
