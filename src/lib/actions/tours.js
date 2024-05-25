"use server";
import { revalidateTag } from "next/cache";
import connectDB from "../db/config";
import tourModel from "../db/model/tourModel";

export const fetchAllTours = async () => {
  "use server";
  try {
    await connectDB();
    const tours = await tourModel.find({}).lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTourById = async (id) => {
  "use server";
  try {
    await connectDB();
    const tours = await tourModel
      .findById(id)
      .populate("guides", "name email")
      .lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {}
};

export const fetchTop5Cheap = async () => {
  "use server";
  try {
    await connectDB();
    const tours = await tourModel.find({}).sort({ price: 1 }).limit(5).lean();
    return tours ? JSON.stringify(tours) : false;
  } catch (error) {}
};

export const getAllTours = async () => {
  try {
    const tourRes = await fetch(`${process.env.FRONTEND_DOMAIN}/api/tours`, {
      cache: "no-cache",
      next: { tags: ["tours"] },
    });
    const { tour } = await tourRes.json();
    if (tour) {
      return JSON.stringify(tour);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTour = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await tourModel.findByIdAndDelete(id);
    revalidateTag("tours");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
