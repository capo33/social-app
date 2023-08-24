import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  followers: Array<string>;
  following: Array<string>;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
