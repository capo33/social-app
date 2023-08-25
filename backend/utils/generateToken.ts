import jwt, { Secret } from "jsonwebtoken";
import { Types } from "mongoose";

// Generate token for user
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: "30d",
  });
};
