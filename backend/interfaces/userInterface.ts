import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
