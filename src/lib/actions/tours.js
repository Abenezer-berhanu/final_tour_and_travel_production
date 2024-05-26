"use server";
import { revalidateTag } from "next/cache";
import connectDB from "../db/config";
import tourModel from "../db/model/tourModel";
import cloudinary from "../cloudinaryConfig";

//check if the object has falsy value
const checkForFalsyValues = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    if (value === "" || value === null || value === undefined) {
      return { error: true, message: `The ${key} field is required` };
    }
  }
  return { error: false, message: "Passed" };
};

const uploadImageToCloudinary = async (photo) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(photo, {
      folder: "",
    });
    return uploadedImage.secure_url;
  } catch (error) {
    console.log(error);
  }
};

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

export const createTour = async (currentState, formData) => {
  try {
    const {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      discount,
      summary,
      description,
      startingDate,
      isSecrete,
      startCountry,
      startAddress,
      startDescription,
      landingCountry,
      landingAddress,
      landingDescription,
      guides,
      coverImage,
      images,
    } = Object.fromEntries(formData);

    const tourInfo = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      discount,
      summary,
      description,
      startingDate,
      isSecrete: isSecrete == "on" ? true : false,
      startCountry: startCountry?.split(","),
      startAddress,
      startDescription,
      landingCountry: landingCountry?.split(","),
      landingAddress,
      landingDescription,
      guides: guides.split(","),
      coverImage,
      images: JSON.parse(images),
    };

    const dataToBeValidate = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      startingDate,
      startCountry: startCountry?.split(","),
      startAddress,
      startDescription,
      landingCountry: landingCountry?.split(","),
      landingAddress,
      landingDescription,
      guides: guides.split(","),
      coverImage,
      images: JSON.parse(images).length,
    };

    //check validation
    console.log(dataToBeValidate);
    const { error, message } = checkForFalsyValues(dataToBeValidate);
    if (error) {
      return { error: message };
    }

    //upload the images and update the fields
    let coverImageUrl = "";
    let imagesUrl = [];

    coverImageUrl = await uploadImageToCloudinary(coverImage);
    for (let i = 0; i < tourInfo.images.length; i++) {
      let url = await uploadImageToCloudinary(tourInfo.images[i]);
      imagesUrl.push(url);
    }

    //change data format
    console.log(coverImageUrl);

    const dataToBeSaved = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      secretTour: tourInfo.isSecrete,
      priceDiscount: tourInfo.discount,
      startDate: startingDate,
      startLocation: {
        coordinates: tourInfo.startCountry,
        address: tourInfo.startAddress,
        description: tourInfo.startDescription,
      },
      location: {
        coordinates: tourInfo.landingCountry,
        address: tourInfo.landingAddress,
        description: tourInfo.landingDescription,
      },
      guides: tourInfo.guides,
      imageCover: coverImageUrl,
      images: imagesUrl,
    };

    //save it to db

    await connectDB();
    const newTour = await tourModel.create(dataToBeSaved).lean();
    if (newTour) {
      console.log(newTour);
      return { success: true, id: newTour._id };
    }
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please try again." };
  }
};
