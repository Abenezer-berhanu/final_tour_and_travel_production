"use server";
import connectDB from "../db/config";
import userModel from "../db/model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

export const fetchAllUsers = async () => {
  try {
    await connectDB();
    const users = await userModel.find({}).lean();
    return users ? JSON.stringify(users) : false;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (currentState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await connectDB();
    const user = await userModel.find({ email }).lean();
    console.log(user);
    if (user) {
      const correctPassword = await bcrypt.compare(password, user?.password);
      if (correctPassword) {
        const userInfo = {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };
        const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });

        cookies().set({
          name: "next_commerce_user",
          value: token,
          httpOnly: true,
          maxAge: 24 * 60 * 60,
        });
        console.log(token);
        return { success: "logged in successfully" };
      } else {
        return { error: "invalid email or password" };
      }
    } else {
      return { error: "email not registered." };
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (currentState, formData) => {
  const { name, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "password doesn't match to confirm password." };
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  const passwordSchema = z
    .string()
    .refine((password) => passwordRegex.test(password), {
      message:
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.",
    });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email" };
  }
  try {
    passwordSchema.parse(password);
    await connectDB();
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return { error: "Email already registered" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      //send verifcation email to the user mail

      
      return { success: "user registered successfully" };
    }
  } catch (error) {
    if (error?.name == "ZodError") {
      return { error: error?.issues[0].message };
    }
    console.log(error);
  }
};
