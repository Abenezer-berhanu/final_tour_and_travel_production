import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const verifyToken = async () => {
  const tokenString = cookies().get("adventure_hub_jwt")?.value || "";

  if (tokenString) {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET_KEY);
    if (decoded) {
      return decoded;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
