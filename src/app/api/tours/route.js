import connectDB from "@/lib/db/config";
import tourModel from "@/lib/db/model/tourModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const tour = await tourModel.find({}).lean();
    if (tour) {
      return NextResponse.json({ tour });
    }
  } catch (error) {
    console.log(error);
  }
};
