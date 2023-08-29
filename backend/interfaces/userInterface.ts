import { Document, Types } from "mongoose";

export type NotificationType = {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  name: string;
};

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bio: string;
  notifications: NotificationType[];
  seenNotifications: NotificationType[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
