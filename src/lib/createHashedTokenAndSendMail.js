import nodemailer from "nodemailer";
import userModel from "./db/model/userModel";
import bcrypt from "bcrypt";
import ejs from "ejs";
import path from "path";

export const sendMail = async ({ emailType, userId, email }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType == "verifyEmail") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1200000,
      });
    } else if (emailType == "forgotPassword") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1200000,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // or another service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_BASED_PASS,
      },
    });

    const templatePath = path.join(process.cwd(), "views", "emailTemplate.ejs");
    const domain = process.env.FRONTEND_DOMAIN;
    const emailTemplate = await ejs.renderFile(templatePath, {
      domain,
      hashedToken,
    });

    const mailOptions = {
      from: "AdventureHub Team <joshrde2002@gmail.com>",
      to: email,
      subject:
        emailType == "verifyEmail"
          ? "Verify Your Password"
          : "Reset Your Password",
      html: emailTemplate,
    };

    const mailRes = await transporter.sendMail(mailOptions);
    return mailRes;
  } catch (error) {
    throw new Error(error?.message);
  }
};
