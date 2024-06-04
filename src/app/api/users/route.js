import connectDB from "@/lib/db/config";
import userModel from "@/lib/db/model/userModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const user = await userModel.find({}).lean();
    if (user) {
      return NextResponse.json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};
