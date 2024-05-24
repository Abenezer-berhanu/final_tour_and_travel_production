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
