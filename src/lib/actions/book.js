"use server";

import connectDB from "../db/config";
import bookModel from "../db/model/bookModel";

export const bookTour = async ({ tourId, userId, price }) => {
  try {
    await connectDB();
    const newBookedTour = await bookModel.create({
      tour: tourId,
      user: "6650b6be8d63639bac1b2070",
      price: price,
    });

    return newBookedTour._doc;
  } catch (error) {
    console.error(error);
  }
};

export const changeBookedTourStatus = async (id, status) => {
  try {
    await connectDB();
    const tour = await bookModel.findByIdAndUpdate(id, { status: status });
  } catch (error) {
    console.log(error);
  }
};

export const findBookById = async (id) => {
  try {
    await connectDB();
    const tour = await bookModel
      .findById(id)
      .populate("user")
      .populate("tour")
      .lean();
    return tour;
  } catch (error) {
    console.log(error);
  }
};

export const findBooks = async () => {
  try {
    await connectDB();
    const book = await bookModel.find({}).populate("tour").lean();
    return JSON.stringify(book);
  } catch (error) {
    console.log(error);
  }
};
