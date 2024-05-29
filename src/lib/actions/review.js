"use server";

import connectDB from "../db/config";
import reviewModel from "../db/model/reviewModel";

export const giveReview = async (currentState, formData) => {
  const { tourId, userId, review, rating } = Object.fromEntries(formData);
  if (!review || !rating) {
    return { error: "All fields must be provided" };
  }

  const reviewInfo = {
    tour: tourId,
    user: "6650b6be8d63639bac1b2070",
    review,
    rating,
  };
  try {
    await connectDB();
    const reviewExist = await reviewModel.findOne({ user: reviewInfo.user });
    console.log(reviewExist);
    if (reviewExist) {
      return { error: "Your already gave review." };
    } else {
      const reviewStatus = await reviewModel.create(reviewInfo);
      if (reviewStatus) {
        console.log(reviewStatus);
        return { success: "Review Added successfully." };
      } else {
        return { error: "Something went wrong please try again" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
