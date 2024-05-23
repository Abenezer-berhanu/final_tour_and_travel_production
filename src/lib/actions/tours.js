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
